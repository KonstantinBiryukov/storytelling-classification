<template>
  <div id="map"></div>
</template>

<script>
import store from "@/store/store";

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
            console.log(data);
// save full coordinate list for later
            var coordinates = data.features[0].geometry.coordinates;
          console.log(coordinates);
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
            var i = 0;
            var timer = window.setInterval(function () {
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
    });
  }
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

#map {
  position: fixed;
  width: 99%;
  top: 20%;
  bottom: 1%;
}

</style>