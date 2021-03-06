[
    {
        name: 'landuse',
        data: function (json) {
          return {
              type: 'FeatureCollection',
              features: ((json['landuse']||{}).features||[]).filter(function (feature) {
                  feature.properties.kind = feature.properties.class;
                  return feature;
              })
          };
        }
    },
    {
       name: 'water',
       data: function (json) {
          var water = (json['water'] && json['water'].features) || [];
          var waterway = (json['waterway'] && json['waterway'].features) || [];
          var features = water.concat(waterway);

          return {
              type: 'FeatureCollection',
              features: features
          };
        }
    },
    {
        name: 'roads',
        data: function (json) {
            return {
                type: 'FeatureCollection',
                features: (((json['road']||{}).features)||[]).concat(((json['bridge']||{}).features)||[]).filter(function (feature) {
                    if (['motorway', 'motorway_link'].indexOf(feature.properties.class) > 0) {
                        feature.properties.kind = 'highway';
                    }
                    else if (feature.properties.class == 'main') {
                        feature.properties.kind = 'major_road';
                    }
                    else if (['street', 'street_limited'].indexOf(feature.properties.class) > 0) {
                        feature.properties.kind = 'minor_road';
                    }
                    else {
                        feature.properties.kind = feature.properties.type;
                    }
                    return feature;
                })
            };
        }
    },
    {
        name: 'buildings',
        data: 'building'
    },
    {
        name: 'pois',
        data: function (json) {
          return {
              type: 'FeatureCollection',
              features: ((json['poi_labels']||{}).features||[]).filter(function (feature) {
                  feature.properties.kind = feature.properties.type;
                  return feature;
              })
          };
        }
    }
]
