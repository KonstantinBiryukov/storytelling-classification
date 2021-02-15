<template>
  <div class="path-follow-container">
    <div id="map"></div>
  </div>
</template>

<script>
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import store from "@/store/store";
import * as turf from "@turf/turf";
import {routes} from "@/assets/routes.js";

export default {
  name: "PathFollow",
  data: function () {
    return {
      style: 'mapbox://styles/mapbox/streets-v11',
    }
  },
  computed: {
    map() {
      return store.getters.createMap("map", -180, 65, 11.53,
          [6.5615, 46.0598], this.style, 9.5, false
      );
    }
  },
  mounted() {
// `routes` comes from https://docs.mapbox.com/mapbox-gl-js/assets/routes.js,
// which has properties that are in the shape of an array of arrays that correspond
//  to the `coordinates` property of a GeoJSON linestring, for example:
// [
//   [6.56158, 46.05989],
//   [6.56913, 46.05679],
//   ...
// ]
// this is the path the camera will look at
    var targetRoute = routes.target;
// this is the path the camera will move along
    var cameraRoute = routes.camera;
    let map = this.map;

    // add terrain, sky, and line layers once the style has loaded
    map.on('load', function () {
      map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
      });

      map.setTerrain({'source': 'mapbox-dem', 'exaggeration': 1.5});
      map.addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 90.0],
          'sky-atmosphere-sun-intensity': 15
        }
      });
      map.addSource('trace', {
        type: 'geojson',
        data: {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': targetRoute
          }
        }
      });
      map.addLayer({
        type: 'line',
        source: 'trace',
        id: 'line',
        paint: {
          'line-color': 'red',
          'line-width': 5
        },
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        }
      });
    });

// wait for the terrain and sky to load before starting animation
    map.on('load', function () {
      var animationDuration = 80000;
      var cameraAltitude = 4000;
// get the overall distance of each route so we can interpolate along them


      var routeDistance = turf.lineDistance(turf.lineString(targetRoute));
      var cameraRouteDistance = turf.lineDistance(turf.lineString(cameraRoute));

      var start;

      function frame(time) {
        if (!start) start = time;
// phase determines how far through the animation we are
        let phase = (time - start) / animationDuration;

// phase is normalized between 0 and 1
// when the animation is finished, reset start to loop the animation
        if (phase > 1) {
// wait 1.5 seconds before looping
          setTimeout(function () {
            start = 0.0;
          }, 2000);
        }

// use the phase to get a point that is the appropriate distance along the route
// this approach syncs the camera and route positions ensuring they move
// at roughly equal rates even if they don't contain the same number of points
        let alongRoute = turf.along(
            turf.lineString(targetRoute),
            routeDistance * phase
        ).geometry.coordinates;

        let alongCamera = turf.along(
            turf.lineString(cameraRoute),
            cameraRouteDistance * phase
        ).geometry.coordinates;
        let camera = map.getFreeCameraOptions();

// set the position and altitude of the camera
        camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
            {
              lng: alongCamera[0],
              lat: alongCamera[1]
            },
            cameraAltitude
        );

// tell the camera to look at a point along the route
        camera.lookAtPoint({
          lng: alongRoute[0],
          lat: alongRoute[1]
        });

        map.setFreeCameraOptions(camera);

        window.requestAnimationFrame(frame);
      }

      window.requestAnimationFrame(frame);

      // popup helper with description
      new mapboxgl.Popup({closeOnClick: false, anchor: "center"})
          .setLngLat([6.610342272663989, 46.04037546190009])
          .setHTML('<div id="animation-helper" class="popup-helper">' +
              'The path is pre-rendered and the camera just follows the route.' +
              '</div>')
          .addTo(map);
    });

  }
}
</script>

<style scoped>
</style>