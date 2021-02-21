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
              "https://konstantinbiryukov.github.io/storytellingmaps-media/videoClassCompressed.mp4"
            ],
            'coordinates': [
              [-121.30366365825599, 45.68540227229188],
              [-121.28883828644251, 45.68540227229188],
              [-121.28883828644251, 45.680570463225905],
              [-121.30366365825599, 45.680570463225905],
            ]
          },
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
      return store.getters.createMap("map", 0, 0, 14.5,
          [-121.29956625872623, 45.6828264172194], this.style, 13, true
      );
    },
  },
  mounted() {
    store.getters.pageReload();
    let mapboxgl = store.state.mapboxgl;
    this.map.setMaxZoom(15.1);
    let map = this.map;
    let playingVideo = true;

    // pause and play the video controllers
    map.on('click', function () {
      playingVideo = !playingVideo;
      (playingVideo) ? map.getSource('video').play() : map.getSource('video').pause();
    });

    // popup helper with description
    new mapboxgl.Popup({closeOnClick: false, anchor: "right"})
        .setLngLat([-121.3066365825599, 45.683770463225905])
        .setHTML('<div class="popup-helper">Video is placed onto the top of the map location. Click on the video to pause. <br/><br/>' +
            'Location: Rowena Crest Viewpoint, Moiser, Oregon, USA.</div>')
        .addTo(map);
  }
}
</script>

<style>

</style>
