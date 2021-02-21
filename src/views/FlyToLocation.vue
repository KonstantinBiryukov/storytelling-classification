<template>
  <div id="fly-container">
    <div id="map"></div>
    <div id="cities">
      <div id="title"> {{ titleDescription }}</div>
      <div v-for="city in cities" :key="city.id">
        <button class="fly" @click="flyToCity(city)">
          {{ city.id + ". " + city.name + " (" + city.population + ")" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store/store";
import mapboxgl from "mapbox-gl";

export default {
  name: "FlyToLocation",
  data: function () {
    return {
      style: 'mapbox://styles/mapbox/streets-v11',
      titleDescription: "The 10 most populous cities of the United States (2020). Population is " +
          "approximate and represented in Millions. Click on city to fly to the location.",
      cities: [
        {"id": 1, name: "New York City, NY", population: 8.3, coordinates: [-74.0965682, 40.7051171]},
        {"id": 2, name: "Los Angeles, CA", population: 4.0, coordinates: [-118.3163488, 34.0620637]},
        {"id": 3, name: "Chicago, IL", population: 2.7, coordinates: [-87.7732203, 41.8605056]},
        {"id": 4, name: "Houston, TX", population: 2.3, coordinates: [-95.4402097, 29.7718743]},
        {"id": 5, name: "Phoenix, AZ", population: 1.7, coordinates: [-112.1212049, 33.4668295]},
        {"id": 6, name: "Philadelphia, PA", population: 1.6, coordinates: [-75.1969455, 39.9567428]},
        {"id": 7, name: "San Antonio, TX", population: 1.5, coordinates: [-98.5745669, 29.442912]},
        {"id": 8, name: "San Diego, CA", population: 1.4, coordinates: [-117.2048531, 32.7249195]},
        {"id": 9, name: "Dallas, TX", population: 1.3, coordinates: [-96.8809842, 32.7807718]},
        {"id": 10, name: "San Jose, CA", population: 1.0, coordinates: [-121.9182535, 37.3364788]},
      ]
    }
  },
  computed: {
    map() {
      return store.getters.createMap("map", 0, 0, 9,
          [-74.5, 40], this.style, 5, true
      );
    }
  },
  methods: {
    flyToCity(city) {
      console.log(this.map)
      this.map.flyTo({
        center: city.coordinates,
        zoom: 10,
        speed: 0.7,
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
      })
    }
  },
  mounted() {
    store.getters.pageReload();
    let map = this.map;
    map.on('load', function () {

      // popup helper with description
      new mapboxgl.Popup({closeOnClick: false, anchor: "center", maxWidth: "300px"})
          .setLngLat([-74.00007624098903, 40.049415406125])
          .setHTML('<div id="fly-helper" class="popup-helper">' +
              'The 10 most populous cities of the United States in 2020. ' +
              'Population is approximate and represented in Millions of people (in parenthesis). ' +
              'Click on a city in the left menu to fly to the specific location.</div>')
          .addTo(map);

    });
  }
}
</script>

<style scoped>
#fly-container {
  position: fixed;
  width: 99%;
  top: 20%;
  /*bottom: 1%;*/
  overflow: auto;
}

.fly, #title {
  display: block;
  position: relative;
  margin: 5px 5px;
  height: 40px;
  padding: 10px;
  border: none;
  border-radius: 3px;
  text-align: center;
  font-weight: bold;
}

.fly {
  width: 25%;
  font-size: 13px;
  color: black;
  background: #ee8a65;
  font-family: Consolas, monaco, monospace;
}

#title {
  width: 30%;
  height: 100%;
  font-size: 12px;
  text-align: center;
  color: darkblue;
  background: darkorange;
}

@media screen and (min-width: 1680px) {
  #title {
    font-size: 16px;
  }

  .fly {
    font-size: 18px;
    margin: 15px 15px;
    height: 50px;

  }
}

</style>