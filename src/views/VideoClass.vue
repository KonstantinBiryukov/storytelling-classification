<template>
  <div class="video-map-container">
    <div id="map">
    </div>
  </div>
</template>

<script>
import store from "@/store/store";

export default {
  name: "ControlBySound",
  data: function () {
    return {
      style: {
        'version': 8,
        'sources': {
          'satellite': {
            'type': 'raster',
            'url': 'mapbox://mapbox.satellite',
            'tileSize': 256
          },
          'video': {
            'type': 'video',
            'urls': [
              "https://streamable.com/e/bkadcw?autoplay=1&nocontrols=1"
            ],
            'coordinates': [
              [-121.3006387, 45.68348],
              [-121.2982062, 45.6832854],
              [-121.2983605, 45.6820319],
              [-121.3010827, 45.6821999]
            ]
          }
        },
        'layers': [
          {
            'id': 'background',
            'type': 'background',
            'paint': {
              'background-color': 'rgb(4,7,14)'
            }
          },
          {
            'id': 'satellite',
            'type': 'raster',
            'source': 'satellite'
          },
          {
            'id': 'video',
            'type': 'raster',
            'source': 'video'
          }
        ]
      }
    }
  },
  computed: {
    map() {
      return store.getters.createMap("map", -96, 0, 17,
          [-121.3004577, 45.6823341], this.style, 14
      );
    },
  },
  mounted() {
    let map = this.map;
    var playingVideo = true;

    map.on('click', function () {
      playingVideo = !playingVideo;

      if (playingVideo) map.getSource('video').play();
      else map.getSource('video').pause();
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
