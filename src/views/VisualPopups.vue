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

<style lang="scss">
$imageRoutePath: "https://raw.githubusercontent.com/KonstantinBiryukov/KonstantinBiryukov.github.io/master/storytellingmaps-media/popup-images-LAstory/";

#marker-disney {
  background-image: url($imageRoutePath + 'walt-disney-hall.jpg');
  background-size: cover;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
}

#marker-broad {
  background-image: url($imageRoutePath + 'broad-museum.jpg');
  background-size: cover;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
}

#marker-usbank {
  background-image: url($imageRoutePath + 'us-bank.jpg');
  background-size: cover;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  cursor: pointer;
}

#marker-station {
  background-image: url($imageRoutePath + 'union-station.jpg');
  background-size: cover;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  cursor: pointer;
}

#marker-bradbury {
  background-image: url($imageRoutePath + 'bradbury-building.jpg');
  background-size: cover;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  cursor: pointer;
}

#marker-cityhall {
  background-image: url($imageRoutePath + 'city-hall.jpg');
  background-size: cover;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  cursor: pointer;
}

#marker-microsoft {
  background-image: url($imageRoutePath + 'microsoft-theater.jpg');
  background-size: cover;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  cursor: pointer;
}

#marker-cathedral {
  background-image: url($imageRoutePath + 'lady-angeles.jpg');
  background-size: cover;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  cursor: pointer;
}

#marker-bookstore {
  background-image: url($imageRoutePath + 'last-bookstore.jpg');
  background-size: cover;
  width: 60px;
  height: 60px;
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

  .popup-image {
    width: 300px;
  }

  .mapboxgl-popup {
    max-width: 350px !important;
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

  .popup-image {
    width: 350px;
  }

  .mapboxgl-popup {
    max-width: 400px !important;
  }
}

</style>