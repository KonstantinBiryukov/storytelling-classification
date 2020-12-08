<template>
  <div class="sound-control-container">
    <div id="map"></div>
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
                'https://www.dropbox.com/home/doc?preview=videoClassCompressed+(1).mp4'
              // 'https://player.vimeo.com/video/385796955?title=0&portrait=0&byline=0&autoplay=1',
              // 'https://player.vimeo.com/video/385796955?title=0&portrait=0&byline=0&autoplay=1'
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
      ); // [{minZoom: 14}]
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

/*#map {*/
/*  position: absolute;*/
/*  top: 0;*/
/*  bottom: 0;*/
/*  width: 85%;*/
/*}*/

#map {
  position: fixed;
  width: 99%;
  top: 20%;
  /*bottom: 0;*/
  bottom: 1%;
}

/*#map {*/
/*  position: fixed;*/
/*  width: 50%;*/
/*  top: 20%;*/
/*  bottom: 0;*/
/*}*/
</style>
