<template>
  <div id="map"></div>
</template>

<script>
import store from "@/store/store";
import mapboxgl from "mapbox-gl";

export default {
  name: "3dPolygons",
  data: function () {
    return {
      style: 'mapbox://styles/mapbox/streets-v11',
    }
  },
  computed: {
    map() {
      return store.getters.createMap("map", 20, 40, 18.5,
          [-94.1488197, 45.5528413], this.style, 16.5, true
      );
    }
  },
  mounted() {
    store.getters.pageReload();
    let map = this.map;

    map.on('load', function () {
      map.addSource('floorplan', {
        // GeoJSON Data source used in vector tiles, documented at
        // https://gist.github.com/ryanbaumann/a7d970386ce59d11c16278b90dde094d
        'type': 'geojson',
        'data':
            'https://konstantinbiryukov.github.io/storytellingmaps-geojson/features3.geojson'
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

      new mapboxgl.Popup({closeOnClick: false, anchor: "right"})
          .setLngLat([-94.1491197, 45.5528413])
          .setHTML('<div id="polygons-helper" class="popup-helper">3D indoor polygons.</br> ' +
              'Building: Saint Cloud State University, a part of the Stewart Hall. ' +
              'A part of the building is very schematic, created for demonstration purposes.</div>')
          .addTo(map);
    });

  }
}
</script>