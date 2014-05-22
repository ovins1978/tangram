VectorRenderer.GLRenderer = GLRenderer;
GLRenderer.prototype = Object.create(VectorRenderer.prototype);
GLRenderer.debug = false;

function GLRenderer (tile_source, layers, styles, options)
{
    VectorRenderer.call(this, 'GLRenderer', tile_source, layers, styles, options);

    // if (GLBuilders !== undefined) {
       GLBuilders.setTileScale(VectorRenderer.tile_scale);
    // }

    var options = options || {};

    this.container = options.container;
    this.continuous_animation = false; // request redraw every frame
}

GLRenderer.prototype._init = function GLRendererInit ()
{
    this.container = this.container || document.body;
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = 0;
    this.canvas.style.left = 0;
    this.canvas.style.zIndex = -1;
    this.container.appendChild(this.canvas);

    this.gl = GL.getContext(this.canvas);
    this.gl_program = new GL.Program(this.gl, GLRenderer.vertex_shader_source, GLRenderer.fragment_shader_source);
    this.last_render_count = null;

    this.resizeMap(this.container.clientWidth, this.container.clientHeight);

    // this.zoom_step = 0.02; // for fractional zoom user adjustment
    this.start_time = +new Date();
    this.initInputHandlers();
};

// Determine a Z value that will stack features in a "painter's algorithm" style, first by layer, then by draw order within layer
// Features are assumed to be already sorted in desired draw order by the layer pre-processor
GLRenderer.calculateZ = function (layer, tile, layer_offset, feature_offset)
{
    // var layer_offset = layer_offset || 0;
    // var feature_offset = feature_offset || 0;
    var z = 0; // TODO: made this a no-op until revisiting where it should live - one-time calc here, in vertex layout/shader, etc.
    return z;
};

// Process geometry for tile - called by web worker
GLRenderer.addTile = function (tile, layers, styles)
{
    // var layers = VectorWorker.getLayers();
    // var styles = VectorWorker.getStyles();

    var layer, style, feature, z;
    var vertex_triangles = [];
    var vertex_lines = [];

    // Join line test pattern
    // if (GLRenderer.debug) {
    //     tile.layers['roads'].features.push(GLRenderer.buildZigzagLineTestPattern());
    // }

    // Build raw geometry arrays
    tile.feature_count = 0;
    for (var ln=0; ln < layers.length; ln++) {
        layer = layers[ln];

        if (tile.layers[layer.name] != null) {
            var num_features = tile.layers[layer.name].features.length;

            // Rendering reverse order aka top to bottom
            for (var f = num_features-1; f >= 0; f--) {
            // for (var f = 0; f < num_features; f++) {
                feature = tile.layers[layer.name].features[f];
                style = VectorRenderer.parseStyleForFeature(feature, styles[layer.name], tile);
                z = GLRenderer.calculateZ(layer, tile);

                var vertex_constants = [
                    style.color[0], style.color[1], style.color[2],
                    ln
                    // TODO: add material info, etc.
                ];

                if (style.outline.color) {
                    var outline_vertex_constants = [
                        style.outline.color[0], style.outline.color[1], style.outline.color[2],
                        ln - 0.5 // outlines sit between layers, underneath current layer but above the one below
                    ];
                }

                var polygons = null;
                if (feature.geometry.type == 'Polygon') {
                    polygons = [feature.geometry.coordinates];
                }
                else if (feature.geometry.type == 'MultiPolygon') {
                    polygons = feature.geometry.coordinates;
                }

                var lines = null;
                if (feature.geometry.type == 'LineString') {
                    lines = [feature.geometry.coordinates];
                }
                else if (feature.geometry.type == 'MultiLineString') {
                    lines = feature.geometry.coordinates;
                }

                if (polygons != null) {
                    // Extruded polygons (e.g. 3D buildings)
                    if (style.extrude && style.height) {
                        GLBuilders.buildExtrudedPolygons(polygons, z, style.height, style.min_height, vertex_triangles, { vertex_constants: vertex_constants });
                    }
                    // Regular polygons
                    else {
                        GLBuilders.buildPolygons(polygons, z, vertex_triangles, { vertex_constants: vertex_constants });
                    }

                    // Polygon outlines
                    if (style.outline.color && style.outline.width) {
                        for (var mpc=0; mpc < polygons.length; mpc++) {
                            GLBuilders.buildPolylines(polygons[mpc], GLRenderer.calculateZ(layer, tile, -0.5), style.outline.width, vertex_triangles, { closed_polygon: true, remove_tile_edges: true, vertex_constants: outline_vertex_constants, vertex_lines: vertex_lines });
                        }
                    }
                }

                if (lines != null) {
                    // GLBuilders.buildLines(lines, feature, layer, style, tile, z, vertex_lines);
                    GLBuilders.buildPolylines(lines, z, style.width, vertex_triangles, { vertex_constants: vertex_constants, vertex_lines: vertex_lines });

                    // Line outlines
                    if (style.outline.color && style.outline.width) {
                        GLBuilders.buildPolylines(lines, GLRenderer.calculateZ(layer, tile, -0.5), style.width + 2 * style.outline.width, vertex_triangles, { vertex_constants: outline_vertex_constants, vertex_lines: vertex_lines });
                    }
                }

                tile.feature_count++;
            }
        }
    }

    tile.debug.features = tile.feature_count;
    vertex_triangles = new Float32Array(vertex_triangles);
    vertex_lines = new Float32Array(vertex_lines);

    // NOTE: moved to generic event post from VectorRenderer (loses transferable objects for typed arrays, but gains flexibility)
    // VectorWorker.worker.postMessage(
    //     {
    //         key: tile.key,
    //         debug: tile.debug,
    //         vertex_triangles: vertex_triangles,
    //         vertex_lines: vertex_lines
    //     },
    //     [
    //         vertex_triangles.buffer,
    //         vertex_lines.buffer
    //     ]
    // );

    tile.vertex_data = {
        vertex_triangles: vertex_triangles,
        vertex_lines: vertex_lines
    };

    return tile;
};

// Called on main thread when a web worker completes processing for a single tile
GLRenderer.prototype._tileWorkerCompleted = function (tile)
{
    var vertex_triangles = tile.vertex_data.vertex_triangles;
    var vertex_lines = tile.vertex_data.vertex_lines;

    // Create GL geometry objects
    tile.gl_geometry = [];
    if (vertex_triangles.length > 0) {
        tile.gl_geometry.push(new GLTriangles(this.gl, this.gl_program.program, vertex_triangles));
    }
    if (vertex_lines.length > 0) {
        tile.gl_geometry.push(new GLLines(this.gl, this.gl_program.program, vertex_lines, { line_width: 1 /*5 / Geo.meters_per_pixel[Math.floor(this.zoom)]*/ }));
    }

    tile.debug.geometries = tile.gl_geometry.reduce(function(sum, geom) { return sum + geom.geometry_count; }, 0);
    tile.debug.geom_ratio = (tile.debug.geometries / tile.debug.features).toFixed(1);
    tile.debug.buffer_size = tile.gl_geometry.reduce(function(sum, geom) { return sum + geom.vertex_data.byteLength; }, 0);

    // Selection - experimental/future
    // var gl_renderer = this;
    // var pixel = new Uint8Array(4);
    // tileDiv.onmousemove = function (event) {
    //     // console.log(event.offsetX + ', ' + event.offsetY + ' | ' + parseInt(tileDiv.style.left) + ', ' + parseInt
    //     var p = Point(
    //         event.offsetX + parseInt(tileDiv.style.left),
    //         event.offsetY + parseInt(tileDiv.style.top)
    //     );
    //     gl_renderer.gl.readPixels(p.x, p.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
    //     console.log(p.x + ', ' + p.y + ': (' + pixel[0] + ', ' + pixel[1] + ', ' + pixel[2] + ', ' + pixel[3] + ')')
    // };

    delete tile.vertex_data; // TODO: might want to preserve this for rebuilding geometries when styles/etc. change?
};

GLRenderer.prototype.removeTile = function GLRendererRemoveTile (key)
{
    if (this.map_zooming == true) {
        return; // short circuit tile removal, GL renderer will sweep out tiles by zoom level when zoom ends
    }

    var tile = this.tiles[key];

    if (tile != null && tile.gl_geometry != null) {
        tile.gl_geometry.forEach(function (gl_geometry) { gl_geometry.destroy(); });
        tile.gl_geometry = null;
    }
    VectorRenderer.prototype.removeTile.apply(this, arguments);
};

GLRenderer.prototype.preserve_tiles_within_zoom = 2;
GLRenderer.prototype.setZoom = function (zoom)
{
    // Schedule GL tiles for removal on zoom
    console.log("renderer.map_last_zoom: " + this.map_last_zoom);

    this.map_zooming = false;
    this.zoom = zoom;
    var below = this.zoom;
    var above = this.zoom;
    if (Math.abs(this.zoom - this.map_last_zoom) <= this.preserve_tiles_within_zoom) {
        if (this.zoom > this.map_last_zoom) {
            below = this.zoom - this.preserve_tiles_within_zoom;
        }
        else {
            above = this.zoom + this.preserve_tiles_within_zoom;
        }
    }
    this.removeTilesOutsideZoomRange(below, above);
    this.map_last_zoom = this.zoom;
    this.dirty = true; // calling because this is a full override of the parent class
};

GLRenderer.prototype.removeTilesOutsideZoomRange = function (below, above)
{
    below = Math.min(below, this.tile_source.max_zoom || below);
    above = Math.min(above, this.tile_source.max_zoom || above);

    console.log("removeTilesOutsideZoomRange [" + below + ", " + above + "])");
    var remove_tiles = [];
    for (var t in this.tiles) {
        var tile = this.tiles[t];
        if (tile.coords.z < below || tile.coords.z > above) {
            remove_tiles.push(t);
        }
    }
    for (var r=0; r < remove_tiles.length; r++) {
        var key = remove_tiles[r];
        console.log("removed " + key + " (outside range [" + below + ", " + above + "])");
        this.removeTile(key);
    }
};

// Overrides base class method (a no op)
GLRenderer.prototype.resizeMap = function (width, height)
{
    VectorRenderer.prototype.resizeMap.apply(this, arguments);

    this.css_size = { width: width, height: height };
    this.device_size = { width: Math.round(this.css_size.width * this.device_pixel_ratio), height: Math.round(this.css_size.height * this.device_pixel_ratio) };

    this.canvas.style.width = this.css_size.width + 'px';
    this.canvas.style.height = this.css_size.height + 'px';
    this.canvas.width = this.device_size.width;
    this.canvas.height = this.device_size.height;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
};

GLRenderer.prototype._render = function GLRendererRender ()
{
    var gl = this.gl;

    this.input();

    if (!this.gl_program) {
        return;
    }
    gl.useProgram(this.gl_program.program);

    this.gl_program.uniform('2f', 'resolution', this.css_size.width, this.css_size.height);
    this.gl_program.uniform('1f', 'time', ((+new Date()) - this.start_time) / 1000);

    var center = Geo.latLngToMeters(Point(this.center.lng, this.center.lat));
    this.gl_program.uniform('2f', 'map_center', center.x, center.y);
    this.gl_program.uniform('1f', 'map_zoom', this.zoom); // Math.floor(this.zoom) + (Math.log((this.zoom % 1) + 1) / Math.LN2 // scale fractional zoom by log
    this.gl_program.uniform('1f', 'num_layers', this.layers.length);

    var meters_per_pixel = Geo.min_zoom_meters_per_pixel / Math.pow(2, this.zoom);
    var meter_zoom = Point(this.css_size.width / 2 * meters_per_pixel, this.css_size.height / 2 * meters_per_pixel);
    this.gl_program.uniform('2f', 'meter_zoom', meter_zoom.x, meter_zoom.y);
    this.gl_program.uniform('1f', 'tile_scale', VectorRenderer.tile_scale);

    var compound_mat = mat4.create();
    var model_mat = mat4.create(); // -> model matrix
    var view_mat = mat4.create(); // -> view matrix
    var meter_view_mat = mat4.create(); // -> view matrix

    mat4.scale(meter_view_mat, meter_view_mat, vec3.fromValues(1 / meter_zoom.x, 1 / meter_zoom.y, 1 / meter_zoom.x)); // convert meters to viewport
    // this.gl_program.uniform('Matrix4fv', 'meter_view_mat', gl.FALSE, meter_view_mat);

    // Perspective-style projections
    var perspective_mat = mat4.create();

    // mat4.translate(perspective_mat, perspective_mat, vec3.fromValues(0.25, 0.25, 0));
    mat4.translate(perspective_mat, perspective_mat, vec3.fromValues(0, 0, -1));
    // mat4.scale(perspective_mat, perspective_mat, vec3.fromValues(20, 20, 1));
    // mat4.translate(perspective_mat, perspective_mat, vec3.fromValues(-0.25, -0.25, 0));

    var perspective_mat2 = mat4.create();

    // mat4.translate(perspective_mat2, vec3.fromValues(-0.25, -0.25, 0), perspective_mat2);

    var fov = 2; // .1, Math.PI / 2;
    var aspect = 1; // this.css_size.width / this.css_size.height;
    var znear = 10;
    var zfar = -10;
    perspective_mat2[0] = fov / aspect;                             // x row, x col
    perspective_mat2[5] = fov;                                      // y row, y col
    perspective_mat2[10] = (zfar + znear) / (znear - zfar);         // z row, z col
    perspective_mat2[14] = (2 * zfar * znear) / (znear - zfar);     // z row, w col

    perspective_mat2[11] = -1; // / meter_zoom.x;                   // w row, z col

    // perspective_mat2[12] = -0.25;                                   // x row, w col
    // perspective_mat2[13] = -0.25;                                   // y row, w col

    // perspective_mat2[8] = 1 / meter_zoom.x; // x row, z col
    // perspective_mat2[9] = 1 / meter_zoom.y; // y row, z col

    // mat4.translate(perspective_mat2, perspective_mat2, vec3.fromValues(0.25, 0.25, 0));

    mat4.multiply(perspective_mat, perspective_mat2, perspective_mat);

    // mat4.scale(perspective_mat, perspective_mat, vec3.fromValues(1, 1, -1));
    // mat4.translate(perspective_mat, perspective_mat2, vec3.fromValues(0.25 * 20, 0.25 * 20, 0));

    this.gl_program.uniform('Matrix4fv', 'perspective_mat', gl.FALSE, perspective_mat);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    // Improve precision by offsetting tile and map center coords
    // Anchor scale defines a 'block size' that tile and center are 'reduced' to
    var anchor_scale = 5000;
    var anchor = { x: center.x - (center.x % anchor_scale), y: center.y - (center.y % anchor_scale) };
    var cmin = { x: center.x - anchor.x, y: center.y - anchor.y };
    this.gl_program.uniform('2f', 'anchor', anchor.x, anchor.y);

    // Render tile GL geometries
    var count = 0;
    var capped_zoom = Math.min(~~this.zoom, this.tile_source.max_zoom || ~~this.zoom);
    for (var t in this.tiles) {
        var tile = this.tiles[t];
        if (tile.loaded == true &&
            tile.visible == true &&
            Math.min(tile.coords.z, this.tile_source.max_zoom || tile.coords.z) == capped_zoom) {

            if (tile.gl_geometry != null) {
                var tmin = { x: tile.min.x - anchor.x, y: tile.min.y - anchor.y };

                // Tile transform
                mat4.identity(model_mat)
                // mat4.rotateZ(model_mat, model_mat, ((+new Date()) - this.start_time) / 1000 / 4);
                // mat4.rotateY(model_mat, model_mat, ((+new Date()) - this.start_time) / 1000 / 6);
                // mat4.rotateX(model_mat, model_mat, ((+new Date()) - this.start_time) / 1000 / 6);
                // mat4.translate(model_mat, model_mat, vec3.fromValues(tile.min.x - center.x, tile.min.y - center.y, 0)); // adjust for tile origin & map center
                // mat4.translate(model_mat, model_mat, vec3.fromValues(tile.min.x, tile.min.y, 0));
                mat4.translate(model_mat, model_mat, vec3.fromValues(tmin.x, tmin.y, 0));

                mat4.scale(model_mat, model_mat, vec3.fromValues((tile.max.x - tile.min.x) / VectorRenderer.tile_scale, -1 * (tile.max.y - tile.min.y) / VectorRenderer.tile_scale, 1)); // scale tile local coords to meters

                // mat4.translate(model_mat, model_mat, vec3.fromValues(-2048, -2048, 0));
                // mat4.rotateZ(model_mat, model_mat, ((+new Date()) - this.start_time) / 1000 / 4); // + (tile.coords.x + tile.coords.y));
                // mat4.translate(model_mat, model_mat, vec3.fromValues(2048, 2048, 0));

                this.gl_program.uniform('Matrix4fv', 'model_mat', gl.FALSE, model_mat);

                // mat4.identity(view_mat);
                mat4.copy(view_mat, meter_view_mat); // convert meters to screen space
                // mat4.translate(view_mat, view_mat, vec3.fromValues(tile.min.x - center.x, tile.min.y - center.y, 0)); // adjust for tile origin & map center
                // mat4.translate(view_mat, view_mat, vec3.fromValues(-center.x, -center.y, 0));
                mat4.translate(view_mat, view_mat, vec3.fromValues(-cmin.x, -cmin.y, 0));

                // console.log("tile: " + tile.min.x + ", " + tile.min.y + ", center: " + center.x + ", " + center.y + ", sub: " + (tile.min.x - center.x) + ", " + (tile.min.y - center.y));
                // console.log("tile: " + tmin.x + ", " + tmin.y + ", center: " + cmin.x + ", " + cmin.y + ", sub: " + (tmin.x - cmin.x) + ", " + (tmin.y - cmin.y));

                this.gl_program.uniform('Matrix4fv', 'view_mat', gl.FALSE, view_mat);

                // mat4.copy(compound_mat, model_mat);
                // mat4.multiply(compound_mat, view_mat, compound_mat);
                // mat4.multiply(compound_mat, meter_view_mat, compound_mat);
                // this.gl_program.uniform('Matrix4fv', 'compound_mat', gl.FALSE, compound_mat);

                tile.gl_geometry.forEach(function (gl_geometry) {
                    gl_geometry.render();
                    count += gl_geometry.geometry_count;
                });
            }
        }
    }

    if (count != this.last_render_count) {
        console.log("rendered " + count + " primitives");
    }
    this.last_render_count = count;

    if (this.continuous_animation == true) {
        this.dirty = true;
    }

    return true;
};

// Sum of a debug property across tiles
GLRenderer.prototype.getDebugSum = function (prop, filter)
{
    var sum = 0;
    for (var t in this.tiles) {
        if (this.tiles[t].debug[prop] != null && (typeof filter != 'function' || filter(this.tiles[t]) == true)) {
            sum += this.tiles[t].debug[prop];
        }
    }
    return sum;
};

// Average of a debug property across tiles
GLRenderer.prototype.getDebugAverage = function (prop, filter)
{
    return this.getDebugSum(prop, filter) / Object.keys(this.tiles).length;
};

// User input
// TODO: restore fractional zoom support once leaflet animation refactor pull request is merged

GLRenderer.prototype.initInputHandlers = function GLRendererInitInputHandlers ()
{
    var gl_renderer = this;
    gl_renderer.key = null;

    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 37) {
            gl_renderer.key = 'left';
        }
        else if (event.keyCode == 39) {
            gl_renderer.key = 'right';
        }
        else if (event.keyCode == 38) {
            gl_renderer.key = 'up';
        }
        else if (event.keyCode == 40) {
            gl_renderer.key = 'down';
        }
        else if (event.keyCode == 83) { // s
            console.log("reloading shaders");
            gl_renderer.gl_program.program = GL.updateProgramFromURLs(gl_renderer.gl, gl_renderer.gl_program.program, 'vertex.glsl', 'fragment.glsl');
            gl_renderer.gl.useProgram(gl_renderer.gl_program.program);
            gl_renderer.gl_program.refreshUniforms();
            gl_renderer.dirty = true;
        }
    });

    document.addEventListener('keyup', function (event) {
        gl_renderer.key = null;
    });
};

GLRenderer.prototype.input = function GLRendererInput ()
{
    // // Fractional zoom scaling
    // if (this.key == 'up') {
    //     this.setZoom(this.zoom + this.zoom_step);
    // }
    // else if (this.key == 'down') {
    //     this.setZoom(this.zoom - this.zoom_step);
    // }
};
