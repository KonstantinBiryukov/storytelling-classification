<template>
  <div id="map"></div>
</template>

<script>
// import mapboxgl from "mapbox-gl";
import store from "@/store/store";
// import * as d3 from 'd3';

export default {
  name: "RealTimeRouteRender",
  data: function () {
    return {
      // style: "mapbox://styles/mapbox/satellite-v9"
      // center: [-93.1247, 44.9323], // St. Paul
      // zoom: 10.5
    }
  },
  computed: {
    // map() {
    //   return store.getters.createMap("map", 0, 55, 15,
    //       [-122.019807, 45.632433], this.style, 12
    //   );
    // }
  },
  // methods: {
  //   createMap() {
  //     // instantiate map.  this method runs once after the vue component is mounted to the dom
  //     this.map = new mapboxgl.Map({
  //       accessToken:
  //           "pk.eyJ1IjoiYmZyaWVkbHkiLCJhIjoiY2p4bHd1OXdpMGFycDN0bzFiNWR4d2VyNyJ9.3hQjvgyoPoCuRx-Hqr_BFQ",
  //       container: "map",
  //       style: "mapbox://styles/mapbox/streets-v11",
  //       minzoom: 5,
  //       center: this.center, // use initial data as default
  //       zoom: this.zoom,
  //       hash: true // sets url's hash to #zoom/lat/lng
  //     });
  //   }
  // },
  mounted() {
    let map = store.getters.d3Map();
    map.on('load', function () {
// We use D3 to fetch the JSON here so that we can parse and use it separately
// from GL JS's use in the added source. You can use any request method (library
// or otherwise) that you want.
      //   Important!  "d3": "^3.5.17" is used. d3.json() function in newer version has different syntax.
      store.state.d3.json(
          // "public/hike.geojson",
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

/*#map {*/
/*  position: absolute;*/
/*  top: 0;*/
/*  bottom: 0;*/
/*  width: 100%;*/
/*}*/
</style>