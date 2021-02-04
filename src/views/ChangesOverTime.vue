<template>
  <div class="change-over-time-container">
    <div id="map">
<!--      <img id="map-stcloud" :src="require('../assets/StCloudMap.png')"/>-->
    </div>
    <div class="map-overlay top">
      <div class="map-overlay-inner">
        <label>Layer opacity: <span id="slider-value">100%</span></label>
        <input
            id="slider"
            type="range"
            min="0"
            max="100"
            step="0"
            value="100"
        />
      </div>
    </div>
  </div>
</template>


<script>
import store from "@/store/store";
// import image from "src/assets/StCloudMap.png";

export default {
  name: "ChangeOverTime",
  data: function () {
    return {
      style: "mapbox://styles/mapbox/light-v10",
      // image: image
    }
  },
  computed: {
    map() {
      return store.getters.createMap("map", 0, 0, 9.5,
          [-87.6321, 41.8362], this.style, 9.5
      );
    }
  },
  mounted() {
    let map = this.map;
    let slider = document.getElementById('slider');
    let sliderValue = document.getElementById('slider-value');

    map.on('load', function () {
      map.addSource('chicago', {
        'type': 'raster',
        // 'url': 'mapbox://mapbox.u8yyzaor',
        'url' : 'public/routes.js'
      });

      map.addLayer({
        'id': 'chicago',
        'source': 'chicago',
        'type': 'raster'
      });

      slider.addEventListener('input', function (e) {
        // Adjust the layers opacity. layer here is arbitrary - this could
        // be another layer name found in your style or a custom layer
        // added on the fly using `addSource`.
        map.setPaintProperty(
            'chicago',
            // 'map-stcloud',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );

        // Value indicator
        sliderValue.textContent = e.target.value + '%';
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

.map-overlay {
  font: bold 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  /*position: absolute;*/
  position: fixed;
  width: 25%;
  /*top: 0;*/
  top: 20%;
  bottom: 1%;
  left: 0;
  padding: 10px;
}

.map-overlay .map-overlay-inner {
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 10px;
}

.map-overlay label {
  display: block;
  margin: 0 0 10px;
}

.map-overlay input {
  background-color: transparent;
  display: inline-block;
  width: 100%;
  position: relative;
  margin: 0;
  cursor: ew-resize;
}

#map-stcloud {
  position: relative;
  width: 50%;
  height: 100%;
  z-index: 1;
}
</style>