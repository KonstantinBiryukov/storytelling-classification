<template>
  <div id="map"></div>

  <div class="map-overlay-container">
    <div class="map-overlay">
      <h2 id="location-title"></h2>
      <p id="location-description"></p>
      <small
      >Text credit:
        <a target="_blank" href="http://www.nycgo.com/neighborhoods"
        >nycgo.com</a
        ></small
      >
    </div>
  </div>
</template>

<script>
import store from "@/store/store";

export default {
  name: "Slideshow",
  data: function () {
    return {
      style: 'mapbox://styles/mapbox/streets-v11',
    }
  },
  computed: {
    map() {
      return store.getters.createMap("map", 0, 0, 16,
          [-122.39217274661704, 37.787049476763244, ], this.style, 9, false
      );

    }
  },
  mounted() {
    let map = this.map;
    var title = document.getElementById('location-title');
    var description = document.getElementById('location-description');

    var locations = [
      {
        'id': '2',
        'title': 'The Bronx',
        'description':
            "This is where hip-hop was born, where the Yankees became a dynasty and where you can find New York City's leading zoo and botanical garden.",
        'camera': {
          center: [ -122.39334356061455, 37.788206107980976
          ],
          zoom: 12.21,
          pitch: 0
        }
      },
      {
        'id': '3',
        'title': 'Brooklyn',
        'description':
            "No matter how hip it looks on TV, NYC's most populous borough is best experienced in person. Read on to find out about live music, Prospect Park, Nets basketball and more.",
        'camera': {
          center: [-122.40695989978401, 37.79381516863956],
          bearing: 0,
          zoom: 11.68
        }
      },
      {
        'id': '1',
        'title': 'Manhattan',
        'description':
            'Even if you think you know Manhattan—its world-class museums, fine dining and unforgettable views—the borough always has something new and exciting in store.',
        'camera': {
          center: [-74.007, 40.7437],
          bearing: 25.3,
          zoom: 11.5
        }
      },
      {
        'id': '4',
        'title': 'Queens',
        'description':
            "Taste food from around the globe, watch Mets baseball and US Open tennis, see cutting-edge art and more in one of the world's most diverse places.",
        'camera': {
          center: [-73.8432, 40.6923],
          bearing: 36,
          zoom: 11.37
        }
      },
      {
        'id': '5',
        'title': 'Staten Island',
        'description':
            'Take a free ferry ride to an island getaway filled with historic architecture, stunning views, gardens and many family-friendly attractions.',
        'camera': {
          center: [-74.1991, 40.5441],
          bearing: 28.4,
          zoom: 11.64
        }
      },
      {
        'title': 'Boroughs of new york',
        'description':
            'New York City is made up of five boroughs: the Bronx, Brooklyn, Manhattan, Queens and Staten Island. Each one has enough attractions—and enough personality—to be a city all its own.',
        'camera': {
          center: [-74.0315, 40.6989],
          zoom: 9.68,
          bearing: 0,
          pitch: 0
        }
      }
    ];

    function highlightBorough(code) {
// Only show the polygon feature that cooresponds to `borocode` in the data
      map.setFilter('highlight', ['==', 'borocode', code]);
    }

    function playback(index) {
      title.textContent = locations[index].title;
      description.textContent = locations[index].description;

      highlightBorough(locations[index].id ? locations[index].id : '');

// Animate the map position based on camera properties
      map.flyTo(locations[index].camera);

      map.once('moveend', function () {
// Duration the slide is on screen after interaction
        window.setTimeout(function () {
// Increment index
          index = index + 1 === locations.length ? 0 : index + 1;
          playback(index);
        }, 3000); // After callback, show the location for 3 seconds.
      });
    }

// Display the last title/description first
    title.textContent = locations[locations.length - 1].title;
    description.textContent = locations[locations.length - 1].description;

    map.on('load', function () {
      map.addSource('boroughs', {
        'type': 'vector',
        // 'url': 'mapbox://mapbox.8ibmsn6u'
        'url': 'https://gist.githubusercontent.com/cdolek/d08cac2fa3f6338d84ea/raw/ebe3d2a4eda405775a860d251974e1f08cbe4f48/SanFrancisco.Neighborhoods.json'
      });
      map.addLayer(
          {
            'id': 'highlight',
            'type': 'fill',
            'source': 'boroughs',
            'source-layer': 'original',
            'paint': {
              'fill-color': '#fd6b50',
              'fill-opacity': 0.25
            },
            'filter': ['==', 'borocode', '']
          },
          'settlement-subdivision-label'
      ); // Place polygon under the neighborhood labels.

// Start the playback animation for each borough
      playback(0);
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

.map-overlay-container {
  position: absolute;
  width: 25%;
  top: 20%;
  left: 0;
  padding: 10px;
  z-index: 1;
}

.map-overlay {
  font: 18px/22px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  background-color: #fff;
  border-radius: 3px;
  padding: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.map-overlay h2,
.map-overlay p {
  margin: 0 0 10px;
}

</style>