<template>
  <div id="map"></div>

</template>

<script>
import store from "@/store/store";
// import * as indoor from '@/assets/indoor-3d-map.geojson';

export default {
  name: "3dPolygons",
  data: function () {
    return {
      style: 'mapbox://styles/mapbox/streets-v11',
    }
  },
  computed: {
    map() {
      return store.getters.createMap("map", 20, 40, 15.99,
          [-87.61694, 41.86625], this.style, 9.5, true
      );
    }
  },
  mounted() {
    let map = this.map;

    this.timeout = setTimeout(() => {
      fetch('/Users/konstantinbiriukov/IdeaProjects/Master_Thesis/storytelling_classification/public/server/info/indoor-3d-map.geojson') //test 2
          .then(response => response.json())
          .then((data) => {
            console.log(data);
          });
    }, 10000);

    map.on('load', function () {
      map.addSource('floorplan', {
// GeoJSON Data source used in vector tiles, documented at
// https://gist.github.com/ryanbaumann/a7d970386ce59d11c16278b90dde094d
        'type': 'geojson',
        'data':
            // 'https://docs.mapbox.com/mapbox-gl-js/assets/indoor-3d-map.geojson'
        'server/info/indoor-3d-map.geojson'
      });
      map.addLayer({
        'id': 'room-extrusion',
        'type': 'fill-extrusion',
        'source': 'floorplan',
        'paint': {
// See the Mapbox Style Specification for details on data expressions.
// https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions

// Get the fill-extrusion-color from the source 'color' property.
          'fill-extrusion-color': ['get', 'color'],

// Get fill-extrusion-height from the source 'height' property.
          'fill-extrusion-height': ['get', 'height'],

// Get fill-extrusion-base from the source 'base_height' property.
          'fill-extrusion-base': ['get', 'base_height'],

// Make extrusions slightly opaque for see through indoor walls.
          'fill-extrusion-opacity': 0.5
        }
      });
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