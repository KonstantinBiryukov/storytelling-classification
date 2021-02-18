<template>
  <div class="sound-control-container">
    <div id="map"></div>
  </div>
</template>

<script>
import store from "@/store/store";
import mapboxgl from "mapbox-gl";

export default {
  name: "ControlBySound",
  data: function () {
    return {
      style: "mapbox://styles/examples/cj68bstx01a3r2rndlud0pwpv"
    }
  },
  computed: {
    map() {
      return store.getters.createMap("map", 0, 55, 15,
          [-74.00649562332922, 40.70811328605049], this.style, 12
      );
    }
  },
  mounted() {
    let map = this.map;

    this.map.flyTo({
      "antialias": true
    });


    map.on('load', function () {
      const maxHeight = 200;
      let bins = 16;
      let binWidth = maxHeight / bins;

      // Divide the buildings into 16 bins based on their true height, using a layer filter.
      for (let i = 0; i < bins; i++) {
        map.addLayer({
          'id': '3d-buildings-' + i,
          'source': 'composite',
          'source-layer': 'building',
          'filter': [
            'all',
            ['==', 'extrude', 'true'],
            ['>', 'height', i * binWidth],
            ['<=', 'height', (i + 1) * binWidth]
          ],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height-transition': {
              duration: 0,
              delay: 0
            },
            'fill-extrusion-opacity': 0.6
          }
        });
      }

      // Older browsers might not implement mediaDevices at all, so we set an empty object first
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }

      // Some browsers partially implement mediaDevices. We can't just assign an object
      // with getUserMedia as it would overwrite existing properties.
      // Here, we will just add the getUserMedia property if it's missing.
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          // First hold of the legacy getUserMedia, if present
          let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

          // Some browsers just don't implement it - return a rejected promise with an error
          // to keep a consistent interface
          if (!getUserMedia) {
            return Promise.reject(
                new Error(
                    'getUserMedia is not implemented in this browser'
                )
            );
          }

          // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }

      navigator.mediaDevices
          .getUserMedia({audio: true})
          .then(function (stream) {
            // Set up a Web Audio AudioContext and AnalyzerNode, configured to return the
            // same number of bins of audio frequency data.
            let audioCtx = new (window.AudioContext ||
                window.webkitAudioContext)();

            let analyser = audioCtx.createAnalyser();
            analyser.minDecibels = -90;
            analyser.maxDecibels = -10;
            analyser.smoothingTimeConstant = 0.85;

            let source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);

            analyser.fftSize = bins * 2;

            let dataArray = new Uint8Array(bins);

            function draw(now) {
              analyser.getByteFrequencyData(dataArray);

              // Use that data to drive updates to the fill-extrusion-height property.
              let avg = 0;
              for (let i = 0; i < bins; i++) {
                avg += dataArray[i];
                map.setPaintProperty(
                    '3d-buildings-' + i,
                    'fill-extrusion-height',
                    10 + 4 * i + dataArray[i]
                );
              }
              avg /= bins;

              // Animate the map bearing and light color over time, and make the light more
              // intense when the audio is louder.
              map.setBearing(now / 500);
              map.setLight({
                color:
                    'hsl(' +
                    ((now / 100) % 360) +
                    ',' +
                    Math.min(50 + avg / 4, 100) +
                    '%,50%)',
                intensity: Math.min(1, (avg / 256) * 10)
              });

              requestAnimationFrame(draw);
            }

            requestAnimationFrame(draw);
          })
          .catch(function (err) {
            console.log('The following gUM error occured: ' + err);
          });
    });

    // fullScreen mode
    map.addControl(new mapboxgl.FullscreenControl());

    // popup helper with description
    new mapboxgl.Popup({closeOnClick: false, maxWidth: "340px"})
        .setLngLat([-74.00228691746983, 40.7028790176044])
        .setHTML('<div id="sound-helper" class="popup-helper">The heights of the buildings are controlled by the user sound. ' +
            'The louder the sound that user makes the faster building “moves” changing their heights. ' +
            '<div id="mic-permission">Permission to access the microphone is required.</div>' +
            '<br/>' +
            'Location: New York City, Manhattan, USA.</div>')
        .addTo(map);
  }
}
</script>

<style>
#sound-helper {
  font-size: 11px;
  margin: 0;
}

#mic-permission {
  color: red;
  font-weight: bold;
  text-decoration: underline;
}

@media screen and (min-width: 1680px) {
  #sound-helper {
    font-size: 16px;
  }
}
</style>
