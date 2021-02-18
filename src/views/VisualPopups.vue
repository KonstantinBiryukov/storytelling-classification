<template>
  <div id="map"></div>
  <div class="places" v-for="place in storyLA.places" :key="place.id">
    <div v-bind:id="'marker-' + place.name"></div>
  </div>
</template>

<script>
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import store from "@/store/store";
import {storyLA} from "@/assets/LAstoryStore";

export default {
  name: "VisualPopups",
  data: function () {
    return {
      style: 'mapbox://styles/mapbox/streets-v11',
      storyLA: storyLA
    }
  },
  computed: {
    map() {
      return store.getters.createMap("map", 45, 25, 13,
          [-118.2592335, 34.0451156], this.style, 9, true
      );
    }
  },
  mounted() {
    let map = this.map;

    map.on('load', function () {
      // create the marker, set coordinates, sets a popup on this marker and add it the marker onto the map
      storyLA.places.forEach((place) => {
        new mapboxgl.Marker(document.getElementById("marker-" + place.name))
            .setLngLat(place.coordinates)
            .setPopup(new mapboxgl.Popup({offset: 25}).setHTML(place.popupHtml))
            .addTo(map)
      });

      // popup helper with description
      new mapboxgl.Popup({closeOnClick: false, anchor: "right"})
          .setLngLat([-118.2662335, 34.0651156])
          .setHTML('<div id="polygons-helper" class="popup-helper">Famous buildings in <span id="downtown-la-title">Downtown Los Angeles, USA.</span> ' +
              'A marker represents the image of the building. <br>' +
              'Click on the marker to take a look at the name of the building and the description.</div>')
          .addTo(map);
    });
  }
}
</script>

<style>
#marker-disney {
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

#marker-cityhall {
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/2/2f/Los_Angeles_City_Hall_2013.jpg');
  background-size: cover;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  cursor: pointer;
}

#marker-microsoft {
  background-image: url('https://s3-us-west-1.amazonaws.com/goldenvoice-com/wp-content/uploads/2015/10/26182500/microsoft5_678.jpg');
  background-size: cover;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  cursor: pointer;
}

#marker-cathedral {
  background-image: url('https://files.structurae.net/files/350high/1480/our_lady_angels04.jpg');
  background-size: cover;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  cursor: pointer;
}

.mapboxgl-popup {
  max-width: 200px;
}

.popup-image {
  width: 200px;
}

span.popup-title {
  font-weight: bold;
  font-size: 18px !important;
}

#downtown-la-title {
  color: red;
}

.mapboxgl-popup-content span {
  font-size: 13px;

}

@media screen and (min-width: 1680px) {
  .mapboxgl-popup-content span {
        font-size: 15px;
  }

  .mapboxgl-marker.mapboxgl-marker-anchor-center {
    width: 80px !important;
    height: 80px !important;
  }
}

@media screen and (min-width: 1920px) {
  .mapboxgl-popup-content span {
    font-size: 17px;
  }

  .mapboxgl-marker.mapboxgl-marker-anchor-center {
    width: 100px !important;
    height: 100px !important;
  }
}

</style>