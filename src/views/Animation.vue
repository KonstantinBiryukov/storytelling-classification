<template>
  <div id="map"></div>
</template>

<script>
import store from "@/store/store";

export default {
  name: "Animation",
  data: function () {
    return {
      style: 'mapbox://styles/mapbox/satellite-v9',
    }
  },
  computed: {
    map() {
      return store.getters.createMap("map", -10.2, 20, 11.53,
          [-122.15860580189565, 42.91772239477004], this.style, 5, false
      );
    }
  },
  mounted() {
    let map = this.map;
    let mapboxgl = store.store.state.mapboxgl;
    // add terrain and sky layers once the style has loaded
    map.on('load', function () {
      map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
      });
      map.setTerrain({'source': 'mapbox-dem', 'exaggeration': 1.5});

      map.addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 90.0],
          'sky-atmosphere-sun-intensity': 15
        }
      });
    });

    function updateCameraPosition(position, altitude, target) {
      let camera = map.getFreeCameraOptions();

      camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
          position,
          altitude
      );

      camera.lookAtPoint(target);
      map.setFreeCameraOptions(camera);
    }

    let animationIndex = 0;
    let animationTime = 0.0;

    // wait for the terrain and sky to load before starting animations
    map.on('idle', function () {
      // linearly interpolate between two altitudes/positions based on time
      let lerp = function (a, b, t) {
        if (Array.isArray(a) && Array.isArray(b)) {
          let result = [];
          for (let i = 0; i < Math.min(a.length, b.length); i++)
            result[i] = a[i] * (1.0 - t) + b[i] * t;
          return result;
        } else {
          return a * (1.0 - t) + b * t;
        }
      };

      let animations = [
        {
          duration: 130.0,
          animate: function (phase) {
            let start = [-122.1591817072966, 42.889970507106916];
            let end = [-122.14671429878624, 42.94240583812641];

            let alt = [13000.0, 3500.0];

            // interpolate camera position while keeping focus on a target lat/lng
            let position = lerp(start, end, phase);
            let altitude = lerp(alt[0], alt[1], phase);
            let target = [-122.14597690976275, 42.939151624236146];

            updateCameraPosition(position, altitude, target);
          }
        },
        {
          duration: 60,
          animate: function (phase) {
            let start = [-122.14671429878624, 42.94240583812641];
            let end = [-122.14187181333054, 42.96081404622487];

            let alt = [3500.0, 16000.0];
            let target1 = [-122.14597690976275, 42.939151624236146];
            let target2 = [-122.15051079336699, 42.93831698893578];

            // interpolate both the camera position and target
            let position = lerp(start, end, phase);
            let altitude = lerp(alt[0], alt[1], phase);
            let target = lerp(target1, target2, phase);

            updateCameraPosition(position, altitude, target);
          }
        },

      ];

      let lastTime = 0.0;

      function frame(time) {
        animationIndex %= animations.length;
        let current = animations[animationIndex];

        if (animationTime < current.duration) {
          current.animate(animationTime / current.duration);
        }

        // allow requestAnimationFrame to control the speed of the animation
        animationTime += 1 / (time - lastTime);
        lastTime = time;

        if (animationTime > current.duration) {
          animationIndex++;
          animationTime = 0.0;
        }

        window.requestAnimationFrame(frame);
      }

      window.requestAnimationFrame(frame);
    });

    // popup helper with description
    new mapboxgl.Popup({closeOnClick: false, anchor: "center"})
        .setLngLat([-122.20597690976275, 42.939651624236146])
        .setHTML('<div id="animation-helper" class="popup-helper">Cinematographic animation with 3D terrain.<br/><br/>' +
            'Location: Crater Lake, Wizard Island, Oregon, USA.</div>')
        .addTo(map);
  }
}

</script>


<style>
#animation-helper {
 margin: 0;
}
</style>
