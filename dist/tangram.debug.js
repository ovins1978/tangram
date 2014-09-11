!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Tangram=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.2.1
 */

/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


(function(_global) {
  "use strict";

  var shim = {};
  if (typeof(exports) === 'undefined') {
    if(typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
      shim.exports = {};
      define(function() {
        return shim.exports;
      });
    } else {
      // gl-matrix lives in a browser, define its namespaces in global
      shim.exports = typeof(window) !== 'undefined' ? window : _global;
    }
  }
  else {
    // gl-matrix lives in commonjs, define its namespaces in exports
    shim.exports = exports;
  }

  (function(exports) {
    /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

if(!GLMAT_ARRAY_TYPE) {
    var GLMAT_ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
}

if(!GLMAT_RANDOM) {
    var GLMAT_RANDOM = Math.random;
}

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

/**
 * Sets the type of array used when creating new vectors and matricies
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    GLMAT_ARRAY_TYPE = type;
}

if(typeof(exports) !== 'undefined') {
    exports.glMatrix = glMatrix;
}

var degree = Math.PI / 180;

/**
* Convert Degree To Radian
*
* @param {Number} Angle in Degrees
*/
glMatrix.toRadian = function(a){
     return a * degree;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */

var vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2.random = function (out, scale) {
    scale = scale || 1.0;
    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function(out, a, m) {
    var x = a[0], 
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = vec2.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec2 = vec2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */

var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    var z = (GLMAT_RANDOM() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/*
* Rotate a 3D vector around the x-axis
* @param {vec3} out The receiving vec3
* @param {vec3} a The vec3 point to rotate
* @param {vec3} b The origin of the rotation
* @param {Number} c The angle of rotation
* @returns {vec3} out
*/
vec3.rotateX = function(out, a, b, c){
   var p = [], r=[];
	  //Translate point to the origin
	  p[0] = a[0] - b[0];
	  p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];

	  //perform rotation
	  r[0] = p[0];
	  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
	  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

	  //translate to correct position
	  out[0] = r[0] + b[0];
	  out[1] = r[1] + b[1];
	  out[2] = r[2] + b[2];

  	return out;
};

/*
* Rotate a 3D vector around the y-axis
* @param {vec3} out The receiving vec3
* @param {vec3} a The vec3 point to rotate
* @param {vec3} b The origin of the rotation
* @param {Number} c The angle of rotation
* @returns {vec3} out
*/
vec3.rotateY = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
  	r[1] = p[1];
  	r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/*
* Rotate a 3D vector around the z-axis
* @param {vec3} out The receiving vec3
* @param {vec3} a The vec3 point to rotate
* @param {vec3} b The origin of the rotation
* @param {Number} c The angle of rotation
* @returns {vec3} out
*/
vec3.rotateZ = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
  	r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
  	r[2] = p[2];
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = (function() {
    var vec = vec3.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec3 = vec3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */

var vec4 = {};

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function(x, y, z, w) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4.sub = vec4.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4.mul = vec4.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4.div = vec4.divide;

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
vec4.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4.dist = vec4.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4.sqrDist = vec4.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4.len = vec4.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4.sqrLen = vec4.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x*x + y*y + z*z + w*w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
        out[3] = a[3] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
vec4.random = function (out, scale) {
    scale = scale || 1.0;

    //TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = GLMAT_RANDOM();
    out[1] = GLMAT_RANDOM();
    out[2] = GLMAT_RANDOM();
    out[3] = GLMAT_RANDOM();
    vec4.normalize(out, out);
    vec4.scale(out, out, scale);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4.forEach = (function() {
    var vec = vec4.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 4;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec4 = vec4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x2 Matrix
 * @name mat2
 */

var mat2 = {};

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    
    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;
    
    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
};

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
mat2.mul = mat2.multiply;

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
};

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
};

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix 
 * @param {mat2} D the diagonal matrix 
 * @param {mat2} U the upper triangular matrix 
 * @param {mat2} a the input matrix to factorize
 */

mat2.LDU = function (L, D, U, a) { 
    L[2] = a[2]/a[0]; 
    U[0] = a[0]; 
    U[1] = a[1]; 
    U[3] = a[3] - L[2] * U[1]; 
    return [L, D, U];       
}; 

if(typeof(exports) !== 'undefined') {
    exports.mat2 = mat2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x3 Matrix
 * @name mat2d
 * 
 * @description 
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */

var mat2d = {};

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.create = function() {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
mat2d.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.invert = function(out, a) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5];

    var det = aa * ad - ab * ac;
    if(!det){
        return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
};

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
mat2d.determinant = function (a) {
    return a[0] * a[3] - a[1] * a[2];
};

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
};

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
mat2d.mul = mat2d.multiply;


/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
mat2d.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
mat2d.translate = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = a0 * v0 + a2 * v1 + a4;
    out[5] = a1 * v0 + a3 * v1 + a5;
    return out;
};

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2d.str = function (a) {
    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
};

/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2d.frob = function (a) { 
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
}; 

if(typeof(exports) !== 'undefined') {
    exports.mat2d = mat2d;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3x3 Matrix
 * @name mat3
 */

var mat3 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    
    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function(out, a, v) {
    var x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat3.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
};


if(typeof(exports) !== 'undefined') {
    exports.mat3 = mat3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4x4 Matrix
 * @name mat4
 */

var mat4 = {};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < GLMAT_EPSILON) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};

mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < GLMAT_EPSILON &&
        Math.abs(eyey - centery) < GLMAT_EPSILON &&
        Math.abs(eyez - centerz) < GLMAT_EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat4.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
};


if(typeof(exports) !== 'undefined') {
    exports.mat4 = mat4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class Quaternion
 * @name quat
 */

var quat = {};

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
quat.rotationTo = (function() {
    var tmpvec3 = vec3.create();
    var xUnitVec3 = vec3.fromValues(1,0,0);
    var yUnitVec3 = vec3.fromValues(0,1,0);

    return function(out, a, b) {
        var dot = vec3.dot(a, b);
        if (dot < -0.999999) {
            vec3.cross(tmpvec3, xUnitVec3, a);
            if (vec3.length(tmpvec3) < 0.000001)
                vec3.cross(tmpvec3, yUnitVec3, a);
            vec3.normalize(tmpvec3, tmpvec3);
            quat.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            vec3.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat.normalize(out, out);
        }
    };
})();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
quat.setAxes = (function() {
    var matr = mat3.create();

    return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];

        return quat.normalize(out, quat.fromMat3(out, matr));
    };
})();

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.setAxisAngle = function(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.multiply = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat.mul = quat.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
    var x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    var        omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if ( cosom < 0.0 ) {
        cosom = -cosom;
        bx = - bx;
        by = - by;
        bz = - bz;
        bw = - bw;
    }
    // calculate coefficients
    if ( (1.0 - cosom) > 0.000001 ) {
        // standard case (slerp)
        omega  = Math.acos(cosom);
        sinom  = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {        
        // "from" and "to" quaternions are very close 
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    
    return out;
};

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
        invDot = dot ? 1.0/dot : 0;
    
    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0*invDot;
    out[1] = -a1*invDot;
    out[2] = -a2*invDot;
    out[3] = a3*invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat.len = quat.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat.sqrLen = quat.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat.normalize = vec4.normalize;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat.fromMat3 = function(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if ( fTrace > 0.0 ) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5/fRoot;  // 1/(4w)
        out[0] = (m[7]-m[5])*fRoot;
        out[1] = (m[2]-m[6])*fRoot;
        out[2] = (m[3]-m[1])*fRoot;
    } else {
        // |w| <= 1/2
        var i = 0;
        if ( m[4] > m[0] )
          i = 1;
        if ( m[8] > m[i*3+i] )
          i = 2;
        var j = (i+1)%3;
        var k = (i+2)%3;
        
        fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[k*3+j] - m[j*3+k]) * fRoot;
        out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
        out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
    }
    
    return out;
};

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.quat = quat;
}
;













  })(shim.exports);
})(this);

},{}],2:[function(_dereq_,module,exports){
(function() {
  var slice = [].slice;

  function queue(parallelism) {
    var q,
        tasks = [],
        started = 0, // number of tasks that have been started (and perhaps finished)
        active = 0, // number of tasks currently being executed (started but not finished)
        remaining = 0, // number of tasks not yet finished
        popping, // inside a synchronous task callback?
        error = null,
        await = noop,
        all;

    if (!parallelism) parallelism = Infinity;

    function pop() {
      while (popping = started < tasks.length && active < parallelism) {
        var i = started++,
            t = tasks[i],
            a = slice.call(t, 1);
        a.push(callback(i));
        ++active;
        t[0].apply(null, a);
      }
    }

    function callback(i) {
      return function(e, r) {
        --active;
        if (error != null) return;
        if (e != null) {
          error = e; // ignore new tasks and squelch active callbacks
          started = remaining = NaN; // stop queued tasks from starting
          notify();
        } else {
          tasks[i] = r;
          if (--remaining) popping || pop();
          else notify();
        }
      };
    }

    function notify() {
      if (error != null) await(error);
      else if (all) await(error, tasks);
      else await.apply(null, [error].concat(tasks));
    }

    return q = {
      defer: function() {
        if (!error) {
          tasks.push(arguments);
          ++remaining;
          pop();
        }
        return q;
      },
      await: function(f) {
        await = f;
        all = false;
        if (!remaining) notify();
        return q;
      },
      awaitAll: function(f) {
        await = f;
        all = true;
        if (!remaining) notify();
        return q;
      }
    };
  }

  function noop() {}

  queue.version = "1.0.7";
  if (typeof define === "function" && define.amd) define(function() { return queue; });
  else if (typeof module === "object" && module.exports) module.exports = queue;
  else this.queue = queue;
})();

},{}],3:[function(_dereq_,module,exports){
"use strict";
var Point = _dereq_('./point.js');
var Geo = {};
Geo.tile_size = 256;
Geo.half_circumference_meters = 20037508.342789244;
Geo.map_origin_meters = Point(-Geo.half_circumference_meters, Geo.half_circumference_meters);
Geo.min_zoom_meters_per_pixel = Geo.half_circumference_meters * 2 / Geo.tile_size;
Geo.meters_per_pixel = [];
Geo.max_zoom = 20;
for (var z = 0; z <= Geo.max_zoom; z++) {
  Geo.meters_per_pixel[z] = Geo.min_zoom_meters_per_pixel / Math.pow(2, z);
}
Geo.units_per_meter = [];
Geo.setTileScale = function(scale) {
  Geo.tile_scale = scale;
  Geo.units_per_pixel = Geo.tile_scale / Geo.tile_size;
  for (var z = 0; z <= Geo.max_zoom; z++) {
    Geo.units_per_meter[z] = Geo.tile_scale / (Geo.tile_size * Geo.meters_per_pixel[z]);
  }
};
Geo.metersForTile = function(tile) {
  return Point((tile.x * Geo.tile_size * Geo.meters_per_pixel[tile.z]) + Geo.map_origin_meters.x, ((tile.y * Geo.tile_size * Geo.meters_per_pixel[tile.z]) * -1) + Geo.map_origin_meters.y);
};
Geo.metersToLatLng = function(meters) {
  var c = Point.copy(meters);
  c.x /= Geo.half_circumference_meters;
  c.y /= Geo.half_circumference_meters;
  c.y = (2 * Math.atan(Math.exp(c.y * Math.PI)) - (Math.PI / 2)) / Math.PI;
  c.x *= 180;
  c.y *= 180;
  return c;
};
Geo.latLngToMeters = function(latlng) {
  var c = Point.copy(latlng);
  c.y = Math.log(Math.tan((c.y + 90) * Math.PI / 360)) / (Math.PI / 180);
  c.y = c.y * Geo.half_circumference_meters / 180;
  c.x = c.x * Geo.half_circumference_meters / 180;
  return c;
};
Geo.transformGeometry = function(geometry, transform) {
  if (geometry.type == 'Point') {
    return transform(geometry.coordinates);
  } else if (geometry.type == 'LineString' || geometry.type == 'MultiPoint') {
    return geometry.coordinates.map(transform);
  } else if (geometry.type == 'Polygon' || geometry.type == 'MultiLineString') {
    return geometry.coordinates.map(function(coordinates) {
      return coordinates.map(transform);
    });
  } else if (geometry.type == 'MultiPolygon') {
    return geometry.coordinates.map(function(polygon) {
      return polygon.map(function(coordinates) {
        return coordinates.map(transform);
      });
    });
  }
  return {};
};
Geo.boxIntersect = function(b1, b2) {
  return !(b2.sw.x > b1.ne.x || b2.ne.x < b1.sw.x || b2.sw.y > b1.ne.y || b2.ne.y < b1.sw.y);
};
Geo.splitFeatureLines = function(feature, tolerance) {
  var tolerance = tolerance || 0.001;
  var tolerance_sq = tolerance * tolerance;
  var geom = feature.geometry;
  var lines;
  if (geom.type == 'MultiLineString') {
    lines = geom.coordinates;
  } else if (geom.type == 'LineString') {
    lines = [geom.coordinates];
  } else {
    return feature;
  }
  var split_lines = [];
  for (var s = 0; s < lines.length; s++) {
    var seg = lines[s];
    var split_seg = [];
    var last_coord = null;
    var keep;
    for (var c = 0; c < seg.length; c++) {
      var coord = seg[c];
      keep = true;
      if (last_coord != null) {
        var dist = (coord[0] - last_coord[0]) * (coord[0] - last_coord[0]) + (coord[1] - last_coord[1]) * (coord[1] - last_coord[1]);
        if (dist > tolerance_sq) {
          keep = false;
        }
      }
      if (keep == false) {
        split_lines.push(split_seg);
        split_seg = [];
      }
      split_seg.push(coord);
      last_coord = coord;
    }
    split_lines.push(split_seg);
    split_seg = [];
  }
  if (split_lines.length == 1) {
    geom.type = 'LineString';
    geom.coordinates = split_lines[0];
  } else {
    geom.type = 'MultiLineString';
    geom.coordinates = split_lines;
  }
  return feature;
};
if (module !== undefined) {
  module.exports = Geo;
}


},{"./point.js":14}],4:[function(_dereq_,module,exports){
"use strict";
var Utils = _dereq_('../utils.js');
var GL = {};
GL.getContext = function getContext(canvas) {
  var canvas = canvas;
  var fullscreen = false;
  if (canvas == null) {
    canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.zIndex = -1;
    document.body.appendChild(canvas);
    fullscreen = true;
  }
  var gl = canvas.getContext('experimental-webgl');
  if (!gl) {
    alert("Couldn't create WebGL context. Your browser probably doesn't support WebGL or it's turned off?");
    throw "Couldn't create WebGL context";
  }
  GL.resizeCanvas(gl, window.innerWidth, window.innerHeight);
  if (fullscreen == true) {
    window.addEventListener('resize', function() {
      GL.resizeCanvas(gl, window.innerWidth, window.innerHeight);
    });
  }
  return gl;
};
GL.resizeCanvas = function(gl, width, height) {
  var device_pixel_ratio = window.devicePixelRatio || 1;
  gl.canvas.style.width = width + 'px';
  gl.canvas.style.height = height + 'px';
  gl.canvas.width = Math.round(gl.canvas.style.width * device_pixel_ratio);
  gl.canvas.height = Math.round(gl.canvas.style.width * device_pixel_ratio);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
};
GL.updateProgram = function GLupdateProgram(gl, program, vertex_shader_source, fragment_shader_source) {
  try {
    var vertex_shader = GL.createShader(gl, vertex_shader_source, gl.VERTEX_SHADER);
    var fragment_shader = GL.createShader(gl, '#ifdef GL_ES\nprecision highp float;\n#endif\n\n' + fragment_shader_source, gl.FRAGMENT_SHADER);
  } catch (err) {
    console.log(err);
    return program;
  }
  gl.useProgram(null);
  if (program != null) {
    var old_shaders = gl.getAttachedShaders(program);
    for (var i = 0; i < old_shaders.length; i++) {
      gl.detachShader(program, old_shaders[i]);
    }
  } else {
    program = gl.createProgram();
  }
  if (vertex_shader == null || fragment_shader == null) {
    return program;
  }
  gl.attachShader(program, vertex_shader);
  gl.attachShader(program, fragment_shader);
  gl.deleteShader(vertex_shader);
  gl.deleteShader(fragment_shader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    var program_error = "WebGL program error:\n" + "VALIDATE_STATUS: " + gl.getProgramParameter(program, gl.VALIDATE_STATUS) + "\n" + "ERROR: " + gl.getError() + "\n\n" + "--- Vertex Shader ---\n" + vertex_shader_source + "\n\n" + "--- Fragment Shader ---\n" + fragment_shader_source;
    console.log(program_error);
    throw program_error;
  }
  return program;
};
GL.createShader = function GLcreateShader(gl, source, type) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    var shader_error = "WebGL shader error:\n" + (type == gl.VERTEX_SHADER ? "VERTEX" : "FRAGMENT") + " SHADER:\n" + gl.getShaderInfoLog(shader);
    throw shader_error;
  }
  return shader;
};
try {
  GL.tesselator = (function initTesselator() {
    var tesselator = new libtess.GluTesselator();
    function vertexCallback(data, polyVertArray) {
      if (tesselator.z != null) {
        polyVertArray.push([data[0], data[1], tesselator.z]);
      } else {
        polyVertArray.push([data[0], data[1]]);
      }
    }
    function combineCallback(coords, data, weight) {
      return coords;
    }
    function edgeCallback(flag) {}
    tesselator.gluTessCallback(libtess.gluEnum.GLU_TESS_VERTEX_DATA, vertexCallback);
    tesselator.gluTessCallback(libtess.gluEnum.GLU_TESS_COMBINE, combineCallback);
    tesselator.gluTessCallback(libtess.gluEnum.GLU_TESS_EDGE_FLAG, edgeCallback);
    tesselator.gluTessNormal(0, 0, 1);
    return tesselator;
  })();
  GL.triangulatePolygon = function GLTriangulate(contours, z) {
    var triangleVerts = [];
    GL.tesselator.z = z;
    GL.tesselator.gluTessBeginPolygon(triangleVerts);
    for (var i = 0; i < contours.length; i++) {
      GL.tesselator.gluTessBeginContour();
      var contour = contours[i];
      for (var j = 0; j < contour.length; j++) {
        var coords = [contour[j][0], contour[j][1], 0];
        GL.tesselator.gluTessVertex(coords, coords);
      }
      GL.tesselator.gluTessEndContour();
    }
    GL.tesselator.gluTessEndPolygon();
    return triangleVerts;
  };
} catch (e) {}
GL.addVertices = function(vertices, vertex_constants, vertex_data) {
  if (vertices == null) {
    return vertex_data;
  }
  vertex_constants = vertex_constants || [];
  for (var v = 0,
      vlen = vertices.length; v < vlen; v++) {
    vertex_data.push.apply(vertex_data, vertices[v]);
    vertex_data.push.apply(vertex_data, vertex_constants);
  }
  return vertex_data;
};
GL.addVerticesMultipleAttributes = function(dynamics, constants, vertex_data) {
  var dlen = dynamics.length;
  var vlen = dynamics[0].length;
  constants = constants || [];
  for (var v = 0; v < vlen; v++) {
    for (var d = 0; d < dlen; d++) {
      vertex_data.push.apply(vertex_data, dynamics[d][v]);
    }
    vertex_data.push.apply(vertex_data, constants);
  }
  return vertex_data;
};
if (module !== undefined) {
  module.exports = GL;
}


},{"../utils.js":17}],5:[function(_dereq_,module,exports){
"use strict";
var Vector = _dereq_('../vector.js');
var Point = _dereq_('../point.js');
var GL = _dereq_('./gl.js');
var GLBuilders = {};
GLBuilders.debug = false;
GLBuilders.buildPolygons = function GLBuildersBuildPolygons(polygons, z, vertex_data, options) {
  options = options || {};
  var vertex_constants = [];
  if (z != null) {
    vertex_constants.push(z);
  }
  if (options.normals) {
    vertex_constants.push(0, 0, 1);
  }
  if (options.vertex_constants) {
    vertex_constants.push.apply(vertex_constants, options.vertex_constants);
  }
  if (vertex_constants.length == 0) {
    vertex_constants = null;
  }
  var num_polygons = polygons.length;
  for (var p = 0; p < num_polygons; p++) {
    var vertices = GL.triangulatePolygon(polygons[p]);
    GL.addVertices(vertices, vertex_constants, vertex_data);
  }
  return vertex_data;
};
GLBuilders.buildExtrudedPolygons = function GLBuildersBuildExtrudedPolygon(polygons, z, height, min_height, vertex_data, options) {
  options = options || {};
  var min_z = z + (min_height || 0);
  var max_z = z + height;
  GLBuilders.buildPolygons(polygons, max_z, vertex_data, {
    normals: true,
    vertex_constants: options.vertex_constants
  });
  var wall_vertex_constants = [null, null, null];
  if (options.vertex_constants) {
    wall_vertex_constants.push.apply(wall_vertex_constants, options.vertex_constants);
  }
  var num_polygons = polygons.length;
  for (var p = 0; p < num_polygons; p++) {
    var polygon = polygons[p];
    for (var q = 0; q < polygon.length; q++) {
      var contour = polygon[q];
      for (var w = 0; w < contour.length - 1; w++) {
        var wall_vertices = [];
        wall_vertices.push([contour[w + 1][0], contour[w + 1][1], max_z], [contour[w + 1][0], contour[w + 1][1], min_z], [contour[w][0], contour[w][1], min_z], [contour[w][0], contour[w][1], min_z], [contour[w][0], contour[w][1], max_z], [contour[w + 1][0], contour[w + 1][1], max_z]);
        var normal = Vector.cross([0, 0, 1], Vector.normalize([contour[w + 1][0] - contour[w][0], contour[w + 1][1] - contour[w][1], 0]));
        wall_vertex_constants[0] = normal[0];
        wall_vertex_constants[1] = normal[1];
        wall_vertex_constants[2] = normal[2];
        GL.addVertices(wall_vertices, wall_vertex_constants, vertex_data);
      }
    }
  }
  return vertex_data;
};
GLBuilders.buildPolylines = function GLBuildersBuildPolylines(lines, z, width, vertex_data, options) {
  options = options || {};
  options.closed_polygon = options.closed_polygon || false;
  options.remove_tile_edges = options.remove_tile_edges || false;
  var vertex_constants = [z, 0, 0, 1];
  if (options.vertex_constants) {
    vertex_constants.push.apply(vertex_constants, options.vertex_constants);
  }
  if (GLBuilders.debug && options.vertex_lines) {
    var num_lines = lines.length;
    for (var ln = 0; ln < num_lines; ln++) {
      var line = lines[ln];
      for (var p = 0; p < line.length - 1; p++) {
        var pa = line[p];
        var pb = line[p + 1];
        options.vertex_lines.push(pa[0], pa[1], z + 0.001, 0, 0, 1, 1.0, 0, 0, pb[0], pb[1], z + 0.001, 0, 0, 1, 1.0, 0, 0);
      }
    }
    ;
  }
  var vertices = [];
  var num_lines = lines.length;
  for (var ln = 0; ln < num_lines; ln++) {
    var line = lines[ln];
    if (line.length > 2) {
      var anchors = [];
      if (line.length > 3) {
        var mid = [];
        var p,
            pmax;
        if (options.closed_polygon == true) {
          p = 0;
          pmax = line.length - 1;
        } else {
          p = 1;
          pmax = line.length - 2;
          mid.push(line[0]);
        }
        for (; p < pmax; p++) {
          var pa = line[p];
          var pb = line[p + 1];
          mid.push([(pa[0] + pb[0]) / 2, (pa[1] + pb[1]) / 2]);
        }
        var mmax;
        if (options.closed_polygon == true) {
          mmax = mid.length;
        } else {
          mid.push(line[line.length - 1]);
          mmax = mid.length - 1;
        }
        for (p = 0; p < mmax; p++) {
          anchors.push([mid[p], line[(p + 1) % line.length], mid[(p + 1) % mid.length]]);
        }
      } else {
        anchors = [[line[0], line[1], line[2]]];
      }
      for (var p = 0; p < anchors.length; p++) {
        if (!options.remove_tile_edges) {
          buildAnchor(anchors[p][0], anchors[p][1], anchors[p][2]);
        } else {
          var edge1 = GLBuilders.isOnTileEdge(anchors[p][0], anchors[p][1]);
          var edge2 = GLBuilders.isOnTileEdge(anchors[p][1], anchors[p][2]);
          if (!edge1 && !edge2) {
            buildAnchor(anchors[p][0], anchors[p][1], anchors[p][2]);
          } else if (!edge1) {
            buildSegment(anchors[p][0], anchors[p][1]);
          } else if (!edge2) {
            buildSegment(anchors[p][1], anchors[p][2]);
          }
        }
      }
    } else if (line.length == 2) {
      buildSegment(line[0], line[1]);
    }
  }
  ;
  GL.addVertices(vertices, vertex_constants, vertex_data);
  function buildSegment(pa, pb) {
    var slope = Vector.normalize([(pb[1] - pa[1]) * -1, pb[0] - pa[0]]);
    var pa_outer = [pa[0] + slope[0] * width / 2, pa[1] + slope[1] * width / 2];
    var pa_inner = [pa[0] - slope[0] * width / 2, pa[1] - slope[1] * width / 2];
    var pb_outer = [pb[0] + slope[0] * width / 2, pb[1] + slope[1] * width / 2];
    var pb_inner = [pb[0] - slope[0] * width / 2, pb[1] - slope[1] * width / 2];
    vertices.push(pb_inner, pb_outer, pa_inner, pa_inner, pb_outer, pa_outer);
  }
  function buildAnchor(pa, joint, pb) {
    var pa_slope = Vector.normalize([(joint[1] - pa[1]) * -1, joint[0] - pa[0]]);
    var pa_outer = [[pa[0] + pa_slope[0] * width / 2, pa[1] + pa_slope[1] * width / 2], [joint[0] + pa_slope[0] * width / 2, joint[1] + pa_slope[1] * width / 2]];
    var pa_inner = [[pa[0] - pa_slope[0] * width / 2, pa[1] - pa_slope[1] * width / 2], [joint[0] - pa_slope[0] * width / 2, joint[1] - pa_slope[1] * width / 2]];
    var pb_slope = Vector.normalize([(pb[1] - joint[1]) * -1, pb[0] - joint[0]]);
    var pb_outer = [[joint[0] + pb_slope[0] * width / 2, joint[1] + pb_slope[1] * width / 2], [pb[0] + pb_slope[0] * width / 2, pb[1] + pb_slope[1] * width / 2]];
    var pb_inner = [[joint[0] - pb_slope[0] * width / 2, joint[1] - pb_slope[1] * width / 2], [pb[0] - pb_slope[0] * width / 2, pb[1] - pb_slope[1] * width / 2]];
    var intersection = Vector.lineIntersection(pa_outer[0], pa_outer[1], pb_outer[0], pb_outer[1]);
    var line_debug = null;
    if (intersection != null) {
      var intersect_outer = intersection;
      var len_sq = Vector.lengthSq([intersect_outer[0] - joint[0], intersect_outer[1] - joint[1]]);
      var miter_len_max = 3;
      if (len_sq > (width * width * miter_len_max * miter_len_max)) {
        line_debug = 'distance';
        intersect_outer = Vector.normalize([intersect_outer[0] - joint[0], intersect_outer[1] - joint[1]]);
        intersect_outer = [joint[0] + intersect_outer[0] * miter_len_max, joint[1] + intersect_outer[1] * miter_len_max];
      }
      var intersect_inner = [(joint[0] - intersect_outer[0]) + joint[0], (joint[1] - intersect_outer[1]) + joint[1]];
      vertices.push(intersect_inner, intersect_outer, pa_inner[0], pa_inner[0], intersect_outer, pa_outer[0], pb_inner[1], pb_outer[1], intersect_inner, intersect_inner, pb_outer[1], intersect_outer);
    } else {
      line_debug = 'parallel';
      pa_inner[1] = pb_inner[0];
      pa_outer[1] = pb_outer[0];
      vertices.push(pa_inner[1], pa_outer[1], pa_inner[0], pa_inner[0], pa_outer[1], pa_outer[0], pb_inner[1], pb_outer[1], pb_inner[0], pb_inner[0], pb_outer[1], pb_outer[0]);
    }
    if (GLBuilders.debug && options.vertex_lines) {
      options.vertex_lines.push(pa_inner[0][0], pa_inner[0][1], z + 0.001, 0, 0, 1, 0, 1.0, 0, pa_inner[1][0], pa_inner[1][1], z + 0.001, 0, 0, 1, 0, 1.0, 0, pb_inner[0][0], pb_inner[0][1], z + 0.001, 0, 0, 1, 0, 1.0, 0, pb_inner[1][0], pb_inner[1][1], z + 0.001, 0, 0, 1, 0, 1.0, 0, pa_outer[0][0], pa_outer[0][1], z + 0.001, 0, 0, 1, 0, 1.0, 0, pa_outer[1][0], pa_outer[1][1], z + 0.001, 0, 0, 1, 0, 1.0, 0, pb_outer[0][0], pb_outer[0][1], z + 0.001, 0, 0, 1, 0, 1.0, 0, pb_outer[1][0], pb_outer[1][1], z + 0.001, 0, 0, 1, 0, 1.0, 0, pa_inner[0][0], pa_inner[0][1], z + 0.001, 0, 0, 1, 0, 1.0, 0, pa_outer[0][0], pa_outer[0][1], z + 0.001, 0, 0, 1, 0, 1.0, 0, pa_inner[1][0], pa_inner[1][1], z + 0.001, 0, 0, 1, 0, 1.0, 0, pa_outer[1][0], pa_outer[1][1], z + 0.001, 0, 0, 1, 0, 1.0, 0, pb_inner[0][0], pb_inner[0][1], z + 0.001, 0, 0, 1, 0, 1.0, 0, pb_outer[0][0], pb_outer[0][1], z + 0.001, 0, 0, 1, 0, 1.0, 0, pb_inner[1][0], pb_inner[1][1], z + 0.001, 0, 0, 1, 0, 1.0, 0, pb_outer[1][0], pb_outer[1][1], z + 0.001, 0, 0, 1, 0, 1.0, 0);
    }
    if (GLBuilders.debug && line_debug && options.vertex_lines) {
      var dcolor;
      if (line_debug == 'parallel') {
        dcolor = [0, 1, 0];
      } else if (line_debug == 'distance') {
        dcolor = [1, 0, 0];
      }
      options.vertex_lines.push(pa[0], pa[1], z + 0.002, 0, 0, 1, dcolor[0], dcolor[1], dcolor[2], joint[0], joint[1], z + 0.002, 0, 0, 1, dcolor[0], dcolor[1], dcolor[2], joint[0], joint[1], z + 0.002, 0, 0, 1, dcolor[0], dcolor[1], dcolor[2], pb[0], pb[1], z + 0.002, 0, 0, 1, dcolor[0], dcolor[1], dcolor[2]);
      var num_lines = lines.length;
      for (var ln = 0; ln < num_lines; ln++) {
        var line2 = lines[ln];
        for (var p = 0; p < line2.length - 1; p++) {
          var pa = line2[p];
          var pb = line2[p + 1];
          options.vertex_lines.push(pa[0], pa[1], z + 0.0005, 0, 0, 1, 0, 0, 1.0, pb[0], pb[1], z + 0.0005, 0, 0, 1, 0, 0, 1.0);
        }
      }
      ;
    }
  }
  return vertex_data;
};
GLBuilders.buildQuadsForPoints = function(points, width, height, z, vertex_data, options) {
  var options = options || {};
  var vertex_constants = [];
  if (options.normals) {
    vertex_constants.push(0, 0, 1);
  }
  if (options.vertex_constants) {
    vertex_constants.push.apply(vertex_constants, options.vertex_constants);
  }
  if (vertex_constants.length == 0) {
    vertex_constants = null;
  }
  var num_points = points.length;
  for (var p = 0; p < num_points; p++) {
    var point = points[p];
    var positions = [[point[0] - width / 2, point[1] - height / 2], [point[0] + width / 2, point[1] - height / 2], [point[0] + width / 2, point[1] + height / 2], [point[0] - width / 2, point[1] - height / 2], [point[0] + width / 2, point[1] + height / 2], [point[0] - width / 2, point[1] + height / 2]];
    if (z != null) {
      positions[0][2] = z;
      positions[1][2] = z;
      positions[2][2] = z;
      positions[3][2] = z;
      positions[4][2] = z;
      positions[5][2] = z;
    }
    if (options.texcoords == true) {
      var texcoords = [[-1, -1], [1, -1], [1, 1], [-1, -1], [1, 1], [-1, 1]];
      GL.addVerticesMultipleAttributes([positions, texcoords], vertex_constants, vertex_data);
    } else {
      GL.addVertices(positions, vertex_constants, vertex_data);
    }
  }
  return vertex_data;
};
GLBuilders.buildLines = function GLBuildersBuildLines(lines, feature, layer, style, tile, z, vertex_data, options) {
  options = options || {};
  var color = style.color;
  var width = style.width;
  var num_lines = lines.length;
  for (var ln = 0; ln < num_lines; ln++) {
    var line = lines[ln];
    for (var p = 0; p < line.length - 1; p++) {
      var pa = line[p];
      var pb = line[p + 1];
      vertex_data.push(pa[0], pa[1], z, 0, 0, 1, color[0], color[1], color[2], pb[0], pb[1], z, 0, 0, 1, color[0], color[1], color[2]);
    }
  }
  ;
  return vertex_data;
};
GLBuilders.isOnTileEdge = function(pa, pb, options) {
  options = options || {};
  var tolerance_function = options.tolerance_function || GLBuilders.valuesWithinTolerance;
  var tolerance = options.tolerance || 1;
  var tile_min = GLBuilders.tile_bounds[0];
  var tile_max = GLBuilders.tile_bounds[1];
  var edge = null;
  if (tolerance_function(pa[0], tile_min.x, tolerance) && tolerance_function(pb[0], tile_min.x, tolerance)) {
    edge = 'left';
  } else if (tolerance_function(pa[0], tile_max.x, tolerance) && tolerance_function(pb[0], tile_max.x, tolerance)) {
    edge = 'right';
  } else if (tolerance_function(pa[1], tile_min.y, tolerance) && tolerance_function(pb[1], tile_min.y, tolerance)) {
    edge = 'top';
  } else if (tolerance_function(pa[1], tile_max.y, tolerance) && tolerance_function(pb[1], tile_max.y, tolerance)) {
    edge = 'bottom';
  }
  return edge;
};
GLBuilders.setTileScale = function(scale) {
  GLBuilders.tile_bounds = [Point(0, 0), Point(scale, -scale)];
};
GLBuilders.valuesWithinTolerance = function(a, b, tolerance) {
  tolerance = tolerance || 1;
  return (Math.abs(a - b) < tolerance);
};
GLBuilders.buildZigzagLineTestPattern = function() {
  var min = Point(0, 0);
  var max = Point(4096, 4096);
  var g = {
    id: 123,
    geometry: {
      type: 'LineString',
      coordinates: [[min.x * 0.75 + max.x * 0.25, min.y * 0.75 + max.y * 0.25], [min.x * 0.75 + max.x * 0.25, min.y * 0.5 + max.y * 0.5], [min.x * 0.25 + max.x * 0.75, min.y * 0.75 + max.y * 0.25], [min.x * 0.25 + max.x * 0.75, min.y * 0.25 + max.y * 0.75], [min.x * 0.4 + max.x * 0.6, min.y * 0.5 + max.y * 0.5], [min.x * 0.5 + max.x * 0.5, min.y * 0.25 + max.y * 0.75], [min.x * 0.75 + max.x * 0.25, min.y * 0.25 + max.y * 0.75], [min.x * 0.75 + max.x * 0.25, min.y * 0.4 + max.y * 0.6]]
    },
    properties: {kind: 'debug'}
  };
  return g;
};
if (module !== undefined) {
  module.exports = GLBuilders;
}


},{"../point.js":14,"../vector.js":18,"./gl.js":4}],6:[function(_dereq_,module,exports){
"use strict";
var GL = _dereq_('./gl.js');
var GLVertexLayout = _dereq_('./gl_vertex_layout.js');
var GLProgram = _dereq_('./gl_program.js');
function GLGeometry(gl, vertex_data, vertex_layout, options) {
  options = options || {};
  this.gl = gl;
  this.vertex_data = vertex_data;
  this.vertex_layout = vertex_layout;
  this.buffer = this.gl.createBuffer();
  this.draw_mode = options.draw_mode || this.gl.TRIANGLES;
  this.data_usage = options.data_usage || this.gl.STATIC_DRAW;
  this.vertices_per_geometry = 3;
  this.vertex_count = this.vertex_data.byteLength / this.vertex_layout.stride;
  this.geometry_count = this.vertex_count / this.vertices_per_geometry;
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
  this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertex_data, this.data_usage);
}
GLGeometry.prototype.render = function(options) {
  options = options || {};
  if (typeof this._render_setup == 'function') {
    this._render_setup();
  }
  var gl_program = options.gl_program || GLProgram.current;
  gl_program.use();
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
  this.vertex_layout.enable(this.gl, gl_program);
  this.gl.drawArrays(this.draw_mode, 0, this.vertex_count);
};
GLGeometry.prototype.destroy = function() {
  console.log("GLGeometry.destroy: delete buffer of size " + this.vertex_data.byteLength);
  this.gl.deleteBuffer(this.buffer);
  delete this.vertex_data;
};
if (module !== undefined) {
  module.exports = GLGeometry;
}


},{"./gl.js":4,"./gl_program.js":8,"./gl_vertex_layout.js":11}],7:[function(_dereq_,module,exports){
"use strict";
var GL = _dereq_('./gl.js');
var GLBuilders = _dereq_('./gl_builders.js');
var GLGeometry = _dereq_('./gl_geom.js');
var GLVertexLayout = _dereq_('./gl_vertex_layout.js');
var GLProgram = _dereq_('./gl_program.js');
var shader_sources = _dereq_('./gl_shaders.js');
var Queue = _dereq_('queue-async');
var RenderMode = {
  init: function(gl) {
    this.gl = gl;
    this.makeGLProgram();
    if (typeof this._init == 'function') {
      this._init();
    }
  },
  refresh: function() {
    this.makeGLProgram();
  },
  defines: {},
  selection: false,
  buildPolygons: function() {},
  buildLines: function() {},
  buildPoints: function() {},
  makeGLGeometry: function(vertex_data) {
    return new GLGeometry(this.gl, vertex_data, this.vertex_layout);
  }
};
RenderMode.makeGLProgram = function() {
  var $__0 = this;
  var queue = Queue();
  var defines = this.buildDefineList();
  if (this.selection) {
    var selection_defines = Object.create(defines);
    selection_defines['FEATURE_SELECTION'] = true;
  }
  var transforms = (this.shaders && this.shaders.transforms);
  var program = (this.hasOwnProperty('gl_program') && this.gl_program);
  var selection_program = (this.hasOwnProperty('selection_gl_program') && this.selection_gl_program);
  queue.defer((function(complete) {
    if (!program) {
      program = new GLProgram($__0.gl, shader_sources[$__0.vertex_shader_key], shader_sources[$__0.fragment_shader_key], {
        defines: defines,
        transforms: transforms,
        name: $__0.name,
        callback: complete
      });
    } else {
      program.defines = defines;
      program.transforms = transforms;
      program.compile(complete);
    }
  }));
  if (this.selection) {
    queue.defer((function(complete) {
      if (!selection_program) {
        selection_program = new GLProgram($__0.gl, shader_sources[$__0.vertex_shader_key], shader_sources['selection_fragment'], {
          defines: selection_defines,
          transforms: transforms,
          name: ($__0.name + ' (selection)'),
          callback: complete
        });
      } else {
        selection_program.defines = selection_defines;
        selection_program.transforms = transforms;
        selection_program.compile(complete);
      }
    }));
  }
  queue.await((function() {
    if (program) {
      $__0.gl_program = program;
    }
    if (selection_program) {
      $__0.selection_gl_program = selection_program;
    }
  }));
};
RenderMode.buildDefineList = function() {
  var defines = {};
  if (this.defines != null) {
    for (var d in this.defines) {
      defines[d] = this.defines[d];
    }
  }
  if (this.shaders != null && this.shaders.defines != null) {
    for (var d in this.shaders.defines) {
      defines[d] = this.shaders.defines[d];
    }
  }
  return defines;
};
RenderMode.setUniforms = function() {
  var gl_program = GLProgram.current;
  if (gl_program != null && this.shaders != null && this.shaders.uniforms != null) {
    gl_program.setUniforms(this.shaders.uniforms);
  }
};
RenderMode.update = function() {
  if (typeof this.animation == 'function') {
    this.animation();
  }
};
var Modes = {};
var ModeManager = {};
ModeManager.configureMode = function(name, settings) {
  Modes[name] = Modes[name] || Object.create(Modes[settings.extends] || RenderMode);
  if (Modes[settings.extends]) {
    Modes[name].parent = Modes[settings.extends];
  }
  for (var s in settings) {
    Modes[name][s] = settings[s];
  }
  Modes[name].name = name;
  return Modes[name];
};
Modes.polygons = Object.create(RenderMode);
Modes.polygons.name = 'polygons';
Modes.polygons.vertex_shader_key = 'polygon_vertex';
Modes.polygons.fragment_shader_key = 'polygon_fragment';
Modes.polygons.defines = {'WORLD_POSITION_WRAP': 100000};
Modes.polygons.selection = true;
Modes.polygons._init = function() {
  this.vertex_layout = new GLVertexLayout(this.gl, [{
    name: 'a_position',
    size: 3,
    type: this.gl.FLOAT,
    normalized: false
  }, {
    name: 'a_normal',
    size: 3,
    type: this.gl.FLOAT,
    normalized: false
  }, {
    name: 'a_color',
    size: 3,
    type: this.gl.FLOAT,
    normalized: false
  }, {
    name: 'a_selection_color',
    size: 4,
    type: this.gl.FLOAT,
    normalized: false
  }, {
    name: 'a_layer',
    size: 1,
    type: this.gl.FLOAT,
    normalized: false
  }]);
};
Modes.polygons.buildPolygons = function(polygons, style, vertex_data) {
  var vertex_constants = [style.color[0], style.color[1], style.color[2], style.selection.color[0], style.selection.color[1], style.selection.color[2], style.selection.color[3], style.layer_num];
  if (style.outline.color) {
    var outline_vertex_constants = [style.outline.color[0], style.outline.color[1], style.outline.color[2], style.selection.color[0], style.selection.color[1], style.selection.color[2], style.selection.color[3], style.layer_num - 0.5];
  }
  if (style.extrude && style.height) {
    GLBuilders.buildExtrudedPolygons(polygons, style.z, style.height, style.min_height, vertex_data, {vertex_constants: vertex_constants});
  } else {
    GLBuilders.buildPolygons(polygons, style.z, vertex_data, {
      normals: true,
      vertex_constants: vertex_constants
    });
  }
  if (style.outline.color && style.outline.width) {
    for (var mpc = 0; mpc < polygons.length; mpc++) {
      GLBuilders.buildPolylines(polygons[mpc], style.z, style.outline.width, vertex_data, {
        closed_polygon: true,
        remove_tile_edges: true,
        vertex_constants: outline_vertex_constants
      });
    }
  }
};
Modes.polygons.buildLines = function(lines, style, vertex_data) {
  var vertex_constants = [style.color[0], style.color[1], style.color[2], style.selection.color[0], style.selection.color[1], style.selection.color[2], style.selection.color[3], style.layer_num];
  if (style.outline.color) {
    var outline_vertex_constants = [style.outline.color[0], style.outline.color[1], style.outline.color[2], style.selection.color[0], style.selection.color[1], style.selection.color[2], style.selection.color[3], style.layer_num - 0.5];
  }
  GLBuilders.buildPolylines(lines, style.z, style.width, vertex_data, {vertex_constants: vertex_constants});
  if (style.outline.color && style.outline.width) {
    GLBuilders.buildPolylines(lines, style.z, style.width + 2 * style.outline.width, vertex_data, {vertex_constants: outline_vertex_constants});
  }
};
Modes.polygons.buildPoints = function(points, style, vertex_data) {
  var vertex_constants = [style.color[0], style.color[1], style.color[2], style.selection.color[0], style.selection.color[1], style.selection.color[2], style.selection.color[3], style.layer_num];
  GLBuilders.buildQuadsForPoints(points, style.size * 2, style.size * 2, style.z, vertex_data, {
    normals: true,
    texcoords: false,
    vertex_constants: vertex_constants
  });
};
Modes.points = Object.create(RenderMode);
Modes.points.name = 'points';
Modes.points.vertex_shader_key = 'point_vertex';
Modes.points.fragment_shader_key = 'point_fragment';
Modes.points.defines = {'EFFECT_SCREEN_COLOR': true};
Modes.points.selection = true;
Modes.points._init = function() {
  this.vertex_layout = new GLVertexLayout(this.gl, [{
    name: 'a_position',
    size: 3,
    type: this.gl.FLOAT,
    normalized: false
  }, {
    name: 'a_texcoord',
    size: 2,
    type: this.gl.FLOAT,
    normalized: false
  }, {
    name: 'a_color',
    size: 3,
    type: this.gl.FLOAT,
    normalized: false
  }, {
    name: 'a_selection_color',
    size: 4,
    type: this.gl.FLOAT,
    normalized: false
  }, {
    name: 'a_layer',
    size: 1,
    type: this.gl.FLOAT,
    normalized: false
  }]);
};
Modes.points.buildPoints = function(points, style, vertex_data) {
  var vertex_constants = [style.color[0], style.color[1], style.color[2], style.selection.color[0], style.selection.color[1], style.selection.color[2], style.selection.color[3], style.layer_num];
  GLBuilders.buildQuadsForPoints(points, style.size * 2, style.size * 2, style.z, vertex_data, {
    normals: false,
    texcoords: true,
    vertex_constants: vertex_constants
  });
};
if (module !== undefined) {
  module.exports = {
    ModeManager: ModeManager,
    Modes: Modes
  };
}


},{"./gl.js":4,"./gl_builders.js":5,"./gl_geom.js":6,"./gl_program.js":8,"./gl_shaders.js":9,"./gl_vertex_layout.js":11,"queue-async":2}],8:[function(_dereq_,module,exports){
"use strict";
var GL = _dereq_('./gl.js');
var GLTexture = _dereq_('./gl_texture.js');
var Utils = _dereq_('../utils.js');
var Queue = _dereq_('queue-async');
GLProgram.id = 0;
GLProgram.programs = {};
function GLProgram(gl, vertex_shader, fragment_shader, options) {
  options = options || {};
  this.gl = gl;
  this.program = null;
  this.compiled = false;
  this.defines = options.defines || {};
  this.transforms = options.transforms;
  this.uniforms = {};
  this.attribs = {};
  this.vertex_shader = vertex_shader;
  this.fragment_shader = fragment_shader;
  this.id = GLProgram.id++;
  GLProgram.programs[this.id] = this;
  this.name = options.name;
  this.compile(options.callback);
}
;
GLProgram.prototype.use = function() {
  if (!this.compiled) {
    return;
  }
  if (GLProgram.current != this) {
    this.gl.useProgram(this.program);
  }
  GLProgram.current = this;
};
GLProgram.current = null;
GLProgram.defines = {};
GLProgram.prototype.compile = function(callback) {
  var $__0 = this;
  var queue = Queue();
  this.computed_vertex_shader = this.vertex_shader;
  this.computed_fragment_shader = this.fragment_shader;
  var defines = this.buildDefineList();
  var regexp;
  var loaded_transforms = {};
  if (this.transforms != null) {
    for (var key in this.transforms) {
      var transform = this.transforms[key];
      if (transform == null) {
        continue;
      }
      if (typeof transform == 'string' || (typeof transform == 'object' && transform.length == null)) {
        transform = [transform];
      }
      var regexp = new RegExp('^\\s*#pragma\\s+tangram:\\s+' + key + '\\s*$', 'm');
      var inject_vertex = this.computed_vertex_shader.match(regexp);
      var inject_fragment = this.computed_fragment_shader.match(regexp);
      if (inject_vertex == null && inject_fragment == null) {
        continue;
      }
      loaded_transforms[key] = {};
      loaded_transforms[key].regexp = new RegExp(regexp);
      loaded_transforms[key].inject_vertex = (inject_vertex != null);
      loaded_transforms[key].inject_fragment = (inject_fragment != null);
      loaded_transforms[key].list = [];
      for (var u = 0; u < transform.length; u++) {
        queue.defer(GLProgram.loadTransform, loaded_transforms, transform[u], key, u);
      }
      defines['TANGRAM_TRANSFORM_' + key.replace(' ', '_').toUpperCase()] = true;
    }
  }
  queue.await((function(error) {
    if (error) {
      console.log("error loading transforms: " + error);
      return;
    }
    for (var t in loaded_transforms) {
      var combined_source = "";
      for (var s = 0; s < loaded_transforms[t].list.length; s++) {
        combined_source += loaded_transforms[t].list[s] + '\n';
      }
      if (loaded_transforms[t].inject_vertex != null) {
        $__0.computed_vertex_shader = $__0.computed_vertex_shader.replace(loaded_transforms[t].regexp, combined_source);
      }
      if (loaded_transforms[t].inject_fragment != null) {
        $__0.computed_fragment_shader = $__0.computed_fragment_shader.replace(loaded_transforms[t].regexp, combined_source);
      }
    }
    var regexp = new RegExp('^\\s*#pragma\\s+tangram:\\s+\\w+\\s*$', 'gm');
    $__0.computed_vertex_shader = $__0.computed_vertex_shader.replace(regexp, '');
    $__0.computed_fragment_shader = $__0.computed_fragment_shader.replace(regexp, '');
    var define_str = GLProgram.buildDefineString(defines);
    $__0.computed_vertex_shader = define_str + $__0.computed_vertex_shader;
    $__0.computed_fragment_shader = define_str + $__0.computed_fragment_shader;
    var info = ($__0.name ? ($__0.name + ' / id ' + $__0.id) : ('id ' + $__0.id));
    $__0.computed_vertex_shader = '// Program: ' + info + '\n' + $__0.computed_vertex_shader;
    $__0.computed_fragment_shader = '// Program: ' + info + '\n' + $__0.computed_fragment_shader;
    try {
      $__0.program = GL.updateProgram($__0.gl, $__0.program, $__0.computed_vertex_shader, $__0.computed_fragment_shader);
      $__0.compiled = true;
    } catch (e) {
      $__0.program = null;
      $__0.compiled = false;
    }
    $__0.use();
    $__0.refreshUniforms();
    $__0.refreshAttributes();
    if (typeof callback == 'function') {
      callback();
    }
  }));
};
GLProgram.loadTransform = function(transforms, block, key, index, complete) {
  var type,
      value,
      source;
  if (typeof block == 'string') {
    transforms[key].list[index] = block;
    complete();
  } else if (typeof block == 'object' && block.url) {
    var req = new XMLHttpRequest();
    req.onload = function() {
      source = req.response;
      transforms[key].list[index] = source;
      complete();
    };
    req.open('GET', Utils.urlForPath(block.url) + '?' + (+new Date()), true);
    req.responseType = 'text';
    req.send();
  }
};
GLProgram.prototype.buildDefineList = function() {
  var defines = {};
  for (var d in GLProgram.defines) {
    defines[d] = GLProgram.defines[d];
  }
  for (var d in this.defines) {
    defines[d] = this.defines[d];
  }
  return defines;
};
GLProgram.buildDefineString = function(defines) {
  var define_str = "";
  for (var d in defines) {
    if (defines[d] == false) {
      continue;
    } else if (typeof defines[d] == 'boolean' && defines[d] == true) {
      define_str += "#define " + d + "\n";
    } else if (typeof defines[d] == 'number' && Math.floor(defines[d]) == defines[d]) {
      define_str += "#define " + d + " " + defines[d].toFixed(1) + "\n";
    } else {
      define_str += "#define " + d + " " + defines[d] + "\n";
    }
  }
  return define_str;
};
GLProgram.prototype.setUniforms = function(uniforms) {
  var texture_unit = 0;
  for (var u in uniforms) {
    var uniform = uniforms[u];
    if (typeof uniform == 'number') {
      this.uniform('1f', u, uniform);
    } else if (typeof uniform == 'object') {
      if (uniform.length >= 2 && uniform.length <= 4) {
        this.uniform(uniform.length + 'fv', u, uniform);
      } else if (uniform.length > 4) {
        this.uniform('1fv', u + '[0]', uniform);
      }
    } else if (typeof this.shaders.uniforms[u] == 'boolean') {
      this.uniform('1i', u, uniform);
    } else if (typeof uniform == 'string') {
      var texture = GLTexture.textures[uniform];
      if (texture == null) {
        texture = new GLTexture(this.gl, uniform);
        texture.load(uniform);
      }
      texture.bind(texture_unit);
      this.uniform('1i', u, texture_unit);
      texture_unit++;
    }
  }
};
GLProgram.prototype.uniform = function(method, name) {
  if (!this.compiled) {
    return;
  }
  var uniform = (this.uniforms[name] = this.uniforms[name] || {});
  uniform.name = name;
  uniform.location = uniform.location || this.gl.getUniformLocation(this.program, name);
  uniform.method = 'uniform' + method;
  uniform.values = Array.prototype.slice.call(arguments, 2);
  this.updateUniform(name);
};
GLProgram.prototype.updateUniform = function(name) {
  if (!this.compiled) {
    return;
  }
  var uniform = this.uniforms[name];
  if (uniform == null || uniform.location == null) {
    return;
  }
  this.use();
  this.gl[uniform.method].apply(this.gl, [uniform.location].concat(uniform.values));
};
GLProgram.prototype.refreshUniforms = function() {
  if (!this.compiled) {
    return;
  }
  for (var u in this.uniforms) {
    this.uniforms[u].location = this.gl.getUniformLocation(this.program, u);
    this.updateUniform(u);
  }
};
GLProgram.prototype.refreshAttributes = function() {
  this.attribs = {};
};
GLProgram.prototype.attribute = function(name) {
  if (!this.compiled) {
    return;
  }
  var attrib = (this.attribs[name] = this.attribs[name] || {});
  if (attrib.location != null) {
    return attrib;
  }
  attrib.name = name;
  attrib.location = this.gl.getAttribLocation(this.program, name);
  return attrib;
};
if (module !== undefined) {
  module.exports = GLProgram;
}


},{"../utils.js":17,"./gl.js":4,"./gl_texture.js":10,"queue-async":2}],9:[function(_dereq_,module,exports){
"use strict";
var shader_sources = {};
shader_sources['point_fragment'] = "\n" + "#define GLSLIFY 1\n" + "\n" + "uniform vec2 u_resolution;\n" + "varying vec3 v_color;\n" + "varying vec2 v_texcoord;\n" + "void main(void) {\n" + "  vec3 color = v_color;\n" + "  vec3 lighting = vec3(1.);\n" + "  float len = length(v_texcoord);\n" + "  if(len > 1.) {\n" + "    discard;\n" + "  }\n" + "  color *= (1. - smoothstep(.25, 1., len)) + 0.5;\n" + "  #pragma tangram: fragment\n" + "  gl_FragColor = vec4(color, 1.);\n" + "}\n" + "";
shader_sources['point_vertex'] = "\n" + "#define GLSLIFY 1\n" + "\n" + "uniform mat4 u_tile_view;\n" + "uniform mat4 u_meter_view;\n" + "uniform float u_num_layers;\n" + "attribute vec3 a_position;\n" + "attribute vec2 a_texcoord;\n" + "attribute vec3 a_color;\n" + "attribute float a_layer;\n" + "varying vec3 v_color;\n" + "varying vec2 v_texcoord;\n" + "#if defined(FEATURE_SELECTION)\n" + "\n" + "attribute vec4 a_selection_color;\n" + "varying vec4 v_selection_color;\n" + "#endif\n" + "\n" + "float a_x_calculateZ(float z, float layer, const float num_layers, const float z_layer_scale) {\n" + "  float z_layer_range = (num_layers + 1.) * z_layer_scale;\n" + "  float z_layer = (layer + 1.) * z_layer_scale;\n" + "  z = z_layer + clamp(z, 0., z_layer_scale);\n" + "  z = (z_layer_range - z) / z_layer_range;\n" + "  return z;\n" + "}\n" + "#pragma tangram: globals\n" + "\n" + "void main() {\n" + "  \n" + "  #if defined(FEATURE_SELECTION)\n" + "  if(a_selection_color.xyz == vec3(0.)) {\n" + "    gl_Position = vec4(0.);\n" + "    return;\n" + "  }\n" + "  v_selection_color = a_selection_color;\n" + "  #endif\n" + "  vec4 position = u_meter_view * u_tile_view * vec4(a_position, 1.);\n" + "  #pragma tangram: vertex\n" + "  v_color = a_color;\n" + "  v_texcoord = a_texcoord;\n" + "  position.z = a_x_calculateZ(position.z, a_layer, u_num_layers, 256.);\n" + "  gl_Position = position;\n" + "}\n" + "";
shader_sources['polygon_fragment'] = "\n" + "#define GLSLIFY 1\n" + "\n" + "uniform vec2 u_resolution;\n" + "uniform vec2 u_aspect;\n" + "uniform mat4 u_meter_view;\n" + "uniform float u_meters_per_pixel;\n" + "uniform float u_time;\n" + "uniform float u_map_zoom;\n" + "uniform vec2 u_map_center;\n" + "uniform vec2 u_tile_origin;\n" + "uniform float u_test;\n" + "uniform float u_test2;\n" + "varying vec3 v_color;\n" + "varying vec4 v_world_position;\n" + "#if defined(WORLD_POSITION_WRAP)\n" + "\n" + "vec2 world_position_anchor = vec2(floor(u_tile_origin / WORLD_POSITION_WRAP) * WORLD_POSITION_WRAP);\n" + "vec4 absoluteWorldPosition() {\n" + "  return vec4(v_world_position.xy + world_position_anchor, v_world_position.z, v_world_position.w);\n" + "}\n" + "#else\n" + "\n" + "vec4 absoluteWorldPosition() {\n" + "  return v_world_position;\n" + "}\n" + "#endif\n" + "\n" + "#if defined(LIGHTING_ENVIRONMENT)\n" + "\n" + "uniform sampler2D u_env_map;\n" + "#endif\n" + "\n" + "#if !defined(LIGHTING_VERTEX)\n" + "\n" + "varying vec4 v_position;\n" + "varying vec3 v_normal;\n" + "#else\n" + "\n" + "varying vec3 v_lighting;\n" + "#endif\n" + "\n" + "const float light_ambient = 0.5;\n" + "vec3 b_x_pointLight(vec4 position, vec3 normal, vec3 color, vec4 light_pos, float light_ambient, const bool backlight) {\n" + "  vec3 light_dir = normalize(position.xyz - light_pos.xyz);\n" + "  color *= abs(max(float(backlight) * -1., dot(normal, light_dir * -1.0))) + light_ambient;\n" + "  return color;\n" + "}\n" + "vec3 c_x_specularLight(vec4 position, vec3 normal, vec3 color, vec4 light_pos, float light_ambient, const bool backlight) {\n" + "  vec3 light_dir = normalize(position.xyz - light_pos.xyz);\n" + "  vec3 view_pos = vec3(0., 0., 500.);\n" + "  vec3 view_dir = normalize(position.xyz - view_pos.xyz);\n" + "  vec3 specularReflection;\n" + "  if(dot(normal, -light_dir) < 0.0) {\n" + "    specularReflection = vec3(0.0, 0.0, 0.0);\n" + "  } else {\n" + "    float attenuation = 1.0;\n" + "    float lightSpecularTerm = 1.0;\n" + "    float materialSpecularTerm = 10.0;\n" + "    float materialShininessTerm = 10.0;\n" + "    specularReflection = attenuation * vec3(lightSpecularTerm) * vec3(materialSpecularTerm) * pow(max(0.0, dot(reflect(-light_dir, normal), view_dir)), materialShininessTerm);\n" + "  }\n" + "  float diffuse = abs(max(float(backlight) * -1., dot(normal, light_dir * -1.0)));\n" + "  color *= diffuse + specularReflection + light_ambient;\n" + "  return color;\n" + "}\n" + "vec3 d_x_directionalLight(vec3 normal, vec3 color, vec3 light_dir, float light_ambient) {\n" + "  light_dir = normalize(light_dir);\n" + "  color *= dot(normal, light_dir * -1.0) + light_ambient;\n" + "  return color;\n" + "}\n" + "vec3 a_x_lighting(vec4 position, vec3 normal, vec3 color, vec4 light_pos, vec4 night_light_pos, vec3 light_dir, float light_ambient) {\n" + "  \n" + "  #if defined(LIGHTING_POINT)\n" + "  color = b_x_pointLight(position, normal, color, light_pos, light_ambient, true);\n" + "  #elif defined(LIGHTING_POINT_SPECULAR)\n" + "  color = c_x_specularLight(position, normal, color, light_pos, light_ambient, true);\n" + "  #elif defined(LIGHTING_NIGHT)\n" + "  color = b_x_pointLight(position, normal, color, night_light_pos, 0., false);\n" + "  #elif defined(LIGHTING_DIRECTION)\n" + "  color = d_x_directionalLight(normal, color, light_dir, light_ambient);\n" + "  #else\n" + "  color = color;\n" + "  #endif\n" + "  return color;\n" + "}\n" + "vec4 e_x_sphericalEnvironmentMap(vec3 view_pos, vec3 position, vec3 normal, sampler2D envmap) {\n" + "  vec3 eye = normalize(position.xyz - view_pos.xyz);\n" + "  if(eye.z > 0.01) {\n" + "    eye.z = 0.01;\n" + "  }\n" + "  vec3 r = reflect(eye, normal);\n" + "  float m = 2. * sqrt(pow(r.x, 2.) + pow(r.y, 2.) + pow(r.z + 1., 2.));\n" + "  vec2 uv = r.xy / m + .5;\n" + "  return texture2D(envmap, uv);\n" + "}\n" + "#pragma tangram: globals\n" + "\n" + "void main(void) {\n" + "  vec3 color = v_color;\n" + "  #if defined(LIGHTING_ENVIRONMENT)\n" + "  vec3 view_pos = vec3(0., 0., 100. * u_meters_per_pixel);\n" + "  color = e_x_sphericalEnvironmentMap(view_pos, v_position.xyz, v_normal, u_env_map).rgb;\n" + "  #endif\n" + "  \n" + "  #if !defined(LIGHTING_VERTEX) // default to per-pixel lighting\n" + "  vec3 lighting = a_x_lighting(v_position, v_normal, vec3(1.), vec4(0., 0., 150. * u_meters_per_pixel, 1.), vec4(0., 0., 50. * u_meters_per_pixel, 1.), vec3(0.2, 0.7, -0.5), light_ambient);\n" + "  #else\n" + "  vec3 lighting = v_lighting;\n" + "  #endif\n" + "  vec3 color_prelight = color;\n" + "  color *= lighting;\n" + "  #pragma tangram: fragment\n" + "  gl_FragColor = vec4(color, 1.0);\n" + "}\n" + "";
shader_sources['polygon_vertex'] = "\n" + "#define GLSLIFY 1\n" + "\n" + "uniform vec2 u_resolution;\n" + "uniform vec2 u_aspect;\n" + "uniform float u_time;\n" + "uniform float u_map_zoom;\n" + "uniform vec2 u_map_center;\n" + "uniform vec2 u_tile_origin;\n" + "uniform mat4 u_tile_world;\n" + "uniform mat4 u_tile_view;\n" + "uniform mat4 u_meter_view;\n" + "uniform float u_meters_per_pixel;\n" + "uniform float u_num_layers;\n" + "attribute vec3 a_position;\n" + "attribute vec3 a_normal;\n" + "attribute vec3 a_color;\n" + "attribute float a_layer;\n" + "varying vec4 v_world_position;\n" + "varying vec3 v_color;\n" + "#if defined(WORLD_POSITION_WRAP)\n" + "\n" + "vec2 world_position_anchor = vec2(floor(u_tile_origin / WORLD_POSITION_WRAP) * WORLD_POSITION_WRAP);\n" + "vec4 absoluteWorldPosition() {\n" + "  return vec4(v_world_position.xy + world_position_anchor, v_world_position.z, v_world_position.w);\n" + "}\n" + "#else\n" + "\n" + "vec4 absoluteWorldPosition() {\n" + "  return v_world_position;\n" + "}\n" + "#endif\n" + "\n" + "#if defined(FEATURE_SELECTION)\n" + "\n" + "attribute vec4 a_selection_color;\n" + "varying vec4 v_selection_color;\n" + "#endif\n" + "\n" + "#if !defined(LIGHTING_VERTEX)\n" + "\n" + "varying vec4 v_position;\n" + "varying vec3 v_normal;\n" + "#else\n" + "\n" + "varying vec3 v_lighting;\n" + "#endif\n" + "\n" + "const float light_ambient = 0.5;\n" + "vec4 a_x_perspective(vec4 position, const vec2 perspective_offset, const vec2 perspective_factor) {\n" + "  position.xy += position.z * perspective_factor * (position.xy - perspective_offset);\n" + "  return position;\n" + "}\n" + "vec4 b_x_isometric(vec4 position, const vec2 axis, const float multiplier) {\n" + "  position.xy += position.z * axis * multiplier / u_aspect;\n" + "  return position;\n" + "}\n" + "float c_x_calculateZ(float z, float layer, const float num_layers, const float z_layer_scale) {\n" + "  float z_layer_range = (num_layers + 1.) * z_layer_scale;\n" + "  float z_layer = (layer + 1.) * z_layer_scale;\n" + "  z = z_layer + clamp(z, 0., z_layer_scale);\n" + "  z = (z_layer_range - z) / z_layer_range;\n" + "  return z;\n" + "}\n" + "vec3 e_x_pointLight(vec4 position, vec3 normal, vec3 color, vec4 light_pos, float light_ambient, const bool backlight) {\n" + "  vec3 light_dir = normalize(position.xyz - light_pos.xyz);\n" + "  color *= abs(max(float(backlight) * -1., dot(normal, light_dir * -1.0))) + light_ambient;\n" + "  return color;\n" + "}\n" + "vec3 f_x_specularLight(vec4 position, vec3 normal, vec3 color, vec4 light_pos, float light_ambient, const bool backlight) {\n" + "  vec3 light_dir = normalize(position.xyz - light_pos.xyz);\n" + "  vec3 view_pos = vec3(0., 0., 500.);\n" + "  vec3 view_dir = normalize(position.xyz - view_pos.xyz);\n" + "  vec3 specularReflection;\n" + "  if(dot(normal, -light_dir) < 0.0) {\n" + "    specularReflection = vec3(0.0, 0.0, 0.0);\n" + "  } else {\n" + "    float attenuation = 1.0;\n" + "    float lightSpecularTerm = 1.0;\n" + "    float materialSpecularTerm = 10.0;\n" + "    float materialShininessTerm = 10.0;\n" + "    specularReflection = attenuation * vec3(lightSpecularTerm) * vec3(materialSpecularTerm) * pow(max(0.0, dot(reflect(-light_dir, normal), view_dir)), materialShininessTerm);\n" + "  }\n" + "  float diffuse = abs(max(float(backlight) * -1., dot(normal, light_dir * -1.0)));\n" + "  color *= diffuse + specularReflection + light_ambient;\n" + "  return color;\n" + "}\n" + "vec3 g_x_directionalLight(vec3 normal, vec3 color, vec3 light_dir, float light_ambient) {\n" + "  light_dir = normalize(light_dir);\n" + "  color *= dot(normal, light_dir * -1.0) + light_ambient;\n" + "  return color;\n" + "}\n" + "vec3 d_x_lighting(vec4 position, vec3 normal, vec3 color, vec4 light_pos, vec4 night_light_pos, vec3 light_dir, float light_ambient) {\n" + "  \n" + "  #if defined(LIGHTING_POINT)\n" + "  color = e_x_pointLight(position, normal, color, light_pos, light_ambient, true);\n" + "  #elif defined(LIGHTING_POINT_SPECULAR)\n" + "  color = f_x_specularLight(position, normal, color, light_pos, light_ambient, true);\n" + "  #elif defined(LIGHTING_NIGHT)\n" + "  color = e_x_pointLight(position, normal, color, night_light_pos, 0., false);\n" + "  #elif defined(LIGHTING_DIRECTION)\n" + "  color = g_x_directionalLight(normal, color, light_dir, light_ambient);\n" + "  #else\n" + "  color = color;\n" + "  #endif\n" + "  return color;\n" + "}\n" + "#pragma tangram: globals\n" + "\n" + "void main() {\n" + "  \n" + "  #if defined(FEATURE_SELECTION)\n" + "  if(a_selection_color.xyz == vec3(0.)) {\n" + "    gl_Position = vec4(0.);\n" + "    return;\n" + "  }\n" + "  v_selection_color = a_selection_color;\n" + "  #endif\n" + "  vec4 position = u_tile_view * vec4(a_position, 1.);\n" + "  v_world_position = u_tile_world * vec4(a_position, 1.);\n" + "  #if defined(WORLD_POSITION_WRAP)\n" + "  v_world_position.xy -= world_position_anchor;\n" + "  #endif\n" + "  \n" + "  #pragma tangram: vertex\n" + "  \n" + "  #if defined(LIGHTING_VERTEX)\n" + "  v_color = a_color;\n" + "  v_lighting = d_x_lighting(position, a_normal, vec3(1.), vec4(0., 0., 150. * u_meters_per_pixel, 1.), vec4(0., 0., 50. * u_meters_per_pixel, 1.), vec3(0.2, 0.7, -0.5), light_ambient);\n" + "  #else\n" + "  v_position = position;\n" + "  v_normal = a_normal;\n" + "  v_color = a_color;\n" + "  #endif\n" + "  position = u_meter_view * position;\n" + "  #if defined(PROJECTION_PERSPECTIVE)\n" + "  position = a_x_perspective(position, vec2(0., 0.), vec2(0.6, 0.6));\n" + "  #elif defined(PROJECTION_ISOMETRIC) // || defined(PROJECTION_POPUP)\n" + "  position = b_x_isometric(position, vec2(0., 1.), 1.);\n" + "  #endif\n" + "  position.z = c_x_calculateZ(position.z, a_layer, u_num_layers, 4096.);\n" + "  gl_Position = position;\n" + "}\n" + "";
shader_sources['selection_fragment'] = "\n" + "#define GLSLIFY 1\n" + "\n" + "#if defined(FEATURE_SELECTION)\n" + "\n" + "varying vec4 v_selection_color;\n" + "#endif\n" + "\n" + "void main(void) {\n" + "  \n" + "  #if defined(FEATURE_SELECTION)\n" + "  gl_FragColor = v_selection_color;\n" + "  #else\n" + "  gl_FragColor = vec3(0., 0., 0., 1.);\n" + "  #endif\n" + "  \n" + "}\n" + "";
shader_sources['simple_polygon_fragment'] = "\n" + "#define GLSLIFY 1\n" + "\n" + "uniform float u_meters_per_pixel;\n" + "varying vec3 v_color;\n" + "#if !defined(LIGHTING_VERTEX)\n" + "\n" + "varying vec4 v_position;\n" + "varying vec3 v_normal;\n" + "#endif\n" + "\n" + "vec3 a_x_pointLight(vec4 position, vec3 normal, vec3 color, vec4 light_pos, float light_ambient, const bool backlight) {\n" + "  vec3 light_dir = normalize(position.xyz - light_pos.xyz);\n" + "  color *= abs(max(float(backlight) * -1., dot(normal, light_dir * -1.0))) + light_ambient;\n" + "  return color;\n" + "}\n" + "#pragma tangram: globals\n" + "\n" + "void main(void) {\n" + "  vec3 color;\n" + "  #if !defined(LIGHTING_VERTEX) // default to per-pixel lighting\n" + "  vec4 light_pos = vec4(0., 0., 150. * u_meters_per_pixel, 1.);\n" + "  const float light_ambient = 0.5;\n" + "  const bool backlit = true;\n" + "  color = a_x_pointLight(v_position, v_normal, v_color, light_pos, light_ambient, backlit);\n" + "  #else\n" + "  color = v_color;\n" + "  #endif\n" + "  \n" + "  #pragma tangram: fragment\n" + "  gl_FragColor = vec4(color, 1.0);\n" + "}\n" + "";
shader_sources['simple_polygon_vertex'] = "\n" + "#define GLSLIFY 1\n" + "\n" + "uniform vec2 u_aspect;\n" + "uniform mat4 u_tile_view;\n" + "uniform mat4 u_meter_view;\n" + "uniform float u_meters_per_pixel;\n" + "uniform float u_num_layers;\n" + "attribute vec3 a_position;\n" + "attribute vec3 a_normal;\n" + "attribute vec3 a_color;\n" + "attribute float a_layer;\n" + "varying vec3 v_color;\n" + "#if !defined(LIGHTING_VERTEX)\n" + "\n" + "varying vec4 v_position;\n" + "varying vec3 v_normal;\n" + "#endif\n" + "\n" + "vec4 a_x_perspective(vec4 position, const vec2 perspective_offset, const vec2 perspective_factor) {\n" + "  position.xy += position.z * perspective_factor * (position.xy - perspective_offset);\n" + "  return position;\n" + "}\n" + "vec4 b_x_isometric(vec4 position, const vec2 axis, const float multiplier) {\n" + "  position.xy += position.z * axis * multiplier / u_aspect;\n" + "  return position;\n" + "}\n" + "float c_x_calculateZ(float z, float layer, const float num_layers, const float z_layer_scale) {\n" + "  float z_layer_range = (num_layers + 1.) * z_layer_scale;\n" + "  float z_layer = (layer + 1.) * z_layer_scale;\n" + "  z = z_layer + clamp(z, 0., z_layer_scale);\n" + "  z = (z_layer_range - z) / z_layer_range;\n" + "  return z;\n" + "}\n" + "vec3 d_x_pointLight(vec4 position, vec3 normal, vec3 color, vec4 light_pos, float light_ambient, const bool backlight) {\n" + "  vec3 light_dir = normalize(position.xyz - light_pos.xyz);\n" + "  color *= abs(max(float(backlight) * -1., dot(normal, light_dir * -1.0))) + light_ambient;\n" + "  return color;\n" + "}\n" + "#pragma tangram: globals\n" + "\n" + "void main() {\n" + "  vec4 position = u_tile_view * vec4(a_position, 1.);\n" + "  #pragma tangram: vertex\n" + "  \n" + "  #if defined(LIGHTING_VERTEX)\n" + "  vec4 light_pos = vec4(0., 0., 150. * u_meters_per_pixel, 1.);\n" + "  const float light_ambient = 0.5;\n" + "  const bool backlit = true;\n" + "  v_color = d_x_pointLight(position, a_normal, a_color, light_pos, light_ambient, backlit);\n" + "  #else\n" + "  v_position = position;\n" + "  v_normal = a_normal;\n" + "  v_color = a_color;\n" + "  #endif\n" + "  position = u_meter_view * position;\n" + "  #if defined(PROJECTION_PERSPECTIVE)\n" + "  position = a_x_perspective(position, vec2(-0.25, -0.25), vec2(0.6, 0.6));\n" + "  #elif defined(PROJECTION_ISOMETRIC)\n" + "  position = b_x_isometric(position, vec2(0., 1.), 1.);\n" + "  #endif\n" + "  position.z = c_x_calculateZ(position.z, a_layer, u_num_layers, 4096.);\n" + "  gl_Position = position;\n" + "}\n" + "";
if (module.exports !== undefined) {
  module.exports = shader_sources;
}


},{}],10:[function(_dereq_,module,exports){
"use strict";
var GL = _dereq_('./gl.js');
var Utils = _dereq_('../utils.js');
GLTexture.textures = {};
function GLTexture(gl, name, options) {
  options = options || {};
  this.gl = gl;
  this.texture = gl.createTexture();
  this.bind(0);
  this.image = null;
  this.setData(1, 1, new Uint8Array([0, 0, 0, 255]), {filtering: 'nearest'});
  this.name = name;
  GLTexture.textures[this.name] = this;
}
;
GLTexture.prototype.bind = function(unit) {
  this.gl.activeTexture(this.gl.TEXTURE0 + unit);
  this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
};
GLTexture.prototype.load = function(url, options) {
  var $__0 = this;
  options = options || {};
  this.image = new Image();
  this.image.onload = (function() {
    $__0.width = $__0.image.width;
    $__0.height = $__0.image.height;
    $__0.data = null;
    $__0.update(options);
    $__0.setTextureFiltering(options);
  });
  this.image.src = url;
};
GLTexture.prototype.setData = function(width, height, data, options) {
  this.width = width;
  this.height = height;
  this.data = data;
  this.image = null;
  this.update(options);
  this.setTextureFiltering(options);
};
GLTexture.prototype.update = function(options) {
  options = options || {};
  this.bind(0);
  this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, (options.UNPACK_FLIP_Y_WEBGL === false ? false : true));
  if (this.image && this.image.complete) {
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.image);
  } else if (this.width && this.height) {
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.width, this.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.data);
  }
};
GLTexture.prototype.setTextureFiltering = function(options) {
  options = options || {};
  options.filtering = options.filtering || 'mipmap';
  var gl = this.gl;
  if (Utils.isPowerOf2(this.width) && Utils.isPowerOf2(this.height)) {
    this.power_of_2 = true;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, options.TEXTURE_WRAP_S || gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, options.TEXTURE_WRAP_T || gl.CLAMP_TO_EDGE);
    if (options.filtering == 'mipmap') {
      this.filtering = 'mipmap';
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.generateMipmap(gl.TEXTURE_2D);
    } else if (options.filtering == 'linear') {
      this.filtering = 'linear';
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    } else if (options.filtering == 'nearest') {
      this.filtering = 'nearest';
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    }
  } else {
    this.power_of_2 = false;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    if (options.filtering == 'nearest') {
      this.filtering = 'nearest';
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    } else {
      this.filtering = 'linear';
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    }
  }
};
if (module !== undefined) {
  module.exports = GLTexture;
}


},{"../utils.js":17,"./gl.js":4}],11:[function(_dereq_,module,exports){
"use strict";
function GLVertexLayout(gl, attribs) {
  this.attribs = attribs;
  this.stride = 0;
  for (var a = 0; a < this.attribs.length; a++) {
    var attrib = this.attribs[a];
    attrib.byte_size = attrib.size;
    switch (attrib.type) {
      case gl.FLOAT:
      case gl.INT:
      case gl.UNSIGNED_INT:
        attrib.byte_size *= 4;
        break;
      case gl.SHORT:
      case gl.UNSIGNED_SHORT:
        attrib.byte_size *= 2;
        break;
    }
    attrib.offset = this.stride;
    this.stride += attrib.byte_size;
  }
}
GLVertexLayout.enabled_attribs = {};
GLVertexLayout.prototype.enable = function(gl, gl_program) {
  for (var a = 0; a < this.attribs.length; a++) {
    var attrib = this.attribs[a];
    var location = gl_program.attribute(attrib.name).location;
    if (location != -1) {
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, attrib.size, attrib.type, attrib.normalized, this.stride, attrib.offset);
      GLVertexLayout.enabled_attribs[location] = gl_program;
    }
  }
  var unusued_attribs = [];
  for (location in GLVertexLayout.enabled_attribs) {
    if (GLVertexLayout.enabled_attribs[location] != gl_program) {
      gl.disableVertexAttribArray(location);
      unusued_attribs.push(location);
    }
  }
  for (location in unusued_attribs) {
    delete GLVertexLayout.enabled_attribs[location];
  }
};
if (module !== undefined) {
  module.exports = GLVertexLayout;
}


},{}],12:[function(_dereq_,module,exports){
"use strict";
var Scene = _dereq_('./scene.js');
var LeafletLayer = L.GridLayer.extend({
  initialize: function(options) {
    L.setOptions(this, options);
    this.scene = new Scene(this.options.vectorTileSource, this.options.vectorLayers, this.options.vectorStyles, {num_workers: this.options.numWorkers});
    this.scene.debug = this.options.debug;
    this.scene.continuous_animation = false;
  },
  onAdd: function(map) {
    var layer = this;
    layer.on('tileunload', function(event) {
      var tile = event.tile;
      var key = tile.getAttribute('data-tile-key');
      layer.scene.removeTile(key);
    });
    layer._map.on('resize', function() {
      var size = layer._map.getSize();
      layer.scene.resizeMap(size.x, size.y);
      layer.updateBounds();
    });
    layer._map.on('move', function() {
      var center = layer._map.getCenter();
      layer.scene.setCenter(center.lng, center.lat);
      layer.updateBounds();
    });
    layer._map.on('zoomstart', function() {
      console.log("map.zoomstart " + layer._map.getZoom());
      layer.scene.startZoom();
    });
    layer._map.on('zoomend', function() {
      console.log("map.zoomend " + layer._map.getZoom());
      layer.scene.setZoom(layer._map.getZoom());
      layer.updateBounds();
    });
    layer._map.on('dragstart', function() {
      layer.scene.panning = true;
    });
    layer._map.on('dragend', function() {
      layer.scene.panning = false;
    });
    layer.scene.container = layer._map.getContainer();
    var center = layer._map.getCenter();
    layer.scene.setCenter(center.lng, center.lat);
    console.log("zoom: " + layer._map.getZoom());
    layer.scene.setZoom(layer._map.getZoom());
    layer.updateBounds();
    L.GridLayer.prototype.onAdd.apply(this, arguments);
    layer.scene.init(function() {
      layer.fire('init');
    });
  },
  onRemove: function(map) {
    L.GridLayer.prototype.onRemove.apply(this, arguments);
  },
  createTile: function(coords, done) {
    var div = document.createElement('div');
    this.scene.loadTile(coords, div, done);
    return div;
  },
  updateBounds: function() {
    var layer = this;
    var bounds = layer._map.getBounds();
    layer.scene.setBounds(bounds.getSouthWest(), bounds.getNorthEast());
  },
  render: function() {
    this.scene.render();
  }
});
var leafletLayer = function(options) {
  return new LeafletLayer(options);
};
if (module !== undefined) {
  module.exports = {
    LeafletLayer: LeafletLayer,
    leafletLayer: leafletLayer
  };
}


},{"./scene.js":15}],13:[function(_dereq_,module,exports){
"use strict";
var Leaflet = _dereq_('./leaflet_layer.js');
var GL = _dereq_('./gl/gl.js');
GL.Program = _dereq_('./gl/gl_program.js');
GL.Texture = _dereq_('./gl/gl_texture.js');
if (module !== undefined) {
  module.exports = {
    LeafletLayer: Leaflet.LeafletLayer,
    leafletLayer: Leaflet.leafletLayer,
    GL: GL
  };
}


},{"./gl/gl.js":4,"./gl/gl_program.js":8,"./gl/gl_texture.js":10,"./leaflet_layer.js":12}],14:[function(_dereq_,module,exports){
"use strict";
function Point(x, y) {
  return {
    x: x,
    y: y
  };
}
Point.copy = function(p) {
  if (p == null) {
    return null;
  }
  return {
    x: p.x,
    y: p.y
  };
};
if (module !== undefined) {
  module.exports = Point;
}


},{}],15:[function(_dereq_,module,exports){
"use strict";
var Point = _dereq_('./point.js');
var Geo = _dereq_('./geo.js');
var Style = _dereq_('./style.js');
var ModeManager = _dereq_('./gl/gl_modes').ModeManager;
var Utils = _dereq_('./utils.js');
var Queue = _dereq_('queue-async');
var GL = _dereq_('./gl/gl.js');
var GLProgram = _dereq_('./gl/gl_program.js');
var GLBuilders = _dereq_('./gl/gl_builders.js');
var GLTexture = _dereq_('./gl/gl_texture.js');
var mat4 = _dereq_('gl-matrix').mat4;
var vec3 = _dereq_('gl-matrix').vec3;
var yaml;
Utils.runIfInMainThread(function() {
  try {
    yaml = _dereq_('js-yaml');
  } catch (e) {
    console.log("no YAML support, js-yaml module not found");
  }
  findBaseLibraryURL();
});
Scene.tile_scale = 4096;
Geo.setTileScale(Scene.tile_scale);
GLBuilders.setTileScale(Scene.tile_scale);
GLProgram.defines.TILE_SCALE = Scene.tile_scale;
Scene.debug = false;
function Scene(tile_source, layers, styles, options) {
  var options = options || {};
  this.initialized = false;
  this.tile_source = tile_source;
  this.tiles = {};
  this.queued_tiles = [];
  this.num_workers = options.num_workers || 1;
  this.allow_cross_domain_workers = (options.allow_cross_domain_workers === false ? false : true);
  this.layers = layers;
  this.styles = styles;
  this.dirty = true;
  this.animated = false;
  this.frame = 0;
  this.zoom = null;
  this.center = null;
  this.device_pixel_ratio = window.devicePixelRatio || 1;
  this.zooming = false;
  this.panning = false;
  this.container = options.container;
  this.resetTime();
}
Scene.prototype.init = function(callback) {
  var $__0 = this;
  if (this.initialized) {
    return;
  }
  this.loadScene((function() {
    var queue = Queue();
    queue.defer((function(complete) {
      $__0.modes = Scene.createModes($__0.styles);
      $__0.updateActiveModes();
      complete();
    }));
    queue.defer((function(complete) {
      $__0.createWorkers(complete);
    }));
    queue.await((function() {
      $__0.container = $__0.container || document.body;
      $__0.canvas = document.createElement('canvas');
      $__0.canvas.style.position = 'absolute';
      $__0.canvas.style.top = 0;
      $__0.canvas.style.left = 0;
      $__0.canvas.style.zIndex = -1;
      $__0.container.appendChild($__0.canvas);
      $__0.gl = GL.getContext($__0.canvas);
      $__0.resizeMap($__0.container.clientWidth, $__0.container.clientHeight);
      $__0.initModes();
      $__0.initSelectionBuffer();
      $__0.last_render_count = null;
      $__0.initInputHandlers();
      $__0.initialized = true;
      if (typeof callback == 'function') {
        callback();
      }
    }));
  }));
};
Scene.prototype.initModes = function() {
  for (var m in this.modes) {
    this.modes[m].init(this.gl);
  }
};
Scene.prototype.initSelectionBuffer = function() {
  this.pixel = new Uint8Array(4);
  this.pixel32 = new Float32Array(this.pixel.buffer);
  this.selection_point = Point(0, 0);
  this.selected_feature = null;
  this.selection_callback = null;
  this.selection_callback_timer = null;
  this.selection_frame_delay = 5;
  this.update_selection = false;
  this.fbo = this.gl.createFramebuffer();
  this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo);
  this.fbo_size = {
    width: 256,
    height: 256
  };
  this.gl.viewport(0, 0, this.fbo_size.width, this.fbo_size.height);
  this.fbo_texture = new GLTexture(this.gl, 'selection_fbo');
  this.fbo_texture.setData(this.fbo_size.width, this.fbo_size.height, null, {filtering: 'nearest'});
  this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.fbo_texture.texture, 0);
  this.fbo_depth_rb = this.gl.createRenderbuffer();
  this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.fbo_depth_rb);
  this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, this.fbo_size.width, this.fbo_size.height);
  this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.fbo_depth_rb);
  this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
  this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
};
Scene.prototype.createWorkers = function(callback) {
  var $__0 = this;
  var queue = Queue();
  var worker_url = Scene.library_base_url + 'tangram-worker.min.js' + '?' + (+new Date());
  queue.defer((function(complete) {
    var createObjectURL = (window.URL && window.URL.createObjectURL) || (window.webkitURL && window.webkitURL.createObjectURL);
    if (createObjectURL && $__0.allow_cross_domain_workers) {
      var req = new XMLHttpRequest();
      req.onload = (function() {
        var worker_local_url = createObjectURL(new Blob([req.response], {type: 'application/javascript'}));
        $__0.makeWorkers(worker_local_url);
        complete();
      });
      req.open('GET', worker_url, true);
      req.responseType = 'text';
      req.send();
    } else {
      console.log($__0);
      $__0.makeWorkers(worker_url);
      complete();
    }
  }));
  queue.await((function() {
    $__0.workers.forEach((function(worker) {
      worker.addEventListener('message', $__0.workerBuildTileCompleted.bind($__0));
      worker.addEventListener('message', $__0.workerGetFeatureSelection.bind($__0));
      worker.addEventListener('message', $__0.workerLogMessage.bind($__0));
    }));
    $__0.next_worker = 0;
    $__0.selection_map_worker_size = {};
    if (typeof callback == 'function') {
      callback();
    }
  }));
};
Scene.prototype.makeWorkers = function(url) {
  this.workers = [];
  for (var w = 0; w < this.num_workers; w++) {
    this.workers.push(new Worker(url));
    this.workers[w].postMessage({
      type: 'init',
      worker_id: w,
      num_workers: this.num_workers
    });
  }
};
Scene.prototype.workerPostMessageForTile = function(tile, message) {
  if (tile.worker == null) {
    tile.worker = this.next_worker;
    this.next_worker = (tile.worker + 1) % this.workers.length;
  }
  this.workers[tile.worker].postMessage(message);
};
Scene.prototype.setCenter = function(lng, lat) {
  this.center = {
    lng: lng,
    lat: lat
  };
  this.dirty = true;
};
Scene.prototype.startZoom = function() {
  this.last_zoom = this.zoom;
  this.zooming = true;
};
Scene.prototype.preserve_tiles_within_zoom = 2;
Scene.prototype.setZoom = function(zoom) {
  var below = zoom;
  var above = zoom;
  if (this.last_zoom != null) {
    console.log("scene.last_zoom: " + this.last_zoom);
    if (Math.abs(zoom - this.last_zoom) <= this.preserve_tiles_within_zoom) {
      if (zoom > this.last_zoom) {
        below = zoom - this.preserve_tiles_within_zoom;
      } else {
        above = zoom + this.preserve_tiles_within_zoom;
      }
    }
  }
  this.last_zoom = this.zoom;
  this.zoom = zoom;
  this.capped_zoom = Math.min(~~this.zoom, this.tile_source.max_zoom || ~~this.zoom);
  this.zooming = false;
  this.removeTilesOutsideZoomRange(below, above);
  this.dirty = true;
};
Scene.prototype.removeTilesOutsideZoomRange = function(below, above) {
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
  for (var r = 0; r < remove_tiles.length; r++) {
    var key = remove_tiles[r];
    console.log("removed " + key + " (outside range [" + below + ", " + above + "])");
    this.removeTile(key);
  }
};
Scene.prototype.setBounds = function(sw, ne) {
  this.bounds = {
    sw: {
      lng: sw.lng,
      lat: sw.lat
    },
    ne: {
      lng: ne.lng,
      lat: ne.lat
    }
  };
  var buffer = 200 * Geo.meters_per_pixel[~~this.zoom];
  this.buffered_meter_bounds = {
    sw: Geo.latLngToMeters(Point(this.bounds.sw.lng, this.bounds.sw.lat)),
    ne: Geo.latLngToMeters(Point(this.bounds.ne.lng, this.bounds.ne.lat))
  };
  this.buffered_meter_bounds.sw.x -= buffer;
  this.buffered_meter_bounds.sw.y -= buffer;
  this.buffered_meter_bounds.ne.x += buffer;
  this.buffered_meter_bounds.ne.y += buffer;
  this.center_meters = Point((this.buffered_meter_bounds.sw.x + this.buffered_meter_bounds.ne.x) / 2, (this.buffered_meter_bounds.sw.y + this.buffered_meter_bounds.ne.y) / 2);
  for (var t in this.tiles) {
    this.updateVisibilityForTile(this.tiles[t]);
  }
  this.dirty = true;
};
Scene.prototype.isTileInZoom = function(tile) {
  return (Math.min(tile.coords.z, this.tile_source.max_zoom || tile.coords.z) == this.capped_zoom);
};
Scene.prototype.updateVisibilityForTile = function(tile) {
  var visible = tile.visible;
  tile.visible = this.isTileInZoom(tile) && Geo.boxIntersect(tile.bounds, this.buffered_meter_bounds);
  tile.center_dist = Math.abs(this.center_meters.x - tile.min.x) + Math.abs(this.center_meters.y - tile.min.y);
  return (visible != tile.visible);
};
Scene.prototype.resizeMap = function(width, height) {
  this.dirty = true;
  this.css_size = {
    width: width,
    height: height
  };
  this.device_size = {
    width: Math.round(this.css_size.width * this.device_pixel_ratio),
    height: Math.round(this.css_size.height * this.device_pixel_ratio)
  };
  this.canvas.style.width = this.css_size.width + 'px';
  this.canvas.style.height = this.css_size.height + 'px';
  this.canvas.width = this.device_size.width;
  this.canvas.height = this.device_size.height;
  this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
  this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
};
Scene.prototype.requestRedraw = function() {
  this.dirty = true;
};
Scene.calculateZ = function(layer, tile, layer_offset, feature_offset) {
  var z = 0;
  return z;
};
Scene.prototype.render = function() {
  this.loadQueuedTiles();
  if (this.dirty == false || this.initialized == false) {
    return false;
  }
  this.dirty = false;
  this.renderGL();
  if (this.animated == true) {
    this.dirty = true;
  }
  this.frame++;
  return true;
};
Scene.prototype.resetFrame = function() {
  if (!this.initialized) {
    return;
  }
  var gl = this.gl;
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LESS);
  gl.enable(gl.CULL_FACE);
  gl.cullFace(gl.BACK);
};
Scene.prototype.renderGL = function() {
  var gl = this.gl;
  this.input();
  this.resetFrame();
  var center = Geo.latLngToMeters(Point(this.center.lng, this.center.lat));
  var meters_per_pixel = Geo.min_zoom_meters_per_pixel / Math.pow(2, this.zoom);
  var meter_zoom = Point(this.css_size.width / 2 * meters_per_pixel, this.css_size.height / 2 * meters_per_pixel);
  var tile_view_mat = mat4.create();
  var tile_world_mat = mat4.create();
  var meter_view_mat = mat4.create();
  mat4.scale(meter_view_mat, meter_view_mat, vec3.fromValues(1 / meter_zoom.x, 1 / meter_zoom.y, 1 / meter_zoom.y));
  var renderable_tiles = [];
  for (var t in this.tiles) {
    var tile = this.tiles[t];
    if (tile.loaded == true && tile.visible == true) {
      renderable_tiles.push(tile);
    }
  }
  this.renderable_tiles_count = renderable_tiles.length;
  var render_count = 0;
  for (var mode in this.modes) {
    this.modes[mode].update();
    var gl_program = this.modes[mode].gl_program;
    if (gl_program == null || gl_program.compiled == false) {
      continue;
    }
    var first_for_mode = true;
    for (var t in renderable_tiles) {
      var tile = renderable_tiles[t];
      if (tile.gl_geometry[mode] != null) {
        if (first_for_mode == true) {
          first_for_mode = false;
          gl_program.use();
          this.modes[mode].setUniforms();
          gl_program.uniform('2f', 'u_resolution', this.device_size.width, this.device_size.height);
          gl_program.uniform('2f', 'u_aspect', this.device_size.width / this.device_size.height, 1.0);
          gl_program.uniform('1f', 'u_time', ((+new Date()) - this.start_time) / 1000);
          gl_program.uniform('1f', 'u_map_zoom', this.zoom);
          gl_program.uniform('2f', 'u_map_center', center.x, center.y);
          gl_program.uniform('1f', 'u_num_layers', this.layers.length);
          gl_program.uniform('1f', 'u_meters_per_pixel', meters_per_pixel);
          gl_program.uniform('Matrix4fv', 'u_meter_view', false, meter_view_mat);
        }
        gl_program.uniform('2f', 'u_tile_origin', tile.min.x, tile.min.y);
        mat4.identity(tile_view_mat);
        mat4.translate(tile_view_mat, tile_view_mat, vec3.fromValues(tile.min.x - center.x, tile.min.y - center.y, 0));
        mat4.scale(tile_view_mat, tile_view_mat, vec3.fromValues(tile.span.x / Scene.tile_scale, -1 * tile.span.y / Scene.tile_scale, 1));
        gl_program.uniform('Matrix4fv', 'u_tile_view', false, tile_view_mat);
        mat4.identity(tile_world_mat);
        mat4.translate(tile_world_mat, tile_world_mat, vec3.fromValues(tile.min.x, tile.min.y, 0));
        mat4.scale(tile_world_mat, tile_world_mat, vec3.fromValues(tile.span.x / Scene.tile_scale, -1 * tile.span.y / Scene.tile_scale, 1));
        gl_program.uniform('Matrix4fv', 'u_tile_world', false, tile_world_mat);
        tile.gl_geometry[mode].render();
        render_count += tile.gl_geometry[mode].geometry_count;
      }
    }
  }
  if (this.update_selection) {
    this.update_selection = false;
    if (this.panning) {
      return;
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
    gl.viewport(0, 0, this.fbo_size.width, this.fbo_size.height);
    this.resetFrame();
    for (mode in this.modes) {
      gl_program = this.modes[mode].selection_gl_program;
      if (gl_program == null || gl_program.compiled == false) {
        continue;
      }
      first_for_mode = true;
      for (t in renderable_tiles) {
        tile = renderable_tiles[t];
        if (tile.gl_geometry[mode] != null) {
          if (first_for_mode == true) {
            first_for_mode = false;
            gl_program.use();
            this.modes[mode].setUniforms();
            gl_program.uniform('2f', 'u_resolution', this.fbo_size.width, this.fbo_size.height);
            gl_program.uniform('2f', 'u_aspect', this.fbo_size.width / this.fbo_size.height, 1.0);
            gl_program.uniform('1f', 'u_time', ((+new Date()) - this.start_time) / 1000);
            gl_program.uniform('1f', 'u_map_zoom', this.zoom);
            gl_program.uniform('2f', 'u_map_center', center.x, center.y);
            gl_program.uniform('1f', 'u_num_layers', this.layers.length);
            gl_program.uniform('1f', 'u_meters_per_pixel', meters_per_pixel);
            gl_program.uniform('Matrix4fv', 'u_meter_view', false, meter_view_mat);
          }
          gl_program.uniform('2f', 'u_tile_origin', tile.min.x, tile.min.y);
          mat4.identity(tile_view_mat);
          mat4.translate(tile_view_mat, tile_view_mat, vec3.fromValues(tile.min.x - center.x, tile.min.y - center.y, 0));
          mat4.scale(tile_view_mat, tile_view_mat, vec3.fromValues(tile.span.x / Scene.tile_scale, -1 * tile.span.y / Scene.tile_scale, 1));
          gl_program.uniform('Matrix4fv', 'u_tile_view', false, tile_view_mat);
          mat4.identity(tile_world_mat);
          mat4.translate(tile_world_mat, tile_world_mat, vec3.fromValues(tile.min.x, tile.min.y, 0));
          mat4.scale(tile_world_mat, tile_world_mat, vec3.fromValues(tile.span.x / Scene.tile_scale, -1 * tile.span.y / Scene.tile_scale, 1));
          gl_program.uniform('Matrix4fv', 'u_tile_world', false, tile_world_mat);
          tile.gl_geometry[mode].render();
        }
      }
    }
    if (this.selection_callback_timer != null) {
      clearTimeout(this.selection_callback_timer);
    }
    this.selection_callback_timer = setTimeout(this.readSelectionBuffer.bind(this), this.selection_frame_delay);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }
  if (render_count != this.last_render_count) {
    console.log("rendered " + render_count + " primitives");
  }
  this.last_render_count = render_count;
  return true;
};
Scene.prototype.getFeatureAt = function(pixel, callback) {
  if (!this.initialized) {
    return;
  }
  if (this.update_selection == true) {
    return;
  }
  this.selection_point = Point(pixel.x * this.device_pixel_ratio, this.device_size.height - (pixel.y * this.device_pixel_ratio));
  this.selection_callback = callback;
  this.update_selection = true;
  this.dirty = true;
};
Scene.prototype.readSelectionBuffer = function() {
  var gl = this.gl;
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
  gl.readPixels(Math.floor(this.selection_point.x * this.fbo_size.width / this.device_size.width), Math.floor(this.selection_point.y * this.fbo_size.height / this.device_size.height), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, this.pixel);
  var feature_key = (this.pixel[0] + (this.pixel[1] << 8) + (this.pixel[2] << 16) + (this.pixel[3] << 24)) >>> 0;
  var worker_id = this.pixel[3];
  if (worker_id != 255) {
    if (this.workers[worker_id] != null) {
      this.workers[worker_id].postMessage({
        type: 'getFeatureSelection',
        key: feature_key
      });
    }
  }
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
};
Scene.prototype.workerGetFeatureSelection = function(event) {
  if (event.data.type != 'getFeatureSelection') {
    return;
  }
  var feature = event.data.feature;
  var changed = false;
  if ((feature != null && this.selected_feature == null) || (feature == null && this.selected_feature != null) || (feature != null && this.selected_feature != null && feature.id != this.selected_feature.id)) {
    changed = true;
  }
  this.selected_feature = feature;
  if (typeof this.selection_callback == 'function') {
    this.selection_callback({
      feature: this.selected_feature,
      changed: changed
    });
  }
};
Scene.prototype.loadTile = function(coords, div, callback) {
  this.queued_tiles[this.queued_tiles.length] = arguments;
};
Scene.prototype.loadQueuedTiles = function() {
  if (!this.initialized) {
    return;
  }
  if (this.queued_tiles.length == 0) {
    return;
  }
  for (var t = 0; t < this.queued_tiles.length; t++) {
    this._loadTile.apply(this, this.queued_tiles[t]);
  }
  this.queued_tiles = [];
};
Scene.prototype._loadTile = function(coords, div, callback) {
  if (coords.z > this.tile_source.max_zoom) {
    var zgap = coords.z - this.tile_source.max_zoom;
    coords.x = ~~(coords.x / Math.pow(2, zgap));
    coords.y = ~~(coords.y / Math.pow(2, zgap));
    coords.display_z = coords.z;
    coords.z -= zgap;
  }
  this.trackTileSetLoadStart();
  var key = [coords.x, coords.y, coords.z].join('/');
  if (this.tiles[key]) {
    if (callback) {
      callback(null, div);
    }
    return;
  }
  var tile = this.tiles[key] = {};
  tile.key = key;
  tile.coords = coords;
  tile.min = Geo.metersForTile(tile.coords);
  tile.max = Geo.metersForTile({
    x: tile.coords.x + 1,
    y: tile.coords.y + 1,
    z: tile.coords.z
  });
  tile.span = {
    x: (tile.max.x - tile.min.x),
    y: (tile.max.y - tile.min.y)
  };
  tile.bounds = {
    sw: {
      x: tile.min.x,
      y: tile.max.y
    },
    ne: {
      x: tile.max.x,
      y: tile.min.y
    }
  };
  tile.debug = {};
  tile.loading = true;
  tile.loaded = false;
  this.buildTile(tile.key);
  this.updateTileElement(tile, div);
  this.updateVisibilityForTile(tile);
  if (callback) {
    callback(null, div);
  }
};
Scene.prototype.rebuildTiles = function() {
  var $__0 = this;
  if (!this.initialized) {
    return;
  }
  this.layers_serialized = Utils.serializeWithFunctions(this.layers);
  this.styles_serialized = Utils.serializeWithFunctions(this.styles);
  this.selection_map = {};
  this.workers.forEach((function(worker) {
    worker.postMessage({
      type: 'prepareForRebuild',
      layers: $__0.layers_serialized,
      styles: $__0.styles_serialized
    });
  }));
  var visible = [],
      invisible = [];
  for (var t in this.tiles) {
    if (this.tiles[t].visible == true) {
      visible.push(t);
    } else {
      invisible.push(t);
    }
  }
  visible.sort((function(a, b) {
    var ad = $__0.tiles[a].center_dist;
    var bd = $__0.tiles[b].center_dist;
    return (bd > ad ? -1 : (bd == ad ? 0 : 1));
  }));
  for (var t in visible) {
    this.buildTile(visible[t]);
  }
  for (var t in invisible) {
    if (this.isTileInZoom(this.tiles[invisible[t]]) == true) {
      this.buildTile(invisible[t]);
    } else {
      this.removeTile(invisible[t]);
    }
  }
  this.updateActiveModes();
  this.resetTime();
};
Scene.prototype.buildTile = function(key) {
  var tile = this.tiles[key];
  this.workerPostMessageForTile(tile, {
    type: 'buildTile',
    tile: {
      key: tile.key,
      coords: tile.coords,
      min: tile.min,
      max: tile.max,
      debug: tile.debug
    },
    tile_source: this.tile_source,
    layers: this.layers_serialized,
    styles: this.styles_serialized
  });
};
Scene.addTile = function(tile, layers, styles, modes) {
  var layer,
      style,
      feature,
      z,
      mode;
  var vertex_data = {};
  tile.debug.features = 0;
  for (var layer_num = 0; layer_num < layers.length; layer_num++) {
    layer = layers[layer_num];
    if (styles.layers[layer.name] == null || styles.layers[layer.name].visible == false) {
      continue;
    }
    if (tile.layers[layer.name] != null) {
      var num_features = tile.layers[layer.name].features.length;
      for (var f = num_features - 1; f >= 0; f--) {
        feature = tile.layers[layer.name].features[f];
        style = Style.parseStyleForFeature(feature, layer.name, styles.layers[layer.name], tile);
        if (style == null) {
          continue;
        }
        style.layer_num = layer_num;
        style.z = Scene.calculateZ(layer, tile) + style.z;
        var points = null,
            lines = null,
            polygons = null;
        if (feature.geometry.type == 'Polygon') {
          polygons = [feature.geometry.coordinates];
        } else if (feature.geometry.type == 'MultiPolygon') {
          polygons = feature.geometry.coordinates;
        } else if (feature.geometry.type == 'LineString') {
          lines = [feature.geometry.coordinates];
        } else if (feature.geometry.type == 'MultiLineString') {
          lines = feature.geometry.coordinates;
        } else if (feature.geometry.type == 'Point') {
          points = [feature.geometry.coordinates];
        } else if (feature.geometry.type == 'MultiPoint') {
          points = feature.geometry.coordinates;
        }
        mode = style.mode.name;
        if (vertex_data[mode] == null) {
          vertex_data[mode] = [];
        }
        if (polygons != null) {
          modes[mode].buildPolygons(polygons, style, vertex_data[mode]);
        }
        if (lines != null) {
          modes[mode].buildLines(lines, style, vertex_data[mode]);
        }
        if (points != null) {
          modes[mode].buildPoints(points, style, vertex_data[mode]);
        }
        tile.debug.features++;
      }
    }
  }
  tile.vertex_data = {};
  for (var s in vertex_data) {
    tile.vertex_data[s] = new Float32Array(vertex_data[s]);
  }
  return {vertex_data: true};
};
Scene.prototype.workerBuildTileCompleted = function(event) {
  var $__0 = this;
  if (event.data.type != 'buildTileCompleted') {
    return;
  }
  this.selection_map_worker_size[event.data.worker_id] = event.data.selection_map_size;
  this.selection_map_size = 0;
  Object.keys(this.selection_map_worker_size).forEach((function(worker) {
    $__0.selection_map_size += $__0.selection_map_worker_size[worker];
  }));
  console.log("selection map: " + this.selection_map_size + " features");
  var tile = event.data.tile;
  if (this.tiles[tile.key] == null) {
    console.log("discarded tile " + tile.key + " in Scene.tileWorkerCompleted because previously removed");
    return;
  }
  tile = this.mergeTile(tile.key, tile);
  this.buildGLGeometry(tile);
  this.dirty = true;
  this.trackTileSetLoadEnd();
  this.printDebugForTile(tile);
};
Scene.prototype.buildGLGeometry = function(tile) {
  var vertex_data = tile.vertex_data;
  this.freeTileResources(tile);
  tile.gl_geometry = {};
  for (var s in vertex_data) {
    tile.gl_geometry[s] = this.modes[s].makeGLGeometry(vertex_data[s]);
  }
  tile.debug.geometries = 0;
  tile.debug.buffer_size = 0;
  for (var p in tile.gl_geometry) {
    tile.debug.geometries += tile.gl_geometry[p].geometry_count;
    tile.debug.buffer_size += tile.gl_geometry[p].vertex_data.byteLength;
  }
  tile.debug.geom_ratio = (tile.debug.geometries / tile.debug.features).toFixed(1);
  delete tile.vertex_data;
};
Scene.prototype.removeTile = function(key) {
  if (!this.initialized) {
    return;
  }
  console.log("tile unload for " + key);
  if (this.zooming == true) {
    return;
  }
  var tile = this.tiles[key];
  if (tile != null) {
    this.freeTileResources(tile);
    this.workerPostMessageForTile(tile, {
      type: 'removeTile',
      key: tile.key
    });
  }
  delete this.tiles[key];
  this.dirty = true;
};
Scene.prototype.freeTileResources = function(tile) {
  if (tile != null && tile.gl_geometry != null) {
    for (var p in tile.gl_geometry) {
      tile.gl_geometry[p].destroy();
    }
    tile.gl_geometry = null;
  }
};
Scene.prototype.updateTileElement = function(tile, div) {
  div.setAttribute('data-tile-key', tile.key);
  div.style.width = '256px';
  div.style.height = '256px';
  if (this.debug) {
    var debug_overlay = document.createElement('div');
    debug_overlay.textContent = tile.key;
    debug_overlay.style.position = 'absolute';
    debug_overlay.style.left = 0;
    debug_overlay.style.top = 0;
    debug_overlay.style.color = 'white';
    debug_overlay.style.fontSize = '16px';
    div.appendChild(debug_overlay);
    div.style.borderStyle = 'solid';
    div.style.borderColor = 'white';
    div.style.borderWidth = '1px';
  }
};
Scene.prototype.mergeTile = function(key, source_tile) {
  var tile = this.tiles[key];
  if (tile == null) {
    this.tiles[key] = source_tile;
    return this.tiles[key];
  }
  for (var p in source_tile) {
    tile[p] = source_tile[p];
  }
  return tile;
};
Scene.prototype.loadScene = function(callback) {
  var $__0 = this;
  var queue = Queue();
  if (!this.layer_source && typeof(this.layers) == 'string') {
    this.layer_source = Utils.urlForPath(this.layers);
  }
  if (!this.style_source && typeof(this.styles) == 'string') {
    this.style_source = Utils.urlForPath(this.styles);
  }
  if (this.layer_source) {
    queue.defer((function(complete) {
      Scene.loadLayers($__0.layer_source, (function(layers) {
        $__0.layers = layers;
        $__0.layers_serialized = Utils.serializeWithFunctions($__0.layers);
        complete();
      }));
    }));
  }
  if (this.style_source) {
    queue.defer((function(complete) {
      Scene.loadStyles($__0.style_source, (function(styles) {
        $__0.styles = styles;
        $__0.styles_serialized = Utils.serializeWithFunctions($__0.styles);
        complete();
      }));
    }));
  } else {
    this.styles = Scene.postProcessStyles(this.styles);
  }
  queue.await(function() {
    if (typeof callback == 'function') {
      callback();
    }
  });
};
Scene.prototype.reloadScene = function() {
  var $__0 = this;
  if (!this.initialized) {
    return;
  }
  this.loadScene((function() {
    $__0.rebuildTiles();
  }));
};
Scene.prototype.refreshModes = function() {
  if (!this.initialized) {
    return;
  }
  this.modes = Scene.refreshModes(this.modes, this.styles);
};
Scene.prototype.updateActiveModes = function() {
  this.active_modes = {};
  var animated = false;
  for (var l in this.styles.layers) {
    var mode = this.styles.layers[l].mode.name;
    if (this.styles.layers[l].visible !== false) {
      this.active_modes[mode] = true;
      if (animated == false && this.modes[mode].animated == true) {
        animated = true;
      }
    }
  }
  this.animated = animated;
};
Scene.prototype.resetTime = function() {
  this.start_time = +new Date();
};
Scene.prototype.initInputHandlers = function() {};
Scene.prototype.input = function() {};
Scene.prototype.trackTileSetLoadStart = function() {
  if (this.tile_set_loading == null) {
    this.tile_set_loading = +new Date();
    console.log("tile set load START");
  }
};
Scene.prototype.trackTileSetLoadEnd = function() {
  if (this.tile_set_loading != null) {
    var end_tile_set = true;
    for (var t in this.tiles) {
      if (this.tiles[t].loading == true) {
        end_tile_set = false;
        break;
      }
    }
    if (end_tile_set == true) {
      this.last_tile_set_load = (+new Date()) - this.tile_set_loading;
      this.tile_set_loading = null;
      console.log("tile set load FINISHED in: " + this.last_tile_set_load);
    }
  }
};
Scene.prototype.printDebugForTile = function(tile) {
  console.log("debug for " + tile.key + ': [ ' + Object.keys(tile.debug).map(function(t) {
    return t + ': ' + tile.debug[t];
  }).join(', ') + ' ]');
};
Scene.prototype.compileShaders = function() {
  for (var m in this.modes) {
    this.modes[m].gl_program.compile();
  }
};
Scene.prototype.getDebugSum = function(prop, filter) {
  var sum = 0;
  for (var t in this.tiles) {
    if (this.tiles[t].debug[prop] != null && (typeof filter != 'function' || filter(this.tiles[t]) == true)) {
      sum += this.tiles[t].debug[prop];
    }
  }
  return sum;
};
Scene.prototype.getDebugAverage = function(prop, filter) {
  return this.getDebugSum(prop, filter) / Object.keys(this.tiles).length;
};
Scene.prototype.workerLogMessage = function(event) {
  if (event.data.type != 'log') {
    return;
  }
  console.log("worker " + event.data.worker_id + ": " + event.data.msg);
};
Scene.loadLayers = function(url, callback) {
  var layers;
  var req = new XMLHttpRequest();
  req.onload = function() {
    eval('layers = ' + req.response);
    if (typeof callback == 'function') {
      callback(layers);
    }
  };
  req.open('GET', url + '?' + (+new Date()), true);
  req.responseType = 'text';
  req.send();
};
Scene.loadStyles = function(url, callback) {
  var styles;
  var req = new XMLHttpRequest();
  req.onload = function() {
    styles = req.response;
    try {
      eval('styles = ' + req.response);
    } catch (e) {
      try {
        styles = yaml.safeLoad(req.response);
      } catch (e) {
        console.log("failed to parse styles!");
        console.log(styles);
        styles = null;
      }
    }
    Utils.stringsToFunctions(styles);
    Style.expandMacros(styles);
    Scene.postProcessStyles(styles);
    if (typeof callback == 'function') {
      callback(styles);
    }
  };
  req.open('GET', url + '?' + (+new Date()), true);
  req.responseType = 'text';
  req.send();
};
Scene.postProcessStyles = function(styles) {
  for (var m in styles.layers) {
    if (styles.layers[m].visible !== false) {
      styles.layers[m].visible = true;
    }
    if ((styles.layers[m].mode && styles.layers[m].mode.name) == null) {
      styles.layers[m].mode = {};
      for (var p in Style.defaults.mode) {
        styles.layers[m].mode[p] = Style.defaults.mode[p];
      }
    }
  }
  return styles;
};
Scene.processLayersForTile = function(layers, tile) {
  var tile_layers = {};
  for (var t = 0; t < layers.length; t++) {
    layers[t].number = t;
    if (layers[t] != null) {
      if (layers[t].data == null) {
        tile_layers[layers[t].name] = tile.layers[layers[t].name];
      } else if (typeof layers[t].data == 'string') {
        tile_layers[layers[t].name] = tile.layers[layers[t].data];
      } else if (typeof layers[t].data == 'function') {
        tile_layers[layers[t].name] = layers[t].data(tile.layers);
      }
    }
    tile_layers[layers[t].name] = tile_layers[layers[t].name] || {
      type: 'FeatureCollection',
      features: []
    };
  }
  tile.layers = tile_layers;
  return tile_layers;
};
Scene.createModes = function(styles) {
  var modes = {};
  var built_ins = _dereq_('./gl/gl_modes').Modes;
  for (var m in built_ins) {
    modes[m] = built_ins[m];
  }
  for (var m in styles.modes) {
    modes[m] = ModeManager.configureMode(m, styles.modes[m]);
  }
  return modes;
};
Scene.refreshModes = function(modes, styles) {
  for (var m in styles.modes) {
    modes[m] = ModeManager.configureMode(m, styles.modes[m]);
  }
  for (m in modes) {
    modes[m].refresh();
  }
  return modes;
};
function findBaseLibraryURL() {
  Scene.library_base_url = '';
  var scripts = document.getElementsByTagName('script');
  for (var s = 0; s < scripts.length; s++) {
    var match = scripts[s].src.indexOf('tangram.debug.js');
    if (match == -1) {
      match = scripts[s].src.indexOf('tangram.min.js');
    }
    if (match >= 0) {
      Scene.library_base_url = scripts[s].src.substr(0, match);
      break;
    }
  }
}
;
if (module !== undefined) {
  module.exports = Scene;
}


},{"./geo.js":3,"./gl/gl.js":4,"./gl/gl_builders.js":5,"./gl/gl_modes":7,"./gl/gl_program.js":8,"./gl/gl_texture.js":10,"./point.js":14,"./style.js":16,"./utils.js":17,"gl-matrix":1,"js-yaml":"jkXaKS","queue-async":2}],16:[function(_dereq_,module,exports){
"use strict";
var Geo = _dereq_('./geo.js');
var Style = {};
Style.color = {
  pseudoRandomGrayscale: function(f) {
    var c = Math.max((parseInt(f.id, 16) % 100) / 100, 0.4);
    return [0.7 * c, 0.7 * c, 0.7 * c];
  },
  pseudoRandomColor: function(f) {
    return [0.7 * (parseInt(f.id, 16) / 100 % 1), 0.7 * (parseInt(f.id, 16) / 10000 % 1), 0.7 * (parseInt(f.id, 16) / 1000000 % 1)];
  },
  randomColor: function(f) {
    return [0.7 * Math.random(), 0.7 * Math.random(), 0.7 * Math.random()];
  }
};
Style.pixels = function(p, z) {
  var f;
  eval('f = function(f, t, h) { return ' + (typeof p == 'function' ? '(' + (p.toString() + '(f, t, h))') : p) + ' * h.Geo.meters_per_pixel[h.zoom]; }');
  return f;
};
Style.selection_map = {};
Style.selection_map_current = 1;
Style.selection_map_prefix = 0;
Style.generateSelection = function(color_map) {
  Style.selection_map_current++;
  var ir = Style.selection_map_current & 255;
  var ig = (Style.selection_map_current >> 8) & 255;
  var ib = (Style.selection_map_current >> 16) & 255;
  var ia = Style.selection_map_prefix;
  var r = ir / 255;
  var g = ig / 255;
  var b = ib / 255;
  var a = ia / 255;
  var key = (ir + (ig << 8) + (ib << 16) + (ia << 24)) >>> 0;
  color_map[key] = {color: [r, g, b, a]};
  return color_map[key];
};
Style.resetSelectionMap = function() {
  Style.selection_map = {};
  Style.selection_map_current = 1;
};
Style.macros = ['Style.color.pseudoRandomColor', 'Style.pixels'];
Style.expandMacros = function expandMacros(obj) {
  for (var p in obj) {
    var val = obj[p];
    if (typeof val == 'object') {
      obj[p] = expandMacros(val);
    } else if (typeof val == 'string') {
      for (var m in Style.macros) {
        if (val.match(Style.macros[m])) {
          var f;
          try {
            eval('f = ' + val);
            obj[p] = f;
            break;
          } catch (e) {
            obj[p] = val;
          }
        }
      }
    }
  }
  return obj;
};
Style.defaults = {
  color: [1.0, 0, 0],
  width: 1,
  size: 1,
  extrude: false,
  height: 20,
  min_height: 0,
  outline: {},
  selection: {
    active: false,
    color: [0, 0, 0, 1]
  },
  mode: {name: 'polygons'}
};
Style.helpers = {
  Style: Style,
  Geo: Geo
};
Style.parseStyleForFeature = function(feature, layer_name, layer_style, tile) {
  var layer_style = layer_style || {};
  var style = {};
  Style.helpers.zoom = tile.coords.z;
  if (typeof layer_style.filter == 'function') {
    if (layer_style.filter(feature, tile, Style.helpers) == false) {
      return null;
    }
  }
  style.color = (layer_style.color && (layer_style.color[feature.properties.kind] || layer_style.color.default)) || Style.defaults.color;
  if (typeof style.color == 'function') {
    style.color = style.color(feature, tile, Style.helpers);
  }
  style.width = (layer_style.width && (layer_style.width[feature.properties.kind] || layer_style.width.default)) || Style.defaults.width;
  if (typeof style.width == 'function') {
    style.width = style.width(feature, tile, Style.helpers);
  }
  style.width *= Geo.units_per_meter[tile.coords.z];
  style.size = (layer_style.size && (layer_style.size[feature.properties.kind] || layer_style.size.default)) || Style.defaults.size;
  if (typeof style.size == 'function') {
    style.size = style.size(feature, tile, Style.helpers);
  }
  style.size *= Geo.units_per_meter[tile.coords.z];
  style.extrude = (layer_style.extrude && (layer_style.extrude[feature.properties.kind] || layer_style.extrude.default)) || Style.defaults.extrude;
  if (typeof style.extrude == 'function') {
    style.extrude = style.extrude(feature, tile, Style.helpers);
  }
  style.height = (feature.properties && feature.properties.height) || Style.defaults.height;
  style.min_height = (feature.properties && feature.properties.min_height) || Style.defaults.min_height;
  if (style.extrude) {
    if (typeof style.extrude == 'number') {
      style.height = style.extrude;
    } else if (typeof style.extrude == 'object' && style.extrude.length >= 2) {
      style.min_height = style.extrude[0];
      style.height = style.extrude[1];
    }
  }
  style.z = (layer_style.z && (layer_style.z[feature.properties.kind] || layer_style.z.default)) || Style.defaults.z || 0;
  if (typeof style.z == 'function') {
    style.z = style.z(feature, tile, Style.helpers);
  }
  style.outline = {};
  layer_style.outline = layer_style.outline || {};
  style.outline.color = (layer_style.outline.color && (layer_style.outline.color[feature.properties.kind] || layer_style.outline.color.default)) || Style.defaults.outline.color;
  if (typeof style.outline.color == 'function') {
    style.outline.color = style.outline.color(feature, tile, Style.helpers);
  }
  style.outline.width = (layer_style.outline.width && (layer_style.outline.width[feature.properties.kind] || layer_style.outline.width.default)) || Style.defaults.outline.width;
  if (typeof style.outline.width == 'function') {
    style.outline.width = style.outline.width(feature, tile, Style.helpers);
  }
  style.outline.width *= Geo.units_per_meter[tile.coords.z];
  style.outline.dash = (layer_style.outline.dash && (layer_style.outline.dash[feature.properties.kind] || layer_style.outline.dash.default)) || Style.defaults.outline.dash;
  if (typeof style.outline.dash == 'function') {
    style.outline.dash = style.outline.dash(feature, tile, Style.helpers);
  }
  var interactive = false;
  if (typeof layer_style.interactive == 'function') {
    interactive = layer_style.interactive(feature, tile, Style.helpers);
  } else {
    interactive = layer_style.interactive;
  }
  if (interactive == true) {
    var selector = Style.generateSelection(Style.selection_map);
    selector.feature = {
      id: feature.id,
      properties: feature.properties
    };
    selector.feature.properties.layer = layer_name;
    style.selection = {
      active: true,
      color: selector.color
    };
  } else {
    style.selection = Style.defaults.selection;
  }
  if (layer_style.mode != null && layer_style.mode.name != null) {
    style.mode = {};
    for (var m in layer_style.mode) {
      style.mode[m] = layer_style.mode[m];
    }
  } else {
    style.mode = Style.defaults.mode;
  }
  return style;
};
if (module !== undefined) {
  module.exports = Style;
}


},{"./geo.js":3}],17:[function(_dereq_,module,exports){
"use strict";
function urlForPath(path) {
  if (path == null || path == '') {
    return null;
  }
  if (typeof path == 'object' && path.length > 0) {
    for (var p in path) {
      var protocol = path[p].toLowerCase().substr(0, 4);
      if (!(protocol == 'http' || protocol == 'file')) {
        path[p] = window.location.origin + window.location.pathname + path[p];
      }
    }
  } else {
    var protocol = path.toLowerCase().substr(0, 4);
    if (!(protocol == 'http' || protocol == 'file')) {
      path = window.location.origin + window.location.pathname + path;
    }
  }
  return path;
}
;
function serializeWithFunctions(obj) {
  var serialized = JSON.stringify(obj, function(k, v) {
    if (typeof v == 'function') {
      return v.toString();
    }
    return v;
  });
  return serialized;
}
;
function deserializeWithFunctions(serialized) {
  var obj = JSON.parse(serialized);
  obj = stringsToFunctions(obj);
  return obj;
}
;
function stringsToFunctions(obj) {
  for (var p in obj) {
    var val = obj[p];
    if (typeof val == 'object') {
      obj[p] = stringsToFunctions(val);
    } else if (typeof val == 'string' && val.match(/^function.*\(.*\)/) != null) {
      var f;
      try {
        eval('f = ' + val);
        obj[p] = f;
      } catch (e) {
        obj[p] = val;
      }
    }
  }
  return obj;
}
;
function runIfInMainThread(block, err) {
  try {
    if (window.document !== undefined) {
      block();
    }
  } catch (e) {
    if (typeof err == 'function') {
      err();
    }
  }
}
function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}
;
if (module !== undefined) {
  module.exports = {
    urlForPath: urlForPath,
    serializeWithFunctions: serializeWithFunctions,
    deserializeWithFunctions: deserializeWithFunctions,
    stringsToFunctions: stringsToFunctions,
    runIfInMainThread: runIfInMainThread,
    isPowerOf2: isPowerOf2
  };
}


},{}],18:[function(_dereq_,module,exports){
"use strict";
var Vector = {};
Vector.lengthSq = function(v) {
  if (v.length == 2) {
    return (v[0] * v[0] + v[1] * v[1]);
  } else {
    return (v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  }
};
Vector.length = function(v) {
  return Math.sqrt(Vector.lengthSq(v));
};
Vector.normalize = function(v) {
  var d;
  if (v.length == 2) {
    d = v[0] * v[0] + v[1] * v[1];
    d = Math.sqrt(d);
    if (d != 0) {
      return [v[0] / d, v[1] / d];
    }
    return [0, 0];
  } else {
    var d = v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
    d = Math.sqrt(d);
    if (d != 0) {
      return [v[0] / d, v[1] / d, v[2] / d];
    }
    return [0, 0, 0];
  }
};
Vector.cross = function(v1, v2) {
  return [(v1[1] * v2[2]) - (v1[2] * v2[1]), (v1[2] * v2[0]) - (v1[0] * v2[2]), (v1[0] * v2[1]) - (v1[1] * v2[0])];
};
Vector.lineIntersection = function(p1, p2, p3, p4, parallel_tolerance) {
  var parallel_tolerance = parallel_tolerance || 0.01;
  var a1 = p1[1] - p2[1];
  var b1 = p1[0] - p2[0];
  var a2 = p3[1] - p4[1];
  var b2 = p3[0] - p4[0];
  var c1 = (p1[0] * p2[1]) - (p1[1] * p2[0]);
  var c2 = (p3[0] * p4[1]) - (p3[1] * p4[0]);
  var denom = (b1 * a2) - (a1 * b2);
  if (Math.abs(denom) > parallel_tolerance) {
    return [((c1 * b2) - (b1 * c2)) / denom, ((c1 * a2) - (a1 * c2)) / denom];
  }
  return null;
};
if (module !== undefined) {
  module.exports = Vector;
}


},{}]},{},[13])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9iY2FtcGVyL0RvY3VtZW50cy9kZXYvdmVjdG9yLW1hcC9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2JjYW1wZXIvRG9jdW1lbnRzL2Rldi92ZWN0b3ItbWFwL25vZGVfbW9kdWxlcy9nbC1tYXRyaXgvZGlzdC9nbC1tYXRyaXguanMiLCIvVXNlcnMvYmNhbXBlci9Eb2N1bWVudHMvZGV2L3ZlY3Rvci1tYXAvbm9kZV9tb2R1bGVzL3F1ZXVlLWFzeW5jL3F1ZXVlLmpzIiwiL1VzZXJzL2JjYW1wZXIvRG9jdW1lbnRzL2Rldi92ZWN0b3ItbWFwL3NyYy9nZW8uanMiLCIvVXNlcnMvYmNhbXBlci9Eb2N1bWVudHMvZGV2L3ZlY3Rvci1tYXAvc3JjL2dsL2dsLmpzIiwiL1VzZXJzL2JjYW1wZXIvRG9jdW1lbnRzL2Rldi92ZWN0b3ItbWFwL3NyYy9nbC9nbF9idWlsZGVycy5qcyIsIi9Vc2Vycy9iY2FtcGVyL0RvY3VtZW50cy9kZXYvdmVjdG9yLW1hcC9zcmMvZ2wvZ2xfZ2VvbS5qcyIsIi9Vc2Vycy9iY2FtcGVyL0RvY3VtZW50cy9kZXYvdmVjdG9yLW1hcC9zcmMvZ2wvZ2xfbW9kZXMuanMiLCIvVXNlcnMvYmNhbXBlci9Eb2N1bWVudHMvZGV2L3ZlY3Rvci1tYXAvc3JjL2dsL2dsX3Byb2dyYW0uanMiLCIvVXNlcnMvYmNhbXBlci9Eb2N1bWVudHMvZGV2L3ZlY3Rvci1tYXAvc3JjL2dsL2dsX3NoYWRlcnMuanMiLCIvVXNlcnMvYmNhbXBlci9Eb2N1bWVudHMvZGV2L3ZlY3Rvci1tYXAvc3JjL2dsL2dsX3RleHR1cmUuanMiLCIvVXNlcnMvYmNhbXBlci9Eb2N1bWVudHMvZGV2L3ZlY3Rvci1tYXAvc3JjL2dsL2dsX3ZlcnRleF9sYXlvdXQuanMiLCIvVXNlcnMvYmNhbXBlci9Eb2N1bWVudHMvZGV2L3ZlY3Rvci1tYXAvc3JjL2xlYWZsZXRfbGF5ZXIuanMiLCIvVXNlcnMvYmNhbXBlci9Eb2N1bWVudHMvZGV2L3ZlY3Rvci1tYXAvc3JjL21vZHVsZS5qcyIsIi9Vc2Vycy9iY2FtcGVyL0RvY3VtZW50cy9kZXYvdmVjdG9yLW1hcC9zcmMvcG9pbnQuanMiLCIvVXNlcnMvYmNhbXBlci9Eb2N1bWVudHMvZGV2L3ZlY3Rvci1tYXAvc3JjL3NjZW5lLmpzIiwiL1VzZXJzL2JjYW1wZXIvRG9jdW1lbnRzL2Rldi92ZWN0b3ItbWFwL3NyYy9zdHlsZS5qcyIsIi9Vc2Vycy9iY2FtcGVyL0RvY3VtZW50cy9kZXYvdmVjdG9yLW1hcC9zcmMvdXRpbHMuanMiLCIvVXNlcnMvYmNhbXBlci9Eb2N1bWVudHMvZGV2L3ZlY3Rvci1tYXAvc3JjL3ZlY3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFBLENBQUEsQ0FBQSxFQUFFLEVBQUEsQ0FBRyxDQUFBLENBQUEsRUFBSSxDQUFBLE9BQU0sT0FBTyxFQUFJLEVBQUEsQ0FBRyxDQUFBLENBQUEsRUFBRSxDQUFHO0FBQ3ZDLEFBQUksVUFBQSxDQUFBLGFBQVksRUFBSSxHQUFDLENBQUM7QUFHdEIsb0JBQVksS0FBSyxBQUFDLENBRWQsQ0FBQyxPQUFNLENBQUUsQ0FBQSxFQUFFLEVBQUEsQ0FBQyxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsT0FBTSxDQUFFLENBQUEsRUFBRSxFQUFBLENBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBRyxNQUFJLENBQUMsQ0FDeEMsRUFBQyxPQUFNLENBQUUsQ0FBQSxFQUFFLEVBQUEsQ0FBQyxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsT0FBTSxDQUFFLENBQUEsRUFBRSxFQUFBLENBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBRyxNQUFJLENBQUMsQ0FDeEMsRUFBQyxPQUFNLENBQUUsQ0FBQSxDQUFDLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxPQUFNLENBQUUsQ0FBQSxDQUFDLENBQUUsQ0FBQSxDQUFDLENBQUcsTUFBSSxDQUFDLENBRXBDLEVBQUMsT0FBTSxDQUFFLENBQUEsQ0FBQyxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsT0FBTSxDQUFFLENBQUEsQ0FBQyxDQUFFLENBQUEsQ0FBQyxDQUFHLE1BQUksQ0FBQyxDQUNwQyxFQUFDLE9BQU0sQ0FBRSxDQUFBLENBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLE9BQU0sQ0FBRSxDQUFBLENBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBRyxNQUFJLENBQUMsQ0FDcEMsRUFBQyxPQUFNLENBQUUsQ0FBQSxFQUFFLEVBQUEsQ0FBQyxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsT0FBTSxDQUFFLENBQUEsRUFBRSxFQUFBLENBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBRyxNQUFJLENBQUMsQ0FDNUMsQ0FBQztBQUdELEFBQUksVUFBQSxDQUFBLE1BQUssRUFBSSxDQUFBLE1B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QUMsRUFBSSxNQUFJLENBQUEsQ0FBRSxFQUFBLENBQUMsQ0FBQztBQUN2RSxBQUFJLE1BQUEsQ0FBQSxRQUFPLEVBQUksRUFBQyxFQUFDLENBQUUsQ0FBQSxDQUFDLEVBQUksQ0FBQSxLQUFJLENBQUUsQ0FBQSxDQUFDLEVBQUksTUFBSSxDQUFBLENBQUUsRUFBQSxDQUFHLENBQUEsRUFBQyxDQUFFLENBQUEsQ0FBQyxFQUFJLENBQUEsS0FBSSxDQUFFLENBQUEsQ0FBQyxFQUFJLE1BQUksQ0FBQSxDQUFFLEVBQUEsQ0FBQyxDQUFDO0FBRXZFLEFBQUksTUFBQSxDQUFBLFFBQU8sRUFBSSxFQUFDLEVBQUMsQ0FBRSxDQUFBLENBQUMsRUFBSSxDQUFBLEtBQUksQ0FBRSxDQUFBLENBQUMsRUFBSSxNQUFJLENBQUEsQ0FBRSxFQUFBLENBQUcsQ0FBQSxFQUFDLENBQUUsQ0FBQSxDQUFDLEVBQUksQ0FBQSxLQUFJLENBQUUsQ0FBQSxDQUFDLEVBQUksTUFBSSxDQUFBLENBQUUsRUFBQSxDQUFDLENBQUM7QUFDdkUsQUFBSSxNQUFBLENBQUEsUUFBTyxFQUFJLEVBQUMsRUFBQyxDQUFFLENBQUEsQ0FBQyxFQUFJLENBQUEsS0FBSSxDQUFFLENBQUEsQ0FBQyxFQUFJLE1BQUksQ0FBQSxDQUFFLEVBQUEsQ0FBRyxDQUFBLEVBQUMsQ0FBRSxDQUFBLENBQUMsRUFBSSxDQUFBLEtBQUksQ0FBRSxDQUFBLENBQUMsRUFBSSxNQUFJLENBQUEsQ0FBRSxFQUFBLENBQUMsQ0FBQztBQUV2RSxXQUFPLEtBQUssQUFBQyxDQUNULFFBQU8sQ0FBRyxTQUFPLENBQUcsU0FBTyxDQUMzQixTQUFPLENBQUcsU0FBTyxDQUFHLFNBQU8sQ0FDL0IsQ0FBQztFQUNMO0FBQUEsQUFJQSxTQUFTLFlBQVUsQ0FBRyxFQUFDLENBQUcsQ0FBQSxLQUFJLENBQUcsQ0FBQSxFQUFDLENBQUc7QUFFakMsQUFBSSxNQUFBLENBQUEsUUFBTyxFQUFJLENBQUEsTUFBSyxVQUFVLEFBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFFLENBQUEsQ0FBQyxFQUFJLENBQUEsRUFBQyxDQUFFLENBQUEsQ0FBQyxDQUFDLEVBQUksRUFBQyxDQUFBLENBQUcsQ0FBQSxLQUFJLENBQUUsQ0FBQSxDQUFDLEVBQUksQ0FBQSxFQUFDLENBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVFLEFBQUksTUFBQSxDQUFBLFFBQU8sRUFBSSxFQUNYLENBQUMsRUFBQyxDQUFFLENBQUEsQ0FBQyxFQUFJLENBQUEsUUFBTyxDQUFFLENBQUEsQ0FBQyxFQUFJLE1BQUksQ0FBQSxDQUFFLEVBQUEsQ0FBRyxDQUFBLEVBQUMsQ0FBRSxDQUFBLENBQUMsRUFBSSxDQUFBLFFBQU8sQ0FBRSxDQUFBLENBQUMsRUFBSSxNQUFJLENBQUEsQ0FBRSxFQUFBLENBQUMsQ0FDN0QsRUFBQyxLQUFJLENBQUUsQ0FBQSxDQUFDLEVBQUksQ0FBQSxRQUFPLENBQUUsQ0FBQSxDQUFDLEVBQUksTUFBSSxDQUFBLENBQUUsRUFBQSxDQUFHLENBQUEsS0FBSSxDQUFFLENBQUEsQ0FBQyxFQUFJLENBQUEsUUFBTyxDQUFFLENBQUEsQ0FBQyxFQUFJLE1BQUksQ0FBQSxDQUFFLEVBQUEsQ0FBQyxDQUN2RSxDQUFDO0FBQ0QsQUFBSSxNQUFBLENBQUEsUUFBTyxFQUFJLEVBQ1gsQ0FBQyxFQUFDLENBQUUsQ0FBQSxDQUFDLEVBQUksQ0FBQSxRQUFPLENBQUUsQ0FBQSxDQUFDLEVBQUksTUFBSSxDQUFBLENBQUUsRUFBQSxDQUFHLENBQUEsRUFBQyxDQUFFLENBQUEsQ0FBQyxFQUFJLENBQUEsUUFBTyxDQUFFLENBQUEsQ0FBQyxFQUFJLE1BQUksQ0FBQSxDQUFFLEVBQUEsQ0FBQyxDQUM3RCxFQUFDLEtBQUksQ0FBRSxDQUFBLENBQUMsRUFBSSxDQUFBLFFBQU8sQ0FBRSxDQUFBLENBQUMsRUFBSSxNQUFJLENBQUEsQ0FBRSxFQUFBLENBQUcsQ0FBQSxLQUFJLENBQUUsQ0FBQSxDQUFDLEVBQUksQ0FBQSxRQUFPLENBQUUsQ0FBQSxDQUFDLEVBQUksTUFBSSxDQUFBLENBQUUsRUFBQSxDQUFDLENBQ3ZFLENBQUM7QUFFRCxBQUFJLE1BQUEsQ0FBQSxRQUFPLEVBQUksQ0FBQSxNQUFLLFVBQVUsQUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUUsQ0FBQSxDQUFDLEVBQUksQ0FBQSxLQUFJLENBQUUsQ0FBQSxDQUFDLENBQUMsRUFBSSxFQUFDLENBQUEsQ0FBRyxDQUFBLEVBQUMsQ0FBRSxDQUFBLENBQUMsRUFBSSxDQUFBLEtBQUksQ0FBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUUsQUFBSSxNQUFBLENBQUEsUUFBTyxFQUFJLEVBQ1gsQ0FBQyxLQUFJLENBQUUsQ0FBQSxDQUFDLEVBQUksQ0FBQSxRQUFPLENBQUUsQ0FBQSxDQUFDLEVBQUksTUFBSSxDQUFBLENBQUUsRUFBQSxDQUFHLENBQUEsS0FBSSxDQUFFLENBQUEsQ0FBQyxFQUFJLENBQUEsUUFBTyxDQUFFLENBQUEsQ0FBQyxFQUFJLE1BQUksQ0FBQSxDQUFFLEVBQUEsQ0FBQyxDQUNuRSxFQUFDLEVBQUMsQ0FBRSxDQUFBLENBQUMsRUFBSSxDQUFBLFFBQU8sQ0FBRSxDQUFBLENBQUMsRUFBSSxNQUFJLENBQUEsQ0FBRSxFQUFBLENBQUcsQ0FBQSxFQUFDLENBQUUsQ0FBQSxDQUFDLEVBQUksQ0FBQSxRQUFPLENBQUUsQ0FBQSxDQUFDLEVBQUksTUFBSSxDQUFBLENBQUUsRUFBQSxDQUFDLENBQ2pFLENBQUM7QUFDRCxBQUFJLE1BQUEsQ0FBQSxRQUFPLEVBQUksRUFDWCxDQUFDLEtBQUksQ0FBRSxDQUFBLENBQUMsRUFBSSxDQUFBLFFBQU8sQ0FBRSxDQUFBLENBQUMsRUFBSSxNQUFJLENBQUEsQ0FBRSxFQUFBLENBQUcsQ0FBQSxLQUFJLENBQUUsQ0FBQSxDQUFDLEVBQUksQ0FBQSxRQUFPLENBQUUsQ0FBQSxDQUFDLEVBQUksTUFBSSxDQUFBLENBQUUsRUFBQSxDQUFDLENBQ25FLEVBQUMsRUFBQyxDQUFFLENBQUEsQ0FBQyxFQUFJLENBQUEsUUFBTyxDQUFFLENBQUEsQ0FBQyxFQUFJLE1BQUksQ0FBQSxD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LENBQUEsUUFBTyxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsUUFBTyxDQUFFLENBQUEsQ0FBQyxDQUNwQyxDQUFBLFFBQU8sQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLFFBQU8sQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLFFBQU8sQ0FBRSxDQUFBLENBQUMsQ0FFcEMsQ0FBQSxRQUFPLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxRQUFPLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxRQUFPLENBQUUsQ0FBQSxDQUFDLENBQ3BDLENBQUEsUUFBTyxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsUUFBTyxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsUUFBTyxDQUFFLENBQUEsQ0FBQyxDQUN4QyxDQUFDO0lBQ0w7QUFBQSxBQUdBLE9BQUksVUFBUyxNQUFNLEdBQUssQ0FBQSxPQUFNLGFBQWEsQ0FBRztBQUMxQyxZQUFNLGFBQWEsS0FBSyxBQUFDLENBQ3JCLFFBQU8sQ0FBRSxDQUFBLENBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLFFBQU8sQ0FBRSxDQUFBLENBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLENBQUEsRUFBSSxNQUFJLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLElBQUUsQ0FBRyxFQUFBLENBQzVELENBQUEsUUFBTyxDQUFFLENBQUEsQ0FBQyxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsUUFBTyxDQUFFLENBQUEsQ0FBQyxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsQ0FBQSxFQUFJLE1BQUksQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsSUFBRSxDQUFHLEVBQUEsQ0FFNUQsQ0FBQSxRQUFPLENBQUUsQ0FBQSxDQUFDLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxRQUFPLENBQUUsQ0FBQSxDQUFDLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxDQUFBLEVBQUksTUFBSSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxJQUFFLENBQUcsRUFBQSxDQUM1RCxDQUFBLFFBQU8sQ0FBRSxDQUFBLENBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLFFBQU8sQ0FBRSxDQUFBLENBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLENBQUEsRUFBSSxNQUFJLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLElBQUUsQ0FBRyxFQUFBLENBRTVELENBQUEsUUFBTyxDQUFFLENBQUEsQ0FBQyxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsUUFBTyxDQUFFLENBQUEsQ0FBQyxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsQ0FBQSxFQUFJLE1BQUksQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsSUFBRSxDQUFHLEVBQUEsQ0FDNUQsQ0FBQSxRQUFPLENBQUUsQ0FBQSxDQUFDLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxRQUFPLENBQUUsQ0FBQSxDQUFDLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxDQUFBLEVBQUksTUFBSSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxJQUFFLENBQUcsRUFBQSxDQUU1RCxDQUFBLFFBQU8sQ0FBRSxDQUFBLENBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLFFBQU8sQ0FBRSxDQUFBLENBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLENBQUEsRUFBSSxNQUFJLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLElBQUUsQ0FBRyxFQUFBLENBQzVELENBQUEsUUFBTyxDQUFFLENBQUEsQ0FBQyxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsUUFBTyxDQUFFLENBQUEsQ0FBQyxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsQ0FBQSxFQUFJLE1BQUksQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsSUFBRSxDQUFHLEVBQUEsQ0FFNUQsQ0FBQSxRQUFPLENBQUUsQ0FBQSxDQUFDLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxRQUFPLENBQUUsQ0FBQSxDQUFDLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxDQUFBLEVBQUksTUFBSSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxJQUFFLENBQUcsRUFBQSxDQUM1RCxDQUFBLFFBQU8sQ0FBRSxDQUFBLENBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLFFBQU8sQ0FBRSxDQUFBLENBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLENBQUEsRUFBSSxNQUFJLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLElBQUUsQ0FBRyxFQUFBLENBRTVELENBQUEsUUFBTyxDQUFFLENBQUEsQ0FBQyxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsUUFBTyxDQUFFLENBQUEsQ0FBQyxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsQ0FBQSxFQUFJLE1BQUksQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsSUFBRSxDQUFHLEVBQUEsQ0FDNUQsQ0FBQSxRQUFPLENBQUUsQ0FBQSxDQUFDLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxRQUFPLENBQUUsQ0FBQSxDQUFDLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxDQUFBLEVBQUksTUFBSSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxJQUFFLENBQUcsRUFBQSxDQUU1RCxDQUFBLFFBQU8sQ0FBRSxDQUFBLENBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLFFBQU8sQ0FBRSxDQUFBLENBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLENBQUEsRUFBSSxNQUFJLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLElBQUUsQ0FBRyxFQUFBLENBQzVELENBQUEsUUFBTyxDQUFFLENBQUEsQ0FBQyxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsUUFBTyxDQUFFLENBQUEsQ0FBQyxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsQ0FBQSxFQUFJLE1BQUksQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsSUFBRSxDQUFHLEVBQUEsQ0FFNUQsQ0FBQSxRQUFPLENBQUUsQ0FBQSxDQUFDLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxRQUFPLENBQUUsQ0FBQSxDQUFDLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxDQUFBLEVBQUksTUFBSSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxJQUFFLENBQUcsRUFBQSxDQUM1RCxDQUFBLFFBQU8sQ0FBRSxDQUFBLENBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLFFBQU8sQ0FBRSxDQUFBLENBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLENBQUEsRUFBSSxNQUFJLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLElBQUUsQ0FBRyxFQUFBLENBQ2hFLENBQUM7SUFDTDtBQUFBLEFBRUEsT0FBSSxVQUFTLE1BQU0sR0FBSyxXQUFTLENBQUEsRUFBSyxDQUFBLE9BQU0sYUFBYSxDQUFHO0FBQ3hELEFBQUksUUFBQSxDQUFBLE1BQUssQ0FBQztBQUNWLFNBQUksVUFBUyxHQUFLLFdBQVMsQ0FBRztBQUUxQixhQUFLLEVBQUksRUFBQyxDQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBQyxDQUFDO01BQ3RCLEtBQ0ssS0FBSSxVQUFTLEdBQUssV0FBUyxDQUFHO0FBRS9CLGFBQUssRUFBSSxFQUFDLENBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFDLENBQUM7TUFDdEI7QUFBQSxBQUlBLFlBQU0sYUFBYSxLQUFLLEFBQUMsQ0FDckIsRUFBQyxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsRUFBQyxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsQ0FBQSxFQUFJLE1BQUksQ0FDdEIsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsQ0FBQSxNQUFLLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxNQUFLLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxNQUFLLENBQUUsQ0FBQSxDQUFDLENBQ3ZDLENBQUEsS0FBSSxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsS0FBSSxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsQ0FBQSxFQUFJLE1BQUksQ0FDNUIsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsQ0FBQSxNQUFLLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxNQUFLLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxNQUFLLENBQUUsQ0FBQSxDQUFDLENBQ3ZDLENBQUEsS0FBSSxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsS0FBSSxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsQ0FBQSxFQUFJLE1BQUksQ0FDNUIsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsQ0FBQSxNQUFLLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxNQUFLLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxNQUFLLENBQUUsQ0FBQSxDQUFDLENBQ3ZDLENBQUEsRUFBQyxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsRUFBQyxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsQ0FBQSxFQUFJLE1BQUksQ0FDdEIsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsQ0FBQSxNQUFLLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxNQUFLLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxNQUFLLENBQUUsQ0FBQSxDQUFDLENBQzNDLENBQUM7QUFFRCxBQUFJLFFBQUEsQ0FBQSxTQUFRLEVBQUksQ0FBQSxLQUFJLE9BQU8sQ0FBQztBQUM1QixVQUFTLEdBQUEsQ0FBQSxFQUFDLEVBQUUsRUFBQSxDQUFHLENBQUEsRUFBQyxFQUFJLFVB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ekQsRUFBQyxHQUFFLEVBQUUsRUFBSSxLQUFHLENBQUEsQ0FBSSxDQUFBLEdBQUUsRUFBRSxFQUFJLEtBQUcsQ0FBRyxDQUFBLEdBQUUsRUFBRSxFQUFJLElBQUUsQ0FBQSxDQUFJLENBQUEsR0FBRSxFQUFFLEVBQUksSUFBRSxDQUFDLENBQ3ZELEVBQUMsR0FBRSxFQUFFLEVBQUksS0FBRyxDQUFBLENBQUksQ0FBQSxHQUFFLEVBQUUsRUFBSSxLQUFHLENBQUcsQ0FBQSxHQUFFLEVBQUUsRUFBSSxLQUFHLENBQUEsQ0FBSSxDQUFBLEdBQUUsRUFBRSxFQUFJLEtBQUcsQ0FBQyxDQUN6RCxFQUFDLEdBQUUsRUFBRSxFQUFJLEtBQUcsQ0FBQSxDQUFJLENBQUEsR0FBRSxFQUFFLEVBQUksS0FBRyxDQUFHLENBQUEsR0FBRSxFQUFFLEVBQUksS0FBRyxDQUFBLENBQUksQ0FBQSxHQUFFLEVBQUUsRUFBSSxLQUFHLENBQUMsQ0FDekQsRUFBQyxHQUFFLEVBQUUsRUFBSSxJQUFFLENBQUEsQ0FBSSxDQUFBLEdBQUUsRUFBRSxFQUFJLElBQUUsQ0FBRyxDQUFBLEdBQUUsRUFBRSxFQUFJLElBQUUsQ0FBQSxDQUFJLENBQUEsR0FBRSxFQUFFLEVBQUksSUFBRSxDQUFDLENBQ3JELEVBQUMsR0FBRSxFQUFFLEVBQUksSUFBRSxDQUFBLENBQUksQ0FBQSxHQUFFLEVBQUUsRUFBSSxJQUFFLENBQUcsQ0FBQSxHQUFFLEVBQUUsRUFBSSxLQUFHLENBQUEsQ0FBSSxDQUFBLEdBQUUsRUFBRSxFQUFJLEtBQUcsQ0FBQyxDQUN2RCxFQUFDLEdBQUUsRUFBRSxFQUFJLEtBQUcsQ0FBQSxDQUFJLENBQUEsR0FBRSxFQUFFLEVBQUksS0FBRyxDQUFHLENBQUEsR0FBRSxFQUFFLEVBQUksS0FBRyxDQUFBLENBQUksQ0FBQSxHQUFFLEVBQUUsRUFBSSxLQUFHLENBQUMsQ0FDekQsRUFBQyxHQUFFLEVBQUUsRUFBSSxLQUFHLENBQUEsQ0FBSSxDQUFBLEdBQUUsRUFBRSxFQUFJLEtBQUcsQ0FBRyxDQUFBLEdBQUUsRUFBRSxFQUFJLElBQUUsQ0FBQSxDQUFJLENBQUEsR0FBRSxFQUFFLEVBQUksSUFBRSxDQUFDLENBQzNEO0FBQUEsSUFDSjtBQUNBLGFBQVMsQ0FBRyxFQUNSLElBQUcsQ0FBRyxRQUFNLENBQ2hCO0FBQUEsRUFDSixDQUFDO0FBRUQsT0FBTyxFQUFBLENBQUM7QUFDWixDQUFDO0FBRUQsR0FBSSxNQUFLLElBQU0sVUFBUSxDQUFHO0FBQ3RCLE9BQUssUUFBUSxFQUFJLFdBQVMsQ0FBQztBQUMvQjtBQUFBOzs7QUNsbUJBO0FBQUEsQUFBSSxFQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsU0FBUSxDQUFDLENBQUM7QUFDM0IsQUFBSSxFQUFBLENBQUEsY0FBYSxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsdUJBQXNCLENBQUMsQ0FBQztBQUVyRCxBQUFJLEVBQUEsQ0FBQSxTQUFRLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxpQkFBZ0IsQ0FBQyxDQUFDO0FBRzFDLE9BQVMsV0FBUyxDQUFHLEVBQUMsQ0FBRyxDQUFBLFdBQVUsQ0FBRyxDQUFBLGFBQVksQ0FBRyxDQUFBLE9BQU0sQ0FDM0Q7QUFDSSxRQUFNLEVBQUksQ0FBQSxPQUFNLEdBQUssR0FBQyxDQUFDO0FBRXZCLEtBQUcsR0FBRyxFQUFJLEdBQUMsQ0FBQztBQUNaLEtBQUcsWUFBWSxFQUFJLFlBQVUsQ0FBQztBQUM5QixLQUFHLGNBQWMsRUFBSSxjQUFZLENBQUM7QUFDbEMsS0FBRyxPQUFPLEVBQUksQ0FBQSxJQUFHLEdBQUcsYUFBYSxBQUFDLEVBQUMsQ0FBQztBQUNwQyxLQUFHLFVBQVUsRUFBSSxDQUFBLE9BQU0sVUFBVSxHQUFLLENBQUEsSUFBRyxHQUFHLFVBQVUsQ0FBQztBQUN2RCxLQUFHLFdBQVcsRUFBSSxDQUFBLE9BQU0sV0FBVyxHQUFLLENBQUEsSUFBRyxHQUFHLFlBQVksQ0FBQztBQUMzRCxLQUFHLHNCQUFzQixFQUFJLEVBQUEsQ0FBQztBQUU5QixLQUFHLGFBQWEsRUFBSSxDQUFBLElBQUcsWUFBWSxXQUFXLEVBQUksQ0FBQSxJQUFHLGNBQWMsT0FBTyxDQUFDO0FBQzNFLEtBQUcsZUFBZSxFQUFJLENBQUEsSUFBRyxhQUFhLEVBQUksQ0FBQSxJQUFHLHNCQUFzQixDQUFDO0FBVXBFLEtBQUcsR0FBRyxXQUFXLEFBQUMsQ0FBQyxJQUFHLEdBQUcsYUFBYSxDQUFHLENBQUEsSUFBRyxPQUFPLENBQUMsQ0FBQztBQUNyRCxLQUFHLEdBQUcsV0FBVyxBQUFDLENBQUMsSUFBRyxHQUFHLGFBQWEsQ0FBRyxDQUFBLElBQUcsWUFBWSxDQUFHLENBQUEsSUFBRyxXQUFXLENBQUMsQ0FBQztBQUMvRTtBQUFBLEFBR0EsU0FBUyxVQUFVLE9BQU8sRUFBSSxVQUFVLE9BQU0sQ0FDOUM7QUFDSSxRQUFNLEVBQUksQ0FBQSxPQUFNLEdBQUssR0FBQyxDQUFDO0FBSXZCLEtBQUksTUFBTyxLQUFHLGNBQWMsQ0FBQSxFQUFLLFdBQVMsQ0FBRztBQUN6QyxPQUFHLGNBQWMsQUFBQyxFQUFDLENBQUM7RUFDeEI7QUFBQSxBQUVJLElBQUEsQ0FBQSxVQUFTLEVBQUksQ0FBQSxPQUFNLFdBQVcsR0FBSyxDQUFBLFNBQVEsUUFBUSxDQUFDO0FBQ3hELFdBQVMsSUFBSSxBQUFDLEVBQUMsQ0FBQztBQUVoQixLQUFHLEdBQUcsV0FBVyxBQUFDLENBQUMsSUFBRyxHQUFHLGFBQWEsQ0FBRyxDQUFBLElBQUcsT0FBTyxDQUFDLENBQUM7QUFDckQsS0FBRyxjQUFjLE9BQU8sQUFBQyxDQUFDLElBQUcsR0FBRyxDQUFHLFdBQVMsQ0FBQyxDQUFDO0FBRzlDLEtBQUcsR0FBRyxXQUFXLEFBQUMsQ0FBQyxJQUFHLFVBQVUsQ0FBRyxFQUFBLENBQUcsQ0FBQSxJQUFHLGFBQWEsQ0FBQyxDQUFDO0FBRTVELENBQUM7QUFFRCxTQUFTLFVBQVUsUUFBUSxFQUFJLFVBQVMsQUFBQyxDQUN6QztBQUNJLFFBQU0sSUFBSSxBQUFDLENBQUMsNENBQTJDLEVBQUksQ0FBQSxJQUFHLFlBQVksV0FBVyxDQUFDLENBQUM7QUFDdkYsS0FBRyxHQUFHLGFBQWEsQUFBQyxDQUFDLElBQUcsT0FBTyxDQUFDLENBQUM7QUFDakMsT0FBTyxLQUFHLFlBQVksQ0FBQztBQUMzQixDQUFDO0FBRUQsR0FBSSxNQUFLLElBQU0sVUFBUSxDQUFHO0FBQ3RCLE9BQUssUUFBUSxFQUFJLFdBQVMsQ0FBQztBQUMvQjtBQUFBOzs7QUMvREE7QUFBQSxBQUFJLEVBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxTQUFRLENBQUMsQ0FBQztBQUMzQixBQUFJLEVBQUEsQ0FBQSxVQUFTLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxrQkFBaUIsQ0FBQyxDQUFDO0FBQzVDLEFBQUksRUFBQSxDQUFBLFVBQVMsRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLGNBQWEsQ0FBQyxDQUFDO0FBQ3hDLEFBQUksRUFBQSxDQUFBLGNBQWEsRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLHVCQUFzQixDQUFDLENBQUM7QUFDckQsQUFBSSxFQUFBLENBQUEsU0FBUSxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsaUJBQWdCLENBQUMsQ0FBQztBQUMxQyxBQUFJLEVBQUEsQ0FBQSxjQUFhLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxpQkFBZ0IsQ0FBQyxDQUFDO0FBRS9DLEFBQUksRUFBQSxDQUFBLEtBQUksRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLGFBQVksQ0FBQyxDQUFDO0FBSWxDLEFBQUksRUFBQSxDQUFBLFVBQVMsRUFBSTtBQUNiLEtBQUcsQ0FBRyxVQUFVLEVBQUMsQ0FBRztBQUNoQixPQUFHLEdBQUcsRUFBSSxHQUFDLENBQUM7QUFDWixPQUFHLGNBQWMsQUFBQyxFQUFDLENBQUM7QUFFcEIsT0FBSSxNQUFPLEtBQUcsTUFBTSxDQUFBLEVBQUssV0FBUyxDQUFHO0FBQ2pDLFNBQUcsTUFBTSxBQUFDLEVBQUMsQ0FBQztJQUNoQjtBQUFBLEVBQ0o7QUFDQSxRQUFNLENBQUcsVUFBUyxBQUFDLENBQUU7QUFDakIsT0FBRyxjQUFjLEFBQUMsRUFBQyxDQUFDO0VBQ3hCO0FBQ0EsUUFBTSxDQUFHLEdBQUM7QUFDVixVQUFRLENBQUcsTUFBSTtBQUNmLGNBQVksQ0FBRyxVQUFRLEFBQUMsQ0FBQyxHQUFDO0FBQzFCLFdBQVMsQ0FBRyxVQUFRLEFBQUMsQ0FBQyxHQUFDO0FBQ3ZCLFlBQVUsQ0FBRyxVQUFRLEFBQUMsQ0FBQyxHQUFDO0FBQ3hCLGVBQWEsQ0FBRyxVQUFVLFdBQVUsQ0FBRztBQUNuQyxTQUFPLElBQUksV0FBUyxBQUFDLENBQUMsSUFBRyxHQUFHLENBQUcsWUFBVSxDQUFHLENBQUEsSUFBRyxjQUFjLENBQUMsQ0FBQztFQUNuRTtBQUFBLEFBQ0osQ0FBQztBQUVELFNBQVMsY0FBYyxFQUFJLFVBQVMsQUFBQzs7QUFHakMsQUFBSSxJQUFBLENBQUEsS0FBSSxFQUFJLENBQUEsS0FBSSxBQUFDLEVBQUMsQ0FBQztBQUduQixBQUFJLElBQUEsQ0FBQSxPQUFNLEVBQUksQ0FBQSxJQUFHLGdCQUFnQixBQUFDLEVBQUMsQ0FBQztBQUNwQyxLQUFJLElBQUcsVUFBVSxDQUFHO0FBQ2hCLEFBQUksTUFBQSxDQUFBLGlCQUFnQixFQUFJLENBQUEsTUFBSyxPQUFPLEFBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQztBQUM5QyxvQkFBZ0IsQ0FBRSxtQkFBa0IsQ0FBQyxFQUFJLEtBQUcsQ0FBQztFQUNqRDtBQUFBLEFBR0ksSUFBQSxDQUFBLFVBQVMsRUFBSSxFQUFDLElBQUcsUUFBUSxHQUFLLENBQUEsSUFBRyxRQUFRLFdBQVcsQ0FBQyxDQUFDO0FBRzFELEFBQUksSUFBQSxDQUFBLE9BQU0sRUFBSSxFQUFDLElBQUcsZUFBZSxBQUFDLENBQUMsWUFBVyxDQUFDLENBQUEsRUFBSyxDQUFBLElBQUcsV0FBVyxDQUFDLENBQUM7QUFDcEUsQUFBSSxJQUFBLENBQUEsaUJBQWdCLEVBQUksRUFBQyxJQUFHLGVBQWUsQUFBQyxDQUFDLHNCQUFxQixDQUFDLENBQUEsRUFBSyxDQUFBLElBQUcscUJBQXFCLENBQUMsQ0FBQztBQUVsRyxNQUFJLE1BQU0sQUFBQyxFQUFDLFNBQUEsUUFBTyxDQUFLO0FBQ3BCLE9BQUksQ0FBQyxPQUFNLENBQUc7QUFFVixZQUFNLEVBQUksSUFBSSxVQUFRLEFBQUMsQ0FDbkIsT0FBTSxDQUNOLENBQUEsY0FBYSxDQUFFLHNCQUFxQixDQUFDLENBQ3JDLENBQUEsY0FBYSxDQUFFLHdCQUF1QixDQUFDLENBQ3ZDO0FBQ0ksY0FBTSxDQUFHLFFBQU07QUFDZixpQkFBUyxDQUFHLFdBQVM7QUFDckIsV0FBRyxDQUFHLFVBQVE7QUFDZCxlQUFPLENBQUcsU0FBTztBQUFBLE1BQ3JCLENBQ0osQ0FBQztJQUNMLEtBQ0s7QUFFRCxZQUFNLFFBQVEsRUFBSSxRQUFNLENBQUM7QUFDekIsWUFBTSxXQUFXLEVBQUksV0FBUyxDQUFDO0FBQy9CLFlBQU0sUUFBUSxBQUFDLENBQUMsUUFBTyxDQUFDLENBQUM7SUFDN0I7QUFBQSxFQUNKLEVBQUMsQ0FBQztBQUVGLEtBQUksSUFBRyxVQUFVLENBQUc7QUFDaEIsUUFBSSxNQUFNLEFBQUMsRUFBQyxTQUFBLFFBQU8sQ0FBSztBQUNwQixTQUFJLENBQUMsaUJBQWdCLENBQUc7QUFFcEIsd0JBQWdCLEVBQUksSUFBSSxVQUFRLEFBQUMsQ0FDN0IsT0FBTSxDQUNOLENBQUEsY0FBYSxDQUFFLHNCQUFxQixDQUFDLENBQ3JDLENBQUEsY0FBYSxDQUFFLG9CQUFtQixDQUFDLENBQ25DO0FBQ0ksZ0JBQU0sQ0FBRyxrQkFBZ0I7QUFDekIsbUJBQVMsQ0FBRyxXQUFTO0FBQ3JCLGFBQUcsQ0FBRyxFQUFDLFNBQVEsRUFBSSxlQUFhLENBQUM7QUFDakMsaUJBQU8sQ0FBRyxTQUFPO0FBQUEsUUFDckIsQ0FDSixDQUFDO01BQ0wsS0FDSztBQUVELHdCQUFnQixRQUFRLEVBQUksa0JBQWdCLENBQUM7QUFDN0Msd0JBQWdCLFdBQVcsRUFBSSxXQUFTLENBQUM7QUFDekMsd0JBQWdCLFFBQVEsQUFBQyxDQUFDLFFBQU8sQ0FBQyxDQUFDO01BQ3ZDO0FBQUEsSUFDSixFQUFDLENBQUM7RUFDTjtBQUFBLEFBSUEsTUFBSSxNQUFNLEFBQUMsRUFBQyxTQUFBLEFBQUMsQ0FBSztBQUNmLE9BQUksT0FBTSxDQUFHO0FBQ1Qsb0JBQWMsRUFBSSxRQUFNLENBQUM7SUFDN0I7QUFBQSxBQUVBLE9BQUksaUJBQWdCLENBQUc7QUFDbkIsOEJBQXdCLEVBQUksa0JBQWdCLENBQUM7SUFDakQ7QUFBQSxFQUdILEVBQUMsQ0FBQztBQUNOLENBQUE7QUFJQSxTQUFTLGdCQUFnQixFQUFJLFVBQVMsQUFBQyxDQUN2QztBQUVJLEFBQUksSUFBQSxDQUFBLE9BQU0sRUFBSSxHQUFDLENBQUM7QUFDaEIsS0FBSSxJQUFHLFFBQVEsR0FBSyxLQUFHLENBQUc7QUFDdEIsUUFBUyxHQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUssQ0FBQSxJQUFHLFFBQVEsQ0FBRztBQUN4QixZQUFNLENBQUUsQ0FBQSxDQUFDLEVBQUksQ0FBQSxJQUFHLFFBQVEsQ0FBRSxDQUFBLENBQUMsQ0FBQztJQUNoQztBQUFBLEVBQ0o7QUFBQSxBQUNBLEtBQUksSUFBRyxRQUFRLEdBQUssS0FBRyxDQUFBLEVBQUssQ0FBQSxJQUFHLFFBQVEsUUFBUSxHQUFLLEtBQUcsQ0FBRztBQUN0RCxRQUFTLEdBQUEsQ0FBQSxDQUFBLENBQUEsRUFBSyxDQUFBLElBQUcsUUFBUSxRQUFRLENBQUc7QUFDaEMsWUFBTSxDQUFFLENBQUEsQ0FBQyxFQUFJLENBQUEsSUFBRyxRQUFRLFFBQVEsQ0FBRSxDQUFBLENBQUMsQ0FBQztJQUN4QztBQUFBLEVBQ0o7QUFBQSxBQUNBLE9BQU8sUUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFHRCxTQUFTLFlBQVksRUFBSSxVQUFTLEFBQUMsQ0FDbkM7QUFDSSxBQUFJLElBQUEsQ0FBQSxVQUFTLEVBQUksQ0FBQSxTQUFRLFFBQVEsQ0FBQztBQUNsQyxLQUFJLFVBQVMsR0FBSyxLQUFHLENBQUEsRUFBSyxDQUFBLElBQUcsUUFBUSxHQUFLLEtBQUcsQ0FBQSxFQUFLLENBQUEsSUFBRyxRQUFRLFNBQVMsR0FBSyxLQUFHLENBQUc7QUFDN0UsYUFBUyxZQUFZLEFBQUMsQ0FBQyxJQUFHLFFBQVEsU0FBUyxDQUFDLENBQUM7RUFDakQ7QUFBQSxBQUNKLENBQUM7QUFFRCxTQUFTLE9BQU8sRUFBSSxVQUFTLEFBQUMsQ0FDOUI7QUFFSSxLQUFJLE1BQU8sS0FBRyxVQUFVLENBQUEsRUFBSyxXQUFTLENBQUc7QUFDckMsT0FBRyxVQUFVLEFBQUMsRUFBQyxDQUFDO0VBQ3BCO0FBQUEsQUFDSixDQUFDO0FBR0QsQUFBSSxFQUFBLENBQUEsS0FBSSxFQUFJLEdBQUMsQ0FBQztBQUNkLEFBQUksRUFBQSxDQUFBLFdBQVUsRUFBSSxHQUFDLENBQUM7QUFHcEIsVUFBVSxjQUFjLEVBQUksVUFBVSxJQUFHLENBQUcsQ0FBQSxRQUFPLENBQ25EO0FBQ0ksTUFBSSxDQUFFLElBQUcsQ0FBQyxFQUFJLENBQUEsS0FBSSxDQUFFLElBQUcsQ0FBQyxHQUFLLENBQUEsTUFBSyxPQUFPLEFBQUMsQ0FBQyxLQUFJLENBQUUsUUFBTyxRQUFRLENBQUMsR0FBSyxXQUFTLENBQUMsQ0FBQztBQUNqRixLQUFJLEtBQUksQ0FBRSxRQUFPLFFBQVEsQ0FBQyxDQUFHO0FBQ3pCLFFBQUksQ0FBRSxJQUFHLENBQUMsT0FBTyxFQUFJLENBQUEsS0FBSSxDQUFFLFFBQU8sUUFBUSxDQUFDLENBQUM7RUFDaEQ7QUFBQSxBQUVBLE1BQVMsR0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFLLFNBQU8sQ0FBRztBQUNwQixRQUFJLENBQUUsSUFBRyxDQUFDLENBQUUsQ0FBQSxDQUFDLEVBQUksQ0FBQSxRQUFPLENBQUUsQ0FBQSxDQUFDLENBQUM7RUFDaEM7QUFBQSxBQUVBLE1BQUksQ0FBRSxJQUFHLENBQUMsS0FBSyxFQUFJLEtBQUcsQ0FBQztBQUN2QixPQUFPLENBQUEsS0FBSSxDQUFFLElBQUcsQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFPRCxJQUFJLFNBQVMsRUFBSSxDQUFBLE1BQUssT0FBTyxBQUFDLENBQUMsVUFBUyxDQUFDLENBQUM7QUFDMUMsSUFBSSxTQUFTLEtBQUssRUFBSSxXQUFTLENBQUM7QUFFaEMsSUFBSSxTQUFTLGtCQUFrQixFQUFJLGlCQUFlLENBQUM7QUFDbkQsSUFBSSxTQUFTLG9CQUFvQixFQUFJLG1CQUFpQixDQUFDO0FBRXZELElBQUksU0FBUyxRQUFRLEVBQUksRUFDckIscUJBQW9CLENBQUcsT0FBSyxDQUNoQyxDQUFDO0FBRUQsSUFBSSxTQUFTLFVBQVUsRUFBSSxLQUFHLENBQUM7QUFFL0IsSUFBSSxTQUFTLE1BQU0sRUFBSSxVQUFTLEFBQUMsQ0FBRTtBQUMvQixLQUFHLGNBQWMsRUFBSSxJQUFJLGVBQWEsQUFBQyxDQUFDLElBQUcsR0FBRyxDQUFHLEVBQzdDO0FBQUUsT0FBRyxDQUFHLGFBQVc7QUFBRyxPQUFHLENBQUcsRUFBQTtBQUFHLE9BQUcsQ0FBRyxDQUFBLElBQUcsR0FBRyxNQUFNO0FBQUcsYUFBUyxDQUFHLE1BQUk7QUFBQSxFQUFFLENBQ3RFO0FBQUUsT0FBRyxDQUFHLFdBQVM7QUFBRyxPQUFHLENBQUcsRUFBQTtBQUFHLE9BQUcsQ0FBRyxDQUFBLElBQUcsR0FBRyxNQUFNO0FBQUcsYUFBUyxDQUFHLE1BQUk7QUFBQSxFQUFFLENBQ3BFO0FBQUUsT0FBRyxDQUFHLFVBQVE7QUFBRyxPQUFHLENBQUcsRUFBQTtBQUFHLE9BQUcsQ0FBRyxDQUFBLElBQUcsR0FBRyxNQUFNO0FBQUcsYUFBUyxDQUFHLE1BQUk7QUFBQSxFQUFFLENBQ25FO0FBQUUsT0FBRyxDQUFHLG9CQUFrQjtBQUFHLE9BQUcsQ0FBRyxFQUFBO0FBQUcsT0FBRyxDQUFHLENBQUEsSUFBRyxHQUFHLE1BQU07QUFBRyxhQUFTLENBQUcsTUFBSTtBQUFBLEVBQUUsQ0FDN0U7QUFBRSxPQUFHLENBQUcsVUFBUTtBQUFHLE9BQUcsQ0FBRyxFQUFBO0FBQUcsT0FBRyxDQUFHLENBQUEsSUFBRyxHQUFHLE1BQU07QUFBRyxhQUFTLENBQUcsTUFBSTtBQUFBLEVBQUUsQ0FDdkUsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUVELElBQUksU0FBUyxjQUFjLEVBQUksVUFBVSxRQUFPLENBQUcsQ0FBQSxLQUFJLENBQUcsQ0FBQSxXQUFVLENBQ3BFO0FBRUksQUFBSSxJQUFBLENBQUEsZ0JBQWUsRUFBSSxFQUNuQixLQUFJLE1BQU0sQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLEtBQUksTUFBTSxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsS0FBSSxNQUFNLENBQUUsQ0FBQSxDQUFDLENBQzdDLENBQUEsS0FBSSxVQUFVLE1BQU0sQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLEtBQUksVUFBVSxNQUFNLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxLQUFJLFVBQVUsTUFBTSxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsS0FBSSxVQUFVLE1BQU0sQ0FBRSxDQUFBLENBQUMsQ0FDckcsQ0FBQSxLQUFJLFVBQVUsQ0FDbEIsQ0FBQztBQUdELEtBQUksS0FBSSxRQUFRLE1BQU0sQ0FBRztBQUNyQixBQUFJLE1BQUEsQ0FBQSx3QkFBdUIsRUFBSSxFQUMzQixLQUFJLFFBQVEsTUFBTSxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsS0FBSSxRQUFRLE1BQU0sQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLEtBQUksUUFBUSxNQUFNLENBQUUsQ0FBQSxDQUFDLENBQ3JFLENBQUEsS0FBSSxVQUFVLE1BQU0sQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLEtBQUksVUFBVSxNQUFNLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxLQUFJLFVBQVUsTUFBTSxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsS0FBSSxVQUFVLE1BQU0sQ0FBRSxDQUFBLENBQUMsQ0FDckcsQ0FBQSxLQUFJLFVBQVUsRUFBSSxJQUFFLENBQ3hCLENBQUM7RUFDTDtBQUFBLEFBR0EsS0FBSSxLQUFJLFFBQVEsR0FBSyxDQUFBLEtBQUksT0FBTyxDQUFHO0FBQy9CLGFBQVMsc0JBQXNCLEFBQUMsQ0FDNUIsUUFBTyxDQUNQLENBQUEsS0FBSSxFQUFFLENBQ04sQ0FBQSxLQUFJLE9BQU8sQ0FDWCxDQUFBLEtBQUksV0FBVyxDQUNmLFlBQVUsQ0FDVixFQUNJLGdCQUFlLENBQUcsaUJBQWUsQ0FDckMsQ0FDSixDQUFDO0VBQ0wsS0FFSztBQUNELGFBQVMsY0FBYyxBQUFDLENBQ3BCLFFBQU8sQ0FDUCxDQUFBLEtBQUksRUFBRSxDQUNOLFlBQVUsQ0FDVjtBQUNJLFlBQU0sQ0FBRyxLQUFHO0FBQ1oscUJBQWUsQ0FBRyxpQkFBZTtBQUFBLElBQ3JDLENBQ0osQ0FBQztFQWlDTDtBQUFBLEFBR0EsS0FBSSxLQUFJLFFBQVEsTUFBTSxHQUFLLENBQUEsS0FBSSxRQUFRLE1BQU0sQ0FBRztBQUM1QyxRQUFTLEdBQUEsQ0FBQSxHQUFFLEVBQUUsRUFBQSxDQUFHLENBQUEsR0FBRSxFQUFJLENBQUEsUUFBTyxPQUFPLENBQUcsQ0FBQSxHQUFFLEVBQUUsQ0FBRztBQUMxQyxlQUFTLGVBQWUsQUFBQyxDQUNyQixRQUFPLENBQUUsR0FBRSxDQUFDLENBQ1osQ0FBQSxLQUFJLEVBQUUsQ0FDTixDQUFBLEtBQUksUUFBUSxNQUFNLENBQ2xCLFlBQVUsQ0FDVjtBQUNJLHFCQUFhLENBQUcsS0FBRztBQUNuQix3QkFBZ0IsQ0FBRyxLQUFHO0FBQ3RCLHVCQUFlLENBQUcseUJBQXVCO0FBQUEsTUFDN0MsQ0FDSixDQUFDO0lBQ0w7QUFBQSxFQUNKO0FBQUEsQUFDSixDQUFDO0FBRUQsSUFBSSxTQUFTLFdBQVcsRUFBSSxVQUFVLEtBQUksQ0FBRyxDQUFBLEtBQUksQ0FBRyxDQUFBLFdBQVUsQ0FDOUQ7QUFHSSxBQUFJLElBQUEsQ0FBQSxnQkFBZSxFQUFJLEVBQ25CLEtBQUksTUFBTSxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsS0FBSSxNQUFNLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxLQUFJLE1BQU0sQ0FBRSxDQUFBLENBQUMsQ0FDN0MsQ0FBQSxLQUFJLFVBQVUsTUFBTSxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsS0FBSSxVQUFVLE1BQU0sQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLEtBQUksVUFBVSxNQUFNLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxLQUFJLFVBQVUsTUFBTSxDQUFFLENBQUEsQ0FBQyxDQUNyRyxDQUFBLEtBQUksVUFBVSxDQUNsQixDQUFDO0FBR0QsS0FBSSxLQUFJLFFBQVEsTUFBTSxDQUFHO0FBQ3JCLEFBQUksTUFBQSxDQUFBLHdCQUF1QixFQUFJLEVBQzNCLEtBQUksUUFBUSxNQUFNLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxLQUFJLFFBQVEsTUFBTSxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsS0FBSSxRQUFRLE1BQU0sQ0FBRSxDQUFBLENBQUMsQ0FDckUsQ0FBQSxLQUFJLFVBQVUsTUFBTSxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsS0FBSSxVQUFVLE1BQU0sQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLEtBQUksVUFBVSxNQUFNLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxLQUFJLFVBQVUsTUFBTSxDQUFFLENBQUEsQ0FBQyxDQUNyRyxDQUFBLEtBQUksVUFBVSxFQUFJLElBQUUsQ0FDeEIsQ0FBQztFQUNMO0FBQUEsQUFHQSxXQUFTLGVBQWUsQUFBQyxDQUNyQixLQUFJLENBQ0osQ0FBQSxLQUFJLEVBQUUsQ0FDTixDQUFBLEtBQUksTUFBTSxDQUNWLFlBQVUsQ0FDVixFQUNJLGdCQUFlLENBQUcsaUJBQWUsQ0FDckMsQ0FDSixDQUFDO0FBR0QsS0FBSSxLQUFJLFFBQVEsTUFBTSxHQUFLLENBQUEsS0FBSSxRQUFRLE1BQU0sQ0FBRztBQUM1QyxhQUFTLGVBQWUsQUFBQyxDQUNyQixLQUFJLENBQ0osQ0FBQSxLQUFJLEVBQUUsQ0FDTixDQUFBLEtBQUksTUFBTSxFQUFJLENBQUEsQ0FBQSxFQUFJLENBQUEsS0FBSSxRQUFRLE1BQU0sQ0FDcEMsWUFBVSxDQUNWLEVBQ0ksZ0JBQWUsQ0FBRyx5QkFBdUIsQ0FDN0MsQ0FDSixDQUFDO0VBQ0w7QUFBQSxBQUNKLENBQUM7QUFFRCxJQUFJLFNBQVMsWUFBWSxFQUFJLFVBQVUsTUFBSyxDQUFHLENBQUEsS0FBSSxDQUFHLENBQUEsV0FBVSxDQUNoRTtBQUdJLEFBQUksSUFBQSxDQUFBLGdCQUFlLEVBQUksRUFDbkIsS0FBSSxNQUFNLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxLQUFJLE1BQU0sQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLEtBQUksTUFBTSxDQUFFLENBQUEsQ0FBQyxDQUM3QyxDQUFBLEtBQUksVUFBVSxNQUFNLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxLQUFJLFVBQVUsTUFBTSxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsS0FBSSxVQUFVLE1BQU0sQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLEtBQUksVUFBVSxNQUFNLENBQUUsQ0FBQSxDQUFDLENBQ3JHLENBQUEsS0FBSSxVQUFVLENBQ2xCLENBQUM7QUFFRCxXQUFTLG9CQUFvQixBQUFDLENBQzFCLE1BQUssQ0FDTCxDQUFBLEtBQUksS0FBSyxFQUFJLEVBQUEsQ0FDYixDQUFBLEtBQUksS0FBSyxFQUFJLEVBQUEsQ0FDYixDQUFBLEtBQUksRUFBRSxDQUNOLFlBQVUsQ0FDVjtBQUNJLFVBQU0sQ0FBRyxLQUFHO0FBQ1osWUFBUSxDQUFHLE1BQUk7QUFDZixtQkFBZSxDQUFHLGlCQUFlO0FBQUEsRUFDckMsQ0FDSixDQUFDO0FBQ0wsQ0FBQztBQUtELElBQUksT0FBTyxFQUFJLENBQUEsTUFBSyxPQUFPLEFBQUMsQ0FBQyxVQUFTLENBQUMsQ0FBQztBQUN4QyxJQUFJLE9BQU8sS0FBSyxFQUFJLFNBQU8sQ0FBQztBQUU1QixJQUFJLE9BQU8sa0JBQWtCLEVBQUksZUFBYSxDQUFDO0FBQy9DLElBQUksT0FBTyxvQkFBb0IsRUFBSSxpQkFBZSxDQUFDO0FBRW5ELElBQUksT0FBTyxRQUFRLEVBQUksRUFDbkIscUJBQW9CLENBQUcsS0FBRyxDQUM5QixDQUFDO0FBRUQsSUFBSSxPQUFPLFVBQVUsRUFBSSxLQUFHLENBQUM7QUFFN0IsSUFBSSxPQUFPLE1BQU0sRUFBSSxVQUFTLEFBQUMsQ0FBRTtBQUM3QixLQUFHLGNBQWMsRUFBSSxJQUFJLGVBQWEsQUFBQyxDQUFDLElBQUcsR0FBRyxDQUFHLEVBQzdDO0FBQUUsT0FBRyxDQUFHLGFBQVc7QUFBRyxPQUFHLENBQUcsRUFBQTtBQUFHLE9BQUcsQ0FBRyxDQUFBLElBQUcsR0FBRyxNQUFNO0FBQUcsYUFBUyxDQUFHLE1BQUk7QUFBQSxFQUFFLENBQ3RFO0FBQUUsT0FBRyxDQUFHLGFBQVc7QUFBRyxPQUFHLENBQUcsRUFBQTtBQUFHLE9BQUcsQ0FBRyxDQUFBLElBQUcsR0FBRyxNQUFNO0FBQUcsYUFBUyxDQUFHLE1BQUk7QUFBQSxFQUFFLENBQ3RFO0FBQUUsT0FBRyxDQUFHLFVBQVE7QUFBRyxPQUFHLENBQUcsRUFBQTtBQUFHLE9BQUcsQ0FBRyxDQUFBLElBQUcsR0FBRyxNQUFNO0FBQUcsYUFBUyxDQUFHLE1BQUk7QUFBQSxFQUFFLENBQ25FO0FBQUUsT0FBRyxDQUFHLG9CQUFrQjtBQUFHLE9BQUcsQ0FBRyxFQUFBO0FBQUcsT0FBRyxDQUFHLENBQUEsSUFBRyxHQUFHLE1BQU07QUFBRyxhQUFTLENBQUcsTUFBSTtBQUFBLEVBQUUsQ0FDN0U7QUFBRSxPQUFHLENBQUcsVUFBUTtBQUFHLE9BQUcsQ0FBRyxFQUFBO0FBQUcsT0FBRyxDQUFHLENBQUEsSUFBRyxHQUFHLE1BQU07QUFBRyxhQUFTLENBQUcsTUFBSTtBQUFBLEVBQUUsQ0FDdkUsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUVELElBQUksT0FBTyxZQUFZLEVBQUksVUFBVSxNQUFLLENBQUcsQ0FBQSxLQUFJLENBQUcsQ0FBQSxXQUFVLENBQzlEO0FBR0ksQUFBSSxJQUFBLENBQUEsZ0JBQWUsRUFBSSxFQUNuQixLQUFJLE1BQU0sQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLEtBQUksTUFBTSxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsS0FBSSxNQUFNLENBQUUsQ0FBQSxDQUFDLENBQzdDLENBQUEsS0FBSSxVQUFVLE1BQU0sQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLEtBQUksVUFBVSxNQUFNLENBQUUsQ0FBQSxDQUFDLENBQUcsQ0FBQSxLQUFJLFVBQVUsTUFBTSxDQUFFLENBQUEsQ0FBQyxDQUFHLENBQUEsS0FBSSxVQUFVLE1BQU0sQ0FBRSxDQUFBLENBQUMsQ0FDckcsQ0FBQSxLQUFJLFVBQVUsQ0FDbEIsQ0FBQztBQUVELFdBQVMsb0JBQW9CLEFBQUMsQ0FDMUIsTUFBSyxDQUNMLENBQUEsS0FBSSxLQUFLLEVBQUksRUFBQSxDQUNiLENBQUEsS0FBSSxLQUFLLEVBQUksRUFBQSxDQUNiLENBQUEsS0FBSSxFQUFFLENBQ04sWUFBVSxDQUNWO0FBQ0ksVUFBTSxDQUFHLE1BQUk7QUFDYixZQUFRLENBQUcsS0FBRztBQUNkLG1CQUFlLENBQUcsaUJBQWU7QUFBQSxFQUNyQyxDQUNKLENBQUM7QUFDTCxDQUFDO0FBRUQsR0FBSSxNQUFLLElBQU0sVUFBUSxDQUFHO0FBQ3RCLE9BQUssUUFBUSxFQUFJO0FBQ2IsY0FBVSxDQUFHLFlBQVU7QUFDdkIsUUFBSSxDQUFHLE1BQUk7QUFBQSxFQUNmLENBQUM7QUFDTDtBQUFBOzs7QUM3WkE7QUFBQSxBQUFJLEVBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxTQUFRLENBQUMsQ0FBQztBQUMzQixBQUFJLEVBQUEsQ0FBQSxTQUFRLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxpQkFBZ0IsQ0FBQyxDQUFDO0FBQzFDLEFBQUksRUFBQSxDQUFBLEtBQUksRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLGFBQVksQ0FBQyxDQUFDO0FBQ2xDLEFBQUksRUFBQSxDQUFBLEtBQUksRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLGFBQVksQ0FBQyxDQUFDO0FBRWxDLFFBQVEsR0FBRyxFQUFJLEVBQUEsQ0FBQztBQUNoQixRQUFRLFNBQVMsRUFBSSxHQUFDLENBQUM7QUFFdkIsT0FBUyxVQUFRLENBQUcsRUFBQyxDQUFHLENBQUEsYUFBWSxDQUFHLENBQUEsZUFBYyxDQUFHLENBQUEsT0FBTSxDQUM5RDtBQUNJLFFBQU0sRUFBSSxDQUFBLE9BQU0sR0FBSyxHQUFDLENBQUM7QUFFdkIsS0FBRyxHQUFHLEVBQUksR0FBQyxDQUFDO0FBQ1osS0FBRyxRQUFRLEVBQUksS0FBRyxDQUFDO0FBQ25CLEtBQUcsU0FBUyxFQUFJLE1BQUksQ0FBQztBQUNyQixLQUFHLFFBQVEsRUFBSSxDQUFBLE9BQU0sUUFBUSxHQUFLLEdBQUMsQ0FBQztBQUNwQyxLQUFHLFdBQVcsRUFBSSxDQUFBLE9BQU0sV0FBVyxDQUFDO0FBQ3BDLEtBQUcsU0FBUyxFQUFJLEdBQUMsQ0FBQztBQUNsQixLQUFHLFFBQVEsRUFBSSxHQUFDLENBQUM7QUFFakIsS0FBRyxjQUFjLEVBQUksY0FBWSxDQUFDO0FBQ2xDLEtBQUcsZ0JBQWdCLEVBQUksZ0JBQWMsQ0FBQztBQUV0QyxLQUFHLEdBQUcsRUFBSSxDQUFBLFNBQVEsR0FBRyxFQUFFLENBQUM7QUFDeEIsVUFBUSxTQUFTLENBQUUsSUFBRyxHQUFHLENBQUMsRUFBSSxLQUFHLENBQUM7QUFDbEMsS0FBRyxLQUFLLEVBQUksQ0FBQSxPQUFNLEtBQUssQ0FBQztBQUV4QixLQUFHLFFBQVEsQUFBQyxDQUFDLE9BQU0sU0FBUyxDQUFDLENBQUM7QUFDbEM7QUFBQSxBQUFDO0FBR0QsUUFBUSxVQUFVLElBQUksRUFBSSxVQUFTLEFBQUMsQ0FDcEM7QUFDSSxLQUFJLENBQUMsSUFBRyxTQUFTLENBQUc7QUFDaEIsVUFBTTtFQUNWO0FBQUEsQUFFQSxLQUFJLFNBQVEsUUFBUSxHQUFLLEtBQUcsQ0FBRztBQUMzQixPQUFHLEdBQUcsV0FBVyxBQUFDLENBQUMsSUFBRyxRQUFRLENBQUMsQ0FBQztFQUNwQztBQUFBLEFBQ0EsVUFBUSxRQUFRLEVBQUksS0FBRyxDQUFDO0FBQzVCLENBQUM7QUFDRCxRQUFRLFFBQVEsRUFBSSxLQUFHLENBQUM7QUFHeEIsUUFBUSxRQUFRLEVBQUksR0FBQyxDQUFDO0FBRXRCLFFBQVEsVUFBVSxRQUFRLEVBQUksVUFBVSxRQUFPOztBQUUzQyxBQUFJLElBQUEsQ0FBQSxLQUFJLEVBQUksQ0FBQSxLQUFJLEFBQUMsRUFBQyxDQUFDO0FBR25CLEtBQUcsdUJBQXVCLEVBQUksQ0FBQSxJQUFHLGNBQWMsQ0FBQztBQUNoRCxLQUFHLHlCQUF5QixFQUFJLENBQUEsSUFBRyxnQkFBZ0IsQ0FBQztBQUdwRCxBQUFJLElBQUEsQ0FBQSxPQUFNLEVBQUksQ0FBQSxJQUFHLGdCQUFnQixBQUFDLEVBQUMsQ0FBQztBQWFwQyxBQUFJLElBQUEsQ0FBQSxNQUFLLENBQUM7QUFDVixBQUFJLElBQUEsQ0FBQSxpQkFBZ0IsRUFBSSxHQUFDLENBQUM7QUFDMUIsS0FBSSxJQUFHLFdBQVcsR0FBSyxLQUFHLENBQUc7QUFFekIsUUFBUyxHQUFBLENBQUEsR0FBRSxDQUFBLEVBQUssQ0FBQSxJQUFHLFdBQVcsQ0FBRztBQUM3QixBQUFJLFFBQUEsQ0FBQSxTQUFRLEVBQUksQ0FBQSxJQUFHLFdBQVcsQ0FBRSxHQUFFLENBQUMsQ0FBQztBQUNwQyxTQUFJLFNBQVEsR0FBSyxLQUFHLENBQUc7QUFDbkIsZ0JBQVE7TUFDWjtBQUFBLEFBR0EsU0FBSSxNQUFPLFVBQVEsQ0FBQSxFQUFLLFNBQU8sQ0FBQSxFQUFLLEVBQUMsTUFBTyxVQUFRLENBQUEsRUFBSyxTQUFPLENBQUEsRUFBSyxDQUFBLFNBQVEsT0FBTyxHQUFLLEtBQUcsQ0FBQyxDQUFHO0FBQzVGLGdCQUFRLEVBQUksRUFBQyxTQUFRLENBQUMsQ0FBQztNQUMzQjtBQUFBLEFBR0ksUUFBQSxDQUFBLE1BQUssRUFBSSxJQUFJLE9BQUssQUFBQyxDQUFDLDhCQUE2QixFQUFJLElBQUUsQ0FBQSxDQUFJLFFBQU0sQ0FBRyxJQUFFLENBQUMsQ0FBQztBQUM1RSxBQUFJLFFBQUEsQ0FBQSxhQUFZLEVBQUksQ0FBQSxJQUFHLHVCQUF1QixNQUFNLEFBQUMsQ0FBQyxNQUFLLENBQUMsQ0FBQztBQUM3RCxBQUFJLFFBQUEsQ0FBQSxlQUFjLEVBQUksQ0FBQSxJQUFHLHlCQUF5QixNQUFNLEFBQUMsQ0FBQyxNQUFLLENBQUMsQ0FBQztBQUdqRSxTQUFJLGFBQVksR0FBSyxLQUFHLENBQUEsRUFBSyxDQUFBLGVBQWMsR0FBSyxLQUFHLENBQUc7QUFDbEQsZ0JBQVE7TUFDWjtBQUFBLEFBR0Esc0JBQWdCLENBQUUsR0FBRSxDQUFDLEVBQUksR0FBQyxDQUFDO0FBQzNCLHNCQUFnQixDQUFFLEdBQUUsQ0FBQyxPQUFPLEVBQUksSUFBSSxPQUFLLEFBQUMsQ0FBQyxNQUFLLENBQUMsQ0FBQztBQUNsRCxzQkFBZ0IsQ0FBRSxHQUFFLENBQUMsY0FBYyxFQUFJLEVBQUMsYUFBWSxHQUFLLEtBQUcsQ0FBQyxDQUFDO0FBQzlELHNCQUFnQixDQUFFLEdBQUUsQ0FBQyxnQkFBZ0IsRUFBSSxFQUFDLGVBQWMsR0FBSyxLQUFHLENBQUMsQ0FBQztBQUNsRSxzQkFBZ0IsQ0FBRSxHQUFFLENBQUMsS0FBSyxFQUFJLEdBQUMsQ0FBQztBQUdoQyxVQUFTLEdBQUEsQ0FBQSxDQUFBLEVBQUUsRUFBQSxDQUFHLENBQUEsQ0FBQSxFQUFJLENBQUEsU0FBUSxPQUFPLENBQUcsQ0FBQSxDQUFBLEVBQUUsQ0FBRztBQUNyQyxZQUFJLE1BQU0sQUFBQyxDQUFDLFNBQVEsY0FBYyxDQUFHLGtCQUFnQixDQUFHLENBQUEsU0FBUSxDQUFFLENBQUEsQ0FBQyxDQUFHLElBQUUsQ0FBRyxFQUFBLENBQUMsQ0FBQztNQUNqRjtBQUFBLEFBR0EsWUFBTSxDQUFFLG9CQUFtQixFQUFJLENBQUEsR0FBRSxRQUFRLEFBQUMsQ0FBQyxHQUFFLENBQUcsSUFBRSxDQUFDLFlBQVksQUFBQyxFQUFDLENBQUMsRUFBSSxLQUFHLENBQUM7SUFDOUU7QUFBQSxFQUNKO0FBQUEsQUFHQSxNQUFJLE1BQU0sQUFBQyxFQUFDLFNBQUEsS0FBSSxDQUFLO0FBQ2pCLE9BQUksS0FBSSxDQUFHO0FBQ1AsWUFBTSxJQUFJLEFBQUMsQ0FBQyw0QkFBMkIsRUFBSSxNQUFJLENBQUMsQ0FBQztBQUNqRCxZQUFNO0lBQ1Y7QUFBQSxBQUdBLFFBQVMsR0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFLLGtCQUFnQixDQUFHO0FBRTdCLEFBQUksUUFBQSxDQUFBLGVBQWMsRUFBSSxHQUFDLENBQUM7QUFDeEIsVUFBUyxHQUFBLENBQUEsQ0FBQSxFQUFFLEVBQUEsQ0FBRyxDQUFBLENBQUEsRUFBSSxDQUFBLGlCQUFnQixDQUFFLENBQUEsQ0FBQyxLQUFLLE9BQU8sQ0FBRyxDQUFBLENBQUEsRUFBRSxDQUFHO0FBQ3JELHNCQUFjLEdBQUssQ0FBQSxpQkFBZ0IsQ0FBRSxDQUFBLENBQUMsS0FBSyxDQUFFLENBQUEsQ0FBQyxFQUFJLEtBQUcsQ0FBQztNQUMxRDtBQUFBLEFBR0EsU0FBSSxpQkFBZ0IsQ0FBRSxDQUFBLENBQUMsY0FBYyxHQUFLLEtBQUcsQ0FBRztBQUM1QyxrQ0FBMEIsRUFBSSxDQUFBLDJCQUEwQixRQUFRLEFBQUMsQ0FBQyxpQkFBZ0IsQ0FBRSxDQUFBLENBQUMsT0FBTyxDQUFHLGdCQUFjLENBQUMsQ0FBQztNQUNuSDtBQUFBLEFBQ0EsU0FBSSxpQkFBZ0IsQ0FBRSxDQUFBLENBQUMsZ0JBQWdCLEdBQUssS0FBRyxDQUFHO0FBQzlDLG9DQUE0QixFQUFJLENBQUEsNkJBQTRCLFFBQVEsQUFBQyxDQUFDLGlCQUFnQixDQUFFLENBQUEsQ0FBQyxPQUFPLENBQUcsZ0JBQWMsQ0FBQyxDQUFDO01BQ3ZIO0FBQUEsSUFDSjtBQUFBLEFBR0ksTUFBQSxDQUFBLE1BQUssRUFBSSxJQUFJLE9BQUssQUFBQyxDQUFDLHVDQUFzQyxDQUFHLEtBQUcsQ0FBQyxDQUFDO0FBQ3RFLDhCQUEwQixFQUFJLENBQUEsMkJBQTBCLFFBQVEsQUFBQyxDQUFDLE1BQUssQ0FBRyxHQUFDLENBQUMsQ0FBQztBQUM3RSxnQ0FBNEIsRUFBSSxDQUFBLDZCQUE0QixRQUFRLEFBQUMsQ0FBQyxNQUFLLENBQUcsR0FBQyxDQUFDLENBQUM7QUFJakYsQUFBSSxNQUFBLENBQUEsVUFBUyxFQUFJLENBQUEsU0FBUSxrQkFBa0IsQUFBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDO0FBQ3JELDhCQUEwQixFQUFJLENBQUEsVUFBUyxFQUFJLDRCQUEwQixDQUFDO0FBQ3RFLGdDQUE0QixFQUFJLENBQUEsVUFBUyxFQUFJLDhCQUE0QixDQUFDO0FBRzFFLEFBQUksTUFBQSxDQUFBLElBQUcsRUFBSSxFQUFDLFNBQVEsRUFBSSxFQUFDLFNBQVEsRUFBSSxTQUFPLENBQUEsQ0FBSSxRQUFNLENBQUMsRUFBSSxFQUFDLEtBQUksRUFBSSxRQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzdFLDhCQUEwQixFQUFJLENBQUEsY0FBYSxFQUFJLEtBQUcsQ0FBQSxDQUFJLEtBQUcsQ0FBQSxDQUFJLDRCQUEwQixDQUFDO0FBQ3hGLGdDQUE0QixFQUFJLENBQUEsY0FBYSxFQUFJLEtBQUcsQ0FBQSxDQUFJLEtBQUcsQ0FBQSxDQUFJLDhCQUE0QixDQUFDO0FBRzVGLE1BQUk7QUFDQSxpQkFBVyxFQUFJLENBQUEsRUFBQyxjQUFjLEFBQUMsQ0FBQyxPQUFNLENBQUcsYUFBVyxDQUFHLDRCQUEwQixDQUFHLDhCQUE0QixDQUFDLENBQUM7QUFFbEgsa0JBQVksRUFBSSxLQUFHLENBQUM7SUFDeEIsQ0FDQSxPQUFPLENBQUEsQ0FBRztBQUNOLGlCQUFXLEVBQUksS0FBRyxDQUFDO0FBQ25CLGtCQUFZLEVBQUksTUFBSSxDQUFDO0lBQ3pCO0FBQUEsQUFFQSxXQUFPLEFBQUMsRUFBQyxDQUFDO0FBQ1YsdUJBQW1CLEFBQUMsRUFBQyxDQUFDO0FBQ3RCLHlCQUFxQixBQUFDLEVBQUMsQ0FBQztBQUd4QixPQUFJLE1BQU8sU0FBTyxDQUFBLEVBQUssV0FBUyxDQUFHO0FBQy9CLGFBQU8sQUFBQyxFQUFDLENBQUM7SUFDZDtBQUFBLEVBQ0osRUFBQyxDQUFDO0FBQ04sQ0FBQztBQUlELFFBQVEsY0FBYyxFQUFJLFVBQVUsVUFBUyxDQUFHLENBQUEsS0FBSSxDQUFHLENBQUEsR0FBRSxDQUFHLENBQUEsS0FBSSxDQUFHLENBQUEsUUFBTyxDQUFHO0FBRXpFLEFBQUksSUFBQSxDQUFBLElBQUc7QUFBRyxVQUFJO0FBQUcsV0FBSyxDQUFDO0FBR3ZCLEtBQUksTUFBTyxNQUFJLENBQUEsRUFBSyxTQUFPLENBQUc7QUFDMUIsYUFBUyxDQUFFLEdBQUUsQ0FBQyxLQUFLLENBQUUsS0FBSSxDQUFDLEVBQUksTUFBSSxDQUFDO0FBQ25DLFdBQU8sQUFBQyxFQUFDLENBQUM7RUFDZCxLQUVLLEtBQUksTUFBTyxNQUFJLENBQUEsRUFBSyxTQUFPLENBQUEsRUFBSyxDQUFBLEtBQUksSUFBSSxDQUFHO0FBQzVDLEFBQUksTUFBQSxDQUFBLEdBQUUsRUFBSSxJQUFJLGVBQWEsQUFBQyxFQUFDLENBQUM7QUFFOUIsTUFBRSxPQUFPLEVBQUksVUFBUyxBQUFDLENBQUU7QUFDckIsV0FBSyxFQUFJLENBQUEsR0FBRSxTQUFTLENBQUM7QUFDckIsZUFBUyxDQUFFLEdBQUUsQ0FBQyxLQUFLLENBQUUsS0FBSSxDQUFDLEVBQUksT0FBSyxDQUFDO0FBQ3BDLGFBQU8sQUFBQyxFQUFDLENBQUM7SUFDZCxDQUFDO0FBQ0QsTUFBRSxLQUFLLEFBQUMsQ0FBQyxLQUFJLENBQUcsQ0FBQSxLQUFJLFdBQVcsQUFBQyxDQUFDLEtBQUksSUFBSSxDQUFDLENBQUEsQ0FBSSxJQUFFLENBQUEsQ0FBSSxFQUFDLENBQUMsR0FBSSxLQUFHLEFBQUMsRUFBQyxDQUFDLENBQUcsS0FBRyxDQUFrQixDQUFDO0FBQ3pGLE1BQUUsYUFBYSxFQUFJLE9BQUssQ0FBQztBQUN6QixNQUFFLEtBQUssQUFBQyxFQUFDLENBQUM7RUFDZDtBQUFBLEFBQ0osQ0FBQztBQUdELFFBQVEsVUFBVSxnQkFBZ0IsRUFBSSxVQUFTLEFBQUMsQ0FBRTtBQUM5QyxBQUFJLElBQUEsQ0FBQSxPQUFNLEVBQUksR0FBQyxDQUFDO0FBQ2hCLE1BQVMsR0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFLLENBQUEsU0FBUSxRQUFRLENBQUc7QUFDN0IsVUFBTSxDQUFFLENBQUEsQ0FBQyxFQUFJLENBQUEsU0FBUSxRQUFRLENBQUUsQ0FBQSxDQUFDLENBQUM7RUFDckM7QUFBQSxBQUNBLE1BQVMsR0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFLLENBQUEsSUFBRyxRQUFRLENBQUc7QUFDeEIsVUFBTSxDQUFFLENBQUEsQ0FBQyxFQUFJLENBQUEsSUFBRyxRQUFRLENBQUUsQ0FBQSxDQUFDLENBQUM7RUFDaEM7QUFBQSxBQUNBLE9BQU8sUUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFHRCxRQUFRLGtCQUFrQixFQUFJLFVBQVUsT0FBTSxDQUFHO0FBQzdDLEFBQUksSUFBQSxDQUFBLFVBQVMsRUFBSSxHQUFDLENBQUM7QUFDbkIsTUFBUyxHQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUssUUFBTSxDQUFHO0FBQ25CLE9BQUksT0FBTSxDQUFFLENBQUEsQ0FBQyxHQUFLLE1BQUksQ0FBRztBQUNyQixjQUFRO0lBQ1osS0FDSyxLQUFJLE1BQU8sUUFBTSxDQUFFLENBQUEsQ0FBQyxDQUFBLEVBQUssVUFBUSxDQUFBLEVBQUssQ0FBQSxPQUFNLENBQUUsQ0FBQSxDQUFDLEdBQUssS0FBRyxDQUFHO0FBQzNELGVBQVMsR0FBSyxDQUFBLFVBQVMsRUFBSSxFQUFBLENBQUEsQ0FBSSxLQUFHLENBQUM7SUFDdkMsS0FDSyxLQUFJLE1BQU8sUUFBTSxDQUFFLENBQUEsQ0FBQyxDQUFBLEVBQUssU0FBTyxDQUFBLEVBQUssQ0FBQSxJQUFHLE1BQU0sQUFBQyxDQUFDLE9BQU0sQ0FBRSxDQUFBLENBQUMsQ0FBQyxDQUFBLEVBQUssQ0FBQSxPQUFNLENBQUUsQ0FBQSxDQUFDLENBQUc7QUFDNUUsZUFBUyxHQUFLLENBQUEsVUFBUyxFQUFJLEVBQUEsQ0FBQSxDQUFJLElBQUUsQ0FBQSxDQUFJLENBQUEsT0FBTSxDQUFFLENBQUEsQ0FBQyxRQUFRLEFBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFJLEtBQUcsQ0FBQztJQUNyRSxLQUNLO0FBQ0QsZUFBUyxHQUFLLENBQUEsVUFBUyxFQUFJLEVBQUEsQ0FBQSxDQUFJLElBQUUsQ0FBQSxDQUFJLENBQUEsT0FBTSxDQUFFLENBQUEsQ0FBQyxDQUFBLENBQUksS0FBRyxDQUFDO0lBQzFEO0FBQUEsRUFDSjtBQUFBLEFBQ0EsT0FBTyxXQUFTLENBQUM7QUFDckIsQ0FBQztBQUdELFFBQVEsVUFBVSxZQUFZLEVBQUksVUFBVSxRQUFPLENBQ25EO0FBRUksQUFBSSxJQUFBLENBQUEsWUFBVyxFQUFJLEVBQUEsQ0FBQztBQUVwQixNQUFTLEdBQUEsQ0FBQSxDQUFBLENBQUEsRUFBSyxTQUFPLENBQUc7QUFDcEIsQUFBSSxNQUFBLENBQUEsT0FBTSxFQUFJLENBQUEsUUFBTyxDQUFFLENBQUEsQ0FBQyxDQUFDO0FBR3pCLE9BQUksTUFBTyxRQUFNLENBQUEsRUFBSyxTQUFPLENBQUc7QUFDNUIsU0FBRyxRQUFRLEFBQUMsQ0FBQyxJQUFHLENBQUcsRUFBQSxDQUFHLFFBQU0sQ0FBQyxDQUFDO0lBQ2xDLEtBRUssS0FBSSxNQUFPLFFBQU0sQ0FBQSxFQUFLLFNBQU8sQ0FBRztBQUVqQyxTQUFJLE9BQU0sT0FBTyxHQUFLLEVBQUEsQ0FBQSxFQUFLLENBQUEsT0FBTSxPQUFPLEdBQUssRUFBQSxDQUFHO0FBQzVDLFdBQUcsUUFBUSxBQUFDLENBQUMsT0FBTSxPQUFPLEVBQUksS0FBRyxDQUFHLEVBQUEsQ0FBRyxRQUFNLENBQUMsQ0FBQztNQUNuRCxLQUVLLEtBQUksT0FBTSxPQUFPLEVBQUksRUFBQSxDQUFHO0FBQ3pCLFdBQUcsUUFBUSxBQUFDLENBQUMsS0FBSSxDQUFHLENBQUEsQ0FBQSxFQUFJLE1BQUksQ0FBRyxRQUFNLENBQUMsQ0FBQztNQUMzQztBQUFBLElBRUosS0FFSyxLQUFJLE1BQU8sS0FBRyxRQUFRLFNBQVMsQ0FBRSxDQUFBLENBQUMsQ0FBQSxFQUFLLFVBQVEsQ0FBRztBQUNuRCxTQUFHLFFBQVEsQUFBQyxDQUFDLElBQUcsQ0FBRyxFQUFBLENBQUcsUUFBTSxDQUFDLENBQUM7SUFDbEMsS0FFSyxLQUFJLE1BQU8sUUFBTSxDQUFBLEVBQUssU0FBTyxDQUFHO0FBQ2pDLEFBQUksUUFBQSxDQUFBLE9BQU0sRUFBSSxDQUFBLFNBQVEsU0FBUyxDQUFFLE9BQU0sQ0FBQyxDQUFDO0FBQ3pDLFNBQUksT0FBTSxHQUFLLEtBQUcsQ0FBRztBQUNqQixjQUFNLEVBQUksSUFBSSxVQUFRLEFBQUMsQ0FBQyxJQUFHLEdBQUcsQ0FBRyxRQUFNLENBQUMsQ0FBQztBQUN6QyxjQUFNLEtBQUssQUFBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDO01BQ3pCO0FBQUEsQUFFQSxZQUFNLEtBQUssQUFBQyxDQUFDLFlBQVcsQ0FBQyxDQUFDO0FBQzFCLFNBQUcsUUFBUSxBQUFDLENBQUMsSUFBRyxDQUFHLEVBQUEsQ0FBRyxhQUFXLENBQUMsQ0FBQztBQUNuQyxpQkFBVyxFQUFFLENBQUM7SUFDbEI7QUFBQSxFQUVKO0FBQUEsQUFDSixDQUFDO0FBSUQsUUFBUSxVQUFVLFFBQVEsRUFBSSxVQUFVLE1BQUssQ0FBRyxDQUFBLElBQUcsQ0FDbkQ7QUFDSSxLQUFJLENBQUMsSUFBRyxTQUFTLENBQUc7QUFDaEIsVUFBTTtFQUNWO0FBQUEsQUFFSSxJQUFBLENBQUEsT0FBTSxFQUFJLEVBQUMsSUFBRyxTQUFTLENBQUUsSUFBRyxDQUFDLEVBQUksQ0FBQSxJQUFHLFNBQVMsQ0FBRSxJQUFHLENBQUMsR0FBSyxHQUFDLENBQUMsQ0FBQztBQUMvRCxRQUFNLEtBQUssRUFBSSxLQUFHLENBQUM7QUFDbkIsUUFBTSxTQUFTLEVBQUksQ0FBQSxPQUFNLFNBQVMsR0FBSyxDQUFBLElBQUcsR0FBRyxtQkFBbUIsQUFBQyxDQUFDLElBQUcsUUFBUSxDQUFHLEtBQUcsQ0FBQyxDQUFDO0FBQ3JGLFFBQU0sT0FBTyxFQUFJLENBQUEsU0FBUSxFQUFJLE9BQUssQ0FBQztBQUNuQyxRQUFNLE9BQU8sRUFBSSxDQUFBLEtBQUksVUFBVSxNQUFNLEtBQUssQUFBQyxDQUFDLFNBQVEsQ0FBRyxFQUFBLENBQUMsQ0FBQztBQUN6RCxLQUFHLGNBQWMsQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFHRCxRQUFRLFVBQVUsY0FBYyxFQUFJLFVBQVUsSUFBRyxDQUNqRDtBQUNJLEtBQUksQ0FBQyxJQUFHLFNBQVMsQ0FBRztBQUNoQixVQUFNO0VBQ1Y7QUFBQSxBQUVJLElBQUEsQ0FBQSxPQUFNLEVBQUksQ0FBQSxJQUFHLFNBQVMsQ0FBRSxJQUFHLENBQUMsQ0FBQztBQUNqQyxLQUFJLE9BQU0sR0FBSyxLQUFHLENBQUEsRUFBSyxDQUFBLE9BQU0sU0FBUyxHQUFLLEtBQUcsQ0FBRztBQUM3QyxVQUFNO0VBQ1Y7QUFBQSxBQUVBLEtBQUcsSUFBSSxBQUFDLEVBQUMsQ0FBQztBQUNWLEtBQUcsR0FBRyxDQUFFLE9BQU0sT0FBTyxDQUFDLE1BQU0sQUFBQyxDQUFDLElBQUcsR0FBRyxDQUFHLENBQUEsQ0FBQyxPQUFNLFNBQVMsQ0FBQyxPQUFPLEFBQUMsQ0FBQyxPQUFNLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDckYsQ0FBQztBQUdELFFBQVEsVUFBVSxnQkFBZ0IsRUFBSSxVQUFTLEFBQUMsQ0FDaEQ7QUFDSSxLQUFJLENBQUMsSUFBRyxTQUFTLENBQUc7QUFDaEIsVUFBTTtFQUNWO0FBQUEsQUFFQSxNQUFTLEdBQUEsQ0FBQSxDQUFBLENBQUEsRUFBSyxDQUFBLElBQUcsU0FBUyxDQUFHO0FBQ3pCLE9BQUcsU0FBUyxDQUFFLENBQUEsQ0FBQyxTQUFTLEVBQUksQ0FBQSxJQUFHLEdBQUcsbUJBQW1CLEFBQUMsQ0FBQyxJQUFHLFFBQVEsQ0FBRyxFQUFBLENBQUMsQ0FBQztBQUN2RSxPQUFHLGNBQWMsQUFBQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0VBQ3pCO0FBQUEsQUFDSixDQUFDO0FBRUQsUUFBUSxVQUFVLGtCQUFrQixFQUFJLFVBQVMsQUFBQyxDQUNsRDtBQU1JLEtBQUcsUUFBUSxFQUFJLEdBQUMsQ0FBQztBQUNyQixDQUFDO0FBR0QsUUFBUSxVQUFVLFVBQVUsRUFBSSxVQUFVLElBQUcsQ0FDN0M7QUFDSSxLQUFJLENBQUMsSUFBRyxTQUFTLENBQUc7QUFDaEIsVUFBTTtFQUNWO0FBQUEsQUFFSSxJQUFBLENBQUEsTUFBSyxFQUFJLEVBQUMsSUFBRyxRQUFRLENBQUUsSUFBRyxDQUFDLEVBQUksQ0FBQSxJQUFHLFFBQVEsQ0FBRSxJQUFHLENBQUMsR0FBSyxHQUFDLENBQUMsQ0FBQztBQUM1RCxLQUFJLE1BQUssU0FBUyxHQUFLLEtBQUcsQ0FBRztBQUN6QixTQUFPLE9BQUssQ0FBQztFQUNqQjtBQUFBLEFBRUEsT0FBSyxLQUFLLEVBQUksS0FBRyxDQUFDO0FBQ2xCLE9BQUssU0FBUyxFQUFJLENBQUEsSUFBRyxHQUFHLGtCQUFrQixBQUFDLENBQUMsSUFBRyxRQUFRLENBQUcsS0FBRyxDQUFDLENBQUM7QUFNL0QsT0FBTyxPQUFLLENBQUM7QUFDakIsQ0FBQztBQUVELEdBQUksTUFBSyxJQUFNLFVBQVEsQ0FBRztBQUN0QixPQUFLLFFBQVEsRUFBSSxVQUFRLENBQUM7QUFDOUI7QUFBQTs7O0FDcldBO0FBQUEsQUFBSSxFQUFBLENBQUEsY0FBYSxFQUFJLEdBQUMsQ0FBQztBQUV2QixhQUFhLENBQUUsZ0JBQWUsQ0FBQyxFQUMvQixDQUFBLElBQUcsRUFDSCxzQkFBb0IsQ0FBQSxDQUNwQixLQUFHLENBQUEsQ0FDSCwrQkFBNkIsQ0FBQSxDQUM3QiwwQkFBd0IsQ0FBQSxDQUN4Qiw2QkFBMkIsQ0FBQSxDQUMzQixzQkFBb0IsQ0FBQSxDQUNwQiw0QkFBMEIsQ0FBQSxDQUMxQixnQ0FBOEIsQ0FBQSxDQUM5QixzQ0FBb0MsQ0FBQSxDQUNwQyxxQkFBbUIsQ0FBQSxDQUNuQixpQkFBZSxDQUFBLENBQ2YsUUFBTSxDQUFBLENBQ04sc0RBQW9ELENBQUEsQ0FDcEQsZ0NBQThCLENBQUEsQ0FDOUIsc0NBQW9DLENBQUEsQ0FDcEMsTUFBSSxDQUFBLENBQ0osR0FBQyxDQUFDO0FBRUYsYUFBYSxDQUFFLGNBQWEsQ0FBQyxFQUM3QixDQUFBLElBQUcsRUFDSCxzQkFBb0IsQ0FBQSxDQUNwQixLQUFHLENBQUEsQ0FDSCw4QkFBNEIsQ0FBQSxDQUM1QiwrQkFBNkIsQ0FBQSxDQUM3QixnQ0FBOEIsQ0FBQSxDQUM5QiwrQkFBNkIsQ0FBQSxDQUM3QiwrQkFBNkIsQ0FBQSxDQUM3Qiw0QkFBMEIsQ0FBQSxDQUMxQiw2QkFBMkIsQ0FBQSxDQUMzQiwwQkFBd0IsQ0FBQSxDQUN4Qiw2QkFBMkIsQ0FBQSxDQUMzQixtQ0FBaUMsQ0FBQSxDQUNqQyxLQUFHLENBQUEsQ0FDSCxzQ0FBb0MsQ0FBQSxDQUNwQyxvQ0FBa0MsQ0FBQSxDQUNsQyxXQUFTLENBQUEsQ0FDVCxLQUFHLENBQUEsQ0FDSCxvR0FBa0csQ0FBQSxDQUNsRywrREFBNkQsQ0FBQSxDQUM3RCxvREFBa0QsQ0FBQSxDQUNsRCxpREFBK0MsQ0FBQSxDQUMvQywrQ0FBNkMsQ0FBQSxDQUM3QyxnQkFBYyxDQUFBLENBQ2QsTUFBSSxDQUFBLENBQ0osNkJBQTJCLENBQUEsQ0FDM0IsS0FBRyxDQUFBLENBQ0gsa0JBQWdCLENBQUEsQ0FDaEIsT0FBSyxDQUFBLENBQ0wscUNBQW1DLENBQUEsQ0FDbkMsOENBQTRDLENBQUEsQ0FDNUMsZ0NBQThCLENBQUEsQ0FDOUIsZ0JBQWMsQ0FBQSxDQUNkLFFBQU0sQ0FBQSxDQUNOLDZDQUEyQyxDQUFBLENBQzNDLGFBQVcsQ0FBQSxDQUNYLHlFQUF1RSxDQUFBLENBQ3ZFLDhCQUE0QixDQUFBLENBQzVCLHlCQUF1QixDQUFBLENBQ3ZCLCtCQUE2QixDQUFBLENBQzdCLDRFQUEwRSxDQUFBLENBQzFFLDhCQUE0QixDQUFBLENBQzVCLE1BQUksQ0FBQSxDQUNKLEdBQUMsQ0FBQztBQUVGLGFBQWEsQ0FBRSxrQkFBaUIsQ0FBQyxFQUNqQyxDQUFBLElBQUcsRUFDSCxzQkFBb0IsQ0FBQSxDQUNwQixLQUFHLENBQUEsQ0FDSCwrQkFBNkIsQ0FBQSxDQUM3QiwyQkFBeUIsQ0FBQSxDQUN6QiwrQkFBNkIsQ0FBQSxDQUM3QixzQ0FBb0MsQ0FBQSxDQUNwQywwQkFBd0IsQ0FBQSxDQUN4Qiw4QkFBNEIsQ0FBQSxDQUM1QiwrQkFBNkIsQ0FBQSxDQUM3QixnQ0FBOEIsQ0FBQSxDQUM5QiwwQkFBd0IsQ0FBQSxDQUN4QiwyQkFBeUIsQ0FBQSxDQUN6QiwwQkFBd0IsQ0FBQSxDQUN4QixtQ0FBaUMsQ0FBQSxDQUNqQyxxQ0FBbUMsQ0FBQSxDQUNuQyxLQUFHLENBQUEsQ0FDSCx5R0FBdUcsQ0FBQSxDQUN2RyxtQ0FBaUMsQ0FBQSxDQUNqQyx3R0FBc0csQ0FBQSxDQUN0RyxNQUFJLENBQUEsQ0FDSixVQUFRLENBQUEsQ0FDUixLQUFHLENBQUEsQ0FDSCxtQ0FBaUMsQ0FBQSxDQUNqQywrQkFBNkIsQ0FBQSxDQUM3QixNQUFJLENBQUEsQ0FDSixXQUFTLENBQUEsQ0FDVCxLQUFHLENBQUEsQ0FDSCxzQ0FBb0MsQ0FBQSxDQUNwQyxLQUFHLENBQUEsQ0FDSCxpQ0FBK0IsQ0FBQSxDQUMvQixXQUFTLENBQUEsQ0FDVCxLQUFHLENBQUEsQ0FDSCxrQ0FBZ0MsQ0FBQSxDQUNoQyxLQUFHLENBQUEsQ0FDSCw2QkFBMkIsQ0FBQSxDQUMzQiwyQkFBeUIsQ0FBQSxDQUN6QixVQUFRLENBQUEsQ0FDUixLQUFHLENBQUEsQ0FDSCw2QkFBMkIsQ0FBQSxDQUMzQixXQUFTLENBQUEsQ0FDVCxLQUFHLENBQUEsQ0FDSCxxQ0FBbUMsQ0FBQSxDQUNuQyw2SEFBMkgsQ0FBQSxDQUMzSCxnRUFBOEQsQ0FBQSxDQUM5RCxnR0FBOEYsQ0FBQSxDQUM5RixvQkFBa0IsQ0FBQSxDQUNsQixNQUFJLENBQUEsQ0FDSixnSUFBOEgsQ0FBQSxDQUM5SCxnRUFBOEQsQ0FBQSxDQUM5RCwwQ0FBd0MsQ0FBQSxDQUN4Qyw4REFBNEQsQ0FBQSxDQUM1RCwrQkFBNkIsQ0FBQSxDQUM3QiwwQ0FBd0MsQ0FBQSxDQUN4QyxrREFBZ0QsQ0FBQSxDQUNoRCxlQUFhLENBQUEsQ0FDYixpQ0FBK0IsQ0FBQSxDQUMvQix1Q0FBcUMsQ0FBQSxDQUNyQywyQ0FBeUMsQ0FBQSxDQUN6Qyw0Q0FBMEMsQ0FBQSxDQUMxQyxvTEFBa0wsQ0FBQSxDQUNsTCxRQUFNLENBQUEsQ0FDTix1RkFBcUYsQ0FBQSxDQUNyRiw2REFBMkQsQ0FBQSxDQUMzRCxvQkFBa0IsQ0FBQSxDQUNsQixNQUFJLENBQUEsQ0FDSiw4RkFBNEYsQ0FBQSxDQUM1Rix3Q0FBc0MsQ0FBQSxDQUN0Qyw4REFBNEQsQ0FBQSxDQUM1RCxvQkFBa0IsQ0FBQSxDQUNsQixNQUFJLENBQUEsQ0FDSiwySUFBeUksQ0FBQSxDQUN6SSxPQUFLLENBQUEsQ0FDTCxrQ0FBZ0MsQ0FBQSxDQUNoQyx1RkFBcUYsQ0FBQSxDQUNyRiw2Q0FBMkMsQ0FBQSxDQUMzQywwRkFBd0YsQ0FBQSxDQUN4RixvQ0FBa0MsQ0FBQSxDQUNsQyxtRkFBaUYsQ0FBQSxDQUNqRix3Q0FBc0MsQ0FBQSxDQUN0Qyw2RUFBMkUsQ0FBQSxDQUMzRSxZQUFVLENBQUEsQ0FDVixxQkFBbUIsQ0FBQSxDQUNuQixhQUFXLENBQUEsQ0FDWCxvQkFBa0IsQ0FBQSxDQUNsQixNQUFJLENBQUEsQ0FDSixvR0FBa0csQ0FBQSxDQUNsRyx5REFBdUQsQ0FBQSxDQUN2RCx5QkFBdUIsQ0FBQSxDQUN2QixzQkFBb0IsQ0FBQSxDQUNwQixRQUFNLENBQUEsQ0FDTixxQ0FBbUMsQ0FBQSxDQUNuQyw0RUFBMEUsQ0FBQSxDQUMxRSwrQkFBNkIsQ0FBQSxDQUM3QixvQ0FBa0MsQ0FBQSxDQUNsQyxNQUFJLENBQUEsQ0FDSiw2QkFBMkIsQ0FBQSxDQUMzQixLQUFHLENBQUEsQ0FDSCxzQkFBb0IsQ0FBQSxDQUNwQiw0QkFBMEIsQ0FBQSxDQUMxQix3Q0FBc0MsQ0FBQSxDQUN0QywrREFBNkQsQ0FBQSxDQUM3RCw4RkFBNEYsQ0FBQSxDQUM1RixhQUFXLENBQUEsQ0FDWCxPQUFLLENBQUEsQ0FDTCxxRUFBbUUsQ0FBQSxDQUNuRSxrTUFBZ00sQ0FBQSxDQUNoTSxZQUFVLENBQUEsQ0FDVixrQ0FBZ0MsQ0FBQSxDQUNoQyxhQUFXLENBQUEsQ0FDWCxtQ0FBaUMsQ0FBQSxDQUNqQyx5QkFBdUIsQ0FBQSxDQUN2QixnQ0FBOEIsQ0FBQSxDQUM5Qix1Q0FBcUMsQ0FBQSxDQUNyQyxNQUFJLENBQUEsQ0FDSixHQUFDLENBQUM7QUFFRixhQUFhLENBQUUsZ0JBQWUsQ0FBQyxFQUMvQixDQUFBLElBQUcsRUFDSCxzQkFBb0IsQ0FBQSxDQUNwQixLQUFHLENBQUEsQ0FDSCwrQkFBNkIsQ0FBQSxDQUM3QiwyQkFBeUIsQ0FBQSxDQUN6QiwwQkFBd0IsQ0FBQSxDQUN4Qiw4QkFBNEIsQ0FBQSxDQUM1QiwrQkFBNkIsQ0FBQSxDQUM3QixnQ0FBOEIsQ0FBQSxDQUM5QiwrQkFBNkIsQ0FBQSxDQUM3Qiw4QkFBNEIsQ0FBQSxDQUM1QiwrQkFBNkIsQ0FBQSxDQUM3QixzQ0FBb0MsQ0FBQSxDQUNwQyxnQ0FBOEIsQ0FBQSxDQUM5QiwrQkFBNkIsQ0FBQSxDQUM3Qiw2QkFBMkIsQ0FBQSxDQUMzQiw0QkFBMEIsQ0FBQSxDQUMxQiw2QkFBMkIsQ0FBQSxDQUMzQixtQ0FBaUMsQ0FBQSxDQUNqQywwQkFBd0IsQ0FBQSxDQUN4QixxQ0FBbUMsQ0FBQSxDQUNuQyxLQUFHLENBQUEsQ0FDSCx5R0FBdUcsQ0FBQSxDQUN2RyxtQ0FBaUMsQ0FBQSxDQUNqQyx3R0FBc0csQ0FBQSxDQUN0RyxNQUFJLENBQUEsQ0FDSixVQUFRLENBQUEsQ0FDUixLQUFHLENBQUEsQ0FDSCxtQ0FBaUMsQ0FBQSxDQUNqQywrQkFBNkIsQ0FBQSxDQUM3QixNQUFJLENBQUEsQ0FDSixXQUFTLENBQUEsQ0FDVCxLQUFHLENBQUEsQ0FDSCxtQ0FBaUMsQ0FBQSxDQUNqQyxLQUFHLENBQUEsQ0FDSCxzQ0FBb0MsQ0FBQSxDQUNwQyxvQ0FBa0MsQ0FBQSxDQUNsQyxXQUFTLENBQUEsQ0FDVCxLQUFHLENBQUEsQ0FDSCxrQ0FBZ0MsQ0FBQSxDQUNoQyxLQUFHLENBQUEsQ0FDSCw2QkFBMkIsQ0FBQSxDQUMzQiwyQkFBeUIsQ0FBQSxDQUN6QixVQUFRLENBQUEsQ0FDUixLQUFHLENBQUEsQ0FDSCw2QkFBMkIsQ0FBQSxDQUMzQixXQUFTLENBQUEsQ0FDVCxLQUFHLENBQUEsQ0FDSCxxQ0FBbUMsQ0FBQSxDQUNuQyx3R0FBc0csQ0FBQSxDQUN0RywyRkFBeUYsQ0FBQSxDQUN6Rix1QkFBcUIsQ0FBQSxDQUNyQixNQUFJLENBQUEsQ0FDSixpRkFBK0UsQ0FBQSxDQUMvRSxnRUFBOEQsQ0FBQSxDQUM5RCx1QkFBcUIsQ0FBQSxDQUNyQixNQUFJLENBQUEsQ0FDSixvR0FBa0csQ0FBQSxDQUNsRywrREFBNkQsQ0FBQSxDQUM3RCxvREFBa0QsQ0FBQSxDQUNsRCxpREFBK0MsQ0FBQSxDQUMvQywrQ0FBNkMsQ0FBQSxDQUM3QyxnQkFBYyxDQUFBLENBQ2QsTUFBSSxDQUFBLENBQ0osNkhBQTJILENBQUEsQ0FDM0gsZ0VBQThELENBQUEsQ0FDOUQsZ0dBQThGLENBQUEsQ0FDOUYsb0JBQWtCLENBQUEsQ0FDbEIsTUFBSSxDQUFBLENBQ0osZ0lBQThILENBQUEsQ0FDOUgsZ0VBQThELENBQUEsQ0FDOUQsMENBQXdDLENBQUEsQ0FDeEMsOERBQTRELENBQUEsQ0FDNUQsK0JBQTZCLENBQUEsQ0FDN0IsMENBQXdDLENBQUEsQ0FDeEMsa0RBQWdELENBQUEsQ0FDaEQsZUFBYSxDQUFBLENBQ2IsaUNBQStCLENBQUEsQ0FDL0IsdUNBQXFDLENBQUEsQ0FDckMsMkNBQXlDLENBQUEsQ0FDekMsNENBQTBDLENBQUEsQ0FDMUMsb0xBQWtMLENBQUEsQ0FDbEwsUUFBTSxDQUFBLENBQ04sdUZBQXFGLENBQUEsQ0FDckYsNkRBQTJELENBQUEsQ0FDM0Qsb0JBQWtCLENBQUEsQ0FDbEIsTUFBSSxDQUFBLENBQ0osOEZBQTRGLENBQUEsQ0FDNUYsd0NBQXNDLENBQUEsQ0FDdEMsOERBQTRELENBQUEsQ0FDNUQsb0JBQWtCLENBQUEsQ0FDbEIsTUFBSSxDQUFBLENBQ0osMklBQXlJLENBQUEsQ0FDekksT0FBSyxDQUFBLENBQ0wsa0NBQWdDLENBQUEsQ0FDaEMsdUZBQXFGLENBQUEsQ0FDckYsNkNBQTJDLENBQUEsQ0FDM0MsMEZBQXdGLENBQUEsQ0FDeEYsb0NBQWtDLENBQUEsQ0FDbEMsbUZBQWlGLENBQUEsQ0FDakYsd0NBQXNDLENBQUEsQ0FDdEMsNkVBQTJFLENBQUEsQ0FDM0UsWUFBVSxDQUFBLENBQ1YscUJBQW1CLENBQUEsQ0FDbkIsYUFBVyxDQUFBLENBQ1gsb0JBQWtCLENBQUEsQ0FDbEIsTUFBSSxDQUFBLENBQ0osNkJBQTJCLENBQUEsQ0FDM0IsS0FBRyxDQUFBLENBQ0gsa0JBQWdCLENBQUEsQ0FDaEIsT0FBSyxDQUFBLENBQ0wscUNBQW1DLENBQUEsQ0FDbkMsOENBQTRDLENBQUEsQ0FDNUMsZ0NBQThCLENBQUEsQ0FDOUIsZ0JBQWMsQ0FBQSxDQUNkLFFBQU0sQ0FBQSxDQUNOLDZDQUEyQyxDQUFBLENBQzNDLGFBQVcsQ0FBQSxDQUNYLDBEQUF3RCxDQUFBLENBQ3hELDhEQUE0RCxDQUFBLENBQzVELHVDQUFxQyxDQUFBLENBQ3JDLG9EQUFrRCxDQUFBLENBQ2xELGFBQVcsQ0FBQSxDQUNYLE9BQUssQ0FBQSxDQUNMLDhCQUE0QixDQUFBLENBQzVCLE9BQUssQ0FBQSxDQUNMLG1DQUFpQyxDQUFBLENBQ2pDLHlCQUF1QixDQUFBLENBQ3ZCLDZMQUEyTCxDQUFBLENBQzNMLFlBQVUsQ0FBQSxDQUNWLDZCQUEyQixDQUFBLENBQzNCLDJCQUF5QixDQUFBLENBQ3pCLHlCQUF1QixDQUFBLENBQ3ZCLGFBQVcsQ0FBQSxDQUNYLDBDQUF3QyxDQUFBLENBQ3hDLDBDQUF3QyxDQUFBLENBQ3hDLDBFQUF3RSxDQUFBLENBQ3hFLDBFQUF3RSxDQUFBLENBQ3hFLDREQUEwRCxDQUFBLENBQzFELGFBQVcsQ0FBQSxDQUNYLDZFQUEyRSxDQUFBLENBQzNFLDhCQUE0QixDQUFBLENBQzVCLE1BQUksQ0FBQSxDQUNKLEdBQUMsQ0FBQztBQUVGLGFBQWEsQ0FBRSxvQkFBbUIsQ0FBQyxFQUNuQyxDQUFBLElBQUcsRUFDSCxzQkFBb0IsQ0FBQSxDQUNwQixLQUFHLENBQUEsQ0FDSCxtQ0FBaUMsQ0FBQSxDQUNqQyxLQUFHLENBQUEsQ0FDSCxvQ0FBa0MsQ0FBQSxDQUNsQyxXQUFTLENBQUEsQ0FDVCxLQUFHLENBQUEsQ0FDSCxzQkFBb0IsQ0FBQSxDQUNwQixPQUFLLENBQUEsQ0FDTCxxQ0FBbUMsQ0FBQSxDQUNuQyx3Q0FBc0MsQ0FBQSxDQUN0QyxZQUFVLENBQUEsQ0FDViwyQ0FBeUMsQ0FBQSxDQUN6QyxhQUFXLENBQUEsQ0FDWCxPQUFLLENBQUEsQ0FDTCxNQUFJLENBQUEsQ0FDSixHQUFDLENBQUM7QUFFRixhQUFhLENBQUUseUJBQXdCLENBQUMsRUFDeEMsQ0FBQSxJQUFHLEVBQ0gsc0JBQW9CLENBQUEsQ0FDcEIsS0FBRyxDQUFBLENBQ0gsc0NBQW9DLENBQUEsQ0FDcEMsMEJBQXdCLENBQUEsQ0FDeEIsa0NBQWdDLENBQUEsQ0FDaEMsS0FBRyxDQUFBLENBQ0gsNkJBQTJCLENBQUEsQ0FDM0IsMkJBQXlCLENBQUEsQ0FDekIsV0FBUyxDQUFBLENBQ1QsS0FBRyxDQUFBLENBQ0gsNkhBQTJILENBQUEsQ0FDM0gsZ0VBQThELENBQUEsQ0FDOUQsZ0dBQThGLENBQUEsQ0FDOUYsb0JBQWtCLENBQUEsQ0FDbEIsTUFBSSxDQUFBLENBQ0osNkJBQTJCLENBQUEsQ0FDM0IsS0FBRyxDQUFBLENBQ0gsc0JBQW9CLENBQUEsQ0FDcEIsa0JBQWdCLENBQUEsQ0FDaEIscUVBQW1FLENBQUEsQ0FDbkUsb0VBQWtFLENBQUEsQ0FDbEUsdUNBQXFDLENBQUEsQ0FDckMsaUNBQStCLENBQUEsQ0FDL0IsZ0dBQThGLENBQUEsQ0FDOUYsWUFBVSxDQUFBLENBQ1YsdUJBQXFCLENBQUEsQ0FDckIsYUFBVyxDQUFBLENBQ1gsT0FBSyxDQUFBLENBQ0wsZ0NBQThCLENBQUEsQ0FDOUIsdUNBQXFDLENBQUEsQ0FDckMsTUFBSSxDQUFBLENBQ0osR0FBQyxDQUFDO0FBRUYsYUFBYSxDQUFFLHVCQUFzQixDQUFDLEVBQ3RDLENBQUEsSUFBRyxFQUNILHNCQUFvQixDQUFBLENBQ3BCLEtBQUcsQ0FBQSxDQUNILDJCQUF5QixDQUFBLENBQ3pCLDhCQUE0QixDQUFBLENBQzVCLCtCQUE2QixDQUFBLENBQzdCLHNDQUFvQyxDQUFBLENBQ3BDLGdDQUE4QixDQUFBLENBQzlCLCtCQUE2QixDQUFBLENBQzdCLDZCQUEyQixDQUFBLENBQzNCLDRCQUEwQixDQUFBLENBQzFCLDZCQUEyQixDQUFBLENBQzNCLDBCQUF3QixDQUFBLENBQ3hCLGtDQUFnQyxDQUFBLENBQ2hDLEtBQUcsQ0FBQSxDQUNILDZCQUEyQixDQUFBLENBQzNCLDJCQUF5QixDQUFBLENBQ3pCLFdBQVMsQ0FBQSxDQUNULEtBQUcsQ0FBQSxDQUNILHdHQUFzRyxDQUFBLENBQ3RHLDJGQUF5RixDQUFBLENBQ3pGLHVCQUFxQixDQUFBLENBQ3JCLE1BQUksQ0FBQSxDQUNKLGlGQUErRSxDQUFBLENBQy9FLGdFQUE4RCxDQUFBLENBQzlELHVCQUFxQixDQUFBLENBQ3JCLE1BQUksQ0FBQSxDQUNKLG9HQUFrRyxDQUFBLENBQ2xHLCtEQUE2RCxDQUFBLENBQzdELG9EQUFrRCxDQUFBLENBQ2xELGlEQUErQyxDQUFBLENBQy9DLCtDQUE2QyxDQUFBLENBQzdDLGdCQUFjLENBQUEsQ0FDZCxNQUFJLENBQUEsQ0FDSiw2SEFBMkgsQ0FBQSxDQUMzSCxnRUFBOEQsQ0FBQSxDQUM5RCxnR0FBOEYsQ0FBQSxDQUM5RixvQkFBa0IsQ0FBQSxDQUNsQixNQUFJLENBQUEsQ0FDSiw2QkFBMkIsQ0FBQSxDQUMzQixLQUFHLENBQUEsQ0FDSCxrQkFBZ0IsQ0FBQSxDQUNoQiwwREFBd0QsQ0FBQSxDQUN4RCw4QkFBNEIsQ0FBQSxDQUM1QixPQUFLLENBQUEsQ0FDTCxtQ0FBaUMsQ0FBQSxDQUNqQyxvRUFBa0UsQ0FBQSxDQUNsRSx1Q0FBcUMsQ0FBQSxDQUNyQyxpQ0FBK0IsQ0FBQSxDQUMvQixnR0FBOEYsQ0FBQSxDQUM5RixZQUFVLENBQUEsQ0FDViw2QkFBMkIsQ0FBQSxDQUMzQiwyQkFBeUIsQ0FBQSxDQUN6Qix5QkFBdUIsQ0FBQSxDQUN2QixhQUFXLENBQUEsQ0FDWCwwQ0FBd0MsQ0FBQSxDQUN4QywwQ0FBd0MsQ0FBQSxDQUN4QyxnRkFBOEUsQ0FBQSxDQUM5RSwwQ0FBd0MsQ0FBQSxDQUN4Qyw0REFBMEQsQ0FBQSxDQUMxRCxhQUFXLENBQUEsQ0FDWCw2RUFBMkUsQ0FBQSxDQUMzRSw4QkFBNEIsQ0FBQSxDQUM1QixNQUFJLENBQUEsQ0FDSixHQUFDLENBQUM7QUFFRixHQUFJLE1BQUssUUFBUSxJQUFNLFVBQVEsQ0FBRztBQUFFLE9BQUssUUFBUSxFQUFJLGVBQWEsQ0FBQztBQUFFO0FBQUE7OztBQ3JjckU7QUFBQSxBQUFJLEVBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxTQUFRLENBQUMsQ0FBQztBQUMzQixBQUFJLEVBQUEsQ0FBQSxLQUFJLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxhQUFZLENBQUMsQ0FBQztBQUdsQyxRQUFRLFNBQVMsRUFBSSxHQUFDLENBQUM7QUFHdkIsT0FBUyxVQUFRLENBQUcsRUFBQyxDQUFHLENBQUEsSUFBRyxDQUFHLENBQUEsT0FBTSxDQUFHO0FBQ25DLFFBQU0sRUFBSSxDQUFBLE9BQU0sR0FBSyxHQUFDLENBQUM7QUFDdkIsS0FBRyxHQUFHLEVBQUksR0FBQyxDQUFDO0FBQ1osS0FBRyxRQUFRLEVBQUksQ0FBQSxFQUFDLGNBQWMsQUFBQyxFQUFDLENBQUM7QUFDakMsS0FBRyxLQUFLLEFBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNaLEtBQUcsTUFBTSxFQUFJLEtBQUcsQ0FBQztBQUlqQixLQUFHLFFBQVEsQUFBQyxDQUFDLENBQUEsQ0FBRyxFQUFBLENBQUcsSUFBSSxXQUFTLEFBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLElBQUUsQ0FBQyxDQUFDLENBQUcsRUFBRSxTQUFRLENBQUcsVUFBUSxDQUFFLENBQUMsQ0FBQztBQUk1RSxLQUFHLEtBQUssRUFBSSxLQUFHLENBQUM7QUFDaEIsVUFBUSxTQUFTLENBQUUsSUFBRyxLQUFLLENBQUMsRUFBSSxLQUFHLENBQUM7QUFDeEM7QUFBQSxBQUFDO0FBRUQsUUFBUSxVQUFVLEtBQUssRUFBSSxVQUFVLElBQUcsQ0FBRztBQUN2QyxLQUFHLEdBQUcsY0FBYyxBQUFDLENBQUMsSUFBRyxHQUFHLFNBQVMsRUFBSSxLQUFHLENBQUMsQ0FBQztBQUM5QyxLQUFHLEdBQUcsWUFBWSxBQUFDLENBQUMsSUFBRyxHQUFHLFdBQVcsQ0FBRyxDQUFBLElBQUcsUUFBUSxDQUFDLENBQUM7QUFDekQsQ0FBQztBQUdELFFBQVEsVUFBVSxLQUFLLEVBQUksVUFBVSxHQUFFLENBQUcsQ0FBQSxPQUFNOztBQUM1QyxRQUFNLEVBQUksQ0FBQSxPQUFNLEdBQUssR0FBQyxDQUFDO0FBQ3ZCLEtBQUcsTUFBTSxFQUFJLElBQUksTUFBSSxBQUFDLEVBQUMsQ0FBQztBQUN4QixLQUFHLE1BQU0sT0FBTyxJQUFJLFNBQUEsQUFBQyxDQUFLO0FBQ3RCLGFBQVMsRUFBSSxDQUFBLFVBQVMsTUFBTSxDQUFDO0FBQzdCLGNBQVUsRUFBSSxDQUFBLFVBQVMsT0FBTyxDQUFDO0FBQy9CLFlBQVEsRUFBSSxLQUFHLENBQUM7QUFDaEIsY0FBVSxBQUFDLENBQUMsT0FBTSxDQUFDLENBQUM7QUFDcEIsMkJBQXVCLEFBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQztFQUNyQyxDQUFBLENBQUM7QUFDRCxLQUFHLE1BQU0sSUFBSSxFQUFJLElBQUUsQ0FBQztBQUN4QixDQUFDO0FBR0QsUUFBUSxVQUFVLFFBQVEsRUFBSSxVQUFVLEtBQUksQ0FBRyxDQUFBLE1BQUssQ0FBRyxDQUFBLElBQUcsQ0FBRyxDQUFBLE9BQU0sQ0FBRztBQUNsRSxLQUFHLE1BQU0sRUFBSSxNQUFJLENBQUM7QUFDbEIsS0FBRyxPQUFPLEVBQUksT0FBSyxDQUFDO0FBQ3BCLEtBQUcsS0FBSyxFQUFJLEtBQUcsQ0FBQztBQUNoQixLQUFHLE1BQU0sRUFBSSxLQUFHLENBQUM7QUFFakIsS0FBRyxPQUFPLEFBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQztBQUNwQixLQUFHLG9CQUFvQixBQUFDLENBQUMsT0FBTSxDQUFDLENBQUM7QUFDckMsQ0FBQztBQUdELFFBQVEsVUFBVSxPQUFPLEVBQUksVUFBVSxPQUFNLENBQUc7QUFDNUMsUUFBTSxFQUFJLENBQUEsT0FBTSxHQUFLLEdBQUMsQ0FBQztBQUV2QixLQUFHLEtBQUssQUFBQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1osS0FBRyxHQUFHLFlBQVksQUFBQyxDQUFDLElBQUcsR0FBRyxvQkFBb0IsQ0FBRyxFQUFDLE9BQU0sb0JBQW9CLElBQU0sTUFBSSxDQUFBLENBQUksTUFBSSxFQUFJLEtBQUcsQ0FBQyxDQUFDLENBQUM7QUFHeEcsS0FBSSxJQUFHLE1BQU0sR0FBSyxDQUFBLElBQUcsTUFBTSxTQUFTLENBQUc7QUFDbkMsT0FBRyxHQUFHLFdBQVcsQUFBQyxDQUFDLElBQUcsR0FBRyxXQUFXLENBQUcsRUFBQSxDQUFHLENBQUEsSUFBRyxHQUFHLEtBQUssQ0FBRyxDQUFBLElBQUcsR0FBRyxLQUFLLENBQUcsQ0FBQSxJQUFHLEdBQUcsY0FBYyxDQUFHLENBQUEsSUFBRyxNQUFNLENBQUMsQ0FBQztFQUM1RyxLQUVLLEtBQUksSUFBRyxNQUFNLEdBQUssQ0FBQSxJQUFHLE9BQU8sQ0FBRztBQUNoQyxPQUFHLEdBQUcsV0FBVyxBQUFDLENBQUMsSUFBRyxHQUFHLFdBQVcsQ0FBRyxFQUFBLENBQUcsQ0FBQSxJQUFHLEdBQUcsS0FBSyxDQUFHLENBQUEsSUFBRyxNQUFNLENBQUcsQ0FBQSxJQUFHLE9BQU8sQ0FBRyxFQUFBLENBQUcsQ0FBQSxJQUFHLEdBQUcsS0FBSyxDQUFHLENBQUEsSUFBRyxHQUFHLGNBQWMsQ0FBRyxDQUFBLElBQUcsS0FBSyxDQUFDLENBQUM7RUFDdkk7QUFBQSxBQUNKLENBQUM7QUFJRCxRQUFRLFVBQVUsb0JBQW9CLEVBQUksVUFBVSxPQUFNLENBQUc7QUFDekQsUUFBTSxFQUFJLENBQUEsT0FBTSxHQUFLLEdBQUMsQ0FBQztBQUN2QixRQUFNLFVBQVUsRUFBSSxDQUFBLE9BQU0sVUFBVSxHQUFLLFNBQU8sQ0FBQztBQUNqRCxBQUFJLElBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxJQUFHLEdBQUcsQ0FBQztBQU1oQixLQUFJLEtBQUksV0FBVyxBQUFDLENBQUMsSUFBRyxNQUFNLENBQUMsQ0FBQSxFQUFLLENBQUEsS0FBSSxXQUFXLEFBQUMsQ0FBQyxJQUFHLE9BQU8sQ0FBQyxDQUFHO0FBQy9ELE9BQUcsV0FBVyxFQUFJLEtBQUcsQ0FBQztBQUN0QixLQUFDLGNBQWMsQUFBQyxDQUFDLEVBQUMsV0FBVyxDQUFHLENBQUEsRUFBQyxlQUFlLENBQUcsQ0FBQSxPQUFNLGVBQWUsR0FBSyxDQUFBLEVBQUMsY0FBYyxDQUFDLENBQUM7QUFDOUYsS0FBQyxjQUFjLEFBQUMsQ0FBQyxFQUFDLFdBQVcsQ0FBRyxDQUFBLEVBQUMsZUFBZSxDQUFHLENBQUEsT0FBTSxlQUFlLEdBQUssQ0FBQSxFQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRTlGLE9BQUksT0FBTSxVQUFVLEdBQUssU0FBTyxDQUFHO0FBRS9CLFNBQUcsVUFBVSxFQUFJLFNBQU8sQ0FBQztBQUN6QixPQUFDLGNBQWMsQUFBQyxDQUFDLEVBQUMsV0FBVyxDQUFHLENBQUEsRUFBQyxtQkFBbUIsQ0FBRyxDQUFBLEVBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNoRixPQUFDLGNBQWMsQUFBQyxDQUFDLEVBQUMsV0FBVyxDQUFHLENBQUEsRUFBQyxtQkFBbUIsQ0FBRyxDQUFBLEVBQUMsT0FBTyxDQUFDLENBQUM7QUFDakUsT0FBQyxlQUFlLEFBQUMsQ0FBQyxFQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BDLEtBQ0ssS0FBSSxPQUFNLFVBQVUsR0FBSyxTQUFPLENBQUc7QUFFcEMsU0FBRyxVQUFVLEVBQUksU0FBTyxDQUFDO0FBQ3pCLE9BQUMsY0FBYyxBQUFDLENBQUMsRUFBQyxXQUFXLENBQUcsQ0FBQSxFQUFDLG1CQUFtQixDQUFHLENBQUEsRUFBQyxPQUFPLENBQUMsQ0FBQztBQUNqRSxPQUFDLGNBQWMsQUFBQyxDQUFDLEVBQUMsV0FBVyxDQUFHLENBQUEsRUFBQyxtQkFBbUIsQ0FBRyxDQUFBLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFDckUsS0FDSyxLQUFJLE9BQU0sVUFBVSxHQUFLLFVBQVEsQ0FBRztBQUVyQyxTQUFHLFVBQVUsRUFBSSxVQUFRLENBQUM7QUFDMUIsT0FBQyxjQUFjLEFBQUMsQ0FBQyxFQUFDLFdBQVcsQ0FBRyxDQUFBLEVBQUMsbUJBQW1CLENBQUcsQ0FBQSxFQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2xFLE9BQUMsY0FBYyxBQUFDLENBQUMsRUFBQyxXQUFXLENBQUcsQ0FBQSxFQUFDLG1CQUFtQixDQUFHLENBQUEsRUFBQyxRQUFRLENBQUMsQ0FBQztJQUN0RTtBQUFBLEVBQ0osS0FDSztBQUdELE9BQUcsV0FBVyxFQUFJLE1BQUksQ0FBQztBQUN2QixLQUFDLGNBQWMsQUFBQyxDQUFDLEVBQUMsV0FBVyxDQUFHLENBQUEsRUFBQyxlQUFlLENBQUcsQ0FBQSxFQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3BFLEtBQUMsY0FBYyxBQUFDLENBQUMsRUFBQyxXQUFXLENBQUcsQ0FBQSxFQUFDLGVBQWUsQ0FBRyxDQUFBLEVBQUMsY0FBYyxDQUFDLENBQUM7QUFFcEUsT0FBSSxPQUFNLFVBQVUsR0FBSyxVQUFRLENBQUc7QUFFaEMsU0FBRyxVQUFVLEVBQUksVUFBUSxDQUFDO0FBQzFCLE9BQUMsY0FBYyxBQUFDLENBQUMsRUFBQyxXQUFXLENBQUcsQ0FBQSxFQUFDLG1CQUFtQixDQUFHLENBQUEsRUFBQyxRQUFRLENBQUMsQ0FBQztBQUNsRSxPQUFDLGNBQWMsQUFBQyxDQUFDLEVBQUMsV0FBVyxDQUFHLENBQUEsRUFBQyxtQkFBbUIsQ0FBRyxDQUFBLEVBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEUsS0FDSztBQUVELFNBQUcsVUFBVSxFQUFJLFNBQU8sQ0FBQztBQUN6QixPQUFDLGNBQWMsQUFBQyxDQUFDLEVBQUMsV0FBVyxDQUFHLENBQUEsRUFBQyxtQkFBbUIsQ0FBRyxDQUFBLEVBQUMsT0FBTyxDQUFDLENBQUM7QUFDakUsT0FBQyxjQUFjLEFBQUMsQ0FBQyxFQUFDLFdBQVcsQ0FBRyxDQUFBLEVBQUMsbUJBQW1CLENBQUcsQ0FBQSxFQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JFO0FBQUEsRUFDSjtBQUFBLEFBQ0osQ0FBQztBQUVELEdBQUksTUFBSyxJQUFNLFVBQVEsQ0FBRztBQUN0QixPQUFLLFFBQVEsRUFBSSxVQUFRLENBQUM7QUFDOUI7QUFBQTs7O0FDaElBO0FBQUEsT0FBUyxlQUFhLENBQUcsRUFBQyxDQUFHLENBQUEsT0FBTSxDQUNuQztBQUNJLEtBQUcsUUFBUSxFQUFJLFFBQU0sQ0FBQztBQUd0QixLQUFHLE9BQU8sRUFBSSxFQUFBLENBQUM7QUFDZixNQUFTLEdBQUEsQ0FBQSxDQUFBLEVBQUUsRUFBQSxDQUFHLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxRQUFRLE9BQU8sQ0FBRyxDQUFBLENBQUEsRUFBRSxDQUFHO0FBQ3hDLEFBQUksTUFBQSxDQUFBLE1BQUssRUFBSSxDQUFBLElBQUcsUUFBUSxDQUFFLENBQUEsQ0FBQyxDQUFDO0FBRTVCLFNBQUssVUFBVSxFQUFJLENBQUEsTUFBSyxLQUFLLENBQUM7QUFFOUIsV0FBUSxNQUFLLEtBQUs7QUFDZCxTQUFLLENBQUEsRUFBQyxNQUFNLENBQUM7QUFDYixTQUFLLENBQUEsRUFBQyxJQUFJLENBQUM7QUFDWCxTQUFLLENBQUEsRUFBQyxhQUFhO0FBQ2YsYUFBSyxVQUFVLEdBQUssRUFBQSxDQUFDO0FBQ3JCLGFBQUs7QUFBQSxBQUNULFNBQUssQ0FBQSxFQUFDLE1BQU0sQ0FBQztBQUNiLFNBQUssQ0FBQSxFQUFDLGVBQWU7QUFDakIsYUFBSyxVQUFVLEdBQUssRUFBQSxDQUFDO0FBQ3JCLGFBQUs7QUFBQSxJQUNiO0FBRUEsU0FBSyxPQUFPLEVBQUksQ0FBQSxJQUFHLE9BQU8sQ0FBQztBQUMzQixPQUFHLE9BQU8sR0FBSyxDQUFBLE1BQUssVUFBVSxDQUFDO0VBQ25DO0FBQUEsQUFDSjtBQUFBLEFBR0EsYUFBYSxnQkFBZ0IsRUFBSSxHQUFDLENBQUM7QUFJbkMsYUFBYSxVQUFVLE9BQU8sRUFBSSxVQUFVLEVBQUMsQ0FBRyxDQUFBLFVBQVMsQ0FDekQ7QUFFSSxNQUFTLEdBQUEsQ0FBQSxDQUFBLEVBQUUsRUFBQSxDQUFHLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxRQUFRLE9BQU8sQ0FBRyxDQUFBLENBQUEsRUFBRSxDQUFHO0FBQ3hDLEFBQUksTUFBQSxDQUFBLE1BQUssRUFBSSxDQUFBLElBQUcsUUFBUSxDQUFFLENBQUEsQ0FBQyxDQUFDO0FBQzVCLEFBQUksTUFBQSxDQUFBLFFBQU8sRUFBSSxDQUFBLFVBQVMsVUFBVSxBQUFDLENBQUMsTUFBSyxLQUFLLENBQUMsU0FBUyxDQUFDO0FBRXpELE9BQUksUUFBTyxHQUFLLEVBQUMsQ0FBQSxDQUFHO0FBQ2hCLE9BQUMsd0JBQXdCLEFBQUMsQ0FBQyxRQUFPLENBQUMsQ0FBQztBQUNwQyxPQUFDLG9CQUFvQixBQUFDLENBQUMsUUFBTyxDQUFHLENBQUEsTUFBSyxLQUFLLENBQUcsQ0FBQSxNQUFLLEtBQUssQ0FBRyxDQUFBLE1BQUssV0FBVyxDQUFHLENBQUEsSUFBRyxPQUFPLENBQUcsQ0FBQSxNQUFLLE9BQU8sQ0FBQyxDQUFDO0FBQ3pHLG1CQUFhLGdCQUFnQixDQUFFLFFBQU8sQ0FBQyxFQUFJLFdBQVMsQ0FBQztJQUN6RDtBQUFBLEVBQ0o7QUFBQSxBQUdJLElBQUEsQ0FBQSxlQUFjLEVBQUksR0FBQyxDQUFDO0FBQ3hCLE1BQUssUUFBTyxHQUFLLENBQUEsY0FBYSxnQkFBZ0IsQ0FBRztBQUM3QyxPQUFJLGNBQWEsZ0JBQWdCLENBQUUsUUFBTyxDQUFDLEdBQUssV0FBUyxDQUFHO0FBQ3hELE9BQUMseUJBQXlCLEFBQUMsQ0FBQyxRQUFPLENBQUMsQ0FBQztBQUNyQyxvQkFBYyxLQUFLLEFBQUMsQ0FBQyxRQUFPLENBQUMsQ0FBQztJQUNsQztBQUFBLEVBQ0o7QUFBQSxBQUdBLE1BQUssUUFBTyxHQUFLLGdCQUFjLENBQUc7QUFDOUIsU0FBTyxlQUFhLGdCQUFnQixDQUFFLFFBQU8sQ0FBQyxDQUFDO0VBQ25EO0FBQUEsQUFDSixDQUFDO0FBRUQsR0FBSSxNQUFLLElBQU0sVUFBUSxDQUFHO0FBQ3RCLE9BQUssUUFBUSxFQUFJLGVBQWEsQ0FBQztBQUNuQztBQUFBOzs7QUNyRUE7QUFBQSxBQUFJLEVBQUEsQ0FBQSxLQUFJLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxZQUFXLENBQUMsQ0FBQztBQUVqQyxBQUFJLEVBQUEsQ0FBQSxZQUFXLEVBQUksQ0FBQSxDQUFBLFVBQVUsT0FBTyxBQUFDLENBQUM7QUFFbEMsV0FBUyxDQUFHLFVBQVUsT0FBTSxDQUFHO0FBQzNCLElBQUEsV0FBVyxBQUFDLENBQUMsSUFBRyxDQUFHLFFBQU0sQ0FBQyxDQUFDO0FBQzNCLE9BQUcsTUFBTSxFQUFJLElBQUksTUFBSSxBQUFDLENBQUMsSUFBRyxRQUFRLGlCQUFpQixDQUFHLENBQUEsSUFBRyxRQUFRLGFBQWEsQ0FBRyxDQUFBLElBQUcsUUFBUSxhQUFhLENBQUcsRUFBRSxXQUFVLENBQUcsQ0FBQSxJQUFHLFFBQVEsV0FBVyxDQUFFLENBQUMsQ0FBQztBQUNySixPQUFHLE1BQU0sTUFBTSxFQUFJLENBQUEsSUFBRyxRQUFRLE1BQU0sQ0FBQztBQUNyQyxPQUFHLE1BQU0scUJBQXFCLEVBQUksTUFBSSxDQUFDO0VBQzNDO0FBR0EsTUFBSSxDQUFHLFVBQVUsR0FBRSxDQUFHO0FBQ2xCLEFBQUksTUFBQSxDQUFBLEtBQUksRUFBSSxLQUFHLENBQUM7QUFFaEIsUUFBSSxHQUFHLEFBQUMsQ0FBQyxZQUFXLENBQUcsVUFBVSxLQUFJLENBQUc7QUFDcEMsQUFBSSxRQUFBLENBQUEsSUFBRyxFQUFJLENBQUEsS0FBSSxLQUFLLENBQUM7QUFDckIsQUFBSSxRQUFBLENBQUEsR0FBRSxFQUFJLENBQUEsSUFBRyxhQUFhLEFBQUMsQ0FBQyxlQUFjLENBQUMsQ0FBQztBQUM1QyxVQUFJLE1BQU0sV0FBVyxBQUFDLENBQUMsR0FBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0FBRUYsUUFBSSxLQUFLLEdBQUcsQUFBQyxDQUFDLFFBQU8sQ0FBRyxVQUFTLEFBQUMsQ0FBRTtBQUNoQyxBQUFJLFFBQUEsQ0FBQSxJQUFHLEVBQUksQ0FBQSxLQUFJLEtBQUssUUFBUSxBQUFDLEVBQUMsQ0FBQztBQUMvQixVQUFJLE1BQU0sVUFBVSxBQUFDLENBQUMsSUFBRyxFQUFFLENBQUcsQ0FBQSxJQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ3JDLFVBQUksYUFBYSxBQUFDLEVBQUMsQ0FBQztJQUN4QixDQUFDLENBQUM7QUFFRixRQUFJLEtBQUssR0FBRyxBQUFDLENBQUMsTUFBSyxDQUFHLFVBQVMsQUFBQyxDQUFFO0FBQzlCLEFBQUksUUFBQSxDQUFBLE1BQUssRUFBSSxDQUFBLEtBQUksS0FBSyxVQUFVLEFBQUMsRUFBQyxDQUFDO0FBQ25DLFVBQUksTUFBTSxVQUFVLEFBQUMsQ0FBQyxNQUFLLElBQUksQ0FBRyxDQUFBLE1BQUssSUFBSSxDQUFDLENBQUM7QUFDN0MsVUFBSSxhQUFhLEFBQUMsRUFBQyxDQUFDO0lBQ3hCLENBQUMsQ0FBQztBQUVGLFFBQUksS0FBSyxHQUFHLEFBQUMsQ0FBQyxXQUFVLENBQUcsVUFBUyxBQUFDLENBQUU7QUFDbkMsWUFBTSxJQUFJLEFBQUMsQ0FBQyxnQkFBZSxFQUFJLENBQUEsS0FBSSxLQUFLLFFBQVEsQUFBQyxFQUFDLENBQUMsQ0FBQztBQUNwRCxVQUFJLE1BQU0sVUFBVSxBQUFDLEVBQUMsQ0FBQztJQUMzQixDQUFDLENBQUM7QUFFRixRQUFJLEtBQUssR0FBRyxBQUFDLENBQUMsU0FBUSxDQUFHLFVBQVMsQUFBQyxDQUFFO0FBQ2pDLFlBQU0sSUFBSSxBQUFDLENBQUMsY0FBYSxFQUFJLENBQUEsS0FBSSxLQUFLLFFBQVEsQUFBQyxFQUFDLENBQUMsQ0FBQztBQUNsRCxVQUFJLE1BQU0sUUFBUSxBQUFDLENBQUMsS0FBSSxLQUFLLFFBQVEsQUFBQyxFQUFDLENBQUMsQ0FBQztBQUN6QyxVQUFJLGFBQWEsQUFBQyxFQUFDLENBQUM7SUFDeEIsQ0FBQyxDQUFDO0FBRUYsUUFBSSxLQUFLLEdBQUcsQUFBQyxDQUFDLFdBQVUsQ0FBRyxVQUFTLEFBQUMsQ0FBRTtBQUNuQyxVQUFJLE1BQU0sUUFBUSxFQUFJLEtBQUcsQ0FBQztJQUM5QixDQUFDLENBQUM7QUFFRixRQUFJLEtBQUssR0FBRyxBQUFDLENBQUMsU0FBUSxDQUFHLFVBQVMsQUFBQyxDQUFFO0FBQ2pDLFVBQUksTUFBTSxRQUFRLEVBQUksTUFBSSxDQUFDO0lBQy9CLENBQUMsQ0FBQztBQUlGLFFBQUksTUFBTSxVQUFVLEVBQUksQ0FBQSxLQUFJLEtBQUssYUFBYSxBQUFDLEVBQUMsQ0FBQztBQUVqRCxBQUFJLE1BQUEsQ0FBQSxNQUFLLEVBQUksQ0FBQSxLQUFJLEtBQUssVUFBVSxBQUFDLEVBQUMsQ0FBQztBQUNuQyxRQUFJLE1BQU0sVUFBVSxBQUFDLENBQUMsTUFBSyxJQUFJLENBQUcsQ0FBQSxNQUFLLElBQUksQ0FBQyxDQUFDO0FBQzdDLFVBQU0sSUFBSSxBQUFDLENBQUMsUUFBTyxFQUFJLENBQUEsS0FBSSxLQUFLLFFBQVEsQUFBQyxFQUFDLENBQUMsQ0FBQztBQUM1QyxRQUFJLE1BQU0sUUFBUSxBQUFDLENBQUMsS0FBSSxLQUFLLFFBQVEsQUFBQyxFQUFDLENBQUMsQ0FBQztBQUN6QyxRQUFJLGFBQWEsQUFBQyxFQUFDLENBQUM7QUFFcEIsSUFBQSxVQUFVLFVBQVUsTUFBTSxNQUFNLEFBQUMsQ0FBQyxJQUFHLENBQUcsVUFBUSxDQUFDLENBQUM7QUFHbEQsUUFBSSxNQUFNLEtBQUssQUFBQyxDQUFDLFNBQVEsQUFBQyxDQUFFO0FBQ3hCLFVBQUksS0FBSyxBQUFDLENBQUMsTUFBSyxDQUFDLENBQUM7SUFDdEIsQ0FBQyxDQUFDO0VBQ047QUFFQSxTQUFPLENBQUcsVUFBVSxHQUFFLENBQUc7QUFDckIsSUFBQSxVQUFVLFVBQVUsU0FBUyxNQUFNLEFBQUMsQ0FBQyxJQUFHLENBQUcsVUFBUSxDQUFDLENBQUM7RUFFekQ7QUFFQSxXQUFTLENBQUcsVUFBVSxNQUFLLENBQUcsQ0FBQSxJQUFHLENBQUc7QUFDaEMsQUFBSSxNQUFBLENBQUEsR0FBRSxFQUFJLENBQUEsUUFBTyxjQUFjLEFBQUMsQ0FBQyxLQUFJLENBQUMsQ0FBQztBQUN2QyxPQUFHLE1BQU0sU0FBUyxBQUFDLENBQUMsTUFBSyxDQUFHLElBQUUsQ0FBRyxLQUFHLENBQUMsQ0FBQztBQUN0QyxTQUFPLElBQUUsQ0FBQztFQUNkO0FBRUEsYUFBVyxDQUFHLFVBQVMsQUFBQyxDQUFFO0FBQ3RCLEFBQUksTUFBQSxDQUFBLEtBQUksRUFBSSxLQUFHLENBQUM7QUFDaEIsQUFBSSxNQUFBLENBQUEsTUFBSyxFQUFJLENBQUEsS0FBSSxLQUFLLFVBQVUsQUFBQyxFQUFDLENBQUM7QUFDbkMsUUFBSSxNQUFNLFVBQVUsQUFBQyxDQUFDLE1BQUssYUFBYSxBQUFDLEVBQUMsQ0FBRyxDQUFBLE1BQUssYUFBYSxBQUFDLEVBQUMsQ0FBQyxDQUFDO0VBQ3ZFO0FBRUEsT0FBSyxDQUFHLFVBQVMsQUFBQyxDQUFFO0FBQ2hCLE9BQUcsTUFBTSxPQUFPLEFBQUMsRUFBQyxDQUFDO0VBQ3ZCO0FBQUEsQUFFSixDQUFDLENBQUM7QUFFRixBQUFJLEVBQUEsQ0FBQSxZQUFXLEVBQUksVUFBVSxPQUFNLENBQUc7QUFDbEMsT0FBTyxJQUFJLGFBQVcsQUFBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFFRCxHQUFJLE1BQUssSUFBTSxVQUFRLENBQUc7QUFDdEIsT0FBSyxRQUFRLEVBQUk7QUFDYixlQUFXLENBQUcsYUFBVztBQUN6QixlQUFXLENBQUcsYUFBVztBQUFBLEVBQzdCLENBQUM7QUFDTDtBQUFBOzs7QUNuR0E7QUFBQSxBQUFJLEVBQUEsQ0FBQSxPQUFNLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxvQkFBbUIsQ0FBQyxDQUFDO0FBRzNDLEFBQUksRUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLFlBQVcsQ0FBQyxDQUFDO0FBQzlCLENBQUMsUUFBUSxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsb0JBQW1CLENBQUMsQ0FBQztBQUMxQyxDQUFDLFFBQVEsRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLG9CQUFtQixDQUFDLENBQUM7QUFFMUMsR0FBSSxNQUFLLElBQU0sVUFBUSxDQUFHO0FBQ3RCLE9BQUssUUFBUSxFQUFJO0FBQ2IsZUFBVyxDQUFHLENBQUEsT0FBTSxhQUFhO0FBQ2pDLGVBQVcsQ0FBRyxDQUFBLE9BQU0sYUFBYTtBQUNqQyxLQUFDLENBQUcsR0FBQztBQUFBLEVBQ1QsQ0FBQztBQUNMO0FBQUE7OztBQ2ZBO0FBQUEsT0FBUyxNQUFJLENBQUcsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUNuQjtBQUNJLE9BQU87QUFBRSxJQUFBLENBQUcsRUFBQTtBQUFHLElBQUEsQ0FBRyxFQUFBO0FBQUEsRUFBRSxDQUFDO0FBQ3pCO0FBQUEsQUFFQSxJQUFJLEtBQUssRUFBSSxVQUFVLENBQUEsQ0FDdkI7QUFDSSxLQUFJLENBQUEsR0FBSyxLQUFHLENBQUc7QUFDWCxTQUFPLEtBQUcsQ0FBQztFQUNmO0FBQUEsQUFDQSxPQUFPO0FBQUUsSUFBQSxDQUFHLENBQUEsQ0FBQSxFQUFFO0FBQUcsSUFBQSxDQUFHLENBQUEsQ0FBQSxFQUFFO0FBQUEsRUFBRSxDQUFDO0FBQzdCLENBQUM7QUFFRCxHQUFJLE1BQUssSUFBTSxVQUFRLENBQUc7QUFDdEIsT0FBSyxRQUFRLEVBQUksTUFBSSxDQUFDO0FBQzFCO0FBQUE7OztBQ2hCQTtBQUFBLEFBQUksRUFBQSxDQUFBLEtBQUksRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLFlBQVcsQ0FBQyxDQUFDO0FBQ2pDLEFBQUksRUFBQSxDQUFBLEdBQUUsRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLFVBQVMsQ0FBQyxDQUFDO0FBQzdCLEFBQUksRUFBQSxDQUFBLEtBQUksRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLFlBQVcsQ0FBQyxDQUFDO0FBQ2pDLEFBQUksRUFBQSxDQUFBLFdBQVUsRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLGVBQWMsQ0FBQyxZQUFZLENBQUM7QUFDdEQsQUFBSSxFQUFBLENBQUEsS0FBSSxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsWUFBVyxDQUFDLENBQUM7QUFDakMsQUFBSSxFQUFBLENBQUEsS0FBSSxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsYUFBWSxDQUFDLENBQUM7QUFFbEMsQUFBSSxFQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsWUFBVyxDQUFDLENBQUM7QUFDOUIsQUFBSSxFQUFBLENBQUEsU0FBUSxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsb0JBQW1CLENBQUMsQ0FBQztBQUM3QyxBQUFJLEVBQUEsQ0FBQSxVQUFTLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxxQkFBb0IsQ0FBQyxDQUFDO0FBQy9DLEFBQUksRUFBQSxDQUFBLFNBQVEsRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLG9CQUFtQixDQUFDLENBQUM7QUFFN0MsQUFBSSxFQUFBLENBQUEsSUFBRyxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsV0FBVSxDQUFDLEtBQUssQ0FBQztBQUNwQyxBQUFJLEVBQUEsQ0FBQSxJQUFHLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxXQUFVLENBQUMsS0FBSyxDQUFDO0FBR3BDLEFBQUksRUFBQSxDQUFBLElBQUcsQ0FBQztBQUNSLElBQUksa0JBQWtCLEFBQUMsQ0FBQyxTQUFRLEFBQUMsQ0FBRTtBQUMvQixJQUFJO0FBQ0EsT0FBRyxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsU0FBUSxDQUFDLENBQUM7RUFDN0IsQ0FDQSxPQUFPLENBQUEsQ0FBRztBQUNOLFVBQU0sSUFBSSxBQUFDLENBQUMsMkNBQTBDLENBQUMsQ0FBQztFQUM1RDtBQUFBLEFBRUEsbUJBQWlCLEFBQUMsRUFBQyxDQUFDO0FBQ3hCLENBQUMsQ0FBQztBQUdGLElBQUksV0FBVyxFQUFJLEtBQUcsQ0FBQztBQUN2QixFQUFFLGFBQWEsQUFBQyxDQUFDLEtBQUksV0FBVyxDQUFDLENBQUM7QUFDbEMsU0FBUyxhQUFhLEFBQUMsQ0FBQyxLQUFJLFdBQVcsQ0FBQyxDQUFDO0FBQ3pDLFFBQVEsUUFBUSxXQUFXLEVBQUksQ0FBQSxLQUFJLFdBQVcsQ0FBQztBQUMvQyxJQUFJLE1BQU0sRUFBSSxNQUFJLENBQUM7QUFHbkIsT0FBUyxNQUFJLENBQUcsV0FBVSxDQUFHLENBQUEsTUFBSyxDQUFHLENBQUEsTUFBSyxDQUFHLENBQUEsT0FBTSxDQUNuRDtBQUNJLEFBQUksSUFBQSxDQUFBLE9BQU0sRUFBSSxDQUFBLE9BQU0sR0FBSyxHQUFDLENBQUM7QUFDM0IsS0FBRyxZQUFZLEVBQUksTUFBSSxDQUFDO0FBRXhCLEtBQUcsWUFBWSxFQUFJLFlBQVUsQ0FBQztBQUM5QixLQUFHLE1BQU0sRUFBSSxHQUFDLENBQUM7QUFDZixLQUFHLGFBQWEsRUFBSSxHQUFDLENBQUM7QUFDdEIsS0FBRyxZQUFZLEVBQUksQ0FBQSxPQUFNLFlBQVksR0FBSyxFQUFBLENBQUM7QUFDM0MsS0FBRywyQkFBMkIsRUFBSSxFQUFDLE9BQU0sMkJBQTJCLElBQU0sTUFBSSxDQUFBLENBQUksTUFBSSxFQUFJLEtBQUcsQ0FBQyxDQUFDO0FBRS9GLEtBQUcsT0FBTyxFQUFJLE9BQUssQ0FBQztBQUNwQixLQUFHLE9BQU8sRUFBSSxPQUFLLENBQUM7QUFFcEIsS0FBRyxNQUFNLEVBQUksS0FBRyxDQUFDO0FBQ2pCLEtBQUcsU0FBUyxFQUFJLE1BQUksQ0FBQztBQUVyQixLQUFHLE1BQU0sRUFBSSxFQUFBLENBQUM7QUFDZCxLQUFHLEtBQUssRUFBSSxLQUFHLENBQUM7QUFDaEIsS0FBRyxPQUFPLEVBQUksS0FBRyxDQUFDO0FBQ2xCLEtBQUcsbUJBQW1CLEVBQUksQ0FBQSxNQUFLLGlCQUFpQixHQUFLLEVBQUEsQ0FBQztBQUV0RCxLQUFHLFFBQVEsRUFBSSxNQUFJLENBQUM7QUFDcEIsS0FBRyxRQUFRLEVBQUksTUFBSSxDQUFDO0FBRXBCLEtBQUcsVUFBVSxFQUFJLENBQUEsT0FBTSxVQUFVLENBQUM7QUFFbEMsS0FBRyxVQUFVLEFBQUMsRUFBQyxDQUFDO0FBQ3BCO0FBQUEsQUFFQSxJQUFJLFVBQVUsS0FBSyxFQUFJLFVBQVUsUUFBTzs7QUFFcEMsS0FBSSxJQUFHLFlBQVksQ0FBRztBQUNsQixVQUFNO0VBQ1Y7QUFBQSxBQUdBLEtBQUcsVUFBVSxBQUFDLEVBQUMsU0FBQSxBQUFDO0FBQ1osQUFBSSxNQUFBLENBQUEsS0FBSSxFQUFJLENBQUEsS0FBSSxBQUFDLEVBQUMsQ0FBQztBQUduQixRQUFJLE1BQU0sQUFBQyxFQUFDLFNBQUEsUUFBTyxDQUFLO0FBQ3BCLGVBQVMsRUFBSSxDQUFBLEtBQUksWUFBWSxBQUFDLENBQUMsV0FBVSxDQUFDLENBQUM7QUFDM0MsMkJBQXFCLEFBQUMsRUFBQyxDQUFDO0FBQ3hCLGFBQU8sQUFBQyxFQUFDLENBQUM7SUFDZCxFQUFDLENBQUM7QUFHRixRQUFJLE1BQU0sQUFBQyxFQUFDLFNBQUEsUUFBTyxDQUFLO0FBQ3BCLHVCQUFpQixBQUFDLENBQUMsUUFBTyxDQUFDLENBQUM7SUFDaEMsRUFBQyxDQUFDO0FBR0YsUUFBSSxNQUFNLEFBQUMsRUFBQyxTQUFBLEFBQUMsQ0FBSztBQUVkLG1CQUFhLEVBQUksQ0FBQSxjQUFhLEdBQUssQ0FBQSxRQUFPLEtBQUssQ0FBQztBQUNoRCxnQkFBVSxFQUFJLENBQUEsUUFBTyxjQUFjLEFBQUMsQ0FBQyxRQUFPLENBQUMsQ0FBQztBQUM5QyxnQkFBVSxNQUFNLFNBQVMsRUFBSSxXQUFTLENBQUM7QUFDdkMsZ0JBQVUsTUFBTSxJQUFJLEVBQUksRUFBQSxDQUFDO0FBQ3pCLGdCQUFVLE1BQU0sS0FBSyxFQUFJLEVBQUEsQ0FBQztBQUMxQixnQkFBVSxNQUFNLE9BQU8sRUFBSSxFQUFDLENBQUEsQ0FBQztBQUM3QixtQkFBYSxZQUFZLEFBQUMsQ0FBQyxXQUFVLENBQUMsQ0FBQztBQUV2QyxZQUFNLEVBQUksQ0FBQSxFQUFDLFdBQVcsQUFBQyxDQUFDLFdBQVUsQ0FBQyxDQUFDO0FBQ3BDLG1CQUFhLEFBQUMsQ0FBQyxjQUFhLFlBQVksQ0FBRyxDQUFBLGNBQWEsYUFBYSxDQUFDLENBQUM7QUFFdkUsbUJBQWEsQUFBQyxFQUFDLENBQUM7QUFDaEIsNkJBQXVCLEFBQUMsRUFBQyxDQUFDO0FBRzFCLDJCQUFxQixFQUFJLEtBQUcsQ0FBQztBQUM3QiwyQkFBcUIsQUFBQyxFQUFDLENBQUM7QUFFeEIscUJBQWUsRUFBSSxLQUFHLENBQUM7QUFFdkIsU0FBSSxNQUFPLFNBQU8sQ0FBQSxFQUFLLFdBQVMsQ0FBRztBQUMvQixlQUFPLEFBQUMsRUFBQyxDQUFDO01BQ2Q7QUFBQSxJQUNKLEVBQUMsQ0FBQztFQUNOLEVBQUMsQ0FBQztBQUNOLENBQUM7QUFFRCxJQUFJLFVBQVUsVUFBVSxFQUFJLFVBQVMsQUFBQyxDQUN0QztBQUVJLE1BQVMsR0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFLLENBQUEsSUFBRyxNQUFNLENBQUc7QUFDdEIsT0FBRyxNQUFNLENBQUUsQ0FBQSxDQUFDLEtBQUssQUFBQyxDQUFDLElBQUcsR0FBRyxDQUFDLENBQUM7RUFDL0I7QUFBQSxBQUNKLENBQUM7QUFFRCxJQUFJLFVBQVUsb0JBQW9CLEVBQUksVUFBUyxBQUFDLENBQ2hEO0FBRUksS0FBRyxNQUFNLEVBQUksSUFBSSxXQUFTLEFBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUM5QixLQUFHLFFBQVEsRUFBSSxJQUFJLGFBQVcsQUFBQyxDQUFDLElBQUcsTUFBTSxPQUFPLENBQUMsQ0FBQztBQUNsRCxLQUFHLGdCQUFnQixFQUFJLENBQUEsS0FBSSxBQUFDLENBQUMsQ0FBQSxDQUFHLEVBQUEsQ0FBQyxDQUFDO0FBQ2xDLEtBQUcsaUJBQWlCLEVBQUksS0FBRyxDQUFDO0FBQzVCLEtBQUcsbUJBQW1CLEVBQUksS0FBRyxDQUFDO0FBQzlCLEtBQUcseUJBQXlCLEVBQUksS0FBRyxDQUFDO0FBQ3BDLEtBQUcsc0JBQXNCLEVBQUksRUFBQSxDQUFDO0FBQzlCLEtBQUcsaUJBQWlCLEVBQUksTUFBSSxDQUFDO0FBSTdCLEtBQUcsSUFBSSxFQUFJLENBQUEsSUFBRyxHQUFHLGtCQUFrQixBQUFDLEVBQUMsQ0FBQztBQUN0QyxLQUFHLEdBQUcsZ0JBQWdCLEFBQUMsQ0FBQyxJQUFHLEdBQUcsWUFBWSxDQUFHLENBQUEsSUFBRyxJQUFJLENBQUMsQ0FBQztBQUN0RCxLQUFHLFNBQVMsRUFBSTtBQUFFLFFBQUksQ0FBRyxJQUFFO0FBQUcsU0FBSyxDQUFHLElBQUU7QUFBQSxFQUFFLENBQUM7QUFDM0MsS0FBRyxHQUFHLFNBQVMsQUFBQyxDQUFDLENBQUEsQ0FBRyxFQUFBLENBQUcsQ0FBQSxJQUFHLFNBQVMsTUFBTSxDQUFHLENBQUEsSUFBRyxTQUFTLE9BQU8sQ0FBQyxDQUFDO0FBR2pFLEtBQUcsWUFBWSxFQUFJLElBQUksVUFBUSxBQUFDLENBQUMsSUFBRyxHQUFHLENBQUcsZ0JBQWMsQ0FBQyxDQUFDO0FBQzFELEtBQUcsWUFBWSxRQUFRLEFBQUMsQ0FBQyxJQUFHLFNBQVMsTUFBTSxDQUFHLENBQUEsSUFBRyxTQUFTLE9BQU8sQ0FBRyxLQUFHLENBQUcsRUFBRSxTQUFRLENBQUcsVUFBUSxDQUFFLENBQUMsQ0FBQztBQUNuRyxLQUFHLEdBQUcscUJBQXFCLEFBQUMsQ0FBQyxJQUFHLEdBQUcsWUFBWSxDQUFHLENBQUEsSUFBRyxHQUFHLGtCQUFrQixDQUFHLENBQUEsSUFBRyxHQUFHLFdBQVcsQ0FBRyxDQUFBLElBQUcsWUFBWSxRQUFRLENBQUcsRUFBQSxDQUFDLENBQUM7QUFHN0gsS0FBRyxhQUFhLEVBQUksQ0FBQSxJQUFHLEdBQUcsbUJBQW1CLEFBQUMsRUFBQyxDQUFDO0FBQ2hELEtBQUcsR0FBRyxpQkFBaUIsQUFBQyxDQUFDLElBQUcsR0FBRyxhQUFhLENBQUcsQ0FBQSxJQUFHLGFBQWEsQ0FBQyxDQUFDO0FBQ2pFLEtBQUcsR0FBRyxvQkFBb0IsQUFBQyxDQUFDLElBQUcsR0FBRyxhQUFhLENBQUcsQ0FBQSxJQUFHLEdBQUcsa0JBQWtCLENBQUcsQ0FBQSxJQUFHLFNBQVMsTUFBTSxDQUFHLENBQUEsSUFBRyxTQUFTLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZILEtBQUcsR0FBRyx3QkFBd0IsQUFBQyxDQUFDLElBQUcsR0FBRyxZQUFZLENBQUcsQ0FBQSxJQUFHLEdBQUcsaUJBQWlCLENBQUcsQ0FBQSxJQUFHLEdBQUcsYUFBYSxDQUFHLENBQUEsSUFBRyxhQUFhLENBQUMsQ0FBQztBQUV2SCxLQUFHLEdBQUcsZ0JBQWdCLEFBQUMsQ0FBQyxJQUFHLEdBQUcsWUFBWSxDQUFHLEtBQUcsQ0FBQyxDQUFDO0FBQ2xELEtBQUcsR0FBRyxTQUFTLEFBQUMsQ0FBQyxDQUFBLENBQUcsRUFBQSxDQUFHLENBQUEsSUFBRyxPQUFPLE1BQU0sQ0FBRyxDQUFBLElBQUcsT0FBTyxPQUFPLENBQUMsQ0FBQztBQUNqRSxDQUFDO0FBR0QsSUFBSSxVQUFVLGNBQWMsRUFBSSxVQUFVLFFBQU87O0FBRTdDLEFBQUksSUFBQSxDQUFBLEtBQUksRUFBSSxDQUFBLEtBQUksQUFBQyxFQUFDLENBQUM7QUFDbkIsQUFBSSxJQUFBLENBQUEsVUFBUyxFQUFJLENBQUEsS0FBSSxpQkFBaUIsRUFBSSx3QkFBc0IsQ0FBQSxDQUFJLElBQUUsQ0FBQSxDQUFJLEVBQUMsQ0FBQyxHQUFJLEtBQUcsQUFBQyxFQUFDLENBQUMsQ0FBQztBQUd2RixNQUFJLE1BQU0sQUFBQyxFQUFDLFNBQUEsUUFBTztBQUVmLEFBQUksTUFBQSxDQUFBLGVBQWMsRUFBSSxDQUFBLENBQUMsTUFBSyxJQUFJLEdBQUssQ0FBQSxNQUFLLElBQUksZ0JBQWdCLENBQUMsR0FBSyxFQUFDLE1BQUssVUFBVSxHQUFLLENBQUEsTUFBSyxVQUFVLGdCQUFnQixDQUFDLENBQUM7QUFDMUgsT0FBSSxlQUFjLEdBQUssZ0NBQThCLENBQUc7QUFFcEQsQUFBSSxRQUFBLENBQUEsR0FBRSxFQUFJLElBQUksZUFBYSxBQUFDLEVBQUMsQ0FBQztBQUM5QixRQUFFLE9BQU8sSUFBSSxTQUFBLEFBQUMsQ0FBSztBQUNmLEFBQUksVUFBQSxDQUFBLGdCQUFlLEVBQUksQ0FBQSxlQUFjLEFBQUMsQ0FBQyxHQUFJLEtBQUcsQUFBQyxDQUFDLENBQUMsR0FBRSxTQUFTLENBQUMsQ0FBRyxFQUFFLElBQUcsQ0FBRyx5QkFBdUIsQ0FBRSxDQUFDLENBQUMsQ0FBQztBQUNwRyx1QkFBZSxBQUFDLENBQUMsZ0JBQWUsQ0FBQyxDQUFDO0FBQ2xDLGVBQU8sQUFBQyxFQUFDLENBQUM7TUFDZCxDQUFBLENBQUM7QUFDRCxRQUFFLEtBQUssQUFBQyxDQUFDLEtBQUksQ0FBRyxXQUFTLENBQUcsS0FBRyxDQUFrQixDQUFDO0FBQ2xELFFBQUUsYUFBYSxFQUFJLE9BQUssQ0FBQztBQUN6QixRQUFFLEtBQUssQUFBQyxFQUFDLENBQUM7SUFDZCxLQUVLO0FBQ0QsWUFBTSxJQUFJLEFBQUMsTUFBSyxDQUFDO0FBQ2pCLHFCQUFlLEFBQUMsQ0FBQyxVQUFTLENBQUMsQ0FBQztBQUM1QixhQUFPLEFBQUMsRUFBQyxDQUFDO0lBQ2Q7QUFBQSxFQUNKLEVBQUMsQ0FBQztBQUdGLE1BQUksTUFBTSxBQUFDLEVBQUMsU0FBQSxBQUFDO0FBQ1QsZUFBVyxRQUFRLEFBQUMsRUFBQyxTQUFBLE1BQUssQ0FBSztBQUMzQixXQUFLLGlCQUFpQixBQUFDLENBQUMsU0FBUSxDQUFHLENBQUEsNkJBQTRCLEtBQUssQUFBQyxNQUFLLENBQUMsQ0FBQztBQUM1RSxXQUFLLGlCQUFpQixBQUFDLENBQUMsU0FBUSxDQUFHLENBQUEsOEJBQTZCLEtBQUssQUFBQyxNQUFLLENBQUMsQ0FBQztBQUM3RSxXQUFLLGlCQUFpQixBQUFDLENBQUMsU0FBUSxDQUFHLENBQUEscUJBQW9CLEtBQUssQUFBQyxNQUFLLENBQUMsQ0FBQztJQUN4RSxFQUFDLENBQUM7QUFFRixtQkFBZSxFQUFJLEVBQUEsQ0FBQztBQUNwQixpQ0FBNkIsRUFBSSxHQUFDLENBQUM7QUFFbkMsT0FBSSxNQUFPLFNBQU8sQ0FBQSxFQUFLLFdBQVMsQ0FBRztBQUMvQixhQUFPLEFBQUMsRUFBQyxDQUFDO0lBQ2Q7QUFBQSxFQUNKLEVBQUMsQ0FBQztBQUNOLENBQUM7QUFHRCxJQUFJLFVBQVUsWUFBWSxFQUFJLFVBQVUsR0FBRSxDQUMxQztBQUNJLEtBQUcsUUFBUSxFQUFJLEdBQUMsQ0FBQztBQUNqQixNQUFTLEdBQUEsQ0FBQSxDQUFBLEVBQUUsRUFBQSxDQUFHLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxZQUFZLENBQUcsQ0FBQSxDQUFBLEVBQUUsQ0FBRztBQUNyQyxPQUFHLFFBQVEsS0FBSyxBQUFDLENBQUMsR0FBSSxPQUFLLEFBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLE9BQUcsUUFBUSxDQUFFLENBQUEsQ0FBQyxZQUFZLEFBQUMsQ0FBQztBQUN4QixTQUFHLENBQUcsT0FBSztBQUNYLGNBQVEsQ0FBRyxFQUFBO0FBQ1gsZ0JBQVUsQ0FBRyxDQUFBLElBQUcsWUFBWTtBQUFBLElBQ2hDLENBQUMsQ0FBQTtFQUNMO0FBQUEsQUFDSixDQUFDO0FBR0QsSUFBSSxVQUFVLHlCQUF5QixFQUFJLFVBQVUsSUFBRyxDQUFHLENBQUEsT0FBTSxDQUNqRTtBQUNJLEtBQUksSUFBRyxPQUFPLEdBQUssS0FBRyxDQUFHO0FBQ3JCLE9BQUcsT0FBTyxFQUFJLENBQUEsSUFBRyxZQUFZLENBQUM7QUFDOUIsT0FBRyxZQUFZLEVBQUksQ0FBQSxDQUFDLElBQUcsT0FBTyxFQUFJLEVBQUEsQ0FBQyxFQUFJLENBQUEsSUFBRyxRQUFRLE9BQU8sQ0FBQztFQUM5RDtBQUFBLEFBQ0EsS0FBRyxRQUFRLENBQUUsSUFBRyxPQUFPLENBQUMsWUFBWSxBQUFDLENBQUMsT0FBTSxDQUFDLENBQUM7QUFDbEQsQ0FBQztBQUVELElBQUksVUFBVSxVQUFVLEVBQUksVUFBVSxHQUFFLENBQUcsQ0FBQSxHQUFFLENBQzdDO0FBQ0ksS0FBRyxPQUFPLEVBQUk7QUFBRSxNQUFFLENBQUcsSUFBRTtBQUFHLE1BQUUsQ0FBRyxJQUFFO0FBQUEsRUFBRSxDQUFDO0FBQ3BDLEtBQUcsTUFBTSxFQUFJLEtBQUcsQ0FBQztBQUNyQixDQUFDO0FBRUQsSUFBSSxVQUFVLFVBQVUsRUFBSSxVQUFTLEFBQUMsQ0FDdEM7QUFDSSxLQUFHLFVBQVUsRUFBSSxDQUFBLElBQUcsS0FBSyxDQUFDO0FBQzFCLEtBQUcsUUFBUSxFQUFJLEtBQUcsQ0FBQztBQUN2QixDQUFDO0FBRUQsSUFBSSxVQUFVLDJCQUEyQixFQUFJLEVBQUEsQ0FBQztBQUM5QyxJQUFJLFVBQVUsUUFBUSxFQUFJLFVBQVUsSUFBRyxDQUN2QztBQUVJLEFBQUksSUFBQSxDQUFBLEtBQUksRUFBSSxLQUFHLENBQUM7QUFDaEIsQUFBSSxJQUFBLENBQUEsS0FBSSxFQUFJLEtBQUcsQ0FBQztBQUNoQixLQUFJLElBQUcsVUFBVSxHQUFLLEtBQUcsQ0FBRztBQUN4QixVQUFNLElBQUksQUFBQyxDQUFDLG1CQUFrQixFQUFJLENBQUEsSUFBRyxVQUFVLENBQUMsQ0FBQztBQUNqRCxPQUFJLElBQUcsSUFBSSxBQUFDLENBQUMsSUFBRyxFQUFJLENBQUEsSUFBRyxVQUFVLENBQUMsQ0FBQSxFQUFLLENBQUEsSUFBRywyQkFBMkIsQ0FBRztBQUNwRSxTQUFJLElBQUcsRUFBSSxDQUFBLElBQUcsVUFBVSxDQUFHO0FBQ3ZCLFlBQUksRUFBSSxDQUFBLElBQUcsRUFBSSxDQUFBLElBQUcsMkJBQTJCLENBQUM7TUFDbEQsS0FDSztBQUNELFlBQUksRUFBSSxDQUFBLElBQUcsRUFBSSxDQUFBLElBQUcsMkJBQTJCLENBQUM7TUFDbEQ7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEFBRUEsS0FBRyxVQUFVLEVBQUksQ0FBQSxJQUFHLEtBQUssQ0FBQztBQUMxQixLQUFHLEtBQUssRUFBSSxLQUFHLENBQUM7QUFDaEIsS0FBRyxZQUFZLEVBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLEtBQUssQ0FBRyxDQUFBLElBQUcsWUFBWSxTQUFTLEdBQUssRUFBQyxDQUFDLElBQUcsS0FBSyxDQUFDLENBQUM7QUFDbEYsS0FBRyxRQUFRLEVBQUksTUFBSSxDQUFDO0FBRXBCLEtBQUcsNEJBQTRCLEFBQUMsQ0FBQyxLQUFJLENBQUcsTUFBSSxDQUFDLENBQUM7QUFDOUMsS0FBRyxNQUFNLEVBQUksS0FBRyxDQUFDO0FBQ3JCLENBQUM7QUFFRCxJQUFJLFVBQVUsNEJBQTRCLEVBQUksVUFBVSxLQUFJLENBQUcsQ0FBQSxLQUFJLENBQ25FO0FBQ0ksTUFBSSxFQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBQyxLQUFJLENBQUcsQ0FBQSxJQUFHLFlBQVksU0FBUyxHQUFLLE1BQUksQ0FBQyxDQUFDO0FBQzNELE1BQUksRUFBSSxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUMsS0FBSSxDQUFHLENBQUEsSUFBRyxZQUFZLFNBQVMsR0FBSyxNQUFJLENBQUMsQ0FBQztBQUUzRCxRQUFNLElBQUksQUFBQyxDQUFDLCtCQUE4QixFQUFJLE1BQUksQ0FBQSxDQUFJLEtBQUcsQ0FBQSxDQUFJLE1BQUksQ0FBQSxDQUFJLEtBQUcsQ0FBQyxDQUFDO0FBQzFFLEFBQUksSUFBQSxDQUFBLFlBQVcsRUFBSSxHQUFDLENBQUM7QUFDckIsTUFBUyxHQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUssQ0FBQSxJQUFHLE1BQU0sQ0FBRztBQUN0QixBQUFJLE1BQUEsQ0FBQSxJQUFHLEVBQUksQ0FBQSxJQUFHLE1BQU0sQ0FBRSxDQUFBLENBQUMsQ0FBQztBQUN4QixPQUFJLElBQUcsT0FBTyxFQUFFLEVBQUksTUFBSSxDQUFBLEVBQUssQ0FBQSxJQUFHLE9BQU8sRUFBRSxFQUFJLE1BQUksQ0FBRztBQUNoRCxpQkFBVyxLQUFLLEFBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUN4QjtBQUFBLEVBQ0o7QUFBQSxBQUNBLE1BQVMsR0FBQSxDQUFBLENBQUEsRUFBRSxFQUFBLENBQUcsQ0FBQSxDQUFBLEVBQUksQ0FBQSxZQUFXLE9BQU8sQ0FBRyxDQUFBLENBQUEsRUFBRSxDQUFHO0FBQ3hDLEFBQUksTUFBQSxDQUFBLEdBQUUsRUFBSSxDQUFBLFlBQVcsQ0FBRSxDQUFBLENBQUMsQ0FBQztBQUN6QixVQUFNLElBQUksQUFBQyxDQUFDLFVBQVMsRUFBSSxJQUFFLENBQUEsQ0FBSSxvQkFBa0IsQ0FBQSxDQUFJLE1BQUksQ0FBQSxDQUFJLEtBQUcsQ0FBQSxDQUFJLE1BQUksQ0FBQSxDQUFJLEtBQUcsQ0FBQyxDQUFDO0FBQ2pGLE9BQUcsV0FBVyxBQUFDLENBQUMsR0FBRSxDQUFDLENBQUM7RUFDeEI7QUFBQSxBQUNKLENBQUM7QUFFRCxJQUFJLFVBQVUsVUFBVSxFQUFJLFVBQVUsRUFBQyxDQUFHLENBQUEsRUFBQyxDQUMzQztBQUNJLEtBQUcsT0FBTyxFQUFJO0FBQ1YsS0FBQyxDQUFHO0FBQUUsUUFBRSxDQUFHLENBQUEsRUFBQyxJQUFJO0FBQUcsUUFBRSxDQUFHLENBQUEsRUFBQyxJQUFJO0FBQUEsSUFBRTtBQUMvQixLQUFDLENBQUc7QUFBRSxRQUFFLENBQUcsQ0FBQSxFQUFDLElBQUk7QUFBRyxRQUFFLENBQUcsQ0FBQSxFQUFDLElBQUk7QUFBQSxJQUFFO0FBQUEsRUFDbkMsQ0FBQztBQUVELEFBQUksSUFBQSxDQUFBLE1BQUssRUFBSSxDQUFBLEdBQUUsRUFBSSxDQUFBLEdBQUUsaUJBQWlCLENBQUUsQ0FBQyxDQUFDLElBQUcsS0FBSyxDQUFDLENBQUM7QUFDcEQsS0FBRyxzQkFBc0IsRUFBSTtBQUN6QixLQUFDLENBQUcsQ0FBQSxHQUFFLGVBQWUsQUFBQyxDQUFDLEtBQUksQUFBQyxDQUFDLElBQUcsT0FBTyxHQUFHLElBQUksQ0FBRyxDQUFBLElBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3BFLEtBQUMsQ0FBRyxDQUFBLEdBQUUsZUFBZSxBQUFDLENBQUMsS0FBSSxBQUFDLENBQUMsSUFBRyxPQUFPLEdBQUcsSUFBSSxDQUFHLENBQUEsSUFBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFBQSxFQUN4RSxDQUFDO0FBQ0QsS0FBRyxzQkFBc0IsR0FBRyxFQUFFLEdBQUssT0FBSyxDQUFDO0FBQ3pDLEtBQUcsc0JBQXNCLEdBQUcsRUFBRSxHQUFLLE9BQUssQ0FBQztBQUN6QyxLQUFHLHNCQUFzQixHQUFHLEVBQUUsR0FBSyxPQUFLLENBQUM7QUFDekMsS0FBRyxzQkFBc0IsR0FBRyxFQUFFLEdBQUssT0FBSyxDQUFDO0FBRXpDLEtBQUcsY0FBYyxFQUFJLENBQUEsS0FBSSxBQUFDLENBQ3RCLENBQUMsSUFBRyxzQkFBc0IsR0FBRyxFQUFFLEVBQUksQ0FBQSxJQUFHLHNCQUFzQixHQUFHLEVBQUUsQ0FBQyxFQUFJLEVBQUEsQ0FDdEUsQ0FBQSxDQUFDLElBQUcsc0JBQXNCLEdBQUcsRUFBRSxFQUFJLENBQUEsSUFBRyxzQkFBc0IsR0FBRyxFQUFFLENBQUMsRUFBSSxFQUFBLENBQzFFLENBQUM7QUFLRCxNQUFTLEdBQUEsQ0FBQSxDQUFBLENBQUEsRUFBSyxDQUFBLElBQUcsTUFBTSxDQUFHO0FBQ3RCLE9BQUcsd0JBQXdCLEFBQUMsQ0FBQyxJQUFHLE1BQU0sQ0FBRSxDQUFBLENBQUMsQ0FBQyxDQUFDO0VBQy9DO0FBQUEsQUFFQSxLQUFHLE1BQU0sRUFBSSxLQUFHLENBQUM7QUFDckIsQ0FBQztBQUVELElBQUksVUFBVSxhQUFhLEVBQUksVUFBVSxJQUFHLENBQzVDO0FBQ0ksT0FBTyxFQUFDLElBQUcsSUFBSSxBQUFDLENBQUMsSUFBRyxPQUFPLEVBQUUsQ0FBRyxDQUFBLElBQUcsWUFBWSxTQUFTLEdBQUssQ0FBQSxJQUFHLE9BQU8sRUFBRSxDQUFDLENBQUEsRUFBSyxDQUFBLElBQUcsWUFBWSxDQUFDLENBQUM7QUFDcEcsQ0FBQztBQUdELElBQUksVUFBVSx3QkFBd0IsRUFBSSxVQUFVLElBQUcsQ0FDdkQ7QUFDSSxBQUFJLElBQUEsQ0FBQSxPQUFNLEVBQUksQ0FBQSxJQUFHLFFBQVEsQ0FBQztBQUMxQixLQUFHLFFBQVEsRUFBSSxDQUFBLElBQUcsYUFBYSxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUEsRUFBSyxDQUFBLEdBQUUsYUFBYSxBQUFDLENBQUMsSUFBRyxPQUFPLENBQUcsQ0FBQSxJQUFHLHNCQUFzQixDQUFDLENBQUM7QUFDbkcsS0FBRyxZQUFZLEVBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFDLElBQUcsY0FBYyxFQUFFLEVBQUksQ0FBQSxJQUFHLElBQUksRUFBRSxDQUFDLENBQUEsQ0FBSSxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUMsSUFBRyxjQUFjLEVBQUUsRUFBSSxDQUFBLElBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM1RyxPQUFPLEVBQUMsT0FBTSxHQUFLLENBQUEsSUFBRyxRQUFRLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBRUQsSUFBSSxVQUFVLFVBQVUsRUFBSSxVQUFVLEtBQUksQ0FBRyxDQUFBLE1BQUssQ0FDbEQ7QUFDSSxLQUFHLE1BQU0sRUFBSSxLQUFHLENBQUM7QUFFakIsS0FBRyxTQUFTLEVBQUk7QUFBRSxRQUFJLENBQUcsTUFBSTtBQUFHLFNBQUssQ0FBRyxPQUFLO0FBQUEsRUFBRSxDQUFDO0FBQ2hELEtBQUcsWUFBWSxFQUFJO0FBQUUsUUFBSSxDQUFHLENBQUEsSUFBRyxNQUFNLEFBQUMsQ0FBQyxJQUFHLFNBQVMsTUFBTSxFQUFJLENBQUEsSUFBRyxtQkFBbUIsQ0FBQztBQUFHLFNBQUssQ0FBRyxDQUFBLElBQUcsTUFBTSxBQUFDLENBQUMsSUFBRyxTQUFTLE9BQU8sRUFBSSxDQUFBLElBQUcsbUJBQW1CLENBQUM7QUFBQSxFQUFFLENBQUM7QUFFM0osS0FBRyxPQUFPLE1BQU0sTUFBTSxFQUFJLENBQUEsSUFBRyxTQUFTLE1BQU0sRUFBSSxLQUFHLENBQUM7QUFDcEQsS0FBRyxPQUFPLE1BQU0sT0FBTyxFQUFJLENBQUEsSUFBRyxTQUFTLE9BQU8sRUFBSSxLQUFHLENBQUM7QUFDdEQsS0FBRyxPQUFPLE1BQU0sRUFBSSxDQUFBLElBQUcsWUFBWSxNQUFNLENBQUM7QUFDMUMsS0FBRyxPQUFPLE9BQU8sRUFBSSxDQUFBLElBQUcsWUFBWSxPQUFPLENBQUM7QUFFNUMsS0FBRyxHQUFHLGdCQUFnQixBQUFDLENBQUMsSUFBRyxHQUFHLFlBQVksQ0FBRyxLQUFHLENBQUMsQ0FBQztBQUNsRCxLQUFHLEdBQUcsU0FBUyxBQUFDLENBQUMsQ0FBQSxDQUFHLEVBQUEsQ0FBRyxDQUFBLElBQUcsT0FBTyxNQUFNLENBQUcsQ0FBQSxJQUFHLE9BQU8sT0FBTyxDQUFDLENBQUM7QUFDakUsQ0FBQztBQUVELElBQUksVUFBVSxjQUFjLEVBQUksVUFBUyxBQUFDLENBQzFDO0FBQ0ksS0FBRyxNQUFNLEVBQUksS0FBRyxDQUFDO0FBQ3JCLENBQUM7QUFJRCxJQUFJLFdBQVcsRUFBSSxVQUFVLEtBQUksQ0FBRyxDQUFBLElBQUcsQ0FBRyxDQUFBLFlBQVcsQ0FBRyxDQUFBLGNBQWEsQ0FDckU7QUFHSSxBQUFJLElBQUEsQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBQ1QsT0FBTyxFQUFBLENBQUM7QUFDWixDQUFDO0FBRUQsSUFBSSxVQUFVLE9BQU8sRUFBSSxVQUFTLEFBQUMsQ0FDbkM7QUFDSSxLQUFHLGdCQUFnQixBQUFDLEVBQUMsQ0FBQztBQUd0QixLQUFJLElBQUcsTUFBTSxHQUFLLE1BQUksQ0FBQSxFQUFLLENBQUEsSUFBRyxZQUFZLEdBQUssTUFBSSxDQUFHO0FBQ2xELFNBQU8sTUFBSSxDQUFDO0VBQ2hCO0FBQUEsQUFDQSxLQUFHLE1BQU0sRUFBSSxNQUFJLENBQUM7QUFFbEIsS0FBRyxTQUFTLEFBQUMsRUFBQyxDQUFDO0FBR2YsS0FBSSxJQUFHLFNBQVMsR0FBSyxLQUFHLENBQUc7QUFDdkIsT0FBRyxNQUFNLEVBQUksS0FBRyxDQUFDO0VBQ3JCO0FBQUEsQUFFQSxLQUFHLE1BQU0sRUFBRSxDQUFDO0FBR1osT0FBTyxLQUFHLENBQUM7QUFDZixDQUFDO0FBRUQsSUFBSSxVQUFVLFdBQVcsRUFBSSxVQUFTLEFBQUMsQ0FDdkM7QUFDSSxLQUFJLENBQUMsSUFBRyxZQUFZLENBQUc7QUFDbkIsVUFBTTtFQUNWO0FBQUEsQUFHSSxJQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsSUFBRyxHQUFHLENBQUM7QUFDaEIsR0FBQyxXQUFXLEFBQUMsQ0FBQyxHQUFFLENBQUcsSUFBRSxDQUFHLElBQUUsQ0FBRyxJQUFFLENBQUMsQ0FBQztBQUNqQyxHQUFDLE1BQU0sQUFBQyxDQUFDLEVBQUMsaUJBQWlCLEVBQUksQ0FBQSxFQUFDLGlCQUFpQixDQUFDLENBQUM7QUFHbkQsR0FBQyxPQUFPLEFBQUMsQ0FBQyxFQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3hCLEdBQUMsVUFBVSxBQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQztBQUNyQixHQUFDLE9BQU8sQUFBQyxDQUFDLEVBQUMsVUFBVSxDQUFDLENBQUM7QUFDdkIsR0FBQyxTQUFTLEFBQUMsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDO0FBR3hCLENBQUM7QUFFRCxJQUFJLFVBQVUsU0FBUyxFQUFJLFVBQVMsQUFBQyxDQUNyQztBQUNJLEFBQUksSUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLElBQUcsR0FBRyxDQUFDO0FBRWhCLEtBQUcsTUFBTSxBQUFDLEVBQUMsQ0FBQztBQUNaLEtBQUcsV0FBVyxBQUFDLEVBQUMsQ0FBQztBQUdqQixBQUFJLElBQUEsQ0FBQSxNQUFLLEVBQUksQ0FBQSxHQUFFLGVBQWUsQUFBQyxDQUFDLEtBQUksQUFBQyxDQUFDLElBQUcsT0FBTyxJQUFJLENBQUcsQ0FBQSxJQUFHLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN4RSxBQUFJLElBQUEsQ0FBQSxnQkFBZSxFQUFJLENBQUEsR0FBRSwwQkFBMEIsRUFBSSxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUMsQ0FBQSxDQUFHLENBQUEsSUFBRyxLQUFLLENBQUMsQ0FBQztBQUM3RSxBQUFJLElBQUEsQ0FBQSxVQUFTLEVBQUksQ0FBQSxLQUFJLEFBQUMsQ0FBQyxJQUFHLFNBQVMsTUFBTSxFQUFJLEVBQUEsQ0FBQSxDQUFJLGlCQUFlLENBQUcsQ0FBQSxJQUFHLFNBQVMsT0FBTyxFQUFJLEVBQUEsQ0FBQSxDQUFJLGlCQUFlLENBQUMsQ0FBQztBQUcvRyxBQUFJLElBQUEsQ0FBQSxhQUFZLEVBQUksQ0FBQSxJQUFHLE9BQU8sQUFBQyxFQUFDLENBQUM7QUFDakMsQUFBSSxJQUFBLENBQUEsY0FBYSxFQUFJLENBQUEsSUFBRyxPQUFPLEFBQUMsRUFBQyxDQUFDO0FBQ2xDLEFBQUksSUFBQSxDQUFBLGNBQWEsRUFBSSxDQUFBLElBQUcsT0FBTyxBQUFDLEVBQUMsQ0FBQztBQUdsQyxLQUFHLE1BQU0sQUFBQyxDQUFDLGNBQWEsQ0FBRyxlQUFhLENBQUcsQ0FBQSxJQUFHLFdBQVcsQUFBQyxDQUFDLENBQUEsRUFBSSxDQUFBLFVBQVMsRUFBRSxDQUFHLENBQUEsQ0FBQSxFQUFJLENBQUEsVUFBUyxFQUFFLENBQUcsQ0FBQSxDQUFBLEVBQUksQ0FBQSxVQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFHakgsQUFBSSxJQUFBLENBQUEsZ0JBQWUsRUFBSSxHQUFDLENBQUM7QUFDekIsTUFBUyxHQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUssQ0FBQSxJQUFHLE1BQU0sQ0FBRztBQUN0QixBQUFJLE1BQUEsQ0FBQSxJQUFHLEVBQUksQ0FBQSxJQUFHLE1BQU0sQ0FBRSxDQUFBLENBQUMsQ0FBQztBQUN4QixPQUFJLElBQUcsT0FBTyxHQUFLLEtBQUcsQ0FBQSxFQUFLLENBQUEsSUFBRyxRQUFRLEdBQUssS0FBRyxDQUFHO0FBQzdDLHFCQUFlLEtBQUssQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFDO0lBQy9CO0FBQUEsRUFDSjtBQUFBLEFBQ0EsS0FBRyx1QkFBdUIsRUFBSSxDQUFBLGdCQUFlLE9BQU8sQ0FBQztBQUdyRCxBQUFJLElBQUEsQ0FBQSxZQUFXLEVBQUksRUFBQSxDQUFDO0FBQ3BCLE1BQVMsR0FBQSxDQUFBLElBQUcsQ0FBQSxFQUFLLENBQUEsSUFBRyxNQUFNLENBQUc7QUFHekIsT0FBRyxNQUFNLENBQUUsSUFBRyxDQUFDLE9BQU8sQUFBQyxFQUFDLENBQUM7QUFFekIsQUFBSSxNQUFBLENBQUEsVUFBUyxFQUFJLENBQUEsSUFBRyxNQUFNLENBQUUsSUFBRyxDQUFDLFdBQVcsQ0FBQztBQUM1QyxPQUFJLFVBQVMsR0FBSyxLQUFHLENBQUEsRUFBSyxDQUFBLFVBQVMsU0FBUyxHQUFLLE1BQUksQ0FBRztBQUNwRCxjQUFRO0lBQ1o7QUFBQSxBQUVJLE1BQUEsQ0FBQSxjQUFhLEVBQUksS0FBRyxDQUFDO0FBR3pCLFFBQVMsR0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFLLGlCQUFlLENBQUc7QUFDNUIsQUFBSSxRQUFBLENBQUEsSUFBRyxFQUFJLENBQUEsZ0JBQWUsQ0FBRSxDQUFBLENBQUMsQ0FBQztBQUU5QixTQUFJLElBQUcsWUFBWSxDQUFFLElBQUcsQ0FBQyxHQUFLLEtBQUcsQ0FBRztBQUdoQyxXQUFJLGNBQWEsR0FBSyxLQUFHLENBQUc7QUFDeEIsdUJBQWEsRUFBSSxNQUFJLENBQUM7QUFFdEIsbUJBQVMsSUFBSSxBQUFDLEVBQUMsQ0FBQztBQUNoQixhQUFHLE1BQU0sQ0FBRSxJQUFHLENBQUMsWUFBWSxBQUFDLEVBQUMsQ0FBQztBQUc5QixtQkFBUyxRQUFRLEFBQUMsQ0FBQyxJQUFHLENBQUcsZUFBYSxDQUFHLENBQUEsSUFBRyxZQUFZLE1BQU0sQ0FBRyxDQUFBLElBQUcsWUFBWSxPQUFPLENBQUMsQ0FBQztBQUN6RixtQkFBUyxRQUFRLEFBQUMsQ0FBQyxJQUFHLENBQUcsV0FBUyxDQUFHLENBQUEsSUFBRyxZQUFZLE1BQU0sRUFBSSxDQUFBLElBQUcsWUFBWSxPQUFPLENBQUcsSUFBRSxDQUFDLENBQUM7QUFDM0YsbUJBQVMsUUFBUSxBQUFDLENBQUMsSUFBRyxDQUFHLFNBQU8sQ0FBRyxDQUFBLENBQUMsQ0FBQyxDQUFDLEdBQUksS0FBRyxBQUFDLEVBQUMsQ0FBQyxFQUFJLENBQUEsSUFBRyxXQUFXLENBQUMsRUFBSSxLQUFHLENBQUMsQ0FBQztBQUM1RSxtQkFBUyxRQUFRLEFBQUMsQ0FBQyxJQUFHLENBQUcsYUFBVyxDQUFHLENBQUEsSUFBRyxLQUFLLENBQUMsQ0FBQztBQUNqRCxtQkFBUyxRQUFRLEFBQUMsQ0FBQyxJQUFHLENBQUcsZUFBYSxDQUFHLENBQUEsTUFBSyxFQUFFLENBQUcsQ0FBQSxNQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQzVELG1CQUFTLFFBQVEsQUFBQyxDQUFDLElBQUcsQ0FBRyxlQUFhLENBQUcsQ0FBQSxJQUFHLE9BQU8sT0FBTyxDQUFDLENBQUM7QUFDNUQsbUJBQVMsUUFBUSxBQUFDLENBQUMsSUFBRyxDQUFHLHFCQUFtQixDQUFHLGlCQUFlLENBQUMsQ0FBQztBQUNoRSxtQkFBUyxRQUFRLEFBQUMsQ0FBQyxXQUFVLENBQUcsZUFBYSxDQUFHLE1BQUksQ0FBRyxlQUFhLENBQUMsQ0FBQztRQUMxRTtBQUFBLEFBS0EsaUJBQVMsUUFBUSxBQUFDLENBQUMsSUFBRyxDQUFHLGdCQUFjLENBQUcsQ0FBQSxJQUFHLElBQUksRUFBRSxDQUFHLENBQUEsSUFBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBR2pFLFdBQUcsU0FBUyxBQUFDLENBQUMsYUFBWSxDQUFDLENBQUM7QUFDNUIsV0FBRyxVQUFVLEFBQUMsQ0FBQyxhQUFZLENBQUcsY0FBWSxDQUFHLENBQUEsSUFBRyxXQUFXLEFBQUMsQ0FBQyxJQUFHLElBQUksRUFBRSxFQUFJLENBQUEsTUFBSyxFQUFFLENBQUcsQ0FBQSxJQUFHLElBQUksRUFBRSxFQUFJLENBQUEsTUFBSyxFQUFFLENBQUcsRUFBQSxDQUFDLENBQUMsQ0FBQztBQUM5RyxXQUFHLE1BQU0sQUFBQyxDQUFDLGFBQVksQ0FBRyxjQUFZLENBQUcsQ0FBQSxJQUFHLFdBQVcsQUFBQyxDQUFDLElBQUcsS0FBSyxFQUFFLEVBQUksQ0FBQSxLQUFJLFdBQVcsQ0FBRyxDQUFBLENBQUMsQ0FBQSxDQUFBLENBQUksQ0FBQSxJQUFHLEtBQUssRUFBRSxDQUFBLENBQUksQ0FBQSxLQUFJLFdBQVcsQ0FBRyxFQUFBLENBQUMsQ0FBQyxDQUFDO0FBQ2pJLGlCQUFTLFFBQVEsQUFBQyxDQUFDLFdBQVUsQ0FBRyxjQUFZLENBQUcsTUFBSSxDQUFHLGNBQVksQ0FBQyxDQUFDO0FBR3BFLFdBQUcsU0FBUyxBQUFDLENBQUMsY0FBYSxDQUFDLENBQUM7QUFDN0IsV0FBRyxVQUFVLEFBQUMsQ0FBQyxjQUFhLENBQUcsZUFBYSxDQUFHLENBQUEsSUFBRyxXQUFXLEFBQUMsQ0FBQyxJQUFHLElBQUksRUFBRSxDQUFHLENBQUEsSUFBRyxJQUFJLEVBQUUsQ0FBRyxFQUFBLENBQUMsQ0FBQyxDQUFDO0FBQzFGLFdBQUcsTUFBTSxBQUFDLENBQUMsY0FBYSxDQUFHLGVBQWEsQ0FBRyxDQUFBLElBQUcsV0FBVyxBQUFDLENBQUMsSUFBRyxLQUFLLEVBQUUsRUFBSSxDQUFBLEtBQUksV0FBVyxDQUFHLENBQUEsQ0FBQyxDQUFBLENBQUEsQ0FBSSxDQUFBLElBQUcsS0FBSyxFQUFFLENBQUEsQ0FBSSxDQUFBLEtBQUksV0FBVyxDQUFHLEVBQUEsQ0FBQyxDQUFDLENBQUM7QUFDbkksaUJBQVMsUUFBUSxBQUFDLENBQUMsV0FBVSxDQUFHLGVBQWEsQ0FBRyxNQUFJLENBQUcsZUFBYSxDQUFDLENBQUM7QUFHdEUsV0FBRyxZQUFZLENBQUUsSUFBRyxDQUFDLE9BQU8sQUFBQyxFQUFDLENBQUM7QUFDL0IsbUJBQVcsR0FBSyxDQUFBLElBQUcsWUFBWSxDQUFFLElBQUcsQ0FBQyxlQUFlLENBQUM7TUFDekQ7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEFBTUEsS0FBSSxJQUFHLGlCQUFpQixDQUFHO0FBQ3ZCLE9BQUcsaUJBQWlCLEVBQUksTUFBSSxDQUFDO0FBRzdCLE9BQUksSUFBRyxRQUFRLENBQUc7QUFDZCxZQUFNO0lBQ1Y7QUFBQSxBQUdBLEtBQUMsZ0JBQWdCLEFBQUMsQ0FBQyxFQUFDLFlBQVksQ0FBRyxDQUFBLElBQUcsSUFBSSxDQUFDLENBQUM7QUFDNUMsS0FBQyxTQUFTLEFBQUMsQ0FBQyxDQUFBLENBQUcsRUFBQSxDQUFHLENBQUEsSUFBRyxTQUFTLE1BQU0sQ0FBRyxDQUFBLElBQUcsU0FBUyxPQUFPLENBQUMsQ0FBQztBQUM1RCxPQUFHLFdBQVcsQUFBQyxFQUFDLENBQUM7QUFFakIsUUFBSyxJQUFHLEdBQUssQ0FBQSxJQUFHLE1BQU0sQ0FBRztBQUNyQixlQUFTLEVBQUksQ0FBQSxJQUFHLE1BQU0sQ0FBRSxJQUFHLENBQUMscUJBQXFCLENBQUM7QUFDbEQsU0FBSSxVQUFTLEdBQUssS0FBRyxDQUFBLEVBQUssQ0FBQSxVQUFTLFNBQVMsR0FBSyxNQUFJLENBQUc7QUFDcEQsZ0JBQVE7TUFDWjtBQUFBLEFBRUEsbUJBQWEsRUFBSSxLQUFHLENBQUM7QUFHckIsVUFBSyxDQUFBLEdBQUssaUJBQWUsQ0FBRztBQUN4QixXQUFHLEVBQUksQ0FBQSxnQkFBZSxDQUFFLENBQUEsQ0FBQyxDQUFDO0FBRTFCLFdBQUksSUFBRyxZQUFZLENBQUUsSUFBRyxDQUFDLEdBQUssS0FBRyxDQUFHO0FBRWhDLGFBQUksY0FBYSxHQUFLLEtBQUcsQ0FBRztBQUN4Qix5QkFBYSxFQUFJLE1BQUksQ0FBQztBQUV0QixxQkFBUyxJQUFJLEFBQUMsRUFBQyxDQUFDO0FBQ2hCLGVBQUcsTUFBTSxDQUFFLElBQUcsQ0FBQyxZQUFZLEFBQUMsRUFBQyxDQUFDO0FBRTlCLHFCQUFTLFFBQVEsQUFBQyxDQUFDLElBQUcsQ0FBRyxlQUFhLENBQUcsQ0FBQSxJQUFHLFNBQVMsTUFBTSxDQUFHLENBQUEsSUFBRyxTQUFTLE9BQU8sQ0FBQyxDQUFDO0FBQ25GLHFCQUFTLFFBQVEsQUFBQyxDQUFDLElBQUcsQ0FBRyxXQUFTLENBQUcsQ0FBQSxJQUFHLFNBQVMsTUFBTSxFQUFJLENBQUEsSUFBRyxTQUFTLE9BQU8sQ0FBRyxJQUFFLENBQUMsQ0FBQztBQUNyRixxQkFBUyxRQUFRLEFBQUMsQ0FBQyxJQUFHLENBQUcsU0FBTyxDQUFHLENBQUEsQ0FBQyxDQUFDLENBQUMsR0FBSSxLQUFHLEFBQUMsRUFBQyxDQUFDLEVBQUksQ0FBQSxJQUFHLFdBQVcsQ0FBQyxFQUFJLEtBQUcsQ0FBQyxDQUFDO0FBQzVFLHFCQUFTLFFBQVEsQUFBQyxDQUFDLElBQUcsQ0FBRyxhQUFXLENBQUcsQ0FBQSxJQUFHLEtBQUssQ0FBQyxDQUFDO0FBQ2pELHFCQUFTLFFBQVEsQUFBQyxDQUFDLElBQUcsQ0FBRyxlQUFhLENBQUcsQ0FBQSxNQUFLLEVBQUUsQ0FBRyxDQUFBLE1BQUssRUFBRSxDQUFDLENBQUM7QUFDNUQscUJBQVMsUUFBUSxBQUFDLENBQUMsSUFBRyxDQUFHLGVBQWEsQ0FBRyxDQUFBLElBQUcsT0FBTyxPQUFPLENBQUMsQ0FBQztBQUM1RCxxQkFBUyxRQUFRLEFBQUMsQ0FBQyxJQUFHLENBQUcscUJBQW1CLENBQUcsaUJBQWUsQ0FBQyxDQUFDO0FBQ2hFLHFCQUFTLFFBQVEsQUFBQyxDQUFDLFdBQVUsQ0FBRyxlQUFhLENBQUcsTUFBSSxDQUFHLGVBQWEsQ0FBQyxDQUFDO1VBQzFFO0FBQUEsQUFHQSxtQkFBUyxRQUFRLEFBQUMsQ0FBQyxJQUFHLENBQUcsZ0JBQWMsQ0FBRyxDQUFBLElBQUcsSUFBSSxFQUFFLENBQUcsQ0FBQSxJQUFHLElBQUksRUFBRSxDQUFDLENBQUM7QUFHakUsYUFBRyxTQUFTLEFBQUMsQ0FBQyxhQUFZLENBQUMsQ0FBQztBQUM1QixhQUFHLFVBQVUsQUFBQyxDQUFDLGFBQVksQ0FBRyxjQUFZLENBQUcsQ0FBQSxJQUFHLFdBQVcsQUFBQyxDQUFDLElBQUcsSUFBSSxFQUFFLEVBQUksQ0FBQSxNQUFLLEVBQUUsQ0FBRyxDQUFBLElBQUcsSUFBSSxFQUFFLEVBQUksQ0FBQSxNQUFLLEVBQUUsQ0FBRyxFQUFBLENBQUMsQ0FBQyxDQUFDO0FBQzlHLGFBQUcsTUFBTSxBQUFDLENBQUMsYUFBWSxDQUFHLGNBQVksQ0FBRyxDQUFBLElBQUcsV0FBVyxBQUFDLENBQUMsSUFBRyxLQUFLLEVBQUUsRUFBSSxDQUFBLEtBQUksV0FBVyxDQUFHLENBQUEsQ0FBQyxDQUFBLENBQUEsQ0FBSSxDQUFBLElBQUcsS0FBSyxFQUFFLENBQUEsQ0FBSSxDQUFBLEtBQUksV0FBVyxDQUFHLEVBQUEsQ0FBQyxDQUFDLENBQUM7QUFDakksbUJBQVMsUUFBUSxBQUFDLENBQUMsV0FBVSxDQUFHLGNBQVksQ0FBRyxNQUFJLENBQUcsY0FBWSxDQUFDLENBQUM7QUFHcEUsYUFBRyxTQUFTLEFBQUMsQ0FBQyxjQUFhLENBQUMsQ0FBQztBQUM3QixhQUFHLFVBQVUsQUFBQyxDQUFDLGNBQWEsQ0FBRyxlQUFhLENBQUcsQ0FBQSxJQUFHLFdBQVcsQUFBQyxDQUFDLElBQUcsSUFBSSxFQUFFLENBQUcsQ0FBQSxJQUFHLElBQUksRUFBRSxDQUFHLEVBQUEsQ0FBQyxDQUFDLENBQUM7QUFDMUYsYUFBRyxNQUFNLEFBQUMsQ0FBQyxjQUFhLENBQUcsZUFBYSxDQUFHLENBQUEsSUFBRyxXQUFXLEFBQUMsQ0FBQyxJQUFHLEtBQUssRUFBRSxFQUFJLENBQUEsS0FBSSxXQUFXLENBQUcsQ0FBQSxDQUFDLENBQUEsQ0FBQSxDQUFJLENBQUEsSUFBRyxLQUFLLEVBQUUsQ0FBQSxDQUFJLENBQUEsS0FBSSxXQUFXLENBQUcsRUFBQSxDQUFDLENBQUMsQ0FBQztBQUNuSSxtQkFBUyxRQUFRLEFBQUMsQ0FBQyxXQUFVLENBQUcsZUFBYSxDQUFHLE1BQUksQ0FBRyxlQUFhLENBQUMsQ0FBQztBQUd0RSxhQUFHLFlBQVksQ0FBRSxJQUFHLENBQUMsT0FBTyxBQUFDLEVBQUMsQ0FBQztRQUNuQztBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsQUFLQSxPQUFJLElBQUcseUJBQXlCLEdBQUssS0FBRyxDQUFHO0FBQ3ZDLGlCQUFXLEFBQUMsQ0FBQyxJQUFHLHlCQUF5QixDQUFDLENBQUM7SUFDL0M7QUFBQSxBQUNBLE9BQUcseUJBQXlCLEVBQUksQ0FBQSxVQUFTLEFBQUMsQ0FDdEMsSUFBRyxvQkFBb0IsS0FBSyxBQUFDLENBQUMsSUFBRyxDQUFDLENBQ2xDLENBQUEsSUFBRyxzQkFBc0IsQ0FDN0IsQ0FBQztBQUdELEtBQUMsZ0JBQWdCLEFBQUMsQ0FBQyxFQUFDLFlBQVksQ0FBRyxLQUFHLENBQUMsQ0FBQztBQUN4QyxLQUFDLFNBQVMsQUFBQyxDQUFDLENBQUEsQ0FBRyxFQUFBLENBQUcsQ0FBQSxJQUFHLE9BQU8sTUFBTSxDQUFHLENBQUEsSUFBRyxPQUFPLE9BQU8sQ0FBQyxDQUFDO0VBQzVEO0FBQUEsQUFFQSxLQUFJLFlBQVcsR0FBSyxDQUFBLElBQUcsa0JBQWtCLENBQUc7QUFDeEMsVUFBTSxJQUFJLEFBQUMsQ0FBQyxXQUFVLEVBQUksYUFBVyxDQUFBLENBQUksY0FBWSxDQUFDLENBQUM7RUFDM0Q7QUFBQSxBQUNBLEtBQUcsa0JBQWtCLEVBQUksYUFBVyxDQUFDO0FBRXJDLE9BQU8sS0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUlELElBQUksVUFBVSxhQUFhLEVBQUksVUFBVSxLQUFJLENBQUcsQ0FBQSxRQUFPLENBQ3ZEO0FBQ0ksS0FBSSxDQUFDLElBQUcsWUFBWSxDQUFHO0FBQ25CLFVBQU07RUFDVjtBQUFBLEFBR0EsS0FBSSxJQUFHLGlCQUFpQixHQUFLLEtBQUcsQ0FBRztBQUMvQixVQUFNO0VBQ1Y7QUFBQSxBQUVBLEtBQUcsZ0JBQWdCLEVBQUksQ0FBQSxLQUFJLEFBQUMsQ0FDeEIsS0FBSSxFQUFFLEVBQUksQ0FBQSxJQUFHLG1CQUFtQixDQUNoQyxDQUFBLElBQUcsWUFBWSxPQUFPLEVBQUksRUFBQyxLQUFJLEVBQUUsRUFBSSxDQUFBLElBQUcsbUJBQW1CLENBQUMsQ0FDaEUsQ0FBQztBQUNELEtBQUcsbUJBQW1CLEVBQUksU0FBTyxDQUFDO0FBQ2xDLEtBQUcsaUJBQWlCLEVBQUksS0FBRyxDQUFDO0FBQzVCLEtBQUcsTUFBTSxFQUFJLEtBQUcsQ0FBQztBQUNyQixDQUFDO0FBRUQsSUFBSSxVQUFVLG9CQUFvQixFQUFJLFVBQVMsQUFBQyxDQUNoRDtBQUNJLEFBQUksSUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLElBQUcsR0FBRyxDQUFDO0FBRWhCLEdBQUMsZ0JBQWdCLEFBQUMsQ0FBQyxFQUFDLFlBQVksQ0FBRyxDQUFBLElBQUcsSUFBSSxDQUFDLENBQUM7QUFHNUMsR0FBQyxXQUFXLEFBQUMsQ0FDVCxJQUFHLE1BQU0sQUFBQyxDQUFDLElBQUcsZ0JBQWdCLEVBQUUsRUFBSSxDQUFBLElBQUcsU0FBUyxNQUFNLENBQUEsQ0FBSSxDQUFBLElBQUcsWUFBWSxNQUFNLENBQUMsQ0FDaEYsQ0FBQSxJQUFHLE1BQU0sQUFBQyxDQUFDLElBQUcsZ0JBQWdCLEVBQUUsRUFBSSxDQUFBLElBQUcsU0FBUyxPQUFPLENBQUEsQ0FBSSxDQUFBLElBQUcsWUFBWSxPQUFPLENBQUMsQ0FDbEYsRUFBQSxDQUFHLEVBQUEsQ0FBRyxDQUFBLEVBQUMsS0FBSyxDQUFHLENBQUEsRUFBQyxjQUFjLENBQUcsQ0FBQSxJQUFHLE1BQU0sQ0FBQyxDQUFDO0FBQ2hELEFBQUksSUFBQSxDQUFBLFdBQVUsRUFBSSxDQUFBLENBQUMsSUFBRyxNQUFNLENBQUUsQ0FBQSxDQUFDLEVBQUksRUFBQyxJQUFHLE1BQU0sQ0FBRSxDQUFBLENBQUMsR0FBSyxFQUFBLENBQUMsQ0FBQSxDQUFJLEVBQUMsSUFBRyxNQUFNLENBQUUsQ0FBQSxDQUFDLEdBQUssR0FBQyxDQUFDLENBQUEsQ0FBSSxFQUFDLElBQUcsTUFBTSxDQUFFLENBQUEsQ0FBQyxHQUFLLEdBQUMsQ0FBQyxDQUFDLElBQU0sRUFBQSxDQUFDO0FBUTlHLEFBQUksSUFBQSxDQUFBLFNBQVEsRUFBSSxDQUFBLElBQUcsTUFBTSxDQUFFLENBQUEsQ0FBQyxDQUFDO0FBQzdCLEtBQUksU0FBUSxHQUFLLElBQUUsQ0FBRztBQUVsQixPQUFJLElBQUcsUUFBUSxDQUFFLFNBQVEsQ0FBQyxHQUFLLEtBQUcsQ0FBRztBQUVqQyxTQUFHLFFBQVEsQ0FBRSxTQUFRLENBQUMsWUFBWSxBQUFDLENBQUM7QUFDaEMsV0FBRyxDQUFHLHNCQUFvQjtBQUMxQixVQUFFLENBQUcsWUFBVTtBQUFBLE1BQ25CLENBQUMsQ0FBQztJQUNOO0FBQUEsRUFDSjtBQUFBLEFBRUEsR0FBQyxnQkFBZ0IsQUFBQyxDQUFDLEVBQUMsWUFBWSxDQUFHLEtBQUcsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFHRCxJQUFJLFVBQVUsMEJBQTBCLEVBQUksVUFBVSxLQUFJLENBQzFEO0FBQ0ksS0FBSSxLQUFJLEtBQUssS0FBSyxHQUFLLHNCQUFvQixDQUFHO0FBQzFDLFVBQU07RUFDVjtBQUFBLEFBRUksSUFBQSxDQUFBLE9BQU0sRUFBSSxDQUFBLEtBQUksS0FBSyxRQUFRLENBQUM7QUFDaEMsQUFBSSxJQUFBLENBQUEsT0FBTSxFQUFJLE1BQUksQ0FBQztBQUNuQixLQUFJLENBQUMsT0FBTSxHQUFLLEtBQUcsQ0FBQSxFQUFLLENBQUEsSUFBRyxpQkFBaUIsR0FBSyxLQUFHLENBQUMsR0FDakQsRUFBQyxPQUFNLEdBQUssS0FBRyxDQUFBLEVBQUssQ0FBQSxJQUFHLGlCQUFpQixHQUFLLEtBQUcsQ0FBQyxDQUFBLEVBQ2pELEVBQUMsT0FBTSxHQUFLLEtBQUcsQ0FBQSxFQUFLLENBQUEsSUFBRyxpQkFBaUIsR0FBSyxLQUFHLENBQUEsRUFBSyxDQUFBLE9BQU0sR0FBRyxHQUFLLENBQUEsSUFBRyxpQkFBaUIsR0FBRyxDQUFDLENBQUc7QUFDOUYsVUFBTSxFQUFJLEtBQUcsQ0FBQztFQUNsQjtBQUFBLEFBRUEsS0FBRyxpQkFBaUIsRUFBSSxRQUFNLENBQUM7QUFFL0IsS0FBSSxNQUFPLEtBQUcsbUJBQW1CLENBQUEsRUFBSyxXQUFTLENBQUc7QUFDOUMsT0FBRyxtQkFBbUIsQUFBQyxDQUFDO0FBQUUsWUFBTSxDQUFHLENBQUEsSUFBRyxpQkFBaUI7QUFBRyxZQUFNLENBQUcsUUFBTTtBQUFBLElBQUUsQ0FBQyxDQUFDO0VBQ2pGO0FBQUEsQUFDSixDQUFDO0FBR0QsSUFBSSxVQUFVLFNBQVMsRUFBSSxVQUFVLE1BQUssQ0FBRyxDQUFBLEdBQUUsQ0FBRyxDQUFBLFFBQU8sQ0FDekQ7QUFDSSxLQUFHLGFBQWEsQ0FBRSxJQUFHLGFBQWEsT0FBTyxDQUFDLEVBQUksVUFBUSxDQUFDO0FBQzNELENBQUM7QUFHRCxJQUFJLFVBQVUsZ0JBQWdCLEVBQUksVUFBUyxBQUFDLENBQzVDO0FBQ0ksS0FBSSxDQUFDLElBQUcsWUFBWSxDQUFHO0FBQ25CLFVBQU07RUFDVjtBQUFBLEFBRUEsS0FBSSxJQUFHLGFBQWEsT0FBTyxHQUFLLEVBQUEsQ0FBRztBQUMvQixVQUFNO0VBQ1Y7QUFBQSxBQUVBLE1BQVMsR0FBQSxDQUFBLENBQUEsRUFBRSxFQUFBLENBQUcsQ0FBQSxDQUFBLEVBQUksQ0FBQSxJQUFHLGFBQWEsT0FBTyxDQUFHLENBQUEsQ0FBQSxFQUFFLENBQUc7QUFDN0MsT0FBRyxVQUFVLE1BQU0sQUFBQyxDQUFDLElBQUcsQ0FBRyxDQUFBLElBQUcsYUFBYSxDQUFFLENBQUEsQ0FBQyxDQUFDLENBQUM7RUFDcEQ7QUFBQSxBQUVBLEtBQUcsYUFBYSxFQUFJLEdBQUMsQ0FBQztBQUMxQixDQUFDO0FBR0QsSUFBSSxVQUFVLFVBQVUsRUFBSSxVQUFVLE1BQUssQ0FBRyxDQUFBLEdBQUUsQ0FBRyxDQUFBLFFBQU8sQ0FDMUQ7QUFFSSxLQUFJLE1BQUssRUFBRSxFQUFJLENBQUEsSUFBRyxZQUFZLFNBQVMsQ0FBRztBQUN0QyxBQUFJLE1BQUEsQ0FBQSxJQUFHLEVBQUksQ0FBQSxNQUFLLEVBQUUsRUFBSSxDQUFBLElBQUcsWUFBWSxTQUFTLENBQUM7QUFFL0MsU0FBSyxFQUFFLEVBQUksRUFBQyxDQUFDLENBQUMsTUFBSyxFQUFFLEVBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFDLENBQUEsQ0FBRyxLQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzNDLFNBQUssRUFBRSxFQUFJLEVBQUMsQ0FBQyxDQUFDLE1BQUssRUFBRSxFQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBQyxDQUFBLENBQUcsS0FBRyxDQUFDLENBQUMsQ0FBQztBQUMzQyxTQUFLLFVBQVUsRUFBSSxDQUFBLE1BQUssRUFBRSxDQUFDO0FBQzNCLFNBQUssRUFBRSxHQUFLLEtBQUcsQ0FBQztFQUVwQjtBQUFBLEFBRUEsS0FBRyxzQkFBc0IsQUFBQyxFQUFDLENBQUM7QUFFNUIsQUFBSSxJQUFBLENBQUEsR0FBRSxFQUFJLENBQUEsQ0FBQyxNQUFLLEVBQUUsQ0FBRyxDQUFBLE1BQUssRUFBRSxDQUFHLENBQUEsTUFBSyxFQUFFLENBQUMsS0FBSyxBQUFDLENBQUMsR0FBRSxDQUFDLENBQUM7QUFHbEQsS0FBSSxJQUFHLE1BQU0sQ0FBRSxHQUFFLENBQUMsQ0FBRztBQVFqQixPQUFJLFFBQU8sQ0FBRztBQUNWLGFBQU8sQUFBQyxDQUFDLElBQUcsQ0FBRyxJQUFFLENBQUMsQ0FBQztJQUN2QjtBQUFBLEFBQ0EsVUFBTTtFQUNWO0FBQUEsQUFFSSxJQUFBLENBQUEsSUFBRyxFQUFJLENBQUEsSUFBRyxNQUFNLENBQUUsR0FBRSxDQUFDLEVBQUksR0FBQyxDQUFDO0FBQy9CLEtBQUcsSUFBSSxFQUFJLElBQUUsQ0FBQztBQUNkLEtBQUcsT0FBTyxFQUFJLE9BQUssQ0FBQztBQUNwQixLQUFHLElBQUksRUFBSSxDQUFBLEdBQUUsY0FBYyxBQUFDLENBQUMsSUFBRyxPQUFPLENBQUMsQ0FBQztBQUN6QyxLQUFHLElBQUksRUFBSSxDQUFBLEdBQUUsY0FBYyxBQUFDLENBQUM7QUFBRSxJQUFBLENBQUcsQ0FBQSxJQUFHLE9BQU8sRUFBRSxFQUFJLEVBQUE7QUFBRyxJQUFBLENBQUcsQ0FBQSxJQUFHLE9BQU8sRUFBRSxFQUFJLEVBQUE7QUFBRyxJQUFBLENBQUcsQ0FBQSxJQUFHLE9BQU8sRUFBRTtBQUFBLEVBQUUsQ0FBQyxDQUFDO0FBQzlGLEtBQUcsS0FBSyxFQUFJO0FBQUUsSUFBQSxDQUFHLEVBQUMsSUFBRyxJQUFJLEVBQUUsRUFBSSxDQUFBLElBQUcsSUFBSSxFQUFFLENBQUM7QUFBRyxJQUFBLENBQUcsRUFBQyxJQUFHLElBQUksRUFBRSxFQUFJLENBQUEsSUFBRyxJQUFJLEVBQUUsQ0FBQztBQUFBLEVBQUUsQ0FBQztBQUMxRSxLQUFHLE9BQU8sRUFBSTtBQUFFLEtBQUMsQ0FBRztBQUFFLE1BQUEsQ0FBRyxDQUFBLElBQUcsSUFBSSxFQUFFO0FBQUcsTUFBQSxDQUFHLENBQUEsSUFBRyxJQUFJLEVBQUU7QUFBQSxJQUFFO0FBQUcsS0FBQyxDQUFHO0FBQUUsTUFBQSxDQUFHLENBQUEsSUFBRyxJQUFJLEVBQUU7QUFBRyxNQUFBLENBQUcsQ0FBQSxJQUFHLElBQUksRUFBRTtBQUFBLElBQUU7QUFBQSxFQUFFLENBQUM7QUFDNUYsS0FBRyxNQUFNLEVBQUksR0FBQyxDQUFDO0FBQ2YsS0FBRyxRQUFRLEVBQUksS0FBRyxDQUFDO0FBQ25CLEtBQUcsT0FBTyxFQUFJLE1BQUksQ0FBQztBQUVuQixLQUFHLFVBQVUsQUFBQyxDQUFDLElBQUcsSUFBSSxDQUFDLENBQUM7QUFDeEIsS0FBRyxrQkFBa0IsQUFBQyxDQUFDLElBQUcsQ0FBRyxJQUFFLENBQUMsQ0FBQztBQUNqQyxLQUFHLHdCQUF3QixBQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7QUFFbEMsS0FBSSxRQUFPLENBQUc7QUFDVixXQUFPLEFBQUMsQ0FBQyxJQUFHLENBQUcsSUFBRSxDQUFDLENBQUM7RUFDdkI7QUFBQSxBQUNKLENBQUM7QUFJRCxJQUFJLFVBQVUsYUFBYSxFQUFJLFVBQVMsQUFBQzs7QUFFckMsS0FBSSxDQUFDLElBQUcsWUFBWSxDQUFHO0FBQ25CLFVBQU07RUFDVjtBQUFBLEFBR0EsS0FBRyxrQkFBa0IsRUFBSSxDQUFBLEtBQUksdUJBQXVCLEFBQUMsQ0FBQyxJQUFHLE9BQU8sQ0FBQyxDQUFDO0FBQ2xFLEtBQUcsa0JBQWtCLEVBQUksQ0FBQSxLQUFJLHVCQUF1QixBQUFDLENBQUMsSUFBRyxPQUFPLENBQUMsQ0FBQztBQUNsRSxLQUFHLGNBQWMsRUFBSSxHQUFDLENBQUM7QUFHdkIsS0FBRyxRQUFRLFFBQVEsQUFBQyxFQUFDLFNBQUEsTUFBSyxDQUFLO0FBQzNCLFNBQUssWUFBWSxBQUFDLENBQUM7QUFDZixTQUFHLENBQUcsb0JBQWtCO0FBQ3hCLFdBQUssQ0FBRyx1QkFBcUI7QUFDN0IsV0FBSyxDQUFHLHVCQUFxQjtBQUFBLElBQ2pDLENBQUMsQ0FBQztFQUNOLEVBQUMsQ0FBQztBQUlGLEFBQUksSUFBQSxDQUFBLE9BQU0sRUFBSSxHQUFDO0FBQUcsY0FBUSxFQUFJLEdBQUMsQ0FBQztBQUNoQyxNQUFTLEdBQUEsQ0FBQSxDQUFBLENBQUEsRUFBSyxDQUFBLElBQUcsTUFBTSxDQUFHO0FBQ3RCLE9BQUksSUFBRyxNQUFNLENBQUUsQ0FBQSxDQUFDLFFBQVEsR0FBSyxLQUFHLENBQUc7QUFDL0IsWUFBTSxLQUFLLEFBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNuQixLQUNLO0FBQ0QsY0FBUSxLQUFLLEFBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNyQjtBQUFBLEVBQ0o7QUFBQSxBQUdBLFFBQU0sS0FBSyxBQUFDLEVBQUMsU0FBQyxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQU07QUFHbkIsQUFBSSxNQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsVUFBUyxDQUFFLENBQUEsQ0FBQyxZQUFZLENBQUM7QUFDbEMsQUFBSSxNQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsVUFBUyxDQUFFLENBQUEsQ0FBQyxZQUFZLENBQUM7QUFDbEMsU0FBTyxFQUFDLEVBQUMsRUFBSSxHQUFDLENBQUEsQ0FBSSxFQUFDLENBQUEsQ0FBQSxDQUFJLEVBQUMsRUFBQyxHQUFLLEdBQUMsQ0FBQSxDQUFJLEVBQUEsRUFBSSxFQUFBLENBQUMsQ0FBQyxDQUFDO0VBQzlDLEVBQUMsQ0FBQztBQUdGLE1BQVMsR0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFLLFFBQU0sQ0FBRztBQUNuQixPQUFHLFVBQVUsQUFBQyxDQUFDLE9BQU0sQ0FBRSxDQUFBLENBQUMsQ0FBQyxDQUFDO0VBQzlCO0FBQUEsQUFHQSxNQUFTLEdBQUEsQ0FBQSxDQUFBLENBQUEsRUFBSyxVQUFRLENBQUc7QUFFckIsT0FBSSxJQUFHLGFBQWEsQUFBQyxDQUFDLElBQUcsTUFBTSxDQUFFLFNBQVEsQ0FBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUEsRUFBSyxLQUFHLENBQUc7QUFDckQsU0FBRyxVQUFVLEFBQUMsQ0FBQyxTQUFRLENBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQztJQUNoQyxLQUVLO0FBQ0QsU0FBRyxXQUFXLEFBQUMsQ0FBQyxTQUFRLENBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQztJQUNqQztBQUFBLEVBQ0o7QUFBQSxBQUVBLEtBQUcsa0JBQWtCLEFBQUMsRUFBQyxDQUFDO0FBQ3hCLEtBQUcsVUFBVSxBQUFDLEVBQUMsQ0FBQztBQUNwQixDQUFDO0FBRUQsSUFBSSxVQUFVLFVBQVUsRUFBSSxVQUFTLEdBQUUsQ0FDdkM7QUFDSSxBQUFJLElBQUEsQ0FBQSxJQUFHLEVBQUksQ0FBQSxJQUFHLE1BQU0sQ0FBRSxHQUFFLENBQUMsQ0FBQztBQUUxQixLQUFHLHlCQUF5QixBQUFDLENBQUMsSUFBRyxDQUFHO0FBQ2hDLE9BQUcsQ0FBRyxZQUFVO0FBQ2hCLE9BQUcsQ0FBRztBQUNGLFFBQUUsQ0FBRyxDQUFBLElBQUcsSUFBSTtBQUNaLFdBQUssQ0FBRyxDQUFBLElBQUcsT0FBTztBQUNsQixRQUFFLENBQUcsQ0FBQSxJQUFHLElBQUk7QUFDWixRQUFFLENBQUcsQ0FBQSxJQUFHLElBQUk7QUFDWixVQUFJLENBQUcsQ0FBQSxJQUFHLE1BQU07QUFBQSxJQUNwQjtBQUNBLGNBQVUsQ0FBRyxDQUFBLElBQUcsWUFBWTtBQUM1QixTQUFLLENBQUcsQ0FBQSxJQUFHLGtCQUFrQjtBQUM3QixTQUFLLENBQUcsQ0FBQSxJQUFHLGtCQUFrQjtBQUFBLEVBQ2pDLENBQUMsQ0FBQztBQUNOLENBQUM7QUFJRCxJQUFJLFFBQVEsRUFBSSxVQUFVLElBQUcsQ0FBRyxDQUFBLE1BQUssQ0FBRyxDQUFBLE1BQUssQ0FBRyxDQUFBLEtBQUksQ0FDcEQ7QUFDSSxBQUFJLElBQUEsQ0FBQSxLQUFJO0FBQUcsVUFBSTtBQUFHLFlBQU07QUFBRyxNQUFBO0FBQUcsU0FBRyxDQUFDO0FBQ2xDLEFBQUksSUFBQSxDQUFBLFdBQVUsRUFBSSxHQUFDLENBQUM7QUFRcEIsS0FBRyxNQUFNLFNBQVMsRUFBSSxFQUFBLENBQUM7QUFDdkIsTUFBUyxHQUFBLENBQUEsU0FBUSxFQUFFLEVBQUEsQ0FBRyxDQUFBLFNBQVEsRUFBSSxDQUFBLE1BQUssT0FBTyxDQUFHLENBQUEsU0FBUSxFQUFFLENBQUc7QUFDMUQsUUFBSSxFQUFJLENBQUEsTUFBSyxDQUFFLFNBQVEsQ0FBQyxDQUFDO0FBR3pCLE9BQUksTUFBSyxPQUFPLENBQUUsS0FBSSxLQUFLLENBQUMsR0FBSyxLQUFHLENBQUEsRUFBSyxDQUFBLE1BQUssT0FBTyxDQUFFLEtBQUksS0FBSyxDQUFDLFFBQVEsR0FBSyxNQUFJLENBQUc7QUFDakYsY0FBUTtJQUNaO0FBQUEsQUFFQSxPQUFJLElBQUcsT0FBTyxDQUFFLEtBQUksS0FBSyxDQUFDLEdBQUssS0FBRyxDQUFHO0FBQ2pDLEFBQUksUUFBQSxDQUFBLFlBQVcsRUFBSSxDQUFBLElBQUcsT0FBTyxDQUFFLEtBQUksS0FBSyxDQUFDLFNBQVMsT0FBTyxDQUFDO0FBRzFELFVBQVMsR0FBQSxDQUFBLENBQUEsRUFBSSxDQUFBLFlBQVcsRUFBRSxFQUFBLENBQUcsQ0FBQSxDQUFBLEdBQUssRUFBQSxDQUFHLENBQUEsQ0FBQSxFQUFFLENBQUc7QUFDdEMsY0FBTSxFQUFJLENBQUEsSUFBRyxPQUFPLENBQUUsS0FBSSxLQUFLLENBQUMsU0FBUyxDQUFFLENBQUEsQ0FBQyxDQUFDO0FBQzdDLFlBQUksRUFBSSxDQUFBLEtBQUkscUJBQXFCLEFBQUMsQ0FBQyxPQUFNLENBQUcsQ0FBQSxLQUFJLEtBQUssQ0FBRyxDQUFBLE1BQUssT0FBTyxDQUFFLEtBQUksS0FBSyxDQUFDLENBQUcsS0FBRyxD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Q0FBRSxDQUFBLENBQUMsRUFBSSxDQUFBLEVBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBQyxDQUNoQyxDQUFBLENBQUMsRUFBQyxDQUFFLENBQUEsQ0FBQyxFQUFJLENBQUEsRUFBQyxDQUFFLENBQUEsQ0FBQyxDQUFDLEVBQUksRUFBQyxFQUFDLENBQUUsQ0FBQSxDQUFDLEVBQUksQ0FBQSxFQUFDLENBQUUsQ0FBQSxDQUFDLENBQUMsQ0FDcEMsQ0FBQztBQUNMLENBQUM7QUFLRCxLQUFLLGlCQUFpQixFQUFJLFVBQVUsRUFBQyxDQUFHLENBQUEsRUFBQyxDQUFHLENBQUEsRUFBQyxDQUFHLENBQUEsRUFBQyxDQUFHLENBQUEsa0JBQWlCLENBQ3JFO0FBQ0ksQUFBSSxJQUFBLENBQUEsa0JBQWlCLEVBQUksQ0FBQSxrQkFBaUIsR0FBSyxLQUFHLENBQUM7QUFJbkQsQUFBSSxJQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsRUFBQyxDQUFFLENBQUEsQ0FBQyxFQUFJLENBQUEsRUFBQyxDQUFFLENBQUEsQ0FBQyxDQUFDO0FBQ3RCLEFBQUksSUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLEVBQUMsQ0FBRSxDQUFBLENBQUMsRUFBSSxDQUFBLEVBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBQztBQUN0QixBQUFJLElBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxFQUFDLENBQUUsQ0FBQSxDQUFDLEVBQUksQ0FBQSxFQUFDLENBQUUsQ0FBQSxDQUFDLENBQUM7QUFDdEIsQUFBSSxJQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsRUFBQyxDQUFFLENBQUEsQ0FBQyxFQUFJLENBQUEsRUFBQyxDQUFFLENBQUEsQ0FBQyxDQUFDO0FBQ3RCLEFBQUksSUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLENBQUMsRUFBQyxDQUFFLENBQUEsQ0FBQyxFQUFJLENBQUEsRUFBQyxDQUFFLENBQUEsQ0FBQyxDQUFDLEVBQUksRUFBQyxFQUFDLENBQUUsQ0FBQSxDQUFDLEVBQUksQ0FBQSxFQUFDLENBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQztBQUMxQyxBQUFJLElBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxDQUFDLEVBQUMsQ0FBRSxDQUFBLENBQUMsRUFBSSxDQUFBLEVBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBQyxFQUFJLEVBQUMsRUFBQyxDQUFFLENBQUEsQ0FBQyxFQUFJLENBQUEsRUFBQyxDQUFFLENBQUEsQ0FBQyxDQUFDLENBQUM7QUFDMUMsQUFBSSxJQUFBLENBQUEsS0FBSSxFQUFJLENBQUEsQ0FBQyxFQUFDLEVBQUksR0FBQyxDQUFDLEVBQUksRUFBQyxFQUFDLEVBQUksR0FBQyxDQUFDLENBQUM7QUFFakMsS0FBSSxJQUFHLElBQUksQUFBQyxDQUFDLEtBQUksQ0FBQyxDQUFBLENBQUksbUJBQWlCLENBQUc7QUFDdEMsU0FBTyxFQUNILENBQUMsQ0FBQyxFQUFDLEVBQUksR0FBQyxDQUFDLEVBQUksRUFBQyxFQUFDLEVBQUksR0FBQyxDQUFDLENBQUMsRUFBSSxNQUFJLENBQzlCLENBQUEsQ0FBQyxDQUFDLEVBQUMsRUFBSSxHQUFDLENBQUMsRUFBSSxFQUFDLEVBQUMsRUFBSSxHQUFDLENBQUMsQ0FBQyxFQUFJLE1BQUksQ0FDbEMsQ0FBQztFQUNMO0FBQUEsQUFDQSxPQUFPLEtBQUcsQ0FBQztBQUNmLENBQUM7QUFFRCxHQUFJLE1BQUssSUFBTSxVQUFRLENBQUc7QUFDdEIsT0FBSyxRQUFRLEVBQUksT0FBSyxDQUFDO0FBQzNCO0FBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IGdsLW1hdHJpeCAtIEhpZ2ggcGVyZm9ybWFuY2UgbWF0cml4IGFuZCB2ZWN0b3Igb3BlcmF0aW9uc1xuICogQGF1dGhvciBCcmFuZG9uIEpvbmVzXG4gKiBAYXV0aG9yIENvbGluIE1hY0tlbnppZSBJVlxuICogQHZlcnNpb24gMi4yLjFcbiAqL1xuXG4vKiBDb3B5cmlnaHQgKGMpIDIwMTMsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbmFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcblxuICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICAgIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uXG4gICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkVcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SXG5BTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbihJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbkxPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbihJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS4gKi9cblxuXG4oZnVuY3Rpb24oX2dsb2JhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgc2hpbSA9IHt9O1xuICBpZiAodHlwZW9mKGV4cG9ydHMpID09PSAndW5kZWZpbmVkJykge1xuICAgIGlmKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICBzaGltLmV4cG9ydHMgPSB7fTtcbiAgICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHNoaW0uZXhwb3J0cztcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBnbC1tYXRyaXggbGl2ZXMgaW4gYSBicm93c2VyLCBkZWZpbmUgaXRzIG5hbWVzcGFjZXMgaW4gZ2xvYmFsXG4gICAgICBzaGltLmV4cG9ydHMgPSB0eXBlb2Yod2luZG93KSAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBfZ2xvYmFsO1xuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICAvLyBnbC1tYXRyaXggbGl2ZXMgaW4gY29tbW9uanMsIGRlZmluZSBpdHMgbmFtZXNwYWNlcyBpbiBleHBvcnRzXG4gICAgc2hpbS5leHBvcnRzID0gZXhwb3J0cztcbiAgfVxuXG4gIChmdW5jdGlvbihleHBvcnRzKSB7XG4gICAgLyogQ29weXJpZ2h0IChjKSAyMDEzLCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG5hcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAgICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBcbiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG5BTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SXG5BTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbihJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbkxPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbihJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS4gKi9cblxuXG5pZighR0xNQVRfRVBTSUxPTikge1xuICAgIHZhciBHTE1BVF9FUFNJTE9OID0gMC4wMDAwMDE7XG59XG5cbmlmKCFHTE1BVF9BUlJBWV9UWVBFKSB7XG4gICAgdmFyIEdMTUFUX0FSUkFZX1RZUEUgPSAodHlwZW9mIEZsb2F0MzJBcnJheSAhPT0gJ3VuZGVmaW5lZCcpID8gRmxvYXQzMkFycmF5IDogQXJyYXk7XG59XG5cbmlmKCFHTE1BVF9SQU5ET00pIHtcbiAgICB2YXIgR0xNQVRfUkFORE9NID0gTWF0aC5yYW5kb207XG59XG5cbi8qKlxuICogQGNsYXNzIENvbW1vbiB1dGlsaXRpZXNcbiAqIEBuYW1lIGdsTWF0cml4XG4gKi9cbnZhciBnbE1hdHJpeCA9IHt9O1xuXG4vKipcbiAqIFNldHMgdGhlIHR5cGUgb2YgYXJyYXkgdXNlZCB3aGVuIGNyZWF0aW5nIG5ldyB2ZWN0b3JzIGFuZCBtYXRyaWNpZXNcbiAqXG4gKiBAcGFyYW0ge1R5cGV9IHR5cGUgQXJyYXkgdHlwZSwgc3VjaCBhcyBGbG9hdDMyQXJyYXkgb3IgQXJyYXlcbiAqL1xuZ2xNYXRyaXguc2V0TWF0cml4QXJyYXlUeXBlID0gZnVuY3Rpb24odHlwZSkge1xuICAgIEdMTUFUX0FSUkFZX1RZUEUgPSB0eXBlO1xufVxuXG5pZih0eXBlb2YoZXhwb3J0cykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZXhwb3J0cy5nbE1hdHJpeCA9IGdsTWF0cml4O1xufVxuXG52YXIgZGVncmVlID0gTWF0aC5QSSAvIDE4MDtcblxuLyoqXG4qIENvbnZlcnQgRGVncmVlIFRvIFJhZGlhblxuKlxuKiBAcGFyYW0ge051bWJlcn0gQW5nbGUgaW4gRGVncmVlc1xuKi9cbmdsTWF0cml4LnRvUmFkaWFuID0gZnVuY3Rpb24oYSl7XG4gICAgIHJldHVybiBhICogZGVncmVlO1xufVxuO1xuLyogQ29weXJpZ2h0IChjKSAyMDEzLCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG5hcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAgICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBcbiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG5BTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SXG5BTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbihJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbkxPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbihJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS4gKi9cblxuLyoqXG4gKiBAY2xhc3MgMiBEaW1lbnNpb25hbCBWZWN0b3JcbiAqIEBuYW1lIHZlYzJcbiAqL1xuXG52YXIgdmVjMiA9IHt9O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcsIGVtcHR5IHZlYzJcbiAqXG4gKiBAcmV0dXJucyB7dmVjMn0gYSBuZXcgMkQgdmVjdG9yXG4gKi9cbnZlYzIuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDIpO1xuICAgIG91dFswXSA9IDA7XG4gICAgb3V0WzFdID0gMDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzIgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdmVjdG9yIHRvIGNsb25lXG4gKiBAcmV0dXJucyB7dmVjMn0gYSBuZXcgMkQgdmVjdG9yXG4gKi9cbnZlYzIuY2xvbmUgPSBmdW5jdGlvbihhKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDIpO1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzIgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjMn0gYSBuZXcgMkQgdmVjdG9yXG4gKi9cbnZlYzIuZnJvbVZhbHVlcyA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoMik7XG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSB2ZWMyIHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBzb3VyY2UgdmVjdG9yXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIuY29weSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyIHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIuc2V0ID0gZnVuY3Rpb24ob3V0LCB4LCB5KSB7XG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFkZHMgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5hZGQgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgdmVjdG9yIGIgZnJvbSB2ZWN0b3IgYVxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5zdWJ0cmFjdCA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5zdWJ0cmFjdH1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMyLnN1YiA9IHZlYzIuc3VidHJhY3Q7XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLm11bHRpcGx5ID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAqIGJbMV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzIubXVsID0gdmVjMi5tdWx0aXBseTtcblxuLyoqXG4gKiBEaXZpZGVzIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIuZGl2aWRlID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAvIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAvIGJbMV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLmRpdmlkZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMyLmRpdiA9IHZlYzIuZGl2aWRlO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG1pbmltdW0gb2YgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5taW4gPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBNYXRoLm1pbihhWzBdLCBiWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLm1pbihhWzFdLCBiWzFdKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtYXhpbXVtIG9mIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIubWF4ID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gTWF0aC5tYXgoYVswXSwgYlswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5tYXgoYVsxXSwgYlsxXSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2NhbGVzIGEgdmVjMiBieSBhIHNjYWxhciBudW1iZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSB2ZWN0b3IgdG8gc2NhbGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIuc2NhbGUgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYjtcbiAgICBvdXRbMV0gPSBhWzFdICogYjtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWMyJ3MgYWZ0ZXIgc2NhbGluZyB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiIGJ5IGJlZm9yZSBhZGRpbmdcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5zY2FsZUFuZEFkZCA9IGZ1bmN0aW9uKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgKGJbMF0gKiBzY2FsZSk7XG4gICAgb3V0WzFdID0gYVsxXSArIChiWzFdICogc2NhbGUpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG52ZWMyLmRpc3RhbmNlID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICAgIHkgPSBiWzFdIC0gYVsxXTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHgqeCArIHkqeSk7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5kaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMyLmRpc3QgPSB2ZWMyLmRpc3RhbmNlO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xudmVjMi5zcXVhcmVkRGlzdGFuY2UgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgICAgeSA9IGJbMV0gLSBhWzFdO1xuICAgIHJldHVybiB4KnggKyB5Knk7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5zcXVhcmVkRGlzdGFuY2V9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMi5zcXJEaXN0ID0gdmVjMi5zcXVhcmVkRGlzdGFuY2U7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgdmVjMlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gbGVuZ3RoIG9mIGFcbiAqL1xudmVjMi5sZW5ndGggPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV07XG4gICAgcmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkpO1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIubGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzIubGVuID0gdmVjMi5sZW5ndGg7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgbGVuZ3RoIG9mIGFcbiAqL1xudmVjMi5zcXVhcmVkTGVuZ3RoID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdO1xuICAgIHJldHVybiB4KnggKyB5Knk7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5zcXVhcmVkTGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzIuc3FyTGVuID0gdmVjMi5zcXVhcmVkTGVuZ3RoO1xuXG4vKipcbiAqIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB2ZWN0b3IgdG8gbmVnYXRlXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIubmVnYXRlID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gLWFbMF07XG4gICAgb3V0WzFdID0gLWFbMV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogTm9ybWFsaXplIGEgdmVjMlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdmVjdG9yIHRvIG5vcm1hbGl6ZVxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV07XG4gICAgdmFyIGxlbiA9IHgqeCArIHkqeTtcbiAgICBpZiAobGVuID4gMCkge1xuICAgICAgICAvL1RPRE86IGV2YWx1YXRlIHVzZSBvZiBnbG1faW52c3FydCBoZXJlP1xuICAgICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgICAgIG91dFswXSA9IGFbMF0gKiBsZW47XG4gICAgICAgIG91dFsxXSA9IGFbMV0gKiBsZW47XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAqL1xudmVjMi5kb3QgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdO1xufTtcblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0d28gdmVjMidzXG4gKiBOb3RlIHRoYXQgdGhlIGNyb3NzIHByb2R1Y3QgbXVzdCBieSBkZWZpbml0aW9uIHByb2R1Y2UgYSAzRCB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzIuY3Jvc3MgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICB2YXIgeiA9IGFbMF0gKiBiWzFdIC0gYVsxXSAqIGJbMF07XG4gICAgb3V0WzBdID0gb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSB6O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLmxlcnAgPSBmdW5jdGlvbiAob3V0LCBhLCBiLCB0KSB7XG4gICAgdmFyIGF4ID0gYVswXSxcbiAgICAgICAgYXkgPSBhWzFdO1xuICAgIG91dFswXSA9IGF4ICsgdCAqIChiWzBdIC0gYXgpO1xuICAgIG91dFsxXSA9IGF5ICsgdCAqIChiWzFdIC0gYXkpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHJhbmRvbSB2ZWN0b3Igd2l0aCB0aGUgZ2l2ZW4gc2NhbGVcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IFtzY2FsZV0gTGVuZ3RoIG9mIHRoZSByZXN1bHRpbmcgdmVjdG9yLiBJZiBvbW1pdHRlZCwgYSB1bml0IHZlY3RvciB3aWxsIGJlIHJldHVybmVkXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIucmFuZG9tID0gZnVuY3Rpb24gKG91dCwgc2NhbGUpIHtcbiAgICBzY2FsZSA9IHNjYWxlIHx8IDEuMDtcbiAgICB2YXIgciA9IEdMTUFUX1JBTkRPTSgpICogMi4wICogTWF0aC5QSTtcbiAgICBvdXRbMF0gPSBNYXRoLmNvcyhyKSAqIHNjYWxlO1xuICAgIG91dFsxXSA9IE1hdGguc2luKHIpICogc2NhbGU7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0MlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0Mn0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi50cmFuc2Zvcm1NYXQyID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bMl0gKiB5O1xuICAgIG91dFsxXSA9IG1bMV0gKiB4ICsgbVszXSAqIHk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0MmRcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge21hdDJkfSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLnRyYW5zZm9ybU1hdDJkID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bMl0gKiB5ICsgbVs0XTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bM10gKiB5ICsgbVs1XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQzXG4gKiAzcmQgdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcxJ1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0M30gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi50cmFuc2Zvcm1NYXQzID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bM10gKiB5ICsgbVs2XTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bNF0gKiB5ICsgbVs3XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQ0XG4gKiAzcmQgdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcwJ1xuICogNHRoIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMSdcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge21hdDR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIudHJhbnNmb3JtTWF0NCA9IGZ1bmN0aW9uKG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSwgXG4gICAgICAgIHkgPSBhWzFdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzEyXTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bNV0gKiB5ICsgbVsxM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUGVyZm9ybSBzb21lIG9wZXJhdGlvbiBvdmVyIGFuIGFycmF5IG9mIHZlYzJzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGEgdGhlIGFycmF5IG9mIHZlY3RvcnMgdG8gaXRlcmF0ZSBvdmVyXG4gKiBAcGFyYW0ge051bWJlcn0gc3RyaWRlIE51bWJlciBvZiBlbGVtZW50cyBiZXR3ZWVuIHRoZSBzdGFydCBvZiBlYWNoIHZlYzIuIElmIDAgYXNzdW1lcyB0aWdodGx5IHBhY2tlZFxuICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBOdW1iZXIgb2YgZWxlbWVudHMgdG8gc2tpcCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBhcnJheVxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50IE51bWJlciBvZiB2ZWMycyB0byBpdGVyYXRlIG92ZXIuIElmIDAgaXRlcmF0ZXMgb3ZlciBlbnRpcmUgYXJyYXlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggdmVjdG9yIGluIHRoZSBhcnJheVxuICogQHBhcmFtIHtPYmplY3R9IFthcmddIGFkZGl0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyB0byBmblxuICogQHJldHVybnMge0FycmF5fSBhXG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMi5mb3JFYWNoID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ZWMgPSB2ZWMyLmNyZWF0ZSgpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGEsIHN0cmlkZSwgb2Zmc2V0LCBjb3VudCwgZm4sIGFyZykge1xuICAgICAgICB2YXIgaSwgbDtcbiAgICAgICAgaWYoIXN0cmlkZSkge1xuICAgICAgICAgICAgc3RyaWRlID0gMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFvZmZzZXQpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKGNvdW50KSB7XG4gICAgICAgICAgICBsID0gTWF0aC5taW4oKGNvdW50ICogc3RyaWRlKSArIG9mZnNldCwgYS5sZW5ndGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbCA9IGEubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGkgPSBvZmZzZXQ7IGkgPCBsOyBpICs9IHN0cmlkZSkge1xuICAgICAgICAgICAgdmVjWzBdID0gYVtpXTsgdmVjWzFdID0gYVtpKzFdO1xuICAgICAgICAgICAgZm4odmVjLCB2ZWMsIGFyZyk7XG4gICAgICAgICAgICBhW2ldID0gdmVjWzBdOyBhW2krMV0gPSB2ZWNbMV07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBhO1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IHZlYyB2ZWN0b3IgdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICovXG52ZWMyLnN0ciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuICd2ZWMyKCcgKyBhWzBdICsgJywgJyArIGFbMV0gKyAnKSc7XG59O1xuXG5pZih0eXBlb2YoZXhwb3J0cykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZXhwb3J0cy52ZWMyID0gdmVjMjtcbn1cbjtcbi8qIENvcHlyaWdodCAoYykgMjAxMywgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4gICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gICAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gXG4gICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgXG5ESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUlxuQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4oSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG5MT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT05cbkFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4oSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJU1xuU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuICovXG5cbi8qKlxuICogQGNsYXNzIDMgRGltZW5zaW9uYWwgVmVjdG9yXG4gKiBAbmFtZSB2ZWMzXG4gKi9cblxudmFyIHZlYzMgPSB7fTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWMzXG4gKlxuICogQHJldHVybnMge3ZlYzN9IGEgbmV3IDNEIHZlY3RvclxuICovXG52ZWMzLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSgzKTtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzMgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdmVjdG9yIHRvIGNsb25lXG4gKiBAcmV0dXJucyB7dmVjM30gYSBuZXcgM0QgdmVjdG9yXG4gKi9cbnZlYzMuY2xvbmUgPSBmdW5jdGlvbihhKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDMpO1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjMyBpbml0aWFsaXplZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjM30gYSBuZXcgM0QgdmVjdG9yXG4gKi9cbnZlYzMuZnJvbVZhbHVlcyA9IGZ1bmN0aW9uKHgsIHksIHopIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoMyk7XG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIG91dFsyXSA9IHo7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHZlYzMgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIHNvdXJjZSB2ZWN0b3JcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5jb3B5ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMyB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5zZXQgPSBmdW5jdGlvbihvdXQsIHgsIHksIHopIHtcbiAgICBvdXRbMF0gPSB4O1xuICAgIG91dFsxXSA9IHk7XG4gICAgb3V0WzJdID0gejtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuYWRkID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuc3VidHJhY3QgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdIC0gYlsyXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuc3VidHJhY3R9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMy5zdWIgPSB2ZWMzLnN1YnRyYWN0O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5tdWx0aXBseSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gKiBiWzJdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLm11bCA9IHZlYzMubXVsdGlwbHk7XG5cbi8qKlxuICogRGl2aWRlcyB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLmRpdmlkZSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLyBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLyBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLyBiWzJdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5kaXZpZGV9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMy5kaXYgPSB2ZWMzLmRpdmlkZTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtaW5pbXVtIG9mIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMubWluID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gTWF0aC5taW4oYVswXSwgYlswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5taW4oYVsxXSwgYlsxXSk7XG4gICAgb3V0WzJdID0gTWF0aC5taW4oYVsyXSwgYlsyXSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWF4aW11bSBvZiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLm1heCA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IE1hdGgubWF4KGFbMF0sIGJbMF0pO1xuICAgIG91dFsxXSA9IE1hdGgubWF4KGFbMV0sIGJbMV0pO1xuICAgIG91dFsyXSA9IE1hdGgubWF4KGFbMl0sIGJbMl0pO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNjYWxlcyBhIHZlYzMgYnkgYSBzY2FsYXIgbnVtYmVyXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLnNjYWxlID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGI7XG4gICAgb3V0WzFdID0gYVsxXSAqIGI7XG4gICAgb3V0WzJdID0gYVsyXSAqIGI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWRkcyB0d28gdmVjMydzIGFmdGVyIHNjYWxpbmcgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIHZhbHVlXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIHRoZSBhbW91bnQgdG8gc2NhbGUgYiBieSBiZWZvcmUgYWRkaW5nXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuc2NhbGVBbmRBZGQgPSBmdW5jdGlvbihvdXQsIGEsIGIsIHNjYWxlKSB7XG4gICAgb3V0WzBdID0gYVswXSArIChiWzBdICogc2NhbGUpO1xuICAgIG91dFsxXSA9IGFbMV0gKyAoYlsxXSAqIHNjYWxlKTtcbiAgICBvdXRbMl0gPSBhWzJdICsgKGJbMl0gKiBzY2FsZSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cbnZlYzMuZGlzdGFuY2UgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgICAgeSA9IGJbMV0gLSBhWzFdLFxuICAgICAgICB6ID0gYlsyXSAtIGFbMl07XG4gICAgcmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuZGlzdGFuY2V9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMy5kaXN0ID0gdmVjMy5kaXN0YW5jZTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cbnZlYzMuc3F1YXJlZERpc3RhbmNlID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICAgIHkgPSBiWzFdIC0gYVsxXSxcbiAgICAgICAgeiA9IGJbMl0gLSBhWzJdO1xuICAgIHJldHVybiB4KnggKyB5KnkgKyB6Kno7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5zcXVhcmVkRGlzdGFuY2V9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMy5zcXJEaXN0ID0gdmVjMy5zcXVhcmVkRGlzdGFuY2U7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gbGVuZ3RoIG9mIGFcbiAqL1xudmVjMy5sZW5ndGggPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdO1xuICAgIHJldHVybiBNYXRoLnNxcnQoeCp4ICsgeSp5ICsgeip6KTtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLmxlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLmxlbiA9IHZlYzMubGVuZ3RoO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHNxdWFyZWQgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGxlbmd0aCBvZiBhXG4gKi9cbnZlYzMuc3F1YXJlZExlbmd0aCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl07XG4gICAgcmV0dXJuIHgqeCArIHkqeSArIHoqejtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLnNxdWFyZWRMZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMy5zcXJMZW4gPSB2ZWMzLnNxdWFyZWRMZW5ndGg7XG5cbi8qKlxuICogTmVnYXRlcyB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBuZWdhdGVcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5uZWdhdGUgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSAtYVswXTtcbiAgICBvdXRbMV0gPSAtYVsxXTtcbiAgICBvdXRbMl0gPSAtYVsyXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBOb3JtYWxpemUgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gbm9ybWFsaXplXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMubm9ybWFsaXplID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl07XG4gICAgdmFyIGxlbiA9IHgqeCArIHkqeSArIHoqejtcbiAgICBpZiAobGVuID4gMCkge1xuICAgICAgICAvL1RPRE86IGV2YWx1YXRlIHVzZSBvZiBnbG1faW52c3FydCBoZXJlP1xuICAgICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgICAgIG91dFswXSA9IGFbMF0gKiBsZW47XG4gICAgICAgIG91dFsxXSA9IGFbMV0gKiBsZW47XG4gICAgICAgIG91dFsyXSA9IGFbMl0gKiBsZW47XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAqL1xudmVjMy5kb3QgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdICsgYVsyXSAqIGJbMl07XG59O1xuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBjcm9zcyBwcm9kdWN0IG9mIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuY3Jvc3MgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICB2YXIgYXggPSBhWzBdLCBheSA9IGFbMV0sIGF6ID0gYVsyXSxcbiAgICAgICAgYnggPSBiWzBdLCBieSA9IGJbMV0sIGJ6ID0gYlsyXTtcblxuICAgIG91dFswXSA9IGF5ICogYnogLSBheiAqIGJ5O1xuICAgIG91dFsxXSA9IGF6ICogYnggLSBheCAqIGJ6O1xuICAgIG91dFsyXSA9IGF4ICogYnkgLSBheSAqIGJ4O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLmxlcnAgPSBmdW5jdGlvbiAob3V0LCBhLCBiLCB0KSB7XG4gICAgdmFyIGF4ID0gYVswXSxcbiAgICAgICAgYXkgPSBhWzFdLFxuICAgICAgICBheiA9IGFbMl07XG4gICAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheCk7XG4gICAgb3V0WzFdID0gYXkgKyB0ICogKGJbMV0gLSBheSk7XG4gICAgb3V0WzJdID0gYXogKyB0ICogKGJbMl0gLSBheik7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcmFuZG9tIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBzY2FsZVxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9tbWl0dGVkLCBhIHVuaXQgdmVjdG9yIHdpbGwgYmUgcmV0dXJuZWRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5yYW5kb20gPSBmdW5jdGlvbiAob3V0LCBzY2FsZSkge1xuICAgIHNjYWxlID0gc2NhbGUgfHwgMS4wO1xuXG4gICAgdmFyIHIgPSBHTE1BVF9SQU5ET00oKSAqIDIuMCAqIE1hdGguUEk7XG4gICAgdmFyIHogPSAoR0xNQVRfUkFORE9NKCkgKiAyLjApIC0gMS4wO1xuICAgIHZhciB6U2NhbGUgPSBNYXRoLnNxcnQoMS4wLXoqeikgKiBzY2FsZTtcblxuICAgIG91dFswXSA9IE1hdGguY29zKHIpICogelNjYWxlO1xuICAgIG91dFsxXSA9IE1hdGguc2luKHIpICogelNjYWxlO1xuICAgIG91dFsyXSA9IHogKiBzY2FsZTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMzIHdpdGggYSBtYXQ0LlxuICogNHRoIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMSdcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge21hdDR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMudHJhbnNmb3JtTWF0NCA9IGZ1bmN0aW9uKG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSwgeSA9IGFbMV0sIHogPSBhWzJdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzhdICogeiArIG1bMTJdO1xuICAgIG91dFsxXSA9IG1bMV0gKiB4ICsgbVs1XSAqIHkgKyBtWzldICogeiArIG1bMTNdO1xuICAgIG91dFsyXSA9IG1bMl0gKiB4ICsgbVs2XSAqIHkgKyBtWzEwXSAqIHogKyBtWzE0XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMzIHdpdGggYSBtYXQzLlxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0NH0gbSB0aGUgM3gzIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLnRyYW5zZm9ybU1hdDMgPSBmdW5jdGlvbihvdXQsIGEsIG0pIHtcbiAgICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXTtcbiAgICBvdXRbMF0gPSB4ICogbVswXSArIHkgKiBtWzNdICsgeiAqIG1bNl07XG4gICAgb3V0WzFdID0geCAqIG1bMV0gKyB5ICogbVs0XSArIHogKiBtWzddO1xuICAgIG91dFsyXSA9IHggKiBtWzJdICsgeSAqIG1bNV0gKyB6ICogbVs4XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMzIHdpdGggYSBxdWF0XG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHtxdWF0fSBxIHF1YXRlcm5pb24gdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy50cmFuc2Zvcm1RdWF0ID0gZnVuY3Rpb24ob3V0LCBhLCBxKSB7XG4gICAgLy8gYmVuY2htYXJrczogaHR0cDovL2pzcGVyZi5jb20vcXVhdGVybmlvbi10cmFuc2Zvcm0tdmVjMy1pbXBsZW1lbnRhdGlvbnNcblxuICAgIHZhciB4ID0gYVswXSwgeSA9IGFbMV0sIHogPSBhWzJdLFxuICAgICAgICBxeCA9IHFbMF0sIHF5ID0gcVsxXSwgcXogPSBxWzJdLCBxdyA9IHFbM10sXG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIHF1YXQgKiB2ZWNcbiAgICAgICAgaXggPSBxdyAqIHggKyBxeSAqIHogLSBxeiAqIHksXG4gICAgICAgIGl5ID0gcXcgKiB5ICsgcXogKiB4IC0gcXggKiB6LFxuICAgICAgICBpeiA9IHF3ICogeiArIHF4ICogeSAtIHF5ICogeCxcbiAgICAgICAgaXcgPSAtcXggKiB4IC0gcXkgKiB5IC0gcXogKiB6O1xuXG4gICAgLy8gY2FsY3VsYXRlIHJlc3VsdCAqIGludmVyc2UgcXVhdFxuICAgIG91dFswXSA9IGl4ICogcXcgKyBpdyAqIC1xeCArIGl5ICogLXF6IC0gaXogKiAtcXk7XG4gICAgb3V0WzFdID0gaXkgKiBxdyArIGl3ICogLXF5ICsgaXogKiAtcXggLSBpeCAqIC1xejtcbiAgICBvdXRbMl0gPSBpeiAqIHF3ICsgaXcgKiAtcXogKyBpeCAqIC1xeSAtIGl5ICogLXF4O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKlxuKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB4LWF4aXNcbiogQHBhcmFtIHt2ZWMzfSBvdXQgVGhlIHJlY2VpdmluZyB2ZWMzXG4qIEBwYXJhbSB7dmVjM30gYSBUaGUgdmVjMyBwb2ludCB0byByb3RhdGVcbiogQHBhcmFtIHt2ZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4qIEBwYXJhbSB7TnVtYmVyfSBjIFRoZSBhbmdsZSBvZiByb3RhdGlvblxuKiBAcmV0dXJucyB7dmVjM30gb3V0XG4qL1xudmVjMy5yb3RhdGVYID0gZnVuY3Rpb24ob3V0LCBhLCBiLCBjKXtcbiAgIHZhciBwID0gW10sIHI9W107XG5cdCAgLy9UcmFuc2xhdGUgcG9pbnQgdG8gdGhlIG9yaWdpblxuXHQgIHBbMF0gPSBhWzBdIC0gYlswXTtcblx0ICBwWzFdID0gYVsxXSAtIGJbMV07XG4gIFx0cFsyXSA9IGFbMl0gLSBiWzJdO1xuXG5cdCAgLy9wZXJmb3JtIHJvdGF0aW9uXG5cdCAgclswXSA9IHBbMF07XG5cdCAgclsxXSA9IHBbMV0qTWF0aC5jb3MoYykgLSBwWzJdKk1hdGguc2luKGMpO1xuXHQgIHJbMl0gPSBwWzFdKk1hdGguc2luKGMpICsgcFsyXSpNYXRoLmNvcyhjKTtcblxuXHQgIC8vdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cblx0ICBvdXRbMF0gPSByWzBdICsgYlswXTtcblx0ICBvdXRbMV0gPSByWzFdICsgYlsxXTtcblx0ICBvdXRbMl0gPSByWzJdICsgYlsyXTtcblxuICBcdHJldHVybiBvdXQ7XG59O1xuXG4vKlxuKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB5LWF4aXNcbiogQHBhcmFtIHt2ZWMzfSBvdXQgVGhlIHJlY2VpdmluZyB2ZWMzXG4qIEBwYXJhbSB7dmVjM30gYSBUaGUgdmVjMyBwb2ludCB0byByb3RhdGVcbiogQHBhcmFtIHt2ZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4qIEBwYXJhbSB7TnVtYmVyfSBjIFRoZSBhbmdsZSBvZiByb3RhdGlvblxuKiBAcmV0dXJucyB7dmVjM30gb3V0XG4qL1xudmVjMy5yb3RhdGVZID0gZnVuY3Rpb24ob3V0LCBhLCBiLCBjKXtcbiAgXHR2YXIgcCA9IFtdLCByPVtdO1xuICBcdC8vVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cbiAgXHRwWzBdID0gYVswXSAtIGJbMF07XG4gIFx0cFsxXSA9IGFbMV0gLSBiWzFdO1xuICBcdHBbMl0gPSBhWzJdIC0gYlsyXTtcbiAgXG4gIFx0Ly9wZXJmb3JtIHJvdGF0aW9uXG4gIFx0clswXSA9IHBbMl0qTWF0aC5zaW4oYykgKyBwWzBdKk1hdGguY29zKGMpO1xuICBcdHJbMV0gPSBwWzFdO1xuICBcdHJbMl0gPSBwWzJdKk1hdGguY29zKGMpIC0gcFswXSpNYXRoLnNpbihjKTtcbiAgXG4gIFx0Ly90cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuICBcdG91dFswXSA9IHJbMF0gKyBiWzBdO1xuICBcdG91dFsxXSA9IHJbMV0gKyBiWzFdO1xuICBcdG91dFsyXSA9IHJbMl0gKyBiWzJdO1xuICBcbiAgXHRyZXR1cm4gb3V0O1xufTtcblxuLypcbiogUm90YXRlIGEgM0QgdmVjdG9yIGFyb3VuZCB0aGUgei1heGlzXG4qIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xuKiBAcGFyYW0ge3ZlYzN9IGEgVGhlIHZlYzMgcG9pbnQgdG8gcm90YXRlXG4qIEBwYXJhbSB7dmVjM30gYiBUaGUgb3JpZ2luIG9mIHRoZSByb3RhdGlvblxuKiBAcGFyYW0ge051bWJlcn0gYyBUaGUgYW5nbGUgb2Ygcm90YXRpb25cbiogQHJldHVybnMge3ZlYzN9IG91dFxuKi9cbnZlYzMucm90YXRlWiA9IGZ1bmN0aW9uKG91dCwgYSwgYiwgYyl7XG4gIFx0dmFyIHAgPSBbXSwgcj1bXTtcbiAgXHQvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG4gIFx0cFswXSA9IGFbMF0gLSBiWzBdO1xuICBcdHBbMV0gPSBhWzFdIC0gYlsxXTtcbiAgXHRwWzJdID0gYVsyXSAtIGJbMl07XG4gIFxuICBcdC8vcGVyZm9ybSByb3RhdGlvblxuICBcdHJbMF0gPSBwWzBdKk1hdGguY29zKGMpIC0gcFsxXSpNYXRoLnNpbihjKTtcbiAgXHRyWzFdID0gcFswXSpNYXRoLnNpbihjKSArIHBbMV0qTWF0aC5jb3MoYyk7XG4gIFx0clsyXSA9IHBbMl07XG4gIFxuICBcdC8vdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cbiAgXHRvdXRbMF0gPSByWzBdICsgYlswXTtcbiAgXHRvdXRbMV0gPSByWzFdICsgYlsxXTtcbiAgXHRvdXRbMl0gPSByWzJdICsgYlsyXTtcbiAgXG4gIFx0cmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUGVyZm9ybSBzb21lIG9wZXJhdGlvbiBvdmVyIGFuIGFycmF5IG9mIHZlYzNzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGEgdGhlIGFycmF5IG9mIHZlY3RvcnMgdG8gaXRlcmF0ZSBvdmVyXG4gKiBAcGFyYW0ge051bWJlcn0gc3RyaWRlIE51bWJlciBvZiBlbGVtZW50cyBiZXR3ZWVuIHRoZSBzdGFydCBvZiBlYWNoIHZlYzMuIElmIDAgYXNzdW1lcyB0aWdodGx5IHBhY2tlZFxuICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBOdW1iZXIgb2YgZWxlbWVudHMgdG8gc2tpcCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBhcnJheVxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50IE51bWJlciBvZiB2ZWMzcyB0byBpdGVyYXRlIG92ZXIuIElmIDAgaXRlcmF0ZXMgb3ZlciBlbnRpcmUgYXJyYXlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggdmVjdG9yIGluIHRoZSBhcnJheVxuICogQHBhcmFtIHtPYmplY3R9IFthcmddIGFkZGl0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyB0byBmblxuICogQHJldHVybnMge0FycmF5fSBhXG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMy5mb3JFYWNoID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ZWMgPSB2ZWMzLmNyZWF0ZSgpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGEsIHN0cmlkZSwgb2Zmc2V0LCBjb3VudCwgZm4sIGFyZykge1xuICAgICAgICB2YXIgaSwgbDtcbiAgICAgICAgaWYoIXN0cmlkZSkge1xuICAgICAgICAgICAgc3RyaWRlID0gMztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFvZmZzZXQpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKGNvdW50KSB7XG4gICAgICAgICAgICBsID0gTWF0aC5taW4oKGNvdW50ICogc3RyaWRlKSArIG9mZnNldCwgYS5sZW5ndGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbCA9IGEubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGkgPSBvZmZzZXQ7IGkgPCBsOyBpICs9IHN0cmlkZSkge1xuICAgICAgICAgICAgdmVjWzBdID0gYVtpXTsgdmVjWzFdID0gYVtpKzFdOyB2ZWNbMl0gPSBhW2krMl07XG4gICAgICAgICAgICBmbih2ZWMsIHZlYywgYXJnKTtcbiAgICAgICAgICAgIGFbaV0gPSB2ZWNbMF07IGFbaSsxXSA9IHZlY1sxXTsgYVtpKzJdID0gdmVjWzJdO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYTtcbiAgICB9O1xufSkoKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgdmVjdG9yXG4gKlxuICogQHBhcmFtIHt2ZWMzfSB2ZWMgdmVjdG9yIHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcbiAqL1xudmVjMy5zdHIgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiAndmVjMygnICsgYVswXSArICcsICcgKyBhWzFdICsgJywgJyArIGFbMl0gKyAnKSc7XG59O1xuXG5pZih0eXBlb2YoZXhwb3J0cykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZXhwb3J0cy52ZWMzID0gdmVjMztcbn1cbjtcbi8qIENvcHlyaWdodCAoYykgMjAxMywgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4gICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gICAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gXG4gICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgXG5ESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUlxuQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4oSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG5MT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT05cbkFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4oSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJU1xuU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuICovXG5cbi8qKlxuICogQGNsYXNzIDQgRGltZW5zaW9uYWwgVmVjdG9yXG4gKiBAbmFtZSB2ZWM0XG4gKi9cblxudmFyIHZlYzQgPSB7fTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWM0XG4gKlxuICogQHJldHVybnMge3ZlYzR9IGEgbmV3IDREIHZlY3RvclxuICovXG52ZWM0LmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSg0KTtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjNCBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB2ZWN0b3IgdG8gY2xvbmVcbiAqIEByZXR1cm5zIHt2ZWM0fSBhIG5ldyA0RCB2ZWN0b3JcbiAqL1xudmVjNC5jbG9uZSA9IGZ1bmN0aW9uKGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoNCk7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzQgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHcgVyBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWM0fSBhIG5ldyA0RCB2ZWN0b3JcbiAqL1xudmVjNC5mcm9tVmFsdWVzID0gZnVuY3Rpb24oeCwgeSwgeiwgdykge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSg0KTtcbiAgICBvdXRbMF0gPSB4O1xuICAgIG91dFsxXSA9IHk7XG4gICAgb3V0WzJdID0gejtcbiAgICBvdXRbM10gPSB3O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSB2ZWM0IHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBzb3VyY2UgdmVjdG9yXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuY29weSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNCB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB3IFcgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuc2V0ID0gZnVuY3Rpb24ob3V0LCB4LCB5LCB6LCB3KSB7XG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIG91dFsyXSA9IHo7XG4gICAgb3V0WzNdID0gdztcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuYWRkID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gICAgb3V0WzNdID0gYVszXSArIGJbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuc3VidHJhY3QgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdIC0gYlsyXTtcbiAgICBvdXRbM10gPSBhWzNdIC0gYlszXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuc3VidHJhY3R9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjNC5zdWIgPSB2ZWM0LnN1YnRyYWN0O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5tdWx0aXBseSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gKiBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gKiBiWzNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWM0Lm11bCA9IHZlYzQubXVsdGlwbHk7XG5cbi8qKlxuICogRGl2aWRlcyB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LmRpdmlkZSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLyBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLyBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLyBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gLyBiWzNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5kaXZpZGV9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjNC5kaXYgPSB2ZWM0LmRpdmlkZTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtaW5pbXVtIG9mIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQubWluID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gTWF0aC5taW4oYVswXSwgYlswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5taW4oYVsxXSwgYlsxXSk7XG4gICAgb3V0WzJdID0gTWF0aC5taW4oYVsyXSwgYlsyXSk7XG4gICAgb3V0WzNdID0gTWF0aC5taW4oYVszXSwgYlszXSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWF4aW11bSBvZiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0Lm1heCA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IE1hdGgubWF4KGFbMF0sIGJbMF0pO1xuICAgIG91dFsxXSA9IE1hdGgubWF4KGFbMV0sIGJbMV0pO1xuICAgIG91dFsyXSA9IE1hdGgubWF4KGFbMl0sIGJbMl0pO1xuICAgIG91dFszXSA9IE1hdGgubWF4KGFbM10sIGJbM10pO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNjYWxlcyBhIHZlYzQgYnkgYSBzY2FsYXIgbnVtYmVyXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LnNjYWxlID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGI7XG4gICAgb3V0WzFdID0gYVsxXSAqIGI7XG4gICAgb3V0WzJdID0gYVsyXSAqIGI7XG4gICAgb3V0WzNdID0gYVszXSAqIGI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWRkcyB0d28gdmVjNCdzIGFmdGVyIHNjYWxpbmcgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIHZhbHVlXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIHRoZSBhbW91bnQgdG8gc2NhbGUgYiBieSBiZWZvcmUgYWRkaW5nXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuc2NhbGVBbmRBZGQgPSBmdW5jdGlvbihvdXQsIGEsIGIsIHNjYWxlKSB7XG4gICAgb3V0WzBdID0gYVswXSArIChiWzBdICogc2NhbGUpO1xuICAgIG91dFsxXSA9IGFbMV0gKyAoYlsxXSAqIHNjYWxlKTtcbiAgICBvdXRbMl0gPSBhWzJdICsgKGJbMl0gKiBzY2FsZSk7XG4gICAgb3V0WzNdID0gYVszXSArIChiWzNdICogc2NhbGUpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG52ZWM0LmRpc3RhbmNlID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICAgIHkgPSBiWzFdIC0gYVsxXSxcbiAgICAgICAgeiA9IGJbMl0gLSBhWzJdLFxuICAgICAgICB3ID0gYlszXSAtIGFbM107XG4gICAgcmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkgKyB6KnogKyB3KncpO1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuZGlzdGFuY2V9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjNC5kaXN0ID0gdmVjNC5kaXN0YW5jZTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cbnZlYzQuc3F1YXJlZERpc3RhbmNlID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICAgIHkgPSBiWzFdIC0gYVsxXSxcbiAgICAgICAgeiA9IGJbMl0gLSBhWzJdLFxuICAgICAgICB3ID0gYlszXSAtIGFbM107XG4gICAgcmV0dXJuIHgqeCArIHkqeSArIHoqeiArIHcqdztcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWM0LnNxdWFyZWREaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWM0LnNxckRpc3QgPSB2ZWM0LnNxdWFyZWREaXN0YW5jZTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICovXG52ZWM0Lmxlbmd0aCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl0sXG4gICAgICAgIHcgPSBhWzNdO1xuICAgIHJldHVybiBNYXRoLnNxcnQoeCp4ICsgeSp5ICsgeip6ICsgdyp3KTtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWM0Lmxlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG52ZWM0LmxlbiA9IHZlYzQubGVuZ3RoO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHNxdWFyZWQgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGxlbmd0aCBvZiBhXG4gKi9cbnZlYzQuc3F1YXJlZExlbmd0aCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl0sXG4gICAgICAgIHcgPSBhWzNdO1xuICAgIHJldHVybiB4KnggKyB5KnkgKyB6KnogKyB3Knc7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5zcXVhcmVkTGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzQuc3FyTGVuID0gdmVjNC5zcXVhcmVkTGVuZ3RoO1xuXG4vKipcbiAqIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB2ZWN0b3IgdG8gbmVnYXRlXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQubmVnYXRlID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gLWFbMF07XG4gICAgb3V0WzFdID0gLWFbMV07XG4gICAgb3V0WzJdID0gLWFbMl07XG4gICAgb3V0WzNdID0gLWFbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogTm9ybWFsaXplIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIG5vcm1hbGl6ZVxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0Lm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdLFxuICAgICAgICB3ID0gYVszXTtcbiAgICB2YXIgbGVuID0geCp4ICsgeSp5ICsgeip6ICsgdyp3O1xuICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICAgICAgb3V0WzBdID0gYVswXSAqIGxlbjtcbiAgICAgICAgb3V0WzFdID0gYVsxXSAqIGxlbjtcbiAgICAgICAgb3V0WzJdID0gYVsyXSAqIGxlbjtcbiAgICAgICAgb3V0WzNdID0gYVszXSAqIGxlbjtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZG90IHByb2R1Y3Qgb2YgYSBhbmQgYlxuICovXG52ZWM0LmRvdCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV0gKyBhWzJdICogYlsyXSArIGFbM10gKiBiWzNdO1xufTtcblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50IGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5sZXJwID0gZnVuY3Rpb24gKG91dCwgYSwgYiwgdCkge1xuICAgIHZhciBheCA9IGFbMF0sXG4gICAgICAgIGF5ID0gYVsxXSxcbiAgICAgICAgYXogPSBhWzJdLFxuICAgICAgICBhdyA9IGFbM107XG4gICAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheCk7XG4gICAgb3V0WzFdID0gYXkgKyB0ICogKGJbMV0gLSBheSk7XG4gICAgb3V0WzJdID0gYXogKyB0ICogKGJbMl0gLSBheik7XG4gICAgb3V0WzNdID0gYXcgKyB0ICogKGJbM10gLSBhdyk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcmFuZG9tIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBzY2FsZVxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9tbWl0dGVkLCBhIHVuaXQgdmVjdG9yIHdpbGwgYmUgcmV0dXJuZWRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5yYW5kb20gPSBmdW5jdGlvbiAob3V0LCBzY2FsZSkge1xuICAgIHNjYWxlID0gc2NhbGUgfHwgMS4wO1xuXG4gICAgLy9UT0RPOiBUaGlzIGlzIGEgcHJldHR5IGF3ZnVsIHdheSBvZiBkb2luZyB0aGlzLiBGaW5kIHNvbWV0aGluZyBiZXR0ZXIuXG4gICAgb3V0WzBdID0gR0xNQVRfUkFORE9NKCk7XG4gICAgb3V0WzFdID0gR0xNQVRfUkFORE9NKCk7XG4gICAgb3V0WzJdID0gR0xNQVRfUkFORE9NKCk7XG4gICAgb3V0WzNdID0gR0xNQVRfUkFORE9NKCk7XG4gICAgdmVjNC5ub3JtYWxpemUob3V0LCBvdXQpO1xuICAgIHZlYzQuc2NhbGUob3V0LCBvdXQsIHNjYWxlKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWM0IHdpdGggYSBtYXQ0LlxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0NH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC50cmFuc2Zvcm1NYXQ0ID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLCB5ID0gYVsxXSwgeiA9IGFbMl0sIHcgPSBhWzNdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzhdICogeiArIG1bMTJdICogdztcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bNV0gKiB5ICsgbVs5XSAqIHogKyBtWzEzXSAqIHc7XG4gICAgb3V0WzJdID0gbVsyXSAqIHggKyBtWzZdICogeSArIG1bMTBdICogeiArIG1bMTRdICogdztcbiAgICBvdXRbM10gPSBtWzNdICogeCArIG1bN10gKiB5ICsgbVsxMV0gKiB6ICsgbVsxNV0gKiB3O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzQgd2l0aCBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge3F1YXR9IHEgcXVhdGVybmlvbiB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LnRyYW5zZm9ybVF1YXQgPSBmdW5jdGlvbihvdXQsIGEsIHEpIHtcbiAgICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXSxcbiAgICAgICAgcXggPSBxWzBdLCBxeSA9IHFbMV0sIHF6ID0gcVsyXSwgcXcgPSBxWzNdLFxuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBxdWF0ICogdmVjXG4gICAgICAgIGl4ID0gcXcgKiB4ICsgcXkgKiB6IC0gcXogKiB5LFxuICAgICAgICBpeSA9IHF3ICogeSArIHF6ICogeCAtIHF4ICogeixcbiAgICAgICAgaXogPSBxdyAqIHogKyBxeCAqIHkgLSBxeSAqIHgsXG4gICAgICAgIGl3ID0gLXF4ICogeCAtIHF5ICogeSAtIHF6ICogejtcblxuICAgIC8vIGNhbGN1bGF0ZSByZXN1bHQgKiBpbnZlcnNlIHF1YXRcbiAgICBvdXRbMF0gPSBpeCAqIHF3ICsgaXcgKiAtcXggKyBpeSAqIC1xeiAtIGl6ICogLXF5O1xuICAgIG91dFsxXSA9IGl5ICogcXcgKyBpdyAqIC1xeSArIGl6ICogLXF4IC0gaXggKiAtcXo7XG4gICAgb3V0WzJdID0gaXogKiBxdyArIGl3ICogLXF6ICsgaXggKiAtcXkgLSBpeSAqIC1xeDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBQZXJmb3JtIHNvbWUgb3BlcmF0aW9uIG92ZXIgYW4gYXJyYXkgb2YgdmVjNHMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYSB0aGUgYXJyYXkgb2YgdmVjdG9ycyB0byBpdGVyYXRlIG92ZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdHJpZGUgTnVtYmVyIG9mIGVsZW1lbnRzIGJldHdlZW4gdGhlIHN0YXJ0IG9mIGVhY2ggdmVjNC4gSWYgMCBhc3N1bWVzIHRpZ2h0bHkgcGFja2VkXG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IE51bWJlciBvZiBlbGVtZW50cyB0byBza2lwIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGFycmF5XG4gKiBAcGFyYW0ge051bWJlcn0gY291bnQgTnVtYmVyIG9mIHZlYzJzIHRvIGl0ZXJhdGUgb3Zlci4gSWYgMCBpdGVyYXRlcyBvdmVyIGVudGlyZSBhcnJheVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCB2ZWN0b3IgaW4gdGhlIGFycmF5XG4gKiBAcGFyYW0ge09iamVjdH0gW2FyZ10gYWRkaXRpb25hbCBhcmd1bWVudCB0byBwYXNzIHRvIGZuXG4gKiBAcmV0dXJucyB7QXJyYXl9IGFcbiAqIEBmdW5jdGlvblxuICovXG52ZWM0LmZvckVhY2ggPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZlYyA9IHZlYzQuY3JlYXRlKCk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oYSwgc3RyaWRlLCBvZmZzZXQsIGNvdW50LCBmbiwgYXJnKSB7XG4gICAgICAgIHZhciBpLCBsO1xuICAgICAgICBpZighc3RyaWRlKSB7XG4gICAgICAgICAgICBzdHJpZGUgPSA0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIW9mZnNldCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoY291bnQpIHtcbiAgICAgICAgICAgIGwgPSBNYXRoLm1pbigoY291bnQgKiBzdHJpZGUpICsgb2Zmc2V0LCBhLmxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsID0gYS5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IoaSA9IG9mZnNldDsgaSA8IGw7IGkgKz0gc3RyaWRlKSB7XG4gICAgICAgICAgICB2ZWNbMF0gPSBhW2ldOyB2ZWNbMV0gPSBhW2krMV07IHZlY1syXSA9IGFbaSsyXTsgdmVjWzNdID0gYVtpKzNdO1xuICAgICAgICAgICAgZm4odmVjLCB2ZWMsIGFyZyk7XG4gICAgICAgICAgICBhW2ldID0gdmVjWzBdOyBhW2krMV0gPSB2ZWNbMV07IGFbaSsyXSA9IHZlY1syXTsgYVtpKzNdID0gdmVjWzNdO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYTtcbiAgICB9O1xufSkoKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgdmVjdG9yXG4gKlxuICogQHBhcmFtIHt2ZWM0fSB2ZWMgdmVjdG9yIHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcbiAqL1xudmVjNC5zdHIgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiAndmVjNCgnICsgYVswXSArICcsICcgKyBhWzFdICsgJywgJyArIGFbMl0gKyAnLCAnICsgYVszXSArICcpJztcbn07XG5cbmlmKHR5cGVvZihleHBvcnRzKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBleHBvcnRzLnZlYzQgPSB2ZWM0O1xufVxuO1xuLyogQ29weXJpZ2h0IChjKSAyMDEzLCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG5hcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAgICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBcbiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG5BTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SXG5BTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbihJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbkxPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbihJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS4gKi9cblxuLyoqXG4gKiBAY2xhc3MgMngyIE1hdHJpeFxuICogQG5hbWUgbWF0MlxuICovXG5cbnZhciBtYXQyID0ge307XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBpZGVudGl0eSBtYXQyXG4gKlxuICogQHJldHVybnMge21hdDJ9IGEgbmV3IDJ4MiBtYXRyaXhcbiAqL1xubWF0Mi5jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoNCk7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG1hdDIgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDJ9IGEgbWF0cml4IHRvIGNsb25lXG4gKiBAcmV0dXJucyB7bWF0Mn0gYSBuZXcgMngyIG1hdHJpeFxuICovXG5tYXQyLmNsb25lID0gZnVuY3Rpb24oYSkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSg0KTtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSBtYXQyIHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge21hdDJ9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gKi9cbm1hdDIuY29weSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IGEgbWF0MiB0byB0aGUgaWRlbnRpdHkgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAqL1xubWF0Mi5pZGVudGl0eSA9IGZ1bmN0aW9uKG91dCkge1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNwb3NlIHRoZSB2YWx1ZXMgb2YgYSBtYXQyXG4gKlxuICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0Mn0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDJ9IG91dFxuICovXG5tYXQyLnRyYW5zcG9zZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIC8vIElmIHdlIGFyZSB0cmFuc3Bvc2luZyBvdXJzZWx2ZXMgd2UgY2FuIHNraXAgYSBmZXcgc3RlcHMgYnV0IGhhdmUgdG8gY2FjaGUgc29tZSB2YWx1ZXNcbiAgICBpZiAob3V0ID09PSBhKSB7XG4gICAgICAgIHZhciBhMSA9IGFbMV07XG4gICAgICAgIG91dFsxXSA9IGFbMl07XG4gICAgICAgIG91dFsyXSA9IGExO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG91dFswXSA9IGFbMF07XG4gICAgICAgIG91dFsxXSA9IGFbMl07XG4gICAgICAgIG91dFsyXSA9IGFbMV07XG4gICAgICAgIG91dFszXSA9IGFbM107XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEludmVydHMgYSBtYXQyXG4gKlxuICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0Mn0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDJ9IG91dFxuICovXG5tYXQyLmludmVydCA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciBhMCA9IGFbMF0sIGExID0gYVsxXSwgYTIgPSBhWzJdLCBhMyA9IGFbM10sXG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuICAgICAgICBkZXQgPSBhMCAqIGEzIC0gYTIgKiBhMTtcblxuICAgIGlmICghZGV0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZXQgPSAxLjAgLyBkZXQ7XG4gICAgXG4gICAgb3V0WzBdID0gIGEzICogZGV0O1xuICAgIG91dFsxXSA9IC1hMSAqIGRldDtcbiAgICBvdXRbMl0gPSAtYTIgKiBkZXQ7XG4gICAgb3V0WzNdID0gIGEwICogZGV0O1xuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgYWRqdWdhdGUgb2YgYSBtYXQyXG4gKlxuICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0Mn0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDJ9IG91dFxuICovXG5tYXQyLmFkam9pbnQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICAvLyBDYWNoaW5nIHRoaXMgdmFsdWUgaXMgbmVzc2VjYXJ5IGlmIG91dCA9PSBhXG4gICAgdmFyIGEwID0gYVswXTtcbiAgICBvdXRbMF0gPSAgYVszXTtcbiAgICBvdXRbMV0gPSAtYVsxXTtcbiAgICBvdXRbMl0gPSAtYVsyXTtcbiAgICBvdXRbM10gPSAgYTA7XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdDJcbiAqXG4gKiBAcGFyYW0ge21hdDJ9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRldGVybWluYW50IG9mIGFcbiAqL1xubWF0Mi5kZXRlcm1pbmFudCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBhWzNdIC0gYVsyXSAqIGFbMV07XG59O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIG1hdDInc1xuICpcbiAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0Mn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAqL1xubWF0Mi5tdWx0aXBseSA9IGZ1bmN0aW9uIChvdXQsIGEsIGIpIHtcbiAgICB2YXIgYTAgPSBhWzBdLCBhMSA9IGFbMV0sIGEyID0gYVsyXSwgYTMgPSBhWzNdO1xuICAgIHZhciBiMCA9IGJbMF0sIGIxID0gYlsxXSwgYjIgPSBiWzJdLCBiMyA9IGJbM107XG4gICAgb3V0WzBdID0gYTAgKiBiMCArIGEyICogYjE7XG4gICAgb3V0WzFdID0gYTEgKiBiMCArIGEzICogYjE7XG4gICAgb3V0WzJdID0gYTAgKiBiMiArIGEyICogYjM7XG4gICAgb3V0WzNdID0gYTEgKiBiMiArIGEzICogYjM7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBtYXQyLm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cbm1hdDIubXVsID0gbWF0Mi5tdWx0aXBseTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0MiBieSB0aGUgZ2l2ZW4gYW5nbGVcbiAqXG4gKiBAcGFyYW0ge21hdDJ9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyfSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDJ9IG91dFxuICovXG5tYXQyLnJvdGF0ZSA9IGZ1bmN0aW9uIChvdXQsIGEsIHJhZCkge1xuICAgIHZhciBhMCA9IGFbMF0sIGExID0gYVsxXSwgYTIgPSBhWzJdLCBhMyA9IGFbM10sXG4gICAgICAgIHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBjID0gTWF0aC5jb3MocmFkKTtcbiAgICBvdXRbMF0gPSBhMCAqICBjICsgYTIgKiBzO1xuICAgIG91dFsxXSA9IGExICogIGMgKyBhMyAqIHM7XG4gICAgb3V0WzJdID0gYTAgKiAtcyArIGEyICogYztcbiAgICBvdXRbM10gPSBhMSAqIC1zICsgYTMgKiBjO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNjYWxlcyB0aGUgbWF0MiBieSB0aGUgZGltZW5zaW9ucyBpbiB0aGUgZ2l2ZW4gdmVjMlxuICpcbiAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJ9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7dmVjMn0gdiB0aGUgdmVjMiB0byBzY2FsZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gKiovXG5tYXQyLnNjYWxlID0gZnVuY3Rpb24ob3V0LCBhLCB2KSB7XG4gICAgdmFyIGEwID0gYVswXSwgYTEgPSBhWzFdLCBhMiA9IGFbMl0sIGEzID0gYVszXSxcbiAgICAgICAgdjAgPSB2WzBdLCB2MSA9IHZbMV07XG4gICAgb3V0WzBdID0gYTAgKiB2MDtcbiAgICBvdXRbMV0gPSBhMSAqIHYwO1xuICAgIG91dFsyXSA9IGEyICogdjE7XG4gICAgb3V0WzNdID0gYTMgKiB2MTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgbWF0MlxuICpcbiAqIEBwYXJhbSB7bWF0Mn0gbWF0IG1hdHJpeCB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbWF0cml4XG4gKi9cbm1hdDIuc3RyID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gJ21hdDIoJyArIGFbMF0gKyAnLCAnICsgYVsxXSArICcsICcgKyBhWzJdICsgJywgJyArIGFbM10gKyAnKSc7XG59O1xuXG4vKipcbiAqIFJldHVybnMgRnJvYmVuaXVzIG5vcm0gb2YgYSBtYXQyXG4gKlxuICogQHBhcmFtIHttYXQyfSBhIHRoZSBtYXRyaXggdG8gY2FsY3VsYXRlIEZyb2Jlbml1cyBub3JtIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBGcm9iZW5pdXMgbm9ybVxuICovXG5tYXQyLmZyb2IgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybihNYXRoLnNxcnQoTWF0aC5wb3coYVswXSwgMikgKyBNYXRoLnBvdyhhWzFdLCAyKSArIE1hdGgucG93KGFbMl0sIDIpICsgTWF0aC5wb3coYVszXSwgMikpKVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIEwsIEQgYW5kIFUgbWF0cmljZXMgKExvd2VyIHRyaWFuZ3VsYXIsIERpYWdvbmFsIGFuZCBVcHBlciB0cmlhbmd1bGFyKSBieSBmYWN0b3JpemluZyB0aGUgaW5wdXQgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJ9IEwgdGhlIGxvd2VyIHRyaWFuZ3VsYXIgbWF0cml4IFxuICogQHBhcmFtIHttYXQyfSBEIHRoZSBkaWFnb25hbCBtYXRyaXggXG4gKiBAcGFyYW0ge21hdDJ9IFUgdGhlIHVwcGVyIHRyaWFuZ3VsYXIgbWF0cml4IFxuICogQHBhcmFtIHttYXQyfSBhIHRoZSBpbnB1dCBtYXRyaXggdG8gZmFjdG9yaXplXG4gKi9cblxubWF0Mi5MRFUgPSBmdW5jdGlvbiAoTCwgRCwgVSwgYSkgeyBcbiAgICBMWzJdID0gYVsyXS9hWzBdOyBcbiAgICBVWzBdID0gYVswXTsgXG4gICAgVVsxXSA9IGFbMV07IFxuICAgIFVbM10gPSBhWzNdIC0gTFsyXSAqIFVbMV07IFxuICAgIHJldHVybiBbTCwgRCwgVV07ICAgICAgIFxufTsgXG5cbmlmKHR5cGVvZihleHBvcnRzKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBleHBvcnRzLm1hdDIgPSBtYXQyO1xufVxuO1xuLyogQ29weXJpZ2h0IChjKSAyMDEzLCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG5hcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAgICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBcbiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG5BTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SXG5BTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbihJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbkxPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbihJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS4gKi9cblxuLyoqXG4gKiBAY2xhc3MgMngzIE1hdHJpeFxuICogQG5hbWUgbWF0MmRcbiAqIFxuICogQGRlc2NyaXB0aW9uIFxuICogQSBtYXQyZCBjb250YWlucyBzaXggZWxlbWVudHMgZGVmaW5lZCBhczpcbiAqIDxwcmU+XG4gKiBbYSwgYywgdHgsXG4gKiAgYiwgZCwgdHldXG4gKiA8L3ByZT5cbiAqIFRoaXMgaXMgYSBzaG9ydCBmb3JtIGZvciB0aGUgM3gzIG1hdHJpeDpcbiAqIDxwcmU+XG4gKiBbYSwgYywgdHgsXG4gKiAgYiwgZCwgdHksXG4gKiAgMCwgMCwgMV1cbiAqIDwvcHJlPlxuICogVGhlIGxhc3Qgcm93IGlzIGlnbm9yZWQgc28gdGhlIGFycmF5IGlzIHNob3J0ZXIgYW5kIG9wZXJhdGlvbnMgYXJlIGZhc3Rlci5cbiAqL1xuXG52YXIgbWF0MmQgPSB7fTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IG1hdDJkXG4gKlxuICogQHJldHVybnMge21hdDJkfSBhIG5ldyAyeDMgbWF0cml4XG4gKi9cbm1hdDJkLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSg2KTtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAxO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gMDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG1hdDJkIGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQyZH0gYSBtYXRyaXggdG8gY2xvbmVcbiAqIEByZXR1cm5zIHttYXQyZH0gYSBuZXcgMngzIG1hdHJpeFxuICovXG5tYXQyZC5jbG9uZSA9IGZ1bmN0aW9uKGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoNik7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIG1hdDJkIHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge21hdDJkfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0MmR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gKi9cbm1hdDJkLmNvcHkgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTZXQgYSBtYXQyZCB0byB0aGUgaWRlbnRpdHkgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQyZH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0MmR9IG91dFxuICovXG5tYXQyZC5pZGVudGl0eSA9IGZ1bmN0aW9uKG91dCkge1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDE7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAwO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEludmVydHMgYSBtYXQyZFxuICpcbiAqIEBwYXJhbSB7bWF0MmR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyZH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDJkfSBvdXRcbiAqL1xubWF0MmQuaW52ZXJ0ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIGFhID0gYVswXSwgYWIgPSBhWzFdLCBhYyA9IGFbMl0sIGFkID0gYVszXSxcbiAgICAgICAgYXR4ID0gYVs0XSwgYXR5ID0gYVs1XTtcblxuICAgIHZhciBkZXQgPSBhYSAqIGFkIC0gYWIgKiBhYztcbiAgICBpZighZGV0KXtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGRldCA9IDEuMCAvIGRldDtcblxuICAgIG91dFswXSA9IGFkICogZGV0O1xuICAgIG91dFsxXSA9IC1hYiAqIGRldDtcbiAgICBvdXRbMl0gPSAtYWMgKiBkZXQ7XG4gICAgb3V0WzNdID0gYWEgKiBkZXQ7XG4gICAgb3V0WzRdID0gKGFjICogYXR5IC0gYWQgKiBhdHgpICogZGV0O1xuICAgIG91dFs1XSA9IChhYiAqIGF0eCAtIGFhICogYXR5KSAqIGRldDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdDJkXG4gKlxuICogQHBhcmFtIHttYXQyZH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge051bWJlcn0gZGV0ZXJtaW5hbnQgb2YgYVxuICovXG5tYXQyZC5kZXRlcm1pbmFudCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBhWzNdIC0gYVsxXSAqIGFbMl07XG59O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIG1hdDJkJ3NcbiAqXG4gKiBAcGFyYW0ge21hdDJkfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0MmR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0MmR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7bWF0MmR9IG91dFxuICovXG5tYXQyZC5tdWx0aXBseSA9IGZ1bmN0aW9uIChvdXQsIGEsIGIpIHtcbiAgICB2YXIgYTAgPSBhWzBdLCBhMSA9IGFbMV0sIGEyID0gYVsyXSwgYTMgPSBhWzNdLCBhNCA9IGFbNF0sIGE1ID0gYVs1XSxcbiAgICAgICAgYjAgPSBiWzBdLCBiMSA9IGJbMV0sIGIyID0gYlsyXSwgYjMgPSBiWzNdLCBiNCA9IGJbNF0sIGI1ID0gYls1XTtcbiAgICBvdXRbMF0gPSBhMCAqIGIwICsgYTIgKiBiMTtcbiAgICBvdXRbMV0gPSBhMSAqIGIwICsgYTMgKiBiMTtcbiAgICBvdXRbMl0gPSBhMCAqIGIyICsgYTIgKiBiMztcbiAgICBvdXRbM10gPSBhMSAqIGIyICsgYTMgKiBiMztcbiAgICBvdXRbNF0gPSBhMCAqIGI0ICsgYTIgKiBiNSArIGE0O1xuICAgIG91dFs1XSA9IGExICogYjQgKyBhMyAqIGI1ICsgYTU7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBtYXQyZC5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG5tYXQyZC5tdWwgPSBtYXQyZC5tdWx0aXBseTtcblxuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXQyZCBieSB0aGUgZ2l2ZW4gYW5nbGVcbiAqXG4gKiBAcGFyYW0ge21hdDJkfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0MmR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0MmR9IG91dFxuICovXG5tYXQyZC5yb3RhdGUgPSBmdW5jdGlvbiAob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgYTAgPSBhWzBdLCBhMSA9IGFbMV0sIGEyID0gYVsyXSwgYTMgPSBhWzNdLCBhNCA9IGFbNF0sIGE1ID0gYVs1XSxcbiAgICAgICAgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgIG91dFswXSA9IGEwICogIGMgKyBhMiAqIHM7XG4gICAgb3V0WzFdID0gYTEgKiAgYyArIGEzICogcztcbiAgICBvdXRbMl0gPSBhMCAqIC1zICsgYTIgKiBjO1xuICAgIG91dFszXSA9IGExICogLXMgKyBhMyAqIGM7XG4gICAgb3V0WzRdID0gYTQ7XG4gICAgb3V0WzVdID0gYTU7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2NhbGVzIHRoZSBtYXQyZCBieSB0aGUgZGltZW5zaW9ucyBpbiB0aGUgZ2l2ZW4gdmVjMlxuICpcbiAqIEBwYXJhbSB7bWF0MmR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyZH0gYSB0aGUgbWF0cml4IHRvIHRyYW5zbGF0ZVxuICogQHBhcmFtIHt2ZWMyfSB2IHRoZSB2ZWMyIHRvIHNjYWxlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gKiovXG5tYXQyZC5zY2FsZSA9IGZ1bmN0aW9uKG91dCwgYSwgdikge1xuICAgIHZhciBhMCA9IGFbMF0sIGExID0gYVsxXSwgYTIgPSBhWzJdLCBhMyA9IGFbM10sIGE0ID0gYVs0XSwgYTUgPSBhWzVdLFxuICAgICAgICB2MCA9IHZbMF0sIHYxID0gdlsxXTtcbiAgICBvdXRbMF0gPSBhMCAqIHYwO1xuICAgIG91dFsxXSA9IGExICogdjA7XG4gICAgb3V0WzJdID0gYTIgKiB2MTtcbiAgICBvdXRbM10gPSBhMyAqIHYxO1xuICAgIG91dFs0XSA9IGE0O1xuICAgIG91dFs1XSA9IGE1O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zbGF0ZXMgdGhlIG1hdDJkIGJ5IHRoZSBkaW1lbnNpb25zIGluIHRoZSBnaXZlbiB2ZWMyXG4gKlxuICogQHBhcmFtIHttYXQyZH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJkfSBhIHRoZSBtYXRyaXggdG8gdHJhbnNsYXRlXG4gKiBAcGFyYW0ge3ZlYzJ9IHYgdGhlIHZlYzIgdG8gdHJhbnNsYXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gKiovXG5tYXQyZC50cmFuc2xhdGUgPSBmdW5jdGlvbihvdXQsIGEsIHYpIHtcbiAgICB2YXIgYTAgPSBhWzBdLCBhMSA9IGFbMV0sIGEyID0gYVsyXSwgYTMgPSBhWzNdLCBhNCA9IGFbNF0sIGE1ID0gYVs1XSxcbiAgICAgICAgdjAgPSB2WzBdLCB2MSA9IHZbMV07XG4gICAgb3V0WzBdID0gYTA7XG4gICAgb3V0WzFdID0gYTE7XG4gICAgb3V0WzJdID0gYTI7XG4gICAgb3V0WzNdID0gYTM7XG4gICAgb3V0WzRdID0gYTAgKiB2MCArIGEyICogdjEgKyBhNDtcbiAgICBvdXRbNV0gPSBhMSAqIHYwICsgYTMgKiB2MSArIGE1O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBtYXQyZFxuICpcbiAqIEBwYXJhbSB7bWF0MmR9IGEgbWF0cml4IHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtYXRyaXhcbiAqL1xubWF0MmQuc3RyID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gJ21hdDJkKCcgKyBhWzBdICsgJywgJyArIGFbMV0gKyAnLCAnICsgYVsyXSArICcsICcgKyBcbiAgICAgICAgICAgICAgICAgICAgYVszXSArICcsICcgKyBhWzRdICsgJywgJyArIGFbNV0gKyAnKSc7XG59O1xuXG4vKipcbiAqIFJldHVybnMgRnJvYmVuaXVzIG5vcm0gb2YgYSBtYXQyZFxuICpcbiAqIEBwYXJhbSB7bWF0MmR9IGEgdGhlIG1hdHJpeCB0byBjYWxjdWxhdGUgRnJvYmVuaXVzIG5vcm0gb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IEZyb2Jlbml1cyBub3JtXG4gKi9cbm1hdDJkLmZyb2IgPSBmdW5jdGlvbiAoYSkgeyBcbiAgICByZXR1cm4oTWF0aC5zcXJ0KE1hdGgucG93KGFbMF0sIDIpICsgTWF0aC5wb3coYVsxXSwgMikgKyBNYXRoLnBvdyhhWzJdLCAyKSArIE1hdGgucG93KGFbM10sIDIpICsgTWF0aC5wb3coYVs0XSwgMikgKyBNYXRoLnBvdyhhWzVdLCAyKSArIDEpKVxufTsgXG5cbmlmKHR5cGVvZihleHBvcnRzKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBleHBvcnRzLm1hdDJkID0gbWF0MmQ7XG59XG47XG4vKiBDb3B5cmlnaHQgKGMpIDIwMTMsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbmFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcblxuICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICAgIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIFxuICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG5USElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkRcbkFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG5XQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIFxuRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1JcbkFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OXG5BTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVNcblNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLiAqL1xuXG4vKipcbiAqIEBjbGFzcyAzeDMgTWF0cml4XG4gKiBAbmFtZSBtYXQzXG4gKi9cblxudmFyIG1hdDMgPSB7fTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IG1hdDNcbiAqXG4gKiBAcmV0dXJucyB7bWF0M30gYSBuZXcgM3gzIG1hdHJpeFxuICovXG5tYXQzLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSg5KTtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDE7XG4gICAgb3V0WzVdID0gMDtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb3BpZXMgdGhlIHVwcGVyLWxlZnQgM3gzIHZhbHVlcyBpbnRvIHRoZSBnaXZlbiBtYXQzLlxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgM3gzIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhICAgdGhlIHNvdXJjZSA0eDQgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbm1hdDMuZnJvbU1hdDQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzRdO1xuICAgIG91dFs0XSA9IGFbNV07XG4gICAgb3V0WzVdID0gYVs2XTtcbiAgICBvdXRbNl0gPSBhWzhdO1xuICAgIG91dFs3XSA9IGFbOV07XG4gICAgb3V0WzhdID0gYVsxMF07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBtYXQzIGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQzfSBhIG1hdHJpeCB0byBjbG9uZVxuICogQHJldHVybnMge21hdDN9IGEgbmV3IDN4MyBtYXRyaXhcbiAqL1xubWF0My5jbG9uZSA9IGZ1bmN0aW9uKGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoOSk7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFs4XSA9IGFbOF07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIG1hdDMgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5jb3B5ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFs4XSA9IGFbOF07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IGEgbWF0MyB0byB0aGUgaWRlbnRpdHkgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5pZGVudGl0eSA9IGZ1bmN0aW9uKG91dCkge1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMTtcbiAgICBvdXRbNV0gPSAwO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zcG9zZSB0aGUgdmFsdWVzIG9mIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My50cmFuc3Bvc2UgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICAvLyBJZiB3ZSBhcmUgdHJhbnNwb3Npbmcgb3Vyc2VsdmVzIHdlIGNhbiBza2lwIGEgZmV3IHN0ZXBzIGJ1dCBoYXZlIHRvIGNhY2hlIHNvbWUgdmFsdWVzXG4gICAgaWYgKG91dCA9PT0gYSkge1xuICAgICAgICB2YXIgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTEyID0gYVs1XTtcbiAgICAgICAgb3V0WzFdID0gYVszXTtcbiAgICAgICAgb3V0WzJdID0gYVs2XTtcbiAgICAgICAgb3V0WzNdID0gYTAxO1xuICAgICAgICBvdXRbNV0gPSBhWzddO1xuICAgICAgICBvdXRbNl0gPSBhMDI7XG4gICAgICAgIG91dFs3XSA9IGExMjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvdXRbMF0gPSBhWzBdO1xuICAgICAgICBvdXRbMV0gPSBhWzNdO1xuICAgICAgICBvdXRbMl0gPSBhWzZdO1xuICAgICAgICBvdXRbM10gPSBhWzFdO1xuICAgICAgICBvdXRbNF0gPSBhWzRdO1xuICAgICAgICBvdXRbNV0gPSBhWzddO1xuICAgICAgICBvdXRbNl0gPSBhWzJdO1xuICAgICAgICBvdXRbN10gPSBhWzVdO1xuICAgICAgICBvdXRbOF0gPSBhWzhdO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBJbnZlcnRzIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5pbnZlcnQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSxcbiAgICAgICAgYTEwID0gYVszXSwgYTExID0gYVs0XSwgYTEyID0gYVs1XSxcbiAgICAgICAgYTIwID0gYVs2XSwgYTIxID0gYVs3XSwgYTIyID0gYVs4XSxcblxuICAgICAgICBiMDEgPSBhMjIgKiBhMTEgLSBhMTIgKiBhMjEsXG4gICAgICAgIGIxMSA9IC1hMjIgKiBhMTAgKyBhMTIgKiBhMjAsXG4gICAgICAgIGIyMSA9IGEyMSAqIGExMCAtIGExMSAqIGEyMCxcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gICAgICAgIGRldCA9IGEwMCAqIGIwMSArIGEwMSAqIGIxMSArIGEwMiAqIGIyMTtcblxuICAgIGlmICghZGV0KSB7IFxuICAgICAgICByZXR1cm4gbnVsbDsgXG4gICAgfVxuICAgIGRldCA9IDEuMCAvIGRldDtcblxuICAgIG91dFswXSA9IGIwMSAqIGRldDtcbiAgICBvdXRbMV0gPSAoLWEyMiAqIGEwMSArIGEwMiAqIGEyMSkgKiBkZXQ7XG4gICAgb3V0WzJdID0gKGExMiAqIGEwMSAtIGEwMiAqIGExMSkgKiBkZXQ7XG4gICAgb3V0WzNdID0gYjExICogZGV0O1xuICAgIG91dFs0XSA9IChhMjIgKiBhMDAgLSBhMDIgKiBhMjApICogZGV0O1xuICAgIG91dFs1XSA9ICgtYTEyICogYTAwICsgYTAyICogYTEwKSAqIGRldDtcbiAgICBvdXRbNl0gPSBiMjEgKiBkZXQ7XG4gICAgb3V0WzddID0gKC1hMjEgKiBhMDAgKyBhMDEgKiBhMjApICogZGV0O1xuICAgIG91dFs4XSA9IChhMTEgKiBhMDAgLSBhMDEgKiBhMTApICogZGV0O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGFkanVnYXRlIG9mIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5hZGpvaW50ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sXG4gICAgICAgIGExMCA9IGFbM10sIGExMSA9IGFbNF0sIGExMiA9IGFbNV0sXG4gICAgICAgIGEyMCA9IGFbNl0sIGEyMSA9IGFbN10sIGEyMiA9IGFbOF07XG5cbiAgICBvdXRbMF0gPSAoYTExICogYTIyIC0gYTEyICogYTIxKTtcbiAgICBvdXRbMV0gPSAoYTAyICogYTIxIC0gYTAxICogYTIyKTtcbiAgICBvdXRbMl0gPSAoYTAxICogYTEyIC0gYTAyICogYTExKTtcbiAgICBvdXRbM10gPSAoYTEyICogYTIwIC0gYTEwICogYTIyKTtcbiAgICBvdXRbNF0gPSAoYTAwICogYTIyIC0gYTAyICogYTIwKTtcbiAgICBvdXRbNV0gPSAoYTAyICogYTEwIC0gYTAwICogYTEyKTtcbiAgICBvdXRbNl0gPSAoYTEwICogYTIxIC0gYTExICogYTIwKTtcbiAgICBvdXRbN10gPSAoYTAxICogYTIwIC0gYTAwICogYTIxKTtcbiAgICBvdXRbOF0gPSAoYTAwICogYTExIC0gYTAxICogYTEwKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdDNcbiAqXG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRldGVybWluYW50IG9mIGFcbiAqL1xubWF0My5kZXRlcm1pbmFudCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sXG4gICAgICAgIGExMCA9IGFbM10sIGExMSA9IGFbNF0sIGExMiA9IGFbNV0sXG4gICAgICAgIGEyMCA9IGFbNl0sIGEyMSA9IGFbN10sIGEyMiA9IGFbOF07XG5cbiAgICByZXR1cm4gYTAwICogKGEyMiAqIGExMSAtIGExMiAqIGEyMSkgKyBhMDEgKiAoLWEyMiAqIGExMCArIGExMiAqIGEyMCkgKyBhMDIgKiAoYTIxICogYTEwIC0gYTExICogYTIwKTtcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gbWF0MydzXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHttYXQzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLm11bHRpcGx5ID0gZnVuY3Rpb24gKG91dCwgYSwgYikge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLFxuICAgICAgICBhMTAgPSBhWzNdLCBhMTEgPSBhWzRdLCBhMTIgPSBhWzVdLFxuICAgICAgICBhMjAgPSBhWzZdLCBhMjEgPSBhWzddLCBhMjIgPSBhWzhdLFxuXG4gICAgICAgIGIwMCA9IGJbMF0sIGIwMSA9IGJbMV0sIGIwMiA9IGJbMl0sXG4gICAgICAgIGIxMCA9IGJbM10sIGIxMSA9IGJbNF0sIGIxMiA9IGJbNV0sXG4gICAgICAgIGIyMCA9IGJbNl0sIGIyMSA9IGJbN10sIGIyMiA9IGJbOF07XG5cbiAgICBvdXRbMF0gPSBiMDAgKiBhMDAgKyBiMDEgKiBhMTAgKyBiMDIgKiBhMjA7XG4gICAgb3V0WzFdID0gYjAwICogYTAxICsgYjAxICogYTExICsgYjAyICogYTIxO1xuICAgIG91dFsyXSA9IGIwMCAqIGEwMiArIGIwMSAqIGExMiArIGIwMiAqIGEyMjtcblxuICAgIG91dFszXSA9IGIxMCAqIGEwMCArIGIxMSAqIGExMCArIGIxMiAqIGEyMDtcbiAgICBvdXRbNF0gPSBiMTAgKiBhMDEgKyBiMTEgKiBhMTEgKyBiMTIgKiBhMjE7XG4gICAgb3V0WzVdID0gYjEwICogYTAyICsgYjExICogYTEyICsgYjEyICogYTIyO1xuXG4gICAgb3V0WzZdID0gYjIwICogYTAwICsgYjIxICogYTEwICsgYjIyICogYTIwO1xuICAgIG91dFs3XSA9IGIyMCAqIGEwMSArIGIyMSAqIGExMSArIGIyMiAqIGEyMTtcbiAgICBvdXRbOF0gPSBiMjAgKiBhMDIgKyBiMjEgKiBhMTIgKyBiMjIgKiBhMjI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBtYXQzLm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cbm1hdDMubXVsID0gbWF0My5tdWx0aXBseTtcblxuLyoqXG4gKiBUcmFuc2xhdGUgYSBtYXQzIGJ5IHRoZSBnaXZlbiB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBtYXRyaXggdG8gdHJhbnNsYXRlXG4gKiBAcGFyYW0ge3ZlYzJ9IHYgdmVjdG9yIHRvIHRyYW5zbGF0ZSBieVxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uKG91dCwgYSwgdikge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLFxuICAgICAgICBhMTAgPSBhWzNdLCBhMTEgPSBhWzRdLCBhMTIgPSBhWzVdLFxuICAgICAgICBhMjAgPSBhWzZdLCBhMjEgPSBhWzddLCBhMjIgPSBhWzhdLFxuICAgICAgICB4ID0gdlswXSwgeSA9IHZbMV07XG5cbiAgICBvdXRbMF0gPSBhMDA7XG4gICAgb3V0WzFdID0gYTAxO1xuICAgIG91dFsyXSA9IGEwMjtcblxuICAgIG91dFszXSA9IGExMDtcbiAgICBvdXRbNF0gPSBhMTE7XG4gICAgb3V0WzVdID0gYTEyO1xuXG4gICAgb3V0WzZdID0geCAqIGEwMCArIHkgKiBhMTAgKyBhMjA7XG4gICAgb3V0WzddID0geCAqIGEwMSArIHkgKiBhMTEgKyBhMjE7XG4gICAgb3V0WzhdID0geCAqIGEwMiArIHkgKiBhMTIgKyBhMjI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdDMgYnkgdGhlIGdpdmVuIGFuZ2xlXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5yb3RhdGUgPSBmdW5jdGlvbiAob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSxcbiAgICAgICAgYTEwID0gYVszXSwgYTExID0gYVs0XSwgYTEyID0gYVs1XSxcbiAgICAgICAgYTIwID0gYVs2XSwgYTIxID0gYVs3XSwgYTIyID0gYVs4XSxcblxuICAgICAgICBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICBvdXRbMF0gPSBjICogYTAwICsgcyAqIGExMDtcbiAgICBvdXRbMV0gPSBjICogYTAxICsgcyAqIGExMTtcbiAgICBvdXRbMl0gPSBjICogYTAyICsgcyAqIGExMjtcblxuICAgIG91dFszXSA9IGMgKiBhMTAgLSBzICogYTAwO1xuICAgIG91dFs0XSA9IGMgKiBhMTEgLSBzICogYTAxO1xuICAgIG91dFs1XSA9IGMgKiBhMTIgLSBzICogYTAyO1xuXG4gICAgb3V0WzZdID0gYTIwO1xuICAgIG91dFs3XSA9IGEyMTtcbiAgICBvdXRbOF0gPSBhMjI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2NhbGVzIHRoZSBtYXQzIGJ5IHRoZSBkaW1lbnNpb25zIGluIHRoZSBnaXZlbiB2ZWMyXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHt2ZWMyfSB2IHRoZSB2ZWMyIHRvIHNjYWxlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqKi9cbm1hdDMuc2NhbGUgPSBmdW5jdGlvbihvdXQsIGEsIHYpIHtcbiAgICB2YXIgeCA9IHZbMF0sIHkgPSB2WzFdO1xuXG4gICAgb3V0WzBdID0geCAqIGFbMF07XG4gICAgb3V0WzFdID0geCAqIGFbMV07XG4gICAgb3V0WzJdID0geCAqIGFbMl07XG5cbiAgICBvdXRbM10gPSB5ICogYVszXTtcbiAgICBvdXRbNF0gPSB5ICogYVs0XTtcbiAgICBvdXRbNV0gPSB5ICogYVs1XTtcblxuICAgIG91dFs2XSA9IGFbNl07XG4gICAgb3V0WzddID0gYVs3XTtcbiAgICBvdXRbOF0gPSBhWzhdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIGZyb20gYSBtYXQyZCBpbnRvIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJkfSBhIHRoZSBtYXRyaXggdG8gY29weVxuICogQHJldHVybnMge21hdDN9IG91dFxuICoqL1xubWF0My5mcm9tTWF0MmQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gMDtcblxuICAgIG91dFszXSA9IGFbMl07XG4gICAgb3V0WzRdID0gYVszXTtcbiAgICBvdXRbNV0gPSAwO1xuXG4gICAgb3V0WzZdID0gYVs0XTtcbiAgICBvdXRbN10gPSBhWzVdO1xuICAgIG91dFs4XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuKiBDYWxjdWxhdGVzIGEgM3gzIG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBxdWF0ZXJuaW9uXG4qXG4qIEBwYXJhbSB7bWF0M30gb3V0IG1hdDMgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiogQHBhcmFtIHtxdWF0fSBxIFF1YXRlcm5pb24gdG8gY3JlYXRlIG1hdHJpeCBmcm9tXG4qXG4qIEByZXR1cm5zIHttYXQzfSBvdXRcbiovXG5tYXQzLmZyb21RdWF0ID0gZnVuY3Rpb24gKG91dCwgcSkge1xuICAgIHZhciB4ID0gcVswXSwgeSA9IHFbMV0sIHogPSBxWzJdLCB3ID0gcVszXSxcbiAgICAgICAgeDIgPSB4ICsgeCxcbiAgICAgICAgeTIgPSB5ICsgeSxcbiAgICAgICAgejIgPSB6ICsgeixcblxuICAgICAgICB4eCA9IHggKiB4MixcbiAgICAgICAgeXggPSB5ICogeDIsXG4gICAgICAgIHl5ID0geSAqIHkyLFxuICAgICAgICB6eCA9IHogKiB4MixcbiAgICAgICAgenkgPSB6ICogeTIsXG4gICAgICAgIHp6ID0geiAqIHoyLFxuICAgICAgICB3eCA9IHcgKiB4MixcbiAgICAgICAgd3kgPSB3ICogeTIsXG4gICAgICAgIHd6ID0gdyAqIHoyO1xuXG4gICAgb3V0WzBdID0gMSAtIHl5IC0geno7XG4gICAgb3V0WzNdID0geXggLSB3ejtcbiAgICBvdXRbNl0gPSB6eCArIHd5O1xuXG4gICAgb3V0WzFdID0geXggKyB3ejtcbiAgICBvdXRbNF0gPSAxIC0geHggLSB6ejtcbiAgICBvdXRbN10gPSB6eSAtIHd4O1xuXG4gICAgb3V0WzJdID0genggLSB3eTtcbiAgICBvdXRbNV0gPSB6eSArIHd4O1xuICAgIG91dFs4XSA9IDEgLSB4eCAtIHl5O1xuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuKiBDYWxjdWxhdGVzIGEgM3gzIG5vcm1hbCBtYXRyaXggKHRyYW5zcG9zZSBpbnZlcnNlKSBmcm9tIHRoZSA0eDQgbWF0cml4XG4qXG4qIEBwYXJhbSB7bWF0M30gb3V0IG1hdDMgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiogQHBhcmFtIHttYXQ0fSBhIE1hdDQgdG8gZGVyaXZlIHRoZSBub3JtYWwgbWF0cml4IGZyb21cbipcbiogQHJldHVybnMge21hdDN9IG91dFxuKi9cbm1hdDMubm9ybWFsRnJvbU1hdDQgPSBmdW5jdGlvbiAob3V0LCBhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sIGExMSA9IGFbNV0sIGExMiA9IGFbNl0sIGExMyA9IGFbN10sXG4gICAgICAgIGEyMCA9IGFbOF0sIGEyMSA9IGFbOV0sIGEyMiA9IGFbMTBdLCBhMjMgPSBhWzExXSxcbiAgICAgICAgYTMwID0gYVsxMl0sIGEzMSA9IGFbMTNdLCBhMzIgPSBhWzE0XSwgYTMzID0gYVsxNV0sXG5cbiAgICAgICAgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwLFxuICAgICAgICBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTAsXG4gICAgICAgIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMCxcbiAgICAgICAgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExLFxuICAgICAgICBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTEsXG4gICAgICAgIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMixcbiAgICAgICAgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwLFxuICAgICAgICBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzAsXG4gICAgICAgIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMCxcbiAgICAgICAgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxLFxuICAgICAgICBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzEsXG4gICAgICAgIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMixcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gICAgICAgIGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcblxuICAgIGlmICghZGV0KSB7IFxuICAgICAgICByZXR1cm4gbnVsbDsgXG4gICAgfVxuICAgIGRldCA9IDEuMCAvIGRldDtcblxuICAgIG91dFswXSA9IChhMTEgKiBiMTEgLSBhMTIgKiBiMTAgKyBhMTMgKiBiMDkpICogZGV0O1xuICAgIG91dFsxXSA9IChhMTIgKiBiMDggLSBhMTAgKiBiMTEgLSBhMTMgKiBiMDcpICogZGV0O1xuICAgIG91dFsyXSA9IChhMTAgKiBiMTAgLSBhMTEgKiBiMDggKyBhMTMgKiBiMDYpICogZGV0O1xuXG4gICAgb3V0WzNdID0gKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQ7XG4gICAgb3V0WzRdID0gKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQ7XG4gICAgb3V0WzVdID0gKGEwMSAqIGIwOCAtIGEwMCAqIGIxMCAtIGEwMyAqIGIwNikgKiBkZXQ7XG5cbiAgICBvdXRbNl0gPSAoYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzKSAqIGRldDtcbiAgICBvdXRbN10gPSAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldDtcbiAgICBvdXRbOF0gPSAoYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwKSAqIGRldDtcblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBtYXQzXG4gKlxuICogQHBhcmFtIHttYXQzfSBtYXQgbWF0cml4IHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtYXRyaXhcbiAqL1xubWF0My5zdHIgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiAnbWF0MygnICsgYVswXSArICcsICcgKyBhWzFdICsgJywgJyArIGFbMl0gKyAnLCAnICsgXG4gICAgICAgICAgICAgICAgICAgIGFbM10gKyAnLCAnICsgYVs0XSArICcsICcgKyBhWzVdICsgJywgJyArIFxuICAgICAgICAgICAgICAgICAgICBhWzZdICsgJywgJyArIGFbN10gKyAnLCAnICsgYVs4XSArICcpJztcbn07XG5cbi8qKlxuICogUmV0dXJucyBGcm9iZW5pdXMgbm9ybSBvZiBhIG1hdDNcbiAqXG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIG1hdHJpeCB0byBjYWxjdWxhdGUgRnJvYmVuaXVzIG5vcm0gb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IEZyb2Jlbml1cyBub3JtXG4gKi9cbm1hdDMuZnJvYiA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuKE1hdGguc3FydChNYXRoLnBvdyhhWzBdLCAyKSArIE1hdGgucG93KGFbMV0sIDIpICsgTWF0aC5wb3coYVsyXSwgMikgKyBNYXRoLnBvdyhhWzNdLCAyKSArIE1hdGgucG93KGFbNF0sIDIpICsgTWF0aC5wb3coYVs1XSwgMikgKyBNYXRoLnBvdyhhWzZdLCAyKSArIE1hdGgucG93KGFbN10sIDIpICsgTWF0aC5wb3coYVs4XSwgMikpKVxufTtcblxuXG5pZih0eXBlb2YoZXhwb3J0cykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZXhwb3J0cy5tYXQzID0gbWF0Mztcbn1cbjtcbi8qIENvcHlyaWdodCAoYykgMjAxMywgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4gICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gICAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gXG4gICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgXG5ESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUlxuQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4oSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG5MT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT05cbkFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4oSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJU1xuU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuICovXG5cbi8qKlxuICogQGNsYXNzIDR4NCBNYXRyaXhcbiAqIEBuYW1lIG1hdDRcbiAqL1xuXG52YXIgbWF0NCA9IHt9O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaWRlbnRpdHkgbWF0NFxuICpcbiAqIEByZXR1cm5zIHttYXQ0fSBhIG5ldyA0eDQgbWF0cml4XG4gKi9cbm1hdDQuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDE2KTtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gMTtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSAxO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAwO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgbWF0NCBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIG1hdHJpeFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gYSBtYXRyaXggdG8gY2xvbmVcbiAqIEByZXR1cm5zIHttYXQ0fSBhIG5ldyA0eDQgbWF0cml4XG4gKi9cbm1hdDQuY2xvbmUgPSBmdW5jdGlvbihhKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDE2KTtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICBvdXRbNl0gPSBhWzZdO1xuICAgIG91dFs3XSA9IGFbN107XG4gICAgb3V0WzhdID0gYVs4XTtcbiAgICBvdXRbOV0gPSBhWzldO1xuICAgIG91dFsxMF0gPSBhWzEwXTtcbiAgICBvdXRbMTFdID0gYVsxMV07XG4gICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSBtYXQ0IHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuY29weSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgb3V0WzRdID0gYVs0XTtcbiAgICBvdXRbNV0gPSBhWzVdO1xuICAgIG91dFs2XSA9IGFbNl07XG4gICAgb3V0WzddID0gYVs3XTtcbiAgICBvdXRbOF0gPSBhWzhdO1xuICAgIG91dFs5XSA9IGFbOV07XG4gICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgIG91dFsxMV0gPSBhWzExXTtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IGEgbWF0NCB0byB0aGUgaWRlbnRpdHkgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5pZGVudGl0eSA9IGZ1bmN0aW9uKG91dCkge1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAxO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzEwXSA9IDE7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNwb3NlIHRoZSB2YWx1ZXMgb2YgYSBtYXQ0XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LnRyYW5zcG9zZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIC8vIElmIHdlIGFyZSB0cmFuc3Bvc2luZyBvdXJzZWx2ZXMgd2UgY2FuIHNraXAgYSBmZXcgc3RlcHMgYnV0IGhhdmUgdG8gY2FjaGUgc29tZSB2YWx1ZXNcbiAgICBpZiAob3V0ID09PSBhKSB7XG4gICAgICAgIHZhciBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLCBhMDMgPSBhWzNdLFxuICAgICAgICAgICAgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgICAgIGEyMyA9IGFbMTFdO1xuXG4gICAgICAgIG91dFsxXSA9IGFbNF07XG4gICAgICAgIG91dFsyXSA9IGFbOF07XG4gICAgICAgIG91dFszXSA9IGFbMTJdO1xuICAgICAgICBvdXRbNF0gPSBhMDE7XG4gICAgICAgIG91dFs2XSA9IGFbOV07XG4gICAgICAgIG91dFs3XSA9IGFbMTNdO1xuICAgICAgICBvdXRbOF0gPSBhMDI7XG4gICAgICAgIG91dFs5XSA9IGExMjtcbiAgICAgICAgb3V0WzExXSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTJdID0gYTAzO1xuICAgICAgICBvdXRbMTNdID0gYTEzO1xuICAgICAgICBvdXRbMTRdID0gYTIzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG91dFswXSA9IGFbMF07XG4gICAgICAgIG91dFsxXSA9IGFbNF07XG4gICAgICAgIG91dFsyXSA9IGFbOF07XG4gICAgICAgIG91dFszXSA9IGFbMTJdO1xuICAgICAgICBvdXRbNF0gPSBhWzFdO1xuICAgICAgICBvdXRbNV0gPSBhWzVdO1xuICAgICAgICBvdXRbNl0gPSBhWzldO1xuICAgICAgICBvdXRbN10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzhdID0gYVsyXTtcbiAgICAgICAgb3V0WzldID0gYVs2XTtcbiAgICAgICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgICAgICBvdXRbMTFdID0gYVsxNF07XG4gICAgICAgIG91dFsxMl0gPSBhWzNdO1xuICAgICAgICBvdXRbMTNdID0gYVs3XTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTFdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEludmVydHMgYSBtYXQ0XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmludmVydCA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLCBhMDMgPSBhWzNdLFxuICAgICAgICBhMTAgPSBhWzRdLCBhMTEgPSBhWzVdLCBhMTIgPSBhWzZdLCBhMTMgPSBhWzddLFxuICAgICAgICBhMjAgPSBhWzhdLCBhMjEgPSBhWzldLCBhMjIgPSBhWzEwXSwgYTIzID0gYVsxMV0sXG4gICAgICAgIGEzMCA9IGFbMTJdLCBhMzEgPSBhWzEzXSwgYTMyID0gYVsxNF0sIGEzMyA9IGFbMTVdLFxuXG4gICAgICAgIGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMCxcbiAgICAgICAgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwLFxuICAgICAgICBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTAsXG4gICAgICAgIGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMSxcbiAgICAgICAgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExLFxuICAgICAgICBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTIsXG4gICAgICAgIGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMCxcbiAgICAgICAgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwLFxuICAgICAgICBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzAsXG4gICAgICAgIGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMSxcbiAgICAgICAgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxLFxuICAgICAgICBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzIsXG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuICAgICAgICBkZXQgPSBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XG5cbiAgICBpZiAoIWRldCkgeyBcbiAgICAgICAgcmV0dXJuIG51bGw7IFxuICAgIH1cbiAgICBkZXQgPSAxLjAgLyBkZXQ7XG5cbiAgICBvdXRbMF0gPSAoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5KSAqIGRldDtcbiAgICBvdXRbMV0gPSAoYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5KSAqIGRldDtcbiAgICBvdXRbMl0gPSAoYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzKSAqIGRldDtcbiAgICBvdXRbM10gPSAoYTIyICogYjA0IC0gYTIxICogYjA1IC0gYTIzICogYjAzKSAqIGRldDtcbiAgICBvdXRbNF0gPSAoYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3KSAqIGRldDtcbiAgICBvdXRbNV0gPSAoYTAwICogYjExIC0gYTAyICogYjA4ICsgYTAzICogYjA3KSAqIGRldDtcbiAgICBvdXRbNl0gPSAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldDtcbiAgICBvdXRbN10gPSAoYTIwICogYjA1IC0gYTIyICogYjAyICsgYTIzICogYjAxKSAqIGRldDtcbiAgICBvdXRbOF0gPSAoYTEwICogYjEwIC0gYTExICogYjA4ICsgYTEzICogYjA2KSAqIGRldDtcbiAgICBvdXRbOV0gPSAoYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2KSAqIGRldDtcbiAgICBvdXRbMTBdID0gKGEzMCAqIGIwNCAtIGEzMSAqIGIwMiArIGEzMyAqIGIwMCkgKiBkZXQ7XG4gICAgb3V0WzExXSA9IChhMjEgKiBiMDIgLSBhMjAgKiBiMDQgLSBhMjMgKiBiMDApICogZGV0O1xuICAgIG91dFsxMl0gPSAoYTExICogYjA3IC0gYTEwICogYjA5IC0gYTEyICogYjA2KSAqIGRldDtcbiAgICBvdXRbMTNdID0gKGEwMCAqIGIwOSAtIGEwMSAqIGIwNyArIGEwMiAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzE0XSA9IChhMzEgKiBiMDEgLSBhMzAgKiBiMDMgLSBhMzIgKiBiMDApICogZGV0O1xuICAgIG91dFsxNV0gPSAoYTIwICogYjAzIC0gYTIxICogYjAxICsgYTIyICogYjAwKSAqIGRldDtcblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGFkanVnYXRlIG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5hZGpvaW50ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sIGExMSA9IGFbNV0sIGExMiA9IGFbNl0sIGExMyA9IGFbN10sXG4gICAgICAgIGEyMCA9IGFbOF0sIGEyMSA9IGFbOV0sIGEyMiA9IGFbMTBdLCBhMjMgPSBhWzExXSxcbiAgICAgICAgYTMwID0gYVsxMl0sIGEzMSA9IGFbMTNdLCBhMzIgPSBhWzE0XSwgYTMzID0gYVsxNV07XG5cbiAgICBvdXRbMF0gID0gIChhMTEgKiAoYTIyICogYTMzIC0gYTIzICogYTMyKSAtIGEyMSAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpICsgYTMxICogKGExMiAqIGEyMyAtIGExMyAqIGEyMikpO1xuICAgIG91dFsxXSAgPSAtKGEwMSAqIChhMjIgKiBhMzMgLSBhMjMgKiBhMzIpIC0gYTIxICogKGEwMiAqIGEzMyAtIGEwMyAqIGEzMikgKyBhMzEgKiAoYTAyICogYTIzIC0gYTAzICogYTIyKSk7XG4gICAgb3V0WzJdICA9ICAoYTAxICogKGExMiAqIGEzMyAtIGExMyAqIGEzMikgLSBhMTEgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMSAqIChhMDIgKiBhMTMgLSBhMDMgKiBhMTIpKTtcbiAgICBvdXRbM10gID0gLShhMDEgKiAoYTEyICogYTIzIC0gYTEzICogYTIyKSAtIGExMSAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpICsgYTIxICogKGEwMiAqIGExMyAtIGEwMyAqIGExMikpO1xuICAgIG91dFs0XSAgPSAtKGExMCAqIChhMjIgKiBhMzMgLSBhMjMgKiBhMzIpIC0gYTIwICogKGExMiAqIGEzMyAtIGExMyAqIGEzMikgKyBhMzAgKiAoYTEyICogYTIzIC0gYTEzICogYTIyKSk7XG4gICAgb3V0WzVdICA9ICAoYTAwICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjAgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMCAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpKTtcbiAgICBvdXRbNl0gID0gLShhMDAgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSAtIGExMCAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMwICogKGEwMiAqIGExMyAtIGEwMyAqIGExMikpO1xuICAgIG91dFs3XSAgPSAgKGEwMCAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpIC0gYTEwICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikgKyBhMjAgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gICAgb3V0WzhdICA9ICAoYTEwICogKGEyMSAqIGEzMyAtIGEyMyAqIGEzMSkgLSBhMjAgKiAoYTExICogYTMzIC0gYTEzICogYTMxKSArIGEzMCAqIChhMTEgKiBhMjMgLSBhMTMgKiBhMjEpKTtcbiAgICBvdXRbOV0gID0gLShhMDAgKiAoYTIxICogYTMzIC0gYTIzICogYTMxKSAtIGEyMCAqIChhMDEgKiBhMzMgLSBhMDMgKiBhMzEpICsgYTMwICogKGEwMSAqIGEyMyAtIGEwMyAqIGEyMSkpO1xuICAgIG91dFsxMF0gPSAgKGEwMCAqIChhMTEgKiBhMzMgLSBhMTMgKiBhMzEpIC0gYTEwICogKGEwMSAqIGEzMyAtIGEwMyAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTEzIC0gYTAzICogYTExKSk7XG4gICAgb3V0WzExXSA9IC0oYTAwICogKGExMSAqIGEyMyAtIGExMyAqIGEyMSkgLSBhMTAgKiAoYTAxICogYTIzIC0gYTAzICogYTIxKSArIGEyMCAqIChhMDEgKiBhMTMgLSBhMDMgKiBhMTEpKTtcbiAgICBvdXRbMTJdID0gLShhMTAgKiAoYTIxICogYTMyIC0gYTIyICogYTMxKSAtIGEyMCAqIChhMTEgKiBhMzIgLSBhMTIgKiBhMzEpICsgYTMwICogKGExMSAqIGEyMiAtIGExMiAqIGEyMSkpO1xuICAgIG91dFsxM10gPSAgKGEwMCAqIChhMjEgKiBhMzIgLSBhMjIgKiBhMzEpIC0gYTIwICogKGEwMSAqIGEzMiAtIGEwMiAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTIyIC0gYTAyICogYTIxKSk7XG4gICAgb3V0WzE0XSA9IC0oYTAwICogKGExMSAqIGEzMiAtIGExMiAqIGEzMSkgLSBhMTAgKiAoYTAxICogYTMyIC0gYTAyICogYTMxKSArIGEzMCAqIChhMDEgKiBhMTIgLSBhMDIgKiBhMTEpKTtcbiAgICBvdXRbMTVdID0gIChhMDAgKiAoYTExICogYTIyIC0gYTEyICogYTIxKSAtIGExMCAqIChhMDEgKiBhMjIgLSBhMDIgKiBhMjEpICsgYTIwICogKGEwMSAqIGExMiAtIGEwMiAqIGExMSkpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge051bWJlcn0gZGV0ZXJtaW5hbnQgb2YgYVxuICovXG5tYXQ0LmRldGVybWluYW50ID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgICAgICBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XSxcblxuICAgICAgICBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTAsXG4gICAgICAgIGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMCxcbiAgICAgICAgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwLFxuICAgICAgICBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTEsXG4gICAgICAgIGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMSxcbiAgICAgICAgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyLFxuICAgICAgICBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzAsXG4gICAgICAgIGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMCxcbiAgICAgICAgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwLFxuICAgICAgICBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzEsXG4gICAgICAgIGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMSxcbiAgICAgICAgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuICAgIHJldHVybiBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XG59O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIG1hdDQnc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5tdWx0aXBseSA9IGZ1bmN0aW9uIChvdXQsIGEsIGIpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgICAgICBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XTtcblxuICAgIC8vIENhY2hlIG9ubHkgdGhlIGN1cnJlbnQgbGluZSBvZiB0aGUgc2Vjb25kIG1hdHJpeFxuICAgIHZhciBiMCAgPSBiWzBdLCBiMSA9IGJbMV0sIGIyID0gYlsyXSwgYjMgPSBiWzNdOyAgXG4gICAgb3V0WzBdID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dFsxXSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXRbMl0gPSBiMCphMDIgKyBiMSphMTIgKyBiMiphMjIgKyBiMyphMzI7XG4gICAgb3V0WzNdID0gYjAqYTAzICsgYjEqYTEzICsgYjIqYTIzICsgYjMqYTMzO1xuXG4gICAgYjAgPSBiWzRdOyBiMSA9IGJbNV07IGIyID0gYls2XTsgYjMgPSBiWzddO1xuICAgIG91dFs0XSA9IGIwKmEwMCArIGIxKmExMCArIGIyKmEyMCArIGIzKmEzMDtcbiAgICBvdXRbNV0gPSBiMCphMDEgKyBiMSphMTEgKyBiMiphMjEgKyBiMyphMzE7XG4gICAgb3V0WzZdID0gYjAqYTAyICsgYjEqYTEyICsgYjIqYTIyICsgYjMqYTMyO1xuICAgIG91dFs3XSA9IGIwKmEwMyArIGIxKmExMyArIGIyKmEyMyArIGIzKmEzMztcblxuICAgIGIwID0gYls4XTsgYjEgPSBiWzldOyBiMiA9IGJbMTBdOyBiMyA9IGJbMTFdO1xuICAgIG91dFs4XSA9IGIwKmEwMCArIGIxKmExMCArIGIyKmEyMCArIGIzKmEzMDtcbiAgICBvdXRbOV0gPSBiMCphMDEgKyBiMSphMTEgKyBiMiphMjEgKyBiMyphMzE7XG4gICAgb3V0WzEwXSA9IGIwKmEwMiArIGIxKmExMiArIGIyKmEyMiArIGIzKmEzMjtcbiAgICBvdXRbMTFdID0gYjAqYTAzICsgYjEqYTEzICsgYjIqYTIzICsgYjMqYTMzO1xuXG4gICAgYjAgPSBiWzEyXTsgYjEgPSBiWzEzXTsgYjIgPSBiWzE0XTsgYjMgPSBiWzE1XTtcbiAgICBvdXRbMTJdID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dFsxM10gPSBiMCphMDEgKyBiMSphMTEgKyBiMiphMjEgKyBiMyphMzE7XG4gICAgb3V0WzE0XSA9IGIwKmEwMiArIGIxKmExMiArIGIyKmEyMiArIGIzKmEzMjtcbiAgICBvdXRbMTVdID0gYjAqYTAzICsgYjEqYTEzICsgYjIqYTIzICsgYjMqYTMzO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgbWF0NC5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG5tYXQ0Lm11bCA9IG1hdDQubXVsdGlwbHk7XG5cbi8qKlxuICogVHJhbnNsYXRlIGEgbWF0NCBieSB0aGUgZ2l2ZW4gdmVjdG9yXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHRyYW5zbGF0ZVxuICogQHBhcmFtIHt2ZWMzfSB2IHZlY3RvciB0byB0cmFuc2xhdGUgYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC50cmFuc2xhdGUgPSBmdW5jdGlvbiAob3V0LCBhLCB2KSB7XG4gICAgdmFyIHggPSB2WzBdLCB5ID0gdlsxXSwgeiA9IHZbMl0sXG4gICAgICAgIGEwMCwgYTAxLCBhMDIsIGEwMyxcbiAgICAgICAgYTEwLCBhMTEsIGExMiwgYTEzLFxuICAgICAgICBhMjAsIGEyMSwgYTIyLCBhMjM7XG5cbiAgICBpZiAoYSA9PT0gb3V0KSB7XG4gICAgICAgIG91dFsxMl0gPSBhWzBdICogeCArIGFbNF0gKiB5ICsgYVs4XSAqIHogKyBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMV0gKiB4ICsgYVs1XSAqIHkgKyBhWzldICogeiArIGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsyXSAqIHggKyBhWzZdICogeSArIGFbMTBdICogeiArIGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVszXSAqIHggKyBhWzddICogeSArIGFbMTFdICogeiArIGFbMTVdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGEwMCA9IGFbMF07IGEwMSA9IGFbMV07IGEwMiA9IGFbMl07IGEwMyA9IGFbM107XG4gICAgICAgIGExMCA9IGFbNF07IGExMSA9IGFbNV07IGExMiA9IGFbNl07IGExMyA9IGFbN107XG4gICAgICAgIGEyMCA9IGFbOF07IGEyMSA9IGFbOV07IGEyMiA9IGFbMTBdOyBhMjMgPSBhWzExXTtcblxuICAgICAgICBvdXRbMF0gPSBhMDA7IG91dFsxXSA9IGEwMTsgb3V0WzJdID0gYTAyOyBvdXRbM10gPSBhMDM7XG4gICAgICAgIG91dFs0XSA9IGExMDsgb3V0WzVdID0gYTExOyBvdXRbNl0gPSBhMTI7IG91dFs3XSA9IGExMztcbiAgICAgICAgb3V0WzhdID0gYTIwOyBvdXRbOV0gPSBhMjE7IG91dFsxMF0gPSBhMjI7IG91dFsxMV0gPSBhMjM7XG5cbiAgICAgICAgb3V0WzEyXSA9IGEwMCAqIHggKyBhMTAgKiB5ICsgYTIwICogeiArIGFbMTJdO1xuICAgICAgICBvdXRbMTNdID0gYTAxICogeCArIGExMSAqIHkgKyBhMjEgKiB6ICsgYVsxM107XG4gICAgICAgIG91dFsxNF0gPSBhMDIgKiB4ICsgYTEyICogeSArIGEyMiAqIHogKyBhWzE0XTtcbiAgICAgICAgb3V0WzE1XSA9IGEwMyAqIHggKyBhMTMgKiB5ICsgYTIzICogeiArIGFbMTVdO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNjYWxlcyB0aGUgbWF0NCBieSB0aGUgZGltZW5zaW9ucyBpbiB0aGUgZ2l2ZW4gdmVjM1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byBzY2FsZVxuICogQHBhcmFtIHt2ZWMzfSB2IHRoZSB2ZWMzIHRvIHNjYWxlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqKi9cbm1hdDQuc2NhbGUgPSBmdW5jdGlvbihvdXQsIGEsIHYpIHtcbiAgICB2YXIgeCA9IHZbMF0sIHkgPSB2WzFdLCB6ID0gdlsyXTtcblxuICAgIG91dFswXSA9IGFbMF0gKiB4O1xuICAgIG91dFsxXSA9IGFbMV0gKiB4O1xuICAgIG91dFsyXSA9IGFbMl0gKiB4O1xuICAgIG91dFszXSA9IGFbM10gKiB4O1xuICAgIG91dFs0XSA9IGFbNF0gKiB5O1xuICAgIG91dFs1XSA9IGFbNV0gKiB5O1xuICAgIG91dFs2XSA9IGFbNl0gKiB5O1xuICAgIG91dFs3XSA9IGFbN10gKiB5O1xuICAgIG91dFs4XSA9IGFbOF0gKiB6O1xuICAgIG91dFs5XSA9IGFbOV0gKiB6O1xuICAgIG91dFsxMF0gPSBhWzEwXSAqIHo7XG4gICAgb3V0WzExXSA9IGFbMTFdICogejtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdDQgYnkgdGhlIGdpdmVuIGFuZ2xlXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEBwYXJhbSB7dmVjM30gYXhpcyB0aGUgYXhpcyB0byByb3RhdGUgYXJvdW5kXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQucm90YXRlID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkLCBheGlzKSB7XG4gICAgdmFyIHggPSBheGlzWzBdLCB5ID0gYXhpc1sxXSwgeiA9IGF4aXNbMl0sXG4gICAgICAgIGxlbiA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHopLFxuICAgICAgICBzLCBjLCB0LFxuICAgICAgICBhMDAsIGEwMSwgYTAyLCBhMDMsXG4gICAgICAgIGExMCwgYTExLCBhMTIsIGExMyxcbiAgICAgICAgYTIwLCBhMjEsIGEyMiwgYTIzLFxuICAgICAgICBiMDAsIGIwMSwgYjAyLFxuICAgICAgICBiMTAsIGIxMSwgYjEyLFxuICAgICAgICBiMjAsIGIyMSwgYjIyO1xuXG4gICAgaWYgKE1hdGguYWJzKGxlbikgPCBHTE1BVF9FUFNJTE9OKSB7IHJldHVybiBudWxsOyB9XG4gICAgXG4gICAgbGVuID0gMSAvIGxlbjtcbiAgICB4ICo9IGxlbjtcbiAgICB5ICo9IGxlbjtcbiAgICB6ICo9IGxlbjtcblxuICAgIHMgPSBNYXRoLnNpbihyYWQpO1xuICAgIGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgIHQgPSAxIC0gYztcblxuICAgIGEwMCA9IGFbMF07IGEwMSA9IGFbMV07IGEwMiA9IGFbMl07IGEwMyA9IGFbM107XG4gICAgYTEwID0gYVs0XTsgYTExID0gYVs1XTsgYTEyID0gYVs2XTsgYTEzID0gYVs3XTtcbiAgICBhMjAgPSBhWzhdOyBhMjEgPSBhWzldOyBhMjIgPSBhWzEwXTsgYTIzID0gYVsxMV07XG5cbiAgICAvLyBDb25zdHJ1Y3QgdGhlIGVsZW1lbnRzIG9mIHRoZSByb3RhdGlvbiBtYXRyaXhcbiAgICBiMDAgPSB4ICogeCAqIHQgKyBjOyBiMDEgPSB5ICogeCAqIHQgKyB6ICogczsgYjAyID0geiAqIHggKiB0IC0geSAqIHM7XG4gICAgYjEwID0geCAqIHkgKiB0IC0geiAqIHM7IGIxMSA9IHkgKiB5ICogdCArIGM7IGIxMiA9IHogKiB5ICogdCArIHggKiBzO1xuICAgIGIyMCA9IHggKiB6ICogdCArIHkgKiBzOyBiMjEgPSB5ICogeiAqIHQgLSB4ICogczsgYjIyID0geiAqIHogKiB0ICsgYztcblxuICAgIC8vIFBlcmZvcm0gcm90YXRpb24tc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgb3V0WzBdID0gYTAwICogYjAwICsgYTEwICogYjAxICsgYTIwICogYjAyO1xuICAgIG91dFsxXSA9IGEwMSAqIGIwMCArIGExMSAqIGIwMSArIGEyMSAqIGIwMjtcbiAgICBvdXRbMl0gPSBhMDIgKiBiMDAgKyBhMTIgKiBiMDEgKyBhMjIgKiBiMDI7XG4gICAgb3V0WzNdID0gYTAzICogYjAwICsgYTEzICogYjAxICsgYTIzICogYjAyO1xuICAgIG91dFs0XSA9IGEwMCAqIGIxMCArIGExMCAqIGIxMSArIGEyMCAqIGIxMjtcbiAgICBvdXRbNV0gPSBhMDEgKiBiMTAgKyBhMTEgKiBiMTEgKyBhMjEgKiBiMTI7XG4gICAgb3V0WzZdID0gYTAyICogYjEwICsgYTEyICogYjExICsgYTIyICogYjEyO1xuICAgIG91dFs3XSA9IGEwMyAqIGIxMCArIGExMyAqIGIxMSArIGEyMyAqIGIxMjtcbiAgICBvdXRbOF0gPSBhMDAgKiBiMjAgKyBhMTAgKiBiMjEgKyBhMjAgKiBiMjI7XG4gICAgb3V0WzldID0gYTAxICogYjIwICsgYTExICogYjIxICsgYTIxICogYjIyO1xuICAgIG91dFsxMF0gPSBhMDIgKiBiMjAgKyBhMTIgKiBiMjEgKyBhMjIgKiBiMjI7XG4gICAgb3V0WzExXSA9IGEwMyAqIGIyMCArIGExMyAqIGIyMSArIGEyMyAqIGIyMjtcblxuICAgIGlmIChhICE9PSBvdXQpIHsgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgbGFzdCByb3dcbiAgICAgICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgICAgICBvdXRbMTNdID0gYVsxM107XG4gICAgICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICAgICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFggYXhpc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQucm90YXRlWCA9IGZ1bmN0aW9uIChvdXQsIGEsIHJhZCkge1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYyA9IE1hdGguY29zKHJhZCksXG4gICAgICAgIGExMCA9IGFbNF0sXG4gICAgICAgIGExMSA9IGFbNV0sXG4gICAgICAgIGExMiA9IGFbNl0sXG4gICAgICAgIGExMyA9IGFbN10sXG4gICAgICAgIGEyMCA9IGFbOF0sXG4gICAgICAgIGEyMSA9IGFbOV0sXG4gICAgICAgIGEyMiA9IGFbMTBdLFxuICAgICAgICBhMjMgPSBhWzExXTtcblxuICAgIGlmIChhICE9PSBvdXQpIHsgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgcm93c1xuICAgICAgICBvdXRbMF0gID0gYVswXTtcbiAgICAgICAgb3V0WzFdICA9IGFbMV07XG4gICAgICAgIG91dFsyXSAgPSBhWzJdO1xuICAgICAgICBvdXRbM10gID0gYVszXTtcbiAgICAgICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgICAgICBvdXRbMTNdID0gYVsxM107XG4gICAgICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICAgICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIH1cblxuICAgIC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICBvdXRbNF0gPSBhMTAgKiBjICsgYTIwICogcztcbiAgICBvdXRbNV0gPSBhMTEgKiBjICsgYTIxICogcztcbiAgICBvdXRbNl0gPSBhMTIgKiBjICsgYTIyICogcztcbiAgICBvdXRbN10gPSBhMTMgKiBjICsgYTIzICogcztcbiAgICBvdXRbOF0gPSBhMjAgKiBjIC0gYTEwICogcztcbiAgICBvdXRbOV0gPSBhMjEgKiBjIC0gYTExICogcztcbiAgICBvdXRbMTBdID0gYTIyICogYyAtIGExMiAqIHM7XG4gICAgb3V0WzExXSA9IGEyMyAqIGMgLSBhMTMgKiBzO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWSBheGlzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5yb3RhdGVZID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBjID0gTWF0aC5jb3MocmFkKSxcbiAgICAgICAgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTAzID0gYVszXSxcbiAgICAgICAgYTIwID0gYVs4XSxcbiAgICAgICAgYTIxID0gYVs5XSxcbiAgICAgICAgYTIyID0gYVsxMF0sXG4gICAgICAgIGEyMyA9IGFbMTFdO1xuXG4gICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCByb3dzXG4gICAgICAgIG91dFs0XSAgPSBhWzRdO1xuICAgICAgICBvdXRbNV0gID0gYVs1XTtcbiAgICAgICAgb3V0WzZdICA9IGFbNl07XG4gICAgICAgIG91dFs3XSAgPSBhWzddO1xuICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuXG4gICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgIG91dFswXSA9IGEwMCAqIGMgLSBhMjAgKiBzO1xuICAgIG91dFsxXSA9IGEwMSAqIGMgLSBhMjEgKiBzO1xuICAgIG91dFsyXSA9IGEwMiAqIGMgLSBhMjIgKiBzO1xuICAgIG91dFszXSA9IGEwMyAqIGMgLSBhMjMgKiBzO1xuICAgIG91dFs4XSA9IGEwMCAqIHMgKyBhMjAgKiBjO1xuICAgIG91dFs5XSA9IGEwMSAqIHMgKyBhMjEgKiBjO1xuICAgIG91dFsxMF0gPSBhMDIgKiBzICsgYTIyICogYztcbiAgICBvdXRbMTFdID0gYTAzICogcyArIGEyMyAqIGM7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBaIGF4aXNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LnJvdGF0ZVogPSBmdW5jdGlvbiAob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpLFxuICAgICAgICBhMDAgPSBhWzBdLFxuICAgICAgICBhMDEgPSBhWzFdLFxuICAgICAgICBhMDIgPSBhWzJdLFxuICAgICAgICBhMDMgPSBhWzNdLFxuICAgICAgICBhMTAgPSBhWzRdLFxuICAgICAgICBhMTEgPSBhWzVdLFxuICAgICAgICBhMTIgPSBhWzZdLFxuICAgICAgICBhMTMgPSBhWzddO1xuXG4gICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCBsYXN0IHJvd1xuICAgICAgICBvdXRbOF0gID0gYVs4XTtcbiAgICAgICAgb3V0WzldICA9IGFbOV07XG4gICAgICAgIG91dFsxMF0gPSBhWzEwXTtcbiAgICAgICAgb3V0WzExXSA9IGFbMTFdO1xuICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuXG4gICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgIG91dFswXSA9IGEwMCAqIGMgKyBhMTAgKiBzO1xuICAgIG91dFsxXSA9IGEwMSAqIGMgKyBhMTEgKiBzO1xuICAgIG91dFsyXSA9IGEwMiAqIGMgKyBhMTIgKiBzO1xuICAgIG91dFszXSA9IGEwMyAqIGMgKyBhMTMgKiBzO1xuICAgIG91dFs0XSA9IGExMCAqIGMgLSBhMDAgKiBzO1xuICAgIG91dFs1XSA9IGExMSAqIGMgLSBhMDEgKiBzO1xuICAgIG91dFs2XSA9IGExMiAqIGMgLSBhMDIgKiBzO1xuICAgIG91dFs3XSA9IGExMyAqIGMgLSBhMDMgKiBzO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHF1YXRlcm5pb24gcm90YXRpb24gYW5kIHZlY3RvciB0cmFuc2xhdGlvblxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgdmVjKTtcbiAqICAgICB2YXIgcXVhdE1hdCA9IG1hdDQuY3JlYXRlKCk7XG4gKiAgICAgcXVhdDQudG9NYXQ0KHF1YXQsIHF1YXRNYXQpO1xuICogICAgIG1hdDQubXVsdGlwbHkoZGVzdCwgcXVhdE1hdCk7XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0NH0gcSBSb3RhdGlvbiBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3ZlYzN9IHYgVHJhbnNsYXRpb24gdmVjdG9yXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuZnJvbVJvdGF0aW9uVHJhbnNsYXRpb24gPSBmdW5jdGlvbiAob3V0LCBxLCB2KSB7XG4gICAgLy8gUXVhdGVybmlvbiBtYXRoXG4gICAgdmFyIHggPSBxWzBdLCB5ID0gcVsxXSwgeiA9IHFbMl0sIHcgPSBxWzNdLFxuICAgICAgICB4MiA9IHggKyB4LFxuICAgICAgICB5MiA9IHkgKyB5LFxuICAgICAgICB6MiA9IHogKyB6LFxuXG4gICAgICAgIHh4ID0geCAqIHgyLFxuICAgICAgICB4eSA9IHggKiB5MixcbiAgICAgICAgeHogPSB4ICogejIsXG4gICAgICAgIHl5ID0geSAqIHkyLFxuICAgICAgICB5eiA9IHkgKiB6MixcbiAgICAgICAgenogPSB6ICogejIsXG4gICAgICAgIHd4ID0gdyAqIHgyLFxuICAgICAgICB3eSA9IHcgKiB5MixcbiAgICAgICAgd3ogPSB3ICogejI7XG5cbiAgICBvdXRbMF0gPSAxIC0gKHl5ICsgenopO1xuICAgIG91dFsxXSA9IHh5ICsgd3o7XG4gICAgb3V0WzJdID0geHogLSB3eTtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IHh5IC0gd3o7XG4gICAgb3V0WzVdID0gMSAtICh4eCArIHp6KTtcbiAgICBvdXRbNl0gPSB5eiArIHd4O1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0geHogKyB3eTtcbiAgICBvdXRbOV0gPSB5eiAtIHd4O1xuICAgIG91dFsxMF0gPSAxIC0gKHh4ICsgeXkpO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSB2WzBdO1xuICAgIG91dFsxM10gPSB2WzFdO1xuICAgIG91dFsxNF0gPSB2WzJdO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIFxuICAgIHJldHVybiBvdXQ7XG59O1xuXG5tYXQ0LmZyb21RdWF0ID0gZnVuY3Rpb24gKG91dCwgcSkge1xuICAgIHZhciB4ID0gcVswXSwgeSA9IHFbMV0sIHogPSBxWzJdLCB3ID0gcVszXSxcbiAgICAgICAgeDIgPSB4ICsgeCxcbiAgICAgICAgeTIgPSB5ICsgeSxcbiAgICAgICAgejIgPSB6ICsgeixcblxuICAgICAgICB4eCA9IHggKiB4MixcbiAgICAgICAgeXggPSB5ICogeDIsXG4gICAgICAgIHl5ID0geSAqIHkyLFxuICAgICAgICB6eCA9IHogKiB4MixcbiAgICAgICAgenkgPSB6ICogeTIsXG4gICAgICAgIHp6ID0geiAqIHoyLFxuICAgICAgICB3eCA9IHcgKiB4MixcbiAgICAgICAgd3kgPSB3ICogeTIsXG4gICAgICAgIHd6ID0gdyAqIHoyO1xuXG4gICAgb3V0WzBdID0gMSAtIHl5IC0geno7XG4gICAgb3V0WzFdID0geXggKyB3ejtcbiAgICBvdXRbMl0gPSB6eCAtIHd5O1xuICAgIG91dFszXSA9IDA7XG5cbiAgICBvdXRbNF0gPSB5eCAtIHd6O1xuICAgIG91dFs1XSA9IDEgLSB4eCAtIHp6O1xuICAgIG91dFs2XSA9IHp5ICsgd3g7XG4gICAgb3V0WzddID0gMDtcblxuICAgIG91dFs4XSA9IHp4ICsgd3k7XG4gICAgb3V0WzldID0genkgLSB3eDtcbiAgICBvdXRbMTBdID0gMSAtIHh4IC0geXk7XG4gICAgb3V0WzExXSA9IDA7XG5cbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gMDtcbiAgICBvdXRbMTVdID0gMTtcblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIGZydXN0dW0gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7TnVtYmVyfSBsZWZ0IExlZnQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7TnVtYmVyfSByaWdodCBSaWdodCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IGJvdHRvbSBCb3R0b20gYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7TnVtYmVyfSB0b3AgVG9wIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge051bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge051bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmZydXN0dW0gPSBmdW5jdGlvbiAob3V0LCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcikge1xuICAgIHZhciBybCA9IDEgLyAocmlnaHQgLSBsZWZ0KSxcbiAgICAgICAgdGIgPSAxIC8gKHRvcCAtIGJvdHRvbSksXG4gICAgICAgIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMF0gPSAobmVhciAqIDIpICogcmw7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAobmVhciAqIDIpICogdGI7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IChyaWdodCArIGxlZnQpICogcmw7XG4gICAgb3V0WzldID0gKHRvcCArIGJvdHRvbSkgKiB0YjtcbiAgICBvdXRbMTBdID0gKGZhciArIG5lYXIpICogbmY7XG4gICAgb3V0WzExXSA9IC0xO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAoZmFyICogbmVhciAqIDIpICogbmY7XG4gICAgb3V0WzE1XSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcGVyc3BlY3RpdmUgcHJvamVjdGlvbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHtudW1iZXJ9IGZvdnkgVmVydGljYWwgZmllbGQgb2YgdmlldyBpbiByYWRpYW5zXG4gKiBAcGFyYW0ge251bWJlcn0gYXNwZWN0IEFzcGVjdCByYXRpby4gdHlwaWNhbGx5IHZpZXdwb3J0IHdpZHRoL2hlaWdodFxuICogQHBhcmFtIHtudW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5wZXJzcGVjdGl2ZSA9IGZ1bmN0aW9uIChvdXQsIGZvdnksIGFzcGVjdCwgbmVhciwgZmFyKSB7XG4gICAgdmFyIGYgPSAxLjAgLyBNYXRoLnRhbihmb3Z5IC8gMiksXG4gICAgICAgIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMF0gPSBmIC8gYXNwZWN0O1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gZjtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSAoZmFyICsgbmVhcikgKiBuZjtcbiAgICBvdXRbMTFdID0gLTE7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9ICgyICogZmFyICogbmVhcikgKiBuZjtcbiAgICBvdXRbMTVdID0gMDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBvcnRob2dvbmFsIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7bnVtYmVyfSBsZWZ0IExlZnQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSByaWdodCBSaWdodCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGJvdHRvbSBCb3R0b20gYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSB0b3AgVG9wIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0Lm9ydGhvID0gZnVuY3Rpb24gKG91dCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcbiAgICB2YXIgbHIgPSAxIC8gKGxlZnQgLSByaWdodCksXG4gICAgICAgIGJ0ID0gMSAvIChib3R0b20gLSB0b3ApLFxuICAgICAgICBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gICAgb3V0WzBdID0gLTIgKiBscjtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IC0yICogYnQ7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gMiAqIG5mO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAobGVmdCArIHJpZ2h0KSAqIGxyO1xuICAgIG91dFsxM10gPSAodG9wICsgYm90dG9tKSAqIGJ0O1xuICAgIG91dFsxNF0gPSAoZmFyICsgbmVhcikgKiBuZjtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBsb29rLWF0IG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBleWUgcG9zaXRpb24sIGZvY2FsIHBvaW50LCBhbmQgdXAgYXhpc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7dmVjM30gZXllIFBvc2l0aW9uIG9mIHRoZSB2aWV3ZXJcbiAqIEBwYXJhbSB7dmVjM30gY2VudGVyIFBvaW50IHRoZSB2aWV3ZXIgaXMgbG9va2luZyBhdFxuICogQHBhcmFtIHt2ZWMzfSB1cCB2ZWMzIHBvaW50aW5nIHVwXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQubG9va0F0ID0gZnVuY3Rpb24gKG91dCwgZXllLCBjZW50ZXIsIHVwKSB7XG4gICAgdmFyIHgwLCB4MSwgeDIsIHkwLCB5MSwgeTIsIHowLCB6MSwgejIsIGxlbixcbiAgICAgICAgZXlleCA9IGV5ZVswXSxcbiAgICAgICAgZXlleSA9IGV5ZVsxXSxcbiAgICAgICAgZXlleiA9IGV5ZVsyXSxcbiAgICAgICAgdXB4ID0gdXBbMF0sXG4gICAgICAgIHVweSA9IHVwWzFdLFxuICAgICAgICB1cHogPSB1cFsyXSxcbiAgICAgICAgY2VudGVyeCA9IGNlbnRlclswXSxcbiAgICAgICAgY2VudGVyeSA9IGNlbnRlclsxXSxcbiAgICAgICAgY2VudGVyeiA9IGNlbnRlclsyXTtcblxuICAgIGlmIChNYXRoLmFicyhleWV4IC0gY2VudGVyeCkgPCBHTE1BVF9FUFNJTE9OICYmXG4gICAgICAgIE1hdGguYWJzKGV5ZXkgLSBjZW50ZXJ5KSA8IEdMTUFUX0VQU0lMT04gJiZcbiAgICAgICAgTWF0aC5hYnMoZXlleiAtIGNlbnRlcnopIDwgR0xNQVRfRVBTSUxPTikge1xuICAgICAgICByZXR1cm4gbWF0NC5pZGVudGl0eShvdXQpO1xuICAgIH1cblxuICAgIHowID0gZXlleCAtIGNlbnRlcng7XG4gICAgejEgPSBleWV5IC0gY2VudGVyeTtcbiAgICB6MiA9IGV5ZXogLSBjZW50ZXJ6O1xuXG4gICAgbGVuID0gMSAvIE1hdGguc3FydCh6MCAqIHowICsgejEgKiB6MSArIHoyICogejIpO1xuICAgIHowICo9IGxlbjtcbiAgICB6MSAqPSBsZW47XG4gICAgejIgKj0gbGVuO1xuXG4gICAgeDAgPSB1cHkgKiB6MiAtIHVweiAqIHoxO1xuICAgIHgxID0gdXB6ICogejAgLSB1cHggKiB6MjtcbiAgICB4MiA9IHVweCAqIHoxIC0gdXB5ICogejA7XG4gICAgbGVuID0gTWF0aC5zcXJ0KHgwICogeDAgKyB4MSAqIHgxICsgeDIgKiB4Mik7XG4gICAgaWYgKCFsZW4pIHtcbiAgICAgICAgeDAgPSAwO1xuICAgICAgICB4MSA9IDA7XG4gICAgICAgIHgyID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZW4gPSAxIC8gbGVuO1xuICAgICAgICB4MCAqPSBsZW47XG4gICAgICAgIHgxICo9IGxlbjtcbiAgICAgICAgeDIgKj0gbGVuO1xuICAgIH1cblxuICAgIHkwID0gejEgKiB4MiAtIHoyICogeDE7XG4gICAgeTEgPSB6MiAqIHgwIC0gejAgKiB4MjtcbiAgICB5MiA9IHowICogeDEgLSB6MSAqIHgwO1xuXG4gICAgbGVuID0gTWF0aC5zcXJ0KHkwICogeTAgKyB5MSAqIHkxICsgeTIgKiB5Mik7XG4gICAgaWYgKCFsZW4pIHtcbiAgICAgICAgeTAgPSAwO1xuICAgICAgICB5MSA9IDA7XG4gICAgICAgIHkyID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZW4gPSAxIC8gbGVuO1xuICAgICAgICB5MCAqPSBsZW47XG4gICAgICAgIHkxICo9IGxlbjtcbiAgICAgICAgeTIgKj0gbGVuO1xuICAgIH1cblxuICAgIG91dFswXSA9IHgwO1xuICAgIG91dFsxXSA9IHkwO1xuICAgIG91dFsyXSA9IHowO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0geDE7XG4gICAgb3V0WzVdID0geTE7XG4gICAgb3V0WzZdID0gejE7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSB4MjtcbiAgICBvdXRbOV0gPSB5MjtcbiAgICBvdXRbMTBdID0gejI7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IC0oeDAgKiBleWV4ICsgeDEgKiBleWV5ICsgeDIgKiBleWV6KTtcbiAgICBvdXRbMTNdID0gLSh5MCAqIGV5ZXggKyB5MSAqIGV5ZXkgKyB5MiAqIGV5ZXopO1xuICAgIG91dFsxNF0gPSAtKHowICogZXlleCArIHoxICogZXlleSArIHoyICogZXlleik7XG4gICAgb3V0WzE1XSA9IDE7XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gbWF0IG1hdHJpeCB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbWF0cml4XG4gKi9cbm1hdDQuc3RyID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gJ21hdDQoJyArIGFbMF0gKyAnLCAnICsgYVsxXSArICcsICcgKyBhWzJdICsgJywgJyArIGFbM10gKyAnLCAnICtcbiAgICAgICAgICAgICAgICAgICAgYVs0XSArICcsICcgKyBhWzVdICsgJywgJyArIGFbNl0gKyAnLCAnICsgYVs3XSArICcsICcgK1xuICAgICAgICAgICAgICAgICAgICBhWzhdICsgJywgJyArIGFbOV0gKyAnLCAnICsgYVsxMF0gKyAnLCAnICsgYVsxMV0gKyAnLCAnICsgXG4gICAgICAgICAgICAgICAgICAgIGFbMTJdICsgJywgJyArIGFbMTNdICsgJywgJyArIGFbMTRdICsgJywgJyArIGFbMTVdICsgJyknO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIEZyb2Jlbml1cyBub3JtIG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIGNhbGN1bGF0ZSBGcm9iZW5pdXMgbm9ybSBvZlxuICogQHJldHVybnMge051bWJlcn0gRnJvYmVuaXVzIG5vcm1cbiAqL1xubWF0NC5mcm9iID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4oTWF0aC5zcXJ0KE1hdGgucG93KGFbMF0sIDIpICsgTWF0aC5wb3coYVsxXSwgMikgKyBNYXRoLnBvdyhhWzJdLCAyKSArIE1hdGgucG93KGFbM10sIDIpICsgTWF0aC5wb3coYVs0XSwgMikgKyBNYXRoLnBvdyhhWzVdLCAyKSArIE1hdGgucG93KGFbNl0sIDIpICsgTWF0aC5wb3coYVs2XSwgMikgKyBNYXRoLnBvdyhhWzddLCAyKSArIE1hdGgucG93KGFbOF0sIDIpICsgTWF0aC5wb3coYVs5XSwgMikgKyBNYXRoLnBvdyhhWzEwXSwgMikgKyBNYXRoLnBvdyhhWzExXSwgMikgKyBNYXRoLnBvdyhhWzEyXSwgMikgKyBNYXRoLnBvdyhhWzEzXSwgMikgKyBNYXRoLnBvdyhhWzE0XSwgMikgKyBNYXRoLnBvdyhhWzE1XSwgMikgKSlcbn07XG5cblxuaWYodHlwZW9mKGV4cG9ydHMpICE9PSAndW5kZWZpbmVkJykge1xuICAgIGV4cG9ydHMubWF0NCA9IG1hdDQ7XG59XG47XG4vKiBDb3B5cmlnaHQgKGMpIDIwMTMsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbmFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcblxuICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICAgIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIFxuICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG5USElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkRcbkFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG5XQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIFxuRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1JcbkFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OXG5BTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVNcblNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLiAqL1xuXG4vKipcbiAqIEBjbGFzcyBRdWF0ZXJuaW9uXG4gKiBAbmFtZSBxdWF0XG4gKi9cblxudmFyIHF1YXQgPSB7fTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IHF1YXRcbiAqXG4gKiBAcmV0dXJucyB7cXVhdH0gYSBuZXcgcXVhdGVybmlvblxuICovXG5xdWF0LmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSg0KTtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNldHMgYSBxdWF0ZXJuaW9uIHRvIHJlcHJlc2VudCB0aGUgc2hvcnRlc3Qgcm90YXRpb24gZnJvbSBvbmVcbiAqIHZlY3RvciB0byBhbm90aGVyLlxuICpcbiAqIEJvdGggdmVjdG9ycyBhcmUgYXNzdW1lZCB0byBiZSB1bml0IGxlbmd0aC5cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb24uXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGluaXRpYWwgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIGRlc3RpbmF0aW9uIHZlY3RvclxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0LnJvdGF0aW9uVG8gPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRtcHZlYzMgPSB2ZWMzLmNyZWF0ZSgpO1xuICAgIHZhciB4VW5pdFZlYzMgPSB2ZWMzLmZyb21WYWx1ZXMoMSwwLDApO1xuICAgIHZhciB5VW5pdFZlYzMgPSB2ZWMzLmZyb21WYWx1ZXMoMCwxLDApO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgICAgICB2YXIgZG90ID0gdmVjMy5kb3QoYSwgYik7XG4gICAgICAgIGlmIChkb3QgPCAtMC45OTk5OTkpIHtcbiAgICAgICAgICAgIHZlYzMuY3Jvc3ModG1wdmVjMywgeFVuaXRWZWMzLCBhKTtcbiAgICAgICAgICAgIGlmICh2ZWMzLmxlbmd0aCh0bXB2ZWMzKSA8IDAuMDAwMDAxKVxuICAgICAgICAgICAgICAgIHZlYzMuY3Jvc3ModG1wdmVjMywgeVVuaXRWZWMzLCBhKTtcbiAgICAgICAgICAgIHZlYzMubm9ybWFsaXplKHRtcHZlYzMsIHRtcHZlYzMpO1xuICAgICAgICAgICAgcXVhdC5zZXRBeGlzQW5nbGUob3V0LCB0bXB2ZWMzLCBNYXRoLlBJKTtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH0gZWxzZSBpZiAoZG90ID4gMC45OTk5OTkpIHtcbiAgICAgICAgICAgIG91dFswXSA9IDA7XG4gICAgICAgICAgICBvdXRbMV0gPSAwO1xuICAgICAgICAgICAgb3V0WzJdID0gMDtcbiAgICAgICAgICAgIG91dFszXSA9IDE7XG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmVjMy5jcm9zcyh0bXB2ZWMzLCBhLCBiKTtcbiAgICAgICAgICAgIG91dFswXSA9IHRtcHZlYzNbMF07XG4gICAgICAgICAgICBvdXRbMV0gPSB0bXB2ZWMzWzFdO1xuICAgICAgICAgICAgb3V0WzJdID0gdG1wdmVjM1syXTtcbiAgICAgICAgICAgIG91dFszXSA9IDEgKyBkb3Q7XG4gICAgICAgICAgICByZXR1cm4gcXVhdC5ub3JtYWxpemUob3V0LCBvdXQpO1xuICAgICAgICB9XG4gICAgfTtcbn0pKCk7XG5cbi8qKlxuICogU2V0cyB0aGUgc3BlY2lmaWVkIHF1YXRlcm5pb24gd2l0aCB2YWx1ZXMgY29ycmVzcG9uZGluZyB0byB0aGUgZ2l2ZW5cbiAqIGF4ZXMuIEVhY2ggYXhpcyBpcyBhIHZlYzMgYW5kIGlzIGV4cGVjdGVkIHRvIGJlIHVuaXQgbGVuZ3RoIGFuZFxuICogcGVycGVuZGljdWxhciB0byBhbGwgb3RoZXIgc3BlY2lmaWVkIGF4ZXMuXG4gKlxuICogQHBhcmFtIHt2ZWMzfSB2aWV3ICB0aGUgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgdmlld2luZyBkaXJlY3Rpb25cbiAqIEBwYXJhbSB7dmVjM30gcmlnaHQgdGhlIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIGxvY2FsIFwicmlnaHRcIiBkaXJlY3Rpb25cbiAqIEBwYXJhbSB7dmVjM30gdXAgICAgdGhlIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIGxvY2FsIFwidXBcIiBkaXJlY3Rpb25cbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5zZXRBeGVzID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBtYXRyID0gbWF0My5jcmVhdGUoKTtcblxuICAgIHJldHVybiBmdW5jdGlvbihvdXQsIHZpZXcsIHJpZ2h0LCB1cCkge1xuICAgICAgICBtYXRyWzBdID0gcmlnaHRbMF07XG4gICAgICAgIG1hdHJbM10gPSByaWdodFsxXTtcbiAgICAgICAgbWF0cls2XSA9IHJpZ2h0WzJdO1xuXG4gICAgICAgIG1hdHJbMV0gPSB1cFswXTtcbiAgICAgICAgbWF0cls0XSA9IHVwWzFdO1xuICAgICAgICBtYXRyWzddID0gdXBbMl07XG5cbiAgICAgICAgbWF0clsyXSA9IC12aWV3WzBdO1xuICAgICAgICBtYXRyWzVdID0gLXZpZXdbMV07XG4gICAgICAgIG1hdHJbOF0gPSAtdmlld1syXTtcblxuICAgICAgICByZXR1cm4gcXVhdC5ub3JtYWxpemUob3V0LCBxdWF0LmZyb21NYXQzKG91dCwgbWF0cikpO1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgcXVhdCBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHF1YXRlcm5pb25cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdGVybmlvbiB0byBjbG9uZVxuICogQHJldHVybnMge3F1YXR9IGEgbmV3IHF1YXRlcm5pb25cbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LmNsb25lID0gdmVjNC5jbG9uZTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHF1YXQgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHcgVyBjb21wb25lbnRcbiAqIEByZXR1cm5zIHtxdWF0fSBhIG5ldyBxdWF0ZXJuaW9uXG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5mcm9tVmFsdWVzID0gdmVjNC5mcm9tVmFsdWVzO1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSBxdWF0IHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgc291cmNlIHF1YXRlcm5pb25cbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LmNvcHkgPSB2ZWM0LmNvcHk7XG5cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgcXVhdCB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0gdyBXIGNvbXBvbmVudFxuICogQHJldHVybnMge3F1YXR9IG91dFxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQuc2V0ID0gdmVjNC5zZXQ7XG5cbi8qKlxuICogU2V0IGEgcXVhdCB0byB0aGUgaWRlbnRpdHkgcXVhdGVybmlvblxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0LmlkZW50aXR5ID0gZnVuY3Rpb24ob3V0KSB7XG4gICAgb3V0WzBdID0gMDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTZXRzIGEgcXVhdCBmcm9tIHRoZSBnaXZlbiBhbmdsZSBhbmQgcm90YXRpb24gYXhpcyxcbiAqIHRoZW4gcmV0dXJucyBpdC5cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7dmVjM30gYXhpcyB0aGUgYXhpcyBhcm91bmQgd2hpY2ggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSBpbiByYWRpYW5zXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiovXG5xdWF0LnNldEF4aXNBbmdsZSA9IGZ1bmN0aW9uKG91dCwgYXhpcywgcmFkKSB7XG4gICAgcmFkID0gcmFkICogMC41O1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICBvdXRbMF0gPSBzICogYXhpc1swXTtcbiAgICBvdXRbMV0gPSBzICogYXhpc1sxXTtcbiAgICBvdXRbMl0gPSBzICogYXhpc1syXTtcbiAgICBvdXRbM10gPSBNYXRoLmNvcyhyYWQpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFkZHMgdHdvIHF1YXQnc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtxdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3F1YXR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5hZGQgPSB2ZWM0LmFkZDtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byBxdWF0J3NcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtxdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0Lm11bHRpcGx5ID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgdmFyIGF4ID0gYVswXSwgYXkgPSBhWzFdLCBheiA9IGFbMl0sIGF3ID0gYVszXSxcbiAgICAgICAgYnggPSBiWzBdLCBieSA9IGJbMV0sIGJ6ID0gYlsyXSwgYncgPSBiWzNdO1xuXG4gICAgb3V0WzBdID0gYXggKiBidyArIGF3ICogYnggKyBheSAqIGJ6IC0gYXogKiBieTtcbiAgICBvdXRbMV0gPSBheSAqIGJ3ICsgYXcgKiBieSArIGF6ICogYnggLSBheCAqIGJ6O1xuICAgIG91dFsyXSA9IGF6ICogYncgKyBhdyAqIGJ6ICsgYXggKiBieSAtIGF5ICogYng7XG4gICAgb3V0WzNdID0gYXcgKiBidyAtIGF4ICogYnggLSBheSAqIGJ5IC0gYXogKiBiejtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHF1YXQubXVsdGlwbHl9XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5tdWwgPSBxdWF0Lm11bHRpcGx5O1xuXG4vKipcbiAqIFNjYWxlcyBhIHF1YXQgYnkgYSBzY2FsYXIgbnVtYmVyXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxuICogQHJldHVybnMge3F1YXR9IG91dFxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQuc2NhbGUgPSB2ZWM0LnNjYWxlO1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBxdWF0ZXJuaW9uIGJ5IHRoZSBnaXZlbiBhbmdsZSBhYm91dCB0aGUgWCBheGlzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgcXVhdCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0fSBhIHF1YXQgdG8gcm90YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gcmFkIGFuZ2xlIChpbiByYWRpYW5zKSB0byByb3RhdGVcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5yb3RhdGVYID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgcmFkICo9IDAuNTsgXG5cbiAgICB2YXIgYXggPSBhWzBdLCBheSA9IGFbMV0sIGF6ID0gYVsyXSwgYXcgPSBhWzNdLFxuICAgICAgICBieCA9IE1hdGguc2luKHJhZCksIGJ3ID0gTWF0aC5jb3MocmFkKTtcblxuICAgIG91dFswXSA9IGF4ICogYncgKyBhdyAqIGJ4O1xuICAgIG91dFsxXSA9IGF5ICogYncgKyBheiAqIGJ4O1xuICAgIG91dFsyXSA9IGF6ICogYncgLSBheSAqIGJ4O1xuICAgIG91dFszXSA9IGF3ICogYncgLSBheCAqIGJ4O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBxdWF0ZXJuaW9uIGJ5IHRoZSBnaXZlbiBhbmdsZSBhYm91dCB0aGUgWSBheGlzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgcXVhdCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0fSBhIHF1YXQgdG8gcm90YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gcmFkIGFuZ2xlIChpbiByYWRpYW5zKSB0byByb3RhdGVcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5yb3RhdGVZID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgcmFkICo9IDAuNTsgXG5cbiAgICB2YXIgYXggPSBhWzBdLCBheSA9IGFbMV0sIGF6ID0gYVsyXSwgYXcgPSBhWzNdLFxuICAgICAgICBieSA9IE1hdGguc2luKHJhZCksIGJ3ID0gTWF0aC5jb3MocmFkKTtcblxuICAgIG91dFswXSA9IGF4ICogYncgLSBheiAqIGJ5O1xuICAgIG91dFsxXSA9IGF5ICogYncgKyBhdyAqIGJ5O1xuICAgIG91dFsyXSA9IGF6ICogYncgKyBheCAqIGJ5O1xuICAgIG91dFszXSA9IGF3ICogYncgLSBheSAqIGJ5O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBxdWF0ZXJuaW9uIGJ5IHRoZSBnaXZlbiBhbmdsZSBhYm91dCB0aGUgWiBheGlzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgcXVhdCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0fSBhIHF1YXQgdG8gcm90YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gcmFkIGFuZ2xlIChpbiByYWRpYW5zKSB0byByb3RhdGVcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5yb3RhdGVaID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgcmFkICo9IDAuNTsgXG5cbiAgICB2YXIgYXggPSBhWzBdLCBheSA9IGFbMV0sIGF6ID0gYVsyXSwgYXcgPSBhWzNdLFxuICAgICAgICBieiA9IE1hdGguc2luKHJhZCksIGJ3ID0gTWF0aC5jb3MocmFkKTtcblxuICAgIG91dFswXSA9IGF4ICogYncgKyBheSAqIGJ6O1xuICAgIG91dFsxXSA9IGF5ICogYncgLSBheCAqIGJ6O1xuICAgIG91dFsyXSA9IGF6ICogYncgKyBhdyAqIGJ6O1xuICAgIG91dFszXSA9IGF3ICogYncgLSBheiAqIGJ6O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIFcgY29tcG9uZW50IG9mIGEgcXVhdCBmcm9tIHRoZSBYLCBZLCBhbmQgWiBjb21wb25lbnRzLlxuICogQXNzdW1lcyB0aGF0IHF1YXRlcm5pb24gaXMgMSB1bml0IGluIGxlbmd0aC5cbiAqIEFueSBleGlzdGluZyBXIGNvbXBvbmVudCB3aWxsIGJlIGlnbm9yZWQuXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdCB0byBjYWxjdWxhdGUgVyBjb21wb25lbnQgb2ZcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5jYWxjdWxhdGVXID0gZnVuY3Rpb24gKG91dCwgYSkge1xuICAgIHZhciB4ID0gYVswXSwgeSA9IGFbMV0sIHogPSBhWzJdO1xuXG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIG91dFsyXSA9IHo7XG4gICAgb3V0WzNdID0gLU1hdGguc3FydChNYXRoLmFicygxLjAgLSB4ICogeCAtIHkgKiB5IC0geiAqIHopKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gcXVhdCdzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3F1YXR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5kb3QgPSB2ZWM0LmRvdDtcblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHF1YXQnc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtxdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3F1YXR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5sZXJwID0gdmVjNC5sZXJwO1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgc3BoZXJpY2FsIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtxdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0LnNsZXJwID0gZnVuY3Rpb24gKG91dCwgYSwgYiwgdCkge1xuICAgIC8vIGJlbmNobWFya3M6XG4gICAgLy8gICAgaHR0cDovL2pzcGVyZi5jb20vcXVhdGVybmlvbi1zbGVycC1pbXBsZW1lbnRhdGlvbnNcblxuICAgIHZhciBheCA9IGFbMF0sIGF5ID0gYVsxXSwgYXogPSBhWzJdLCBhdyA9IGFbM10sXG4gICAgICAgIGJ4ID0gYlswXSwgYnkgPSBiWzFdLCBieiA9IGJbMl0sIGJ3ID0gYlszXTtcblxuICAgIHZhciAgICAgICAgb21lZ2EsIGNvc29tLCBzaW5vbSwgc2NhbGUwLCBzY2FsZTE7XG5cbiAgICAvLyBjYWxjIGNvc2luZVxuICAgIGNvc29tID0gYXggKiBieCArIGF5ICogYnkgKyBheiAqIGJ6ICsgYXcgKiBidztcbiAgICAvLyBhZGp1c3Qgc2lnbnMgKGlmIG5lY2Vzc2FyeSlcbiAgICBpZiAoIGNvc29tIDwgMC4wICkge1xuICAgICAgICBjb3NvbSA9IC1jb3NvbTtcbiAgICAgICAgYnggPSAtIGJ4O1xuICAgICAgICBieSA9IC0gYnk7XG4gICAgICAgIGJ6ID0gLSBiejtcbiAgICAgICAgYncgPSAtIGJ3O1xuICAgIH1cbiAgICAvLyBjYWxjdWxhdGUgY29lZmZpY2llbnRzXG4gICAgaWYgKCAoMS4wIC0gY29zb20pID4gMC4wMDAwMDEgKSB7XG4gICAgICAgIC8vIHN0YW5kYXJkIGNhc2UgKHNsZXJwKVxuICAgICAgICBvbWVnYSAgPSBNYXRoLmFjb3MoY29zb20pO1xuICAgICAgICBzaW5vbSAgPSBNYXRoLnNpbihvbWVnYSk7XG4gICAgICAgIHNjYWxlMCA9IE1hdGguc2luKCgxLjAgLSB0KSAqIG9tZWdhKSAvIHNpbm9tO1xuICAgICAgICBzY2FsZTEgPSBNYXRoLnNpbih0ICogb21lZ2EpIC8gc2lub207XG4gICAgfSBlbHNlIHsgICAgICAgIFxuICAgICAgICAvLyBcImZyb21cIiBhbmQgXCJ0b1wiIHF1YXRlcm5pb25zIGFyZSB2ZXJ5IGNsb3NlIFxuICAgICAgICAvLyAgLi4uIHNvIHdlIGNhbiBkbyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uXG4gICAgICAgIHNjYWxlMCA9IDEuMCAtIHQ7XG4gICAgICAgIHNjYWxlMSA9IHQ7XG4gICAgfVxuICAgIC8vIGNhbGN1bGF0ZSBmaW5hbCB2YWx1ZXNcbiAgICBvdXRbMF0gPSBzY2FsZTAgKiBheCArIHNjYWxlMSAqIGJ4O1xuICAgIG91dFsxXSA9IHNjYWxlMCAqIGF5ICsgc2NhbGUxICogYnk7XG4gICAgb3V0WzJdID0gc2NhbGUwICogYXogKyBzY2FsZTEgKiBiejtcbiAgICBvdXRbM10gPSBzY2FsZTAgKiBhdyArIHNjYWxlMSAqIGJ3O1xuICAgIFxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGludmVyc2Ugb2YgYSBxdWF0XG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdCB0byBjYWxjdWxhdGUgaW52ZXJzZSBvZlxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0LmludmVydCA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciBhMCA9IGFbMF0sIGExID0gYVsxXSwgYTIgPSBhWzJdLCBhMyA9IGFbM10sXG4gICAgICAgIGRvdCA9IGEwKmEwICsgYTEqYTEgKyBhMiphMiArIGEzKmEzLFxuICAgICAgICBpbnZEb3QgPSBkb3QgPyAxLjAvZG90IDogMDtcbiAgICBcbiAgICAvLyBUT0RPOiBXb3VsZCBiZSBmYXN0ZXIgdG8gcmV0dXJuIFswLDAsMCwwXSBpbW1lZGlhdGVseSBpZiBkb3QgPT0gMFxuXG4gICAgb3V0WzBdID0gLWEwKmludkRvdDtcbiAgICBvdXRbMV0gPSAtYTEqaW52RG90O1xuICAgIG91dFsyXSA9IC1hMippbnZEb3Q7XG4gICAgb3V0WzNdID0gYTMqaW52RG90O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGNvbmp1Z2F0ZSBvZiBhIHF1YXRcbiAqIElmIHRoZSBxdWF0ZXJuaW9uIGlzIG5vcm1hbGl6ZWQsIHRoaXMgZnVuY3Rpb24gaXMgZmFzdGVyIHRoYW4gcXVhdC5pbnZlcnNlIGFuZCBwcm9kdWNlcyB0aGUgc2FtZSByZXN1bHQuXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdCB0byBjYWxjdWxhdGUgY29uanVnYXRlIG9mXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQuY29uanVnYXRlID0gZnVuY3Rpb24gKG91dCwgYSkge1xuICAgIG91dFswXSA9IC1hWzBdO1xuICAgIG91dFsxXSA9IC1hWzFdO1xuICAgIG91dFsyXSA9IC1hWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgcXVhdFxuICpcbiAqIEBwYXJhbSB7cXVhdH0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gbGVuZ3RoIG9mIGFcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0Lmxlbmd0aCA9IHZlYzQubGVuZ3RoO1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgcXVhdC5sZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5sZW4gPSBxdWF0Lmxlbmd0aDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBzcXVhcmVkIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBsZW5ndGggb2YgYVxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQuc3F1YXJlZExlbmd0aCA9IHZlYzQuc3F1YXJlZExlbmd0aDtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHF1YXQuc3F1YXJlZExlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LnNxckxlbiA9IHF1YXQuc3F1YXJlZExlbmd0aDtcblxuLyoqXG4gKiBOb3JtYWxpemUgYSBxdWF0XG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdGVybmlvbiB0byBub3JtYWxpemVcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0Lm5vcm1hbGl6ZSA9IHZlYzQubm9ybWFsaXplO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBxdWF0ZXJuaW9uIGZyb20gdGhlIGdpdmVuIDN4MyByb3RhdGlvbiBtYXRyaXguXG4gKlxuICogTk9URTogVGhlIHJlc3VsdGFudCBxdWF0ZXJuaW9uIGlzIG5vdCBub3JtYWxpemVkLCBzbyB5b3Ugc2hvdWxkIGJlIHN1cmVcbiAqIHRvIHJlbm9ybWFsaXplIHRoZSBxdWF0ZXJuaW9uIHlvdXJzZWxmIHdoZXJlIG5lY2Vzc2FyeS5cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7bWF0M30gbSByb3RhdGlvbiBtYXRyaXhcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LmZyb21NYXQzID0gZnVuY3Rpb24ob3V0LCBtKSB7XG4gICAgLy8gQWxnb3JpdGhtIGluIEtlbiBTaG9lbWFrZSdzIGFydGljbGUgaW4gMTk4NyBTSUdHUkFQSCBjb3Vyc2Ugbm90ZXNcbiAgICAvLyBhcnRpY2xlIFwiUXVhdGVybmlvbiBDYWxjdWx1cyBhbmQgRmFzdCBBbmltYXRpb25cIi5cbiAgICB2YXIgZlRyYWNlID0gbVswXSArIG1bNF0gKyBtWzhdO1xuICAgIHZhciBmUm9vdDtcblxuICAgIGlmICggZlRyYWNlID4gMC4wICkge1xuICAgICAgICAvLyB8d3wgPiAxLzIsIG1heSBhcyB3ZWxsIGNob29zZSB3ID4gMS8yXG4gICAgICAgIGZSb290ID0gTWF0aC5zcXJ0KGZUcmFjZSArIDEuMCk7ICAvLyAyd1xuICAgICAgICBvdXRbM10gPSAwLjUgKiBmUm9vdDtcbiAgICAgICAgZlJvb3QgPSAwLjUvZlJvb3Q7ICAvLyAxLyg0dylcbiAgICAgICAgb3V0WzBdID0gKG1bN10tbVs1XSkqZlJvb3Q7XG4gICAgICAgIG91dFsxXSA9IChtWzJdLW1bNl0pKmZSb290O1xuICAgICAgICBvdXRbMl0gPSAobVszXS1tWzFdKSpmUm9vdDtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB8d3wgPD0gMS8yXG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgaWYgKCBtWzRdID4gbVswXSApXG4gICAgICAgICAgaSA9IDE7XG4gICAgICAgIGlmICggbVs4XSA+IG1baSozK2ldIClcbiAgICAgICAgICBpID0gMjtcbiAgICAgICAgdmFyIGogPSAoaSsxKSUzO1xuICAgICAgICB2YXIgayA9IChpKzIpJTM7XG4gICAgICAgIFxuICAgICAgICBmUm9vdCA9IE1hdGguc3FydChtW2kqMytpXS1tW2oqMytqXS1tW2sqMytrXSArIDEuMCk7XG4gICAgICAgIG91dFtpXSA9IDAuNSAqIGZSb290O1xuICAgICAgICBmUm9vdCA9IDAuNSAvIGZSb290O1xuICAgICAgICBvdXRbM10gPSAobVtrKjMral0gLSBtW2oqMytrXSkgKiBmUm9vdDtcbiAgICAgICAgb3V0W2pdID0gKG1baiozK2ldICsgbVtpKjMral0pICogZlJvb3Q7XG4gICAgICAgIG91dFtrXSA9IChtW2sqMytpXSArIG1baSozK2tdKSAqIGZSb290O1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgcXVhdGVuaW9uXG4gKlxuICogQHBhcmFtIHtxdWF0fSB2ZWMgdmVjdG9yIHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcbiAqL1xucXVhdC5zdHIgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiAncXVhdCgnICsgYVswXSArICcsICcgKyBhWzFdICsgJywgJyArIGFbMl0gKyAnLCAnICsgYVszXSArICcpJztcbn07XG5cbmlmKHR5cGVvZihleHBvcnRzKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBleHBvcnRzLnF1YXQgPSBxdWF0O1xufVxuO1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4gIH0pKHNoaW0uZXhwb3J0cyk7XG59KSh0aGlzKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgdmFyIHNsaWNlID0gW10uc2xpY2U7XG5cbiAgZnVuY3Rpb24gcXVldWUocGFyYWxsZWxpc20pIHtcbiAgICB2YXIgcSxcbiAgICAgICAgdGFza3MgPSBbXSxcbiAgICAgICAgc3RhcnRlZCA9IDAsIC8vIG51bWJlciBvZiB0YXNrcyB0aGF0IGhhdmUgYmVlbiBzdGFydGVkIChhbmQgcGVyaGFwcyBmaW5pc2hlZClcbiAgICAgICAgYWN0aXZlID0gMCwgLy8gbnVtYmVyIG9mIHRhc2tzIGN1cnJlbnRseSBiZWluZyBleGVjdXRlZCAoc3RhcnRlZCBidXQgbm90IGZpbmlzaGVkKVxuICAgICAgICByZW1haW5pbmcgPSAwLCAvLyBudW1iZXIgb2YgdGFza3Mgbm90IHlldCBmaW5pc2hlZFxuICAgICAgICBwb3BwaW5nLCAvLyBpbnNpZGUgYSBzeW5jaHJvbm91cyB0YXNrIGNhbGxiYWNrP1xuICAgICAgICBlcnJvciA9IG51bGwsXG4gICAgICAgIGF3YWl0ID0gbm9vcCxcbiAgICAgICAgYWxsO1xuXG4gICAgaWYgKCFwYXJhbGxlbGlzbSkgcGFyYWxsZWxpc20gPSBJbmZpbml0eTtcblxuICAgIGZ1bmN0aW9uIHBvcCgpIHtcbiAgICAgIHdoaWxlIChwb3BwaW5nID0gc3RhcnRlZCA8IHRhc2tzLmxlbmd0aCAmJiBhY3RpdmUgPCBwYXJhbGxlbGlzbSkge1xuICAgICAgICB2YXIgaSA9IHN0YXJ0ZWQrKyxcbiAgICAgICAgICAgIHQgPSB0YXNrc1tpXSxcbiAgICAgICAgICAgIGEgPSBzbGljZS5jYWxsKHQsIDEpO1xuICAgICAgICBhLnB1c2goY2FsbGJhY2soaSkpO1xuICAgICAgICArK2FjdGl2ZTtcbiAgICAgICAgdFswXS5hcHBseShudWxsLCBhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYWxsYmFjayhpKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oZSwgcikge1xuICAgICAgICAtLWFjdGl2ZTtcbiAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHJldHVybjtcbiAgICAgICAgaWYgKGUgIT0gbnVsbCkge1xuICAgICAgICAgIGVycm9yID0gZTsgLy8gaWdub3JlIG5ldyB0YXNrcyBhbmQgc3F1ZWxjaCBhY3RpdmUgY2FsbGJhY2tzXG4gICAgICAgICAgc3RhcnRlZCA9IHJlbWFpbmluZyA9IE5hTjsgLy8gc3RvcCBxdWV1ZWQgdGFza3MgZnJvbSBzdGFydGluZ1xuICAgICAgICAgIG5vdGlmeSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhc2tzW2ldID0gcjtcbiAgICAgICAgICBpZiAoLS1yZW1haW5pbmcpIHBvcHBpbmcgfHwgcG9wKCk7XG4gICAgICAgICAgZWxzZSBub3RpZnkoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBub3RpZnkoKSB7XG4gICAgICBpZiAoZXJyb3IgIT0gbnVsbCkgYXdhaXQoZXJyb3IpO1xuICAgICAgZWxzZSBpZiAoYWxsKSBhd2FpdChlcnJvciwgdGFza3MpO1xuICAgICAgZWxzZSBhd2FpdC5hcHBseShudWxsLCBbZXJyb3JdLmNvbmNhdCh0YXNrcykpO1xuICAgIH1cblxuICAgIHJldHVybiBxID0ge1xuICAgICAgZGVmZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgdGFza3MucHVzaChhcmd1bWVudHMpO1xuICAgICAgICAgICsrcmVtYWluaW5nO1xuICAgICAgICAgIHBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBxO1xuICAgICAgfSxcbiAgICAgIGF3YWl0OiBmdW5jdGlvbihmKSB7XG4gICAgICAgIGF3YWl0ID0gZjtcbiAgICAgICAgYWxsID0gZmFsc2U7XG4gICAgICAgIGlmICghcmVtYWluaW5nKSBub3RpZnkoKTtcbiAgICAgICAgcmV0dXJuIHE7XG4gICAgICB9LFxuICAgICAgYXdhaXRBbGw6IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgYXdhaXQgPSBmO1xuICAgICAgICBhbGwgPSB0cnVlO1xuICAgICAgICBpZiAoIXJlbWFpbmluZykgbm90aWZ5KCk7XG4gICAgICAgIHJldHVybiBxO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBub29wKCkge31cblxuICBxdWV1ZS52ZXJzaW9uID0gXCIxLjAuN1wiO1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIHF1ZXVlOyB9KTtcbiAgZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHMgPSBxdWV1ZTtcbiAgZWxzZSB0aGlzLnF1ZXVlID0gcXVldWU7XG59KSgpO1xuIiwiLy8gTWlzY2VsbGFuZW91cyBnZW8gZnVuY3Rpb25zXG52YXIgUG9pbnQgPSByZXF1aXJlKCcuL3BvaW50LmpzJyk7XG5cbnZhciBHZW8gPSB7fTtcblxuLy8gUHJvamVjdGlvbiBjb25zdGFudHNcbkdlby50aWxlX3NpemUgPSAyNTY7XG5HZW8uaGFsZl9jaXJjdW1mZXJlbmNlX21ldGVycyA9IDIwMDM3NTA4LjM0Mjc4OTI0NDtcbkdlby5tYXBfb3JpZ2luX21ldGVycyA9IFBvaW50KC1HZW8uaGFsZl9jaXJjdW1mZXJlbmNlX21ldGVycywgR2VvLmhhbGZfY2lyY3VtZmVyZW5jZV9tZXRlcnMpO1xuR2VvLm1pbl96b29tX21ldGVyc19wZXJfcGl4ZWwgPSBHZW8uaGFsZl9jaXJjdW1mZXJlbmNlX21ldGVycyAqIDIgLyBHZW8udGlsZV9zaXplOyAvLyBtaW4gem9vbSBkcmF3cyB3b3JsZCBhcyAyIHRpbGVzIHdpZGVcbkdlby5tZXRlcnNfcGVyX3BpeGVsID0gW107XG5HZW8ubWF4X3pvb20gPSAyMDtcbmZvciAodmFyIHo9MDsgeiA8PSBHZW8ubWF4X3pvb207IHorKykge1xuICAgIEdlby5tZXRlcnNfcGVyX3BpeGVsW3pdID0gR2VvLm1pbl96b29tX21ldGVyc19wZXJfcGl4ZWwgLyBNYXRoLnBvdygyLCB6KTtcbn1cblxuLy8gQ29udmVyc2lvbiBmdW5jdGlvbnMgYmFzZWQgb24gYW4gZGVmaW5lZCB0aWxlIHNjYWxlXG5HZW8udW5pdHNfcGVyX21ldGVyID0gW107XG5HZW8uc2V0VGlsZVNjYWxlID0gZnVuY3Rpb24oc2NhbGUpXG57XG4gICAgR2VvLnRpbGVfc2NhbGUgPSBzY2FsZTtcbiAgICBHZW8udW5pdHNfcGVyX3BpeGVsID0gR2VvLnRpbGVfc2NhbGUgLyBHZW8udGlsZV9zaXplO1xuXG4gICAgZm9yICh2YXIgej0wOyB6IDw9IEdlby5tYXhfem9vbTsgeisrKSB7XG4gICAgICAgIEdlby51bml0c19wZXJfbWV0ZXJbel0gPSBHZW8udGlsZV9zY2FsZSAvIChHZW8udGlsZV9zaXplICogR2VvLm1ldGVyc19wZXJfcGl4ZWxbel0pO1xuICAgIH1cbn07XG5cbi8vIENvbnZlcnQgdGlsZSBsb2NhdGlvbiB0byBtZXJjYXRvciBtZXRlcnMgLSBtdWx0aXBseSBieSBwaXhlbHMgcGVyIHRpbGUsIHRoZW4gYnkgbWV0ZXJzIHBlciBwaXhlbCwgYWRqdXN0IGZvciBtYXAgb3JpZ2luXG5HZW8ubWV0ZXJzRm9yVGlsZSA9IGZ1bmN0aW9uICh0aWxlKVxue1xuICAgIHJldHVybiBQb2ludChcbiAgICAgICAgKHRpbGUueCAqIEdlby50aWxlX3NpemUgKiBHZW8ubWV0ZXJzX3Blcl9waXhlbFt0aWxlLnpdKSArIEdlby5tYXBfb3JpZ2luX21ldGVycy54LFxuICAgICAgICAoKHRpbGUueSAqIEdlby50aWxlX3NpemUgKiBHZW8ubWV0ZXJzX3Blcl9waXhlbFt0aWxlLnpdKSAqIC0xKSArIEdlby5tYXBfb3JpZ2luX21ldGVycy55XG4gICAgKTtcbn07XG5cbi8vIENvbnZlcnQgbWVyY2F0b3IgbWV0ZXJzIHRvIGxhdC1sbmdcbkdlby5tZXRlcnNUb0xhdExuZyA9IGZ1bmN0aW9uIChtZXRlcnMpXG57XG4gICAgdmFyIGMgPSBQb2ludC5jb3B5KG1ldGVycyk7XG5cbiAgICBjLnggLz0gR2VvLmhhbGZfY2lyY3VtZmVyZW5jZV9tZXRlcnM7XG4gICAgYy55IC89IEdlby5oYWxmX2NpcmN1bWZlcmVuY2VfbWV0ZXJzO1xuXG4gICAgYy55ID0gKDIgKiBNYXRoLmF0YW4oTWF0aC5leHAoYy55ICogTWF0aC5QSSkpIC0gKE1hdGguUEkgLyAyKSkgLyBNYXRoLlBJO1xuXG4gICAgYy54ICo9IDE4MDtcbiAgICBjLnkgKj0gMTgwO1xuXG4gICAgcmV0dXJuIGM7XG59O1xuXG4vLyBDb252ZXJ0IGxhdC1sbmcgdG8gbWVyY2F0b3IgbWV0ZXJzXG5HZW8ubGF0TG5nVG9NZXRlcnMgPSBmdW5jdGlvbihsYXRsbmcpXG57XG4gICAgdmFyIGMgPSBQb2ludC5jb3B5KGxhdGxuZyk7XG5cbiAgICAvLyBMYXRpdHVkZVxuICAgIGMueSA9IE1hdGgubG9nKE1hdGgudGFuKChjLnkgKyA5MCkgKiBNYXRoLlBJIC8gMzYwKSkgLyAoTWF0aC5QSSAvIDE4MCk7XG4gICAgYy55ID0gYy55ICogR2VvLmhhbGZfY2lyY3VtZmVyZW5jZV9tZXRlcnMgLyAxODA7XG5cbiAgICAvLyBMb25naXR1ZGVcbiAgICBjLnggPSBjLnggKiBHZW8uaGFsZl9jaXJjdW1mZXJlbmNlX21ldGVycyAvIDE4MDtcblxuICAgIHJldHVybiBjO1xufTtcblxuLy8gUnVuIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIG9uIGVhY2ggY29vb3JkaW5hdGUgaW4gYSBHZW9KU09OIGdlb21ldHJ5XG5HZW8udHJhbnNmb3JtR2VvbWV0cnkgPSBmdW5jdGlvbiAoZ2VvbWV0cnksIHRyYW5zZm9ybSlcbntcbiAgICBpZiAoZ2VvbWV0cnkudHlwZSA9PSAnUG9pbnQnKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm0oZ2VvbWV0cnkuY29vcmRpbmF0ZXMpO1xuICAgIH1cbiAgICBlbHNlIGlmIChnZW9tZXRyeS50eXBlID09ICdMaW5lU3RyaW5nJyB8fCBnZW9tZXRyeS50eXBlID09ICdNdWx0aVBvaW50Jykge1xuICAgICAgICByZXR1cm4gZ2VvbWV0cnkuY29vcmRpbmF0ZXMubWFwKHRyYW5zZm9ybSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGdlb21ldHJ5LnR5cGUgPT0gJ1BvbHlnb24nIHx8IGdlb21ldHJ5LnR5cGUgPT0gJ011bHRpTGluZVN0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGdlb21ldHJ5LmNvb3JkaW5hdGVzLm1hcChmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBjb29yZGluYXRlcy5tYXAodHJhbnNmb3JtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGdlb21ldHJ5LnR5cGUgPT0gJ011bHRpUG9seWdvbicpIHtcbiAgICAgICAgcmV0dXJuIGdlb21ldHJ5LmNvb3JkaW5hdGVzLm1hcChmdW5jdGlvbiAocG9seWdvbikge1xuICAgICAgICAgICAgcmV0dXJuIHBvbHlnb24ubWFwKGZ1bmN0aW9uIChjb29yZGluYXRlcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb29yZGluYXRlcy5tYXAodHJhbnNmb3JtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gVE9ETzogc3VwcG9ydCBHZW9tZXRyeUNvbGxlY3Rpb25cbiAgICByZXR1cm4ge307XG59O1xuXG5HZW8uYm94SW50ZXJzZWN0ID0gZnVuY3Rpb24gKGIxLCBiMilcbntcbiAgICByZXR1cm4gIShcbiAgICAgICAgYjIuc3cueCA+IGIxLm5lLnggfHxcbiAgICAgICAgYjIubmUueCA8IGIxLnN3LnggfHxcbiAgICAgICAgYjIuc3cueSA+IGIxLm5lLnkgfHxcbiAgICAgICAgYjIubmUueSA8IGIxLnN3LnlcbiAgICApO1xufTtcblxuLy8gU3BsaXQgdGhlIGxpbmVzIG9mIGEgZmVhdHVyZSB3aGVyZXZlciB0d28gcG9pbnRzIGFyZSBmYXJ0aGVyIGFwYXJ0IHRoYW4gYSBnaXZlbiB0b2xlcmFuY2Vcbkdlby5zcGxpdEZlYXR1cmVMaW5lcyAgPSBmdW5jdGlvbiAoZmVhdHVyZSwgdG9sZXJhbmNlKSB7XG4gICAgdmFyIHRvbGVyYW5jZSA9IHRvbGVyYW5jZSB8fCAwLjAwMTtcbiAgICB2YXIgdG9sZXJhbmNlX3NxID0gdG9sZXJhbmNlICogdG9sZXJhbmNlO1xuICAgIHZhciBnZW9tID0gZmVhdHVyZS5nZW9tZXRyeTtcbiAgICB2YXIgbGluZXM7XG5cbiAgICBpZiAoZ2VvbS50eXBlID09ICdNdWx0aUxpbmVTdHJpbmcnKSB7XG4gICAgICAgIGxpbmVzID0gZ2VvbS5jb29yZGluYXRlcztcbiAgICB9XG4gICAgZWxzZSBpZiAoZ2VvbS50eXBlID09J0xpbmVTdHJpbmcnKSB7XG4gICAgICAgIGxpbmVzID0gW2dlb20uY29vcmRpbmF0ZXNdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZlYXR1cmU7XG4gICAgfVxuXG4gICAgdmFyIHNwbGl0X2xpbmVzID0gW107XG5cbiAgICBmb3IgKHZhciBzPTA7IHMgPCBsaW5lcy5sZW5ndGg7IHMrKykge1xuICAgICAgICB2YXIgc2VnID0gbGluZXNbc107XG4gICAgICAgIHZhciBzcGxpdF9zZWcgPSBbXTtcbiAgICAgICAgdmFyIGxhc3RfY29vcmQgPSBudWxsO1xuICAgICAgICB2YXIga2VlcDtcblxuICAgICAgICBmb3IgKHZhciBjPTA7IGMgPCBzZWcubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgICAgIHZhciBjb29yZCA9IHNlZ1tjXTtcbiAgICAgICAgICAgIGtlZXAgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAobGFzdF9jb29yZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRpc3QgPSAoY29vcmRbMF0gLSBsYXN0X2Nvb3JkWzBdKSAqIChjb29yZFswXSAtIGxhc3RfY29vcmRbMF0pICsgKGNvb3JkWzFdIC0gbGFzdF9jb29yZFsxXSkgKiAoY29vcmRbMV0gLSBsYXN0X2Nvb3JkWzFdKTtcbiAgICAgICAgICAgICAgICBpZiAoZGlzdCA+IHRvbGVyYW5jZV9zcSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInNwbGl0IGxpbmVzIGF0IChcIiArIGNvb3JkWzBdICsgXCIsIFwiICsgY29vcmRbMV0gKyBcIiksIFwiICsgTWF0aC5zcXJ0KGRpc3QpICsgXCIgYXBhcnRcIik7XG4gICAgICAgICAgICAgICAgICAgIGtlZXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChrZWVwID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgc3BsaXRfbGluZXMucHVzaChzcGxpdF9zZWcpO1xuICAgICAgICAgICAgICAgIHNwbGl0X3NlZyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3BsaXRfc2VnLnB1c2goY29vcmQpO1xuXG4gICAgICAgICAgICBsYXN0X2Nvb3JkID0gY29vcmQ7XG4gICAgICAgIH1cblxuICAgICAgICBzcGxpdF9saW5lcy5wdXNoKHNwbGl0X3NlZyk7XG4gICAgICAgIHNwbGl0X3NlZyA9IFtdO1xuICAgIH1cblxuICAgIGlmIChzcGxpdF9saW5lcy5sZW5ndGggPT0gMSkge1xuICAgICAgICBnZW9tLnR5cGUgPSAnTGluZVN0cmluZyc7XG4gICAgICAgIGdlb20uY29vcmRpbmF0ZXMgPSBzcGxpdF9saW5lc1swXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdlb20udHlwZSA9ICdNdWx0aUxpbmVTdHJpbmcnO1xuICAgICAgICBnZW9tLmNvb3JkaW5hdGVzID0gc3BsaXRfbGluZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZlYXR1cmU7XG59O1xuXG5pZiAobW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEdlbztcbn1cbiIsIi8vIFdlYkdMIG1hbmFnZW1lbnQgYW5kIHJlbmRlcmluZyBmdW5jdGlvbnNcblxudmFyIFV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMuanMnKTtcbi8vIHZhciBHTFZlcnRleEFycmF5T2JqZWN0ID0gcmVxdWlyZSgnLi9nbF92YW8uanMnKTtcblxudmFyIEdMID0ge307XG5cbi8vIFNldHVwIGEgV2ViR0wgY29udGV4dFxuLy8gSWYgbm8gY2FudmFzIGVsZW1lbnQgaXMgcHJvdmlkZWQsIG9uZSBpcyBjcmVhdGVkIGFuZCBhZGRlZCB0byB0aGUgZG9jdW1lbnQgYm9keVxuR0wuZ2V0Q29udGV4dCA9IGZ1bmN0aW9uIGdldENvbnRleHQgKGNhbnZhcylcbntcbiAgICB2YXIgY2FudmFzID0gY2FudmFzO1xuICAgIHZhciBmdWxsc2NyZWVuID0gZmFsc2U7XG4gICAgaWYgKGNhbnZhcyA9PSBudWxsKSB7XG4gICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBjYW52YXMuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICBjYW52YXMuc3R5bGUudG9wID0gMDtcbiAgICAgICAgY2FudmFzLnN0eWxlLmxlZnQgPSAwO1xuICAgICAgICBjYW52YXMuc3R5bGUuekluZGV4ID0gLTE7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgICAgICAgZnVsbHNjcmVlbiA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGdsID0gY2FudmFzLmdldENvbnRleHQoJ2V4cGVyaW1lbnRhbC13ZWJnbCcpO1xuICAgIGlmICghZ2wpIHtcbiAgICAgICAgYWxlcnQoXCJDb3VsZG4ndCBjcmVhdGUgV2ViR0wgY29udGV4dC4gWW91ciBicm93c2VyIHByb2JhYmx5IGRvZXNuJ3Qgc3VwcG9ydCBXZWJHTCBvciBpdCdzIHR1cm5lZCBvZmY/XCIpO1xuICAgICAgICB0aHJvdyBcIkNvdWxkbid0IGNyZWF0ZSBXZWJHTCBjb250ZXh0XCI7XG4gICAgfVxuXG4gICAgR0wucmVzaXplQ2FudmFzKGdsLCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICBpZiAoZnVsbHNjcmVlbiA9PSB0cnVlKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBHTC5yZXNpemVDYW52YXMoZ2wsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBHTFZlcnRleEFycmF5T2JqZWN0LmluaXQoZ2wpOyAvLyBUT0RPOiB0aGlzIHBhdHRlcm4gZG9lc24ndCBzdXBwb3J0IG11bHRpcGxlIGFjdGl2ZSBHTCBjb250ZXh0cywgc2hvdWxkIHRoYXQgZXZlbiBiZSBzdXBwb3J0ZWQ/XG5cbiAgICByZXR1cm4gZ2w7XG59O1xuXG5HTC5yZXNpemVDYW52YXMgPSBmdW5jdGlvbiAoZ2wsIHdpZHRoLCBoZWlnaHQpXG57XG4gICAgdmFyIGRldmljZV9waXhlbF9yYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG4gICAgZ2wuY2FudmFzLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgIGdsLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICAgIGdsLmNhbnZhcy53aWR0aCA9IE1hdGgucm91bmQoZ2wuY2FudmFzLnN0eWxlLndpZHRoICogZGV2aWNlX3BpeGVsX3JhdGlvKTtcbiAgICBnbC5jYW52YXMuaGVpZ2h0ID0gTWF0aC5yb3VuZChnbC5jYW52YXMuc3R5bGUud2lkdGggKiBkZXZpY2VfcGl4ZWxfcmF0aW8pO1xuICAgIGdsLnZpZXdwb3J0KDAsIDAsIGdsLmNhbnZhcy53aWR0aCwgZ2wuY2FudmFzLmhlaWdodCk7XG59O1xuXG4vLyBDb21waWxlICYgbGluayBhIFdlYkdMIHByb2dyYW0gZnJvbSBwcm92aWRlZCB2ZXJ0ZXggYW5kIGZyYWdtZW50IHNoYWRlciBzb3VyY2VzXG4vLyB1cGRhdGUgYSBwcm9ncmFtIGlmIG9uZSBpcyBwYXNzZWQgaW4uIENyZWF0ZSBvbmUgaWYgbm90LiBBbGVydCBhbmQgZG9uJ3QgdXBkYXRlIGFueXRoaW5nIGlmIHRoZSBzaGFkZXJzIGRvbid0IGNvbXBpbGUuXG5HTC51cGRhdGVQcm9ncmFtID0gZnVuY3Rpb24gR0x1cGRhdGVQcm9ncmFtIChnbCwgcHJvZ3JhbSwgdmVydGV4X3NoYWRlcl9zb3VyY2UsIGZyYWdtZW50X3NoYWRlcl9zb3VyY2UpXG57XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIHZlcnRleF9zaGFkZXIgPSBHTC5jcmVhdGVTaGFkZXIoZ2wsIHZlcnRleF9zaGFkZXJfc291cmNlLCBnbC5WRVJURVhfU0hBREVSKTtcbiAgICAgICAgdmFyIGZyYWdtZW50X3NoYWRlciA9IEdMLmNyZWF0ZVNoYWRlcihnbCwgJyNpZmRlZiBHTF9FU1xcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcXG4jZW5kaWZcXG5cXG4nICsgZnJhZ21lbnRfc2hhZGVyX3NvdXJjZSwgZ2wuRlJBR01FTlRfU0hBREVSKTtcbiAgICB9XG4gICAgY2F0Y2goZXJyKSB7XG4gICAgICAgIC8vIGFsZXJ0KGVycik7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIHJldHVybiBwcm9ncmFtO1xuICAgIH1cblxuICAgIGdsLnVzZVByb2dyYW0obnVsbCk7XG4gICAgaWYgKHByb2dyYW0gIT0gbnVsbCkge1xuICAgICAgICB2YXIgb2xkX3NoYWRlcnMgPSBnbC5nZXRBdHRhY2hlZFNoYWRlcnMocHJvZ3JhbSk7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBvbGRfc2hhZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZ2wuZGV0YWNoU2hhZGVyKHByb2dyYW0sIG9sZF9zaGFkZXJzW2ldKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgfVxuXG4gICAgaWYgKHZlcnRleF9zaGFkZXIgPT0gbnVsbCB8fCBmcmFnbWVudF9zaGFkZXIgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gcHJvZ3JhbTtcbiAgICB9XG5cbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdmVydGV4X3NoYWRlcik7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50X3NoYWRlcik7XG5cbiAgICBnbC5kZWxldGVTaGFkZXIodmVydGV4X3NoYWRlcik7XG4gICAgZ2wuZGVsZXRlU2hhZGVyKGZyYWdtZW50X3NoYWRlcik7XG5cbiAgICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcblxuICAgIGlmICghZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5MSU5LX1NUQVRVUykpIHtcbiAgICAgICAgdmFyIHByb2dyYW1fZXJyb3IgPVxuICAgICAgICAgICAgXCJXZWJHTCBwcm9ncmFtIGVycm9yOlxcblwiICtcbiAgICAgICAgICAgIFwiVkFMSURBVEVfU1RBVFVTOiBcIiArIGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuVkFMSURBVEVfU1RBVFVTKSArIFwiXFxuXCIgK1xuICAgICAgICAgICAgXCJFUlJPUjogXCIgKyBnbC5nZXRFcnJvcigpICsgXCJcXG5cXG5cIiArXG4gICAgICAgICAgICBcIi0tLSBWZXJ0ZXggU2hhZGVyIC0tLVxcblwiICsgdmVydGV4X3NoYWRlcl9zb3VyY2UgKyBcIlxcblxcblwiICtcbiAgICAgICAgICAgIFwiLS0tIEZyYWdtZW50IFNoYWRlciAtLS1cXG5cIiArIGZyYWdtZW50X3NoYWRlcl9zb3VyY2U7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2dyYW1fZXJyb3IpO1xuICAgICAgICB0aHJvdyBwcm9ncmFtX2Vycm9yO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9ncmFtO1xufTtcblxuLy8gQ29tcGlsZSBhIHZlcnRleCBvciBmcmFnbWVudCBzaGFkZXIgZnJvbSBwcm92aWRlZCBzb3VyY2VcbkdMLmNyZWF0ZVNoYWRlciA9IGZ1bmN0aW9uIEdMY3JlYXRlU2hhZGVyIChnbCwgc291cmNlLCB0eXBlKVxue1xuICAgIHZhciBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSk7XG5cbiAgICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzb3VyY2UpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcblxuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICAgIHZhciBzaGFkZXJfZXJyb3IgPVxuICAgICAgICAgICAgXCJXZWJHTCBzaGFkZXIgZXJyb3I6XFxuXCIgK1xuICAgICAgICAgICAgKHR5cGUgPT0gZ2wuVkVSVEVYX1NIQURFUiA/IFwiVkVSVEVYXCIgOiBcIkZSQUdNRU5UXCIpICsgXCIgU0hBREVSOlxcblwiICtcbiAgICAgICAgICAgIGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKTtcbiAgICAgICAgdGhyb3cgc2hhZGVyX2Vycm9yO1xuICAgIH1cblxuICAgIHJldHVybiBzaGFkZXI7XG59O1xuXG4vLyBUcmlhbmd1bGF0aW9uIHVzaW5nIGxpYnRlc3MuanMgcG9ydCBvZiBnbHVUZXNzZWxhdG9yXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYnJlbmRhbmtlbm55L2xpYnRlc3MuanNcbnRyeSB7XG4gICAgR0wudGVzc2VsYXRvciA9IChmdW5jdGlvbiBpbml0VGVzc2VsYXRvcigpIHtcbiAgICAgICAgdmFyIHRlc3NlbGF0b3IgPSBuZXcgbGlidGVzcy5HbHVUZXNzZWxhdG9yKCk7XG5cbiAgICAgICAgLy8gQ2FsbGVkIGZvciBlYWNoIHZlcnRleCBvZiB0ZXNzZWxhdG9yIG91dHB1dFxuICAgICAgICBmdW5jdGlvbiB2ZXJ0ZXhDYWxsYmFjayhkYXRhLCBwb2x5VmVydEFycmF5KSB7XG4gICAgICAgICAgICBpZiAodGVzc2VsYXRvci56ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBwb2x5VmVydEFycmF5LnB1c2goW2RhdGFbMF0sIGRhdGFbMV0sIHRlc3NlbGF0b3Iuel0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9seVZlcnRBcnJheS5wdXNoKFtkYXRhWzBdLCBkYXRhWzFdXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDYWxsZWQgd2hlbiBzZWdtZW50cyBpbnRlcnNlY3QgYW5kIG11c3QgYmUgc3BsaXRcbiAgICAgICAgZnVuY3Rpb24gY29tYmluZUNhbGxiYWNrKGNvb3JkcywgZGF0YSwgd2VpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gY29vcmRzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2FsbGVkIHdoZW4gYSB2ZXJ0ZXggc3RhcnRzIG9yIHN0b3BzIGEgYm91bmRhcnkgZWRnZSBvZiBhIHBvbHlnb25cbiAgICAgICAgZnVuY3Rpb24gZWRnZUNhbGxiYWNrKGZsYWcpIHtcbiAgICAgICAgICAgIC8vIE5vLW9wIGNhbGxiYWNrIHRvIGZvcmNlIHNpbXBsZSB0cmlhbmdsZSBwcmltaXRpdmVzIChubyB0cmlhbmdsZSBzdHJpcHMgb3IgZmFucykuXG4gICAgICAgICAgICAvLyBTZWU6IGh0dHA6Ly93d3cuZ2xwcm9ncmFtbWluZy5jb20vcmVkL2NoYXB0ZXIxMS5odG1sXG4gICAgICAgICAgICAvLyBcIlNpbmNlIGVkZ2UgZmxhZ3MgbWFrZSBubyBzZW5zZSBpbiBhIHRyaWFuZ2xlIGZhbiBvciB0cmlhbmdsZSBzdHJpcCwgaWYgdGhlcmUgaXMgYSBjYWxsYmFja1xuICAgICAgICAgICAgLy8gYXNzb2NpYXRlZCB3aXRoIEdMVV9URVNTX0VER0VfRkxBRyB0aGF0IGVuYWJsZXMgZWRnZSBmbGFncywgdGhlIEdMVV9URVNTX0JFR0lOIGNhbGxiYWNrIGlzXG4gICAgICAgICAgICAvLyBjYWxsZWQgb25seSB3aXRoIEdMX1RSSUFOR0xFUy5cIlxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0dMLnRlc3NlbGF0b3I6IGVkZ2UgZmxhZzogJyArIGZsYWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGVzc2VsYXRvci5nbHVUZXNzQ2FsbGJhY2sobGlidGVzcy5nbHVFbnVtLkdMVV9URVNTX1ZFUlRFWF9EQVRBLCB2ZXJ0ZXhDYWxsYmFjayk7XG4gICAgICAgIHRlc3NlbGF0b3IuZ2x1VGVzc0NhbGxiYWNrKGxpYnRlc3MuZ2x1RW51bS5HTFVfVEVTU19DT01CSU5FLCBjb21iaW5lQ2FsbGJhY2spO1xuICAgICAgICB0ZXNzZWxhdG9yLmdsdVRlc3NDYWxsYmFjayhsaWJ0ZXNzLmdsdUVudW0uR0xVX1RFU1NfRURHRV9GTEFHLCBlZGdlQ2FsbGJhY2spO1xuXG4gICAgICAgIC8vIEJyZW5kYW4gS2Vubnk6XG4gICAgICAgIC8vIGxpYnRlc3Mgd2lsbCB0YWtlIDNkIHZlcnRzIGFuZCBmbGF0dGVuIHRvIGEgcGxhbmUgZm9yIHRlc3NlbGF0aW9uXG4gICAgICAgIC8vIHNpbmNlIG9ubHkgZG9pbmcgMmQgdGVzc2VsYXRpb24gaGVyZSwgcHJvdmlkZSB6PTEgbm9ybWFsIHRvIHNraXBcbiAgICAgICAgLy8gaXRlcmF0aW5nIG92ZXIgdmVydHMgb25seSB0byBnZXQgdGhlIHNhbWUgYW5zd2VyLlxuICAgICAgICAvLyBjb21tZW50IG91dCB0byB0ZXN0IG5vcm1hbC1nZW5lcmF0aW9uIGNvZGVcbiAgICAgICAgdGVzc2VsYXRvci5nbHVUZXNzTm9ybWFsKDAsIDAsIDEpO1xuXG4gICAgICAgIHJldHVybiB0ZXNzZWxhdG9yO1xuICAgIH0pKCk7XG5cbiAgICBHTC50cmlhbmd1bGF0ZVBvbHlnb24gPSBmdW5jdGlvbiBHTFRyaWFuZ3VsYXRlIChjb250b3VycywgeilcbiAgICB7XG4gICAgICAgIHZhciB0cmlhbmdsZVZlcnRzID0gW107XG4gICAgICAgIEdMLnRlc3NlbGF0b3IueiA9IHo7XG4gICAgICAgIEdMLnRlc3NlbGF0b3IuZ2x1VGVzc0JlZ2luUG9seWdvbih0cmlhbmdsZVZlcnRzKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRvdXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBHTC50ZXNzZWxhdG9yLmdsdVRlc3NCZWdpbkNvbnRvdXIoKTtcbiAgICAgICAgICAgIHZhciBjb250b3VyID0gY29udG91cnNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbnRvdXIubGVuZ3RoOyBqICsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvb3JkcyA9IFtjb250b3VyW2pdWzBdLCBjb250b3VyW2pdWzFdLCAwXTtcbiAgICAgICAgICAgICAgICBHTC50ZXNzZWxhdG9yLmdsdVRlc3NWZXJ0ZXgoY29vcmRzLCBjb29yZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgR0wudGVzc2VsYXRvci5nbHVUZXNzRW5kQ29udG91cigpO1xuICAgICAgICB9XG5cbiAgICAgICAgR0wudGVzc2VsYXRvci5nbHVUZXNzRW5kUG9seWdvbigpO1xuICAgICAgICByZXR1cm4gdHJpYW5nbGVWZXJ0cztcbiAgICB9O1xufVxuY2F0Y2ggKGUpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcImxpYnRlc3Mgbm90IGRlZmluZWQhXCIpO1xuICAgIC8vIHNraXAgaWYgbGlidGVzcyBub3QgZGVmaW5lZFxufVxuXG4vLyBBZGQgdmVydGljZXMgdG8gYW4gYXJyYXkgKGRlc3RpbmVkIHRvIGJlIHVzZWQgYXMgYSBHTCBidWZmZXIpLCAnc3RyaXBpbmcnIGVhY2ggdmVydGV4IHdpdGggY29uc3RhbnQgZGF0YVxuLy8gUGVyLXZlcnRleCBhdHRyaWJ1dGVzIG11c3QgYmUgcHJlLXBhY2tlZCBpbnRvIHRoZSB2ZXJ0aWNlcyBhcnJheVxuLy8gVXNlZCBmb3IgYWRkaW5nIHZhbHVlcyB0aGF0IGFyZSBvZnRlbiBjb25zdGFudCBwZXIgZ2VvbWV0cnkgb3IgcG9seWdvbiwgbGlrZSBjb2xvcnMsIG5vcm1hbHMgKGZvciBwb2x5cyBzaXR0aW5nIGZsYXQgb24gbWFwKSwgbGF5ZXIgYW5kIG1hdGVyaWFsIGluZm8sIGV0Yy5cbkdMLmFkZFZlcnRpY2VzID0gZnVuY3Rpb24gKHZlcnRpY2VzLCB2ZXJ0ZXhfY29uc3RhbnRzLCB2ZXJ0ZXhfZGF0YSlcbntcbiAgICBpZiAodmVydGljZXMgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdmVydGV4X2RhdGE7XG4gICAgfVxuICAgIHZlcnRleF9jb25zdGFudHMgPSB2ZXJ0ZXhfY29uc3RhbnRzIHx8IFtdO1xuXG4gICAgZm9yICh2YXIgdj0wLCB2bGVuID0gdmVydGljZXMubGVuZ3RoOyB2IDwgdmxlbjsgdisrKSB7XG4gICAgICAgIHZlcnRleF9kYXRhLnB1c2guYXBwbHkodmVydGV4X2RhdGEsIHZlcnRpY2VzW3ZdKTtcbiAgICAgICAgdmVydGV4X2RhdGEucHVzaC5hcHBseSh2ZXJ0ZXhfZGF0YSwgdmVydGV4X2NvbnN0YW50cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZlcnRleF9kYXRhO1xufTtcblxuLy8gQWRkIHZlcnRpY2VzIHRvIGFuIGFycmF5LCAnc3RyaXBpbmcnIGVhY2ggdmVydGV4IHdpdGggY29uc3RhbnQgZGF0YVxuLy8gTXVsdGlwbGUsIHVuLXBhY2tlZCBhdHRyaWJ1dGUgYXJyYXlzIGNhbiBiZSBwcm92aWRlZFxuR0wuYWRkVmVydGljZXNNdWx0aXBsZUF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoZHluYW1pY3MsIGNvbnN0YW50cywgdmVydGV4X2RhdGEpXG57XG4gICAgdmFyIGRsZW4gPSBkeW5hbWljcy5sZW5ndGg7XG4gICAgdmFyIHZsZW4gPSBkeW5hbWljc1swXS5sZW5ndGg7XG4gICAgY29uc3RhbnRzID0gY29uc3RhbnRzIHx8IFtdO1xuXG4gICAgZm9yICh2YXIgdj0wOyB2IDwgdmxlbjsgdisrKSB7XG4gICAgICAgIGZvciAodmFyIGQ9MDsgZCA8IGRsZW47IGQrKykge1xuICAgICAgICAgICAgdmVydGV4X2RhdGEucHVzaC5hcHBseSh2ZXJ0ZXhfZGF0YSwgZHluYW1pY3NbZF1bdl0pO1xuICAgICAgICB9XG4gICAgICAgIHZlcnRleF9kYXRhLnB1c2guYXBwbHkodmVydGV4X2RhdGEsIGNvbnN0YW50cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZlcnRleF9kYXRhO1xufTtcblxuLy8gQWRkIHZlcnRpY2VzIHRvIGFuIGFycmF5LCB3aXRoIGEgdmFyaWFibGUgbGF5b3V0IChib3RoIHBlci12ZXJ0ZXggZHluYW1pYyBhbmQgY29uc3RhbnQgYXR0cmlicylcbi8vIEdMLmFkZFZlcnRpY2VzQnlBdHRyaWJ1dGVMYXlvdXQgPSBmdW5jdGlvbiAoYXR0cmlicywgdmVydGV4X2RhdGEpXG4vLyB7XG4vLyAgICAgdmFyIG1heF9sZW5ndGggPSAwO1xuLy8gICAgIGZvciAodmFyIGE9MDsgYSA8IGF0dHJpYnMubGVuZ3RoOyBhKyspIHtcbi8vICAgICAgICAgLy8gY29uc29sZS5sb2coYXR0cmlic1thXS5uYW1lKTtcbi8vICAgICAgICAgLy8gY29uc29sZS5sb2coXCJhIFwiICsgdHlwZW9mIGF0dHJpYnNbYV0uZGF0YSk7XG4vLyAgICAgICAgIGlmICh0eXBlb2YgYXR0cmlic1thXS5kYXRhID09ICdvYmplY3QnKSB7XG4vLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImFbMF0gXCIgKyB0eXBlb2YgYXR0cmlic1thXS5kYXRhWzBdKTtcbi8vICAgICAgICAgICAgIC8vIFBlci12ZXJ0ZXggbGlzdCAtIGFycmF5IG9mIGFycmF5XG4vLyAgICAgICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnNbYV0uZGF0YVswXSA9PSAnb2JqZWN0Jykge1xuLy8gICAgICAgICAgICAgICAgIGF0dHJpYnNbYV0uY3Vyc29yID0gMDtcbi8vICAgICAgICAgICAgICAgICBpZiAoYXR0cmlic1thXS5kYXRhLmxlbmd0aCA+IG1heF9sZW5ndGgpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgbWF4X2xlbmd0aCA9IGF0dHJpYnNbYV0uZGF0YS5sZW5ndGg7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgLy8gU3RhdGljIGFycmF5IGZvciBhbGwgdmVydGljZXNcbi8vICAgICAgICAgICAgIGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgIGF0dHJpYnNbYV0ubmV4dF92ZXJ0ZXggPSBhdHRyaWJzW2FdLmRhdGE7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgZWxzZSB7XG4vLyAgICAgICAgICAgICAvLyBTdGF0aWMgc2luZ2xlIHZhbHVlIGZvciBhbGwgdmVydGljZXMsIGNvbnZlcnQgdG8gYXJyYXlcbi8vICAgICAgICAgICAgIGF0dHJpYnNbYV0ubmV4dF92ZXJ0ZXggPSBbYXR0cmlic1thXS5kYXRhXTtcbi8vICAgICAgICAgfVxuLy8gICAgIH1cblxuLy8gICAgIGZvciAodmFyIHY9MDsgdiA8IG1heF9sZW5ndGg7IHYrKykge1xuLy8gICAgICAgICBmb3IgKHZhciBhPTA7IGEgPCBhdHRyaWJzLmxlbmd0aDsgYSsrKSB7XG4vLyAgICAgICAgICAgICBpZiAoYXR0cmlic1thXS5jdXJzb3IgIT0gbnVsbCkge1xuLy8gICAgICAgICAgICAgICAgIC8vIE5leHQgdmFsdWUgaW4gbGlzdFxuLy8gICAgICAgICAgICAgICAgIGF0dHJpYnNbYV0ubmV4dF92ZXJ0ZXggPSBhdHRyaWJzW2FdLmRhdGFbYXR0cmlic1thXS5jdXJzb3JdO1xuXG4vLyAgICAgICAgICAgICAgICAgLy8gVE9ETzogcmVwZWF0cyBpZiBvbmUgbGlzdCBpcyBzaG9ydGVyIHRoYW4gb3RoZXJzIC0gZGVzaXJlZCBiZWhhdmlvciwgb3IgZW5mb3JjZSBzYW1lIGxlbmd0aD9cbi8vICAgICAgICAgICAgICAgICBpZiAoYXR0cmlic1thXS5jdXJzb3IgPCBhdHRyaWJzW2FdLmRhdGEubGVuZ3RoKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnNbYV0uY3Vyc29yKys7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgdmVydGV4X2RhdGEucHVzaC5hcHBseSh2ZXJ0ZXhfZGF0YSwgYXR0cmlic1thXS5uZXh0X3ZlcnRleCk7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyAgICAgcmV0dXJuIHZlcnRleF9kYXRhO1xuLy8gfTtcblxuaWYgKG1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBHTDtcbn1cbiIsInZhciBWZWN0b3IgPSByZXF1aXJlKCcuLi92ZWN0b3IuanMnKTtcbnZhciBQb2ludCA9IHJlcXVpcmUoJy4uL3BvaW50LmpzJyk7XG52YXIgR0wgPSByZXF1aXJlKCcuL2dsLmpzJyk7XG5cbnZhciBHTEJ1aWxkZXJzID0ge307XG5cbkdMQnVpbGRlcnMuZGVidWcgPSBmYWxzZTtcblxuLy8gVGVzc2VsYXRlIGEgZmxhdCAyRCBwb2x5Z29uIHdpdGggZml4ZWQgaGVpZ2h0IGFuZCBhZGQgdG8gR0wgdmVydGV4IGJ1ZmZlclxuR0xCdWlsZGVycy5idWlsZFBvbHlnb25zID0gZnVuY3Rpb24gR0xCdWlsZGVyc0J1aWxkUG9seWdvbnMgKHBvbHlnb25zLCB6LCB2ZXJ0ZXhfZGF0YSwgb3B0aW9ucylcbntcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHZhciB2ZXJ0ZXhfY29uc3RhbnRzID0gW107XG4gICAgaWYgKHogIT0gbnVsbCkge1xuICAgICAgICB2ZXJ0ZXhfY29uc3RhbnRzLnB1c2goeik7IC8vIHByb3ZpZGVkIHpcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMubm9ybWFscykge1xuICAgICAgICB2ZXJ0ZXhfY29uc3RhbnRzLnB1c2goMCwgMCwgMSk7IC8vIHVwd2FyZHMtZmFjaW5nIG5vcm1hbFxuICAgIH1cbiAgICBpZiAob3B0aW9ucy52ZXJ0ZXhfY29uc3RhbnRzKSB7XG4gICAgICAgIHZlcnRleF9jb25zdGFudHMucHVzaC5hcHBseSh2ZXJ0ZXhfY29uc3RhbnRzLCBvcHRpb25zLnZlcnRleF9jb25zdGFudHMpO1xuICAgIH1cbiAgICBpZiAodmVydGV4X2NvbnN0YW50cy5sZW5ndGggPT0gMCkge1xuICAgICAgICB2ZXJ0ZXhfY29uc3RhbnRzID0gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgbnVtX3BvbHlnb25zID0gcG9seWdvbnMubGVuZ3RoO1xuICAgIGZvciAodmFyIHA9MDsgcCA8IG51bV9wb2x5Z29uczsgcCsrKSB7XG4gICAgICAgIHZhciB2ZXJ0aWNlcyA9IEdMLnRyaWFuZ3VsYXRlUG9seWdvbihwb2x5Z29uc1twXSk7XG4gICAgICAgIEdMLmFkZFZlcnRpY2VzKHZlcnRpY2VzLCB2ZXJ0ZXhfY29uc3RhbnRzLCB2ZXJ0ZXhfZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZlcnRleF9kYXRhO1xufTtcblxuLy8gQ2FsbGJhY2stYmFzZSBidWlsZGVyIChmb3IgZnV0dXJlIGV4cGxvcmF0aW9uKVxuLy8gVGVzc2VsYXRlIGEgZmxhdCAyRCBwb2x5Z29uIHdpdGggZml4ZWQgaGVpZ2h0IGFuZCBhZGQgdG8gR0wgdmVydGV4IGJ1ZmZlclxuLy8gR0xCdWlsZGVycy5idWlsZFBvbHlnb25zMiA9IGZ1bmN0aW9uIEdMQnVpbGRlcnNCdWlsZFBvbHlnb24yIChwb2x5Z29ucywgeiwgYWRkR2VvbWV0cnksIG9wdGlvbnMpXG4vLyB7XG4vLyAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbi8vICAgICB2YXIgbnVtX3BvbHlnb25zID0gcG9seWdvbnMubGVuZ3RoO1xuLy8gICAgIGZvciAodmFyIHA9MDsgcCA8IG51bV9wb2x5Z29uczsgcCsrKSB7XG4vLyAgICAgICAgIHZhciB2ZXJ0aWNlcyA9IHtcbi8vICAgICAgICAgICAgIHBvc2l0aW9uczogR0wudHJpYW5ndWxhdGVQb2x5Z29uKHBvbHlnb25zW3BdLCB6KSxcbi8vICAgICAgICAgICAgIG5vcm1hbHM6IChvcHRpb25zLm5vcm1hbHMgPyBbMCwgMCwgMV0gOiBudWxsKVxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIGFkZEdlb21ldHJ5KHZlcnRpY2VzKTtcbi8vICAgICB9XG4vLyB9O1xuXG4vLyBUZXNzZWxhdGUgYW5kIGV4dHJ1ZGUgYSBmbGF0IDJEIHBvbHlnb24gaW50byBhIHNpbXBsZSAzRCBtb2RlbCB3aXRoIGZpeGVkIGhlaWdodCBhbmQgYWRkIHRvIEdMIHZlcnRleCBidWZmZXJcbkdMQnVpbGRlcnMuYnVpbGRFeHRydWRlZFBvbHlnb25zID0gZnVuY3Rpb24gR0xCdWlsZGVyc0J1aWxkRXh0cnVkZWRQb2x5Z29uIChwb2x5Z29ucywgeiwgaGVpZ2h0LCBtaW5faGVpZ2h0LCB2ZXJ0ZXhfZGF0YSwgb3B0aW9ucylcbntcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgbWluX3ogPSB6ICsgKG1pbl9oZWlnaHQgfHwgMCk7XG4gICAgdmFyIG1heF96ID0geiArIGhlaWdodDtcblxuICAgIC8vIFRvcFxuICAgIEdMQnVpbGRlcnMuYnVpbGRQb2x5Z29ucyhwb2x5Z29ucywgbWF4X3osIHZlcnRleF9kYXRhLCB7IG5vcm1hbHM6IHRydWUsIHZlcnRleF9jb25zdGFudHM6IG9wdGlvbnMudmVydGV4X2NvbnN0YW50cyB9KTtcbiAgICAvLyB2YXIgdG9wX3ZlcnRleF9jb25zdGFudHMgPSBbMCwgMCwgMV07XG4gICAgLy8gaWYgKG9wdGlvbnMudmVydGV4X2NvbnN0YW50cyAhPSBudWxsKSB7XG4gICAgLy8gICAgIHRvcF92ZXJ0ZXhfY29uc3RhbnRzLnB1c2guYXBwbHkodG9wX3ZlcnRleF9jb25zdGFudHMsIG9wdGlvbnMudmVydGV4X2NvbnN0YW50cyk7XG4gICAgLy8gfVxuICAgIC8vIEdMQnVpbGRlcnMuYnVpbGRQb2x5Z29uczIoXG4gICAgLy8gICAgIHBvbHlnb25zLFxuICAgIC8vICAgICBtYXhfeixcbiAgICAvLyAgICAgZnVuY3Rpb24gKHZlcnRpY2VzKSB7XG4gICAgLy8gICAgICAgICBHTC5hZGRWZXJ0aWNlcyh2ZXJ0aWNlcy5wb3NpdGlvbnMsIHRvcF92ZXJ0ZXhfY29uc3RhbnRzLCB2ZXJ0ZXhfZGF0YSk7XG4gICAgLy8gICAgIH1cbiAgICAvLyApO1xuXG4gICAgLy8gV2FsbHNcbiAgICB2YXIgd2FsbF92ZXJ0ZXhfY29uc3RhbnRzID0gW251bGwsIG51bGwsIG51bGxdOyAvLyBub3JtYWxzIHdpbGwgYmUgY2FsY3VsYXRlZCBiZWxvd1xuICAgIGlmIChvcHRpb25zLnZlcnRleF9jb25zdGFudHMpIHtcbiAgICAgICAgd2FsbF92ZXJ0ZXhfY29uc3RhbnRzLnB1c2guYXBwbHkod2FsbF92ZXJ0ZXhfY29uc3RhbnRzLCBvcHRpb25zLnZlcnRleF9jb25zdGFudHMpO1xuICAgIH1cblxuICAgIHZhciBudW1fcG9seWdvbnMgPSBwb2x5Z29ucy5sZW5ndGg7XG4gICAgZm9yICh2YXIgcD0wOyBwIDwgbnVtX3BvbHlnb25zOyBwKyspIHtcbiAgICAgICAgdmFyIHBvbHlnb24gPSBwb2x5Z29uc1twXTtcblxuICAgICAgICBmb3IgKHZhciBxPTA7IHEgPCBwb2x5Z29uLmxlbmd0aDsgcSsrKSB7XG4gICAgICAgICAgICB2YXIgY29udG91ciA9IHBvbHlnb25bcV07XG5cbiAgICAgICAgICAgIGZvciAodmFyIHc9MDsgdyA8IGNvbnRvdXIubGVuZ3RoIC0gMTsgdysrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdhbGxfdmVydGljZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgIC8vIFR3byB0cmlhbmdsZXMgZm9yIHRoZSBxdWFkIGZvcm1lZCBieSBlYWNoIHZlcnRleCBwYWlyLCBnb2luZyBmcm9tIGJvdHRvbSB0byB0b3AgaGVpZ2h0XG4gICAgICAgICAgICAgICAgd2FsbF92ZXJ0aWNlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAvLyBUcmlhbmdsZVxuICAgICAgICAgICAgICAgICAgICBbY29udG91clt3KzFdWzBdLCBjb250b3VyW3crMV1bMV0sIG1heF96XSxcbiAgICAgICAgICAgICAgICAgICAgW2NvbnRvdXJbdysxXVswXSwgY29udG91clt3KzFdWzFdLCBtaW5fel0sXG4gICAgICAgICAgICAgICAgICAgIFtjb250b3VyW3ddWzBdLCBjb250b3VyW3ddWzFdLCBtaW5fel0sXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWFuZ2xlXG4gICAgICAgICAgICAgICAgICAgIFtjb250b3VyW3ddWzBdLCBjb250b3VyW3ddWzFdLCBtaW5fel0sXG4gICAgICAgICAgICAgICAgICAgIFtjb250b3VyW3ddWzBdLCBjb250b3VyW3ddWzFdLCBtYXhfel0sXG4gICAgICAgICAgICAgICAgICAgIFtjb250b3VyW3crMV1bMF0sIGNvbnRvdXJbdysxXVsxXSwgbWF4X3pdXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIC8vIENhbGMgdGhlIG5vcm1hbCBvZiB0aGUgd2FsbCBmcm9tIHVwIHZlY3RvciBhbmQgb25lIHNlZ21lbnQgb2YgdGhlIHdhbGwgdHJpYW5nbGVzXG4gICAgICAgICAgICAgICAgdmFyIG5vcm1hbCA9IFZlY3Rvci5jcm9zcyhcbiAgICAgICAgICAgICAgICAgICAgWzAsIDAsIDFdLFxuICAgICAgICAgICAgICAgICAgICBWZWN0b3Iubm9ybWFsaXplKFtjb250b3VyW3crMV1bMF0gLSBjb250b3VyW3ddWzBdLCBjb250b3VyW3crMV1bMV0gLSBjb250b3VyW3ddWzFdLCAwXSlcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgd2FsbF92ZXJ0ZXhfY29uc3RhbnRzWzBdID0gbm9ybWFsWzBdO1xuICAgICAgICAgICAgICAgIHdhbGxfdmVydGV4X2NvbnN0YW50c1sxXSA9IG5vcm1hbFsxXTtcbiAgICAgICAgICAgICAgICB3YWxsX3ZlcnRleF9jb25zdGFudHNbMl0gPSBub3JtYWxbMl07XG5cbiAgICAgICAgICAgICAgICBHTC5hZGRWZXJ0aWNlcyh3YWxsX3ZlcnRpY2VzLCB3YWxsX3ZlcnRleF9jb25zdGFudHMsIHZlcnRleF9kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2ZXJ0ZXhfZGF0YTtcbn07XG5cbi8vIEJ1aWxkIHRlc3NlbGxhdGVkIHRyaWFuZ2xlcyBmb3IgYSBwb2x5bGluZVxuLy8gQmFzaWNhbGx5IGZvbGxvd2luZyB0aGUgbWV0aG9kIGRlc2NyaWJlZCBoZXJlIGZvciBtaXRlciBqb2ludHM6XG4vLyBodHRwOi8vYXJ0Z3JhbW1lci5ibG9nc3BvdC5jby51ay8yMDExLzA3L2RyYXdpbmctcG9seWxpbmVzLWJ5LXRlc3NlbGxhdGlvbi5odG1sXG5HTEJ1aWxkZXJzLmJ1aWxkUG9seWxpbmVzID0gZnVuY3Rpb24gR0xCdWlsZGVyc0J1aWxkUG9seWxpbmVzIChsaW5lcywgeiwgd2lkdGgsIHZlcnRleF9kYXRhLCBvcHRpb25zKVxue1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMuY2xvc2VkX3BvbHlnb24gPSBvcHRpb25zLmNsb3NlZF9wb2x5Z29uIHx8IGZhbHNlO1xuICAgIG9wdGlvbnMucmVtb3ZlX3RpbGVfZWRnZXMgPSBvcHRpb25zLnJlbW92ZV90aWxlX2VkZ2VzIHx8IGZhbHNlO1xuXG4gICAgdmFyIHZlcnRleF9jb25zdGFudHMgPSBbeiwgMCwgMCwgMV07IC8vIHByb3ZpZGVkIHosIGFuZCB1cHdhcmRzLWZhY2luZyBub3JtYWxcbiAgICBpZiAob3B0aW9ucy52ZXJ0ZXhfY29uc3RhbnRzKSB7XG4gICAgICAgIHZlcnRleF9jb25zdGFudHMucHVzaC5hcHBseSh2ZXJ0ZXhfY29uc3RhbnRzLCBvcHRpb25zLnZlcnRleF9jb25zdGFudHMpO1xuICAgIH1cblxuICAgIC8vIExpbmUgY2VudGVyIC0gZGVidWdnaW5nXG4gICAgaWYgKEdMQnVpbGRlcnMuZGVidWcgJiYgb3B0aW9ucy52ZXJ0ZXhfbGluZXMpIHtcbiAgICAgICAgdmFyIG51bV9saW5lcyA9IGxpbmVzLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgbG49MDsgbG4gPCBudW1fbGluZXM7IGxuKyspIHtcbiAgICAgICAgICAgIHZhciBsaW5lID0gbGluZXNbbG5dO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBwPTA7IHAgPCBsaW5lLmxlbmd0aCAtIDE7IHArKykge1xuICAgICAgICAgICAgICAgIC8vIFBvaW50IEEgdG8gQlxuICAgICAgICAgICAgICAgIHZhciBwYSA9IGxpbmVbcF07XG4gICAgICAgICAgICAgICAgdmFyIHBiID0gbGluZVtwKzFdO1xuXG4gICAgICAgICAgICAgICAgb3B0aW9ucy52ZXJ0ZXhfbGluZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgcGFbMF0sIHBhWzFdLCB6ICsgMC4wMDEsIDAsIDAsIDEsIDEuMCwgMCwgMCxcbiAgICAgICAgICAgICAgICAgICAgcGJbMF0sIHBiWzFdLCB6ICsgMC4wMDEsIDAsIDAsIDEsIDEuMCwgMCwgMFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gQnVpbGQgdHJpYW5nbGVzXG4gICAgdmFyIHZlcnRpY2VzID0gW107XG4gICAgdmFyIG51bV9saW5lcyA9IGxpbmVzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBsbj0wOyBsbiA8IG51bV9saW5lczsgbG4rKykge1xuICAgICAgICB2YXIgbGluZSA9IGxpbmVzW2xuXTtcbiAgICAgICAgLy8gTXVsdGlwbGUgbGluZSBzZWdtZW50c1xuICAgICAgICBpZiAobGluZS5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAvLyBCdWlsZCBhbmNob3JzIGZvciBsaW5lIHNlZ21lbnRzOlxuICAgICAgICAgICAgLy8gYW5jaG9ycyBhcmUgMyBwb2ludHMsIGVhY2ggY29ubmVjdGluZyAyIGxpbmUgc2VnbWVudHMgdGhhdCBzaGFyZSBhIGpvaW50IChzdGFydCBwb2ludCwgam9pbnQgcG9pbnQsIGVuZCBwb2ludClcblxuICAgICAgICAgICAgdmFyIGFuY2hvcnMgPSBbXTtcblxuICAgICAgICAgICAgaWYgKGxpbmUubGVuZ3RoID4gMykge1xuICAgICAgICAgICAgICAgIC8vIEZpbmQgbWlkcG9pbnRzIG9mIGVhY2ggbGluZSBzZWdtZW50XG4gICAgICAgICAgICAgICAgLy8gRm9yIGNsb3NlZCBwb2x5Z29ucywgY2FsY3VsYXRlIGFsbCBtaWRwb2ludHMgc2luY2Ugc2VnbWVudHMgd2lsbCB3cmFwIGFyb3VuZCB0byBmaXJzdCBtaWRwb2ludFxuICAgICAgICAgICAgICAgIHZhciBtaWQgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgcCwgcG1heDtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5jbG9zZWRfcG9seWdvbiA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHAgPSAwOyAvLyBzdGFydCBvbiBmaXJzdCBwb2ludFxuICAgICAgICAgICAgICAgICAgICBwbWF4ID0gbGluZS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBGb3Igb3BlbiBwb2x5Z29ucywgc2tpcCBmaXJzdCBtaWRwb2ludCBhbmQgdXNlIGxpbmUgc3RhcnQgaW5zdGVhZFxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwID0gMTsgLy8gc3RhcnQgb24gc2Vjb25kIHBvaW50XG4gICAgICAgICAgICAgICAgICAgIHBtYXggPSBsaW5lLmxlbmd0aCAtIDI7XG4gICAgICAgICAgICAgICAgICAgIG1pZC5wdXNoKGxpbmVbMF0pOyAvLyB1c2UgbGluZSBzdGFydCBpbnN0ZWFkIG9mIGZpcnN0IG1pZHBvaW50XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQ2FsYyBtaWRwb2ludHNcbiAgICAgICAgICAgICAgICBmb3IgKDsgcCA8IHBtYXg7IHArKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGEgPSBsaW5lW3BdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGIgPSBsaW5lW3ArMV07XG4gICAgICAgICAgICAgICAgICAgIG1pZC5wdXNoKFsocGFbMF0gKyBwYlswXSkgLyAyLCAocGFbMV0gKyBwYlsxXSkgLyAyXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gU2FtZSBjbG9zZWQvb3BlbiBwb2x5Z29uIGxvZ2ljIGFzIGFib3ZlOiBrZWVwIGxhc3QgbWlkcG9pbnQgZm9yIGNsb3NlZCwgc2tpcCBmb3Igb3BlblxuICAgICAgICAgICAgICAgIHZhciBtbWF4O1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmNsb3NlZF9wb2x5Z29uID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgbW1heCA9IG1pZC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtaWQucHVzaChsaW5lW2xpbmUubGVuZ3RoLTFdKTsgLy8gdXNlIGxpbmUgZW5kIGluc3RlYWQgb2YgbGFzdCBtaWRwb2ludFxuICAgICAgICAgICAgICAgICAgICBtbWF4ID0gbWlkLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gTWFrZSBhbmNob3JzIGJ5IGNvbm5lY3RpbmcgbWlkcG9pbnRzIHRvIGxpbmUgam9pbnRzXG4gICAgICAgICAgICAgICAgZm9yIChwPTA7IHAgPCBtbWF4OyBwKyspICB7XG4gICAgICAgICAgICAgICAgICAgIGFuY2hvcnMucHVzaChbbWlkW3BdLCBsaW5lWyhwKzEpICUgbGluZS5sZW5ndGhdLCBtaWRbKHArMSkgJSBtaWQubGVuZ3RoXV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIERlZ2VuZXJhdGUgY2FzZSwgYSAzLXBvaW50IGxpbmUgaXMganVzdCBhIHNpbmdsZSBhbmNob3JcbiAgICAgICAgICAgICAgICBhbmNob3JzID0gW1tsaW5lWzBdLCBsaW5lWzFdLCBsaW5lWzJdXV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIHA9MDsgcCA8IGFuY2hvcnMubGVuZ3RoOyBwKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMucmVtb3ZlX3RpbGVfZWRnZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRBbmNob3IoYW5jaG9yc1twXVswXSwgYW5jaG9yc1twXVsxXSwgYW5jaG9yc1twXVsyXSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGJ1aWxkU2VnbWVudChhbmNob3JzW3BdWzBdLCBhbmNob3JzW3BdWzFdKTsgLy8gdXNlIHRoZXNlIHRvIGRyYXcgZXh0cnVkZWQgc2VnbWVudHMgdy9vIGpvaW4sIGZvciBkZWJ1Z2dpbmdcbiAgICAgICAgICAgICAgICAgICAgLy8gYnVpbGRTZWdtZW50KGFuY2hvcnNbcF1bMV0sIGFuY2hvcnNbcF1bMl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVkZ2UxID0gR0xCdWlsZGVycy5pc09uVGlsZUVkZ2UoYW5jaG9yc1twXVswXSwgYW5jaG9yc1twXVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlZGdlMiA9IEdMQnVpbGRlcnMuaXNPblRpbGVFZGdlKGFuY2hvcnNbcF1bMV0sIGFuY2hvcnNbcF1bMl0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWVkZ2UxICYmICFlZGdlMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRBbmNob3IoYW5jaG9yc1twXVswXSwgYW5jaG9yc1twXVsxXSwgYW5jaG9yc1twXVsyXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIWVkZ2UxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWlsZFNlZ21lbnQoYW5jaG9yc1twXVswXSwgYW5jaG9yc1twXVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIWVkZ2UyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWlsZFNlZ21lbnQoYW5jaG9yc1twXVsxXSwgYW5jaG9yc1twXVsyXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2luZ2xlIDItcG9pbnQgc2VnbWVudFxuICAgICAgICBlbHNlIGlmIChsaW5lLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgICBidWlsZFNlZ21lbnQobGluZVswXSwgbGluZVsxXSk7IC8vIFRPRE86IHJlcGxhY2UgYnVpbGRTZWdtZW50IHdpdGggYSBkZWdlbmVyYXRlIGZvcm0gb2YgYnVpbGRBbmNob3I/IGJ1aWxkU2VnbWVudCBpcyBzdGlsbCB1c2VmdWwgZm9yIGRlYnVnZ2luZ1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEdMLmFkZFZlcnRpY2VzKHZlcnRpY2VzLCB2ZXJ0ZXhfY29uc3RhbnRzLCB2ZXJ0ZXhfZGF0YSk7XG5cbiAgICAvLyBCdWlsZCB0cmlhbmdsZXMgZm9yIGEgc2luZ2xlIGxpbmUgc2VnbWVudCwgZXh0cnVkZWQgYnkgdGhlIHByb3ZpZGVkIHdpZHRoXG4gICAgZnVuY3Rpb24gYnVpbGRTZWdtZW50IChwYSwgcGIpIHtcbiAgICAgICAgdmFyIHNsb3BlID0gVmVjdG9yLm5vcm1hbGl6ZShbKHBiWzFdIC0gcGFbMV0pICogLTEsIHBiWzBdIC0gcGFbMF1dKTtcblxuICAgICAgICB2YXIgcGFfb3V0ZXIgPSBbcGFbMF0gKyBzbG9wZVswXSAqIHdpZHRoLzIsIHBhWzFdICsgc2xvcGVbMV0gKiB3aWR0aC8yXTtcbiAgICAgICAgdmFyIHBhX2lubmVyID0gW3BhWzBdIC0gc2xvcGVbMF0gKiB3aWR0aC8yLCBwYVsxXSAtIHNsb3BlWzFdICogd2lkdGgvMl07XG5cbiAgICAgICAgdmFyIHBiX291dGVyID0gW3BiWzBdICsgc2xvcGVbMF0gKiB3aWR0aC8yLCBwYlsxXSArIHNsb3BlWzFdICogd2lkdGgvMl07XG4gICAgICAgIHZhciBwYl9pbm5lciA9IFtwYlswXSAtIHNsb3BlWzBdICogd2lkdGgvMiwgcGJbMV0gLSBzbG9wZVsxXSAqIHdpZHRoLzJdO1xuXG4gICAgICAgIHZlcnRpY2VzLnB1c2goXG4gICAgICAgICAgICBwYl9pbm5lciwgcGJfb3V0ZXIsIHBhX2lubmVyLFxuICAgICAgICAgICAgcGFfaW5uZXIsIHBiX291dGVyLCBwYV9vdXRlclxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIEJ1aWxkIHRyaWFuZ2xlcyBmb3IgYSAzLXBvaW50ICdhbmNob3InIHNoYXBlLCBjb25zaXN0aW5nIG9mIHR3byBsaW5lIHNlZ21lbnRzIHdpdGggYSBqb2ludFxuICAgIC8vIFRPRE86IG1vdmUgdGhlc2UgZnVuY3Rpb25zIG91dCBvZiBjbG9zdXJlcz9cbiAgICBmdW5jdGlvbiBidWlsZEFuY2hvciAocGEsIGpvaW50LCBwYikge1xuICAgICAgICAvLyBJbm5lciBhbmQgb3V0ZXIgbGluZSBzZWdtZW50cyBmb3IgW3BhLCBqb2ludF0gYW5kIFtqb2ludCwgcGJdXG4gICAgICAgIHZhciBwYV9zbG9wZSA9IFZlY3Rvci5ub3JtYWxpemUoWyhqb2ludFsxXSAtIHBhWzFdKSAqIC0xLCBqb2ludFswXSAtIHBhWzBdXSk7XG4gICAgICAgIHZhciBwYV9vdXRlciA9IFtcbiAgICAgICAgICAgIFtwYVswXSArIHBhX3Nsb3BlWzBdICogd2lkdGgvMiwgcGFbMV0gKyBwYV9zbG9wZVsxXSAqIHdpZHRoLzJdLFxuICAgICAgICAgICAgW2pvaW50WzBdICsgcGFfc2xvcGVbMF0gKiB3aWR0aC8yLCBqb2ludFsxXSArIHBhX3Nsb3BlWzFdICogd2lkdGgvMl1cbiAgICAgICAgXTtcbiAgICAgICAgdmFyIHBhX2lubmVyID0gW1xuICAgICAgICAgICAgW3BhWzBdIC0gcGFfc2xvcGVbMF0gKiB3aWR0aC8yLCBwYVsxXSAtIHBhX3Nsb3BlWzFdICogd2lkdGgvMl0sXG4gICAgICAgICAgICBbam9pbnRbMF0gLSBwYV9zbG9wZVswXSAqIHdpZHRoLzIsIGpvaW50WzFdIC0gcGFfc2xvcGVbMV0gKiB3aWR0aC8yXVxuICAgICAgICBdO1xuXG4gICAgICAgIHZhciBwYl9zbG9wZSA9IFZlY3Rvci5ub3JtYWxpemUoWyhwYlsxXSAtIGpvaW50WzFdKSAqIC0xLCBwYlswXSAtIGpvaW50WzBdXSk7XG4gICAgICAgIHZhciBwYl9vdXRlciA9IFtcbiAgICAgICAgICAgIFtqb2ludFswXSArIHBiX3Nsb3BlWzBdICogd2lkdGgvMiwgam9pbnRbMV0gKyBwYl9zbG9wZVsxXSAqIHdpZHRoLzJdLFxuICAgICAgICAgICAgW3BiWzBdICsgcGJfc2xvcGVbMF0gKiB3aWR0aC8yLCBwYlsxXSArIHBiX3Nsb3BlWzFdICogd2lkdGgvMl1cbiAgICAgICAgXTtcbiAgICAgICAgdmFyIHBiX2lubmVyID0gW1xuICAgICAgICAgICAgW2pvaW50WzBdIC0gcGJfc2xvcGVbMF0gKiB3aWR0aC8yLCBqb2ludFsxXSAtIHBiX3Nsb3BlWzFdICogd2lkdGgvMl0sXG4gICAgICAgICAgICBbcGJbMF0gLSBwYl9zbG9wZVswXSAqIHdpZHRoLzIsIHBiWzFdIC0gcGJfc2xvcGVbMV0gKiB3aWR0aC8yXVxuICAgICAgICBdO1xuXG4gICAgICAgIC8vIE1pdGVyIGpvaW4gLSBzb2x2ZSBmb3IgdGhlIGludGVyc2VjdGlvbiBiZXR3ZWVuIHRoZSB0d28gb3V0ZXIgbGluZSBzZWdtZW50c1xuICAgICAgICB2YXIgaW50ZXJzZWN0aW9uID0gVmVjdG9yLmxpbmVJbnRlcnNlY3Rpb24ocGFfb3V0ZXJbMF0sIHBhX291dGVyWzFdLCBwYl9vdXRlclswXSwgcGJfb3V0ZXJbMV0pO1xuICAgICAgICB2YXIgbGluZV9kZWJ1ZyA9IG51bGw7XG4gICAgICAgIGlmIChpbnRlcnNlY3Rpb24gIT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGludGVyc2VjdF9vdXRlciA9IGludGVyc2VjdGlvbjtcblxuICAgICAgICAgICAgLy8gQ2FwIHRoZSBpbnRlcnNlY3Rpb24gcG9pbnQgdG8gYSByZWFzb25hYmxlIGRpc3RhbmNlIChhcyBqb2luIGFuZ2xlIGJlY29tZXMgc2hhcnBlciwgbWl0ZXIgam9pbnQgZGlzdGFuY2Ugd291bGQgYXBwcm9hY2ggaW5maW5pdHkpXG4gICAgICAgICAgICB2YXIgbGVuX3NxID0gVmVjdG9yLmxlbmd0aFNxKFtpbnRlcnNlY3Rfb3V0ZXJbMF0gLSBqb2ludFswXSwgaW50ZXJzZWN0X291dGVyWzFdIC0gam9pbnRbMV1dKTtcbiAgICAgICAgICAgIHZhciBtaXRlcl9sZW5fbWF4ID0gMzsgLy8gbXVsdGlwbGllciBvbiBsaW5lIHdpZHRoIGZvciBtYXggZGlzdGFuY2UgbWl0ZXIgam9pbiBjYW4gYmUgZnJvbSBqb2ludFxuICAgICAgICAgICAgaWYgKGxlbl9zcSA+ICh3aWR0aCAqIHdpZHRoICogbWl0ZXJfbGVuX21heCAqIG1pdGVyX2xlbl9tYXgpKSB7XG4gICAgICAgICAgICAgICAgbGluZV9kZWJ1ZyA9ICdkaXN0YW5jZSc7XG4gICAgICAgICAgICAgICAgaW50ZXJzZWN0X291dGVyID0gVmVjdG9yLm5vcm1hbGl6ZShbaW50ZXJzZWN0X291dGVyWzBdIC0gam9pbnRbMF0sIGludGVyc2VjdF9vdXRlclsxXSAtIGpvaW50WzFdXSk7XG4gICAgICAgICAgICAgICAgaW50ZXJzZWN0X291dGVyID0gW1xuICAgICAgICAgICAgICAgICAgICBqb2ludFswXSArIGludGVyc2VjdF9vdXRlclswXSAqIG1pdGVyX2xlbl9tYXgsXG4gICAgICAgICAgICAgICAgICAgIGpvaW50WzFdICsgaW50ZXJzZWN0X291dGVyWzFdICogbWl0ZXJfbGVuX21heFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGludGVyc2VjdF9pbm5lciA9IFtcbiAgICAgICAgICAgICAgICAoam9pbnRbMF0gLSBpbnRlcnNlY3Rfb3V0ZXJbMF0pICsgam9pbnRbMF0sXG4gICAgICAgICAgICAgICAgKGpvaW50WzFdIC0gaW50ZXJzZWN0X291dGVyWzFdKSArIGpvaW50WzFdXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKFxuICAgICAgICAgICAgICAgIGludGVyc2VjdF9pbm5lciwgaW50ZXJzZWN0X291dGVyLCBwYV9pbm5lclswXSxcbiAgICAgICAgICAgICAgICBwYV9pbm5lclswXSwgaW50ZXJzZWN0X291dGVyLCBwYV9vdXRlclswXSxcblxuICAgICAgICAgICAgICAgIHBiX2lubmVyWzFdLCBwYl9vdXRlclsxXSwgaW50ZXJzZWN0X2lubmVyLFxuICAgICAgICAgICAgICAgIGludGVyc2VjdF9pbm5lciwgcGJfb3V0ZXJbMV0sIGludGVyc2VjdF9vdXRlclxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIExpbmUgc2VnbWVudHMgYXJlIHBhcmFsbGVsLCB1c2UgdGhlIGZpcnN0IG91dGVyIGxpbmUgc2VnbWVudCBhcyBqb2luIGluc3RlYWRcbiAgICAgICAgICAgIGxpbmVfZGVidWcgPSAncGFyYWxsZWwnO1xuICAgICAgICAgICAgcGFfaW5uZXJbMV0gPSBwYl9pbm5lclswXTtcbiAgICAgICAgICAgIHBhX291dGVyWzFdID0gcGJfb3V0ZXJbMF07XG5cbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goXG4gICAgICAgICAgICAgICAgcGFfaW5uZXJbMV0sIHBhX291dGVyWzFdLCBwYV9pbm5lclswXSxcbiAgICAgICAgICAgICAgICBwYV9pbm5lclswXSwgcGFfb3V0ZXJbMV0sIHBhX291dGVyWzBdLFxuXG4gICAgICAgICAgICAgICAgcGJfaW5uZXJbMV0sIHBiX291dGVyWzFdLCBwYl9pbm5lclswXSxcbiAgICAgICAgICAgICAgICBwYl9pbm5lclswXSwgcGJfb3V0ZXJbMV0sIHBiX291dGVyWzBdXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRXh0cnVkZWQgaW5uZXIvb3V0ZXIgZWRnZXMgLSBkZWJ1Z2dpbmdcbiAgICAgICAgaWYgKEdMQnVpbGRlcnMuZGVidWcgJiYgb3B0aW9ucy52ZXJ0ZXhfbGluZXMpIHtcbiAgICAgICAgICAgIG9wdGlvbnMudmVydGV4X2xpbmVzLnB1c2goXG4gICAgICAgICAgICAgICAgcGFfaW5uZXJbMF1bMF0sIHBhX2lubmVyWzBdWzFdLCB6ICsgMC4wMDEsIDAsIDAsIDEsIDAsIDEuMCwgMCxcbiAgICAgICAgICAgICAgICBwYV9pbm5lclsxXVswXSwgcGFfaW5uZXJbMV1bMV0sIHogKyAwLjAwMSwgMCwgMCwgMSwgMCwgMS4wLCAwLFxuXG4gICAgICAgICAgICAgICAgcGJfaW5uZXJbMF1bMF0sIHBiX2lubmVyWzBdWzFdLCB6ICsgMC4wMDEsIDAsIDAsIDEsIDAsIDEuMCwgMCxcbiAgICAgICAgICAgICAgICBwYl9pbm5lclsxXVswXSwgcGJfaW5uZXJbMV1bMV0sIHogKyAwLjAwMSwgMCwgMCwgMSwgMCwgMS4wLCAwLFxuXG4gICAgICAgICAgICAgICAgcGFfb3V0ZXJbMF1bMF0sIHBhX291dGVyWzBdWzFdLCB6ICsgMC4wMDEsIDAsIDAsIDEsIDAsIDEuMCwgMCxcbiAgICAgICAgICAgICAgICBwYV9vdXRlclsxXVswXSwgcGFfb3V0ZXJbMV1bMV0sIHogKyAwLjAwMSwgMCwgMCwgMSwgMCwgMS4wLCAwLFxuXG4gICAgICAgICAgICAgICAgcGJfb3V0ZXJbMF1bMF0sIHBiX291dGVyWzBdWzFdLCB6ICsgMC4wMDEsIDAsIDAsIDEsIDAsIDEuMCwgMCxcbiAgICAgICAgICAgICAgICBwYl9vdXRlclsxXVswXSwgcGJfb3V0ZXJbMV1bMV0sIHogKyAwLjAwMSwgMCwgMCwgMSwgMCwgMS4wLCAwLFxuXG4gICAgICAgICAgICAgICAgcGFfaW5uZXJbMF1bMF0sIHBhX2lubmVyWzBdWzFdLCB6ICsgMC4wMDEsIDAsIDAsIDEsIDAsIDEuMCwgMCxcbiAgICAgICAgICAgICAgICBwYV9vdXRlclswXVswXSwgcGFfb3V0ZXJbMF1bMV0sIHogKyAwLjAwMSwgMCwgMCwgMSwgMCwgMS4wLCAwLFxuXG4gICAgICAgICAgICAgICAgcGFfaW5uZXJbMV1bMF0sIHBhX2lubmVyWzFdWzFdLCB6ICsgMC4wMDEsIDAsIDAsIDEsIDAsIDEuMCwgMCxcbiAgICAgICAgICAgICAgICBwYV9vdXRlclsxXVswXSwgcGFfb3V0ZXJbMV1bMV0sIHogKyAwLjAwMSwgMCwgMCwgMSwgMCwgMS4wLCAwLFxuXG4gICAgICAgICAgICAgICAgcGJfaW5uZXJbMF1bMF0sIHBiX2lubmVyWzBdWzFdLCB6ICsgMC4wMDEsIDAsIDAsIDEsIDAsIDEuMCwgMCxcbiAgICAgICAgICAgICAgICBwYl9vdXRlclswXVswXSwgcGJfb3V0ZXJbMF1bMV0sIHogKyAwLjAwMSwgMCwgMCwgMSwgMCwgMS4wLCAwLFxuXG4gICAgICAgICAgICAgICAgcGJfaW5uZXJbMV1bMF0sIHBiX2lubmVyWzFdWzFdLCB6ICsgMC4wMDEsIDAsIDAsIDEsIDAsIDEuMCwgMCxcbiAgICAgICAgICAgICAgICBwYl9vdXRlclsxXVswXSwgcGJfb3V0ZXJbMV1bMV0sIHogKyAwLjAwMSwgMCwgMCwgMSwgMCwgMS4wLCAwXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEdMQnVpbGRlcnMuZGVidWcgJiYgbGluZV9kZWJ1ZyAmJiBvcHRpb25zLnZlcnRleF9saW5lcykge1xuICAgICAgICAgICAgdmFyIGRjb2xvcjtcbiAgICAgICAgICAgIGlmIChsaW5lX2RlYnVnID09ICdwYXJhbGxlbCcpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiEhISBsaW5lcyBhcmUgcGFyYWxsZWwgISEhXCIpO1xuICAgICAgICAgICAgICAgIGRjb2xvciA9IFswLCAxLCAwXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGxpbmVfZGVidWcgPT0gJ2Rpc3RhbmNlJykge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiISEhIG1pdGVyIGludGVyc2VjdGlvbiBwb2ludCBleGNlZWRlZCBhbGxvd2VkIGRpc3RhbmNlIGZyb20gam9pbnQgISEhXCIpO1xuICAgICAgICAgICAgICAgIGRjb2xvciA9IFsxLCAwLCAwXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdPU00gaWQ6ICcgKyBmZWF0dXJlLmlkKTsgLy8gVE9ETzogaWYgdGhpcyBmdW5jdGlvbiBpcyBtb3ZlZCBvdXQgb2YgYSBjbG9zdXJlLCB0aGlzIGZlYXR1cmUgZGVidWcgaW5mbyB3b24ndCBiZSBhdmFpbGFibGVcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFtwYSwgam9pbnQsIHBiXSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhmZWF0dXJlKTtcbiAgICAgICAgICAgIG9wdGlvbnMudmVydGV4X2xpbmVzLnB1c2goXG4gICAgICAgICAgICAgICAgcGFbMF0sIHBhWzFdLCB6ICsgMC4wMDIsXG4gICAgICAgICAgICAgICAgMCwgMCwgMSwgZGNvbG9yWzBdLCBkY29sb3JbMV0sIGRjb2xvclsyXSxcbiAgICAgICAgICAgICAgICBqb2ludFswXSwgam9pbnRbMV0sIHogKyAwLjAwMixcbiAgICAgICAgICAgICAgICAwLCAwLCAxLCBkY29sb3JbMF0sIGRjb2xvclsxXSwgZGNvbG9yWzJdLFxuICAgICAgICAgICAgICAgIGpvaW50WzBdLCBqb2ludFsxXSwgeiArIDAuMDAyLFxuICAgICAgICAgICAgICAgIDAsIDAsIDEsIGRjb2xvclswXSwgZGNvbG9yWzFdLCBkY29sb3JbMl0sXG4gICAgICAgICAgICAgICAgcGJbMF0sIHBiWzFdLCB6ICsgMC4wMDIsXG4gICAgICAgICAgICAgICAgMCwgMCwgMSwgZGNvbG9yWzBdLCBkY29sb3JbMV0sIGRjb2xvclsyXVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdmFyIG51bV9saW5lcyA9IGxpbmVzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAodmFyIGxuPTA7IGxuIDwgbnVtX2xpbmVzOyBsbisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxpbmUyID0gbGluZXNbbG5dO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcD0wOyBwIDwgbGluZTIubGVuZ3RoIC0gMTsgcCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBvaW50IEEgdG8gQlxuICAgICAgICAgICAgICAgICAgICB2YXIgcGEgPSBsaW5lMltwXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBiID0gbGluZTJbcCsxXTtcblxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnZlcnRleF9saW5lcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFbMF0sIHBhWzFdLCB6ICsgMC4wMDA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgMCwgMCwgMSwgMCwgMCwgMS4wLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGJbMF0sIHBiWzFdLCB6ICsgMC4wMDA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgMCwgMCwgMSwgMCwgMCwgMS4wXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2ZXJ0ZXhfZGF0YTtcbn07XG5cbi8vIEJ1aWxkIGEgcXVhZCBjZW50ZXJlZCBvbiBhIHBvaW50XG4vLyBaIGNvb3JkLCBub3JtYWxzLCBhbmQgdGV4Y29vcmRzIGFyZSBvcHRpb25hbFxuLy8gTGF5b3V0IG9yZGVyIGlzOlxuLy8gICBwb3NpdGlvbiAoMiBvciAzIGNvbXBvbmVudHMpXG4vLyAgIHRleGNvb3JkIChvcHRpb25hbCwgMiBjb21wb25lbnRzKVxuLy8gICBub3JtYWwgKG9wdGlvbmFsLCAzIGNvbXBvbmVudHMpXG4vLyAgIGNvbnN0YW50cyAob3B0aW9uYWwpXG5HTEJ1aWxkZXJzLmJ1aWxkUXVhZHNGb3JQb2ludHMgPSBmdW5jdGlvbiAocG9pbnRzLCB3aWR0aCwgaGVpZ2h0LCB6LCB2ZXJ0ZXhfZGF0YSwgb3B0aW9ucylcbntcbiAgICB2YXIgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB2YXIgdmVydGV4X2NvbnN0YW50cyA9IFtdO1xuICAgIGlmIChvcHRpb25zLm5vcm1hbHMpIHtcbiAgICAgICAgdmVydGV4X2NvbnN0YW50cy5wdXNoKDAsIDAsIDEpOyAvLyB1cHdhcmRzLWZhY2luZyBub3JtYWxcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMudmVydGV4X2NvbnN0YW50cykge1xuICAgICAgICB2ZXJ0ZXhfY29uc3RhbnRzLnB1c2guYXBwbHkodmVydGV4X2NvbnN0YW50cywgb3B0aW9ucy52ZXJ0ZXhfY29uc3RhbnRzKTtcbiAgICB9XG4gICAgaWYgKHZlcnRleF9jb25zdGFudHMubGVuZ3RoID09IDApIHtcbiAgICAgICAgdmVydGV4X2NvbnN0YW50cyA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIG51bV9wb2ludHMgPSBwb2ludHMubGVuZ3RoO1xuICAgIGZvciAodmFyIHA9MDsgcCA8IG51bV9wb2ludHM7IHArKykge1xuICAgICAgICB2YXIgcG9pbnQgPSBwb2ludHNbcF07XG5cbiAgICAgICAgdmFyIHBvc2l0aW9ucyA9IFtcbiAgICAgICAgICAgIFtwb2ludFswXSAtIHdpZHRoLzIsIHBvaW50WzFdIC0gaGVpZ2h0LzJdLFxuICAgICAgICAgICAgW3BvaW50WzBdICsgd2lkdGgvMiwgcG9pbnRbMV0gLSBoZWlnaHQvMl0sXG4gICAgICAgICAgICBbcG9pbnRbMF0gKyB3aWR0aC8yLCBwb2ludFsxXSArIGhlaWdodC8yXSxcblxuICAgICAgICAgICAgW3BvaW50WzBdIC0gd2lkdGgvMiwgcG9pbnRbMV0gLSBoZWlnaHQvMl0sXG4gICAgICAgICAgICBbcG9pbnRbMF0gKyB3aWR0aC8yLCBwb2ludFsxXSArIGhlaWdodC8yXSxcbiAgICAgICAgICAgIFtwb2ludFswXSAtIHdpZHRoLzIsIHBvaW50WzFdICsgaGVpZ2h0LzJdLFxuICAgICAgICBdO1xuXG4gICAgICAgIC8vIEFkZCBwcm92aWRlZCB6XG4gICAgICAgIGlmICh6ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uc1swXVsyXSA9IHo7XG4gICAgICAgICAgICBwb3NpdGlvbnNbMV1bMl0gPSB6O1xuICAgICAgICAgICAgcG9zaXRpb25zWzJdWzJdID0gejtcbiAgICAgICAgICAgIHBvc2l0aW9uc1szXVsyXSA9IHo7XG4gICAgICAgICAgICBwb3NpdGlvbnNbNF1bMl0gPSB6O1xuICAgICAgICAgICAgcG9zaXRpb25zWzVdWzJdID0gejtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLnRleGNvb3JkcyA9PSB0cnVlKSB7XG4gICAgICAgICAgICB2YXIgdGV4Y29vcmRzID0gW1xuICAgICAgICAgICAgICAgIFstMSwgLTFdLFxuICAgICAgICAgICAgICAgIFsxLCAtMV0sXG4gICAgICAgICAgICAgICAgWzEsIDFdLFxuXG4gICAgICAgICAgICAgICAgWy0xLCAtMV0sXG4gICAgICAgICAgICAgICAgWzEsIDFdLFxuICAgICAgICAgICAgICAgIFstMSwgMV1cbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIEdMLmFkZFZlcnRpY2VzTXVsdGlwbGVBdHRyaWJ1dGVzKFtwb3NpdGlvbnMsIHRleGNvb3Jkc10sIHZlcnRleF9jb25zdGFudHMsIHZlcnRleF9kYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIEdMLmFkZFZlcnRpY2VzKHBvc2l0aW9ucywgdmVydGV4X2NvbnN0YW50cywgdmVydGV4X2RhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZlcnRleF9kYXRhO1xufTtcblxuLy8gQ2FsbGJhY2stYmFzZSBidWlsZGVyIChmb3IgZnV0dXJlIGV4cGxvcmF0aW9uKVxuLy8gR0xCdWlsZGVycy5idWlsZFF1YWRzRm9yUG9pbnRzMiA9IGZ1bmN0aW9uIEdMQnVpbGRlcnNCdWlsZFF1YWRzRm9yUG9pbnRzIChwb2ludHMsIHdpZHRoLCBoZWlnaHQsIGFkZEdlb21ldHJ5LCBvcHRpb25zKVxuLy8ge1xuLy8gICAgIHZhciBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuLy8gICAgIHZhciBudW1fcG9pbnRzID0gcG9pbnRzLmxlbmd0aDtcbi8vICAgICBmb3IgKHZhciBwPTA7IHAgPCBudW1fcG9pbnRzOyBwKyspIHtcbi8vICAgICAgICAgdmFyIHBvaW50ID0gcG9pbnRzW3BdO1xuXG4vLyAgICAgICAgIHZhciBwb3NpdGlvbnMgPSBbXG4vLyAgICAgICAgICAgICBbcG9pbnRbMF0gLSB3aWR0aC8yLCBwb2ludFsxXSAtIGhlaWdodC8yXSxcbi8vICAgICAgICAgICAgIFtwb2ludFswXSArIHdpZHRoLzIsIHBvaW50WzFdIC0gaGVpZ2h0LzJdLFxuLy8gICAgICAgICAgICAgW3BvaW50WzBdICsgd2lkdGgvMiwgcG9pbnRbMV0gKyBoZWlnaHQvMl0sXG5cbi8vICAgICAgICAgICAgIFtwb2ludFswXSAtIHdpZHRoLzIsIHBvaW50WzFdIC0gaGVpZ2h0LzJdLFxuLy8gICAgICAgICAgICAgW3BvaW50WzBdICsgd2lkdGgvMiwgcG9pbnRbMV0gKyBoZWlnaHQvMl0sXG4vLyAgICAgICAgICAgICBbcG9pbnRbMF0gLSB3aWR0aC8yLCBwb2ludFsxXSArIGhlaWdodC8yXSxcbi8vICAgICAgICAgXTtcblxuLy8gICAgICAgICBpZiAob3B0aW9ucy50ZXhjb29yZHMgPT0gdHJ1ZSkge1xuLy8gICAgICAgICAgICAgdmFyIHRleGNvb3JkcyA9IFtcbi8vICAgICAgICAgICAgICAgICBbLTEsIC0xXSxcbi8vICAgICAgICAgICAgICAgICBbMSwgLTFdLFxuLy8gICAgICAgICAgICAgICAgIFsxLCAxXSxcblxuLy8gICAgICAgICAgICAgICAgIFstMSwgLTFdLFxuLy8gICAgICAgICAgICAgICAgIFsxLCAxXSxcbi8vICAgICAgICAgICAgICAgICBbLTEsIDFdXG4vLyAgICAgICAgICAgICBdO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgdmFyIHZlcnRpY2VzID0ge1xuLy8gICAgICAgICAgICAgcG9zaXRpb25zOiBwb3NpdGlvbnMsXG4vLyAgICAgICAgICAgICBub3JtYWxzOiAob3B0aW9ucy5ub3JtYWxzID8gWzAsIDAsIDFdIDogbnVsbCksXG4vLyAgICAgICAgICAgICB0ZXhjb29yZHM6IChvcHRpb25zLnRleGNvb3JkcyAmJiB0ZXhjb29yZHMpXG4vLyAgICAgICAgIH07XG4vLyAgICAgICAgIGFkZEdlb21ldHJ5KHZlcnRpY2VzKTtcbi8vICAgICB9XG4vLyB9O1xuXG4vLyBCdWlsZCBuYXRpdmUgR0wgbGluZXMgZm9yIGEgcG9seWxpbmVcbkdMQnVpbGRlcnMuYnVpbGRMaW5lcyA9IGZ1bmN0aW9uIEdMQnVpbGRlcnNCdWlsZExpbmVzIChsaW5lcywgZmVhdHVyZSwgbGF5ZXIsIHN0eWxlLCB0aWxlLCB6LCB2ZXJ0ZXhfZGF0YSwgb3B0aW9ucylcbntcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHZhciBjb2xvciA9IHN0eWxlLmNvbG9yO1xuICAgIHZhciB3aWR0aCA9IHN0eWxlLndpZHRoO1xuXG4gICAgdmFyIG51bV9saW5lcyA9IGxpbmVzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBsbj0wOyBsbiA8IG51bV9saW5lczsgbG4rKykge1xuICAgICAgICB2YXIgbGluZSA9IGxpbmVzW2xuXTtcblxuICAgICAgICBmb3IgKHZhciBwPTA7IHAgPCBsaW5lLmxlbmd0aCAtIDE7IHArKykge1xuICAgICAgICAgICAgLy8gUG9pbnQgQSB0byBCXG4gICAgICAgICAgICB2YXIgcGEgPSBsaW5lW3BdO1xuICAgICAgICAgICAgdmFyIHBiID0gbGluZVtwKzFdO1xuXG4gICAgICAgICAgICB2ZXJ0ZXhfZGF0YS5wdXNoKFxuICAgICAgICAgICAgICAgIC8vIFBvaW50IEFcbiAgICAgICAgICAgICAgICBwYVswXSwgcGFbMV0sIHosXG4gICAgICAgICAgICAgICAgMCwgMCwgMSwgLy8gZmxhdCBzdXJmYWNlcyBwb2ludCBzdHJhaWdodCB1cFxuICAgICAgICAgICAgICAgIGNvbG9yWzBdLCBjb2xvclsxXSwgY29sb3JbMl0sXG4gICAgICAgICAgICAgICAgLy8gUG9pbnQgQlxuICAgICAgICAgICAgICAgIHBiWzBdLCBwYlsxXSwgeixcbiAgICAgICAgICAgICAgICAwLCAwLCAxLCAvLyBmbGF0IHN1cmZhY2VzIHBvaW50IHN0cmFpZ2h0IHVwXG4gICAgICAgICAgICAgICAgY29sb3JbMF0sIGNvbG9yWzFdLCBjb2xvclsyXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gdmVydGV4X2RhdGE7XG59O1xuXG4vKiBVdGlsaXR5IGZ1bmN0aW9ucyAqL1xuXG4vLyBUZXN0cyBpZiBhIGxpbmUgc2VnbWVudCAoZnJvbSBwb2ludCBBIHRvIEIpIGlzIG5lYXJseSBjb2luY2lkZW50IHdpdGggdGhlIGVkZ2Ugb2YgYSB0aWxlXG5HTEJ1aWxkZXJzLmlzT25UaWxlRWRnZSA9IGZ1bmN0aW9uIChwYSwgcGIsIG9wdGlvbnMpXG57XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB2YXIgdG9sZXJhbmNlX2Z1bmN0aW9uID0gb3B0aW9ucy50b2xlcmFuY2VfZnVuY3Rpb24gfHwgR0xCdWlsZGVycy52YWx1ZXNXaXRoaW5Ub2xlcmFuY2U7XG4gICAgdmFyIHRvbGVyYW5jZSA9IG9wdGlvbnMudG9sZXJhbmNlIHx8IDE7IC8vIHR3ZWFrIHRoaXMgYWRqdXN0IGlmIGNhdGNoaW5nIHRvbyBmZXcvbWFueSBsaW5lIHNlZ21lbnRzIG5lYXIgdGlsZSBlZGdlc1xuICAgIHZhciB0aWxlX21pbiA9IEdMQnVpbGRlcnMudGlsZV9ib3VuZHNbMF07XG4gICAgdmFyIHRpbGVfbWF4ID0gR0xCdWlsZGVycy50aWxlX2JvdW5kc1sxXTtcbiAgICB2YXIgZWRnZSA9IG51bGw7XG5cbiAgICBpZiAodG9sZXJhbmNlX2Z1bmN0aW9uKHBhWzBdLCB0aWxlX21pbi54LCB0b2xlcmFuY2UpICYmIHRvbGVyYW5jZV9mdW5jdGlvbihwYlswXSwgdGlsZV9taW4ueCwgdG9sZXJhbmNlKSkge1xuICAgICAgICBlZGdlID0gJ2xlZnQnO1xuICAgIH1cbiAgICBlbHNlIGlmICh0b2xlcmFuY2VfZnVuY3Rpb24ocGFbMF0sIHRpbGVfbWF4LngsIHRvbGVyYW5jZSkgJiYgdG9sZXJhbmNlX2Z1bmN0aW9uKHBiWzBdLCB0aWxlX21heC54LCB0b2xlcmFuY2UpKSB7XG4gICAgICAgIGVkZ2UgPSAncmlnaHQnO1xuICAgIH1cbiAgICBlbHNlIGlmICh0b2xlcmFuY2VfZnVuY3Rpb24ocGFbMV0sIHRpbGVfbWluLnksIHRvbGVyYW5jZSkgJiYgdG9sZXJhbmNlX2Z1bmN0aW9uKHBiWzFdLCB0aWxlX21pbi55LCB0b2xlcmFuY2UpKSB7XG4gICAgICAgIGVkZ2UgPSAndG9wJztcbiAgICB9XG4gICAgZWxzZSBpZiAodG9sZXJhbmNlX2Z1bmN0aW9uKHBhWzFdLCB0aWxlX21heC55LCB0b2xlcmFuY2UpICYmIHRvbGVyYW5jZV9mdW5jdGlvbihwYlsxXSwgdGlsZV9tYXgueSwgdG9sZXJhbmNlKSkge1xuICAgICAgICBlZGdlID0gJ2JvdHRvbSc7XG4gICAgfVxuICAgIHJldHVybiBlZGdlO1xufTtcblxuR0xCdWlsZGVycy5zZXRUaWxlU2NhbGUgPSBmdW5jdGlvbiAoc2NhbGUpXG57XG4gICAgR0xCdWlsZGVycy50aWxlX2JvdW5kcyA9IFtcbiAgICAgICAgUG9pbnQoMCwgMCksXG4gICAgICAgIFBvaW50KHNjYWxlLCAtc2NhbGUpIC8vIFRPRE86IGNvcnJlY3QgZm9yIGZsaXBwZWQgeS1heGlzP1xuICAgIF07XG59O1xuXG5HTEJ1aWxkZXJzLnZhbHVlc1dpdGhpblRvbGVyYW5jZSA9IGZ1bmN0aW9uIChhLCBiLCB0b2xlcmFuY2UpXG57XG4gICAgdG9sZXJhbmNlID0gdG9sZXJhbmNlIHx8IDE7XG4gICAgcmV0dXJuIChNYXRoLmFicyhhIC0gYikgPCB0b2xlcmFuY2UpO1xufTtcblxuLy8gQnVpbGQgYSB6aWd6YWcgbGluZSBwYXR0ZXJuIGZvciB0ZXN0aW5nIGpvaW5zIGFuZCBjYXBzXG5HTEJ1aWxkZXJzLmJ1aWxkWmlnemFnTGluZVRlc3RQYXR0ZXJuID0gZnVuY3Rpb24gKClcbntcbiAgICB2YXIgbWluID0gUG9pbnQoMCwgMCk7IC8vIHRpbGUubWluO1xuICAgIHZhciBtYXggPSBQb2ludCg0MDk2LCA0MDk2KTsgLy8gdGlsZS5tYXg7XG4gICAgdmFyIGcgPSB7XG4gICAgICAgIGlkOiAxMjMsXG4gICAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgICAgICB0eXBlOiAnTGluZVN0cmluZycsXG4gICAgICAgICAgICBjb29yZGluYXRlczogW1xuICAgICAgICAgICAgICAgIFttaW4ueCAqIDAuNzUgKyBtYXgueCAqIDAuMjUsIG1pbi55ICogMC43NSArIG1heC55ICogMC4yNV0sXG4gICAgICAgICAgICAgICAgW21pbi54ICogMC43NSArIG1heC54ICogMC4yNSwgbWluLnkgKiAwLjUgKyBtYXgueSAqIDAuNV0sXG4gICAgICAgICAgICAgICAgW21pbi54ICogMC4yNSArIG1heC54ICogMC43NSwgbWluLnkgKiAwLjc1ICsgbWF4LnkgKiAwLjI1XSxcbiAgICAgICAgICAgICAgICBbbWluLnggKiAwLjI1ICsgbWF4LnggKiAwLjc1LCBtaW4ueSAqIDAuMjUgKyBtYXgueSAqIDAuNzVdLFxuICAgICAgICAgICAgICAgIFttaW4ueCAqIDAuNCArIG1heC54ICogMC42LCBtaW4ueSAqIDAuNSArIG1heC55ICogMC41XSxcbiAgICAgICAgICAgICAgICBbbWluLnggKiAwLjUgKyBtYXgueCAqIDAuNSwgbWluLnkgKiAwLjI1ICsgbWF4LnkgKiAwLjc1XSxcbiAgICAgICAgICAgICAgICBbbWluLnggKiAwLjc1ICsgbWF4LnggKiAwLjI1LCBtaW4ueSAqIDAuMjUgKyBtYXgueSAqIDAuNzVdLFxuICAgICAgICAgICAgICAgIFttaW4ueCAqIDAuNzUgKyBtYXgueCAqIDAuMjUsIG1pbi55ICogMC40ICsgbWF4LnkgKiAwLjZdXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIGtpbmQ6ICdkZWJ1ZydcbiAgICAgICAgfVxuICAgIH07XG4gICAgLy8gY29uc29sZS5sb2coZy5nZW9tZXRyeS5jb29yZGluYXRlcyk7XG4gICAgcmV0dXJuIGc7XG59O1xuXG5pZiAobW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEdMQnVpbGRlcnM7XG59XG4iLCIvKioqIE1hbmFnZSByZW5kZXJpbmcgZm9yIHByaW1pdGl2ZXMgKioqL1xudmFyIEdMID0gcmVxdWlyZSgnLi9nbC5qcycpO1xudmFyIEdMVmVydGV4TGF5b3V0ID0gcmVxdWlyZSgnLi9nbF92ZXJ0ZXhfbGF5b3V0LmpzJyk7XG4vLyB2YXIgR0xWZXJ0ZXhBcnJheU9iamVjdCA9IHJlcXVpcmUoJy4vZ2xfdmFvLmpzJyk7XG52YXIgR0xQcm9ncmFtID0gcmVxdWlyZSgnLi9nbF9wcm9ncmFtLmpzJyk7XG5cbi8vIEEgc2luZ2xlIG1lc2gvVkJPLCBkZXNjcmliZWQgYnkgYSB2ZXJ0ZXggbGF5b3V0LCB0aGF0IGNhbiBiZSBkcmF3biB3aXRoIG9uZSBvciBtb3JlIHByb2dyYW1zXG5mdW5jdGlvbiBHTEdlb21ldHJ5IChnbCwgdmVydGV4X2RhdGEsIHZlcnRleF9sYXlvdXQsIG9wdGlvbnMpXG57XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB0aGlzLmdsID0gZ2w7XG4gICAgdGhpcy52ZXJ0ZXhfZGF0YSA9IHZlcnRleF9kYXRhOyAvLyBGbG9hdDMyQXJyYXlcbiAgICB0aGlzLnZlcnRleF9sYXlvdXQgPSB2ZXJ0ZXhfbGF5b3V0O1xuICAgIHRoaXMuYnVmZmVyID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKTtcbiAgICB0aGlzLmRyYXdfbW9kZSA9IG9wdGlvbnMuZHJhd19tb2RlIHx8IHRoaXMuZ2wuVFJJQU5HTEVTO1xuICAgIHRoaXMuZGF0YV91c2FnZSA9IG9wdGlvbnMuZGF0YV91c2FnZSB8fCB0aGlzLmdsLlNUQVRJQ19EUkFXO1xuICAgIHRoaXMudmVydGljZXNfcGVyX2dlb21ldHJ5ID0gMzsgLy8gVE9ETzogc3VwcG9ydCBsaW5lcywgc3RyaXAsIGZhbiwgZXRjLlxuXG4gICAgdGhpcy52ZXJ0ZXhfY291bnQgPSB0aGlzLnZlcnRleF9kYXRhLmJ5dGVMZW5ndGggLyB0aGlzLnZlcnRleF9sYXlvdXQuc3RyaWRlO1xuICAgIHRoaXMuZ2VvbWV0cnlfY291bnQgPSB0aGlzLnZlcnRleF9jb3VudCAvIHRoaXMudmVydGljZXNfcGVyX2dlb21ldHJ5O1xuXG4gICAgLy8gVE9ETzogZGlzYWJsaW5nIFZBT3MgZm9yIG5vdyBiZWNhdXNlIHdlIG5lZWQgdG8gc3VwcG9ydCBkaWZmZXJlbnQgdmVydGV4IGxheW91dCArIHByb2dyYW0gY29tYmluYXRpb25zLFxuICAgIC8vIHdoZXJlIG5vdCBhbGwgcHJvZ3JhbXMgd2lsbCByZWNvZ25pemUgYWxsIGF0dHJpYnV0ZXMgKGUuZy4gZmVhdHVyZSBzZWxlY3Rpb24gc2hhZGVycyBpbmNsdWRlIGV4dHJhIGF0dHJpYikuXG4gICAgLy8gVG8gc3VwcG9ydCBWQU9zIGhlcmUsIHdvdWxkIG5lZWQgdG8gc3VwcG9ydCBtdWx0aXBsZSBwZXIgZ2VvbWV0cnksIGtleWVkIGJ5IEdMIHByb2dyYW0/XG4gICAgLy8gdGhpcy52YW8gPSBHTFZlcnRleEFycmF5T2JqZWN0LmNyZWF0ZShmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLmJ1ZmZlcik7XG4gICAgLy8gICAgIHRoaXMuc2V0dXAoKTtcbiAgICAvLyB9LmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLmJ1ZmZlcik7XG4gICAgdGhpcy5nbC5idWZmZXJEYXRhKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnZlcnRleF9kYXRhLCB0aGlzLmRhdGFfdXNhZ2UpO1xufVxuXG4vLyBSZW5kZXIsIGJ5IGRlZmF1bHQgd2l0aCBjdXJyZW50bHkgYm91bmQgcHJvZ3JhbSwgb3Igb3RoZXJ3aXNlIHdpdGggb3B0aW9uYWxseSBwcm92aWRlZCBvbmVcbkdMR2VvbWV0cnkucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChvcHRpb25zKVxue1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgLy8gR0xWZXJ0ZXhBcnJheU9iamVjdC5iaW5kKHRoaXMudmFvKTtcblxuICAgIGlmICh0eXBlb2YgdGhpcy5fcmVuZGVyX3NldHVwID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyX3NldHVwKCk7XG4gICAgfVxuXG4gICAgdmFyIGdsX3Byb2dyYW0gPSBvcHRpb25zLmdsX3Byb2dyYW0gfHwgR0xQcm9ncmFtLmN1cnJlbnQ7XG4gICAgZ2xfcHJvZ3JhbS51c2UoKTtcblxuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy5idWZmZXIpO1xuICAgIHRoaXMudmVydGV4X2xheW91dC5lbmFibGUodGhpcy5nbCwgZ2xfcHJvZ3JhbSk7XG5cbiAgICAvLyBUT0RPOiBzdXBwb3J0IGVsZW1lbnQgYXJyYXkgbW9kZVxuICAgIHRoaXMuZ2wuZHJhd0FycmF5cyh0aGlzLmRyYXdfbW9kZSwgMCwgdGhpcy52ZXJ0ZXhfY291bnQpO1xuICAgIC8vIEdMVmVydGV4QXJyYXlPYmplY3QuYmluZChudWxsKTtcbn07XG5cbkdMR2VvbWV0cnkucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKVxue1xuICAgIGNvbnNvbGUubG9nKFwiR0xHZW9tZXRyeS5kZXN0cm95OiBkZWxldGUgYnVmZmVyIG9mIHNpemUgXCIgKyB0aGlzLnZlcnRleF9kYXRhLmJ5dGVMZW5ndGgpO1xuICAgIHRoaXMuZ2wuZGVsZXRlQnVmZmVyKHRoaXMuYnVmZmVyKTtcbiAgICBkZWxldGUgdGhpcy52ZXJ0ZXhfZGF0YTtcbn07XG5cbmlmIChtb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gR0xHZW9tZXRyeTtcbn1cbiIsIi8vIFJlbmRlcmluZyBtb2Rlc1xuXG52YXIgR0wgPSByZXF1aXJlKCcuL2dsLmpzJyk7XG52YXIgR0xCdWlsZGVycyA9IHJlcXVpcmUoJy4vZ2xfYnVpbGRlcnMuanMnKTtcbnZhciBHTEdlb21ldHJ5ID0gcmVxdWlyZSgnLi9nbF9nZW9tLmpzJyk7XG52YXIgR0xWZXJ0ZXhMYXlvdXQgPSByZXF1aXJlKCcuL2dsX3ZlcnRleF9sYXlvdXQuanMnKTtcbnZhciBHTFByb2dyYW0gPSByZXF1aXJlKCcuL2dsX3Byb2dyYW0uanMnKTtcbnZhciBzaGFkZXJfc291cmNlcyA9IHJlcXVpcmUoJy4vZ2xfc2hhZGVycy5qcycpOyAvLyBidWlsdC1pbiBzaGFkZXJzXG5cbnZhciBRdWV1ZSA9IHJlcXVpcmUoJ3F1ZXVlLWFzeW5jJyk7XG5cbi8vIEJhc2VcblxudmFyIFJlbmRlck1vZGUgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24gKGdsKSB7XG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcbiAgICAgICAgdGhpcy5tYWtlR0xQcm9ncmFtKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9pbml0ID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVmcmVzaDogZnVuY3Rpb24gKCkgeyAvLyBUT0RPOiBzaG91bGQgdGhpcyBiZSBhc3luYy9ub24tYmxvY2tpbmc/XG4gICAgICAgIHRoaXMubWFrZUdMUHJvZ3JhbSgpO1xuICAgIH0sXG4gICAgZGVmaW5lczoge30sXG4gICAgc2VsZWN0aW9uOiBmYWxzZSxcbiAgICBidWlsZFBvbHlnb25zOiBmdW5jdGlvbigpe30sIC8vIGJ1aWxkIGZ1bmN0aW9ucyBhcmUgbm8tb3BzIHVudGlsIG92ZXJyaWRlblxuICAgIGJ1aWxkTGluZXM6IGZ1bmN0aW9uKCl7fSxcbiAgICBidWlsZFBvaW50czogZnVuY3Rpb24oKXt9LFxuICAgIG1ha2VHTEdlb21ldHJ5OiBmdW5jdGlvbiAodmVydGV4X2RhdGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBHTEdlb21ldHJ5KHRoaXMuZ2wsIHZlcnRleF9kYXRhLCB0aGlzLnZlcnRleF9sYXlvdXQpO1xuICAgIH1cbn07XG5cblJlbmRlck1vZGUubWFrZUdMUHJvZ3JhbSA9IGZ1bmN0aW9uICgpXG57XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5uYW1lICsgXCI6IFwiICsgXCJzdGFydCBidWlsZGluZ1wiKTtcbiAgICB2YXIgcXVldWUgPSBRdWV1ZSgpO1xuXG4gICAgLy8gQnVpbGQgZGVmaW5lcyAmIGZvciBzZWxlY3Rpb24gKG5lZWQgdG8gY3JlYXRlIGEgbmV3IG9iamVjdCBzaW5jZSB0aGUgZmlyc3QgaXMgc3RvcmVkIGFzIGEgcmVmZXJlbmNlIGJ5IHRoZSBwcm9ncmFtKVxuICAgIHZhciBkZWZpbmVzID0gdGhpcy5idWlsZERlZmluZUxpc3QoKTtcbiAgICBpZiAodGhpcy5zZWxlY3Rpb24pIHtcbiAgICAgICAgdmFyIHNlbGVjdGlvbl9kZWZpbmVzID0gT2JqZWN0LmNyZWF0ZShkZWZpbmVzKTtcbiAgICAgICAgc2VsZWN0aW9uX2RlZmluZXNbJ0ZFQVRVUkVfU0VMRUNUSU9OJ10gPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEdldCBhbnkgY3VzdG9tIGNvZGUgdHJhbnNmb3Jtc1xuICAgIHZhciB0cmFuc2Zvcm1zID0gKHRoaXMuc2hhZGVycyAmJiB0aGlzLnNoYWRlcnMudHJhbnNmb3Jtcyk7XG5cbiAgICAvLyBDcmVhdGUgc2hhZGVycyAtIHByb2dyYW1zIG1heSBwb2ludCB0byBpbmhlcml0ZWQgcGFyZW50IHByb3BlcnRpZXMsIGJ1dCBzaG91bGQgYmUgcmVwbGFjZWQgYnkgc3ViY2xhc3MgdmVyc2lvblxuICAgIHZhciBwcm9ncmFtID0gKHRoaXMuaGFzT3duUHJvcGVydHkoJ2dsX3Byb2dyYW0nKSAmJiB0aGlzLmdsX3Byb2dyYW0pO1xuICAgIHZhciBzZWxlY3Rpb25fcHJvZ3JhbSA9ICh0aGlzLmhhc093blByb3BlcnR5KCdzZWxlY3Rpb25fZ2xfcHJvZ3JhbScpICYmIHRoaXMuc2VsZWN0aW9uX2dsX3Byb2dyYW0pO1xuXG4gICAgcXVldWUuZGVmZXIoY29tcGxldGUgPT4ge1xuICAgICAgICBpZiAoIXByb2dyYW0pIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubmFtZSArIFwiOiBcIiArIFwiaW5zdGFudGlhdGVcIik7XG4gICAgICAgICAgICBwcm9ncmFtID0gbmV3IEdMUHJvZ3JhbShcbiAgICAgICAgICAgICAgICB0aGlzLmdsLFxuICAgICAgICAgICAgICAgIHNoYWRlcl9zb3VyY2VzW3RoaXMudmVydGV4X3NoYWRlcl9rZXldLFxuICAgICAgICAgICAgICAgIHNoYWRlcl9zb3VyY2VzW3RoaXMuZnJhZ21lbnRfc2hhZGVyX2tleV0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkZWZpbmVzOiBkZWZpbmVzLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1zOiB0cmFuc2Zvcm1zLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBjb21wbGV0ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyBcIjogXCIgKyBcInJlLWNvbXBpbGVcIik7XG4gICAgICAgICAgICBwcm9ncmFtLmRlZmluZXMgPSBkZWZpbmVzO1xuICAgICAgICAgICAgcHJvZ3JhbS50cmFuc2Zvcm1zID0gdHJhbnNmb3JtcztcbiAgICAgICAgICAgIHByb2dyYW0uY29tcGlsZShjb21wbGV0ZSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnNlbGVjdGlvbikge1xuICAgICAgICBxdWV1ZS5kZWZlcihjb21wbGV0ZSA9PiB7XG4gICAgICAgICAgICBpZiAoIXNlbGVjdGlvbl9wcm9ncmFtKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5uYW1lICsgXCI6IFwiICsgXCJzZWxlY3Rpb24gaW5zdGFudGlhdGVcIik7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uX3Byb2dyYW0gPSBuZXcgR0xQcm9ncmFtKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdsLFxuICAgICAgICAgICAgICAgICAgICBzaGFkZXJfc291cmNlc1t0aGlzLnZlcnRleF9zaGFkZXJfa2V5XSxcbiAgICAgICAgICAgICAgICAgICAgc2hhZGVyX3NvdXJjZXNbJ3NlbGVjdGlvbl9mcmFnbWVudCddLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZpbmVzOiBzZWxlY3Rpb25fZGVmaW5lcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybXM6IHRyYW5zZm9ybXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAodGhpcy5uYW1lICsgJyAoc2VsZWN0aW9uKScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNvbXBsZXRlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5uYW1lICsgXCI6IFwiICsgXCJzZWxlY3Rpb24gcmUtY29tcGlsZVwiKTtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25fcHJvZ3JhbS5kZWZpbmVzID0gc2VsZWN0aW9uX2RlZmluZXM7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uX3Byb2dyYW0udHJhbnNmb3JtcyA9IHRyYW5zZm9ybXM7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uX3Byb2dyYW0uY29tcGlsZShjb21wbGV0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFdhaXQgZm9yIHByb2dyYW0ocykgdG8gY29tcGlsZSBiZWZvcmUgcmVwbGFjaW5nIHRoZW1cbiAgICAvLyBUT0RPOiBzaG91bGQgdGhpcyBlbnRpcmUgbWV0aG9kIG9mZmVyIGEgY2FsbGJhY2sgZm9yIHdoZW4gY29tcGlsYXRpb24gY29tcGxldGVzP1xuICAgIHF1ZXVlLmF3YWl0KCgpID0+IHtcbiAgICAgICBpZiAocHJvZ3JhbSkge1xuICAgICAgICAgICB0aGlzLmdsX3Byb2dyYW0gPSBwcm9ncmFtO1xuICAgICAgIH1cblxuICAgICAgIGlmIChzZWxlY3Rpb25fcHJvZ3JhbSkge1xuICAgICAgICAgICB0aGlzLnNlbGVjdGlvbl9nbF9wcm9ncmFtID0gc2VsZWN0aW9uX3Byb2dyYW07XG4gICAgICAgfVxuXG4gICAgICAgLy8gY29uc29sZS5sb2codGhpcy5uYW1lICsgXCI6IFwiICsgXCJmaW5pc2hlZCBidWlsZGluZ1wiKTtcbiAgICB9KTtcbn1cblxuLy8gVE9ETzogY291bGQgcHJvYmFibHkgY29tYmluZSBhbmQgZ2VuZXJhbGl6ZSB0aGlzIHdpdGggc2ltaWxhciBtZXRob2QgaW4gR0xQcm9ncmFtXG4vLyAobGlzdCBvZiBkZWZpbmUgb2JqZWN0cyB0aGF0IGluaGVyaXQgZnJvbSBlYWNoIG90aGVyKVxuUmVuZGVyTW9kZS5idWlsZERlZmluZUxpc3QgPSBmdW5jdGlvbiAoKVxue1xuICAgIC8vIEFkZCBhbnkgY3VzdG9tIGRlZmluZXMgdG8gYnVpbHQtaW4gbW9kZSBkZWZpbmVzXG4gICAgdmFyIGRlZmluZXMgPSB7fTsgLy8gY3JlYXRlIGEgbmV3IG9iamVjdCB0byBhdm9pZCBtdXRhdGluZyBhIHByb3RvdHlwZSB2YWx1ZSB0aGF0IG1heSBiZSBzaGFyZWQgd2l0aCBvdGhlciBtb2Rlc1xuICAgIGlmICh0aGlzLmRlZmluZXMgIT0gbnVsbCkge1xuICAgICAgICBmb3IgKHZhciBkIGluIHRoaXMuZGVmaW5lcykge1xuICAgICAgICAgICAgZGVmaW5lc1tkXSA9IHRoaXMuZGVmaW5lc1tkXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5zaGFkZXJzICE9IG51bGwgJiYgdGhpcy5zaGFkZXJzLmRlZmluZXMgIT0gbnVsbCkge1xuICAgICAgICBmb3IgKHZhciBkIGluIHRoaXMuc2hhZGVycy5kZWZpbmVzKSB7XG4gICAgICAgICAgICBkZWZpbmVzW2RdID0gdGhpcy5zaGFkZXJzLmRlZmluZXNbZF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRlZmluZXM7XG59O1xuXG4vLyBTZXQgbW9kZSB1bmlmb3JtcyBvbiBjdXJyZW50bHkgYm91bmQgcHJvZ3JhbVxuUmVuZGVyTW9kZS5zZXRVbmlmb3JtcyA9IGZ1bmN0aW9uICgpXG57XG4gICAgdmFyIGdsX3Byb2dyYW0gPSBHTFByb2dyYW0uY3VycmVudDtcbiAgICBpZiAoZ2xfcHJvZ3JhbSAhPSBudWxsICYmIHRoaXMuc2hhZGVycyAhPSBudWxsICYmIHRoaXMuc2hhZGVycy51bmlmb3JtcyAhPSBudWxsKSB7XG4gICAgICAgIGdsX3Byb2dyYW0uc2V0VW5pZm9ybXModGhpcy5zaGFkZXJzLnVuaWZvcm1zKTtcbiAgICB9XG59O1xuXG5SZW5kZXJNb2RlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpXG57XG4gICAgLy8gTW9kZS1zcGVjaWZpYyBhbmltYXRpb25cbiAgICBpZiAodHlwZW9mIHRoaXMuYW5pbWF0aW9uID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24oKTtcbiAgICB9XG59O1xuXG5cbnZhciBNb2RlcyA9IHt9O1xudmFyIE1vZGVNYW5hZ2VyID0ge307XG5cbi8vIFVwZGF0ZSBidWlsdC1pbiBtb2RlIG9yIGNyZWF0ZSBhIG5ldyBvbmVcbk1vZGVNYW5hZ2VyLmNvbmZpZ3VyZU1vZGUgPSBmdW5jdGlvbiAobmFtZSwgc2V0dGluZ3MpXG57XG4gICAgTW9kZXNbbmFtZV0gPSBNb2Rlc1tuYW1lXSB8fCBPYmplY3QuY3JlYXRlKE1vZGVzW3NldHRpbmdzLmV4dGVuZHNdIHx8IFJlbmRlck1vZGUpO1xuICAgIGlmIChNb2Rlc1tzZXR0aW5ncy5leHRlbmRzXSkge1xuICAgICAgICBNb2Rlc1tuYW1lXS5wYXJlbnQgPSBNb2Rlc1tzZXR0aW5ncy5leHRlbmRzXTsgLy8gZXhwbGljaXQgJ3N1cGVyJyBjbGFzcyBhY2Nlc3NcbiAgICB9XG5cbiAgICBmb3IgKHZhciBzIGluIHNldHRpbmdzKSB7XG4gICAgICAgIE1vZGVzW25hbWVdW3NdID0gc2V0dGluZ3Nbc107XG4gICAgfVxuXG4gICAgTW9kZXNbbmFtZV0ubmFtZSA9IG5hbWU7XG4gICAgcmV0dXJuIE1vZGVzW25hbWVdO1xufTtcblxuXG4vLyBCdWlsdC1pbiByZW5kZXJpbmcgbW9kZXNcblxuLyoqKiBQbGFpbiBwb2x5Z29ucyAqKiovXG5cbk1vZGVzLnBvbHlnb25zID0gT2JqZWN0LmNyZWF0ZShSZW5kZXJNb2RlKTtcbk1vZGVzLnBvbHlnb25zLm5hbWUgPSAncG9seWdvbnMnO1xuXG5Nb2Rlcy5wb2x5Z29ucy52ZXJ0ZXhfc2hhZGVyX2tleSA9ICdwb2x5Z29uX3ZlcnRleCc7XG5Nb2Rlcy5wb2x5Z29ucy5mcmFnbWVudF9zaGFkZXJfa2V5ID0gJ3BvbHlnb25fZnJhZ21lbnQnO1xuXG5Nb2Rlcy5wb2x5Z29ucy5kZWZpbmVzID0ge1xuICAgICdXT1JMRF9QT1NJVElPTl9XUkFQJzogMTAwMDAwIC8vIGRlZmF1bHQgd29ybGQgY29vcmRzIHRvIHdyYXAgZXZlcnkgMTAwLDAwMCBtZXRlcnMsIGNhbiB0dXJuIG9mZiBieSBzZXR0aW5nIHRoaXMgdG8gJ2ZhbHNlJ1xufTtcblxuTW9kZXMucG9seWdvbnMuc2VsZWN0aW9uID0gdHJ1ZTtcblxuTW9kZXMucG9seWdvbnMuX2luaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy52ZXJ0ZXhfbGF5b3V0ID0gbmV3IEdMVmVydGV4TGF5b3V0KHRoaXMuZ2wsIFtcbiAgICAgICAgeyBuYW1lOiAnYV9wb3NpdGlvbicsIHNpemU6IDMsIHR5cGU6IHRoaXMuZ2wuRkxPQVQsIG5vcm1hbGl6ZWQ6IGZhbHNlIH0sXG4gICAgICAgIHsgbmFtZTogJ2Ffbm9ybWFsJywgc2l6ZTogMywgdHlwZTogdGhpcy5nbC5GTE9BVCwgbm9ybWFsaXplZDogZmFsc2UgfSxcbiAgICAgICAgeyBuYW1lOiAnYV9jb2xvcicsIHNpemU6IDMsIHR5cGU6IHRoaXMuZ2wuRkxPQVQsIG5vcm1hbGl6ZWQ6IGZhbHNlIH0sXG4gICAgICAgIHsgbmFtZTogJ2Ffc2VsZWN0aW9uX2NvbG9yJywgc2l6ZTogNCwgdHlwZTogdGhpcy5nbC5GTE9BVCwgbm9ybWFsaXplZDogZmFsc2UgfSxcbiAgICAgICAgeyBuYW1lOiAnYV9sYXllcicsIHNpemU6IDEsIHR5cGU6IHRoaXMuZ2wuRkxPQVQsIG5vcm1hbGl6ZWQ6IGZhbHNlIH1cbiAgICBdKTtcbn07XG5cbk1vZGVzLnBvbHlnb25zLmJ1aWxkUG9seWdvbnMgPSBmdW5jdGlvbiAocG9seWdvbnMsIHN0eWxlLCB2ZXJ0ZXhfZGF0YSlcbntcbiAgICAvLyBDb2xvciBhbmQgbGF5ZXIgbnVtYmVyIGFyZSBjdXJyZW50bHkgY29uc3RhbnQgYWNyb3NzIHZlcnRpY2VzXG4gICAgdmFyIHZlcnRleF9jb25zdGFudHMgPSBbXG4gICAgICAgIHN0eWxlLmNvbG9yWzBdLCBzdHlsZS5jb2xvclsxXSwgc3R5bGUuY29sb3JbMl0sXG4gICAgICAgIHN0eWxlLnNlbGVjdGlvbi5jb2xvclswXSwgc3R5bGUuc2VsZWN0aW9uLmNvbG9yWzFdLCBzdHlsZS5zZWxlY3Rpb24uY29sb3JbMl0sIHN0eWxlLnNlbGVjdGlvbi5jb2xvclszXSxcbiAgICAgICAgc3R5bGUubGF5ZXJfbnVtXG4gICAgXTtcblxuICAgIC8vIE91dGxpbmVzIGhhdmUgYSBzbGlnaHRseSBkaWZmZXJlbnQgc2V0IG9mIGNvbnN0YW50cywgYmVjYXVzZSB0aGUgbGF5ZXIgbnVtYmVyIGlzIG1vZGlmaWVkXG4gICAgaWYgKHN0eWxlLm91dGxpbmUuY29sb3IpIHtcbiAgICAgICAgdmFyIG91dGxpbmVfdmVydGV4X2NvbnN0YW50cyA9IFtcbiAgICAgICAgICAgIHN0eWxlLm91dGxpbmUuY29sb3JbMF0sIHN0eWxlLm91dGxpbmUuY29sb3JbMV0sIHN0eWxlLm91dGxpbmUuY29sb3JbMl0sXG4gICAgICAgICAgICBzdHlsZS5zZWxlY3Rpb24uY29sb3JbMF0sIHN0eWxlLnNlbGVjdGlvbi5jb2xvclsxXSwgc3R5bGUuc2VsZWN0aW9uLmNvbG9yWzJdLCBzdHlsZS5zZWxlY3Rpb24uY29sb3JbM10sXG4gICAgICAgICAgICBzdHlsZS5sYXllcl9udW0gLSAwLjUgLy8gb3V0bGluZXMgc2l0IGJldHdlZW4gbGF5ZXJzLCB1bmRlcm5lYXRoIGN1cnJlbnQgbGF5ZXIgYnV0IGFib3ZlIHRoZSBvbmUgYmVsb3dcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICAvLyBFeHRydWRlZCBwb2x5Z29ucyAoZS5nLiAzRCBidWlsZGluZ3MpXG4gICAgaWYgKHN0eWxlLmV4dHJ1ZGUgJiYgc3R5bGUuaGVpZ2h0KSB7XG4gICAgICAgIEdMQnVpbGRlcnMuYnVpbGRFeHRydWRlZFBvbHlnb25zKFxuICAgICAgICAgICAgcG9seWdvbnMsXG4gICAgICAgICAgICBzdHlsZS56LFxuICAgICAgICAgICAgc3R5bGUuaGVpZ2h0LFxuICAgICAgICAgICAgc3R5bGUubWluX2hlaWdodCxcbiAgICAgICAgICAgIHZlcnRleF9kYXRhLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZlcnRleF9jb25zdGFudHM6IHZlcnRleF9jb25zdGFudHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgLy8gUmVndWxhciBwb2x5Z29uc1xuICAgIGVsc2Uge1xuICAgICAgICBHTEJ1aWxkZXJzLmJ1aWxkUG9seWdvbnMoXG4gICAgICAgICAgICBwb2x5Z29ucyxcbiAgICAgICAgICAgIHN0eWxlLnosXG4gICAgICAgICAgICB2ZXJ0ZXhfZGF0YSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBub3JtYWxzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZlcnRleF9jb25zdGFudHM6IHZlcnRleF9jb25zdGFudHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICAvLyBDYWxsYmFjay1iYXNlIGJ1aWxkZXIgKGZvciBmdXR1cmUgZXhwbG9yYXRpb24pXG4gICAgICAgIC8vIHZhciBub3JtYWxfdmVydGV4X2NvbnN0YW50cyA9IFswLCAwLCAxXS5jb25jYXQodmVydGV4X2NvbnN0YW50cyk7XG4gICAgICAgIC8vIEdMQnVpbGRlcnMuYnVpbGRQb2x5Z29uczIoXG4gICAgICAgIC8vICAgICBwb2x5Z29ucyxcbiAgICAgICAgLy8gICAgIHosXG4gICAgICAgIC8vICAgICBmdW5jdGlvbiAodmVydGljZXMpIHtcbiAgICAgICAgLy8gICAgICAgICAvLyB2YXIgdnMgPSB2ZXJ0aWNlcy5wb3NpdGlvbnM7XG4gICAgICAgIC8vICAgICAgICAgLy8gZm9yICh2YXIgdiBpbiB2cykge1xuICAgICAgICAvLyAgICAgICAgIC8vICAgICAvLyB2YXIgYmMgPSBbKHYgJSAzKSA/IDAgOiAxLCAoKHYgKyAxKSAlIDMpID8gMCA6IDEsICgodiArIDIpICUgMykgPyAwIDogMV07XG4gICAgICAgIC8vICAgICAgICAgLy8gICAgIC8vIHZhciBiYyA9IFtjZW50cm9pZC54LCBjZW50cm9pZC55LCAwXTtcbiAgICAgICAgLy8gICAgICAgICAvLyAgICAgLy8gdnNbdl0gPSB2ZXJ0aWNlcy5wb3NpdGlvbnNbdl0uY29uY2F0KHosIDAsIDAsIDEsIGJjKTtcblxuICAgICAgICAvLyAgICAgICAgIC8vICAgICAvLyB2c1t2XSA9IHZlcnRpY2VzLnBvc2l0aW9uc1t2XS5jb25jYXQoeiwgMCwgMCwgMSk7XG4gICAgICAgIC8vICAgICAgICAgLy8gICAgIHZzW3ZdID0gdmVydGljZXMucG9zaXRpb25zW3ZdLmNvbmNhdCgwLCAwLCAxKTtcbiAgICAgICAgLy8gICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gICAgICAgICBHTC5hZGRWZXJ0aWNlcyh2ZXJ0aWNlcy5wb3NpdGlvbnMsIG5vcm1hbF92ZXJ0ZXhfY29uc3RhbnRzLCB2ZXJ0ZXhfZGF0YSk7XG5cbiAgICAgICAgLy8gICAgICAgICAvLyBHTC5hZGRWZXJ0aWNlc0J5QXR0cmlidXRlTGF5b3V0KFxuICAgICAgICAvLyAgICAgICAgIC8vICAgICBbXG4gICAgICAgIC8vICAgICAgICAgLy8gICAgICAgICB7IG5hbWU6ICdhX3Bvc2l0aW9uJywgZGF0YTogdmVydGljZXMucG9zaXRpb25zIH0sXG4gICAgICAgIC8vICAgICAgICAgLy8gICAgICAgICB7IG5hbWU6ICdhX25vcm1hbCcsIGRhdGE6IFswLCAwLCAxXSB9LFxuICAgICAgICAvLyAgICAgICAgIC8vICAgICAgICAgeyBuYW1lOiAnYV9jb2xvcicsIGRhdGE6IFtzdHlsZS5jb2xvclswXSwgc3R5bGUuY29sb3JbMV0sIHN0eWxlLmNvbG9yWzJdXSB9LFxuICAgICAgICAvLyAgICAgICAgIC8vICAgICAgICAgeyBuYW1lOiAnYV9sYXllcicsIGRhdGE6IHN0eWxlLmxheWVyX251bSB9XG4gICAgICAgIC8vICAgICAgICAgLy8gICAgIF0sXG4gICAgICAgIC8vICAgICAgICAgLy8gICAgIHZlcnRleF9kYXRhXG4gICAgICAgIC8vICAgICAgICAgLy8gKTtcblxuICAgICAgICAvLyAgICAgICAgIC8vIEdMLmFkZFZlcnRpY2VzTXVsdGlwbGVBdHRyaWJ1dGVzKFt2ZXJ0aWNlcy5wb3NpdGlvbnNdLCBub3JtYWxfdmVydGV4X2NvbnN0YW50cywgdmVydGV4X2RhdGEpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyApO1xuICAgIH1cblxuICAgIC8vIFBvbHlnb24gb3V0bGluZXNcbiAgICBpZiAoc3R5bGUub3V0bGluZS5jb2xvciAmJiBzdHlsZS5vdXRsaW5lLndpZHRoKSB7XG4gICAgICAgIGZvciAodmFyIG1wYz0wOyBtcGMgPCBwb2x5Z29ucy5sZW5ndGg7IG1wYysrKSB7XG4gICAgICAgICAgICBHTEJ1aWxkZXJzLmJ1aWxkUG9seWxpbmVzKFxuICAgICAgICAgICAgICAgIHBvbHlnb25zW21wY10sXG4gICAgICAgICAgICAgICAgc3R5bGUueixcbiAgICAgICAgICAgICAgICBzdHlsZS5vdXRsaW5lLndpZHRoLFxuICAgICAgICAgICAgICAgIHZlcnRleF9kYXRhLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VkX3BvbHlnb246IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZV90aWxlX2VkZ2VzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXhfY29uc3RhbnRzOiBvdXRsaW5lX3ZlcnRleF9jb25zdGFudHNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuTW9kZXMucG9seWdvbnMuYnVpbGRMaW5lcyA9IGZ1bmN0aW9uIChsaW5lcywgc3R5bGUsIHZlcnRleF9kYXRhKVxue1xuICAgIC8vIFRPT0Q6IHJlZHVjZSByZWR1bmRhbmN5IG9mIGNvbnN0YW50IGNhbGMgYmV0d2VlbiBidWlsZGVyc1xuICAgIC8vIENvbG9yIGFuZCBsYXllciBudW1iZXIgYXJlIGN1cnJlbnRseSBjb25zdGFudCBhY3Jvc3MgdmVydGljZXNcbiAgICB2YXIgdmVydGV4X2NvbnN0YW50cyA9IFtcbiAgICAgICAgc3R5bGUuY29sb3JbMF0sIHN0eWxlLmNvbG9yWzFdLCBzdHlsZS5jb2xvclsyXSxcbiAgICAgICAgc3R5bGUuc2VsZWN0aW9uLmNvbG9yWzBdLCBzdHlsZS5zZWxlY3Rpb24uY29sb3JbMV0sIHN0eWxlLnNlbGVjdGlvbi5jb2xvclsyXSwgc3R5bGUuc2VsZWN0aW9uLmNvbG9yWzNdLFxuICAgICAgICBzdHlsZS5sYXllcl9udW1cbiAgICBdO1xuXG4gICAgLy8gT3V0bGluZXMgaGF2ZSBhIHNsaWdodGx5IGRpZmZlcmVudCBzZXQgb2YgY29uc3RhbnRzLCBiZWNhdXNlIHRoZSBsYXllciBudW1iZXIgaXMgbW9kaWZpZWRcbiAgICBpZiAoc3R5bGUub3V0bGluZS5jb2xvcikge1xuICAgICAgICB2YXIgb3V0bGluZV92ZXJ0ZXhfY29uc3RhbnRzID0gW1xuICAgICAgICAgICAgc3R5bGUub3V0bGluZS5jb2xvclswXSwgc3R5bGUub3V0bGluZS5jb2xvclsxXSwgc3R5bGUub3V0bGluZS5jb2xvclsyXSxcbiAgICAgICAgICAgIHN0eWxlLnNlbGVjdGlvbi5jb2xvclswXSwgc3R5bGUuc2VsZWN0aW9uLmNvbG9yWzFdLCBzdHlsZS5zZWxlY3Rpb24uY29sb3JbMl0sIHN0eWxlLnNlbGVjdGlvbi5jb2xvclszXSxcbiAgICAgICAgICAgIHN0eWxlLmxheWVyX251bSAtIDAuNSAvLyBvdXRsaW5lcyBzaXQgYmV0d2VlbiBsYXllcnMsIHVuZGVybmVhdGggY3VycmVudCBsYXllciBidXQgYWJvdmUgdGhlIG9uZSBiZWxvd1xuICAgICAgICBdO1xuICAgIH1cblxuICAgIC8vIE1haW4gbGluZXNcbiAgICBHTEJ1aWxkZXJzLmJ1aWxkUG9seWxpbmVzKFxuICAgICAgICBsaW5lcyxcbiAgICAgICAgc3R5bGUueixcbiAgICAgICAgc3R5bGUud2lkdGgsXG4gICAgICAgIHZlcnRleF9kYXRhLFxuICAgICAgICB7XG4gICAgICAgICAgICB2ZXJ0ZXhfY29uc3RhbnRzOiB2ZXJ0ZXhfY29uc3RhbnRzXG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gTGluZSBvdXRsaW5lc1xuICAgIGlmIChzdHlsZS5vdXRsaW5lLmNvbG9yICYmIHN0eWxlLm91dGxpbmUud2lkdGgpIHtcbiAgICAgICAgR0xCdWlsZGVycy5idWlsZFBvbHlsaW5lcyhcbiAgICAgICAgICAgIGxpbmVzLFxuICAgICAgICAgICAgc3R5bGUueixcbiAgICAgICAgICAgIHN0eWxlLndpZHRoICsgMiAqIHN0eWxlLm91dGxpbmUud2lkdGgsXG4gICAgICAgICAgICB2ZXJ0ZXhfZGF0YSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2ZXJ0ZXhfY29uc3RhbnRzOiBvdXRsaW5lX3ZlcnRleF9jb25zdGFudHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG59O1xuXG5Nb2Rlcy5wb2x5Z29ucy5idWlsZFBvaW50cyA9IGZ1bmN0aW9uIChwb2ludHMsIHN0eWxlLCB2ZXJ0ZXhfZGF0YSlcbntcbiAgICAvLyBUT09EOiByZWR1Y2UgcmVkdW5kYW5jeSBvZiBjb25zdGFudCBjYWxjIGJldHdlZW4gYnVpbGRlcnNcbiAgICAvLyBDb2xvciBhbmQgbGF5ZXIgbnVtYmVyIGFyZSBjdXJyZW50bHkgY29uc3RhbnQgYWNyb3NzIHZlcnRpY2VzXG4gICAgdmFyIHZlcnRleF9jb25zdGFudHMgPSBbXG4gICAgICAgIHN0eWxlLmNvbG9yWzBdLCBzdHlsZS5jb2xvclsxXSwgc3R5bGUuY29sb3JbMl0sXG4gICAgICAgIHN0eWxlLnNlbGVjdGlvbi5jb2xvclswXSwgc3R5bGUuc2VsZWN0aW9uLmNvbG9yWzFdLCBzdHlsZS5zZWxlY3Rpb24uY29sb3JbMl0sIHN0eWxlLnNlbGVjdGlvbi5jb2xvclszXSxcbiAgICAgICAgc3R5bGUubGF5ZXJfbnVtXG4gICAgXTtcblxuICAgIEdMQnVpbGRlcnMuYnVpbGRRdWFkc0ZvclBvaW50cyhcbiAgICAgICAgcG9pbnRzLFxuICAgICAgICBzdHlsZS5zaXplICogMixcbiAgICAgICAgc3R5bGUuc2l6ZSAqIDIsXG4gICAgICAgIHN0eWxlLnosXG4gICAgICAgIHZlcnRleF9kYXRhLFxuICAgICAgICB7XG4gICAgICAgICAgICBub3JtYWxzOiB0cnVlLFxuICAgICAgICAgICAgdGV4Y29vcmRzOiBmYWxzZSxcbiAgICAgICAgICAgIHZlcnRleF9jb25zdGFudHM6IHZlcnRleF9jb25zdGFudHNcbiAgICAgICAgfVxuICAgICk7XG59O1xuXG5cbi8qKiogUG9pbnRzIHcvc2ltcGxlIGRpc3RhbmNlIGZpZWxkIHJlbmRlcmluZyAqKiovXG5cbk1vZGVzLnBvaW50cyA9IE9iamVjdC5jcmVhdGUoUmVuZGVyTW9kZSk7XG5Nb2Rlcy5wb2ludHMubmFtZSA9ICdwb2ludHMnO1xuXG5Nb2Rlcy5wb2ludHMudmVydGV4X3NoYWRlcl9rZXkgPSAncG9pbnRfdmVydGV4Jztcbk1vZGVzLnBvaW50cy5mcmFnbWVudF9zaGFkZXJfa2V5ID0gJ3BvaW50X2ZyYWdtZW50JztcblxuTW9kZXMucG9pbnRzLmRlZmluZXMgPSB7XG4gICAgJ0VGRkVDVF9TQ1JFRU5fQ09MT1InOiB0cnVlXG59O1xuXG5Nb2Rlcy5wb2ludHMuc2VsZWN0aW9uID0gdHJ1ZTtcblxuTW9kZXMucG9pbnRzLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMudmVydGV4X2xheW91dCA9IG5ldyBHTFZlcnRleExheW91dCh0aGlzLmdsLCBbXG4gICAgICAgIHsgbmFtZTogJ2FfcG9zaXRpb24nLCBzaXplOiAzLCB0eXBlOiB0aGlzLmdsLkZMT0FULCBub3JtYWxpemVkOiBmYWxzZSB9LFxuICAgICAgICB7IG5hbWU6ICdhX3RleGNvb3JkJywgc2l6ZTogMiwgdHlwZTogdGhpcy5nbC5GTE9BVCwgbm9ybWFsaXplZDogZmFsc2UgfSxcbiAgICAgICAgeyBuYW1lOiAnYV9jb2xvcicsIHNpemU6IDMsIHR5cGU6IHRoaXMuZ2wuRkxPQVQsIG5vcm1hbGl6ZWQ6IGZhbHNlIH0sXG4gICAgICAgIHsgbmFtZTogJ2Ffc2VsZWN0aW9uX2NvbG9yJywgc2l6ZTogNCwgdHlwZTogdGhpcy5nbC5GTE9BVCwgbm9ybWFsaXplZDogZmFsc2UgfSxcbiAgICAgICAgeyBuYW1lOiAnYV9sYXllcicsIHNpemU6IDEsIHR5cGU6IHRoaXMuZ2wuRkxPQVQsIG5vcm1hbGl6ZWQ6IGZhbHNlIH1cbiAgICBdKTtcbn07XG5cbk1vZGVzLnBvaW50cy5idWlsZFBvaW50cyA9IGZ1bmN0aW9uIChwb2ludHMsIHN0eWxlLCB2ZXJ0ZXhfZGF0YSlcbntcbiAgICAvLyBUT09EOiByZWR1Y2UgcmVkdW5kYW5jeSBvZiBjb25zdGFudCBjYWxjIGJldHdlZW4gYnVpbGRlcnNcbiAgICAvLyBDb2xvciBhbmQgbGF5ZXIgbnVtYmVyIGFyZSBjdXJyZW50bHkgY29uc3RhbnQgYWNyb3NzIHZlcnRpY2VzXG4gICAgdmFyIHZlcnRleF9jb25zdGFudHMgPSBbXG4gICAgICAgIHN0eWxlLmNvbG9yWzBdLCBzdHlsZS5jb2xvclsxXSwgc3R5bGUuY29sb3JbMl0sXG4gICAgICAgIHN0eWxlLnNlbGVjdGlvbi5jb2xvclswXSwgc3R5bGUuc2VsZWN0aW9uLmNvbG9yWzFdLCBzdHlsZS5zZWxlY3Rpb24uY29sb3JbMl0sIHN0eWxlLnNlbGVjdGlvbi5jb2xvclszXSxcbiAgICAgICAgc3R5bGUubGF5ZXJfbnVtXG4gICAgXTtcblxuICAgIEdMQnVpbGRlcnMuYnVpbGRRdWFkc0ZvclBvaW50cyhcbiAgICAgICAgcG9pbnRzLFxuICAgICAgICBzdHlsZS5zaXplICogMixcbiAgICAgICAgc3R5bGUuc2l6ZSAqIDIsXG4gICAgICAgIHN0eWxlLnosXG4gICAgICAgIHZlcnRleF9kYXRhLFxuICAgICAgICB7XG4gICAgICAgICAgICBub3JtYWxzOiBmYWxzZSxcbiAgICAgICAgICAgIHRleGNvb3JkczogdHJ1ZSxcbiAgICAgICAgICAgIHZlcnRleF9jb25zdGFudHM6IHZlcnRleF9jb25zdGFudHNcbiAgICAgICAgfVxuICAgICk7XG59O1xuXG5pZiAobW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAgICAgTW9kZU1hbmFnZXI6IE1vZGVNYW5hZ2VyLFxuICAgICAgICBNb2RlczogTW9kZXNcbiAgICB9O1xufVxuIiwiLy8gVGhpbiBHTCBwcm9ncmFtIHdyYXBwIHRvIGNhY2hlIHVuaWZvcm0gbG9jYXRpb25zL3ZhbHVlcywgZG8gY29tcGlsZS10aW1lIHByZS1wcm9jZXNzaW5nXG4vLyAoaW5qZWN0aW5nICNkZWZpbmVzIGFuZCAjcHJhZ21hIHRyYW5zZm9ybXMgaW50byBzaGFkZXJzKSwgZXRjLlxuXG52YXIgR0wgPSByZXF1aXJlKCcuL2dsLmpzJyk7XG52YXIgR0xUZXh0dXJlID0gcmVxdWlyZSgnLi9nbF90ZXh0dXJlLmpzJyk7XG52YXIgVXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy5qcycpO1xudmFyIFF1ZXVlID0gcmVxdWlyZSgncXVldWUtYXN5bmMnKTtcblxuR0xQcm9ncmFtLmlkID0gMDsgLy8gYXNzaWduIGVhY2ggcHJvZ3JhbSBhIHVuaXF1ZSBpZFxuR0xQcm9ncmFtLnByb2dyYW1zID0ge307IC8vIHByb2dyYW1zLCBieSBpZFxuXG5mdW5jdGlvbiBHTFByb2dyYW0gKGdsLCB2ZXJ0ZXhfc2hhZGVyLCBmcmFnbWVudF9zaGFkZXIsIG9wdGlvbnMpXG57XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB0aGlzLmdsID0gZ2w7XG4gICAgdGhpcy5wcm9ncmFtID0gbnVsbDtcbiAgICB0aGlzLmNvbXBpbGVkID0gZmFsc2U7XG4gICAgdGhpcy5kZWZpbmVzID0gb3B0aW9ucy5kZWZpbmVzIHx8IHt9OyAvLyBrZXkvdmFsdWVzIGluc2VydGVkIGFzICNkZWZpbmVzIGludG8gc2hhZGVycyBhdCBjb21waWxlLXRpbWVcbiAgICB0aGlzLnRyYW5zZm9ybXMgPSBvcHRpb25zLnRyYW5zZm9ybXM7IC8vIGtleS92YWx1ZXMgZm9yIFVSTHMgb2YgYmxvY2tzIHRoYXQgY2FuIGJlIGluamVjdGVkIGludG8gc2hhZGVycyBhdCBjb21waWxlLXRpbWVcbiAgICB0aGlzLnVuaWZvcm1zID0ge307IC8vIHByb2dyYW0gbG9jYXRpb25zIG9mIHVuaWZvcm1zLCBzZXQvdXBkYXRlZCBhdCBjb21waWxlLXRpbWVcbiAgICB0aGlzLmF0dHJpYnMgPSB7fTsgLy8gcHJvZ3JhbSBsb2NhdGlvbnMgb2YgdmVydGV4IGF0dHJpYnV0ZXNcblxuICAgIHRoaXMudmVydGV4X3NoYWRlciA9IHZlcnRleF9zaGFkZXI7XG4gICAgdGhpcy5mcmFnbWVudF9zaGFkZXIgPSBmcmFnbWVudF9zaGFkZXI7XG5cbiAgICB0aGlzLmlkID0gR0xQcm9ncmFtLmlkKys7XG4gICAgR0xQcm9ncmFtLnByb2dyYW1zW3RoaXMuaWRdID0gdGhpcztcbiAgICB0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWU7IC8vIGNhbiBwcm92aWRlIGEgcHJvZ3JhbSBuYW1lICh1c2VmdWwgZm9yIGRlYnVnZ2luZylcblxuICAgIHRoaXMuY29tcGlsZShvcHRpb25zLmNhbGxiYWNrKTtcbn07XG5cbi8vIFVzZSBwcm9ncmFtIHdyYXBwZXIgd2l0aCBzaW1wbGUgc3RhdGUgY2FjaGVcbkdMUHJvZ3JhbS5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gKClcbntcbiAgICBpZiAoIXRoaXMuY29tcGlsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChHTFByb2dyYW0uY3VycmVudCAhPSB0aGlzKSB7XG4gICAgICAgIHRoaXMuZ2wudXNlUHJvZ3JhbSh0aGlzLnByb2dyYW0pO1xuICAgIH1cbiAgICBHTFByb2dyYW0uY3VycmVudCA9IHRoaXM7XG59O1xuR0xQcm9ncmFtLmN1cnJlbnQgPSBudWxsO1xuXG4vLyBHbG9iYWwgZGVmaW5lcyBhcHBsaWVkIHRvIGFsbCBwcm9ncmFtcyAoZHVwbGljYXRlIHByb3BlcnRpZXMgZm9yIGEgc3BlY2lmaWMgcHJvZ3JhbSB3aWxsIHRha2UgcHJlY2VkZW5jZSlcbkdMUHJvZ3JhbS5kZWZpbmVzID0ge307XG5cbkdMUHJvZ3JhbS5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uIChjYWxsYmFjaylcbntcbiAgICB2YXIgcXVldWUgPSBRdWV1ZSgpO1xuXG4gICAgLy8gQ29weSBzb3VyY2VzIGZyb20gcHJlLW1vZGlmaWVkIHRlbXBsYXRlXG4gICAgdGhpcy5jb21wdXRlZF92ZXJ0ZXhfc2hhZGVyID0gdGhpcy52ZXJ0ZXhfc2hhZGVyO1xuICAgIHRoaXMuY29tcHV0ZWRfZnJhZ21lbnRfc2hhZGVyID0gdGhpcy5mcmFnbWVudF9zaGFkZXI7XG5cbiAgICAvLyBNYWtlIGxpc3Qgb2YgZGVmaW5lcyB0byBiZSBpbmplY3RlZCBsYXRlclxuICAgIHZhciBkZWZpbmVzID0gdGhpcy5idWlsZERlZmluZUxpc3QoKTtcblxuICAgIC8vIEluamVjdCB1c2VyLWRlZmluZWQgdHJhbnNmb3JtcyAoYXJiaXRyYXJ5IGNvZGUgcG9pbnRzIG1hdGNoaW5nIG5hbWVkICNwcmFnbWFzKVxuICAgIC8vIFJlcGxhY2UgYWNjb3JkaW5nIHRvIHRoaXMgcGF0dGVybjpcbiAgICAvLyAjcHJhZ21hIHRhbmdyYW06IFtrZXldXG4gICAgLy8gZS5nLiAjcHJhZ21hIHRhbmdyYW06IGdsb2JhbHNcblxuICAgIC8vIFRPRE86IGZsYWcgdG8gYXZvaWQgcmUtcmV0cmlldmluZyB0cmFuc2Zvcm0gVVJMcyBvdmVyIG5ldHdvcmsgd2hlbiByZWJ1aWxkaW5nP1xuICAgIC8vIFRPRE86IHN1cHBvcnQgZ2xzbGlmeSAjcHJhZ21hIGV4cG9ydCBuYW1lcyBmb3IgYmV0dGVyIGNvbXBhdGliaWxpdHk/IChlLmcuIHJlbmFtZSBtYWluKCkgZnVuY3Rpb25zKVxuICAgIC8vIFRPRE86IGF1dG8taW5zZXJ0IHVuaWZvcm1zIHJlZmVyZW5jZWQgaW4gbW9kZSBkZWZpbml0aW9uLCBidXQgbm90IGluIHNoYWRlciBiYXNlIG9yIHRyYW5zZm9ybXM/IChwcm9ibGVtOiBkb24ndCBoYXZlIGFjY2VzcyB0byB1bmlmb3JtIGxpc3QvdHlwZSBoZXJlKVxuXG4gICAgLy8gR2F0aGVyIGFsbCB0cmFuc2Zvcm0gY29kZSBzbmlwcGV0cyAoY2FuIGJlIGVpdGhlciBpbmxpbmUgaW4gdGhlIHN0eWxlIGZpbGUsIG9yIG92ZXIgdGhlIG5ldHdvcmsgdmlhIFVSTClcbiAgICAvLyBUaGlzIGlzIGFuIGFzeW5jIHByb2Nlc3MsIHNpbmNlIGNvZGUgbWF5IGJlIHJldHJpZXZlZCByZW1vdGVseVxuICAgIHZhciByZWdleHA7XG4gICAgdmFyIGxvYWRlZF90cmFuc2Zvcm1zID0ge307IC8vIG1hc3RlciBsaXN0IG9mIHRyYW5zZm9ybXMsIHdpdGggYW4gb3JkZXJlZCBsaXN0IGZvciBlYWNoIChzaW5jZSB3ZSB3YW50IHRvIGd1YXJhbnRlZSBvcmRlciBvZiB0cmFuc2Zvcm1zKVxuICAgIGlmICh0aGlzLnRyYW5zZm9ybXMgIT0gbnVsbCkge1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLnRyYW5zZm9ybXMpIHtcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybXNba2V5XTtcbiAgICAgICAgICAgIGlmICh0cmFuc2Zvcm0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBFYWNoIGNvZGUgcG9pbnQgY2FuIGJlIGEgc2luZ2xlIGl0ZW0gKHN0cmluZyBvciBoYXNoIG9iamVjdCkgb3IgYSBsaXN0IChhcnJheSBvYmplY3Qgd2l0aCBub24temVybyBsZW5ndGgpXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRyYW5zZm9ybSA9PSAnc3RyaW5nJyB8fCAodHlwZW9mIHRyYW5zZm9ybSA9PSAnb2JqZWN0JyAmJiB0cmFuc2Zvcm0ubGVuZ3RoID09IG51bGwpKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtID0gW3RyYW5zZm9ybV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEZpcnN0IGZpbmQgY29kZSByZXBsYWNlIHBvaW50cyBpbiBzaGFkZXJzXG4gICAgICAgICAgICB2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cCgnXlxcXFxzKiNwcmFnbWFcXFxccyt0YW5ncmFtOlxcXFxzKycgKyBrZXkgKyAnXFxcXHMqJCcsICdtJyk7XG4gICAgICAgICAgICB2YXIgaW5qZWN0X3ZlcnRleCA9IHRoaXMuY29tcHV0ZWRfdmVydGV4X3NoYWRlci5tYXRjaChyZWdleHApO1xuICAgICAgICAgICAgdmFyIGluamVjdF9mcmFnbWVudCA9IHRoaXMuY29tcHV0ZWRfZnJhZ21lbnRfc2hhZGVyLm1hdGNoKHJlZ2V4cCk7XG5cbiAgICAgICAgICAgIC8vIEF2b2lkIG5ldHdvcmsgcmVxdWVzdCBpZiBub3RoaW5nIHRvIHJlcGxhY2VcbiAgICAgICAgICAgIGlmIChpbmplY3RfdmVydGV4ID09IG51bGwgJiYgaW5qZWN0X2ZyYWdtZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ29sbGVjdCBhbGwgdHJhbnNmb3JtcyBmb3IgdGhpcyB0eXBlXG4gICAgICAgICAgICBsb2FkZWRfdHJhbnNmb3Jtc1trZXldID0ge307XG4gICAgICAgICAgICBsb2FkZWRfdHJhbnNmb3Jtc1trZXldLnJlZ2V4cCA9IG5ldyBSZWdFeHAocmVnZXhwKTsgLy8gc2F2ZSByZWdleHAgc28gd2UgY2FuIGluamVjdCBsYXRlciB3aXRob3V0IGhhdmluZyB0byByZWNyZWF0ZSBpdFxuICAgICAgICAgICAgbG9hZGVkX3RyYW5zZm9ybXNba2V5XS5pbmplY3RfdmVydGV4ID0gKGluamVjdF92ZXJ0ZXggIT0gbnVsbCk7IC8vIHNhdmUgcmVnZXhwIGNvZGUgcG9pbnQgbWF0Y2hlcyBzbyB3ZSBkb24ndCBoYXZlIHRvIGRvIHRoZW0gYWdhaW5cbiAgICAgICAgICAgIGxvYWRlZF90cmFuc2Zvcm1zW2tleV0uaW5qZWN0X2ZyYWdtZW50ID0gKGluamVjdF9mcmFnbWVudCAhPSBudWxsKTtcbiAgICAgICAgICAgIGxvYWRlZF90cmFuc2Zvcm1zW2tleV0ubGlzdCA9IFtdO1xuXG4gICAgICAgICAgICAvLyBHZXQgdGhlIGNvZGUgKHBvc3NpYmx5IG92ZXIgdGhlIG5ldHdvcmssIHNvIG5lZWRzIHRvIGJlIGFzeW5jKVxuICAgICAgICAgICAgZm9yICh2YXIgdT0wOyB1IDwgdHJhbnNmb3JtLmxlbmd0aDsgdSsrKSB7XG4gICAgICAgICAgICAgICAgcXVldWUuZGVmZXIoR0xQcm9ncmFtLmxvYWRUcmFuc2Zvcm0sIGxvYWRlZF90cmFuc2Zvcm1zLCB0cmFuc2Zvcm1bdV0sIGtleSwgdSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEFkZCBhICNkZWZpbmUgZm9yIHRoaXMgaW5qZWN0aW9uIHBvaW50XG4gICAgICAgICAgICBkZWZpbmVzWydUQU5HUkFNX1RSQU5TRk9STV8nICsga2V5LnJlcGxhY2UoJyAnLCAnXycpLnRvVXBwZXJDYXNlKCldID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFdoZW4gYWxsIHRyYW5zZm9ybSBjb2RlIHNuaXBwZXRzIGFyZSBjb2xsZWN0ZWQsIGNvbWJpbmUgYW5kIGluamVjdCB0aGVtXG4gICAgcXVldWUuYXdhaXQoZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgbG9hZGluZyB0cmFuc2Zvcm1zOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERvIHRoZSBjb2RlIGluamVjdGlvbiB3aXRoIHRoZSBjb2xsZWN0ZWQgc291cmNlc1xuICAgICAgICBmb3IgKHZhciB0IGluIGxvYWRlZF90cmFuc2Zvcm1zKSB7XG4gICAgICAgICAgICAvLyBDb25jYXRlbmF0ZVxuICAgICAgICAgICAgdmFyIGNvbWJpbmVkX3NvdXJjZSA9IFwiXCI7XG4gICAgICAgICAgICBmb3IgKHZhciBzPTA7IHMgPCBsb2FkZWRfdHJhbnNmb3Jtc1t0XS5saXN0Lmxlbmd0aDsgcysrKSB7XG4gICAgICAgICAgICAgICAgY29tYmluZWRfc291cmNlICs9IGxvYWRlZF90cmFuc2Zvcm1zW3RdLmxpc3Rbc10gKyAnXFxuJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSW5qZWN0XG4gICAgICAgICAgICBpZiAobG9hZGVkX3RyYW5zZm9ybXNbdF0uaW5qZWN0X3ZlcnRleCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wdXRlZF92ZXJ0ZXhfc2hhZGVyID0gdGhpcy5jb21wdXRlZF92ZXJ0ZXhfc2hhZGVyLnJlcGxhY2UobG9hZGVkX3RyYW5zZm9ybXNbdF0ucmVnZXhwLCBjb21iaW5lZF9zb3VyY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxvYWRlZF90cmFuc2Zvcm1zW3RdLmluamVjdF9mcmFnbWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wdXRlZF9mcmFnbWVudF9zaGFkZXIgPSB0aGlzLmNvbXB1dGVkX2ZyYWdtZW50X3NoYWRlci5yZXBsYWNlKGxvYWRlZF90cmFuc2Zvcm1zW3RdLnJlZ2V4cCwgY29tYmluZWRfc291cmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENsZWFuLXVwIGFueSAjcHJhZ21hcyB0aGF0IHdlcmVuJ3QgcmVwbGFjZWQgKHRvIHByZXZlbnQgY29tcGlsZXIgd2FybmluZ3MpXG4gICAgICAgIHZhciByZWdleHAgPSBuZXcgUmVnRXhwKCdeXFxcXHMqI3ByYWdtYVxcXFxzK3RhbmdyYW06XFxcXHMrXFxcXHcrXFxcXHMqJCcsICdnbScpO1xuICAgICAgICB0aGlzLmNvbXB1dGVkX3ZlcnRleF9zaGFkZXIgPSB0aGlzLmNvbXB1dGVkX3ZlcnRleF9zaGFkZXIucmVwbGFjZShyZWdleHAsICcnKTtcbiAgICAgICAgdGhpcy5jb21wdXRlZF9mcmFnbWVudF9zaGFkZXIgPSB0aGlzLmNvbXB1dGVkX2ZyYWdtZW50X3NoYWRlci5yZXBsYWNlKHJlZ2V4cCwgJycpO1xuXG4gICAgICAgIC8vIEJ1aWxkICYgaW5qZWN0IGRlZmluZXNcbiAgICAgICAgLy8gVGhpcyBpcyBkb25lICphZnRlciogY29kZSBpbmplY3Rpb24gc28gdGhhdCB3ZSBjYW4gYWRkIGRlZmluZXMgZm9yIHdoaWNoIGNvZGUgcG9pbnRzIHdlcmUgaW5qZWN0ZWRcbiAgICAgICAgdmFyIGRlZmluZV9zdHIgPSBHTFByb2dyYW0uYnVpbGREZWZpbmVTdHJpbmcoZGVmaW5lcyk7XG4gICAgICAgIHRoaXMuY29tcHV0ZWRfdmVydGV4X3NoYWRlciA9IGRlZmluZV9zdHIgKyB0aGlzLmNvbXB1dGVkX3ZlcnRleF9zaGFkZXI7XG4gICAgICAgIHRoaXMuY29tcHV0ZWRfZnJhZ21lbnRfc2hhZGVyID0gZGVmaW5lX3N0ciArIHRoaXMuY29tcHV0ZWRfZnJhZ21lbnRfc2hhZGVyO1xuXG4gICAgICAgIC8vIEluY2x1ZGUgcHJvZ3JhbSBpbmZvIHVzZWZ1bCBmb3IgZGVidWdnaW5nXG4gICAgICAgIHZhciBpbmZvID0gKHRoaXMubmFtZSA/ICh0aGlzLm5hbWUgKyAnIC8gaWQgJyArIHRoaXMuaWQpIDogKCdpZCAnICsgdGhpcy5pZCkpO1xuICAgICAgICB0aGlzLmNvbXB1dGVkX3ZlcnRleF9zaGFkZXIgPSAnLy8gUHJvZ3JhbTogJyArIGluZm8gKyAnXFxuJyArIHRoaXMuY29tcHV0ZWRfdmVydGV4X3NoYWRlcjtcbiAgICAgICAgdGhpcy5jb21wdXRlZF9mcmFnbWVudF9zaGFkZXIgPSAnLy8gUHJvZ3JhbTogJyArIGluZm8gKyAnXFxuJyArIHRoaXMuY29tcHV0ZWRfZnJhZ21lbnRfc2hhZGVyO1xuXG4gICAgICAgIC8vIENvbXBpbGUgJiBzZXQgdW5pZm9ybXMgdG8gY2FjaGVkIHZhbHVlc1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5wcm9ncmFtID0gR0wudXBkYXRlUHJvZ3JhbSh0aGlzLmdsLCB0aGlzLnByb2dyYW0sIHRoaXMuY29tcHV0ZWRfdmVydGV4X3NoYWRlciwgdGhpcy5jb21wdXRlZF9mcmFnbWVudF9zaGFkZXIpO1xuICAgICAgICAgICAgLy8gdGhpcy5wcm9ncmFtID0gR0wudXBkYXRlUHJvZ3JhbSh0aGlzLmdsLCBudWxsLCB0aGlzLmNvbXB1dGVkX3ZlcnRleF9zaGFkZXIsIHRoaXMuY29tcHV0ZWRfZnJhZ21lbnRfc2hhZGVyKTtcbiAgICAgICAgICAgIHRoaXMuY29tcGlsZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLnByb2dyYW0gPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5jb21waWxlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51c2UoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoVW5pZm9ybXMoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoQXR0cmlidXRlcygpO1xuXG4gICAgICAgIC8vIE5vdGlmeSBjYWxsZXJcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG4vLyBSZXRyaWV2ZSBhIHNpbmdsZSB0cmFuc2Zvcm0sIGZvciBhIGdpdmVuIGluamVjdGlvbiBwb2ludCwgYXQgYSBjZXJ0YWluIGluZGV4ICh0byBwcmVzZXJ2ZSBvcmlnaW5hbCBvcmRlcilcbi8vIENhbiBiZSBhc3luYywgY2FsbHMgJ2NvbXBsZXRlJyBjYWxsYmFjayB3aGVuIGRvbmVcbkdMUHJvZ3JhbS5sb2FkVHJhbnNmb3JtID0gZnVuY3Rpb24gKHRyYW5zZm9ybXMsIGJsb2NrLCBrZXksIGluZGV4LCBjb21wbGV0ZSkge1xuICAgIC8vIENhbiBiZSBhbiBpbmxpbmUgYmxvY2sgb2YgR0xTTCwgb3IgYSBVUkwgdG8gcmV0cmlldmUgR0xTTCBibG9jayBmcm9tXG4gICAgdmFyIHR5cGUsIHZhbHVlLCBzb3VyY2U7XG5cbiAgICAvLyBJbmxpbmUgY29kZVxuICAgIGlmICh0eXBlb2YgYmxvY2sgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHJhbnNmb3Jtc1trZXldLmxpc3RbaW5kZXhdID0gYmxvY2s7XG4gICAgICAgIGNvbXBsZXRlKCk7XG4gICAgfVxuICAgIC8vIFJlbW90ZSBjb2RlXG4gICAgZWxzZSBpZiAodHlwZW9mIGJsb2NrID09ICdvYmplY3QnICYmIGJsb2NrLnVybCkge1xuICAgICAgICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgcmVxLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNvdXJjZSA9IHJlcS5yZXNwb25zZTtcbiAgICAgICAgICAgIHRyYW5zZm9ybXNba2V5XS5saXN0W2luZGV4XSA9IHNvdXJjZTtcbiAgICAgICAgICAgIGNvbXBsZXRlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJlcS5vcGVuKCdHRVQnLCBVdGlscy51cmxGb3JQYXRoKGJsb2NrLnVybCkgKyAnPycgKyAoK25ldyBEYXRlKCkpLCB0cnVlIC8qIGFzeW5jIGZsYWcgKi8pO1xuICAgICAgICByZXEucmVzcG9uc2VUeXBlID0gJ3RleHQnO1xuICAgICAgICByZXEuc2VuZCgpO1xuICAgIH1cbn07XG5cbi8vIE1ha2UgbGlzdCBvZiBkZWZpbmVzIChnbG9iYWwsIHRoZW4gcHJvZ3JhbS1zcGVjaWZpYylcbkdMUHJvZ3JhbS5wcm90b3R5cGUuYnVpbGREZWZpbmVMaXN0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBkZWZpbmVzID0ge307XG4gICAgZm9yICh2YXIgZCBpbiBHTFByb2dyYW0uZGVmaW5lcykge1xuICAgICAgICBkZWZpbmVzW2RdID0gR0xQcm9ncmFtLmRlZmluZXNbZF07XG4gICAgfVxuICAgIGZvciAodmFyIGQgaW4gdGhpcy5kZWZpbmVzKSB7XG4gICAgICAgIGRlZmluZXNbZF0gPSB0aGlzLmRlZmluZXNbZF07XG4gICAgfVxuICAgIHJldHVybiBkZWZpbmVzO1xufTtcblxuLy8gVHVybiAjZGVmaW5lcyBpbnRvIGEgY29tYmluZWQgc3RyaW5nXG5HTFByb2dyYW0uYnVpbGREZWZpbmVTdHJpbmcgPSBmdW5jdGlvbiAoZGVmaW5lcykge1xuICAgIHZhciBkZWZpbmVfc3RyID0gXCJcIjtcbiAgICBmb3IgKHZhciBkIGluIGRlZmluZXMpIHtcbiAgICAgICAgaWYgKGRlZmluZXNbZF0gPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmVzW2RdID09ICdib29sZWFuJyAmJiBkZWZpbmVzW2RdID09IHRydWUpIHsgLy8gYm9vbGVhbnMgYXJlIHNpbXBsZSBkZWZpbmVzIHdpdGggbm8gdmFsdWVcbiAgICAgICAgICAgIGRlZmluZV9zdHIgKz0gXCIjZGVmaW5lIFwiICsgZCArIFwiXFxuXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZXNbZF0gPT0gJ251bWJlcicgJiYgTWF0aC5mbG9vcihkZWZpbmVzW2RdKSA9PSBkZWZpbmVzW2RdKSB7IC8vIGludCB0byBmbG9hdCBjb252ZXJzaW9uIHRvIHNhdGlzZnkgR0xTTCBmbG9hdHNcbiAgICAgICAgICAgIGRlZmluZV9zdHIgKz0gXCIjZGVmaW5lIFwiICsgZCArIFwiIFwiICsgZGVmaW5lc1tkXS50b0ZpeGVkKDEpICsgXCJcXG5cIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLy8gYW55IG90aGVyIGZsb2F0IG9yIHN0cmluZyB2YWx1ZVxuICAgICAgICAgICAgZGVmaW5lX3N0ciArPSBcIiNkZWZpbmUgXCIgKyBkICsgXCIgXCIgKyBkZWZpbmVzW2RdICsgXCJcXG5cIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGVmaW5lX3N0cjtcbn07XG5cbi8vIFNldCB1bmlmb3JtcyBmcm9tIGEgSlMgb2JqZWN0LCB3aXRoIGluZmVycmVkIHR5cGVzXG5HTFByb2dyYW0ucHJvdG90eXBlLnNldFVuaWZvcm1zID0gZnVuY3Rpb24gKHVuaWZvcm1zKVxue1xuICAgIC8vIFRPRE86IG9ubHkgdXBkYXRlIHVuaWZvcm1zIHdoZW4gY2hhbmdlZFxuICAgIHZhciB0ZXh0dXJlX3VuaXQgPSAwO1xuXG4gICAgZm9yICh2YXIgdSBpbiB1bmlmb3Jtcykge1xuICAgICAgICB2YXIgdW5pZm9ybSA9IHVuaWZvcm1zW3VdO1xuXG4gICAgICAgIC8vIFNpbmdsZSBmbG9hdFxuICAgICAgICBpZiAodHlwZW9mIHVuaWZvcm0gPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMudW5pZm9ybSgnMWYnLCB1LCB1bmlmb3JtKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBNdWx0aXBsZSBmbG9hdHMgLSB2ZWN0b3Igb3IgYXJyYXlcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHVuaWZvcm0gPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIC8vIGZsb2F0IHZlY3RvcnMgKHZlYzIsIHZlYzMsIHZlYzQpXG4gICAgICAgICAgICBpZiAodW5pZm9ybS5sZW5ndGggPj0gMiAmJiB1bmlmb3JtLmxlbmd0aCA8PSA0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bmlmb3JtKHVuaWZvcm0ubGVuZ3RoICsgJ2Z2JywgdSwgdW5pZm9ybSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBmbG9hdCBhcnJheVxuICAgICAgICAgICAgZWxzZSBpZiAodW5pZm9ybS5sZW5ndGggPiA0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bmlmb3JtKCcxZnYnLCB1ICsgJ1swXScsIHVuaWZvcm0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVE9ETzogYXNzdW1lIG1hdHJpeCBmb3IgKHR5cGVvZiA9PSBGbG9hdDMyQXJyYXkgJiYgbGVuZ3RoID09IDE2KT9cbiAgICAgICAgfVxuICAgICAgICAvLyBCb29sZWFuXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB0aGlzLnNoYWRlcnMudW5pZm9ybXNbdV0gPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICB0aGlzLnVuaWZvcm0oJzFpJywgdSwgdW5pZm9ybSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGV4dHVyZVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdW5pZm9ybSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFyIHRleHR1cmUgPSBHTFRleHR1cmUudGV4dHVyZXNbdW5pZm9ybV07XG4gICAgICAgICAgICBpZiAodGV4dHVyZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGV4dHVyZSA9IG5ldyBHTFRleHR1cmUodGhpcy5nbCwgdW5pZm9ybSk7XG4gICAgICAgICAgICAgICAgdGV4dHVyZS5sb2FkKHVuaWZvcm0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0ZXh0dXJlLmJpbmQodGV4dHVyZV91bml0KTtcbiAgICAgICAgICAgIHRoaXMudW5pZm9ybSgnMWknLCB1LCB0ZXh0dXJlX3VuaXQpO1xuICAgICAgICAgICAgdGV4dHVyZV91bml0Kys7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETzogc3VwcG9ydCBvdGhlciBub24tZmxvYXQgdHlwZXM/IChpbnQsIGV0Yy4pXG4gICAgfVxufTtcblxuLy8gZXg6IHByb2dyYW0udW5pZm9ybSgnM2YnLCAncG9zaXRpb24nLCB4LCB5LCB6KTtcbi8vIFRPRE86IG9ubHkgdXBkYXRlIHVuaWZvcm1zIHdoZW4gY2hhbmdlZFxuR0xQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtID0gZnVuY3Rpb24gKG1ldGhvZCwgbmFtZSkgLy8gbWV0aG9kLWFwcHJvcHJpYXRlIGFyZ3VtZW50cyBmb2xsb3dcbntcbiAgICBpZiAoIXRoaXMuY29tcGlsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB1bmlmb3JtID0gKHRoaXMudW5pZm9ybXNbbmFtZV0gPSB0aGlzLnVuaWZvcm1zW25hbWVdIHx8IHt9KTtcbiAgICB1bmlmb3JtLm5hbWUgPSBuYW1lO1xuICAgIHVuaWZvcm0ubG9jYXRpb24gPSB1bmlmb3JtLmxvY2F0aW9uIHx8IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgbmFtZSk7XG4gICAgdW5pZm9ybS5tZXRob2QgPSAndW5pZm9ybScgKyBtZXRob2Q7XG4gICAgdW5pZm9ybS52YWx1ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIHRoaXMudXBkYXRlVW5pZm9ybShuYW1lKTtcbn07XG5cbi8vIFNldCBhIHNpbmdsZSB1bmlmb3JtXG5HTFByb2dyYW0ucHJvdG90eXBlLnVwZGF0ZVVuaWZvcm0gPSBmdW5jdGlvbiAobmFtZSlcbntcbiAgICBpZiAoIXRoaXMuY29tcGlsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB1bmlmb3JtID0gdGhpcy51bmlmb3Jtc1tuYW1lXTtcbiAgICBpZiAodW5pZm9ybSA9PSBudWxsIHx8IHVuaWZvcm0ubG9jYXRpb24gPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy51c2UoKTtcbiAgICB0aGlzLmdsW3VuaWZvcm0ubWV0aG9kXS5hcHBseSh0aGlzLmdsLCBbdW5pZm9ybS5sb2NhdGlvbl0uY29uY2F0KHVuaWZvcm0udmFsdWVzKSk7IC8vIGNhbGwgYXBwcm9wcmlhdGUgR0wgdW5pZm9ybSBtZXRob2QgYW5kIHBhc3MgdGhyb3VnaCBhcmd1bWVudHNcbn07XG5cbi8vIFJlZnJlc2ggdW5pZm9ybSBsb2NhdGlvbnMgYW5kIHNldCB0byBsYXN0IGNhY2hlZCB2YWx1ZXNcbkdMUHJvZ3JhbS5wcm90b3R5cGUucmVmcmVzaFVuaWZvcm1zID0gZnVuY3Rpb24gKClcbntcbiAgICBpZiAoIXRoaXMuY29tcGlsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAodmFyIHUgaW4gdGhpcy51bmlmb3Jtcykge1xuICAgICAgICB0aGlzLnVuaWZvcm1zW3VdLmxvY2F0aW9uID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcm9ncmFtLCB1KTtcbiAgICAgICAgdGhpcy51cGRhdGVVbmlmb3JtKHUpO1xuICAgIH1cbn07XG5cbkdMUHJvZ3JhbS5wcm90b3R5cGUucmVmcmVzaEF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoKVxue1xuICAgIC8vIHZhciBsZW4gPSB0aGlzLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcm9ncmFtLCB0aGlzLmdsLkFDVElWRV9BVFRSSUJVVEVTKTtcbiAgICAvLyBmb3IgKHZhciBpPTA7IGkgPCBsZW47IGkrKykge1xuICAgIC8vICAgICB2YXIgYSA9IHRoaXMuZ2wuZ2V0QWN0aXZlQXR0cmliKHRoaXMucHJvZ3JhbSwgaSk7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGEpO1xuICAgIC8vIH1cbiAgICB0aGlzLmF0dHJpYnMgPSB7fTtcbn07XG5cbi8vIEdldCB0aGUgbG9jYXRpb24gb2YgYSB2ZXJ0ZXggYXR0cmlidXRlXG5HTFByb2dyYW0ucHJvdG90eXBlLmF0dHJpYnV0ZSA9IGZ1bmN0aW9uIChuYW1lKVxue1xuICAgIGlmICghdGhpcy5jb21waWxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGF0dHJpYiA9ICh0aGlzLmF0dHJpYnNbbmFtZV0gPSB0aGlzLmF0dHJpYnNbbmFtZV0gfHwge30pO1xuICAgIGlmIChhdHRyaWIubG9jYXRpb24gIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gYXR0cmliO1xuICAgIH1cblxuICAgIGF0dHJpYi5uYW1lID0gbmFtZTtcbiAgICBhdHRyaWIubG9jYXRpb24gPSB0aGlzLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgbmFtZSk7XG5cbiAgICAvLyB2YXIgaW5mbyA9IHRoaXMuZ2wuZ2V0QWN0aXZlQXR0cmliKHRoaXMucHJvZ3JhbSwgYXR0cmliLmxvY2F0aW9uKTtcbiAgICAvLyBhdHRyaWIudHlwZSA9IGluZm8udHlwZTtcbiAgICAvLyBhdHRyaWIuc2l6ZSA9IGluZm8uc2l6ZTtcblxuICAgIHJldHVybiBhdHRyaWI7XG59O1xuXG5pZiAobW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEdMUHJvZ3JhbTtcbn1cbiIsIi8vIEdlbmVyYXRlZCBmcm9tIEdMU0wgZmlsZXMsIGRvbid0IGVkaXQhXG52YXIgc2hhZGVyX3NvdXJjZXMgPSB7fTtcblxuc2hhZGVyX3NvdXJjZXNbJ3BvaW50X2ZyYWdtZW50J10gPVxuXCJcXG5cIiArXG5cIiNkZWZpbmUgR0xTTElGWSAxXFxuXCIgK1xuXCJcXG5cIiArXG5cInVuaWZvcm0gdmVjMiB1X3Jlc29sdXRpb247XFxuXCIgK1xuXCJ2YXJ5aW5nIHZlYzMgdl9jb2xvcjtcXG5cIiArXG5cInZhcnlpbmcgdmVjMiB2X3RleGNvb3JkO1xcblwiICtcblwidm9pZCBtYWluKHZvaWQpIHtcXG5cIiArXG5cIiAgdmVjMyBjb2xvciA9IHZfY29sb3I7XFxuXCIgK1xuXCIgIHZlYzMgbGlnaHRpbmcgPSB2ZWMzKDEuKTtcXG5cIiArXG5cIiAgZmxvYXQgbGVuID0gbGVuZ3RoKHZfdGV4Y29vcmQpO1xcblwiICtcblwiICBpZihsZW4gPiAxLikge1xcblwiICtcblwiICAgIGRpc2NhcmQ7XFxuXCIgK1xuXCIgIH1cXG5cIiArXG5cIiAgY29sb3IgKj0gKDEuIC0gc21vb3Roc3RlcCguMjUsIDEuLCBsZW4pKSArIDAuNTtcXG5cIiArXG5cIiAgI3ByYWdtYSB0YW5ncmFtOiBmcmFnbWVudFxcblwiICtcblwiICBnbF9GcmFnQ29sb3IgPSB2ZWM0KGNvbG9yLCAxLik7XFxuXCIgK1xuXCJ9XFxuXCIgK1xuXCJcIjtcblxuc2hhZGVyX3NvdXJjZXNbJ3BvaW50X3ZlcnRleCddID1cblwiXFxuXCIgK1xuXCIjZGVmaW5lIEdMU0xJRlkgMVxcblwiICtcblwiXFxuXCIgK1xuXCJ1bmlmb3JtIG1hdDQgdV90aWxlX3ZpZXc7XFxuXCIgK1xuXCJ1bmlmb3JtIG1hdDQgdV9tZXRlcl92aWV3O1xcblwiICtcblwidW5pZm9ybSBmbG9hdCB1X251bV9sYXllcnM7XFxuXCIgK1xuXCJhdHRyaWJ1dGUgdmVjMyBhX3Bvc2l0aW9uO1xcblwiICtcblwiYXR0cmlidXRlIHZlYzIgYV90ZXhjb29yZDtcXG5cIiArXG5cImF0dHJpYnV0ZSB2ZWMzIGFfY29sb3I7XFxuXCIgK1xuXCJhdHRyaWJ1dGUgZmxvYXQgYV9sYXllcjtcXG5cIiArXG5cInZhcnlpbmcgdmVjMyB2X2NvbG9yO1xcblwiICtcblwidmFyeWluZyB2ZWMyIHZfdGV4Y29vcmQ7XFxuXCIgK1xuXCIjaWYgZGVmaW5lZChGRUFUVVJFX1NFTEVDVElPTilcXG5cIiArXG5cIlxcblwiICtcblwiYXR0cmlidXRlIHZlYzQgYV9zZWxlY3Rpb25fY29sb3I7XFxuXCIgK1xuXCJ2YXJ5aW5nIHZlYzQgdl9zZWxlY3Rpb25fY29sb3I7XFxuXCIgK1xuXCIjZW5kaWZcXG5cIiArXG5cIlxcblwiICtcblwiZmxvYXQgYV94X2NhbGN1bGF0ZVooZmxvYXQgeiwgZmxvYXQgbGF5ZXIsIGNvbnN0IGZsb2F0IG51bV9sYXllcnMsIGNvbnN0IGZsb2F0IHpfbGF5ZXJfc2NhbGUpIHtcXG5cIiArXG5cIiAgZmxvYXQgel9sYXllcl9yYW5nZSA9IChudW1fbGF5ZXJzICsgMS4pICogel9sYXllcl9zY2FsZTtcXG5cIiArXG5cIiAgZmxvYXQgel9sYXllciA9IChsYXllciArIDEuKSAqIHpfbGF5ZXJfc2NhbGU7XFxuXCIgK1xuXCIgIHogPSB6X2xheWVyICsgY2xhbXAoeiwgMC4sIHpfbGF5ZXJfc2NhbGUpO1xcblwiICtcblwiICB6ID0gKHpfbGF5ZXJfcmFuZ2UgLSB6KSAvIHpfbGF5ZXJfcmFuZ2U7XFxuXCIgK1xuXCIgIHJldHVybiB6O1xcblwiICtcblwifVxcblwiICtcblwiI3ByYWdtYSB0YW5ncmFtOiBnbG9iYWxzXFxuXCIgK1xuXCJcXG5cIiArXG5cInZvaWQgbWFpbigpIHtcXG5cIiArXG5cIiAgXFxuXCIgK1xuXCIgICNpZiBkZWZpbmVkKEZFQVRVUkVfU0VMRUNUSU9OKVxcblwiICtcblwiICBpZihhX3NlbGVjdGlvbl9jb2xvci54eXogPT0gdmVjMygwLikpIHtcXG5cIiArXG5cIiAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoMC4pO1xcblwiICtcblwiICAgIHJldHVybjtcXG5cIiArXG5cIiAgfVxcblwiICtcblwiICB2X3NlbGVjdGlvbl9jb2xvciA9IGFfc2VsZWN0aW9uX2NvbG9yO1xcblwiICtcblwiICAjZW5kaWZcXG5cIiArXG5cIiAgdmVjNCBwb3NpdGlvbiA9IHVfbWV0ZXJfdmlldyAqIHVfdGlsZV92aWV3ICogdmVjNChhX3Bvc2l0aW9uLCAxLik7XFxuXCIgK1xuXCIgICNwcmFnbWEgdGFuZ3JhbTogdmVydGV4XFxuXCIgK1xuXCIgIHZfY29sb3IgPSBhX2NvbG9yO1xcblwiICtcblwiICB2X3RleGNvb3JkID0gYV90ZXhjb29yZDtcXG5cIiArXG5cIiAgcG9zaXRpb24ueiA9IGFfeF9jYWxjdWxhdGVaKHBvc2l0aW9uLnosIGFfbGF5ZXIsIHVfbnVtX2xheWVycywgMjU2Lik7XFxuXCIgK1xuXCIgIGdsX1Bvc2l0aW9uID0gcG9zaXRpb247XFxuXCIgK1xuXCJ9XFxuXCIgK1xuXCJcIjtcblxuc2hhZGVyX3NvdXJjZXNbJ3BvbHlnb25fZnJhZ21lbnQnXSA9XG5cIlxcblwiICtcblwiI2RlZmluZSBHTFNMSUZZIDFcXG5cIiArXG5cIlxcblwiICtcblwidW5pZm9ybSB2ZWMyIHVfcmVzb2x1dGlvbjtcXG5cIiArXG5cInVuaWZvcm0gdmVjMiB1X2FzcGVjdDtcXG5cIiArXG5cInVuaWZvcm0gbWF0NCB1X21ldGVyX3ZpZXc7XFxuXCIgK1xuXCJ1bmlmb3JtIGZsb2F0IHVfbWV0ZXJzX3Blcl9waXhlbDtcXG5cIiArXG5cInVuaWZvcm0gZmxvYXQgdV90aW1lO1xcblwiICtcblwidW5pZm9ybSBmbG9hdCB1X21hcF96b29tO1xcblwiICtcblwidW5pZm9ybSB2ZWMyIHVfbWFwX2NlbnRlcjtcXG5cIiArXG5cInVuaWZvcm0gdmVjMiB1X3RpbGVfb3JpZ2luO1xcblwiICtcblwidW5pZm9ybSBmbG9hdCB1X3Rlc3Q7XFxuXCIgK1xuXCJ1bmlmb3JtIGZsb2F0IHVfdGVzdDI7XFxuXCIgK1xuXCJ2YXJ5aW5nIHZlYzMgdl9jb2xvcjtcXG5cIiArXG5cInZhcnlpbmcgdmVjNCB2X3dvcmxkX3Bvc2l0aW9uO1xcblwiICtcblwiI2lmIGRlZmluZWQoV09STERfUE9TSVRJT05fV1JBUClcXG5cIiArXG5cIlxcblwiICtcblwidmVjMiB3b3JsZF9wb3NpdGlvbl9hbmNob3IgPSB2ZWMyKGZsb29yKHVfdGlsZV9vcmlnaW4gLyBXT1JMRF9QT1NJVElPTl9XUkFQKSAqIFdPUkxEX1BPU0lUSU9OX1dSQVApO1xcblwiICtcblwidmVjNCBhYnNvbHV0ZVdvcmxkUG9zaXRpb24oKSB7XFxuXCIgK1xuXCIgIHJldHVybiB2ZWM0KHZfd29ybGRfcG9zaXRpb24ueHkgKyB3b3JsZF9wb3NpdGlvbl9hbmNob3IsIHZfd29ybGRfcG9zaXRpb24ueiwgdl93b3JsZF9wb3NpdGlvbi53KTtcXG5cIiArXG5cIn1cXG5cIiArXG5cIiNlbHNlXFxuXCIgK1xuXCJcXG5cIiArXG5cInZlYzQgYWJzb2x1dGVXb3JsZFBvc2l0aW9uKCkge1xcblwiICtcblwiICByZXR1cm4gdl93b3JsZF9wb3NpdGlvbjtcXG5cIiArXG5cIn1cXG5cIiArXG5cIiNlbmRpZlxcblwiICtcblwiXFxuXCIgK1xuXCIjaWYgZGVmaW5lZChMSUdIVElOR19FTlZJUk9OTUVOVClcXG5cIiArXG5cIlxcblwiICtcblwidW5pZm9ybSBzYW1wbGVyMkQgdV9lbnZfbWFwO1xcblwiICtcblwiI2VuZGlmXFxuXCIgK1xuXCJcXG5cIiArXG5cIiNpZiAhZGVmaW5lZChMSUdIVElOR19WRVJURVgpXFxuXCIgK1xuXCJcXG5cIiArXG5cInZhcnlpbmcgdmVjNCB2X3Bvc2l0aW9uO1xcblwiICtcblwidmFyeWluZyB2ZWMzIHZfbm9ybWFsO1xcblwiICtcblwiI2Vsc2VcXG5cIiArXG5cIlxcblwiICtcblwidmFyeWluZyB2ZWMzIHZfbGlnaHRpbmc7XFxuXCIgK1xuXCIjZW5kaWZcXG5cIiArXG5cIlxcblwiICtcblwiY29uc3QgZmxvYXQgbGlnaHRfYW1iaWVudCA9IDAuNTtcXG5cIiArXG5cInZlYzMgYl94X3BvaW50TGlnaHQodmVjNCBwb3NpdGlvbiwgdmVjMyBub3JtYWwsIHZlYzMgY29sb3IsIHZlYzQgbGlnaHRfcG9zLCBmbG9hdCBsaWdodF9hbWJpZW50LCBjb25zdCBib29sIGJhY2tsaWdodCkge1xcblwiICtcblwiICB2ZWMzIGxpZ2h0X2RpciA9IG5vcm1hbGl6ZShwb3NpdGlvbi54eXogLSBsaWdodF9wb3MueHl6KTtcXG5cIiArXG5cIiAgY29sb3IgKj0gYWJzKG1heChmbG9hdChiYWNrbGlnaHQpICogLTEuLCBkb3Qobm9ybWFsLCBsaWdodF9kaXIgKiAtMS4wKSkpICsgbGlnaHRfYW1iaWVudDtcXG5cIiArXG5cIiAgcmV0dXJuIGNvbG9yO1xcblwiICtcblwifVxcblwiICtcblwidmVjMyBjX3hfc3BlY3VsYXJMaWdodCh2ZWM0IHBvc2l0aW9uLCB2ZWMzIG5vcm1hbCwgdmVjMyBjb2xvciwgdmVjNCBsaWdodF9wb3MsIGZsb2F0IGxpZ2h0X2FtYmllbnQsIGNvbnN0IGJvb2wgYmFja2xpZ2h0KSB7XFxuXCIgK1xuXCIgIHZlYzMgbGlnaHRfZGlyID0gbm9ybWFsaXplKHBvc2l0aW9uLnh5eiAtIGxpZ2h0X3Bvcy54eXopO1xcblwiICtcblwiICB2ZWMzIHZpZXdfcG9zID0gdmVjMygwLiwgMC4sIDUwMC4pO1xcblwiICtcblwiICB2ZWMzIHZpZXdfZGlyID0gbm9ybWFsaXplKHBvc2l0aW9uLnh5eiAtIHZpZXdfcG9zLnh5eik7XFxuXCIgK1xuXCIgIHZlYzMgc3BlY3VsYXJSZWZsZWN0aW9uO1xcblwiICtcblwiICBpZihkb3Qobm9ybWFsLCAtbGlnaHRfZGlyKSA8IDAuMCkge1xcblwiICtcblwiICAgIHNwZWN1bGFyUmVmbGVjdGlvbiA9IHZlYzMoMC4wLCAwLjAsIDAuMCk7XFxuXCIgK1xuXCIgIH0gZWxzZSB7XFxuXCIgK1xuXCIgICAgZmxvYXQgYXR0ZW51YXRpb24gPSAxLjA7XFxuXCIgK1xuXCIgICAgZmxvYXQgbGlnaHRTcGVjdWxhclRlcm0gPSAxLjA7XFxuXCIgK1xuXCIgICAgZmxvYXQgbWF0ZXJpYWxTcGVjdWxhclRlcm0gPSAxMC4wO1xcblwiICtcblwiICAgIGZsb2F0IG1hdGVyaWFsU2hpbmluZXNzVGVybSA9IDEwLjA7XFxuXCIgK1xuXCIgICAgc3BlY3VsYXJSZWZsZWN0aW9uID0gYXR0ZW51YXRpb24gKiB2ZWMzKGxpZ2h0U3BlY3VsYXJUZXJtKSAqIHZlYzMobWF0ZXJpYWxTcGVjdWxhclRlcm0pICogcG93KG1heCgwLjAsIGRvdChyZWZsZWN0KC1saWdodF9kaXIsIG5vcm1hbCksIHZpZXdfZGlyKSksIG1hdGVyaWFsU2hpbmluZXNzVGVybSk7XFxuXCIgK1xuXCIgIH1cXG5cIiArXG5cIiAgZmxvYXQgZGlmZnVzZSA9IGFicyhtYXgoZmxvYXQoYmFja2xpZ2h0KSAqIC0xLiwgZG90KG5vcm1hbCwgbGlnaHRfZGlyICogLTEuMCkpKTtcXG5cIiArXG5cIiAgY29sb3IgKj0gZGlmZnVzZSArIHNwZWN1bGFyUmVmbGVjdGlvbiArIGxpZ2h0X2FtYmllbnQ7XFxuXCIgK1xuXCIgIHJldHVybiBjb2xvcjtcXG5cIiArXG5cIn1cXG5cIiArXG5cInZlYzMgZF94X2RpcmVjdGlvbmFsTGlnaHQodmVjMyBub3JtYWwsIHZlYzMgY29sb3IsIHZlYzMgbGlnaHRfZGlyLCBmbG9hdCBsaWdodF9hbWJpZW50KSB7XFxuXCIgK1xuXCIgIGxpZ2h0X2RpciA9IG5vcm1hbGl6ZShsaWdodF9kaXIpO1xcblwiICtcblwiICBjb2xvciAqPSBkb3Qobm9ybWFsLCBsaWdodF9kaXIgKiAtMS4wKSArIGxpZ2h0X2FtYmllbnQ7XFxuXCIgK1xuXCIgIHJldHVybiBjb2xvcjtcXG5cIiArXG5cIn1cXG5cIiArXG5cInZlYzMgYV94X2xpZ2h0aW5nKHZlYzQgcG9zaXRpb24sIHZlYzMgbm9ybWFsLCB2ZWMzIGNvbG9yLCB2ZWM0IGxpZ2h0X3BvcywgdmVjNCBuaWdodF9saWdodF9wb3MsIHZlYzMgbGlnaHRfZGlyLCBmbG9hdCBsaWdodF9hbWJpZW50KSB7XFxuXCIgK1xuXCIgIFxcblwiICtcblwiICAjaWYgZGVmaW5lZChMSUdIVElOR19QT0lOVClcXG5cIiArXG5cIiAgY29sb3IgPSBiX3hfcG9pbnRMaWdodChwb3NpdGlvbiwgbm9ybWFsLCBjb2xvciwgbGlnaHRfcG9zLCBsaWdodF9hbWJpZW50LCB0cnVlKTtcXG5cIiArXG5cIiAgI2VsaWYgZGVmaW5lZChMSUdIVElOR19QT0lOVF9TUEVDVUxBUilcXG5cIiArXG5cIiAgY29sb3IgPSBjX3hfc3BlY3VsYXJMaWdodChwb3NpdGlvbiwgbm9ybWFsLCBjb2xvciwgbGlnaHRfcG9zLCBsaWdodF9hbWJpZW50LCB0cnVlKTtcXG5cIiArXG5cIiAgI2VsaWYgZGVmaW5lZChMSUdIVElOR19OSUdIVClcXG5cIiArXG5cIiAgY29sb3IgPSBiX3hfcG9pbnRMaWdodChwb3NpdGlvbiwgbm9ybWFsLCBjb2xvciwgbmlnaHRfbGlnaHRfcG9zLCAwLiwgZmFsc2UpO1xcblwiICtcblwiICAjZWxpZiBkZWZpbmVkKExJR0hUSU5HX0RJUkVDVElPTilcXG5cIiArXG5cIiAgY29sb3IgPSBkX3hfZGlyZWN0aW9uYWxMaWdodChub3JtYWwsIGNvbG9yLCBsaWdodF9kaXIsIGxpZ2h0X2FtYmllbnQpO1xcblwiICtcblwiICAjZWxzZVxcblwiICtcblwiICBjb2xvciA9IGNvbG9yO1xcblwiICtcblwiICAjZW5kaWZcXG5cIiArXG5cIiAgcmV0dXJuIGNvbG9yO1xcblwiICtcblwifVxcblwiICtcblwidmVjNCBlX3hfc3BoZXJpY2FsRW52aXJvbm1lbnRNYXAodmVjMyB2aWV3X3BvcywgdmVjMyBwb3NpdGlvbiwgdmVjMyBub3JtYWwsIHNhbXBsZXIyRCBlbnZtYXApIHtcXG5cIiArXG5cIiAgdmVjMyBleWUgPSBub3JtYWxpemUocG9zaXRpb24ueHl6IC0gdmlld19wb3MueHl6KTtcXG5cIiArXG5cIiAgaWYoZXllLnogPiAwLjAxKSB7XFxuXCIgK1xuXCIgICAgZXllLnogPSAwLjAxO1xcblwiICtcblwiICB9XFxuXCIgK1xuXCIgIHZlYzMgciA9IHJlZmxlY3QoZXllLCBub3JtYWwpO1xcblwiICtcblwiICBmbG9hdCBtID0gMi4gKiBzcXJ0KHBvdyhyLngsIDIuKSArIHBvdyhyLnksIDIuKSArIHBvdyhyLnogKyAxLiwgMi4pKTtcXG5cIiArXG5cIiAgdmVjMiB1diA9IHIueHkgLyBtICsgLjU7XFxuXCIgK1xuXCIgIHJldHVybiB0ZXh0dXJlMkQoZW52bWFwLCB1dik7XFxuXCIgK1xuXCJ9XFxuXCIgK1xuXCIjcHJhZ21hIHRhbmdyYW06IGdsb2JhbHNcXG5cIiArXG5cIlxcblwiICtcblwidm9pZCBtYWluKHZvaWQpIHtcXG5cIiArXG5cIiAgdmVjMyBjb2xvciA9IHZfY29sb3I7XFxuXCIgK1xuXCIgICNpZiBkZWZpbmVkKExJR0hUSU5HX0VOVklST05NRU5UKVxcblwiICtcblwiICB2ZWMzIHZpZXdfcG9zID0gdmVjMygwLiwgMC4sIDEwMC4gKiB1X21ldGVyc19wZXJfcGl4ZWwpO1xcblwiICtcblwiICBjb2xvciA9IGVfeF9zcGhlcmljYWxFbnZpcm9ubWVudE1hcCh2aWV3X3Bvcywgdl9wb3NpdGlvbi54eXosIHZfbm9ybWFsLCB1X2Vudl9tYXApLnJnYjtcXG5cIiArXG5cIiAgI2VuZGlmXFxuXCIgK1xuXCIgIFxcblwiICtcblwiICAjaWYgIWRlZmluZWQoTElHSFRJTkdfVkVSVEVYKSAvLyBkZWZhdWx0IHRvIHBlci1waXhlbCBsaWdodGluZ1xcblwiICtcblwiICB2ZWMzIGxpZ2h0aW5nID0gYV94X2xpZ2h0aW5nKHZfcG9zaXRpb24sIHZfbm9ybWFsLCB2ZWMzKDEuKSwgdmVjNCgwLiwgMC4sIDE1MC4gKiB1X21ldGVyc19wZXJfcGl4ZWwsIDEuKSwgdmVjNCgwLiwgMC4sIDUwLiAqIHVfbWV0ZXJzX3Blcl9waXhlbCwgMS4pLCB2ZWMzKDAuMiwgMC43LCAtMC41KSwgbGlnaHRfYW1iaWVudCk7XFxuXCIgK1xuXCIgICNlbHNlXFxuXCIgK1xuXCIgIHZlYzMgbGlnaHRpbmcgPSB2X2xpZ2h0aW5nO1xcblwiICtcblwiICAjZW5kaWZcXG5cIiArXG5cIiAgdmVjMyBjb2xvcl9wcmVsaWdodCA9IGNvbG9yO1xcblwiICtcblwiICBjb2xvciAqPSBsaWdodGluZztcXG5cIiArXG5cIiAgI3ByYWdtYSB0YW5ncmFtOiBmcmFnbWVudFxcblwiICtcblwiICBnbF9GcmFnQ29sb3IgPSB2ZWM0KGNvbG9yLCAxLjApO1xcblwiICtcblwifVxcblwiICtcblwiXCI7XG5cbnNoYWRlcl9zb3VyY2VzWydwb2x5Z29uX3ZlcnRleCddID1cblwiXFxuXCIgK1xuXCIjZGVmaW5lIEdMU0xJRlkgMVxcblwiICtcblwiXFxuXCIgK1xuXCJ1bmlmb3JtIHZlYzIgdV9yZXNvbHV0aW9uO1xcblwiICtcblwidW5pZm9ybSB2ZWMyIHVfYXNwZWN0O1xcblwiICtcblwidW5pZm9ybSBmbG9hdCB1X3RpbWU7XFxuXCIgK1xuXCJ1bmlmb3JtIGZsb2F0IHVfbWFwX3pvb207XFxuXCIgK1xuXCJ1bmlmb3JtIHZlYzIgdV9tYXBfY2VudGVyO1xcblwiICtcblwidW5pZm9ybSB2ZWMyIHVfdGlsZV9vcmlnaW47XFxuXCIgK1xuXCJ1bmlmb3JtIG1hdDQgdV90aWxlX3dvcmxkO1xcblwiICtcblwidW5pZm9ybSBtYXQ0IHVfdGlsZV92aWV3O1xcblwiICtcblwidW5pZm9ybSBtYXQ0IHVfbWV0ZXJfdmlldztcXG5cIiArXG5cInVuaWZvcm0gZmxvYXQgdV9tZXRlcnNfcGVyX3BpeGVsO1xcblwiICtcblwidW5pZm9ybSBmbG9hdCB1X251bV9sYXllcnM7XFxuXCIgK1xuXCJhdHRyaWJ1dGUgdmVjMyBhX3Bvc2l0aW9uO1xcblwiICtcblwiYXR0cmlidXRlIHZlYzMgYV9ub3JtYWw7XFxuXCIgK1xuXCJhdHRyaWJ1dGUgdmVjMyBhX2NvbG9yO1xcblwiICtcblwiYXR0cmlidXRlIGZsb2F0IGFfbGF5ZXI7XFxuXCIgK1xuXCJ2YXJ5aW5nIHZlYzQgdl93b3JsZF9wb3NpdGlvbjtcXG5cIiArXG5cInZhcnlpbmcgdmVjMyB2X2NvbG9yO1xcblwiICtcblwiI2lmIGRlZmluZWQoV09STERfUE9TSVRJT05fV1JBUClcXG5cIiArXG5cIlxcblwiICtcblwidmVjMiB3b3JsZF9wb3NpdGlvbl9hbmNob3IgPSB2ZWMyKGZsb29yKHVfdGlsZV9vcmlnaW4gLyBXT1JMRF9QT1NJVElPTl9XUkFQKSAqIFdPUkxEX1BPU0lUSU9OX1dSQVApO1xcblwiICtcblwidmVjNCBhYnNvbHV0ZVdvcmxkUG9zaXRpb24oKSB7XFxuXCIgK1xuXCIgIHJldHVybiB2ZWM0KHZfd29ybGRfcG9zaXRpb24ueHkgKyB3b3JsZF9wb3NpdGlvbl9hbmNob3IsIHZfd29ybGRfcG9zaXRpb24ueiwgdl93b3JsZF9wb3NpdGlvbi53KTtcXG5cIiArXG5cIn1cXG5cIiArXG5cIiNlbHNlXFxuXCIgK1xuXCJcXG5cIiArXG5cInZlYzQgYWJzb2x1dGVXb3JsZFBvc2l0aW9uKCkge1xcblwiICtcblwiICByZXR1cm4gdl93b3JsZF9wb3NpdGlvbjtcXG5cIiArXG5cIn1cXG5cIiArXG5cIiNlbmRpZlxcblwiICtcblwiXFxuXCIgK1xuXCIjaWYgZGVmaW5lZChGRUFUVVJFX1NFTEVDVElPTilcXG5cIiArXG5cIlxcblwiICtcblwiYXR0cmlidXRlIHZlYzQgYV9zZWxlY3Rpb25fY29sb3I7XFxuXCIgK1xuXCJ2YXJ5aW5nIHZlYzQgdl9zZWxlY3Rpb25fY29sb3I7XFxuXCIgK1xuXCIjZW5kaWZcXG5cIiArXG5cIlxcblwiICtcblwiI2lmICFkZWZpbmVkKExJR0hUSU5HX1ZFUlRFWClcXG5cIiArXG5cIlxcblwiICtcblwidmFyeWluZyB2ZWM0IHZfcG9zaXRpb247XFxuXCIgK1xuXCJ2YXJ5aW5nIHZlYzMgdl9ub3JtYWw7XFxuXCIgK1xuXCIjZWxzZVxcblwiICtcblwiXFxuXCIgK1xuXCJ2YXJ5aW5nIHZlYzMgdl9saWdodGluZztcXG5cIiArXG5cIiNlbmRpZlxcblwiICtcblwiXFxuXCIgK1xuXCJjb25zdCBmbG9hdCBsaWdodF9hbWJpZW50ID0gMC41O1xcblwiICtcblwidmVjNCBhX3hfcGVyc3BlY3RpdmUodmVjNCBwb3NpdGlvbiwgY29uc3QgdmVjMiBwZXJzcGVjdGl2ZV9vZmZzZXQsIGNvbnN0IHZlYzIgcGVyc3BlY3RpdmVfZmFjdG9yKSB7XFxuXCIgK1xuXCIgIHBvc2l0aW9uLnh5ICs9IHBvc2l0aW9uLnogKiBwZXJzcGVjdGl2ZV9mYWN0b3IgKiAocG9zaXRpb24ueHkgLSBwZXJzcGVjdGl2ZV9vZmZzZXQpO1xcblwiICtcblwiICByZXR1cm4gcG9zaXRpb247XFxuXCIgK1xuXCJ9XFxuXCIgK1xuXCJ2ZWM0IGJfeF9pc29tZXRyaWModmVjNCBwb3NpdGlvbiwgY29uc3QgdmVjMiBheGlzLCBjb25zdCBmbG9hdCBtdWx0aXBsaWVyKSB7XFxuXCIgK1xuXCIgIHBvc2l0aW9uLnh5ICs9IHBvc2l0aW9uLnogKiBheGlzICogbXVsdGlwbGllciAvIHVfYXNwZWN0O1xcblwiICtcblwiICByZXR1cm4gcG9zaXRpb247XFxuXCIgK1xuXCJ9XFxuXCIgK1xuXCJmbG9hdCBjX3hfY2FsY3VsYXRlWihmbG9hdCB6LCBmbG9hdCBsYXllciwgY29uc3QgZmxvYXQgbnVtX2xheWVycywgY29uc3QgZmxvYXQgel9sYXllcl9zY2FsZSkge1xcblwiICtcblwiICBmbG9hdCB6X2xheWVyX3JhbmdlID0gKG51bV9sYXllcnMgKyAxLikgKiB6X2xheWVyX3NjYWxlO1xcblwiICtcblwiICBmbG9hdCB6X2xheWVyID0gKGxheWVyICsgMS4pICogel9sYXllcl9zY2FsZTtcXG5cIiArXG5cIiAgeiA9IHpfbGF5ZXIgKyBjbGFtcCh6LCAwLiwgel9sYXllcl9zY2FsZSk7XFxuXCIgK1xuXCIgIHogPSAoel9sYXllcl9yYW5nZSAtIHopIC8gel9sYXllcl9yYW5nZTtcXG5cIiArXG5cIiAgcmV0dXJuIHo7XFxuXCIgK1xuXCJ9XFxuXCIgK1xuXCJ2ZWMzIGVfeF9wb2ludExpZ2h0KHZlYzQgcG9zaXRpb24sIHZlYzMgbm9ybWFsLCB2ZWMzIGNvbG9yLCB2ZWM0IGxpZ2h0X3BvcywgZmxvYXQgbGlnaHRfYW1iaWVudCwgY29uc3QgYm9vbCBiYWNrbGlnaHQpIHtcXG5cIiArXG5cIiAgdmVjMyBsaWdodF9kaXIgPSBub3JtYWxpemUocG9zaXRpb24ueHl6IC0gbGlnaHRfcG9zLnh5eik7XFxuXCIgK1xuXCIgIGNvbG9yICo9IGFicyhtYXgoZmxvYXQoYmFja2xpZ2h0KSAqIC0xLiwgZG90KG5vcm1hbCwgbGlnaHRfZGlyICogLTEuMCkpKSArIGxpZ2h0X2FtYmllbnQ7XFxuXCIgK1xuXCIgIHJldHVybiBjb2xvcjtcXG5cIiArXG5cIn1cXG5cIiArXG5cInZlYzMgZl94X3NwZWN1bGFyTGlnaHQodmVjNCBwb3NpdGlvbiwgdmVjMyBub3JtYWwsIHZlYzMgY29sb3IsIHZlYzQgbGlnaHRfcG9zLCBmbG9hdCBsaWdodF9hbWJpZW50LCBjb25zdCBib29sIGJhY2tsaWdodCkge1xcblwiICtcblwiICB2ZWMzIGxpZ2h0X2RpciA9IG5vcm1hbGl6ZShwb3NpdGlvbi54eXogLSBsaWdodF9wb3MueHl6KTtcXG5cIiArXG5cIiAgdmVjMyB2aWV3X3BvcyA9IHZlYzMoMC4sIDAuLCA1MDAuKTtcXG5cIiArXG5cIiAgdmVjMyB2aWV3X2RpciA9IG5vcm1hbGl6ZShwb3NpdGlvbi54eXogLSB2aWV3X3Bvcy54eXopO1xcblwiICtcblwiICB2ZWMzIHNwZWN1bGFyUmVmbGVjdGlvbjtcXG5cIiArXG5cIiAgaWYoZG90KG5vcm1hbCwgLWxpZ2h0X2RpcikgPCAwLjApIHtcXG5cIiArXG5cIiAgICBzcGVjdWxhclJlZmxlY3Rpb24gPSB2ZWMzKDAuMCwgMC4wLCAwLjApO1xcblwiICtcblwiICB9IGVsc2Uge1xcblwiICtcblwiICAgIGZsb2F0IGF0dGVudWF0aW9uID0gMS4wO1xcblwiICtcblwiICAgIGZsb2F0IGxpZ2h0U3BlY3VsYXJUZXJtID0gMS4wO1xcblwiICtcblwiICAgIGZsb2F0IG1hdGVyaWFsU3BlY3VsYXJUZXJtID0gMTAuMDtcXG5cIiArXG5cIiAgICBmbG9hdCBtYXRlcmlhbFNoaW5pbmVzc1Rlcm0gPSAxMC4wO1xcblwiICtcblwiICAgIHNwZWN1bGFyUmVmbGVjdGlvbiA9IGF0dGVudWF0aW9uICogdmVjMyhsaWdodFNwZWN1bGFyVGVybSkgKiB2ZWMzKG1hdGVyaWFsU3BlY3VsYXJUZXJtKSAqIHBvdyhtYXgoMC4wLCBkb3QocmVmbGVjdCgtbGlnaHRfZGlyLCBub3JtYWwpLCB2aWV3X2RpcikpLCBtYXRlcmlhbFNoaW5pbmVzc1Rlcm0pO1xcblwiICtcblwiICB9XFxuXCIgK1xuXCIgIGZsb2F0IGRpZmZ1c2UgPSBhYnMobWF4KGZsb2F0KGJhY2tsaWdodCkgKiAtMS4sIGRvdChub3JtYWwsIGxpZ2h0X2RpciAqIC0xLjApKSk7XFxuXCIgK1xuXCIgIGNvbG9yICo9IGRpZmZ1c2UgKyBzcGVjdWxhclJlZmxlY3Rpb24gKyBsaWdodF9hbWJpZW50O1xcblwiICtcblwiICByZXR1cm4gY29sb3I7XFxuXCIgK1xuXCJ9XFxuXCIgK1xuXCJ2ZWMzIGdfeF9kaXJlY3Rpb25hbExpZ2h0KHZlYzMgbm9ybWFsLCB2ZWMzIGNvbG9yLCB2ZWMzIGxpZ2h0X2RpciwgZmxvYXQgbGlnaHRfYW1iaWVudCkge1xcblwiICtcblwiICBsaWdodF9kaXIgPSBub3JtYWxpemUobGlnaHRfZGlyKTtcXG5cIiArXG5cIiAgY29sb3IgKj0gZG90KG5vcm1hbCwgbGlnaHRfZGlyICogLTEuMCkgKyBsaWdodF9hbWJpZW50O1xcblwiICtcblwiICByZXR1cm4gY29sb3I7XFxuXCIgK1xuXCJ9XFxuXCIgK1xuXCJ2ZWMzIGRfeF9saWdodGluZyh2ZWM0IHBvc2l0aW9uLCB2ZWMzIG5vcm1hbCwgdmVjMyBjb2xvciwgdmVjNCBsaWdodF9wb3MsIHZlYzQgbmlnaHRfbGlnaHRfcG9zLCB2ZWMzIGxpZ2h0X2RpciwgZmxvYXQgbGlnaHRfYW1iaWVudCkge1xcblwiICtcblwiICBcXG5cIiArXG5cIiAgI2lmIGRlZmluZWQoTElHSFRJTkdfUE9JTlQpXFxuXCIgK1xuXCIgIGNvbG9yID0gZV94X3BvaW50TGlnaHQocG9zaXRpb24sIG5vcm1hbCwgY29sb3IsIGxpZ2h0X3BvcywgbGlnaHRfYW1iaWVudCwgdHJ1ZSk7XFxuXCIgK1xuXCIgICNlbGlmIGRlZmluZWQoTElHSFRJTkdfUE9JTlRfU1BFQ1VMQVIpXFxuXCIgK1xuXCIgIGNvbG9yID0gZl94X3NwZWN1bGFyTGlnaHQocG9zaXRpb24sIG5vcm1hbCwgY29sb3IsIGxpZ2h0X3BvcywgbGlnaHRfYW1iaWVudCwgdHJ1ZSk7XFxuXCIgK1xuXCIgICNlbGlmIGRlZmluZWQoTElHSFRJTkdfTklHSFQpXFxuXCIgK1xuXCIgIGNvbG9yID0gZV94X3BvaW50TGlnaHQocG9zaXRpb24sIG5vcm1hbCwgY29sb3IsIG5pZ2h0X2xpZ2h0X3BvcywgMC4sIGZhbHNlKTtcXG5cIiArXG5cIiAgI2VsaWYgZGVmaW5lZChMSUdIVElOR19ESVJFQ1RJT04pXFxuXCIgK1xuXCIgIGNvbG9yID0gZ194X2RpcmVjdGlvbmFsTGlnaHQobm9ybWFsLCBjb2xvciwgbGlnaHRfZGlyLCBsaWdodF9hbWJpZW50KTtcXG5cIiArXG5cIiAgI2Vsc2VcXG5cIiArXG5cIiAgY29sb3IgPSBjb2xvcjtcXG5cIiArXG5cIiAgI2VuZGlmXFxuXCIgK1xuXCIgIHJldHVybiBjb2xvcjtcXG5cIiArXG5cIn1cXG5cIiArXG5cIiNwcmFnbWEgdGFuZ3JhbTogZ2xvYmFsc1xcblwiICtcblwiXFxuXCIgK1xuXCJ2b2lkIG1haW4oKSB7XFxuXCIgK1xuXCIgIFxcblwiICtcblwiICAjaWYgZGVmaW5lZChGRUFUVVJFX1NFTEVDVElPTilcXG5cIiArXG5cIiAgaWYoYV9zZWxlY3Rpb25fY29sb3IueHl6ID09IHZlYzMoMC4pKSB7XFxuXCIgK1xuXCIgICAgZ2xfUG9zaXRpb24gPSB2ZWM0KDAuKTtcXG5cIiArXG5cIiAgICByZXR1cm47XFxuXCIgK1xuXCIgIH1cXG5cIiArXG5cIiAgdl9zZWxlY3Rpb25fY29sb3IgPSBhX3NlbGVjdGlvbl9jb2xvcjtcXG5cIiArXG5cIiAgI2VuZGlmXFxuXCIgK1xuXCIgIHZlYzQgcG9zaXRpb24gPSB1X3RpbGVfdmlldyAqIHZlYzQoYV9wb3NpdGlvbiwgMS4pO1xcblwiICtcblwiICB2X3dvcmxkX3Bvc2l0aW9uID0gdV90aWxlX3dvcmxkICogdmVjNChhX3Bvc2l0aW9uLCAxLik7XFxuXCIgK1xuXCIgICNpZiBkZWZpbmVkKFdPUkxEX1BPU0lUSU9OX1dSQVApXFxuXCIgK1xuXCIgIHZfd29ybGRfcG9zaXRpb24ueHkgLT0gd29ybGRfcG9zaXRpb25fYW5jaG9yO1xcblwiICtcblwiICAjZW5kaWZcXG5cIiArXG5cIiAgXFxuXCIgK1xuXCIgICNwcmFnbWEgdGFuZ3JhbTogdmVydGV4XFxuXCIgK1xuXCIgIFxcblwiICtcblwiICAjaWYgZGVmaW5lZChMSUdIVElOR19WRVJURVgpXFxuXCIgK1xuXCIgIHZfY29sb3IgPSBhX2NvbG9yO1xcblwiICtcblwiICB2X2xpZ2h0aW5nID0gZF94X2xpZ2h0aW5nKHBvc2l0aW9uLCBhX25vcm1hbCwgdmVjMygxLiksIHZlYzQoMC4sIDAuLCAxNTAuICogdV9tZXRlcnNfcGVyX3BpeGVsLCAxLiksIHZlYzQoMC4sIDAuLCA1MC4gKiB1X21ldGVyc19wZXJfcGl4ZWwsIDEuKSwgdmVjMygwLjIsIDAuNywgLTAuNSksIGxpZ2h0X2FtYmllbnQpO1xcblwiICtcblwiICAjZWxzZVxcblwiICtcblwiICB2X3Bvc2l0aW9uID0gcG9zaXRpb247XFxuXCIgK1xuXCIgIHZfbm9ybWFsID0gYV9ub3JtYWw7XFxuXCIgK1xuXCIgIHZfY29sb3IgPSBhX2NvbG9yO1xcblwiICtcblwiICAjZW5kaWZcXG5cIiArXG5cIiAgcG9zaXRpb24gPSB1X21ldGVyX3ZpZXcgKiBwb3NpdGlvbjtcXG5cIiArXG5cIiAgI2lmIGRlZmluZWQoUFJPSkVDVElPTl9QRVJTUEVDVElWRSlcXG5cIiArXG5cIiAgcG9zaXRpb24gPSBhX3hfcGVyc3BlY3RpdmUocG9zaXRpb24sIHZlYzIoMC4sIDAuKSwgdmVjMigwLjYsIDAuNikpO1xcblwiICtcblwiICAjZWxpZiBkZWZpbmVkKFBST0pFQ1RJT05fSVNPTUVUUklDKSAvLyB8fCBkZWZpbmVkKFBST0pFQ1RJT05fUE9QVVApXFxuXCIgK1xuXCIgIHBvc2l0aW9uID0gYl94X2lzb21ldHJpYyhwb3NpdGlvbiwgdmVjMigwLiwgMS4pLCAxLik7XFxuXCIgK1xuXCIgICNlbmRpZlxcblwiICtcblwiICBwb3NpdGlvbi56ID0gY194X2NhbGN1bGF0ZVoocG9zaXRpb24ueiwgYV9sYXllciwgdV9udW1fbGF5ZXJzLCA0MDk2Lik7XFxuXCIgK1xuXCIgIGdsX1Bvc2l0aW9uID0gcG9zaXRpb247XFxuXCIgK1xuXCJ9XFxuXCIgK1xuXCJcIjtcblxuc2hhZGVyX3NvdXJjZXNbJ3NlbGVjdGlvbl9mcmFnbWVudCddID1cblwiXFxuXCIgK1xuXCIjZGVmaW5lIEdMU0xJRlkgMVxcblwiICtcblwiXFxuXCIgK1xuXCIjaWYgZGVmaW5lZChGRUFUVVJFX1NFTEVDVElPTilcXG5cIiArXG5cIlxcblwiICtcblwidmFyeWluZyB2ZWM0IHZfc2VsZWN0aW9uX2NvbG9yO1xcblwiICtcblwiI2VuZGlmXFxuXCIgK1xuXCJcXG5cIiArXG5cInZvaWQgbWFpbih2b2lkKSB7XFxuXCIgK1xuXCIgIFxcblwiICtcblwiICAjaWYgZGVmaW5lZChGRUFUVVJFX1NFTEVDVElPTilcXG5cIiArXG5cIiAgZ2xfRnJhZ0NvbG9yID0gdl9zZWxlY3Rpb25fY29sb3I7XFxuXCIgK1xuXCIgICNlbHNlXFxuXCIgK1xuXCIgIGdsX0ZyYWdDb2xvciA9IHZlYzMoMC4sIDAuLCAwLiwgMS4pO1xcblwiICtcblwiICAjZW5kaWZcXG5cIiArXG5cIiAgXFxuXCIgK1xuXCJ9XFxuXCIgK1xuXCJcIjtcblxuc2hhZGVyX3NvdXJjZXNbJ3NpbXBsZV9wb2x5Z29uX2ZyYWdtZW50J10gPVxuXCJcXG5cIiArXG5cIiNkZWZpbmUgR0xTTElGWSAxXFxuXCIgK1xuXCJcXG5cIiArXG5cInVuaWZvcm0gZmxvYXQgdV9tZXRlcnNfcGVyX3BpeGVsO1xcblwiICtcblwidmFyeWluZyB2ZWMzIHZfY29sb3I7XFxuXCIgK1xuXCIjaWYgIWRlZmluZWQoTElHSFRJTkdfVkVSVEVYKVxcblwiICtcblwiXFxuXCIgK1xuXCJ2YXJ5aW5nIHZlYzQgdl9wb3NpdGlvbjtcXG5cIiArXG5cInZhcnlpbmcgdmVjMyB2X25vcm1hbDtcXG5cIiArXG5cIiNlbmRpZlxcblwiICtcblwiXFxuXCIgK1xuXCJ2ZWMzIGFfeF9wb2ludExpZ2h0KHZlYzQgcG9zaXRpb24sIHZlYzMgbm9ybWFsLCB2ZWMzIGNvbG9yLCB2ZWM0IGxpZ2h0X3BvcywgZmxvYXQgbGlnaHRfYW1iaWVudCwgY29uc3QgYm9vbCBiYWNrbGlnaHQpIHtcXG5cIiArXG5cIiAgdmVjMyBsaWdodF9kaXIgPSBub3JtYWxpemUocG9zaXRpb24ueHl6IC0gbGlnaHRfcG9zLnh5eik7XFxuXCIgK1xuXCIgIGNvbG9yICo9IGFicyhtYXgoZmxvYXQoYmFja2xpZ2h0KSAqIC0xLiwgZG90KG5vcm1hbCwgbGlnaHRfZGlyICogLTEuMCkpKSArIGxpZ2h0X2FtYmllbnQ7XFxuXCIgK1xuXCIgIHJldHVybiBjb2xvcjtcXG5cIiArXG5cIn1cXG5cIiArXG5cIiNwcmFnbWEgdGFuZ3JhbTogZ2xvYmFsc1xcblwiICtcblwiXFxuXCIgK1xuXCJ2b2lkIG1haW4odm9pZCkge1xcblwiICtcblwiICB2ZWMzIGNvbG9yO1xcblwiICtcblwiICAjaWYgIWRlZmluZWQoTElHSFRJTkdfVkVSVEVYKSAvLyBkZWZhdWx0IHRvIHBlci1waXhlbCBsaWdodGluZ1xcblwiICtcblwiICB2ZWM0IGxpZ2h0X3BvcyA9IHZlYzQoMC4sIDAuLCAxNTAuICogdV9tZXRlcnNfcGVyX3BpeGVsLCAxLik7XFxuXCIgK1xuXCIgIGNvbnN0IGZsb2F0IGxpZ2h0X2FtYmllbnQgPSAwLjU7XFxuXCIgK1xuXCIgIGNvbnN0IGJvb2wgYmFja2xpdCA9IHRydWU7XFxuXCIgK1xuXCIgIGNvbG9yID0gYV94X3BvaW50TGlnaHQodl9wb3NpdGlvbiwgdl9ub3JtYWwsIHZfY29sb3IsIGxpZ2h0X3BvcywgbGlnaHRfYW1iaWVudCwgYmFja2xpdCk7XFxuXCIgK1xuXCIgICNlbHNlXFxuXCIgK1xuXCIgIGNvbG9yID0gdl9jb2xvcjtcXG5cIiArXG5cIiAgI2VuZGlmXFxuXCIgK1xuXCIgIFxcblwiICtcblwiICAjcHJhZ21hIHRhbmdyYW06IGZyYWdtZW50XFxuXCIgK1xuXCIgIGdsX0ZyYWdDb2xvciA9IHZlYzQoY29sb3IsIDEuMCk7XFxuXCIgK1xuXCJ9XFxuXCIgK1xuXCJcIjtcblxuc2hhZGVyX3NvdXJjZXNbJ3NpbXBsZV9wb2x5Z29uX3ZlcnRleCddID1cblwiXFxuXCIgK1xuXCIjZGVmaW5lIEdMU0xJRlkgMVxcblwiICtcblwiXFxuXCIgK1xuXCJ1bmlmb3JtIHZlYzIgdV9hc3BlY3Q7XFxuXCIgK1xuXCJ1bmlmb3JtIG1hdDQgdV90aWxlX3ZpZXc7XFxuXCIgK1xuXCJ1bmlmb3JtIG1hdDQgdV9tZXRlcl92aWV3O1xcblwiICtcblwidW5pZm9ybSBmbG9hdCB1X21ldGVyc19wZXJfcGl4ZWw7XFxuXCIgK1xuXCJ1bmlmb3JtIGZsb2F0IHVfbnVtX2xheWVycztcXG5cIiArXG5cImF0dHJpYnV0ZSB2ZWMzIGFfcG9zaXRpb247XFxuXCIgK1xuXCJhdHRyaWJ1dGUgdmVjMyBhX25vcm1hbDtcXG5cIiArXG5cImF0dHJpYnV0ZSB2ZWMzIGFfY29sb3I7XFxuXCIgK1xuXCJhdHRyaWJ1dGUgZmxvYXQgYV9sYXllcjtcXG5cIiArXG5cInZhcnlpbmcgdmVjMyB2X2NvbG9yO1xcblwiICtcblwiI2lmICFkZWZpbmVkKExJR0hUSU5HX1ZFUlRFWClcXG5cIiArXG5cIlxcblwiICtcblwidmFyeWluZyB2ZWM0IHZfcG9zaXRpb247XFxuXCIgK1xuXCJ2YXJ5aW5nIHZlYzMgdl9ub3JtYWw7XFxuXCIgK1xuXCIjZW5kaWZcXG5cIiArXG5cIlxcblwiICtcblwidmVjNCBhX3hfcGVyc3BlY3RpdmUodmVjNCBwb3NpdGlvbiwgY29uc3QgdmVjMiBwZXJzcGVjdGl2ZV9vZmZzZXQsIGNvbnN0IHZlYzIgcGVyc3BlY3RpdmVfZmFjdG9yKSB7XFxuXCIgK1xuXCIgIHBvc2l0aW9uLnh5ICs9IHBvc2l0aW9uLnogKiBwZXJzcGVjdGl2ZV9mYWN0b3IgKiAocG9zaXRpb24ueHkgLSBwZXJzcGVjdGl2ZV9vZmZzZXQpO1xcblwiICtcblwiICByZXR1cm4gcG9zaXRpb247XFxuXCIgK1xuXCJ9XFxuXCIgK1xuXCJ2ZWM0IGJfeF9pc29tZXRyaWModmVjNCBwb3NpdGlvbiwgY29uc3QgdmVjMiBheGlzLCBjb25zdCBmbG9hdCBtdWx0aXBsaWVyKSB7XFxuXCIgK1xuXCIgIHBvc2l0aW9uLnh5ICs9IHBvc2l0aW9uLnogKiBheGlzICogbXVsdGlwbGllciAvIHVfYXNwZWN0O1xcblwiICtcblwiICByZXR1cm4gcG9zaXRpb247XFxuXCIgK1xuXCJ9XFxuXCIgK1xuXCJmbG9hdCBjX3hfY2FsY3VsYXRlWihmbG9hdCB6LCBmbG9hdCBsYXllciwgY29uc3QgZmxvYXQgbnVtX2xheWVycywgY29uc3QgZmxvYXQgel9sYXllcl9zY2FsZSkge1xcblwiICtcblwiICBmbG9hdCB6X2xheWVyX3JhbmdlID0gKG51bV9sYXllcnMgKyAxLikgKiB6X2xheWVyX3NjYWxlO1xcblwiICtcblwiICBmbG9hdCB6X2xheWVyID0gKGxheWVyICsgMS4pICogel9sYXllcl9zY2FsZTtcXG5cIiArXG5cIiAgeiA9IHpfbGF5ZXIgKyBjbGFtcCh6LCAwLiwgel9sYXllcl9zY2FsZSk7XFxuXCIgK1xuXCIgIHogPSAoel9sYXllcl9yYW5nZSAtIHopIC8gel9sYXllcl9yYW5nZTtcXG5cIiArXG5cIiAgcmV0dXJuIHo7XFxuXCIgK1xuXCJ9XFxuXCIgK1xuXCJ2ZWMzIGRfeF9wb2ludExpZ2h0KHZlYzQgcG9zaXRpb24sIHZlYzMgbm9ybWFsLCB2ZWMzIGNvbG9yLCB2ZWM0IGxpZ2h0X3BvcywgZmxvYXQgbGlnaHRfYW1iaWVudCwgY29uc3QgYm9vbCBiYWNrbGlnaHQpIHtcXG5cIiArXG5cIiAgdmVjMyBsaWdodF9kaXIgPSBub3JtYWxpemUocG9zaXRpb24ueHl6IC0gbGlnaHRfcG9zLnh5eik7XFxuXCIgK1xuXCIgIGNvbG9yICo9IGFicyhtYXgoZmxvYXQoYmFja2xpZ2h0KSAqIC0xLiwgZG90KG5vcm1hbCwgbGlnaHRfZGlyICogLTEuMCkpKSArIGxpZ2h0X2FtYmllbnQ7XFxuXCIgK1xuXCIgIHJldHVybiBjb2xvcjtcXG5cIiArXG5cIn1cXG5cIiArXG5cIiNwcmFnbWEgdGFuZ3JhbTogZ2xvYmFsc1xcblwiICtcblwiXFxuXCIgK1xuXCJ2b2lkIG1haW4oKSB7XFxuXCIgK1xuXCIgIHZlYzQgcG9zaXRpb24gPSB1X3RpbGVfdmlldyAqIHZlYzQoYV9wb3NpdGlvbiwgMS4pO1xcblwiICtcblwiICAjcHJhZ21hIHRhbmdyYW06IHZlcnRleFxcblwiICtcblwiICBcXG5cIiArXG5cIiAgI2lmIGRlZmluZWQoTElHSFRJTkdfVkVSVEVYKVxcblwiICtcblwiICB2ZWM0IGxpZ2h0X3BvcyA9IHZlYzQoMC4sIDAuLCAxNTAuICogdV9tZXRlcnNfcGVyX3BpeGVsLCAxLik7XFxuXCIgK1xuXCIgIGNvbnN0IGZsb2F0IGxpZ2h0X2FtYmllbnQgPSAwLjU7XFxuXCIgK1xuXCIgIGNvbnN0IGJvb2wgYmFja2xpdCA9IHRydWU7XFxuXCIgK1xuXCIgIHZfY29sb3IgPSBkX3hfcG9pbnRMaWdodChwb3NpdGlvbiwgYV9ub3JtYWwsIGFfY29sb3IsIGxpZ2h0X3BvcywgbGlnaHRfYW1iaWVudCwgYmFja2xpdCk7XFxuXCIgK1xuXCIgICNlbHNlXFxuXCIgK1xuXCIgIHZfcG9zaXRpb24gPSBwb3NpdGlvbjtcXG5cIiArXG5cIiAgdl9ub3JtYWwgPSBhX25vcm1hbDtcXG5cIiArXG5cIiAgdl9jb2xvciA9IGFfY29sb3I7XFxuXCIgK1xuXCIgICNlbmRpZlxcblwiICtcblwiICBwb3NpdGlvbiA9IHVfbWV0ZXJfdmlldyAqIHBvc2l0aW9uO1xcblwiICtcblwiICAjaWYgZGVmaW5lZChQUk9KRUNUSU9OX1BFUlNQRUNUSVZFKVxcblwiICtcblwiICBwb3NpdGlvbiA9IGFfeF9wZXJzcGVjdGl2ZShwb3NpdGlvbiwgdmVjMigtMC4yNSwgLTAuMjUpLCB2ZWMyKDAuNiwgMC42KSk7XFxuXCIgK1xuXCIgICNlbGlmIGRlZmluZWQoUFJPSkVDVElPTl9JU09NRVRSSUMpXFxuXCIgK1xuXCIgIHBvc2l0aW9uID0gYl94X2lzb21ldHJpYyhwb3NpdGlvbiwgdmVjMigwLiwgMS4pLCAxLik7XFxuXCIgK1xuXCIgICNlbmRpZlxcblwiICtcblwiICBwb3NpdGlvbi56ID0gY194X2NhbGN1bGF0ZVoocG9zaXRpb24ueiwgYV9sYXllciwgdV9udW1fbGF5ZXJzLCA0MDk2Lik7XFxuXCIgK1xuXCIgIGdsX1Bvc2l0aW9uID0gcG9zaXRpb247XFxuXCIgK1xuXCJ9XFxuXCIgK1xuXCJcIjtcblxuaWYgKG1vZHVsZS5leHBvcnRzICE9PSB1bmRlZmluZWQpIHsgbW9kdWxlLmV4cG9ydHMgPSBzaGFkZXJfc291cmNlczsgfVxuXG4iLCIvLyBUZXh0dXJlIG1hbmFnZW1lbnRcblxudmFyIEdMID0gcmVxdWlyZSgnLi9nbC5qcycpO1xudmFyIFV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMuanMnKTtcblxuLy8gR2xvYmFsIHNldCBvZiB0ZXh0dXJlcywgYnkgbmFtZVxuR0xUZXh0dXJlLnRleHR1cmVzID0ge307XG5cbi8vIEdMIHRleHR1cmUgd3JhcHBlciBvYmplY3QgZm9yIGtlZXBpbmcgdHJhY2sgb2YgYSBnbG9iYWwgc2V0IG9mIHRleHR1cmVzLCBrZXllZCBieSBhbiBhcmJpdHJhcnkgbmFtZVxuZnVuY3Rpb24gR0xUZXh0dXJlIChnbCwgbmFtZSwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuZ2wgPSBnbDtcbiAgICB0aGlzLnRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgdGhpcy5iaW5kKDApO1xuICAgIHRoaXMuaW1hZ2UgPSBudWxsO1xuXG4gICAgLy8gRGVmYXVsdCB0byBhIDEtcGl4ZWwgYmxhY2sgdGV4dHVyZSBzbyB3ZSBjYW4gc2FmZWx5IHJlbmRlciB3aGlsZSB3ZSB3YWl0IGZvciBhbiBpbWFnZSB0byBsb2FkXG4gICAgLy8gU2VlOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE5NzIyMjQ3L3dlYmdsLXdhaXQtZm9yLXRleHR1cmUtdG8tbG9hZFxuICAgIHRoaXMuc2V0RGF0YSgxLCAxLCBuZXcgVWludDhBcnJheShbMCwgMCwgMCwgMjU1XSksIHsgZmlsdGVyaW5nOiAnbmVhcmVzdCcgfSk7XG5cbiAgICAvLyBUT0RPOiBiZXR0ZXIgc3VwcG9ydCBmb3Igbm9uLVVSTCBzb3VyY2VzOiBjYW52YXMvdmlkZW8gZWxlbWVudHMsIHJhdyBwaXhlbCBidWZmZXJzXG5cbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIEdMVGV4dHVyZS50ZXh0dXJlc1t0aGlzLm5hbWVdID0gdGhpcztcbn07XG5cbkdMVGV4dHVyZS5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uICh1bml0KSB7XG4gICAgdGhpcy5nbC5hY3RpdmVUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRTAgKyB1bml0KTtcbiAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXh0dXJlKTtcbn07XG5cbi8vIExvYWRzIGEgdGV4dHVyZSBmcm9tIGEgVVJMXG5HTFRleHR1cmUucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcbiAgICAgICAgdGhpcy5kYXRhID0gbnVsbDsgLy8gbXV0dWFsbHkgZXhjbHVzaXZlIHdpdGggZGlyZWN0IGRhdGEgYnVmZmVyIHRleHR1cmVzXG4gICAgICAgIHRoaXMudXBkYXRlKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnNldFRleHR1cmVGaWx0ZXJpbmcob3B0aW9ucyk7XG4gICAgfTtcbiAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcbn07XG5cbi8vIFNldHMgdGV4dHVyZSB0byBhIHJhdyBpbWFnZSBidWZmZXJcbkdMVGV4dHVyZS5wcm90b3R5cGUuc2V0RGF0YSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBkYXRhLCBvcHRpb25zKSB7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5pbWFnZSA9IG51bGw7IC8vIG11dHVhbGx5IGV4Y2x1c2l2ZSB3aXRoIGltYWdlIGVsZW1lbnQtYmFzZWQgdGV4dHVyZXNcblxuICAgIHRoaXMudXBkYXRlKG9wdGlvbnMpO1xuICAgIHRoaXMuc2V0VGV4dHVyZUZpbHRlcmluZyhvcHRpb25zKTtcbn07XG5cbi8vIFVwbG9hZHMgY3VycmVudCBpbWFnZSBvciBidWZmZXIgdG8gdGhlIEdQVSAoY2FuIGJlIHVzZWQgdG8gdXBkYXRlIGFuaW1hdGVkIHRleHR1cmVzIG9uIHRoZSBmbHkpXG5HTFRleHR1cmUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB0aGlzLmJpbmQoMCk7XG4gICAgdGhpcy5nbC5waXhlbFN0b3JlaSh0aGlzLmdsLlVOUEFDS19GTElQX1lfV0VCR0wsIChvcHRpb25zLlVOUEFDS19GTElQX1lfV0VCR0wgPT09IGZhbHNlID8gZmFsc2UgOiB0cnVlKSk7XG5cbiAgICAvLyBJbWFnZSBlbGVtZW50XG4gICAgaWYgKHRoaXMuaW1hZ2UgJiYgdGhpcy5pbWFnZS5jb21wbGV0ZSkge1xuICAgICAgICB0aGlzLmdsLnRleEltYWdlMkQodGhpcy5nbC5URVhUVVJFXzJELCAwLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5VTlNJR05FRF9CWVRFLCB0aGlzLmltYWdlKTtcbiAgICB9XG4gICAgLy8gUmF3IGltYWdlIGJ1ZmZlclxuICAgIGVsc2UgaWYgKHRoaXMud2lkdGggJiYgdGhpcy5oZWlnaHQpIHsgLy8gTk9URTogdGhpcy5kYXRhIGNhbiBiZSBudWxsLCB0byB6ZXJvIG91dCB0ZXh0dXJlXG4gICAgICAgIHRoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLmdsLlRFWFRVUkVfMkQsIDAsIHRoaXMuZ2wuUkdCQSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIDAsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5VTlNJR05FRF9CWVRFLCB0aGlzLmRhdGEpO1xuICAgIH1cbn07XG5cbi8vIERldGVybWluZXMgYXBwcm9wcmlhdGUgZmlsdGVyaW5nIG1vZGVcbi8vIEFzc3VtZXMgdGV4dHVyZSB0byBiZSBvcGVyYXRlZCBvbiBpcyBhbHJlYWR5IGJvdW5kXG5HTFRleHR1cmUucHJvdG90eXBlLnNldFRleHR1cmVGaWx0ZXJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMuZmlsdGVyaW5nID0gb3B0aW9ucy5maWx0ZXJpbmcgfHwgJ21pcG1hcCc7IC8vIGRlZmF1bHQgdG8gbWlwbWFwcyBmb3IgcG93ZXItb2YtMiB0ZXh0dXJlc1xuICAgIHZhciBnbCA9IHRoaXMuZ2w7XG5cbiAgICAvLyBGb3IgcG93ZXItb2YtMiB0ZXh0dXJlcywgdGhlIGZvbGxvd2luZyBwcmVzZXRzIGFyZSBhdmFpbGFibGU6XG4gICAgLy8gbWlwbWFwOiBsaW5lYXIgYmxlbmQgZnJvbSBuZWFyZXN0IG1pcFxuICAgIC8vIGxpbmVhcjogbGluZWFyIGJsZW5kIGZyb20gb3JpZ2luYWwgaW1hZ2UgKG5vIG1pcHMpXG4gICAgLy8gbmVhcmVzdDogbmVhcmVzdCBwaXhlbCBmcm9tIG9yaWdpbmFsIGltYWdlIChubyBtaXBzLCAnYmxvY2t5JyBsb29rKVxuICAgIGlmIChVdGlscy5pc1Bvd2VyT2YyKHRoaXMud2lkdGgpICYmIFV0aWxzLmlzUG93ZXJPZjIodGhpcy5oZWlnaHQpKSB7XG4gICAgICAgIHRoaXMucG93ZXJfb2ZfMiA9IHRydWU7XG4gICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIG9wdGlvbnMuVEVYVFVSRV9XUkFQX1MgfHwgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIG9wdGlvbnMuVEVYVFVSRV9XUkFQX1QgfHwgZ2wuQ0xBTVBfVE9fRURHRSk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuZmlsdGVyaW5nID09ICdtaXBtYXAnKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInBvd2VyLW9mLTIgTUlQTUFQXCIpO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJpbmcgPSAnbWlwbWFwJztcbiAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5MSU5FQVJfTUlQTUFQX05FQVJFU1QpOyAvLyBUT0RPOiB1c2UgdHJpbGluZWFyIGZpbHRlcmluZyBieSBkZWZ1YWx0IGluc3RlYWQ/XG4gICAgICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTElORUFSKTtcbiAgICAgICAgICAgIGdsLmdlbmVyYXRlTWlwbWFwKGdsLlRFWFRVUkVfMkQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbnMuZmlsdGVyaW5nID09ICdsaW5lYXInKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInBvd2VyLW9mLTIgTElORUFSXCIpO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJpbmcgPSAnbGluZWFyJztcbiAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5MSU5FQVIpO1xuICAgICAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLkxJTkVBUik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5maWx0ZXJpbmcgPT0gJ25lYXJlc3QnKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInBvd2VyLW9mLTIgTkVBUkVTVFwiKTtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyaW5nID0gJ25lYXJlc3QnO1xuICAgICAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgICAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBXZWJHTCBoYXMgc3RyaWN0IHJlcXVpcmVtZW50cyBvbiBub24tcG93ZXItb2YtMiB0ZXh0dXJlczpcbiAgICAgICAgLy8gTm8gbWlwbWFwcyBhbmQgbXVzdCBjbGFtcCB0byBlZGdlXG4gICAgICAgIHRoaXMucG93ZXJfb2ZfMiA9IGZhbHNlO1xuICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuZmlsdGVyaW5nID09ICduZWFyZXN0Jykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJwb3dlci1vZi0yIE5FQVJFU1RcIik7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcmluZyA9ICduZWFyZXN0JztcbiAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLy8gZGVmYXVsdCB0byBsaW5lYXIgZm9yIG5vbi1wb3dlci1vZi0yIHRleHR1cmVzXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInBvd2VyLW9mLTIgTElORUFSXCIpO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJpbmcgPSAnbGluZWFyJztcbiAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5MSU5FQVIpO1xuICAgICAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLkxJTkVBUik7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5pZiAobW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEdMVGV4dHVyZTtcbn1cbiIsIi8vIERlc2NyaWJlcyBhIHZlcnRleCBsYXlvdXQgdGhhdCBjYW4gYmUgdXNlZCB3aXRoIG1hbnkgZGlmZmVyZW50IEdMIHByb2dyYW1zLlxuLy8gSWYgYSBnaXZlbiBwcm9ncmFtIGRvZXNuJ3QgaW5jbHVkZSBhbGwgYXR0cmlidXRlcywgaXQgY2FuIHN0aWxsIHVzZSB0aGUgdmVydGV4IGxheW91dFxuLy8gdG8gcmVhZCB0aG9zZSBhdHRyaWJzIHRoYXQgaXQgZG9lcyByZWNvZ25pemUsIHVzaW5nIHRoZSBhdHRyaWIgb2Zmc2V0cyB0byBza2lwIG90aGVycy5cbi8vIEF0dHJpYnMgYXJlIGFuIGFycmF5LCBpbiBsYXlvdXQgb3JkZXIsIG9mOiBuYW1lLCBzaXplLCB0eXBlLCBub3JtYWxpemVkXG4vLyBleDogeyBuYW1lOiAncG9zaXRpb24nLCBzaXplOiAzLCB0eXBlOiBnbC5GTE9BVCwgbm9ybWFsaXplZDogZmFsc2UgfVxuZnVuY3Rpb24gR0xWZXJ0ZXhMYXlvdXQgKGdsLCBhdHRyaWJzKVxue1xuICAgIHRoaXMuYXR0cmlicyA9IGF0dHJpYnM7XG5cbiAgICAvLyBDYWxjIHZlcnRleCBzdHJpZGVcbiAgICB0aGlzLnN0cmlkZSA9IDA7XG4gICAgZm9yICh2YXIgYT0wOyBhIDwgdGhpcy5hdHRyaWJzLmxlbmd0aDsgYSsrKSB7XG4gICAgICAgIHZhciBhdHRyaWIgPSB0aGlzLmF0dHJpYnNbYV07XG5cbiAgICAgICAgYXR0cmliLmJ5dGVfc2l6ZSA9IGF0dHJpYi5zaXplO1xuXG4gICAgICAgIHN3aXRjaCAoYXR0cmliLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgZ2wuRkxPQVQ6XG4gICAgICAgICAgICBjYXNlIGdsLklOVDpcbiAgICAgICAgICAgIGNhc2UgZ2wuVU5TSUdORURfSU5UOlxuICAgICAgICAgICAgICAgIGF0dHJpYi5ieXRlX3NpemUgKj0gNDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZ2wuU0hPUlQ6XG4gICAgICAgICAgICBjYXNlIGdsLlVOU0lHTkVEX1NIT1JUOlxuICAgICAgICAgICAgICAgIGF0dHJpYi5ieXRlX3NpemUgKj0gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGF0dHJpYi5vZmZzZXQgPSB0aGlzLnN0cmlkZTtcbiAgICAgICAgdGhpcy5zdHJpZGUgKz0gYXR0cmliLmJ5dGVfc2l6ZTtcbiAgICB9XG59XG5cbi8vIFRyYWNrIGN1cnJlbnRseSBlbmFibGVkIGF0dHJpYnMsIGJ5IHRoZSBwcm9ncmFtIHRoZXkgYXJlIGJvdW5kIHRvXG5HTFZlcnRleExheW91dC5lbmFibGVkX2F0dHJpYnMgPSB7fTtcblxuLy8gU2V0dXAgYSB2ZXJ0ZXggbGF5b3V0IGZvciBhIHNwZWNpZmljIEdMIHByb2dyYW1cbi8vIEFzc3VtZXMgdGhhdCB0aGUgZGVzaXJlZCB2ZXJ0ZXggYnVmZmVyIChWQk8pIGlzIGFscmVhZHkgYm91bmRcbkdMVmVydGV4TGF5b3V0LnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbiAoZ2wsIGdsX3Byb2dyYW0pXG57XG4gICAgLy8gRW5hYmxlIGFsbCBhdHRyaWJ1dGVzIGZvciB0aGlzIGxheW91dFxuICAgIGZvciAodmFyIGE9MDsgYSA8IHRoaXMuYXR0cmlicy5sZW5ndGg7IGErKykge1xuICAgICAgICB2YXIgYXR0cmliID0gdGhpcy5hdHRyaWJzW2FdO1xuICAgICAgICB2YXIgbG9jYXRpb24gPSBnbF9wcm9ncmFtLmF0dHJpYnV0ZShhdHRyaWIubmFtZSkubG9jYXRpb247XG5cbiAgICAgICAgaWYgKGxvY2F0aW9uICE9IC0xKSB7XG4gICAgICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NhdGlvbik7XG4gICAgICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGxvY2F0aW9uLCBhdHRyaWIuc2l6ZSwgYXR0cmliLnR5cGUsIGF0dHJpYi5ub3JtYWxpemVkLCB0aGlzLnN0cmlkZSwgYXR0cmliLm9mZnNldCk7XG4gICAgICAgICAgICBHTFZlcnRleExheW91dC5lbmFibGVkX2F0dHJpYnNbbG9jYXRpb25dID0gZ2xfcHJvZ3JhbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIERpc2FibGUgYW55IHByZXZpb3VzbHkgYm91bmQgYXR0cmlidXRlcyB0aGF0IGFyZW4ndCBmb3IgdGhpcyBsYXlvdXRcbiAgICB2YXIgdW51c3VlZF9hdHRyaWJzID0gW107XG4gICAgZm9yIChsb2NhdGlvbiBpbiBHTFZlcnRleExheW91dC5lbmFibGVkX2F0dHJpYnMpIHtcbiAgICAgICAgaWYgKEdMVmVydGV4TGF5b3V0LmVuYWJsZWRfYXR0cmlic1tsb2NhdGlvbl0gIT0gZ2xfcHJvZ3JhbSkge1xuICAgICAgICAgICAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY2F0aW9uKTtcbiAgICAgICAgICAgIHVudXN1ZWRfYXR0cmlicy5wdXNoKGxvY2F0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1hcmsgYXR0cmlicyBhcyB1bnVzZWRcbiAgICBmb3IgKGxvY2F0aW9uIGluIHVudXN1ZWRfYXR0cmlicykge1xuICAgICAgICBkZWxldGUgR0xWZXJ0ZXhMYXlvdXQuZW5hYmxlZF9hdHRyaWJzW2xvY2F0aW9uXTtcbiAgICB9XG59O1xuXG5pZiAobW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEdMVmVydGV4TGF5b3V0O1xufVxuIiwidmFyIFNjZW5lID0gcmVxdWlyZSgnLi9zY2VuZS5qcycpO1xuXG52YXIgTGVhZmxldExheWVyID0gTC5HcmlkTGF5ZXIuZXh0ZW5kKHtcblxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIEwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBTY2VuZSh0aGlzLm9wdGlvbnMudmVjdG9yVGlsZVNvdXJjZSwgdGhpcy5vcHRpb25zLnZlY3RvckxheWVycywgdGhpcy5vcHRpb25zLnZlY3RvclN0eWxlcywgeyBudW1fd29ya2VyczogdGhpcy5vcHRpb25zLm51bVdvcmtlcnMgfSk7XG4gICAgICAgIHRoaXMuc2NlbmUuZGVidWcgPSB0aGlzLm9wdGlvbnMuZGVidWc7XG4gICAgICAgIHRoaXMuc2NlbmUuY29udGludW91c19hbmltYXRpb24gPSBmYWxzZTsgLy8gc2V0IHRvIHRydWUgZm9yIGFuaW1hdGlub3MsIGV0Yy4gKGV2ZW50dWFsbHkgd2lsbCBiZSBhdXRvbWF0ZWQpXG4gICAgfSxcblxuICAgIC8vIEZpbmlzaCBpbml0aWFsaXppbmcgc2NlbmUgYW5kIHNldHVwIGV2ZW50cyB3aGVuIGxheWVyIGlzIGFkZGVkIHRvIG1hcFxuICAgIG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgICAgIHZhciBsYXllciA9IHRoaXM7XG5cbiAgICAgICAgbGF5ZXIub24oJ3RpbGV1bmxvYWQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciB0aWxlID0gZXZlbnQudGlsZTtcbiAgICAgICAgICAgIHZhciBrZXkgPSB0aWxlLmdldEF0dHJpYnV0ZSgnZGF0YS10aWxlLWtleScpO1xuICAgICAgICAgICAgbGF5ZXIuc2NlbmUucmVtb3ZlVGlsZShrZXkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsYXllci5fbWFwLm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2l6ZSA9IGxheWVyLl9tYXAuZ2V0U2l6ZSgpO1xuICAgICAgICAgICAgbGF5ZXIuc2NlbmUucmVzaXplTWFwKHNpemUueCwgc2l6ZS55KTtcbiAgICAgICAgICAgIGxheWVyLnVwZGF0ZUJvdW5kcygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsYXllci5fbWFwLm9uKCdtb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGNlbnRlciA9IGxheWVyLl9tYXAuZ2V0Q2VudGVyKCk7XG4gICAgICAgICAgICBsYXllci5zY2VuZS5zZXRDZW50ZXIoY2VudGVyLmxuZywgY2VudGVyLmxhdCk7XG4gICAgICAgICAgICBsYXllci51cGRhdGVCb3VuZHMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGF5ZXIuX21hcC5vbignem9vbXN0YXJ0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJtYXAuem9vbXN0YXJ0IFwiICsgbGF5ZXIuX21hcC5nZXRab29tKCkpO1xuICAgICAgICAgICAgbGF5ZXIuc2NlbmUuc3RhcnRab29tKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxheWVyLl9tYXAub24oJ3pvb21lbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1hcC56b29tZW5kIFwiICsgbGF5ZXIuX21hcC5nZXRab29tKCkpO1xuICAgICAgICAgICAgbGF5ZXIuc2NlbmUuc2V0Wm9vbShsYXllci5fbWFwLmdldFpvb20oKSk7XG4gICAgICAgICAgICBsYXllci51cGRhdGVCb3VuZHMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGF5ZXIuX21hcC5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGF5ZXIuc2NlbmUucGFubmluZyA9IHRydWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxheWVyLl9tYXAub24oJ2RyYWdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsYXllci5zY2VuZS5wYW5uaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENhbnZhcyBlbGVtZW50IHdpbGwgYmUgaW5zZXJ0ZWQgYWZ0ZXIgbWFwIGNvbnRhaW5lciAobGVhZmxldCB0cmFuc2Zvcm1zIHNob3VsZG4ndCBiZSBhcHBsaWVkIHRvIHRoZSBHTCBjYW52YXMpXG4gICAgICAgIC8vIFRPRE86IGZpbmQgYSBiZXR0ZXIgd2F5IHRvIGRlYWwgd2l0aCB0aGlzPyByaWdodCBub3cgR0wgbWFwIG9ubHkgcmVuZGVycyBjb3JyZWN0bHkgYXMgdGhlIGJvdHRvbSBsYXllclxuICAgICAgICBsYXllci5zY2VuZS5jb250YWluZXIgPSBsYXllci5fbWFwLmdldENvbnRhaW5lcigpO1xuXG4gICAgICAgIHZhciBjZW50ZXIgPSBsYXllci5fbWFwLmdldENlbnRlcigpO1xuICAgICAgICBsYXllci5zY2VuZS5zZXRDZW50ZXIoY2VudGVyLmxuZywgY2VudGVyLmxhdCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiem9vbTogXCIgKyBsYXllci5fbWFwLmdldFpvb20oKSk7XG4gICAgICAgIGxheWVyLnNjZW5lLnNldFpvb20obGF5ZXIuX21hcC5nZXRab29tKCkpO1xuICAgICAgICBsYXllci51cGRhdGVCb3VuZHMoKTtcblxuICAgICAgICBMLkdyaWRMYXllci5wcm90b3R5cGUub25BZGQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgICAgICAvLyBVc2UgbGVhZmxldCdzIGV4aXN0aW5nIGV2ZW50IHN5c3RlbSBhcyB0aGUgY2FsbGJhY2sgbWVjaGFuaXNtXG4gICAgICAgIGxheWVyLnNjZW5lLmluaXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsYXllci5maXJlKCdpbml0Jyk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBvblJlbW92ZTogZnVuY3Rpb24gKG1hcCkge1xuICAgICAgICBMLkdyaWRMYXllci5wcm90b3R5cGUub25SZW1vdmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgLy8gVE9ETzogcmVtb3ZlIGV2ZW50IGhhbmRsZXJzLCBkZXN0cm95IG1hcFxuICAgIH0sXG5cbiAgICBjcmVhdGVUaWxlOiBmdW5jdGlvbiAoY29vcmRzLCBkb25lKSB7XG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5zY2VuZS5sb2FkVGlsZShjb29yZHMsIGRpdiwgZG9uZSk7XG4gICAgICAgIHJldHVybiBkaXY7XG4gICAgfSxcblxuICAgIHVwZGF0ZUJvdW5kczogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzO1xuICAgICAgICB2YXIgYm91bmRzID0gbGF5ZXIuX21hcC5nZXRCb3VuZHMoKTtcbiAgICAgICAgbGF5ZXIuc2NlbmUuc2V0Qm91bmRzKGJvdW5kcy5nZXRTb3V0aFdlc3QoKSwgYm91bmRzLmdldE5vcnRoRWFzdCgpKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2NlbmUucmVuZGVyKCk7XG4gICAgfVxuXG59KTtcblxudmFyIGxlYWZsZXRMYXllciA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBMZWFmbGV0TGF5ZXIob3B0aW9ucyk7XG59O1xuXG5pZiAobW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAgICAgTGVhZmxldExheWVyOiBMZWFmbGV0TGF5ZXIsXG4gICAgICAgIGxlYWZsZXRMYXllcjogbGVhZmxldExheWVyXG4gICAgfTtcbn1cbiIsIi8vIE1vZHVsZXMgYW5kIGRlcGVuZGVuY2llcyB0byBleHBvc2UgaW4gdGhlIHB1YmxpYyBUYW5ncmFtIG1vZHVsZVxuXG4vLyBUaGUgbGVhZmxldCBsYXllciBwbHVnaW4gaXMgY3VycmVudGx5IHRoZSBwcmltYXJ5IG1lYW5zIG9mIHVzaW5nIHRoZSBsaWJyYXJ5XG52YXIgTGVhZmxldCA9IHJlcXVpcmUoJy4vbGVhZmxldF9sYXllci5qcycpO1xuXG4vLyBHTCBmdW5jdGlvbnMgaW5jbHVkZWQgZm9yIGVhc2llciBkZWJ1Z2dpbmcgLyBkaXJlY3QgYWNjZXNzIHRvIHNldHRpbmcgZ2xvYmFsIGRlZmluZXMsIHJlbG9hZGluZyBwcm9ncmFtcywgZXRjLlxudmFyIEdMID0gcmVxdWlyZSgnLi9nbC9nbC5qcycpO1xuR0wuUHJvZ3JhbSA9IHJlcXVpcmUoJy4vZ2wvZ2xfcHJvZ3JhbS5qcycpO1xuR0wuVGV4dHVyZSA9IHJlcXVpcmUoJy4vZ2wvZ2xfdGV4dHVyZS5qcycpO1xuXG5pZiAobW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAgICAgTGVhZmxldExheWVyOiBMZWFmbGV0LkxlYWZsZXRMYXllcixcbiAgICAgICAgbGVhZmxldExheWVyOiBMZWFmbGV0LmxlYWZsZXRMYXllcixcbiAgICAgICAgR0w6IEdMXG4gICAgfTtcbn1cbiIsIi8vIFBvaW50XG5mdW5jdGlvbiBQb2ludCAoeCwgeSlcbntcbiAgICByZXR1cm4geyB4OiB4LCB5OiB5IH07XG59XG5cblBvaW50LmNvcHkgPSBmdW5jdGlvbiAocClcbntcbiAgICBpZiAocCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4geyB4OiBwLngsIHk6IHAueSB9O1xufTtcblxuaWYgKG1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBQb2ludDtcbn1cbiIsInZhciBQb2ludCA9IHJlcXVpcmUoJy4vcG9pbnQuanMnKTtcbnZhciBHZW8gPSByZXF1aXJlKCcuL2dlby5qcycpO1xudmFyIFN0eWxlID0gcmVxdWlyZSgnLi9zdHlsZS5qcycpO1xudmFyIE1vZGVNYW5hZ2VyID0gcmVxdWlyZSgnLi9nbC9nbF9tb2RlcycpLk1vZGVNYW5hZ2VyO1xudmFyIFV0aWxzID0gcmVxdWlyZSgnLi91dGlscy5qcycpO1xudmFyIFF1ZXVlID0gcmVxdWlyZSgncXVldWUtYXN5bmMnKTtcblxudmFyIEdMID0gcmVxdWlyZSgnLi9nbC9nbC5qcycpO1xudmFyIEdMUHJvZ3JhbSA9IHJlcXVpcmUoJy4vZ2wvZ2xfcHJvZ3JhbS5qcycpO1xudmFyIEdMQnVpbGRlcnMgPSByZXF1aXJlKCcuL2dsL2dsX2J1aWxkZXJzLmpzJyk7XG52YXIgR0xUZXh0dXJlID0gcmVxdWlyZSgnLi9nbC9nbF90ZXh0dXJlLmpzJyk7XG5cbnZhciBtYXQ0ID0gcmVxdWlyZSgnZ2wtbWF0cml4JykubWF0NDtcbnZhciB2ZWMzID0gcmVxdWlyZSgnZ2wtbWF0cml4JykudmVjMztcblxuLy8gU2V0dXAgdGhhdCBoYXBwZW5zIG9uIG1haW4gdGhyZWFkIG9ubHkgKHNraXAgaW4gd2ViIHdvcmtlcilcbnZhciB5YW1sO1xuVXRpbHMucnVuSWZJbk1haW5UaHJlYWQoZnVuY3Rpb24oKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgeWFtbCA9IHJlcXVpcmUoJ2pzLXlhbWwnKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJubyBZQU1MIHN1cHBvcnQsIGpzLXlhbWwgbW9kdWxlIG5vdCBmb3VuZFwiKTtcbiAgICB9XG5cbiAgICBmaW5kQmFzZUxpYnJhcnlVUkwoKTtcbn0pO1xuXG4vLyBHbG9iYWwgc2V0dXBcblNjZW5lLnRpbGVfc2NhbGUgPSA0MDk2OyAvLyBjb29yZGluYXRlcyBhcmUgbG9jYWxseSBzY2FsZWQgdG8gdGhlIHJhbmdlIFswLCB0aWxlX3NjYWxlXVxuR2VvLnNldFRpbGVTY2FsZShTY2VuZS50aWxlX3NjYWxlKTtcbkdMQnVpbGRlcnMuc2V0VGlsZVNjYWxlKFNjZW5lLnRpbGVfc2NhbGUpO1xuR0xQcm9ncmFtLmRlZmluZXMuVElMRV9TQ0FMRSA9IFNjZW5lLnRpbGVfc2NhbGU7XG5TY2VuZS5kZWJ1ZyA9IGZhbHNlO1xuXG4vLyBMYXllcnMgJiBzdHlsZXM6IHBhc3MgYW4gb2JqZWN0IGRpcmVjdGx5LCBvciBhIFVSTCBhcyBzdHJpbmcgdG8gbG9hZCByZW1vdGVseVxuZnVuY3Rpb24gU2NlbmUgKHRpbGVfc291cmNlLCBsYXllcnMsIHN0eWxlcywgb3B0aW9ucylcbntcbiAgICB2YXIgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gICAgdGhpcy50aWxlX3NvdXJjZSA9IHRpbGVfc291cmNlO1xuICAgIHRoaXMudGlsZXMgPSB7fTtcbiAgICB0aGlzLnF1ZXVlZF90aWxlcyA9IFtdO1xuICAgIHRoaXMubnVtX3dvcmtlcnMgPSBvcHRpb25zLm51bV93b3JrZXJzIHx8IDE7XG4gICAgdGhpcy5hbGxvd19jcm9zc19kb21haW5fd29ya2VycyA9IChvcHRpb25zLmFsbG93X2Nyb3NzX2RvbWFpbl93b3JrZXJzID09PSBmYWxzZSA/IGZhbHNlIDogdHJ1ZSk7XG5cbiAgICB0aGlzLmxheWVycyA9IGxheWVycztcbiAgICB0aGlzLnN0eWxlcyA9IHN0eWxlcztcblxuICAgIHRoaXMuZGlydHkgPSB0cnVlOyAvLyByZXF1ZXN0IGEgcmVkcmF3XG4gICAgdGhpcy5hbmltYXRlZCA9IGZhbHNlOyAvLyByZXF1ZXN0IHJlZHJhdyBldmVyeSBmcmFtZVxuXG4gICAgdGhpcy5mcmFtZSA9IDA7XG4gICAgdGhpcy56b29tID0gbnVsbDtcbiAgICB0aGlzLmNlbnRlciA9IG51bGw7XG4gICAgdGhpcy5kZXZpY2VfcGl4ZWxfcmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuXG4gICAgdGhpcy56b29taW5nID0gZmFsc2U7XG4gICAgdGhpcy5wYW5uaW5nID0gZmFsc2U7XG5cbiAgICB0aGlzLmNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyO1xuXG4gICAgdGhpcy5yZXNldFRpbWUoKTtcbn1cblxuU2NlbmUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoY2FsbGJhY2spXG57XG4gICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIExvYWQgc2NlbmUgZGVmaW5pdGlvbiAobGF5ZXJzLCBzdHlsZXMsIGV0Yy4pLCB0aGVuIGNyZWF0ZSBtb2RlcyAmIHdvcmtlcnNcbiAgICB0aGlzLmxvYWRTY2VuZSgoKSA9PiB7XG4gICAgICAgIHZhciBxdWV1ZSA9IFF1ZXVlKCk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIHJlbmRlcmluZyBtb2Rlc1xuICAgICAgICBxdWV1ZS5kZWZlcihjb21wbGV0ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vZGVzID0gU2NlbmUuY3JlYXRlTW9kZXModGhpcy5zdHlsZXMpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVBY3RpdmVNb2RlcygpO1xuICAgICAgICAgICAgY29tcGxldGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIHdlYiB3b3JrZXJzXG4gICAgICAgIHF1ZXVlLmRlZmVyKGNvbXBsZXRlID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlV29ya2Vycyhjb21wbGV0ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFRoZW4gY3JlYXRlIEdMIGNvbnRleHRcbiAgICAgICAgcXVldWUuYXdhaXQoKCkgPT4ge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGNhbnZhcyAmIEdMXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyIHx8IGRvY3VtZW50LmJvZHk7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUudG9wID0gMDtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLnN0eWxlLmxlZnQgPSAwO1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUuekluZGV4ID0gLTE7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG5cbiAgICAgICAgICAgIHRoaXMuZ2wgPSBHTC5nZXRDb250ZXh0KHRoaXMuY2FudmFzKTtcbiAgICAgICAgICAgIHRoaXMucmVzaXplTWFwKHRoaXMuY29udGFpbmVyLmNsaWVudFdpZHRoLCB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQpO1xuXG4gICAgICAgICAgICB0aGlzLmluaXRNb2RlcygpOyAvLyBUT0RPOiByZW1vdmUgZ2wgY29udGV4dCBzdGF0ZSBmcm9tIG1vZGVzLCBhbmQgbW92ZSBpbml0IHRvIGNyZWF0ZSBzdGVwIGFib3ZlP1xuICAgICAgICAgICAgdGhpcy5pbml0U2VsZWN0aW9uQnVmZmVyKCk7XG5cbiAgICAgICAgICAgIC8vIHRoaXMuem9vbV9zdGVwID0gMC4wMjsgLy8gZm9yIGZyYWN0aW9uYWwgem9vbSB1c2VyIGFkanVzdG1lbnRcbiAgICAgICAgICAgIHRoaXMubGFzdF9yZW5kZXJfY291bnQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5pbml0SW5wdXRIYW5kbGVycygpO1xuXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5TY2VuZS5wcm90b3R5cGUuaW5pdE1vZGVzID0gZnVuY3Rpb24gKClcbntcbiAgICAvLyBJbml0IEdMIGNvbnRleHQgZm9yIG1vZGVzIChjb21waWxlcyBwcm9ncmFtcywgZXRjLilcbiAgICBmb3IgKHZhciBtIGluIHRoaXMubW9kZXMpIHtcbiAgICAgICAgdGhpcy5tb2Rlc1ttXS5pbml0KHRoaXMuZ2wpO1xuICAgIH1cbn07XG5cblNjZW5lLnByb3RvdHlwZS5pbml0U2VsZWN0aW9uQnVmZmVyID0gZnVuY3Rpb24gKClcbntcbiAgICAvLyBTZWxlY3Rpb24gc3RhdGUgdHJhY2tpbmdcbiAgICB0aGlzLnBpeGVsID0gbmV3IFVpbnQ4QXJyYXkoNCk7XG4gICAgdGhpcy5waXhlbDMyID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLnBpeGVsLmJ1ZmZlcik7XG4gICAgdGhpcy5zZWxlY3Rpb25fcG9pbnQgPSBQb2ludCgwLCAwKTtcbiAgICB0aGlzLnNlbGVjdGVkX2ZlYXR1cmUgPSBudWxsO1xuICAgIHRoaXMuc2VsZWN0aW9uX2NhbGxiYWNrID0gbnVsbDtcbiAgICB0aGlzLnNlbGVjdGlvbl9jYWxsYmFja190aW1lciA9IG51bGw7XG4gICAgdGhpcy5zZWxlY3Rpb25fZnJhbWVfZGVsYXkgPSA1OyAvLyBkZWxheSBmcm9tIHNlbGVjdGlvbiByZW5kZXIgdG8gZnJhbWVidWZmZXIgc2FtcGxlLCB0byBhdm9pZCBDUFUvR1BVIHN5bmMgbG9ja1xuICAgIHRoaXMudXBkYXRlX3NlbGVjdGlvbiA9IGZhbHNlO1xuXG4gICAgLy8gRnJhbWUgYnVmZmVyIGZvciBzZWxlY3Rpb25cbiAgICAvLyBUT0RPOiBpbml0aWF0ZSBsYXppbHkgaW4gY2FzZSB3ZSBkb24ndCBuZWVkIHRvIGRvIGFueSBzZWxlY3Rpb25cbiAgICB0aGlzLmZibyA9IHRoaXMuZ2wuY3JlYXRlRnJhbWVidWZmZXIoKTtcbiAgICB0aGlzLmdsLmJpbmRGcmFtZWJ1ZmZlcih0aGlzLmdsLkZSQU1FQlVGRkVSLCB0aGlzLmZibyk7XG4gICAgdGhpcy5mYm9fc2l6ZSA9IHsgd2lkdGg6IDI1NiwgaGVpZ2h0OiAyNTYgfTsgLy8gVE9ETzogbWFrZSBjb25maWd1cmFibGUgLyBhZGFwdGl2ZSBiYXNlZCBvbiBjYW52YXMgc2l6ZVxuICAgIHRoaXMuZ2wudmlld3BvcnQoMCwgMCwgdGhpcy5mYm9fc2l6ZS53aWR0aCwgdGhpcy5mYm9fc2l6ZS5oZWlnaHQpO1xuXG4gICAgLy8gVGV4dHVyZSBmb3IgdGhlIEZCTyBjb2xvciBhdHRhY2htZW50XG4gICAgdGhpcy5mYm9fdGV4dHVyZSA9IG5ldyBHTFRleHR1cmUodGhpcy5nbCwgJ3NlbGVjdGlvbl9mYm8nKTtcbiAgICB0aGlzLmZib190ZXh0dXJlLnNldERhdGEodGhpcy5mYm9fc2l6ZS53aWR0aCwgdGhpcy5mYm9fc2l6ZS5oZWlnaHQsIG51bGwsIHsgZmlsdGVyaW5nOiAnbmVhcmVzdCcgfSk7XG4gICAgdGhpcy5nbC5mcmFtZWJ1ZmZlclRleHR1cmUyRCh0aGlzLmdsLkZSQU1FQlVGRkVSLCB0aGlzLmdsLkNPTE9SX0FUVEFDSE1FTlQwLCB0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuZmJvX3RleHR1cmUudGV4dHVyZSwgMCk7XG5cbiAgICAvLyBSZW5kZXJidWZmZXIgZm9yIHRoZSBGQk8gZGVwdGggYXR0YWNobWVudFxuICAgIHRoaXMuZmJvX2RlcHRoX3JiID0gdGhpcy5nbC5jcmVhdGVSZW5kZXJidWZmZXIoKTtcbiAgICB0aGlzLmdsLmJpbmRSZW5kZXJidWZmZXIodGhpcy5nbC5SRU5ERVJCVUZGRVIsIHRoaXMuZmJvX2RlcHRoX3JiKTtcbiAgICB0aGlzLmdsLnJlbmRlcmJ1ZmZlclN0b3JhZ2UodGhpcy5nbC5SRU5ERVJCVUZGRVIsIHRoaXMuZ2wuREVQVEhfQ09NUE9ORU5UMTYsIHRoaXMuZmJvX3NpemUud2lkdGgsIHRoaXMuZmJvX3NpemUuaGVpZ2h0KTtcbiAgICB0aGlzLmdsLmZyYW1lYnVmZmVyUmVuZGVyYnVmZmVyKHRoaXMuZ2wuRlJBTUVCVUZGRVIsIHRoaXMuZ2wuREVQVEhfQVRUQUNITUVOVCwgdGhpcy5nbC5SRU5ERVJCVUZGRVIsIHRoaXMuZmJvX2RlcHRoX3JiKTtcblxuICAgIHRoaXMuZ2wuYmluZEZyYW1lYnVmZmVyKHRoaXMuZ2wuRlJBTUVCVUZGRVIsIG51bGwpO1xuICAgIHRoaXMuZ2wudmlld3BvcnQoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG59O1xuXG4vLyBXZWIgd29ya2VycyBoYW5kbGUgaGVhdnkgZHV0eSB0aWxlIGNvbnN0cnVjdGlvbjogbmV0d29ya2luZywgZ2VvbWV0cnkgcHJvY2Vzc2luZywgZXRjLlxuU2NlbmUucHJvdG90eXBlLmNyZWF0ZVdvcmtlcnMgPSBmdW5jdGlvbiAoY2FsbGJhY2spXG57XG4gICAgdmFyIHF1ZXVlID0gUXVldWUoKTtcbiAgICB2YXIgd29ya2VyX3VybCA9IFNjZW5lLmxpYnJhcnlfYmFzZV91cmwgKyAndGFuZ3JhbS13b3JrZXIubWluLmpzJyArICc/JyArICgrbmV3IERhdGUoKSk7XG5cbiAgICAvLyBMb2FkICYgaW5zdGFudGlhdGUgd29ya2Vyc1xuICAgIHF1ZXVlLmRlZmVyKGNvbXBsZXRlID0+IHtcbiAgICAgICAgLy8gTG9jYWwgb2JqZWN0IFVSTHMgc3VwcG9ydGVkP1xuICAgICAgICB2YXIgY3JlYXRlT2JqZWN0VVJMID0gKHdpbmRvdy5VUkwgJiYgd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwpIHx8ICh3aW5kb3cud2Via2l0VVJMICYmIHdpbmRvdy53ZWJraXRVUkwuY3JlYXRlT2JqZWN0VVJMKTtcbiAgICAgICAgaWYgKGNyZWF0ZU9iamVjdFVSTCAmJiB0aGlzLmFsbG93X2Nyb3NzX2RvbWFpbl93b3JrZXJzKSB7XG4gICAgICAgICAgICAvLyBUbyBhbGxvdyB3b3JrZXJzIHRvIGJlIGxvYWRlZCBjcm9zcy1kb21haW4sIGZpcnN0IGxvYWQgd29ya2VyIHNvdXJjZSB2aWEgWEhSLCB0aGVuIGNyZWF0ZSBhIGxvY2FsIFVSTCB2aWEgYSBibG9iXG4gICAgICAgICAgICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICByZXEub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJfbG9jYWxfdXJsID0gY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtyZXEucmVzcG9uc2VdLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0JyB9KSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tYWtlV29ya2Vycyh3b3JrZXJfbG9jYWxfdXJsKTtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlcS5vcGVuKCdHRVQnLCB3b3JrZXJfdXJsLCB0cnVlIC8qIGFzeW5jIGZsYWcgKi8pO1xuICAgICAgICAgICAgcmVxLnJlc3BvbnNlVHlwZSA9ICd0ZXh0JztcbiAgICAgICAgICAgIHJlcS5zZW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVHJhZGl0aW9uYWwgbG9hZCBmcm9tIHJlbW90ZSBVUkxcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMubWFrZVdvcmtlcnMod29ya2VyX3VybCk7XG4gICAgICAgICAgICBjb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBJbml0IHdvcmtlcnNcbiAgICBxdWV1ZS5hd2FpdCgoKSA9PiB7XG4gICAgICAgIHRoaXMud29ya2Vycy5mb3JFYWNoKHdvcmtlciA9PiB7XG4gICAgICAgICAgICB3b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMud29ya2VyQnVpbGRUaWxlQ29tcGxldGVkLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgd29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLndvcmtlckdldEZlYXR1cmVTZWxlY3Rpb24uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB3b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMud29ya2VyTG9nTWVzc2FnZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5uZXh0X3dvcmtlciA9IDA7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uX21hcF93b3JrZXJfc2l6ZSA9IHt9O1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuLy8gSW5zdGFudGlhdGUgd29ya2VycyBmcm9tIFVSTFxuU2NlbmUucHJvdG90eXBlLm1ha2VXb3JrZXJzID0gZnVuY3Rpb24gKHVybClcbntcbiAgICB0aGlzLndvcmtlcnMgPSBbXTtcbiAgICBmb3IgKHZhciB3PTA7IHcgPCB0aGlzLm51bV93b3JrZXJzOyB3KyspIHtcbiAgICAgICAgdGhpcy53b3JrZXJzLnB1c2gobmV3IFdvcmtlcih1cmwpKTtcbiAgICAgICAgdGhpcy53b3JrZXJzW3ddLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6ICdpbml0JyxcbiAgICAgICAgICAgIHdvcmtlcl9pZDogdyxcbiAgICAgICAgICAgIG51bV93b3JrZXJzOiB0aGlzLm51bV93b3JrZXJzXG4gICAgICAgIH0pXG4gICAgfVxufTtcblxuLy8gUG9zdCBhIG1lc3NhZ2UgYWJvdXQgYSB0aWxlIHRvIHRoZSBuZXh0IHdvcmtlciAocm91bmQgcm9iYmluKVxuU2NlbmUucHJvdG90eXBlLndvcmtlclBvc3RNZXNzYWdlRm9yVGlsZSA9IGZ1bmN0aW9uICh0aWxlLCBtZXNzYWdlKVxue1xuICAgIGlmICh0aWxlLndvcmtlciA9PSBudWxsKSB7XG4gICAgICAgIHRpbGUud29ya2VyID0gdGhpcy5uZXh0X3dvcmtlcjtcbiAgICAgICAgdGhpcy5uZXh0X3dvcmtlciA9ICh0aWxlLndvcmtlciArIDEpICUgdGhpcy53b3JrZXJzLmxlbmd0aDtcbiAgICB9XG4gICAgdGhpcy53b3JrZXJzW3RpbGUud29ya2VyXS5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbn07XG5cblNjZW5lLnByb3RvdHlwZS5zZXRDZW50ZXIgPSBmdW5jdGlvbiAobG5nLCBsYXQpXG57XG4gICAgdGhpcy5jZW50ZXIgPSB7IGxuZzogbG5nLCBsYXQ6IGxhdCB9O1xuICAgIHRoaXMuZGlydHkgPSB0cnVlO1xufTtcblxuU2NlbmUucHJvdG90eXBlLnN0YXJ0Wm9vbSA9IGZ1bmN0aW9uICgpXG57XG4gICAgdGhpcy5sYXN0X3pvb20gPSB0aGlzLnpvb207XG4gICAgdGhpcy56b29taW5nID0gdHJ1ZTtcbn07XG5cblNjZW5lLnByb3RvdHlwZS5wcmVzZXJ2ZV90aWxlc193aXRoaW5fem9vbSA9IDI7XG5TY2VuZS5wcm90b3R5cGUuc2V0Wm9vbSA9IGZ1bmN0aW9uICh6b29tKVxue1xuICAgIC8vIFNjaGVkdWxlIEdMIHRpbGVzIGZvciByZW1vdmFsIG9uIHpvb21cbiAgICB2YXIgYmVsb3cgPSB6b29tO1xuICAgIHZhciBhYm92ZSA9IHpvb207XG4gICAgaWYgKHRoaXMubGFzdF96b29tICE9IG51bGwpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzY2VuZS5sYXN0X3pvb206IFwiICsgdGhpcy5sYXN0X3pvb20pO1xuICAgICAgICBpZiAoTWF0aC5hYnMoem9vbSAtIHRoaXMubGFzdF96b29tKSA8PSB0aGlzLnByZXNlcnZlX3RpbGVzX3dpdGhpbl96b29tKSB7XG4gICAgICAgICAgICBpZiAoem9vbSA+IHRoaXMubGFzdF96b29tKSB7XG4gICAgICAgICAgICAgICAgYmVsb3cgPSB6b29tIC0gdGhpcy5wcmVzZXJ2ZV90aWxlc193aXRoaW5fem9vbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFib3ZlID0gem9vbSArIHRoaXMucHJlc2VydmVfdGlsZXNfd2l0aGluX3pvb207XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmxhc3Rfem9vbSA9IHRoaXMuem9vbTtcbiAgICB0aGlzLnpvb20gPSB6b29tO1xuICAgIHRoaXMuY2FwcGVkX3pvb20gPSBNYXRoLm1pbih+fnRoaXMuem9vbSwgdGhpcy50aWxlX3NvdXJjZS5tYXhfem9vbSB8fCB+fnRoaXMuem9vbSk7XG4gICAgdGhpcy56b29taW5nID0gZmFsc2U7XG5cbiAgICB0aGlzLnJlbW92ZVRpbGVzT3V0c2lkZVpvb21SYW5nZShiZWxvdywgYWJvdmUpO1xuICAgIHRoaXMuZGlydHkgPSB0cnVlO1xufTtcblxuU2NlbmUucHJvdG90eXBlLnJlbW92ZVRpbGVzT3V0c2lkZVpvb21SYW5nZSA9IGZ1bmN0aW9uIChiZWxvdywgYWJvdmUpXG57XG4gICAgYmVsb3cgPSBNYXRoLm1pbihiZWxvdywgdGhpcy50aWxlX3NvdXJjZS5tYXhfem9vbSB8fCBiZWxvdyk7XG4gICAgYWJvdmUgPSBNYXRoLm1pbihhYm92ZSwgdGhpcy50aWxlX3NvdXJjZS5tYXhfem9vbSB8fCBhYm92ZSk7XG5cbiAgICBjb25zb2xlLmxvZyhcInJlbW92ZVRpbGVzT3V0c2lkZVpvb21SYW5nZSBbXCIgKyBiZWxvdyArIFwiLCBcIiArIGFib3ZlICsgXCJdKVwiKTtcbiAgICB2YXIgcmVtb3ZlX3RpbGVzID0gW107XG4gICAgZm9yICh2YXIgdCBpbiB0aGlzLnRpbGVzKSB7XG4gICAgICAgIHZhciB0aWxlID0gdGhpcy50aWxlc1t0XTtcbiAgICAgICAgaWYgKHRpbGUuY29vcmRzLnogPCBiZWxvdyB8fCB0aWxlLmNvb3Jkcy56ID4gYWJvdmUpIHtcbiAgICAgICAgICAgIHJlbW92ZV90aWxlcy5wdXNoKHQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIHI9MDsgciA8IHJlbW92ZV90aWxlcy5sZW5ndGg7IHIrKykge1xuICAgICAgICB2YXIga2V5ID0gcmVtb3ZlX3RpbGVzW3JdO1xuICAgICAgICBjb25zb2xlLmxvZyhcInJlbW92ZWQgXCIgKyBrZXkgKyBcIiAob3V0c2lkZSByYW5nZSBbXCIgKyBiZWxvdyArIFwiLCBcIiArIGFib3ZlICsgXCJdKVwiKTtcbiAgICAgICAgdGhpcy5yZW1vdmVUaWxlKGtleSk7XG4gICAgfVxufTtcblxuU2NlbmUucHJvdG90eXBlLnNldEJvdW5kcyA9IGZ1bmN0aW9uIChzdywgbmUpXG57XG4gICAgdGhpcy5ib3VuZHMgPSB7XG4gICAgICAgIHN3OiB7IGxuZzogc3cubG5nLCBsYXQ6IHN3LmxhdCB9LFxuICAgICAgICBuZTogeyBsbmc6IG5lLmxuZywgbGF0OiBuZS5sYXQgfVxuICAgIH07XG5cbiAgICB2YXIgYnVmZmVyID0gMjAwICogR2VvLm1ldGVyc19wZXJfcGl4ZWxbfn50aGlzLnpvb21dOyAvLyBwaXhlbHMgLT4gbWV0ZXJzXG4gICAgdGhpcy5idWZmZXJlZF9tZXRlcl9ib3VuZHMgPSB7XG4gICAgICAgIHN3OiBHZW8ubGF0TG5nVG9NZXRlcnMoUG9pbnQodGhpcy5ib3VuZHMuc3cubG5nLCB0aGlzLmJvdW5kcy5zdy5sYXQpKSxcbiAgICAgICAgbmU6IEdlby5sYXRMbmdUb01ldGVycyhQb2ludCh0aGlzLmJvdW5kcy5uZS5sbmcsIHRoaXMuYm91bmRzLm5lLmxhdCkpXG4gICAgfTtcbiAgICB0aGlzLmJ1ZmZlcmVkX21ldGVyX2JvdW5kcy5zdy54IC09IGJ1ZmZlcjtcbiAgICB0aGlzLmJ1ZmZlcmVkX21ldGVyX2JvdW5kcy5zdy55IC09IGJ1ZmZlcjtcbiAgICB0aGlzLmJ1ZmZlcmVkX21ldGVyX2JvdW5kcy5uZS54ICs9IGJ1ZmZlcjtcbiAgICB0aGlzLmJ1ZmZlcmVkX21ldGVyX2JvdW5kcy5uZS55ICs9IGJ1ZmZlcjtcblxuICAgIHRoaXMuY2VudGVyX21ldGVycyA9IFBvaW50KFxuICAgICAgICAodGhpcy5idWZmZXJlZF9tZXRlcl9ib3VuZHMuc3cueCArIHRoaXMuYnVmZmVyZWRfbWV0ZXJfYm91bmRzLm5lLngpIC8gMixcbiAgICAgICAgKHRoaXMuYnVmZmVyZWRfbWV0ZXJfYm91bmRzLnN3LnkgKyB0aGlzLmJ1ZmZlcmVkX21ldGVyX2JvdW5kcy5uZS55KSAvIDJcbiAgICApO1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJzZXQgc2NlbmUgYm91bmRzIHRvIFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5ib3VuZHMpKTtcblxuICAgIC8vIE1hcmsgdGlsZXMgYXMgdmlzaWJsZS9pbnZpc2libGVcbiAgICBmb3IgKHZhciB0IGluIHRoaXMudGlsZXMpIHtcbiAgICAgICAgdGhpcy51cGRhdGVWaXNpYmlsaXR5Rm9yVGlsZSh0aGlzLnRpbGVzW3RdKTtcbiAgICB9XG5cbiAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbn07XG5cblNjZW5lLnByb3RvdHlwZS5pc1RpbGVJblpvb20gPSBmdW5jdGlvbiAodGlsZSlcbntcbiAgICByZXR1cm4gKE1hdGgubWluKHRpbGUuY29vcmRzLnosIHRoaXMudGlsZV9zb3VyY2UubWF4X3pvb20gfHwgdGlsZS5jb29yZHMueikgPT0gdGhpcy5jYXBwZWRfem9vbSk7XG59O1xuXG4vLyBVcGRhdGUgdmlzaWJpbGl0eSBhbmQgcmV0dXJuIHRydWUgaWYgY2hhbmdlZFxuU2NlbmUucHJvdG90eXBlLnVwZGF0ZVZpc2liaWxpdHlGb3JUaWxlID0gZnVuY3Rpb24gKHRpbGUpXG57XG4gICAgdmFyIHZpc2libGUgPSB0aWxlLnZpc2libGU7XG4gICAgdGlsZS52aXNpYmxlID0gdGhpcy5pc1RpbGVJblpvb20odGlsZSkgJiYgR2VvLmJveEludGVyc2VjdCh0aWxlLmJvdW5kcywgdGhpcy5idWZmZXJlZF9tZXRlcl9ib3VuZHMpO1xuICAgIHRpbGUuY2VudGVyX2Rpc3QgPSBNYXRoLmFicyh0aGlzLmNlbnRlcl9tZXRlcnMueCAtIHRpbGUubWluLngpICsgTWF0aC5hYnModGhpcy5jZW50ZXJfbWV0ZXJzLnkgLSB0aWxlLm1pbi55KTtcbiAgICByZXR1cm4gKHZpc2libGUgIT0gdGlsZS52aXNpYmxlKTtcbn07XG5cblNjZW5lLnByb3RvdHlwZS5yZXNpemVNYXAgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodClcbntcbiAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcblxuICAgIHRoaXMuY3NzX3NpemUgPSB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfTtcbiAgICB0aGlzLmRldmljZV9zaXplID0geyB3aWR0aDogTWF0aC5yb3VuZCh0aGlzLmNzc19zaXplLndpZHRoICogdGhpcy5kZXZpY2VfcGl4ZWxfcmF0aW8pLCBoZWlnaHQ6IE1hdGgucm91bmQodGhpcy5jc3Nfc2l6ZS5oZWlnaHQgKiB0aGlzLmRldmljZV9waXhlbF9yYXRpbykgfTtcblxuICAgIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gdGhpcy5jc3Nfc2l6ZS53aWR0aCArICdweCc7XG4gICAgdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gdGhpcy5jc3Nfc2l6ZS5oZWlnaHQgKyAncHgnO1xuICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy5kZXZpY2Vfc2l6ZS53aWR0aDtcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmRldmljZV9zaXplLmhlaWdodDtcblxuICAgIHRoaXMuZ2wuYmluZEZyYW1lYnVmZmVyKHRoaXMuZ2wuRlJBTUVCVUZGRVIsIG51bGwpO1xuICAgIHRoaXMuZ2wudmlld3BvcnQoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG59O1xuXG5TY2VuZS5wcm90b3R5cGUucmVxdWVzdFJlZHJhdyA9IGZ1bmN0aW9uICgpXG57XG4gICAgdGhpcy5kaXJ0eSA9IHRydWU7XG59O1xuXG4vLyBEZXRlcm1pbmUgYSBaIHZhbHVlIHRoYXQgd2lsbCBzdGFjayBmZWF0dXJlcyBpbiBhIFwicGFpbnRlcidzIGFsZ29yaXRobVwiIHN0eWxlLCBmaXJzdCBieSBsYXllciwgdGhlbiBieSBkcmF3IG9yZGVyIHdpdGhpbiBsYXllclxuLy8gRmVhdHVyZXMgYXJlIGFzc3VtZWQgdG8gYmUgYWxyZWFkeSBzb3J0ZWQgaW4gZGVzaXJlZCBkcmF3IG9yZGVyIGJ5IHRoZSBsYXllciBwcmUtcHJvY2Vzc29yXG5TY2VuZS5jYWxjdWxhdGVaID0gZnVuY3Rpb24gKGxheWVyLCB0aWxlLCBsYXllcl9vZmZzZXQsIGZlYXR1cmVfb2Zmc2V0KVxue1xuICAgIC8vIHZhciBsYXllcl9vZmZzZXQgPSBsYXllcl9vZmZzZXQgfHwgMDtcbiAgICAvLyB2YXIgZmVhdHVyZV9vZmZzZXQgPSBmZWF0dXJlX29mZnNldCB8fCAwO1xuICAgIHZhciB6ID0gMDsgLy8gVE9ETzogbWFkZSB0aGlzIGEgbm8tb3AgdW50aWwgcmV2aXNpdGluZyB3aGVyZSBpdCBzaG91bGQgbGl2ZSAtIG9uZS10aW1lIGNhbGMgaGVyZSwgaW4gdmVydGV4IGxheW91dC9zaGFkZXIsIGV0Yy5cbiAgICByZXR1cm4gejtcbn07XG5cblNjZW5lLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKVxue1xuICAgIHRoaXMubG9hZFF1ZXVlZFRpbGVzKCk7XG5cbiAgICAvLyBSZW5kZXIgb24gZGVtYW5kXG4gICAgaWYgKHRoaXMuZGlydHkgPT0gZmFsc2UgfHwgdGhpcy5pbml0aWFsaXplZCA9PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuZGlydHkgPSBmYWxzZTsgLy8gc3ViY2xhc3NlcyBjYW4gc2V0IHRoaXMgYmFjayB0byB0cnVlIHdoZW4gYW5pbWF0aW9uIGlzIG5lZWRlZFxuXG4gICAgdGhpcy5yZW5kZXJHTCgpO1xuXG4gICAgLy8gUmVkcmF3IGV2ZXJ5IGZyYW1lIGlmIGFuaW1hdGluZ1xuICAgIGlmICh0aGlzLmFuaW1hdGVkID09IHRydWUpIHtcbiAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5mcmFtZSsrO1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJyZW5kZXIgbWFwXCIpO1xuICAgIHJldHVybiB0cnVlO1xufTtcblxuU2NlbmUucHJvdG90eXBlLnJlc2V0RnJhbWUgPSBmdW5jdGlvbiAoKVxue1xuICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gUmVzZXQgZnJhbWUgc3RhdGVcbiAgICB2YXIgZ2wgPSB0aGlzLmdsO1xuICAgIGdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMS4wKTtcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG5cbiAgICAvLyBUT0RPOiB1bm5lY2Vzc2FyeSByZXBlYXQ/XG4gICAgZ2wuZW5hYmxlKGdsLkRFUFRIX1RFU1QpO1xuICAgIGdsLmRlcHRoRnVuYyhnbC5MRVNTKTtcbiAgICBnbC5lbmFibGUoZ2wuQ1VMTF9GQUNFKTtcbiAgICBnbC5jdWxsRmFjZShnbC5CQUNLKTtcbiAgICAvLyBnbC5lbmFibGUoZ2wuQkxFTkQpO1xuICAgIC8vIGdsLmJsZW5kRnVuYyhnbC5TUkNfQUxQSEEsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xufTtcblxuU2NlbmUucHJvdG90eXBlLnJlbmRlckdMID0gZnVuY3Rpb24gKClcbntcbiAgICB2YXIgZ2wgPSB0aGlzLmdsO1xuXG4gICAgdGhpcy5pbnB1dCgpO1xuICAgIHRoaXMucmVzZXRGcmFtZSgpO1xuXG4gICAgLy8gTWFwIHRyYW5zZm9ybXNcbiAgICB2YXIgY2VudGVyID0gR2VvLmxhdExuZ1RvTWV0ZXJzKFBvaW50KHRoaXMuY2VudGVyLmxuZywgdGhpcy5jZW50ZXIubGF0KSk7XG4gICAgdmFyIG1ldGVyc19wZXJfcGl4ZWwgPSBHZW8ubWluX3pvb21fbWV0ZXJzX3Blcl9waXhlbCAvIE1hdGgucG93KDIsIHRoaXMuem9vbSk7XG4gICAgdmFyIG1ldGVyX3pvb20gPSBQb2ludCh0aGlzLmNzc19zaXplLndpZHRoIC8gMiAqIG1ldGVyc19wZXJfcGl4ZWwsIHRoaXMuY3NzX3NpemUuaGVpZ2h0IC8gMiAqIG1ldGVyc19wZXJfcGl4ZWwpO1xuXG4gICAgLy8gTWF0cmljZXNcbiAgICB2YXIgdGlsZV92aWV3X21hdCA9IG1hdDQuY3JlYXRlKCk7XG4gICAgdmFyIHRpbGVfd29ybGRfbWF0ID0gbWF0NC5jcmVhdGUoKTtcbiAgICB2YXIgbWV0ZXJfdmlld19tYXQgPSBtYXQ0LmNyZWF0ZSgpO1xuXG4gICAgLy8gQ29udmVydCBtZXJjYXRvciBtZXRlcnMgdG8gc2NyZWVuIHNwYWNlXG4gICAgbWF0NC5zY2FsZShtZXRlcl92aWV3X21hdCwgbWV0ZXJfdmlld19tYXQsIHZlYzMuZnJvbVZhbHVlcygxIC8gbWV0ZXJfem9vbS54LCAxIC8gbWV0ZXJfem9vbS55LCAxIC8gbWV0ZXJfem9vbS55KSk7XG5cbiAgICAvLyBSZW5kZXJhYmxlIHRpbGUgbGlzdFxuICAgIHZhciByZW5kZXJhYmxlX3RpbGVzID0gW107XG4gICAgZm9yICh2YXIgdCBpbiB0aGlzLnRpbGVzKSB7XG4gICAgICAgIHZhciB0aWxlID0gdGhpcy50aWxlc1t0XTtcbiAgICAgICAgaWYgKHRpbGUubG9hZGVkID09IHRydWUgJiYgdGlsZS52aXNpYmxlID09IHRydWUpIHtcbiAgICAgICAgICAgIHJlbmRlcmFibGVfdGlsZXMucHVzaCh0aWxlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJlbmRlcmFibGVfdGlsZXNfY291bnQgPSByZW5kZXJhYmxlX3RpbGVzLmxlbmd0aDtcblxuICAgIC8vIFJlbmRlciBtYWluIHBhc3MgLSB0aWxlcyBncm91cGVkIGJ5IHJlbmRlcmluZyBtb2RlIChHTCBwcm9ncmFtKVxuICAgIHZhciByZW5kZXJfY291bnQgPSAwO1xuICAgIGZvciAodmFyIG1vZGUgaW4gdGhpcy5tb2Rlcykge1xuICAgICAgICAvLyBQZXItZnJhbWUgbW9kZSB1cGRhdGVzL2FuaW1hdGlvbnNcbiAgICAgICAgLy8gQ2FsbGVkIGV2ZW4gaWYgdGhlIG1vZGUgaXNuJ3QgcmVuZGVyZWQgYnkgYW55IGN1cnJlbnQgdGlsZXMsIHNvIHRpbWUtYmFzZWQgYW5pbWF0aW9ucywgZXRjLiBjb250aW51ZVxuICAgICAgICB0aGlzLm1vZGVzW21vZGVdLnVwZGF0ZSgpO1xuXG4gICAgICAgIHZhciBnbF9wcm9ncmFtID0gdGhpcy5tb2Rlc1ttb2RlXS5nbF9wcm9ncmFtO1xuICAgICAgICBpZiAoZ2xfcHJvZ3JhbSA9PSBudWxsIHx8IGdsX3Byb2dyYW0uY29tcGlsZWQgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZpcnN0X2Zvcl9tb2RlID0gdHJ1ZTtcblxuICAgICAgICAvLyBSZW5kZXIgdGlsZSBHTCBnZW9tZXRyaWVzXG4gICAgICAgIGZvciAodmFyIHQgaW4gcmVuZGVyYWJsZV90aWxlcykge1xuICAgICAgICAgICAgdmFyIHRpbGUgPSByZW5kZXJhYmxlX3RpbGVzW3RdO1xuXG4gICAgICAgICAgICBpZiAodGlsZS5nbF9nZW9tZXRyeVttb2RlXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gU2V0dXAgbW9kZSBpZiBlbmNvdW50ZXJpbmcgZm9yIGZpcnN0IHRpbWUgdGhpcyBmcmFtZVxuICAgICAgICAgICAgICAgIC8vIChsYXp5IGluaXQsIG5vdCBhbGwgbW9kZXMgd2lsbCBiZSB1c2VkIGluIGFsbCBzY3JlZW4gdmlld3M7IHNvbWUgbW9kZXMgbWlnaHQgYmUgZGVmaW5lZCBidXQgbmV2ZXIgdXNlZClcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RfZm9yX21vZGUgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdF9mb3JfbW9kZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIGdsX3Byb2dyYW0udXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZXNbbW9kZV0uc2V0VW5pZm9ybXMoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb24ndCBzZXQgdW5pZm9ybXMgd2hlbiB0aGV5IGhhdmVuJ3QgY2hhbmdlZFxuICAgICAgICAgICAgICAgICAgICBnbF9wcm9ncmFtLnVuaWZvcm0oJzJmJywgJ3VfcmVzb2x1dGlvbicsIHRoaXMuZGV2aWNlX3NpemUud2lkdGgsIHRoaXMuZGV2aWNlX3NpemUuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgZ2xfcHJvZ3JhbS51bmlmb3JtKCcyZicsICd1X2FzcGVjdCcsIHRoaXMuZGV2aWNlX3NpemUud2lkdGggLyB0aGlzLmRldmljZV9zaXplLmhlaWdodCwgMS4wKTtcbiAgICAgICAgICAgICAgICAgICAgZ2xfcHJvZ3JhbS51bmlmb3JtKCcxZicsICd1X3RpbWUnLCAoKCtuZXcgRGF0ZSgpKSAtIHRoaXMuc3RhcnRfdGltZSkgLyAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgZ2xfcHJvZ3JhbS51bmlmb3JtKCcxZicsICd1X21hcF96b29tJywgdGhpcy56b29tKTsgLy8gTWF0aC5mbG9vcih0aGlzLnpvb20pICsgKE1hdGgubG9nKCh0aGlzLnpvb20gJSAxKSArIDEpIC8gTWF0aC5MTjIgLy8gc2NhbGUgZnJhY3Rpb25hbCB6b29tIGJ5IGxvZ1xuICAgICAgICAgICAgICAgICAgICBnbF9wcm9ncmFtLnVuaWZvcm0oJzJmJywgJ3VfbWFwX2NlbnRlcicsIGNlbnRlci54LCBjZW50ZXIueSk7XG4gICAgICAgICAgICAgICAgICAgIGdsX3Byb2dyYW0udW5pZm9ybSgnMWYnLCAndV9udW1fbGF5ZXJzJywgdGhpcy5sYXllcnMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgZ2xfcHJvZ3JhbS51bmlmb3JtKCcxZicsICd1X21ldGVyc19wZXJfcGl4ZWwnLCBtZXRlcnNfcGVyX3BpeGVsKTtcbiAgICAgICAgICAgICAgICAgICAgZ2xfcHJvZ3JhbS51bmlmb3JtKCdNYXRyaXg0ZnYnLCAndV9tZXRlcl92aWV3JywgZmFsc2UsIG1ldGVyX3ZpZXdfbWF0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBjYWxjIHRoZXNlIG9uY2UgcGVyIHRpbGUgKGN1cnJlbnRseSBiZWluZyBuZWVkbGVzc2x5IHJlLWNhbGN1bGF0ZWQgcGVyLXRpbGUtcGVyLW1vZGUpXG5cbiAgICAgICAgICAgICAgICAvLyBUaWxlIG9yaWdpblxuICAgICAgICAgICAgICAgIGdsX3Byb2dyYW0udW5pZm9ybSgnMmYnLCAndV90aWxlX29yaWdpbicsIHRpbGUubWluLngsIHRpbGUubWluLnkpO1xuXG4gICAgICAgICAgICAgICAgLy8gVGlsZSB2aWV3IG1hdHJpeCAtIHRyYW5zZm9ybSB0aWxlIHNwYWNlIGludG8gdmlldyBzcGFjZSAobWV0ZXJzLCByZWxhdGl2ZSB0byBjYW1lcmEpXG4gICAgICAgICAgICAgICAgbWF0NC5pZGVudGl0eSh0aWxlX3ZpZXdfbWF0KTtcbiAgICAgICAgICAgICAgICBtYXQ0LnRyYW5zbGF0ZSh0aWxlX3ZpZXdfbWF0LCB0aWxlX3ZpZXdfbWF0LCB2ZWMzLmZyb21WYWx1ZXModGlsZS5taW4ueCAtIGNlbnRlci54LCB0aWxlLm1pbi55IC0gY2VudGVyLnksIDApKTsgLy8gYWRqdXN0IGZvciB0aWxlIG9yaWdpbiAmIG1hcCBjZW50ZXJcbiAgICAgICAgICAgICAgICBtYXQ0LnNjYWxlKHRpbGVfdmlld19tYXQsIHRpbGVfdmlld19tYXQsIHZlYzMuZnJvbVZhbHVlcyh0aWxlLnNwYW4ueCAvIFNjZW5lLnRpbGVfc2NhbGUsIC0xICogdGlsZS5zcGFuLnkgLyBTY2VuZS50aWxlX3NjYWxlLCAxKSk7IC8vIHNjYWxlIHRpbGUgbG9jYWwgY29vcmRzIHRvIG1ldGVyc1xuICAgICAgICAgICAgICAgIGdsX3Byb2dyYW0udW5pZm9ybSgnTWF0cml4NGZ2JywgJ3VfdGlsZV92aWV3JywgZmFsc2UsIHRpbGVfdmlld19tYXQpO1xuXG4gICAgICAgICAgICAgICAgLy8gVGlsZSB3b3JsZCBtYXRyaXggLSB0cmFuc2Zvcm0gdGlsZSBzcGFjZSBpbnRvIHdvcmxkIHNwYWNlIChtZXRlcnMsIGFic29sdXRlIG1lcmNhdG9yIHBvc2l0aW9uKVxuICAgICAgICAgICAgICAgIG1hdDQuaWRlbnRpdHkodGlsZV93b3JsZF9tYXQpO1xuICAgICAgICAgICAgICAgIG1hdDQudHJhbnNsYXRlKHRpbGVfd29ybGRfbWF0LCB0aWxlX3dvcmxkX21hdCwgdmVjMy5mcm9tVmFsdWVzKHRpbGUubWluLngsIHRpbGUubWluLnksIDApKTtcbiAgICAgICAgICAgICAgICBtYXQ0LnNjYWxlKHRpbGVfd29ybGRfbWF0LCB0aWxlX3dvcmxkX21hdCwgdmVjMy5mcm9tVmFsdWVzKHRpbGUuc3Bhbi54IC8gU2NlbmUudGlsZV9zY2FsZSwgLTEgKiB0aWxlLnNwYW4ueSAvIFNjZW5lLnRpbGVfc2NhbGUsIDEpKTsgLy8gc2NhbGUgdGlsZSBsb2NhbCBjb29yZHMgdG8gbWV0ZXJzXG4gICAgICAgICAgICAgICAgZ2xfcHJvZ3JhbS51bmlmb3JtKCdNYXRyaXg0ZnYnLCAndV90aWxlX3dvcmxkJywgZmFsc2UsIHRpbGVfd29ybGRfbWF0KTtcblxuICAgICAgICAgICAgICAgIC8vIFJlbmRlciB0aWxlXG4gICAgICAgICAgICAgICAgdGlsZS5nbF9nZW9tZXRyeVttb2RlXS5yZW5kZXIoKTtcbiAgICAgICAgICAgICAgICByZW5kZXJfY291bnQgKz0gdGlsZS5nbF9nZW9tZXRyeVttb2RlXS5nZW9tZXRyeV9jb3VudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbmRlciBzZWxlY3Rpb24gcGFzcyAoaWYgbmVlZGVkKVxuICAgIC8vIFNsaWdodCB2YXJpYXRpb25zIG9uIHJlbmRlciBwYXNzIGNvZGUgYWJvdmUgLSBtb3N0bHkgYmVjYXVzZSB3ZSdyZSByZXVzaW5nIHVuaWZvcm1zIGZyb20gdGhlIG1haW5cbiAgICAvLyBtb2RlIHByb2dyYW0sIGZvciB0aGUgc2VsZWN0aW9uIHByb2dyYW1cbiAgICAvLyBUT0RPOiByZWR1Y2UgZHVwbGljYXRlZCBjb2RlIHcvbWFpbiByZW5kZXIgcGFzcyBhYm92ZVxuICAgIGlmICh0aGlzLnVwZGF0ZV9zZWxlY3Rpb24pIHtcbiAgICAgICAgdGhpcy51cGRhdGVfc2VsZWN0aW9uID0gZmFsc2U7IC8vIHJlc2V0IHNlbGVjdGlvbiBjaGVja1xuXG4gICAgICAgIC8vIFRPRE86IHF1ZXVlIGNhbGxiYWNrIHRpbGwgcGFubmluZyBpcyBvdmVyPyBjb29yZHMgd2hlcmUgc2VsZWN0aW9uIHdhcyByZXF1ZXN0ZWQgYXJlIG91dCBvZiBkYXRlXG4gICAgICAgIGlmICh0aGlzLnBhbm5pbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN3aXRjaCB0byBGQk9cbiAgICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCB0aGlzLmZibyk7XG4gICAgICAgIGdsLnZpZXdwb3J0KDAsIDAsIHRoaXMuZmJvX3NpemUud2lkdGgsIHRoaXMuZmJvX3NpemUuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5yZXNldEZyYW1lKCk7XG5cbiAgICAgICAgZm9yIChtb2RlIGluIHRoaXMubW9kZXMpIHtcbiAgICAgICAgICAgIGdsX3Byb2dyYW0gPSB0aGlzLm1vZGVzW21vZGVdLnNlbGVjdGlvbl9nbF9wcm9ncmFtO1xuICAgICAgICAgICAgaWYgKGdsX3Byb2dyYW0gPT0gbnVsbCB8fCBnbF9wcm9ncmFtLmNvbXBpbGVkID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZpcnN0X2Zvcl9tb2RlID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIHRpbGUgR0wgZ2VvbWV0cmllc1xuICAgICAgICAgICAgZm9yICh0IGluIHJlbmRlcmFibGVfdGlsZXMpIHtcbiAgICAgICAgICAgICAgICB0aWxlID0gcmVuZGVyYWJsZV90aWxlc1t0XTtcblxuICAgICAgICAgICAgICAgIGlmICh0aWxlLmdsX2dlb21ldHJ5W21vZGVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0dXAgbW9kZSBpZiBlbmNvdW50ZXJpbmcgZm9yIGZpcnN0IHRpbWUgdGhpcyBmcmFtZVxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3RfZm9yX21vZGUgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RfZm9yX21vZGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZ2xfcHJvZ3JhbS51c2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZXNbbW9kZV0uc2V0VW5pZm9ybXMoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZ2xfcHJvZ3JhbS51bmlmb3JtKCcyZicsICd1X3Jlc29sdXRpb24nLCB0aGlzLmZib19zaXplLndpZHRoLCB0aGlzLmZib19zaXplLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBnbF9wcm9ncmFtLnVuaWZvcm0oJzJmJywgJ3VfYXNwZWN0JywgdGhpcy5mYm9fc2l6ZS53aWR0aCAvIHRoaXMuZmJvX3NpemUuaGVpZ2h0LCAxLjApO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2xfcHJvZ3JhbS51bmlmb3JtKCcxZicsICd1X3RpbWUnLCAoKCtuZXcgRGF0ZSgpKSAtIHRoaXMuc3RhcnRfdGltZSkgLyAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdsX3Byb2dyYW0udW5pZm9ybSgnMWYnLCAndV9tYXBfem9vbScsIHRoaXMuem9vbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBnbF9wcm9ncmFtLnVuaWZvcm0oJzJmJywgJ3VfbWFwX2NlbnRlcicsIGNlbnRlci54LCBjZW50ZXIueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBnbF9wcm9ncmFtLnVuaWZvcm0oJzFmJywgJ3VfbnVtX2xheWVycycsIHRoaXMubGF5ZXJzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBnbF9wcm9ncmFtLnVuaWZvcm0oJzFmJywgJ3VfbWV0ZXJzX3Blcl9waXhlbCcsIG1ldGVyc19wZXJfcGl4ZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2xfcHJvZ3JhbS51bmlmb3JtKCdNYXRyaXg0ZnYnLCAndV9tZXRlcl92aWV3JywgZmFsc2UsIG1ldGVyX3ZpZXdfbWF0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRpbGUgb3JpZ2luXG4gICAgICAgICAgICAgICAgICAgIGdsX3Byb2dyYW0udW5pZm9ybSgnMmYnLCAndV90aWxlX29yaWdpbicsIHRpbGUubWluLngsIHRpbGUubWluLnkpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRpbGUgdmlldyBtYXRyaXggLSB0cmFuc2Zvcm0gdGlsZSBzcGFjZSBpbnRvIHZpZXcgc3BhY2UgKG1ldGVycywgcmVsYXRpdmUgdG8gY2FtZXJhKVxuICAgICAgICAgICAgICAgICAgICBtYXQ0LmlkZW50aXR5KHRpbGVfdmlld19tYXQpO1xuICAgICAgICAgICAgICAgICAgICBtYXQ0LnRyYW5zbGF0ZSh0aWxlX3ZpZXdfbWF0LCB0aWxlX3ZpZXdfbWF0LCB2ZWMzLmZyb21WYWx1ZXModGlsZS5taW4ueCAtIGNlbnRlci54LCB0aWxlLm1pbi55IC0gY2VudGVyLnksIDApKTsgLy8gYWRqdXN0IGZvciB0aWxlIG9yaWdpbiAmIG1hcCBjZW50ZXJcbiAgICAgICAgICAgICAgICAgICAgbWF0NC5zY2FsZSh0aWxlX3ZpZXdfbWF0LCB0aWxlX3ZpZXdfbWF0LCB2ZWMzLmZyb21WYWx1ZXModGlsZS5zcGFuLnggLyBTY2VuZS50aWxlX3NjYWxlLCAtMSAqIHRpbGUuc3Bhbi55IC8gU2NlbmUudGlsZV9zY2FsZSwgMSkpOyAvLyBzY2FsZSB0aWxlIGxvY2FsIGNvb3JkcyB0byBtZXRlcnNcbiAgICAgICAgICAgICAgICAgICAgZ2xfcHJvZ3JhbS51bmlmb3JtKCdNYXRyaXg0ZnYnLCAndV90aWxlX3ZpZXcnLCBmYWxzZSwgdGlsZV92aWV3X21hdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVGlsZSB3b3JsZCBtYXRyaXggLSB0cmFuc2Zvcm0gdGlsZSBzcGFjZSBpbnRvIHdvcmxkIHNwYWNlIChtZXRlcnMsIGFic29sdXRlIG1lcmNhdG9yIHBvc2l0aW9uKVxuICAgICAgICAgICAgICAgICAgICBtYXQ0LmlkZW50aXR5KHRpbGVfd29ybGRfbWF0KTtcbiAgICAgICAgICAgICAgICAgICAgbWF0NC50cmFuc2xhdGUodGlsZV93b3JsZF9tYXQsIHRpbGVfd29ybGRfbWF0LCB2ZWMzLmZyb21WYWx1ZXModGlsZS5taW4ueCwgdGlsZS5taW4ueSwgMCkpO1xuICAgICAgICAgICAgICAgICAgICBtYXQ0LnNjYWxlKHRpbGVfd29ybGRfbWF0LCB0aWxlX3dvcmxkX21hdCwgdmVjMy5mcm9tVmFsdWVzKHRpbGUuc3Bhbi54IC8gU2NlbmUudGlsZV9zY2FsZSwgLTEgKiB0aWxlLnNwYW4ueSAvIFNjZW5lLnRpbGVfc2NhbGUsIDEpKTsgLy8gc2NhbGUgdGlsZSBsb2NhbCBjb29yZHMgdG8gbWV0ZXJzXG4gICAgICAgICAgICAgICAgICAgIGdsX3Byb2dyYW0udW5pZm9ybSgnTWF0cml4NGZ2JywgJ3VfdGlsZV93b3JsZCcsIGZhbHNlLCB0aWxlX3dvcmxkX21hdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmVuZGVyIHRpbGVcbiAgICAgICAgICAgICAgICAgICAgdGlsZS5nbF9nZW9tZXRyeVttb2RlXS5yZW5kZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZWxheSByZWFkaW5nIHRoZSBwaXhlbCByZXN1bHQgZnJvbSB0aGUgc2VsZWN0aW9uIGJ1ZmZlciB0byBhdm9pZCBDUFUvR1BVIHN5bmMgbG9jay5cbiAgICAgICAgLy8gQ2FsbGluZyByZWFkUGl4ZWxzIHN5bmNocm9ub3VzbHkgY2F1c2VkIGEgbWFzc2l2ZSBwZXJmb3JtYW5jZSBoaXQsIHByZXN1bWFibHkgc2luY2UgaXRcbiAgICAgICAgLy8gZm9yY2VkIHRoaXMgZnVuY3Rpb24gdG8gd2FpdCBmb3IgdGhlIEdQVSB0byBmaW5pc2ggcmVuZGVyaW5nIGFuZCByZXRyaWV2ZSB0aGUgdGV4dHVyZSBjb250ZW50cy5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uX2NhbGxiYWNrX3RpbWVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNlbGVjdGlvbl9jYWxsYmFja190aW1lcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25fY2FsbGJhY2tfdGltZXIgPSBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgdGhpcy5yZWFkU2VsZWN0aW9uQnVmZmVyLmJpbmQodGhpcyksXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbl9mcmFtZV9kZWxheVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIFJlc2V0IHRvIHNjcmVlbiBidWZmZXJcbiAgICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKTtcbiAgICAgICAgZ2wudmlld3BvcnQoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgaWYgKHJlbmRlcl9jb3VudCAhPSB0aGlzLmxhc3RfcmVuZGVyX2NvdW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVuZGVyZWQgXCIgKyByZW5kZXJfY291bnQgKyBcIiBwcmltaXRpdmVzXCIpO1xuICAgIH1cbiAgICB0aGlzLmxhc3RfcmVuZGVyX2NvdW50ID0gcmVuZGVyX2NvdW50O1xuXG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG4vLyBSZXF1ZXN0IGZlYXR1cmUgc2VsZWN0aW9uXG4vLyBSdW5zIGFzeW5jaHJvbm91c2x5LCBzY2hlZHVsZXMgc2VsZWN0aW9uIGJ1ZmZlciB0byBiZSB1cGRhdGVkXG5TY2VuZS5wcm90b3R5cGUuZ2V0RmVhdHVyZUF0ID0gZnVuY3Rpb24gKHBpeGVsLCBjYWxsYmFjaylcbntcbiAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFRPRE86IHF1ZXVlIGNhbGxiYWNrcyB3aGlsZSBzdGlsbCBwZXJmb3JtaW5nIG9ubHkgb25lIHNlbGVjdGlvbiByZW5kZXIgcGFzcyB3aXRoaW4gWCB0aW1lIGludGVydmFsP1xuICAgIGlmICh0aGlzLnVwZGF0ZV9zZWxlY3Rpb24gPT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3Rpb25fcG9pbnQgPSBQb2ludChcbiAgICAgICAgcGl4ZWwueCAqIHRoaXMuZGV2aWNlX3BpeGVsX3JhdGlvLFxuICAgICAgICB0aGlzLmRldmljZV9zaXplLmhlaWdodCAtIChwaXhlbC55ICogdGhpcy5kZXZpY2VfcGl4ZWxfcmF0aW8pXG4gICAgKTtcbiAgICB0aGlzLnNlbGVjdGlvbl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHRoaXMudXBkYXRlX3NlbGVjdGlvbiA9IHRydWU7XG4gICAgdGhpcy5kaXJ0eSA9IHRydWU7XG59O1xuXG5TY2VuZS5wcm90b3R5cGUucmVhZFNlbGVjdGlvbkJ1ZmZlciA9IGZ1bmN0aW9uICgpXG57XG4gICAgdmFyIGdsID0gdGhpcy5nbDtcblxuICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgdGhpcy5mYm8pO1xuXG4gICAgLy8gQ2hlY2sgc2VsZWN0aW9uIG1hcCBhZ2FpbnN0IEZCT1xuICAgIGdsLnJlYWRQaXhlbHMoXG4gICAgICAgIE1hdGguZmxvb3IodGhpcy5zZWxlY3Rpb25fcG9pbnQueCAqIHRoaXMuZmJvX3NpemUud2lkdGggLyB0aGlzLmRldmljZV9zaXplLndpZHRoKSxcbiAgICAgICAgTWF0aC5mbG9vcih0aGlzLnNlbGVjdGlvbl9wb2ludC55ICogdGhpcy5mYm9fc2l6ZS5oZWlnaHQgLyB0aGlzLmRldmljZV9zaXplLmhlaWdodCksXG4gICAgICAgIDEsIDEsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIHRoaXMucGl4ZWwpO1xuICAgIHZhciBmZWF0dXJlX2tleSA9ICh0aGlzLnBpeGVsWzBdICsgKHRoaXMucGl4ZWxbMV0gPDwgOCkgKyAodGhpcy5waXhlbFsyXSA8PCAxNikgKyAodGhpcy5waXhlbFszXSA8PCAyNCkpID4+PiAwO1xuXG4gICAgLy8gY29uc29sZS5sb2coXG4gICAgLy8gICAgIE1hdGguZmxvb3IodGhpcy5zZWxlY3Rpb25fcG9pbnQueCAqIHRoaXMuZmJvX3NpemUud2lkdGggLyB0aGlzLmRldmljZV9zaXplLndpZHRoKSArIFwiLCBcIiArXG4gICAgLy8gICAgIE1hdGguZmxvb3IodGhpcy5zZWxlY3Rpb25fcG9pbnQueSAqIHRoaXMuZmJvX3NpemUuaGVpZ2h0IC8gdGhpcy5kZXZpY2Vfc2l6ZS5oZWlnaHQpICsgXCI6IChcIiArXG4gICAgLy8gICAgIHRoaXMucGl4ZWxbMF0gKyBcIiwgXCIgKyB0aGlzLnBpeGVsWzFdICsgXCIsIFwiICsgdGhpcy5waXhlbFsyXSArIFwiLCBcIiArIHRoaXMucGl4ZWxbM10gKyBcIilcIik7XG5cbiAgICAvLyBJZiBmZWF0dXJlIGZvdW5kLCBhc2sgYXBwcm9wcmlhdGUgd2ViIHdvcmtlciB0byBsb29rdXAgZmVhdHVyZVxuICAgIHZhciB3b3JrZXJfaWQgPSB0aGlzLnBpeGVsWzNdO1xuICAgIGlmICh3b3JrZXJfaWQgIT0gMjU1KSB7IC8vIDI1NSBpbmRpY2F0ZXMgYW4gZW1wdHkgc2VsZWN0aW9uIGJ1ZmZlciBwaXhlbFxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIndvcmtlcl9pZDogXCIgKyB3b3JrZXJfaWQpO1xuICAgICAgICBpZiAodGhpcy53b3JrZXJzW3dvcmtlcl9pZF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJwb3N0IG1lc3NhZ2VcIik7XG4gICAgICAgICAgICB0aGlzLndvcmtlcnNbd29ya2VyX2lkXS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2dldEZlYXR1cmVTZWxlY3Rpb24nLFxuICAgICAgICAgICAgICAgIGtleTogZmVhdHVyZV9rZXlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKTtcbn07XG5cbi8vIENhbGxlZCBvbiBtYWluIHRocmVhZCB3aGVuIGEgd2ViIHdvcmtlciBmaW5kcyBhIGZlYXR1cmUgaW4gdGhlIHNlbGVjdGlvbiBidWZmZXJcblNjZW5lLnByb3RvdHlwZS53b3JrZXJHZXRGZWF0dXJlU2VsZWN0aW9uID0gZnVuY3Rpb24gKGV2ZW50KVxue1xuICAgIGlmIChldmVudC5kYXRhLnR5cGUgIT0gJ2dldEZlYXR1cmVTZWxlY3Rpb24nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgZmVhdHVyZSA9IGV2ZW50LmRhdGEuZmVhdHVyZTtcbiAgICB2YXIgY2hhbmdlZCA9IGZhbHNlO1xuICAgIGlmICgoZmVhdHVyZSAhPSBudWxsICYmIHRoaXMuc2VsZWN0ZWRfZmVhdHVyZSA9PSBudWxsKSB8fFxuICAgICAgICAoZmVhdHVyZSA9PSBudWxsICYmIHRoaXMuc2VsZWN0ZWRfZmVhdHVyZSAhPSBudWxsKSB8fFxuICAgICAgICAoZmVhdHVyZSAhPSBudWxsICYmIHRoaXMuc2VsZWN0ZWRfZmVhdHVyZSAhPSBudWxsICYmIGZlYXR1cmUuaWQgIT0gdGhpcy5zZWxlY3RlZF9mZWF0dXJlLmlkKSkge1xuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGVkX2ZlYXR1cmUgPSBmZWF0dXJlO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnNlbGVjdGlvbl9jYWxsYmFjayA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uX2NhbGxiYWNrKHsgZmVhdHVyZTogdGhpcy5zZWxlY3RlZF9mZWF0dXJlLCBjaGFuZ2VkOiBjaGFuZ2VkIH0pO1xuICAgIH1cbn07XG5cbi8vIFF1ZXVlIGEgdGlsZSBmb3IgbG9hZFxuU2NlbmUucHJvdG90eXBlLmxvYWRUaWxlID0gZnVuY3Rpb24gKGNvb3JkcywgZGl2LCBjYWxsYmFjaylcbntcbiAgICB0aGlzLnF1ZXVlZF90aWxlc1t0aGlzLnF1ZXVlZF90aWxlcy5sZW5ndGhdID0gYXJndW1lbnRzO1xufTtcblxuLy8gTG9hZCBhbGwgcXVldWVkIHRpbGVzXG5TY2VuZS5wcm90b3R5cGUubG9hZFF1ZXVlZFRpbGVzID0gZnVuY3Rpb24gKClcbntcbiAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnF1ZXVlZF90aWxlcy5sZW5ndGggPT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yICh2YXIgdD0wOyB0IDwgdGhpcy5xdWV1ZWRfdGlsZXMubGVuZ3RoOyB0KyspIHtcbiAgICAgICAgdGhpcy5fbG9hZFRpbGUuYXBwbHkodGhpcywgdGhpcy5xdWV1ZWRfdGlsZXNbdF0pO1xuICAgIH1cblxuICAgIHRoaXMucXVldWVkX3RpbGVzID0gW107XG59O1xuXG4vLyBMb2FkIGEgc2luZ2xlIHRpbGVcblNjZW5lLnByb3RvdHlwZS5fbG9hZFRpbGUgPSBmdW5jdGlvbiAoY29vcmRzLCBkaXYsIGNhbGxiYWNrKVxue1xuICAgIC8vIE92ZXJ6b29tP1xuICAgIGlmIChjb29yZHMueiA+IHRoaXMudGlsZV9zb3VyY2UubWF4X3pvb20pIHtcbiAgICAgICAgdmFyIHpnYXAgPSBjb29yZHMueiAtIHRoaXMudGlsZV9zb3VyY2UubWF4X3pvb207XG4gICAgICAgIC8vIHZhciBvcmlnaW5hbF90aWxlID0gW2Nvb3Jkcy54LCBjb29yZHMueSwgY29vcmRzLnpdLmpvaW4oJy8nKTtcbiAgICAgICAgY29vcmRzLnggPSB+fihjb29yZHMueCAvIE1hdGgucG93KDIsIHpnYXApKTtcbiAgICAgICAgY29vcmRzLnkgPSB+fihjb29yZHMueSAvIE1hdGgucG93KDIsIHpnYXApKTtcbiAgICAgICAgY29vcmRzLmRpc3BsYXlfeiA9IGNvb3Jkcy56OyAvLyB6IHdpdGhvdXQgb3Zlcnpvb21cbiAgICAgICAgY29vcmRzLnogLT0gemdhcDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJhZGp1c3RlZCBmb3Igb3Zlcnpvb20sIHRpbGUgXCIgKyBvcmlnaW5hbF90aWxlICsgXCIgLT4gXCIgKyBbY29vcmRzLngsIGNvb3Jkcy55LCBjb29yZHMuel0uam9pbignLycpKTtcbiAgICB9XG5cbiAgICB0aGlzLnRyYWNrVGlsZVNldExvYWRTdGFydCgpO1xuXG4gICAgdmFyIGtleSA9IFtjb29yZHMueCwgY29vcmRzLnksIGNvb3Jkcy56XS5qb2luKCcvJyk7XG5cbiAgICAvLyBBbHJlYWR5IGxvYWRpbmcvbG9hZGVkP1xuICAgIGlmICh0aGlzLnRpbGVzW2tleV0pIHtcbiAgICAgICAgLy8gaWYgKHRoaXMudGlsZXNba2V5XS5sb2FkZWQgPT0gdHJ1ZSkge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJ1c2UgbG9hZGVkIHRpbGUgXCIgKyBrZXkgKyBcIiBmcm9tIGNhY2hlXCIpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGlmICh0aGlzLnRpbGVzW2tleV0ubG9hZGluZyA9PSB0cnVlKSB7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgbG9hZGluZyB0aWxlIFwiICsga2V5ICsgXCIsIHNraXBcIik7XG4gICAgICAgIC8vIH1cblxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGRpdik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB0aWxlID0gdGhpcy50aWxlc1trZXldID0ge307XG4gICAgdGlsZS5rZXkgPSBrZXk7XG4gICAgdGlsZS5jb29yZHMgPSBjb29yZHM7XG4gICAgdGlsZS5taW4gPSBHZW8ubWV0ZXJzRm9yVGlsZSh0aWxlLmNvb3Jkcyk7XG4gICAgdGlsZS5tYXggPSBHZW8ubWV0ZXJzRm9yVGlsZSh7IHg6IHRpbGUuY29vcmRzLnggKyAxLCB5OiB0aWxlLmNvb3Jkcy55ICsgMSwgejogdGlsZS5jb29yZHMueiB9KTtcbiAgICB0aWxlLnNwYW4gPSB7IHg6ICh0aWxlLm1heC54IC0gdGlsZS5taW4ueCksIHk6ICh0aWxlLm1heC55IC0gdGlsZS5taW4ueSkgfTtcbiAgICB0aWxlLmJvdW5kcyA9IHsgc3c6IHsgeDogdGlsZS5taW4ueCwgeTogdGlsZS5tYXgueSB9LCBuZTogeyB4OiB0aWxlLm1heC54LCB5OiB0aWxlLm1pbi55IH0gfTtcbiAgICB0aWxlLmRlYnVnID0ge307XG4gICAgdGlsZS5sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aWxlLmxvYWRlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5idWlsZFRpbGUodGlsZS5rZXkpO1xuICAgIHRoaXMudXBkYXRlVGlsZUVsZW1lbnQodGlsZSwgZGl2KTtcbiAgICB0aGlzLnVwZGF0ZVZpc2liaWxpdHlGb3JUaWxlKHRpbGUpO1xuXG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIGRpdik7XG4gICAgfVxufTtcblxuLy8gUmVidWlsZCBhbGwgdGlsZXNcbi8vIFRPRE86IGFsc28gcmVidWlsZCBtb2Rlcz8gKGRldGVjdCBpZiBjaGFuZ2VkKVxuU2NlbmUucHJvdG90eXBlLnJlYnVpbGRUaWxlcyA9IGZ1bmN0aW9uICgpXG57XG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgbGF5ZXJzICYgc3R5bGVzXG4gICAgdGhpcy5sYXllcnNfc2VyaWFsaXplZCA9IFV0aWxzLnNlcmlhbGl6ZVdpdGhGdW5jdGlvbnModGhpcy5sYXllcnMpO1xuICAgIHRoaXMuc3R5bGVzX3NlcmlhbGl6ZWQgPSBVdGlscy5zZXJpYWxpemVXaXRoRnVuY3Rpb25zKHRoaXMuc3R5bGVzKTtcbiAgICB0aGlzLnNlbGVjdGlvbl9tYXAgPSB7fTtcblxuICAgIC8vIFRlbGwgd29ya2VycyB3ZSdyZSBhYm91dCB0byByZWJ1aWxkIChzbyB0aGV5IGNhbiByZWZyZXNoIHN0eWxlcywgZXRjLilcbiAgICB0aGlzLndvcmtlcnMuZm9yRWFjaCh3b3JrZXIgPT4ge1xuICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdHlwZTogJ3ByZXBhcmVGb3JSZWJ1aWxkJyxcbiAgICAgICAgICAgIGxheWVyczogdGhpcy5sYXllcnNfc2VyaWFsaXplZCxcbiAgICAgICAgICAgIHN0eWxlczogdGhpcy5zdHlsZXNfc2VyaWFsaXplZFxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIFJlYnVpbGQgdmlzaWJsZSB0aWxlcyBmaXJzdCwgZnJvbSBjZW50ZXIgb3V0XG4gICAgLy8gY29uc29sZS5sb2coXCJmaW5kIHZpc2libGVcIik7XG4gICAgdmFyIHZpc2libGUgPSBbXSwgaW52aXNpYmxlID0gW107XG4gICAgZm9yICh2YXIgdCBpbiB0aGlzLnRpbGVzKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbGVzW3RdLnZpc2libGUgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdmlzaWJsZS5wdXNoKHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaW52aXNpYmxlLnB1c2godCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcInNvcnQgdmlzaWJsZSBkaXN0YW5jZVwiKTtcbiAgICB2aXNpYmxlLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgLy8gdmFyIGFkID0gTWF0aC5hYnModGhpcy5jZW50ZXJfbWV0ZXJzLnggLSB0aGlzLnRpbGVzW2JdLm1pbi54KSArIE1hdGguYWJzKHRoaXMuY2VudGVyX21ldGVycy55IC0gdGhpcy50aWxlc1tiXS5taW4ueSk7XG4gICAgICAgIC8vIHZhciBiZCA9IE1hdGguYWJzKHRoaXMuY2VudGVyX21ldGVycy54IC0gdGhpcy50aWxlc1thXS5taW4ueCkgKyBNYXRoLmFicyh0aGlzLmNlbnRlcl9tZXRlcnMueSAtIHRoaXMudGlsZXNbYV0ubWluLnkpO1xuICAgICAgICB2YXIgYWQgPSB0aGlzLnRpbGVzW2FdLmNlbnRlcl9kaXN0O1xuICAgICAgICB2YXIgYmQgPSB0aGlzLnRpbGVzW2JdLmNlbnRlcl9kaXN0O1xuICAgICAgICByZXR1cm4gKGJkID4gYWQgPyAtMSA6IChiZCA9PSBhZCA/IDAgOiAxKSk7XG4gICAgfSk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcImJ1aWxkIHZpc2libGVcIik7XG4gICAgZm9yICh2YXIgdCBpbiB2aXNpYmxlKSB7XG4gICAgICAgIHRoaXMuYnVpbGRUaWxlKHZpc2libGVbdF0pO1xuICAgIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKFwiYnVpbGQgaW52aXNpYmxlXCIpO1xuICAgIGZvciAodmFyIHQgaW4gaW52aXNpYmxlKSB7XG4gICAgICAgIC8vIEtlZXAgdGlsZXMgaW4gY3VycmVudCB6b29tIGJ1dCBvdXQgb2YgdmlzaWJsZSByYW5nZSwgYnV0IHJlYnVpbGQgYXMgbG93ZXIgcHJpb3JpdHlcbiAgICAgICAgaWYgKHRoaXMuaXNUaWxlSW5ab29tKHRoaXMudGlsZXNbaW52aXNpYmxlW3RdXSkgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5idWlsZFRpbGUoaW52aXNpYmxlW3RdKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEcm9wIHRpbGVzIG91dHNpZGUgY3VycmVudCB6b29tXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVUaWxlKGludmlzaWJsZVt0XSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUFjdGl2ZU1vZGVzKCk7XG4gICAgdGhpcy5yZXNldFRpbWUoKTtcbn07XG5cblNjZW5lLnByb3RvdHlwZS5idWlsZFRpbGUgPSBmdW5jdGlvbihrZXkpXG57XG4gICAgdmFyIHRpbGUgPSB0aGlzLnRpbGVzW2tleV07XG5cbiAgICB0aGlzLndvcmtlclBvc3RNZXNzYWdlRm9yVGlsZSh0aWxlLCB7XG4gICAgICAgIHR5cGU6ICdidWlsZFRpbGUnLFxuICAgICAgICB0aWxlOiB7XG4gICAgICAgICAgICBrZXk6IHRpbGUua2V5LFxuICAgICAgICAgICAgY29vcmRzOiB0aWxlLmNvb3JkcywgLy8gdXNlZCBieSBzdHlsZSBoZWxwZXJzXG4gICAgICAgICAgICBtaW46IHRpbGUubWluLCAvLyB1c2VkIGJ5IFRpbGVTb3VyY2UgdG8gc2NhbGUgdGlsZSB0byBsb2NhbCBleHRlbnRzXG4gICAgICAgICAgICBtYXg6IHRpbGUubWF4LCAvLyB1c2VkIGJ5IFRpbGVTb3VyY2UgdG8gc2NhbGUgdGlsZSB0byBsb2NhbCBleHRlbnRzXG4gICAgICAgICAgICBkZWJ1ZzogdGlsZS5kZWJ1Z1xuICAgICAgICB9LFxuICAgICAgICB0aWxlX3NvdXJjZTogdGhpcy50aWxlX3NvdXJjZSxcbiAgICAgICAgbGF5ZXJzOiB0aGlzLmxheWVyc19zZXJpYWxpemVkLFxuICAgICAgICBzdHlsZXM6IHRoaXMuc3R5bGVzX3NlcmlhbGl6ZWRcbiAgICB9KTtcbn07XG5cbi8vIFByb2Nlc3MgZ2VvbWV0cnkgZm9yIHRpbGUgLSBjYWxsZWQgYnkgd2ViIHdvcmtlclxuLy8gUmV0dXJucyBhIHNldCBvZiB0aWxlIGtleXMgdGhhdCBzaG91bGQgYmUgc2VudCB0byB0aGUgbWFpbiB0aHJlYWQgKHNvIHRoYXQgd2UgY2FuIG1pbmltaXplIGRhdGEgZXhjaGFuZ2UgYmV0d2VlbiB3b3JrZXIgYW5kIG1haW4gdGhyZWFkKVxuU2NlbmUuYWRkVGlsZSA9IGZ1bmN0aW9uICh0aWxlLCBsYXllcnMsIHN0eWxlcywgbW9kZXMpXG57XG4gICAgdmFyIGxheWVyLCBzdHlsZSwgZmVhdHVyZSwgeiwgbW9kZTtcbiAgICB2YXIgdmVydGV4X2RhdGEgPSB7fTtcblxuICAgIC8vIEpvaW4gbGluZSB0ZXN0IHBhdHRlcm5cbiAgICAvLyBpZiAoU2NlbmUuZGVidWcpIHtcbiAgICAvLyAgICAgdGlsZS5sYXllcnNbJ3JvYWRzJ10uZmVhdHVyZXMucHVzaChTY2VuZS5idWlsZFppZ3phZ0xpbmVUZXN0UGF0dGVybigpKTtcbiAgICAvLyB9XG5cbiAgICAvLyBCdWlsZCByYXcgZ2VvbWV0cnkgYXJyYXlzXG4gICAgdGlsZS5kZWJ1Zy5mZWF0dXJlcyA9IDA7XG4gICAgZm9yICh2YXIgbGF5ZXJfbnVtPTA7IGxheWVyX251bSA8IGxheWVycy5sZW5ndGg7IGxheWVyX251bSsrKSB7XG4gICAgICAgIGxheWVyID0gbGF5ZXJzW2xheWVyX251bV07XG5cbiAgICAgICAgLy8gU2tpcCBsYXllcnMgd2l0aCBubyBzdHlsZXMgZGVmaW5lZCwgb3IgbGF5ZXJzIHNldCB0byBub3QgYmUgdmlzaWJsZVxuICAgICAgICBpZiAoc3R5bGVzLmxheWVyc1tsYXllci5uYW1lXSA9PSBudWxsIHx8IHN0eWxlcy5sYXllcnNbbGF5ZXIubmFtZV0udmlzaWJsZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGlsZS5sYXllcnNbbGF5ZXIubmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIG51bV9mZWF0dXJlcyA9IHRpbGUubGF5ZXJzW2xheWVyLm5hbWVdLmZlYXR1cmVzLmxlbmd0aDtcblxuICAgICAgICAgICAgLy8gUmVuZGVyaW5nIHJldmVyc2Ugb3JkZXIgYWthIHRvcCB0byBib3R0b21cbiAgICAgICAgICAgIGZvciAodmFyIGYgPSBudW1fZmVhdHVyZXMtMTsgZiA+PSAwOyBmLS0pIHtcbiAgICAgICAgICAgICAgICBmZWF0dXJlID0gdGlsZS5sYXllcnNbbGF5ZXIubmFtZV0uZmVhdHVyZXNbZl07XG4gICAgICAgICAgICAgICAgc3R5bGUgPSBTdHlsZS5wYXJzZVN0eWxlRm9yRmVhdHVyZShmZWF0dXJlLCBsYXllci5uYW1lLCBzdHlsZXMubGF5ZXJzW2xheWVyLm5hbWVdLCB0aWxlKTtcblxuICAgICAgICAgICAgICAgIC8vIFNraXAgZmVhdHVyZT9cbiAgICAgICAgICAgICAgICBpZiAoc3R5bGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzdHlsZS5sYXllcl9udW0gPSBsYXllcl9udW07XG4gICAgICAgICAgICAgICAgc3R5bGUueiA9IFNjZW5lLmNhbGN1bGF0ZVoobGF5ZXIsIHRpbGUpICsgc3R5bGUuejtcblxuICAgICAgICAgICAgICAgIHZhciBwb2ludHMgPSBudWxsLFxuICAgICAgICAgICAgICAgICAgICBsaW5lcyA9IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHBvbHlnb25zID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmIChmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT0gJ1BvbHlnb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvbHlnb25zID0gW2ZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXNdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT0gJ011bHRpUG9seWdvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9seWdvbnMgPSBmZWF0dXJlLmdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT0gJ0xpbmVTdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmVzID0gW2ZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXNdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT0gJ011bHRpTGluZVN0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgbGluZXMgPSBmZWF0dXJlLmdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT0gJ1BvaW50Jykge1xuICAgICAgICAgICAgICAgICAgICBwb2ludHMgPSBbZmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlc107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PSAnTXVsdGlQb2ludCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzID0gZmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBGaXJzdCBmZWF0dXJlIGluIHRoaXMgcmVuZGVyIG1vZGU/XG4gICAgICAgICAgICAgICAgbW9kZSA9IHN0eWxlLm1vZGUubmFtZTtcbiAgICAgICAgICAgICAgICBpZiAodmVydGV4X2RhdGFbbW9kZV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXhfZGF0YVttb2RlXSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChwb2x5Z29ucyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVzW21vZGVdLmJ1aWxkUG9seWdvbnMocG9seWdvbnMsIHN0eWxlLCB2ZXJ0ZXhfZGF0YVttb2RlXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kZXNbbW9kZV0uYnVpbGRMaW5lcyhsaW5lcywgc3R5bGUsIHZlcnRleF9kYXRhW21vZGVdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocG9pbnRzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kZXNbbW9kZV0uYnVpbGRQb2ludHMocG9pbnRzLCBzdHlsZSwgdmVydGV4X2RhdGFbbW9kZV0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRpbGUuZGVidWcuZmVhdHVyZXMrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRpbGUudmVydGV4X2RhdGEgPSB7fTtcbiAgICBmb3IgKHZhciBzIGluIHZlcnRleF9kYXRhKSB7XG4gICAgICAgIHRpbGUudmVydGV4X2RhdGFbc10gPSBuZXcgRmxvYXQzMkFycmF5KHZlcnRleF9kYXRhW3NdKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB2ZXJ0ZXhfZGF0YTogdHJ1ZVxuICAgIH07XG59O1xuXG4vLyBDYWxsZWQgb24gbWFpbiB0aHJlYWQgd2hlbiBhIHdlYiB3b3JrZXIgY29tcGxldGVzIHByb2Nlc3NpbmcgZm9yIGEgc2luZ2xlIHRpbGUgKGluaXRpYWwgbG9hZCwgb3IgcmVidWlsZClcblNjZW5lLnByb3RvdHlwZS53b3JrZXJCdWlsZFRpbGVDb21wbGV0ZWQgPSBmdW5jdGlvbiAoZXZlbnQpXG57XG4gICAgaWYgKGV2ZW50LmRhdGEudHlwZSAhPSAnYnVpbGRUaWxlQ29tcGxldGVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVHJhY2sgc2VsZWN0aW9uIG1hcCBzaXplIChmb3Igc3RhdHMvZGVidWcpIC0gdXBkYXRlIHBlciB3b3JrZXIgYW5kIHN1bSBhY3Jvc3Mgd29ya2Vyc1xuICAgIHRoaXMuc2VsZWN0aW9uX21hcF93b3JrZXJfc2l6ZVtldmVudC5kYXRhLndvcmtlcl9pZF0gPSBldmVudC5kYXRhLnNlbGVjdGlvbl9tYXBfc2l6ZTtcbiAgICB0aGlzLnNlbGVjdGlvbl9tYXBfc2l6ZSA9IDA7XG4gICAgT2JqZWN0XG4gICAgICAgIC5rZXlzKHRoaXMuc2VsZWN0aW9uX21hcF93b3JrZXJfc2l6ZSlcbiAgICAgICAgLmZvckVhY2god29ya2VyID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uX21hcF9zaXplICs9IHRoaXMuc2VsZWN0aW9uX21hcF93b3JrZXJfc2l6ZVt3b3JrZXJdO1xuICAgICAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhcInNlbGVjdGlvbiBtYXA6IFwiICsgdGhpcy5zZWxlY3Rpb25fbWFwX3NpemUgKyBcIiBmZWF0dXJlc1wiKTtcblxuICAgIHZhciB0aWxlID0gZXZlbnQuZGF0YS50aWxlO1xuXG4gICAgLy8gUmVtb3ZlZCB0aGlzIHRpbGUgZHVyaW5nIGxvYWQ/XG4gICAgaWYgKHRoaXMudGlsZXNbdGlsZS5rZXldID09IG51bGwpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJkaXNjYXJkZWQgdGlsZSBcIiArIHRpbGUua2V5ICsgXCIgaW4gU2NlbmUudGlsZVdvcmtlckNvbXBsZXRlZCBiZWNhdXNlIHByZXZpb3VzbHkgcmVtb3ZlZFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSB0aWxlIHdpdGggcHJvcGVydGllcyBmcm9tIHdvcmtlclxuICAgIHRpbGUgPSB0aGlzLm1lcmdlVGlsZSh0aWxlLmtleSwgdGlsZSk7XG5cbiAgICB0aGlzLmJ1aWxkR0xHZW9tZXRyeSh0aWxlKTtcblxuICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICAgIHRoaXMudHJhY2tUaWxlU2V0TG9hZEVuZCgpO1xuICAgIHRoaXMucHJpbnREZWJ1Z0ZvclRpbGUodGlsZSk7XG59O1xuXG4vLyBDYWxsZWQgb24gbWFpbiB0aHJlYWQgd2hlbiBhIHdlYiB3b3JrZXIgY29tcGxldGVzIHByb2Nlc3NpbmcgZm9yIGEgc2luZ2xlIHRpbGVcblNjZW5lLnByb3RvdHlwZS5idWlsZEdMR2VvbWV0cnkgPSBmdW5jdGlvbiAodGlsZSlcbntcbiAgICB2YXIgdmVydGV4X2RhdGEgPSB0aWxlLnZlcnRleF9kYXRhO1xuXG4gICAgLy8gQ2xlYW51cCBleGlzdGluZyBHTCBnZW9tZXRyeSBvYmplY3RzXG4gICAgdGhpcy5mcmVlVGlsZVJlc291cmNlcyh0aWxlKTtcbiAgICB0aWxlLmdsX2dlb21ldHJ5ID0ge307XG5cbiAgICAvLyBDcmVhdGUgR0wgZ2VvbWV0cnkgb2JqZWN0c1xuICAgIGZvciAodmFyIHMgaW4gdmVydGV4X2RhdGEpIHtcbiAgICAgICAgdGlsZS5nbF9nZW9tZXRyeVtzXSA9IHRoaXMubW9kZXNbc10ubWFrZUdMR2VvbWV0cnkodmVydGV4X2RhdGFbc10pO1xuICAgIH1cblxuICAgIHRpbGUuZGVidWcuZ2VvbWV0cmllcyA9IDA7XG4gICAgdGlsZS5kZWJ1Zy5idWZmZXJfc2l6ZSA9IDA7XG4gICAgZm9yICh2YXIgcCBpbiB0aWxlLmdsX2dlb21ldHJ5KSB7XG4gICAgICAgIHRpbGUuZGVidWcuZ2VvbWV0cmllcyArPSB0aWxlLmdsX2dlb21ldHJ5W3BdLmdlb21ldHJ5X2NvdW50O1xuICAgICAgICB0aWxlLmRlYnVnLmJ1ZmZlcl9zaXplICs9IHRpbGUuZ2xfZ2VvbWV0cnlbcF0udmVydGV4X2RhdGEuYnl0ZUxlbmd0aDtcbiAgICB9XG4gICAgdGlsZS5kZWJ1Zy5nZW9tX3JhdGlvID0gKHRpbGUuZGVidWcuZ2VvbWV0cmllcyAvIHRpbGUuZGVidWcuZmVhdHVyZXMpLnRvRml4ZWQoMSk7XG5cbiAgICBkZWxldGUgdGlsZS52ZXJ0ZXhfZGF0YTsgLy8gVE9ETzogbWlnaHQgd2FudCB0byBwcmVzZXJ2ZSB0aGlzIGZvciByZWJ1aWxkaW5nIGdlb21ldHJpZXMgd2hlbiBzdHlsZXMvZXRjLiBjaGFuZ2U/XG59O1xuXG5TY2VuZS5wcm90b3R5cGUucmVtb3ZlVGlsZSA9IGZ1bmN0aW9uIChrZXkpXG57XG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhcInRpbGUgdW5sb2FkIGZvciBcIiArIGtleSk7XG5cbiAgICBpZiAodGhpcy56b29taW5nID09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuOyAvLyBzaG9ydCBjaXJjdWl0IHRpbGUgcmVtb3ZhbCwgd2lsbCBzd2VlcCBvdXQgdGlsZXMgYnkgem9vbSBsZXZlbCB3aGVuIHpvb20gZW5kc1xuICAgIH1cblxuICAgIHZhciB0aWxlID0gdGhpcy50aWxlc1trZXldO1xuXG4gICAgaWYgKHRpbGUgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmZyZWVUaWxlUmVzb3VyY2VzKHRpbGUpO1xuXG4gICAgICAgIC8vIFdlYiB3b3JrZXIgd2lsbCBjYW5jZWwgWEhSIHJlcXVlc3RzXG4gICAgICAgIHRoaXMud29ya2VyUG9zdE1lc3NhZ2VGb3JUaWxlKHRpbGUsIHtcbiAgICAgICAgICAgIHR5cGU6ICdyZW1vdmVUaWxlJyxcbiAgICAgICAgICAgIGtleTogdGlsZS5rZXlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlIHRoaXMudGlsZXNba2V5XTtcbiAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbn07XG5cbi8vIEZyZWUgYW55IEdMIC8gb3duZWQgcmVzb3VyY2VzXG5TY2VuZS5wcm90b3R5cGUuZnJlZVRpbGVSZXNvdXJjZXMgPSBmdW5jdGlvbiAodGlsZSlcbntcbiAgICBpZiAodGlsZSAhPSBudWxsICYmIHRpbGUuZ2xfZ2VvbWV0cnkgIT0gbnVsbCkge1xuICAgICAgICBmb3IgKHZhciBwIGluIHRpbGUuZ2xfZ2VvbWV0cnkpIHtcbiAgICAgICAgICAgIHRpbGUuZ2xfZ2VvbWV0cnlbcF0uZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRpbGUuZ2xfZ2VvbWV0cnkgPSBudWxsO1xuICAgIH1cbn07XG5cbi8vIEF0dGFjaGVzIHRyYWNraW5nIGFuZCBkZWJ1ZyBpbnRvIHRvIHRoZSBwcm92aWRlZCB0aWxlIERPTSBlbGVtZW50XG5TY2VuZS5wcm90b3R5cGUudXBkYXRlVGlsZUVsZW1lbnQgPSBmdW5jdGlvbiAodGlsZSwgZGl2KVxue1xuICAgIC8vIERlYnVnIGluZm9cbiAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLXRpbGUta2V5JywgdGlsZS5rZXkpO1xuICAgIGRpdi5zdHlsZS53aWR0aCA9ICcyNTZweCc7XG4gICAgZGl2LnN0eWxlLmhlaWdodCA9ICcyNTZweCc7XG5cbiAgICBpZiAodGhpcy5kZWJ1Zykge1xuICAgICAgICB2YXIgZGVidWdfb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkZWJ1Z19vdmVybGF5LnRleHRDb250ZW50ID0gdGlsZS5rZXk7XG4gICAgICAgIGRlYnVnX292ZXJsYXkuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICBkZWJ1Z19vdmVybGF5LnN0eWxlLmxlZnQgPSAwO1xuICAgICAgICBkZWJ1Z19vdmVybGF5LnN0eWxlLnRvcCA9IDA7XG4gICAgICAgIGRlYnVnX292ZXJsYXkuc3R5bGUuY29sb3IgPSAnd2hpdGUnO1xuICAgICAgICBkZWJ1Z19vdmVybGF5LnN0eWxlLmZvbnRTaXplID0gJzE2cHgnO1xuICAgICAgICAvLyBkZWJ1Z19vdmVybGF5LnN0eWxlLnRleHRPdXRsaW5lID0gJzFweCAjMDAwMDAwJztcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGRlYnVnX292ZXJsYXkpO1xuXG4gICAgICAgIGRpdi5zdHlsZS5ib3JkZXJTdHlsZSA9ICdzb2xpZCc7XG4gICAgICAgIGRpdi5zdHlsZS5ib3JkZXJDb2xvciA9ICd3aGl0ZSc7XG4gICAgICAgIGRpdi5zdHlsZS5ib3JkZXJXaWR0aCA9ICcxcHgnO1xuICAgIH1cbn07XG5cbi8vIE1lcmdlIHByb3BlcnRpZXMgZnJvbSBhIHByb3ZpZGVkIHRpbGUgb2JqZWN0IGludG8gdGhlIG1haW4gdGlsZSBzdG9yZS4gU2hhbGxvdyBtZXJnZSAoanVzdCBjb3BpZXMgdG9wLWxldmVsIHByb3BlcnRpZXMpIVxuLy8gVXNlZCBmb3Igc2VsZWN0aXZlbHkgdXBkYXRpbmcgcHJvcGVydGllcyBvZiB0aWxlcyBwYXNzZWQgYmV0d2VlbiBtYWluIHRocmVhZCBhbmQgd29ya2VyXG4vLyAoc28gd2UgZG9uJ3QgaGF2ZSB0byBwYXNzIHRoZSB3aG9sZSB0aWxlLCBpbmNsdWRpbmcgc29tZSBwcm9wZXJ0aWVzIHdoaWNoIGNhbm5vdCBiZSBjbG9uZWQgZm9yIGEgd29ya2VyKS5cblNjZW5lLnByb3RvdHlwZS5tZXJnZVRpbGUgPSBmdW5jdGlvbiAoa2V5LCBzb3VyY2VfdGlsZSlcbntcbiAgICB2YXIgdGlsZSA9IHRoaXMudGlsZXNba2V5XTtcblxuICAgIGlmICh0aWxlID09IG51bGwpIHtcbiAgICAgICAgdGhpcy50aWxlc1trZXldID0gc291cmNlX3RpbGU7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbGVzW2tleV07XG4gICAgfVxuXG4gICAgZm9yICh2YXIgcCBpbiBzb3VyY2VfdGlsZSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm1lcmdpbmcgXCIgKyBwICsgXCI6IFwiICsgc291cmNlX3RpbGVbcF0pO1xuICAgICAgICB0aWxlW3BdID0gc291cmNlX3RpbGVbcF07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRpbGU7XG59O1xuXG4vLyBMb2FkIChvciByZWxvYWQpIHRoZSBzY2VuZSBjb25maWdcblNjZW5lLnByb3RvdHlwZS5sb2FkU2NlbmUgPSBmdW5jdGlvbiAoY2FsbGJhY2spXG57XG4gICAgdmFyIHF1ZXVlID0gUXVldWUoKTtcblxuICAgIC8vIElmIHRoaXMgaXMgdGhlIGZpcnN0IHRpbWUgd2UncmUgbG9hZGluZyB0aGUgc2NlbmUsIGNvcHkgYW55IFVSTHNcbiAgICBpZiAoIXRoaXMubGF5ZXJfc291cmNlICYmIHR5cGVvZih0aGlzLmxheWVycykgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5sYXllcl9zb3VyY2UgPSBVdGlscy51cmxGb3JQYXRoKHRoaXMubGF5ZXJzKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuc3R5bGVfc291cmNlICYmIHR5cGVvZih0aGlzLnN0eWxlcykgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5zdHlsZV9zb3VyY2UgPSBVdGlscy51cmxGb3JQYXRoKHRoaXMuc3R5bGVzKTtcbiAgICB9XG5cbiAgICAvLyBMYXllciBieSBVUkxcbiAgICBpZiAodGhpcy5sYXllcl9zb3VyY2UpIHtcbiAgICAgICAgcXVldWUuZGVmZXIoY29tcGxldGUgPT4ge1xuICAgICAgICAgICAgU2NlbmUubG9hZExheWVycyhcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyX3NvdXJjZSxcbiAgICAgICAgICAgICAgICBsYXllcnMgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxheWVycyA9IGxheWVycztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXllcnNfc2VyaWFsaXplZCA9IFV0aWxzLnNlcmlhbGl6ZVdpdGhGdW5jdGlvbnModGhpcy5sYXllcnMpO1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFN0eWxlIGJ5IFVSTFxuICAgIGlmICh0aGlzLnN0eWxlX3NvdXJjZSkge1xuICAgICAgICBxdWV1ZS5kZWZlcihjb21wbGV0ZSA9PiB7XG4gICAgICAgICAgICBTY2VuZS5sb2FkU3R5bGVzKFxuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGVfc291cmNlLFxuICAgICAgICAgICAgICAgIHN0eWxlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3R5bGVzID0gc3R5bGVzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0eWxlc19zZXJpYWxpemVkID0gVXRpbHMuc2VyaWFsaXplV2l0aEZ1bmN0aW9ucyh0aGlzLnN0eWxlcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIFN0eWxlIG9iamVjdFxuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnN0eWxlcyA9IFNjZW5lLnBvc3RQcm9jZXNzU3R5bGVzKHRoaXMuc3R5bGVzKTtcbiAgICB9XG5cbiAgICAvLyBFdmVyeXRoaW5nIGlzIGxvYWRlZFxuICAgIHF1ZXVlLmF3YWl0KGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbi8vIFJlbG9hZCBzY2VuZSBjb25maWcgYW5kIHJlYnVpbGQgdGlsZXNcblNjZW5lLnByb3RvdHlwZS5yZWxvYWRTY2VuZSA9IGZ1bmN0aW9uICgpXG57XG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmxvYWRTY2VuZSgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVidWlsZFRpbGVzKCk7XG4gICAgfSk7XG59O1xuXG4vLyBDYWxsZWQgKGN1cnJlbnRseSBtYW51YWxseSkgYWZ0ZXIgbW9kZXMgYXJlIHVwZGF0ZWQgaW4gc3R5bGVzaGVldFxuU2NlbmUucHJvdG90eXBlLnJlZnJlc2hNb2RlcyA9IGZ1bmN0aW9uICgpXG57XG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm1vZGVzID0gU2NlbmUucmVmcmVzaE1vZGVzKHRoaXMubW9kZXMsIHRoaXMuc3R5bGVzKTtcbn07XG5cblNjZW5lLnByb3RvdHlwZS51cGRhdGVBY3RpdmVNb2RlcyA9IGZ1bmN0aW9uICgpXG57XG4gICAgLy8gTWFrZSBhIHNldCBvZiBjdXJyZW50bHkgYWN0aXZlIG1vZGVzICh1c2VkIGluIGEgbGF5ZXIpXG4gICAgdGhpcy5hY3RpdmVfbW9kZXMgPSB7fTtcbiAgICB2YXIgYW5pbWF0ZWQgPSBmYWxzZTsgLy8gaXMgYW55IGFjdGl2ZSBtb2RlIGFuaW1hdGVkP1xuICAgIGZvciAodmFyIGwgaW4gdGhpcy5zdHlsZXMubGF5ZXJzKSB7XG4gICAgICAgIHZhciBtb2RlID0gdGhpcy5zdHlsZXMubGF5ZXJzW2xdLm1vZGUubmFtZTtcbiAgICAgICAgaWYgKHRoaXMuc3R5bGVzLmxheWVyc1tsXS52aXNpYmxlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVfbW9kZXNbbW9kZV0gPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGlzIG1vZGUgaXMgYW5pbWF0ZWRcbiAgICAgICAgICAgIGlmIChhbmltYXRlZCA9PSBmYWxzZSAmJiB0aGlzLm1vZGVzW21vZGVdLmFuaW1hdGVkID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBhbmltYXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5hbmltYXRlZCA9IGFuaW1hdGVkO1xufTtcblxuLy8gUmVzZXQgaW50ZXJuYWwgY2xvY2ssIG1vc3RseSB1c2VmdWwgZm9yIGNvbnNpc3RlbnQgZXhwZXJpZW5jZSB3aGVuIGNoYW5naW5nIG1vZGVzL2RlYnVnZ2luZ1xuU2NlbmUucHJvdG90eXBlLnJlc2V0VGltZSA9IGZ1bmN0aW9uICgpXG57XG4gICAgdGhpcy5zdGFydF90aW1lID0gK25ldyBEYXRlKCk7XG59O1xuXG4vLyBVc2VyIGlucHV0XG4vLyBUT0RPOiByZXN0b3JlIGZyYWN0aW9uYWwgem9vbSBzdXBwb3J0IG9uY2UgbGVhZmxldCBhbmltYXRpb24gcmVmYWN0b3IgcHVsbCByZXF1ZXN0IGlzIG1lcmdlZFxuXG5TY2VuZS5wcm90b3R5cGUuaW5pdElucHV0SGFuZGxlcnMgPSBmdW5jdGlvbiAoKVxue1xuICAgIC8vIHRoaXMua2V5ID0gbnVsbDtcblxuICAgIC8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAvLyAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gMzcpIHtcbiAgICAvLyAgICAgICAgIHRoaXMua2V5ID0gJ2xlZnQnO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT0gMzkpIHtcbiAgICAvLyAgICAgICAgIHRoaXMua2V5ID0gJ3JpZ2h0JztcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBlbHNlIGlmIChldmVudC5rZXlDb2RlID09IDM4KSB7XG4gICAgLy8gICAgICAgICB0aGlzLmtleSA9ICd1cCc7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PSA0MCkge1xuICAgIC8vICAgICAgICAgdGhpcy5rZXkgPSAnZG93bic7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PSA4MykgeyAvLyBzXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcInJlbG9hZGluZyBzaGFkZXJzXCIpO1xuICAgIC8vICAgICAgICAgZm9yICh2YXIgbW9kZSBpbiB0aGlzLm1vZGVzKSB7XG4gICAgLy8gICAgICAgICAgICAgdGhpcy5tb2Rlc1ttb2RlXS5nbF9wcm9ncmFtLmNvbXBpbGUoKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICAgIC8vICAgICB9XG4gICAgLy8gfS5iaW5kKHRoaXMpKTtcblxuICAgIC8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgLy8gICAgIHRoaXMua2V5ID0gbnVsbDtcbiAgICAvLyB9LmJpbmQodGhpcykpO1xufTtcblxuU2NlbmUucHJvdG90eXBlLmlucHV0ID0gZnVuY3Rpb24gKClcbntcbiAgICAvLyAvLyBGcmFjdGlvbmFsIHpvb20gc2NhbGluZ1xuICAgIC8vIGlmICh0aGlzLmtleSA9PSAndXAnKSB7XG4gICAgLy8gICAgIHRoaXMuc2V0Wm9vbSh0aGlzLnpvb20gKyB0aGlzLnpvb21fc3RlcCk7XG4gICAgLy8gfVxuICAgIC8vIGVsc2UgaWYgKHRoaXMua2V5ID09ICdkb3duJykge1xuICAgIC8vICAgICB0aGlzLnNldFpvb20odGhpcy56b29tIC0gdGhpcy56b29tX3N0ZXApO1xuICAgIC8vIH1cbn07XG5cblxuLy8gU3RhdHMvZGVidWcvcHJvZmlsaW5nIG1ldGhvZHNcblxuLy8gUHJvZmlsaW5nIG1ldGhvZHMgdXNlZCB0byB0cmFjayB3aGVuIHNldHMgb2YgdGlsZXMgc3RhcnQvc3RvcCBsb2FkaW5nIHRvZ2V0aGVyXG4vLyBlLmcuIGluaXRpYWwgcGFnZSBsb2FkIGlzIG9uZSBzZXQgb2YgdGlsZXMsIG5ldyBzZXRzIG9mIHRpbGUgbG9hZHMgYXJlIHRoZW4gaW5pdGlhdGVkIGJ5IGEgbWFwIHBhbiBvciB6b29tXG5TY2VuZS5wcm90b3R5cGUudHJhY2tUaWxlU2V0TG9hZFN0YXJ0ID0gZnVuY3Rpb24gKClcbntcbiAgICAvLyBTdGFydCB0cmFja2luZyBuZXcgdGlsZSBzZXQgaWYgbm8gb3RoZXIgdGlsZXMgYWxyZWFkeSBsb2FkaW5nXG4gICAgaWYgKHRoaXMudGlsZV9zZXRfbG9hZGluZyA9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudGlsZV9zZXRfbG9hZGluZyA9ICtuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInRpbGUgc2V0IGxvYWQgU1RBUlRcIik7XG4gICAgfVxufTtcblxuU2NlbmUucHJvdG90eXBlLnRyYWNrVGlsZVNldExvYWRFbmQgPSBmdW5jdGlvbiAoKVxue1xuICAgIC8vIE5vIG1vcmUgdGlsZXMgYWN0aXZlbHkgbG9hZGluZz9cbiAgICBpZiAodGhpcy50aWxlX3NldF9sb2FkaW5nICE9IG51bGwpIHtcbiAgICAgICAgdmFyIGVuZF90aWxlX3NldCA9IHRydWU7XG4gICAgICAgIGZvciAodmFyIHQgaW4gdGhpcy50aWxlcykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGlsZXNbdF0ubG9hZGluZyA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgZW5kX3RpbGVfc2V0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW5kX3RpbGVfc2V0ID09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMubGFzdF90aWxlX3NldF9sb2FkID0gKCtuZXcgRGF0ZSgpKSAtIHRoaXMudGlsZV9zZXRfbG9hZGluZztcbiAgICAgICAgICAgIHRoaXMudGlsZV9zZXRfbG9hZGluZyA9IG51bGw7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRpbGUgc2V0IGxvYWQgRklOSVNIRUQgaW46IFwiICsgdGhpcy5sYXN0X3RpbGVfc2V0X2xvYWQpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuU2NlbmUucHJvdG90eXBlLnByaW50RGVidWdGb3JUaWxlID0gZnVuY3Rpb24gKHRpbGUpXG57XG4gICAgY29uc29sZS5sb2coXG4gICAgICAgIFwiZGVidWcgZm9yIFwiICsgdGlsZS5rZXkgKyAnOiBbICcgK1xuICAgICAgICBPYmplY3Qua2V5cyh0aWxlLmRlYnVnKS5tYXAoZnVuY3Rpb24gKHQpIHsgcmV0dXJuIHQgKyAnOiAnICsgdGlsZS5kZWJ1Z1t0XTsgfSkuam9pbignLCAnKSArICcgXSdcbiAgICApO1xufTtcblxuLy8gUmVjb21waWxlIGFsbCBzaGFkZXJzXG5TY2VuZS5wcm90b3R5cGUuY29tcGlsZVNoYWRlcnMgPSBmdW5jdGlvbiAoKVxue1xuICAgIGZvciAodmFyIG0gaW4gdGhpcy5tb2Rlcykge1xuICAgICAgICB0aGlzLm1vZGVzW21dLmdsX3Byb2dyYW0uY29tcGlsZSgpO1xuICAgIH1cbn07XG5cbi8vIFN1bSBvZiBhIGRlYnVnIHByb3BlcnR5IGFjcm9zcyB0aWxlc1xuU2NlbmUucHJvdG90eXBlLmdldERlYnVnU3VtID0gZnVuY3Rpb24gKHByb3AsIGZpbHRlcilcbntcbiAgICB2YXIgc3VtID0gMDtcbiAgICBmb3IgKHZhciB0IGluIHRoaXMudGlsZXMpIHtcbiAgICAgICAgaWYgKHRoaXMudGlsZXNbdF0uZGVidWdbcHJvcF0gIT0gbnVsbCAmJiAodHlwZW9mIGZpbHRlciAhPSAnZnVuY3Rpb24nIHx8IGZpbHRlcih0aGlzLnRpbGVzW3RdKSA9PSB0cnVlKSkge1xuICAgICAgICAgICAgc3VtICs9IHRoaXMudGlsZXNbdF0uZGVidWdbcHJvcF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN1bTtcbn07XG5cbi8vIEF2ZXJhZ2Ugb2YgYSBkZWJ1ZyBwcm9wZXJ0eSBhY3Jvc3MgdGlsZXNcblNjZW5lLnByb3RvdHlwZS5nZXREZWJ1Z0F2ZXJhZ2UgPSBmdW5jdGlvbiAocHJvcCwgZmlsdGVyKVxue1xuICAgIHJldHVybiB0aGlzLmdldERlYnVnU3VtKHByb3AsIGZpbHRlcikgLyBPYmplY3Qua2V5cyh0aGlzLnRpbGVzKS5sZW5ndGg7XG59O1xuXG4vLyBMb2cgbWVzc2FnZXMgcGFzcyB0aHJvdWdoIGZyb20gd2ViIHdvcmtlcnNcblNjZW5lLnByb3RvdHlwZS53b3JrZXJMb2dNZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KVxue1xuICAgIGlmIChldmVudC5kYXRhLnR5cGUgIT0gJ2xvZycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKFwid29ya2VyIFwiICsgZXZlbnQuZGF0YS53b3JrZXJfaWQgKyBcIjogXCIgKyBldmVudC5kYXRhLm1zZyk7XG59O1xuXG5cbi8qKiogQ2xhc3MgbWV0aG9kcyAoc3RhdGVsZXNzKSAqKiovXG5cblNjZW5lLmxvYWRMYXllcnMgPSBmdW5jdGlvbiAodXJsLCBjYWxsYmFjaylcbntcbiAgICB2YXIgbGF5ZXJzO1xuICAgIHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICByZXEub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBldmFsKCdsYXllcnMgPSAnICsgcmVxLnJlc3BvbnNlKTsgLy8gVE9ETzogc2VjdXJpdHkhXG5cbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhsYXllcnMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXEub3BlbignR0VUJywgdXJsICsgJz8nICsgKCtuZXcgRGF0ZSgpKSwgdHJ1ZSAvKiBhc3luYyBmbGFnICovKTtcbiAgICByZXEucmVzcG9uc2VUeXBlID0gJ3RleHQnO1xuICAgIHJlcS5zZW5kKCk7XG59O1xuXG5TY2VuZS5sb2FkU3R5bGVzID0gZnVuY3Rpb24gKHVybCwgY2FsbGJhY2spXG57XG4gICAgdmFyIHN0eWxlcztcbiAgICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICByZXEub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzdHlsZXMgPSByZXEucmVzcG9uc2U7XG5cbiAgICAgICAgLy8gVHJ5IEpTT04gZmlyc3QsIHRoZW4gWUFNTCAoaWYgYXZhaWxhYmxlKVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZXZhbCgnc3R5bGVzID0gJyArIHJlcS5yZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc3R5bGVzID0geWFtbC5zYWZlTG9hZChyZXEucmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZhaWxlZCB0byBwYXJzZSBzdHlsZXMhXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0eWxlcyk7XG4gICAgICAgICAgICAgICAgc3R5bGVzID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbmQgZ2VuZXJpYyBmdW5jdGlvbnMgJiBzdHlsZSBtYWNyb3NcbiAgICAgICAgVXRpbHMuc3RyaW5nc1RvRnVuY3Rpb25zKHN0eWxlcyk7XG4gICAgICAgIFN0eWxlLmV4cGFuZE1hY3JvcyhzdHlsZXMpO1xuICAgICAgICBTY2VuZS5wb3N0UHJvY2Vzc1N0eWxlcyhzdHlsZXMpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FsbGJhY2soc3R5bGVzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlcS5vcGVuKCdHRVQnLCB1cmwgKyAnPycgKyAoK25ldyBEYXRlKCkpLCB0cnVlIC8qIGFzeW5jIGZsYWcgKi8pO1xuICAgIHJlcS5yZXNwb25zZVR5cGUgPSAndGV4dCc7XG4gICAgcmVxLnNlbmQoKTtcbn07XG5cbi8vIE5vcm1hbGl6ZSBzb21lIHN0eWxlIHNldHRpbmdzIHRoYXQgbWF5IG5vdCBoYXZlIGJlZW4gZXhwbGljaXRseSBzcGVjaWZpZWQgaW4gdGhlIHN0eWxlc2hlZXRcblNjZW5lLnBvc3RQcm9jZXNzU3R5bGVzID0gZnVuY3Rpb24gKHN0eWxlcylcbntcbiAgICAvLyBQb3N0LXByb2Nlc3Mgc3R5bGVzXG4gICAgZm9yICh2YXIgbSBpbiBzdHlsZXMubGF5ZXJzKSB7XG4gICAgICAgIGlmIChzdHlsZXMubGF5ZXJzW21dLnZpc2libGUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBzdHlsZXMubGF5ZXJzW21dLnZpc2libGUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChzdHlsZXMubGF5ZXJzW21dLm1vZGUgJiYgc3R5bGVzLmxheWVyc1ttXS5tb2RlLm5hbWUpID09IG51bGwpIHtcbiAgICAgICAgICAgIHN0eWxlcy5sYXllcnNbbV0ubW9kZSA9IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBTdHlsZS5kZWZhdWx0cy5tb2RlKSB7XG4gICAgICAgICAgICAgICAgc3R5bGVzLmxheWVyc1ttXS5tb2RlW3BdID0gU3R5bGUuZGVmYXVsdHMubW9kZVtwXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdHlsZXM7XG59O1xuXG4vLyBQcm9jZXNzZXMgdGhlIHRpbGUgcmVzcG9uc2UgdG8gY3JlYXRlIGxheWVycyBhcyBkZWZpbmVkIGJ5IHRoZSBzY2VuZVxuLy8gQ2FuIGluY2x1ZGUgcG9zdC1wcm9jZXNzaW5nIHRvIHBhcnRpYWxseSBmaWx0ZXIgb3IgcmUtYXJyYW5nZSBkYXRhLCBlLmcuIG9ubHkgaW5jbHVkaW5nIFBPSXMgdGhhdCBoYXZlIG5hbWVzXG5TY2VuZS5wcm9jZXNzTGF5ZXJzRm9yVGlsZSA9IGZ1bmN0aW9uIChsYXllcnMsIHRpbGUpXG57XG4gICAgdmFyIHRpbGVfbGF5ZXJzID0ge307XG4gICAgZm9yICh2YXIgdD0wOyB0IDwgbGF5ZXJzLmxlbmd0aDsgdCsrKSB7XG4gICAgICAgIGxheWVyc1t0XS5udW1iZXIgPSB0O1xuXG4gICAgICAgIGlmIChsYXllcnNbdF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gSnVzdCBwYXNzIHRocm91Z2ggZGF0YSB1bnRvdWNoZWQgaWYgbm8gZGF0YSB0cmFuc2Zvcm0gZnVuY3Rpb24gZGVmaW5lZFxuICAgICAgICAgICAgaWYgKGxheWVyc1t0XS5kYXRhID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aWxlX2xheWVyc1tsYXllcnNbdF0ubmFtZV0gPSB0aWxlLmxheWVyc1tsYXllcnNbdF0ubmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBQYXNzIHRocm91Z2ggZGF0YSBidXQgd2l0aCBkaWZmZXJlbnQgbGF5ZXIgbmFtZSBpbiB0aWxlIHNvdXJjZSBkYXRhXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgbGF5ZXJzW3RdLmRhdGEgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0aWxlX2xheWVyc1tsYXllcnNbdF0ubmFtZV0gPSB0aWxlLmxheWVyc1tsYXllcnNbdF0uZGF0YV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBcHBseSB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIGZvciBwb3N0LXByb2Nlc3NpbmdcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBsYXllcnNbdF0uZGF0YSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGlsZV9sYXllcnNbbGF5ZXJzW3RdLm5hbWVdID0gbGF5ZXJzW3RdLmRhdGEodGlsZS5sYXllcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGFuZGxlIGNhc2VzIHdoZXJlIG5vIGRhdGEgd2FzIGZvdW5kIGluIHRpbGUgb3IgcmV0dXJuZWQgYnkgcG9zdC1wcm9jZXNzb3JcbiAgICAgICAgdGlsZV9sYXllcnNbbGF5ZXJzW3RdLm5hbWVdID0gdGlsZV9sYXllcnNbbGF5ZXJzW3RdLm5hbWVdIHx8IHsgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJywgZmVhdHVyZXM6IFtdIH07XG4gICAgfVxuICAgIHRpbGUubGF5ZXJzID0gdGlsZV9sYXllcnM7XG4gICAgcmV0dXJuIHRpbGVfbGF5ZXJzO1xufTtcblxuLy8gQ2FsbGVkIG9uY2Ugb24gaW5zdGFudGlhdGlvblxuU2NlbmUuY3JlYXRlTW9kZXMgPSBmdW5jdGlvbiAoc3R5bGVzKVxue1xuICAgIHZhciBtb2RlcyA9IHt9O1xuXG4gICAgLy8gQnVpbHQtaW4gbW9kZXNcbiAgICB2YXIgYnVpbHRfaW5zID0gcmVxdWlyZSgnLi9nbC9nbF9tb2RlcycpLk1vZGVzO1xuICAgIGZvciAodmFyIG0gaW4gYnVpbHRfaW5zKSB7XG4gICAgICAgIG1vZGVzW21dID0gYnVpbHRfaW5zW21dO1xuICAgIH1cblxuICAgIC8vIFN0eWxlc2hlZXQgbW9kZXNcbiAgICBmb3IgKHZhciBtIGluIHN0eWxlcy5tb2Rlcykge1xuICAgICAgICAvLyBpZiAobSAhPSAnYWxsJykge1xuICAgICAgICAgICAgbW9kZXNbbV0gPSBNb2RlTWFuYWdlci5jb25maWd1cmVNb2RlKG0sIHN0eWxlcy5tb2Rlc1ttXSk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbW9kZXM7XG59O1xuXG5TY2VuZS5yZWZyZXNoTW9kZXMgPSBmdW5jdGlvbiAobW9kZXMsIHN0eWxlcylcbntcbiAgICAvLyBDb3B5IHN0eWxlc2hlZXQgbW9kZXNcbiAgICAvLyBUT0RPOiBpcyB0aGlzIHRoZSBiZXN0IHdheSB0byBjb3B5IHN0eWxlc2hlZXQgY2hhbmdlcyB0byBtb2RlIGluc3RhbmNlcz9cbiAgICBmb3IgKHZhciBtIGluIHN0eWxlcy5tb2Rlcykge1xuICAgICAgICAvLyBpZiAobSAhPSAnYWxsJykge1xuICAgICAgICAgICAgbW9kZXNbbV0gPSBNb2RlTWFuYWdlci5jb25maWd1cmVNb2RlKG0sIHN0eWxlcy5tb2Rlc1ttXSk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICAvLyBSZWZyZXNoIGFsbCBtb2Rlc1xuICAgIGZvciAobSBpbiBtb2Rlcykge1xuICAgICAgICBtb2Rlc1ttXS5yZWZyZXNoKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vZGVzO1xufTtcblxuXG4vLyBQcml2YXRlL2ludGVybmFsXG5cbi8vIEdldCBiYXNlIFVSTCBmcm9tIHdoaWNoIHRoZSBsaWJyYXJ5IHdhcyBsb2FkZWRcbi8vIFVzZWQgdG8gbG9hZCBhZGRpdGlvbmFsIHJlc291cmNlcyBsaWtlIHNoYWRlcnMsIHRleHR1cmVzLCBldGMuIGluIGNhc2VzIHdoZXJlIGxpYnJhcnkgd2FzIGxvYWRlZCBmcm9tIGEgcmVsYXRpdmUgcGF0aFxuZnVuY3Rpb24gZmluZEJhc2VMaWJyYXJ5VVJMICgpXG57XG4gICAgU2NlbmUubGlicmFyeV9iYXNlX3VybCA9ICcnO1xuICAgIHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpOyAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbc3JjKj1cIi5qc1wiXScpO1xuICAgIGZvciAodmFyIHM9MDsgcyA8IHNjcmlwdHMubGVuZ3RoOyBzKyspIHtcbiAgICAgICAgdmFyIG1hdGNoID0gc2NyaXB0c1tzXS5zcmMuaW5kZXhPZigndGFuZ3JhbS5kZWJ1Zy5qcycpO1xuICAgICAgICBpZiAobWF0Y2ggPT0gLTEpIHtcbiAgICAgICAgICAgIG1hdGNoID0gc2NyaXB0c1tzXS5zcmMuaW5kZXhPZigndGFuZ3JhbS5taW4uanMnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF0Y2ggPj0gMCkge1xuICAgICAgICAgICAgU2NlbmUubGlicmFyeV9iYXNlX3VybCA9IHNjcmlwdHNbc10uc3JjLnN1YnN0cigwLCBtYXRjaCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmlmIChtb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gU2NlbmU7XG59XG4iLCIvKioqIFN0eWxlIGhlbHBlcnMgKioqL1xudmFyIEdlbyA9IHJlcXVpcmUoJy4vZ2VvLmpzJyk7XG5cbnZhciBTdHlsZSA9IHt9O1xuXG4vLyBTdHlsZSBoZWxwZXJzXG5cblN0eWxlLmNvbG9yID0ge1xuICAgIHBzZXVkb1JhbmRvbUdyYXlzY2FsZTogZnVuY3Rpb24gKGYpIHsgdmFyIGMgPSBNYXRoLm1heCgocGFyc2VJbnQoZi5pZCwgMTYpICUgMTAwKSAvIDEwMCwgMC40KTsgcmV0dXJuIFswLjcgKiBjLCAwLjcgKiBjLCAwLjcgKiBjXTsgfSwgLy8gcHNldWRvLXJhbmRvbSBncmF5c2NhbGUgYnkgZ2VvbWV0cnkgaWRcbiAgICBwc2V1ZG9SYW5kb21Db2xvcjogZnVuY3Rpb24gKGYpIHsgcmV0dXJuIFswLjcgKiAocGFyc2VJbnQoZi5pZCwgMTYpIC8gMTAwICUgMSksIDAuNyAqIChwYXJzZUludChmLmlkLCAxNikgLyAxMDAwMCAlIDEpLCAwLjcgKiAocGFyc2VJbnQoZi5pZCwgMTYpIC8gMTAwMDAwMCAlIDEpXTsgfSwgLy8gcHNldWRvLXJhbmRvbSBjb2xvciBieSBnZW9tZXRyeSBpZFxuICAgIHJhbmRvbUNvbG9yOiBmdW5jdGlvbiAoZikgeyByZXR1cm4gWzAuNyAqIE1hdGgucmFuZG9tKCksIDAuNyAqIE1hdGgucmFuZG9tKCksIDAuNyAqIE1hdGgucmFuZG9tKCldOyB9IC8vIHJhbmRvbSBjb2xvclxufTtcblxuLy8gUmV0dXJucyBhIGZ1bmN0aW9uICh0aGF0IGNhbiBiZSB1c2VkIGFzIGEgZHluYW1pYyBzdHlsZSkgdGhhdCBjb252ZXJ0cyBwaXhlbHMgdG8gbWV0ZXJzIGZvciB0aGUgY3VycmVudCB6b29tIGxldmVsLlxuLy8gVGhlIHByb3ZpZGVkIHBpeGVsIHZhbHVlICgncCcpIGNhbiBpdHNlbGYgYmUgYSBmdW5jdGlvbiwgaW4gd2hpY2ggY2FzZSBpdCBpcyB3cmFwcGVkIGJ5IHRoaXMgb25lLlxuU3R5bGUucGl4ZWxzID0gZnVuY3Rpb24gKHAsIHopIHtcbiAgICB2YXIgZjtcbiAgICBldmFsKCdmID0gZnVuY3Rpb24oZiwgdCwgaCkgeyByZXR1cm4gJyArICh0eXBlb2YgcCA9PSAnZnVuY3Rpb24nID8gJygnICsgKHAudG9TdHJpbmcoKSArICcoZiwgdCwgaCkpJykgOiBwKSArICcgKiBoLkdlby5tZXRlcnNfcGVyX3BpeGVsW2guem9vbV07IH0nKTtcbiAgICByZXR1cm4gZjtcbn07XG5cbi8vIENyZWF0ZSBhIHVuaXF1ZSAzMi1iaXQgY29sb3IgdG8gaWRlbnRpZnkgYSBmZWF0dXJlXG4vLyBXb3JrZXJzIGluZGVwZW5kZW50bHkgY3JlYXRlL21vZGlmeSBzZWxlY3Rpb24gY29sb3JzIGluIHRoZWlyIG93biB0aHJlYWRzLCBidXQgd2UgYWxzb1xuLy8gbmVlZCB0aGUgbWFpbiB0aHJlYWQgdG8ga25vdyB3aGVyZSBlYWNoIGZlYXR1cmUgY29sb3Igb3JpZ2luYXRlZC4gVG8gYWNjb21wbGlzaCB0aGlzLFxuLy8gd2UgcGFydGl0aW9uIHRoZSBtYXAgYnkgc2V0dGluZyB0aGUgNHRoIGNvbXBvbmVudCAoYWxwaGEgY2hhbm5lbCkgdG8gdGhlIHdvcmtlcidzIGlkLlxuU3R5bGUuc2VsZWN0aW9uX21hcCA9IHt9OyAvLyB0aGlzIHdpbGwgYmUgdW5pcXVlIHBlciBtb2R1bGUgaW5zdGFuY2UgKHNvIHVuaXF1ZSBwZXIgd29ya2VyKVxuU3R5bGUuc2VsZWN0aW9uX21hcF9jdXJyZW50ID0gMTsgLy8gc3RhcnQgYXQgMSBzaW5jZSAxIHdpbGwgYmUgZGl2aWRlZCBieSB0aGlzXG5TdHlsZS5zZWxlY3Rpb25fbWFwX3ByZWZpeCA9IDA7IC8vIHNldCBieSB3b3JrZXIgdG8gd29ya2VyIGlkICNcblN0eWxlLmdlbmVyYXRlU2VsZWN0aW9uID0gZnVuY3Rpb24gKGNvbG9yX21hcClcbntcbiAgICAvLyAzMi1iaXQgY29sb3Iga2V5XG4gICAgU3R5bGUuc2VsZWN0aW9uX21hcF9jdXJyZW50Kys7XG4gICAgdmFyIGlyID0gU3R5bGUuc2VsZWN0aW9uX21hcF9jdXJyZW50ICYgMjU1O1xuICAgIHZhciBpZyA9IChTdHlsZS5zZWxlY3Rpb25fbWFwX2N1cnJlbnQgPj4gOCkgJiAyNTU7XG4gICAgdmFyIGliID0gKFN0eWxlLnNlbGVjdGlvbl9tYXBfY3VycmVudCA+PiAxNikgJiAyNTU7XG4gICAgdmFyIGlhID0gU3R5bGUuc2VsZWN0aW9uX21hcF9wcmVmaXg7XG4gICAgdmFyIHIgPSBpciAvIDI1NTtcbiAgICB2YXIgZyA9IGlnIC8gMjU1O1xuICAgIHZhciBiID0gaWIgLyAyNTU7XG4gICAgdmFyIGEgPSBpYSAvIDI1NTtcbiAgICB2YXIga2V5ID0gKGlyICsgKGlnIDw8IDgpICsgKGliIDw8IDE2KSArIChpYSA8PCAyNCkpID4+PiAwOyAvLyBuZWVkIHVuc2lnbmVkIHJpZ2h0IHNoaWZ0IHRvIGNvbnZlcnQgdG8gcG9zaXRpdmUgI1xuXG4gICAgY29sb3JfbWFwW2tleV0gPSB7XG4gICAgICAgIGNvbG9yOiBbciwgZywgYiwgYV0sXG4gICAgfTtcblxuICAgIHJldHVybiBjb2xvcl9tYXBba2V5XTtcbn07XG5cblN0eWxlLnJlc2V0U2VsZWN0aW9uTWFwID0gZnVuY3Rpb24gKClcbntcbiAgICBTdHlsZS5zZWxlY3Rpb25fbWFwID0ge307XG4gICAgU3R5bGUuc2VsZWN0aW9uX21hcF9jdXJyZW50ID0gMTtcbn07XG5cbi8vIEZpbmQgYW5kIGV4cGFuZCBzdHlsZSBtYWNyb3NcblN0eWxlLm1hY3JvcyA9IFtcbiAgICAnU3R5bGUuY29sb3IucHNldWRvUmFuZG9tQ29sb3InLFxuICAgICdTdHlsZS5waXhlbHMnXG5dO1xuXG5TdHlsZS5leHBhbmRNYWNyb3MgPSBmdW5jdGlvbiBleHBhbmRNYWNyb3MgKG9iaikge1xuICAgIGZvciAodmFyIHAgaW4gb2JqKSB7XG4gICAgICAgIHZhciB2YWwgPSBvYmpbcF07XG5cbiAgICAgICAgLy8gTG9vcCB0aHJvdWdoIG9iamVjdCBwcm9wZXJ0aWVzXG4gICAgICAgIGlmICh0eXBlb2YgdmFsID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBvYmpbcF0gPSBleHBhbmRNYWNyb3ModmFsKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDb252ZXJ0IHN0cmluZ3MgYmFjayBpbnRvIGZ1bmN0aW9uc1xuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBtIGluIFN0eWxlLm1hY3Jvcykge1xuICAgICAgICAgICAgICAgIGlmICh2YWwubWF0Y2goU3R5bGUubWFjcm9zW21dKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZjtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2YWwoJ2YgPSAnICsgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ialtwXSA9IGY7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmFsbC1iYWNrIHRvIG9yaWdpbmFsIHZhbHVlIGlmIHBhcnNpbmcgZmFpbGVkXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpbcF0gPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxuXG4vLyBTdHlsZSBkZWZhdWx0c1xuXG4vLyBEZXRlcm1pbmUgZmluYWwgc3R5bGUgcHJvcGVydGllcyAoY29sb3IsIHdpZHRoLCBldGMuKVxuU3R5bGUuZGVmYXVsdHMgPSB7XG4gICAgY29sb3I6IFsxLjAsIDAsIDBdLFxuICAgIHdpZHRoOiAxLFxuICAgIHNpemU6IDEsXG4gICAgZXh0cnVkZTogZmFsc2UsXG4gICAgaGVpZ2h0OiAyMCxcbiAgICBtaW5faGVpZ2h0OiAwLFxuICAgIG91dGxpbmU6IHtcbiAgICAgICAgLy8gY29sb3I6IFsxLjAsIDAsIDBdLFxuICAgICAgICAvLyB3aWR0aDogMSxcbiAgICAgICAgLy8gZGFzaDogbnVsbFxuICAgIH0sXG4gICAgc2VsZWN0aW9uOiB7XG4gICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgIGNvbG9yOiBbMCwgMCwgMCwgMV1cbiAgICB9LFxuICAgIG1vZGU6IHtcbiAgICAgICAgbmFtZTogJ3BvbHlnb25zJ1xuICAgIH1cbn07XG5cbi8vIFN0eWxlIHBhcnNpbmdcblxuLy8gSGVscGVyIGZ1bmN0aW9ucyBwYXNzZWQgdG8gZHluYW1pYyBzdHlsZSBmdW5jdGlvbnNcblN0eWxlLmhlbHBlcnMgPSB7XG4gICAgU3R5bGU6IFN0eWxlLFxuICAgIEdlbzogR2VvXG59O1xuXG5TdHlsZS5wYXJzZVN0eWxlRm9yRmVhdHVyZSA9IGZ1bmN0aW9uIChmZWF0dXJlLCBsYXllcl9uYW1lLCBsYXllcl9zdHlsZSwgdGlsZSlcbntcbiAgICB2YXIgbGF5ZXJfc3R5bGUgPSBsYXllcl9zdHlsZSB8fCB7fTtcbiAgICB2YXIgc3R5bGUgPSB7fTtcblxuICAgIFN0eWxlLmhlbHBlcnMuem9vbSA9IHRpbGUuY29vcmRzLno7XG5cbiAgICAvLyBUZXN0IHdoZXRoZXIgZmVhdHVyZXMgc2hvdWxkIGJlIHJlbmRlcmVkIGF0IGFsbFxuICAgIGlmICh0eXBlb2YgbGF5ZXJfc3R5bGUuZmlsdGVyID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgaWYgKGxheWVyX3N0eWxlLmZpbHRlcihmZWF0dXJlLCB0aWxlLCBTdHlsZS5oZWxwZXJzKSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQYXJzZSBzdHlsZXNcbiAgICBzdHlsZS5jb2xvciA9IChsYXllcl9zdHlsZS5jb2xvciAmJiAobGF5ZXJfc3R5bGUuY29sb3JbZmVhdHVyZS5wcm9wZXJ0aWVzLmtpbmRdIHx8IGxheWVyX3N0eWxlLmNvbG9yLmRlZmF1bHQpKSB8fCBTdHlsZS5kZWZhdWx0cy5jb2xvcjtcbiAgICBpZiAodHlwZW9mIHN0eWxlLmNvbG9yID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgc3R5bGUuY29sb3IgPSBzdHlsZS5jb2xvcihmZWF0dXJlLCB0aWxlLCBTdHlsZS5oZWxwZXJzKTtcbiAgICB9XG5cbiAgICBzdHlsZS53aWR0aCA9IChsYXllcl9zdHlsZS53aWR0aCAmJiAobGF5ZXJfc3R5bGUud2lkdGhbZmVhdHVyZS5wcm9wZXJ0aWVzLmtpbmRdIHx8IGxheWVyX3N0eWxlLndpZHRoLmRlZmF1bHQpKSB8fCBTdHlsZS5kZWZhdWx0cy53aWR0aDtcbiAgICBpZiAodHlwZW9mIHN0eWxlLndpZHRoID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgc3R5bGUud2lkdGggPSBzdHlsZS53aWR0aChmZWF0dXJlLCB0aWxlLCBTdHlsZS5oZWxwZXJzKTtcbiAgICB9XG4gICAgc3R5bGUud2lkdGggKj0gR2VvLnVuaXRzX3Blcl9tZXRlclt0aWxlLmNvb3Jkcy56XTtcblxuICAgIHN0eWxlLnNpemUgPSAobGF5ZXJfc3R5bGUuc2l6ZSAmJiAobGF5ZXJfc3R5bGUuc2l6ZVtmZWF0dXJlLnByb3BlcnRpZXMua2luZF0gfHwgbGF5ZXJfc3R5bGUuc2l6ZS5kZWZhdWx0KSkgfHwgU3R5bGUuZGVmYXVsdHMuc2l6ZTtcbiAgICBpZiAodHlwZW9mIHN0eWxlLnNpemUgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBzdHlsZS5zaXplID0gc3R5bGUuc2l6ZShmZWF0dXJlLCB0aWxlLCBTdHlsZS5oZWxwZXJzKTtcbiAgICB9XG4gICAgc3R5bGUuc2l6ZSAqPSBHZW8udW5pdHNfcGVyX21ldGVyW3RpbGUuY29vcmRzLnpdO1xuXG4gICAgc3R5bGUuZXh0cnVkZSA9IChsYXllcl9zdHlsZS5leHRydWRlICYmIChsYXllcl9zdHlsZS5leHRydWRlW2ZlYXR1cmUucHJvcGVydGllcy5raW5kXSB8fCBsYXllcl9zdHlsZS5leHRydWRlLmRlZmF1bHQpKSB8fCBTdHlsZS5kZWZhdWx0cy5leHRydWRlO1xuICAgIGlmICh0eXBlb2Ygc3R5bGUuZXh0cnVkZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIHJldHVybmluZyBhIGJvb2xlYW4gd2lsbCBleHRydWRlIHdpdGggdGhlIGZlYXR1cmUncyBoZWlnaHQsIGEgbnVtYmVyIHdpbGwgb3ZlcnJpZGUgdGhlIGZlYXR1cmUgaGVpZ2h0IChzZWUgYmVsb3cpXG4gICAgICAgIHN0eWxlLmV4dHJ1ZGUgPSBzdHlsZS5leHRydWRlKGZlYXR1cmUsIHRpbGUsIFN0eWxlLmhlbHBlcnMpO1xuICAgIH1cblxuICAgIHN0eWxlLmhlaWdodCA9IChmZWF0dXJlLnByb3BlcnRpZXMgJiYgZmVhdHVyZS5wcm9wZXJ0aWVzLmhlaWdodCkgfHwgU3R5bGUuZGVmYXVsdHMuaGVpZ2h0O1xuICAgIHN0eWxlLm1pbl9oZWlnaHQgPSAoZmVhdHVyZS5wcm9wZXJ0aWVzICYmIGZlYXR1cmUucHJvcGVydGllcy5taW5faGVpZ2h0KSB8fCBTdHlsZS5kZWZhdWx0cy5taW5faGVpZ2h0O1xuXG4gICAgLy8gaGVpZ2h0IGRlZmF1bHRzIHRvIGZlYXR1cmUgaGVpZ2h0LCBidXQgZXh0cnVkZSBzdHlsZSBjYW4gZHluYW1pY2FsbHkgYWRqdXN0IGhlaWdodCBieSByZXR1cm5pbmcgYSBudW1iZXIgb3IgYXJyYXkgKGluc3RlYWQgb2YgYSBib29sZWFuKVxuICAgIGlmIChzdHlsZS5leHRydWRlKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc3R5bGUuZXh0cnVkZSA9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgc3R5bGUuaGVpZ2h0ID0gc3R5bGUuZXh0cnVkZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygc3R5bGUuZXh0cnVkZSA9PSAnb2JqZWN0JyAmJiBzdHlsZS5leHRydWRlLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICBzdHlsZS5taW5faGVpZ2h0ID0gc3R5bGUuZXh0cnVkZVswXTtcbiAgICAgICAgICAgIHN0eWxlLmhlaWdodCA9IHN0eWxlLmV4dHJ1ZGVbMV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdHlsZS56ID0gKGxheWVyX3N0eWxlLnogJiYgKGxheWVyX3N0eWxlLnpbZmVhdHVyZS5wcm9wZXJ0aWVzLmtpbmRdIHx8IGxheWVyX3N0eWxlLnouZGVmYXVsdCkpIHx8IFN0eWxlLmRlZmF1bHRzLnogfHwgMDtcbiAgICBpZiAodHlwZW9mIHN0eWxlLnogPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBzdHlsZS56ID0gc3R5bGUueihmZWF0dXJlLCB0aWxlLCBTdHlsZS5oZWxwZXJzKTtcbiAgICB9XG5cbiAgICBzdHlsZS5vdXRsaW5lID0ge307XG4gICAgbGF5ZXJfc3R5bGUub3V0bGluZSA9IGxheWVyX3N0eWxlLm91dGxpbmUgfHwge307XG4gICAgc3R5bGUub3V0bGluZS5jb2xvciA9IChsYXllcl9zdHlsZS5vdXRsaW5lLmNvbG9yICYmIChsYXllcl9zdHlsZS5vdXRsaW5lLmNvbG9yW2ZlYXR1cmUucHJvcGVydGllcy5raW5kXSB8fCBsYXllcl9zdHlsZS5vdXRsaW5lLmNvbG9yLmRlZmF1bHQpKSB8fCBTdHlsZS5kZWZhdWx0cy5vdXRsaW5lLmNvbG9yO1xuICAgIGlmICh0eXBlb2Ygc3R5bGUub3V0bGluZS5jb2xvciA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHN0eWxlLm91dGxpbmUuY29sb3IgPSBzdHlsZS5vdXRsaW5lLmNvbG9yKGZlYXR1cmUsIHRpbGUsIFN0eWxlLmhlbHBlcnMpO1xuICAgIH1cblxuICAgIHN0eWxlLm91dGxpbmUud2lkdGggPSAobGF5ZXJfc3R5bGUub3V0bGluZS53aWR0aCAmJiAobGF5ZXJfc3R5bGUub3V0bGluZS53aWR0aFtmZWF0dXJlLnByb3BlcnRpZXMua2luZF0gfHwgbGF5ZXJfc3R5bGUub3V0bGluZS53aWR0aC5kZWZhdWx0KSkgfHwgU3R5bGUuZGVmYXVsdHMub3V0bGluZS53aWR0aDtcbiAgICBpZiAodHlwZW9mIHN0eWxlLm91dGxpbmUud2lkdGggPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBzdHlsZS5vdXRsaW5lLndpZHRoID0gc3R5bGUub3V0bGluZS53aWR0aChmZWF0dXJlLCB0aWxlLCBTdHlsZS5oZWxwZXJzKTtcbiAgICB9XG4gICAgc3R5bGUub3V0bGluZS53aWR0aCAqPSBHZW8udW5pdHNfcGVyX21ldGVyW3RpbGUuY29vcmRzLnpdO1xuXG4gICAgc3R5bGUub3V0bGluZS5kYXNoID0gKGxheWVyX3N0eWxlLm91dGxpbmUuZGFzaCAmJiAobGF5ZXJfc3R5bGUub3V0bGluZS5kYXNoW2ZlYXR1cmUucHJvcGVydGllcy5raW5kXSB8fCBsYXllcl9zdHlsZS5vdXRsaW5lLmRhc2guZGVmYXVsdCkpIHx8IFN0eWxlLmRlZmF1bHRzLm91dGxpbmUuZGFzaDtcbiAgICBpZiAodHlwZW9mIHN0eWxlLm91dGxpbmUuZGFzaCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHN0eWxlLm91dGxpbmUuZGFzaCA9IHN0eWxlLm91dGxpbmUuZGFzaChmZWF0dXJlLCB0aWxlLCBTdHlsZS5oZWxwZXJzKTtcbiAgICB9XG5cbiAgICAvLyBJbnRlcmFjdGl2aXR5IChzZWxlY3Rpb24gbWFwKVxuICAgIHZhciBpbnRlcmFjdGl2ZSA9IGZhbHNlO1xuICAgIGlmICh0eXBlb2YgbGF5ZXJfc3R5bGUuaW50ZXJhY3RpdmUgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBpbnRlcmFjdGl2ZSA9IGxheWVyX3N0eWxlLmludGVyYWN0aXZlKGZlYXR1cmUsIHRpbGUsIFN0eWxlLmhlbHBlcnMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaW50ZXJhY3RpdmUgPSBsYXllcl9zdHlsZS5pbnRlcmFjdGl2ZTtcbiAgICB9XG5cbiAgICBpZiAoaW50ZXJhY3RpdmUgPT0gdHJ1ZSkge1xuICAgICAgICB2YXIgc2VsZWN0b3IgPSBTdHlsZS5nZW5lcmF0ZVNlbGVjdGlvbihTdHlsZS5zZWxlY3Rpb25fbWFwKTtcblxuICAgICAgICBzZWxlY3Rvci5mZWF0dXJlID0ge1xuICAgICAgICAgICAgaWQ6IGZlYXR1cmUuaWQsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBmZWF0dXJlLnByb3BlcnRpZXNcbiAgICAgICAgfTtcbiAgICAgICAgc2VsZWN0b3IuZmVhdHVyZS5wcm9wZXJ0aWVzLmxheWVyID0gbGF5ZXJfbmFtZTsgLy8gYWRkIGxheWVyIG5hbWUgdG8gcHJvcGVydGllc1xuXG4gICAgICAgIHN0eWxlLnNlbGVjdGlvbiA9IHtcbiAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbG9yOiBzZWxlY3Rvci5jb2xvclxuICAgICAgICB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc3R5bGUuc2VsZWN0aW9uID0gU3R5bGUuZGVmYXVsdHMuc2VsZWN0aW9uO1xuICAgIH1cblxuICAgIGlmIChsYXllcl9zdHlsZS5tb2RlICE9IG51bGwgJiYgbGF5ZXJfc3R5bGUubW9kZS5uYW1lICE9IG51bGwpIHtcbiAgICAgICAgc3R5bGUubW9kZSA9IHt9O1xuICAgICAgICBmb3IgKHZhciBtIGluIGxheWVyX3N0eWxlLm1vZGUpIHtcbiAgICAgICAgICAgIHN0eWxlLm1vZGVbbV0gPSBsYXllcl9zdHlsZS5tb2RlW21dO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzdHlsZS5tb2RlID0gU3R5bGUuZGVmYXVsdHMubW9kZTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3R5bGU7XG59O1xuXG5pZiAobW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IFN0eWxlO1xufVxuIiwiLy8gTWlzY2VsbGFuZW91cyB1dGlsaXRpZXNcblxuLy8gU2ltcGxpc3RpYyBkZXRlY3Rpb24gb2YgcmVsYXRpdmUgcGF0aHMsIGFwcGVuZCBiYXNlIGlmIG5lY2Vzc2FyeVxuZnVuY3Rpb24gdXJsRm9yUGF0aCAocGF0aCkge1xuICAgIGlmIChwYXRoID09IG51bGwgfHwgcGF0aCA9PSAnJykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBDYW4gZXhwYW5kIGEgc2luZ2xlIHBhdGgsIG9yIGFuIGFycmF5IG9mIHBhdGhzXG4gICAgaWYgKHR5cGVvZiBwYXRoID09ICdvYmplY3QnICYmIHBhdGgubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBBcnJheSBvZiBwYXRoc1xuICAgICAgICBmb3IgKHZhciBwIGluIHBhdGgpIHtcbiAgICAgICAgICAgIHZhciBwcm90b2NvbCA9IHBhdGhbcF0udG9Mb3dlckNhc2UoKS5zdWJzdHIoMCwgNCk7XG4gICAgICAgICAgICBpZiAoIShwcm90b2NvbCA9PSAnaHR0cCcgfHwgcHJvdG9jb2wgPT0gJ2ZpbGUnKSkge1xuICAgICAgICAgICAgICAgIHBhdGhbcF0gPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgcGF0aFtwXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gU2luZ2xlIHBhdGhcbiAgICAgICAgdmFyIHByb3RvY29sID0gcGF0aC50b0xvd2VyQ2FzZSgpLnN1YnN0cigwLCA0KTtcbiAgICAgICAgaWYgKCEocHJvdG9jb2wgPT0gJ2h0dHAnIHx8IHByb3RvY29sID09ICdmaWxlJykpIHtcbiAgICAgICAgICAgIHBhdGggPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgcGF0aDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGF0aDtcbn07XG5cbi8vIFN0cmluZ2lmeSBhbiBvYmplY3QgaW50byBKU09OLCBidXQgY29udmVydCBmdW5jdGlvbnMgdG8gc3RyaW5nc1xuZnVuY3Rpb24gc2VyaWFsaXplV2l0aEZ1bmN0aW9ucyAob2JqKVxue1xuICAgIHZhciBzZXJpYWxpemVkID0gSlNPTi5zdHJpbmdpZnkob2JqLCBmdW5jdGlvbihrLCB2KSB7XG4gICAgICAgIC8vIENvbnZlcnQgZnVuY3Rpb25zIHRvIHN0cmluZ3NcbiAgICAgICAgaWYgKHR5cGVvZiB2ID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiB2LnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2VyaWFsaXplZDtcbn07XG5cbi8vIFBhcnNlIGEgSlNPTiBzdHJpbmcsIGJ1dCBjb252ZXJ0IGZ1bmN0aW9uLWxpa2Ugc3RyaW5ncyBiYWNrIGludG8gZnVuY3Rpb25zXG5mdW5jdGlvbiBkZXNlcmlhbGl6ZVdpdGhGdW5jdGlvbnMgKHNlcmlhbGl6ZWQpIHtcbiAgICB2YXIgb2JqID0gSlNPTi5wYXJzZShzZXJpYWxpemVkKTtcbiAgICBvYmogPSBzdHJpbmdzVG9GdW5jdGlvbnMob2JqKTtcblxuICAgIHJldHVybiBvYmo7XG59O1xuXG4vLyBSZWN1cnNpdmVseSBwYXJzZSBhbiBvYmplY3QsIGF0dGVtcHRpbmcgdG8gY29udmVydCBzdHJpbmcgcHJvcGVydGllcyB0aGF0IGxvb2sgbGlrZSBmdW5jdGlvbnMgYmFjayBpbnRvIGZ1bmN0aW9uc1xuZnVuY3Rpb24gc3RyaW5nc1RvRnVuY3Rpb25zIChvYmopIHtcbiAgICBmb3IgKHZhciBwIGluIG9iaikge1xuICAgICAgICB2YXIgdmFsID0gb2JqW3BdO1xuXG4gICAgICAgIC8vIExvb3AgdGhyb3VnaCBvYmplY3QgcHJvcGVydGllc1xuICAgICAgICBpZiAodHlwZW9mIHZhbCA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgb2JqW3BdID0gc3RyaW5nc1RvRnVuY3Rpb25zKHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ29udmVydCBzdHJpbmdzIGJhY2sgaW50byBmdW5jdGlvbnNcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbCA9PSAnc3RyaW5nJyAmJiB2YWwubWF0Y2goL15mdW5jdGlvbi4qXFwoLipcXCkvKSAhPSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgZjtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZXZhbCgnZiA9ICcgKyB2YWwpO1xuICAgICAgICAgICAgICAgIG9ialtwXSA9IGY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIGZhbGwtYmFjayB0byBvcmlnaW5hbCB2YWx1ZSBpZiBwYXJzaW5nIGZhaWxlZFxuICAgICAgICAgICAgICAgIG9ialtwXSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG4vLyBSdW4gYSBibG9jayBpZiBvbiB0aGUgbWFpbiB0aHJlYWQgKG5vdCBpbiBhIHdlYiB3b3JrZXIpLCB3aXRoIG9wdGlvbmFsIGVycm9yICh3ZWIgd29ya2VyKSBibG9ja1xuZnVuY3Rpb24gcnVuSWZJbk1haW5UaHJlYWQgKGJsb2NrLCBlcnIpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAod2luZG93LmRvY3VtZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGJsb2NrKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBlcnIgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXJyKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIFVzZWQgZm9yIGRpZmZlcmVudGlhdGluZyBiZXR3ZWVuIHBvd2VyLW9mLTIgYW5kIG5vbi1wb3dlci1vZi0yIHRleHR1cmVzXG4vLyBWaWE6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTk3MjIyNDcvd2ViZ2wtd2FpdC1mb3ItdGV4dHVyZS10by1sb2FkXG5mdW5jdGlvbiBpc1Bvd2VyT2YyICh2YWx1ZSkge1xuICAgIHJldHVybiAodmFsdWUgJiAodmFsdWUgLSAxKSkgPT0gMDtcbn07XG5cbmlmIChtb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuICAgIG1vZHVsZS5leHBvcnRzID0ge1xuICAgICAgICB1cmxGb3JQYXRoOiB1cmxGb3JQYXRoLFxuICAgICAgICBzZXJpYWxpemVXaXRoRnVuY3Rpb25zOiBzZXJpYWxpemVXaXRoRnVuY3Rpb25zLFxuICAgICAgICBkZXNlcmlhbGl6ZVdpdGhGdW5jdGlvbnM6IGRlc2VyaWFsaXplV2l0aEZ1bmN0aW9ucyxcbiAgICAgICAgc3RyaW5nc1RvRnVuY3Rpb25zOiBzdHJpbmdzVG9GdW5jdGlvbnMsXG4gICAgICAgIHJ1bklmSW5NYWluVGhyZWFkOiBydW5JZkluTWFpblRocmVhZCxcbiAgICAgICAgaXNQb3dlck9mMjogaXNQb3dlck9mMlxuICAgIH07XG59XG4iLCIvKioqIFZlY3RvciBmdW5jdGlvbnMgLSB2ZWN0b3JzIHByb3ZpZGVkIGFzIFt4LCB5LCB6XSBhcnJheXMgKioqL1xuXG52YXIgVmVjdG9yID0ge307XG5cbi8vIFZlY3RvciBsZW5ndGggc3F1YXJlZFxuVmVjdG9yLmxlbmd0aFNxID0gZnVuY3Rpb24gKHYpXG57XG4gICAgaWYgKHYubGVuZ3RoID09IDIpIHtcbiAgICAgICAgcmV0dXJuICh2WzBdKnZbMF0gKyB2WzFdKnZbMV0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuICh2WzBdKnZbMF0gKyB2WzFdKnZbMV0gKyB2WzJdKnZbMl0pO1xuICAgIH1cbn07XG5cbi8vIFZlY3RvciBsZW5ndGhcblZlY3Rvci5sZW5ndGggPSBmdW5jdGlvbiAodilcbntcbiAgICByZXR1cm4gTWF0aC5zcXJ0KFZlY3Rvci5sZW5ndGhTcSh2KSk7XG59O1xuXG4vLyBOb3JtYWxpemUgYSB2ZWN0b3JcblZlY3Rvci5ub3JtYWxpemUgPSBmdW5jdGlvbiAodilcbntcbiAgICB2YXIgZDtcbiAgICBpZiAodi5sZW5ndGggPT0gMikge1xuICAgICAgICBkID0gdlswXSp2WzBdICsgdlsxXSp2WzFdO1xuICAgICAgICBkID0gTWF0aC5zcXJ0KGQpO1xuXG4gICAgICAgIGlmIChkICE9IDApIHtcbiAgICAgICAgICAgIHJldHVybiBbdlswXSAvIGQsIHZbMV0gLyBkXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gWzAsIDBdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIGQgPSB2WzBdKnZbMF0gKyB2WzFdKnZbMV0gKyB2WzJdKnZbMl07XG4gICAgICAgIGQgPSBNYXRoLnNxcnQoZCk7XG5cbiAgICAgICAgaWYgKGQgIT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFt2WzBdIC8gZCwgdlsxXSAvIGQsIHZbMl0gLyBkXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gWzAsIDAsIDBdO1xuICAgIH1cbn07XG5cbi8vIENyb3NzIHByb2R1Y3Qgb2YgdHdvIHZlY3RvcnNcblZlY3Rvci5jcm9zcyAgPSBmdW5jdGlvbiAodjEsIHYyKVxue1xuICAgIHJldHVybiBbXG4gICAgICAgICh2MVsxXSAqIHYyWzJdKSAtICh2MVsyXSAqIHYyWzFdKSxcbiAgICAgICAgKHYxWzJdICogdjJbMF0pIC0gKHYxWzBdICogdjJbMl0pLFxuICAgICAgICAodjFbMF0gKiB2MlsxXSkgLSAodjFbMV0gKiB2MlswXSlcbiAgICBdO1xufTtcblxuLy8gRmluZCB0aGUgaW50ZXJzZWN0aW9uIG9mIHR3byBsaW5lcyBzcGVjaWZpZWQgYXMgc2VnbWVudHMgZnJvbSBwb2ludHMgKHAxLCBwMikgYW5kIChwMywgcDQpXG4vLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xpbmUtbGluZV9pbnRlcnNlY3Rpb25cbi8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ3JhbWVyJ3NfcnVsZVxuVmVjdG9yLmxpbmVJbnRlcnNlY3Rpb24gPSBmdW5jdGlvbiAocDEsIHAyLCBwMywgcDQsIHBhcmFsbGVsX3RvbGVyYW5jZSlcbntcbiAgICB2YXIgcGFyYWxsZWxfdG9sZXJhbmNlID0gcGFyYWxsZWxfdG9sZXJhbmNlIHx8IDAuMDE7XG5cbiAgICAvLyBhMSp4ICsgYjEqeSA9IGMxIGZvciBsaW5lICh4MSwgeTEpIHRvICh4MiwgeTIpXG4gICAgLy8gYTIqeCArIGIyKnkgPSBjMiBmb3IgbGluZSAoeDMsIHkzKSB0byAoeDQsIHk0KVxuICAgIHZhciBhMSA9IHAxWzFdIC0gcDJbMV07IC8vIHkxIC0geTJcbiAgICB2YXIgYjEgPSBwMVswXSAtIHAyWzBdOyAvLyB4MSAtIHgyXG4gICAgdmFyIGEyID0gcDNbMV0gLSBwNFsxXTsgLy8geTMgLSB5NFxuICAgIHZhciBiMiA9IHAzWzBdIC0gcDRbMF07IC8vIHgzIC0geDRcbiAgICB2YXIgYzEgPSAocDFbMF0gKiBwMlsxXSkgLSAocDFbMV0gKiBwMlswXSk7IC8vIHgxKnkyIC0geTEqeDJcbiAgICB2YXIgYzIgPSAocDNbMF0gKiBwNFsxXSkgLSAocDNbMV0gKiBwNFswXSk7IC8vIHgzKnk0IC0geTMqeDRcbiAgICB2YXIgZGVub20gPSAoYjEgKiBhMikgLSAoYTEgKiBiMik7XG5cbiAgICBpZiAoTWF0aC5hYnMoZGVub20pID4gcGFyYWxsZWxfdG9sZXJhbmNlKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAoKGMxICogYjIpIC0gKGIxICogYzIpKSAvIGRlbm9tLFxuICAgICAgICAgICAgKChjMSAqIGEyKSAtIChhMSAqIGMyKSkgLyBkZW5vbVxuICAgICAgICBdO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDsgLy8gcmV0dXJuIG51bGwgaWYgbGluZXMgYXJlIChjbG9zZSB0bykgcGFyYWxsZWxcbn07XG5cbmlmIChtb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gVmVjdG9yO1xufVxuIl19
(13)
});
