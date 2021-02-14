<template>
  <div id="map"></div>
  <div id="marker-disney"></div>
  <div id="marker-broad"></div>
  <div id="marker-usbank"></div>
  <div id="marker-station"></div>
  <div id="marker-bradbury"></div>
<!--  <div class="marker" v-for="location in locations" :key="location.id">-->
<!--    <div id="'marker-' + location.name"></div>-->
<!--  </div>-->
</template>

<script>
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import store from "@/store/store";

export default {
  name: "VisualPopups",
  data: function () {
    return {
      style: 'mapbox://styles/mapbox/streets-v11',
      locations: [
        {"id": 1, name: "disney", text: "Walt Disney Concert Hall"},
        {"id": 2, name: "broad", text: "Broad Museum"},
      ]
    }
  },
  computed: {
    map() {
      return store.getters.createMap("map", 45, 25, 13,
          [-118.2592335, 34.0451156], this.style, 9, true
      );  // map, 40, 55, 15.5    [-77.03997455029825, 38.90857732121413]

    }
  },
  mounted() {
    let map = this.map;
    let disneyCoord = [-118.24988946244828, 34.055455864645864];
    let broadCoord = [-118.25063315715954, 34.05440489632599];
    let towerCoord = [-118.25440582456434, 34.05106600482056];
    let stationCoord = [-118.23615334059522, 34.055807390791905];
    let bradburyCoord = [-118.24791556567747, 34.05057280587245];

    map.on('load', function () {
      let disneyPopup = new mapboxgl.Popup({offset: 25}).setText(
          'Walt Disney Concert Hall.'
      );

      let broadPopup = new mapboxgl.Popup({offset: 25}).setText(
          'Broad Museum.'
      );

      let towerPopup = new mapboxgl.Popup({offset: 25}).setText(
          'US Bank Tower.'
      );

      let stationPopup = new mapboxgl.Popup({offset: 25}).setText(
          'Union Station.'
      );

      let bradburyPopup = new mapboxgl.Popup({offset: 25}).setText(
          'Bradbury Building.'
      );


// create the marker
      new mapboxgl.Marker(document.getElementById("marker-disney"))
          .setLngLat(disneyCoord)
          .setPopup(disneyPopup) // sets a popup on this marker
          .addTo(map);

      new mapboxgl.Marker(document.getElementById("marker-broad"))
          .setLngLat(broadCoord)
          .setPopup(broadPopup) // sets a popup on this marker
          .addTo(map);

      new mapboxgl.Marker(document.getElementById("marker-usbank"))
          .setLngLat(towerCoord)
          .setPopup(towerPopup) // sets a popup on this marker
          .addTo(map);

      new mapboxgl.Marker(document.getElementById("marker-usbank"))
          .setLngLat(towerCoord)
          .setPopup(towerPopup) // sets a popup on this marker
          .addTo(map);

      new mapboxgl.Marker(document.getElementById("marker-station"))
          .setLngLat(stationCoord)
          .setPopup(stationPopup) // sets a popup on this marker
          .addTo(map);

      new mapboxgl.Marker(document.getElementById("marker-bradbury"))
          .setLngLat(bradburyCoord)
          .setPopup(bradburyPopup) // sets a popup on this marker
          .addTo(map);
    });
  }
}
</script>

<style >
.marker #marker-disney {
  background-image: url('https://offloadmedia.feverup.com/secretlosangeles.com/wp-content/uploads/2020/01/22094750/shutterstock_426455206.jpg');
  background-size: cover;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
}

#marker-broad {
  background-image: url('https://www.thebroad.org/sites/default/files/styles/broad_program_header/public/images/Large-2.jpg?itok=4f-IqLss');
  background-size: cover;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
}

#marker-usbank {
  background-image: url('https://cdn.vox-cdn.com/thumbor/YxTcS0zAgjyLd5znu46ITwMi-XA=/0x0:2048x1202/1820x1213/filters:focal(861x438:1187x764):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/62886709/us_bank_tower_sterling_davis.0.jpg');
  background-size: cover;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  cursor: pointer;
}

#marker-station {
  background-image: url('https://www.greatamericanstations.com/wp-content/uploads/2016/09/Los-Angeles-Moser-2018.jpg');
  background-size: cover;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  cursor: pointer;
}

#marker-bradbury {
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bradbury_Building%2C_interior%2C_ironwork.jpg/305px-Bradbury_Building%2C_interior%2C_ironwork.jpg');
  background-size: cover;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  cursor: pointer;
}


.mapboxgl-popup {
  max-width: 200px;
}

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