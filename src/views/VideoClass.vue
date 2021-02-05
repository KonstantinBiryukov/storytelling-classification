<template>
  <div class="video-map-container">
<!--    <img class="general-view" src="../assets/Rowena_Crest_Viewpoint.png" alt="RowenaCrestViewpoint">-->
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
              "https://konstantinbiryukov.github.io/storytellingmaps-media/videoClassCompressed.mp4"
            ],
            'coordinates': [
              [-121.30366365825599, 45.68540227229188],
              [-121.28883828644251, 45.68540227229188],
              [-121.28883828644251, 45.680570463225905],
              [-121.30366365825599, 45.680570463225905],
            ]
          },
          // 'image' : {
          //   'type': 'image',
          //   'url': 'http://konstantinbiryukov.github.io/storytellingmaps-media/Rowena_Crest_Viewpoint.png',
          //   'coordinates': [
          //     [-121.30366365825599, 45.68560227229188],
          //     [-121.30366365825599, 45.680570463225905],
          //     [-121.31808882486713, 45.683736303300215],
          //     [-121.33811489028996, 45.68442599390837],
          //   ]
          // }
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
          },
          // {
          //   'id': 'image',
          //   'type': 'raster',
          //   'source': 'image'
          // }
        ]
      }
    }
  },
  computed: {
    map() {
      return store.getters.createMap("map", 0, 0, 14.5,
          [-121.29956625872623, 45.6828264172194], this.style, 13, true
      );
    },
  },
  mounted() {
    this.map.setMaxZoom(15.1);
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

/*.general-view {*/
/*  width: 20%;*/
/*  height: 40%;*/
/*  bottom: 0;*/
/*  right: 0;*/
/*}*/


</style>
