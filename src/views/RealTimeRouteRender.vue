<template>
  <div id="map"></div>
</template>

<script>
import store from "@/store/store";
import mapboxgl from "mapbox-gl";

export default {
  name: "RealTimeRouteRender",
  mounted() {
    let map = store.getters.d3Map();
    map.on('load', function () {
      // We use D3 to fetch the JSON here so that we can parse and use it separately
      // from GL JS's use in the added source. You can use any request method (library
      // or otherwise) that you want.
      //   Important!  "d3": "^3.5.17" is used. d3.json() function in newer version has different syntax.
      store.state.d3.json(
          'https://docs.mapbox.com/mapbox-gl-js/assets/hike.geojson',
          function (err, data) {
            if (err) throw err;

            // save full coordinate list for later
            let coordinates = data.features[0].geometry.coordinates;
            // start by showing just the first coordinate
            data.features[0].geometry.coordinates = [coordinates[0]];

          // add it to the map
            map.addSource('trace', {type: 'geojson', data: data});
            map.addLayer({
              'id': 'trace',
              'type': 'line',
              'source': 'trace',
              'paint': {
                'line-color': 'yellow',
                'line-opacity': 0.75,
                'line-width': 5
              }
            });

          // setup the viewport
            map.jumpTo({'center': coordinates[0], 'zoom': 14});
            map.setPitch(30);

          // on a regular basis, add more coordinates from the saved list and update the map
            let i = 0;
            let timer = window.setInterval(function () {
              if (i < coordinates.length) {
                data.features[0].geometry.coordinates.push(
                    coordinates[i]
                );
                map.getSource('trace').setData(data);
                map.panTo(coordinates[i]);
                i++;
              } else {
                window.clearInterval(timer);
              }
            }, 10);
          }
      );

      // popup helper with description
      new mapboxgl.Popup({closeOnClick: false, anchor: "center"})
          .setLngLat([-122.035807, 45.632433])
          .setHTML('<div id="animation-helper" class="popup-helper">' +
              'The path is rendered in real-time. ' +
              'This example shows the progression of a path by adding new coordinates to the route.' +
              '</div>')
          .addTo(map);
    });
  }
}
</script>

<style scoped>
</style>