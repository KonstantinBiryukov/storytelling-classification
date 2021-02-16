<template>
  <div id="map"></div>

  <div class="map-overlay-container">
    <div class="map-overlay">
      <h2 id="location-title"></h2>
      <p id="location-description"></p>
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
      return store.getters.createMap("map", 0, 0, 0,
          [-84.0735768959837, 44.47279664463965], this.style, 5, false
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
        'title': 'Lake Superior',
        'description':
            "The largest of the Great Lakes of North America, the world's largest freshwater lake by surface area, and the third-largest freshwater lake by volume.",
        'camera': {
          center: [-87.65298432298495, 47.869318744146035],
          zoom: 6,
          pitch: 0
        }
      },
      {
        'id': '3',
        'title': 'Lake Michigan',
        'description':
            "One of the five Great Lakes of North America. It is the second-largest of the Great Lakes by volume and the third-largest by surface area",
        'camera': {
          center: [-86.97567365378887, 44.10015628998541],
          bearing: 0,
          zoom: 6
        }
      },
      {
        'id': '4',
        'title': 'Lake Huron',
        'description':
            'By surface area, Lake Huron is the second-largest of the Great Lakes. Hydrologically, it comprises the easterly portion of Lake Michigan–Huron, having the same surface elevation as its westerly counterpart.',
        'camera': {
          center: [-82.36802044844158, 44.85269068766738],
          bearing: 25.3,
          zoom: 6
        }
      },
      {
        'id': '5',
        'title': 'Lake Erie',
        'description':
            "The fourth-largest lake (by surface area) of the five Great Lakes in North America and the eleventh-largest globally. It is the southernmost, shallowest, and smallest by volume of the Great Lakes.",
        'camera': {
          center: [-81.26296296200259, 42.25019652216405],
          bearing: 36,
          zoom: 6
        }
      },
      {
        'id': '6',
        'title': 'Lake Ontario',
        'description':
            'The easternmost of the Great Lakes and the smallest in surface area, although it exceeds Lake Erie in volume. It is the 13th largest lake in the world. It is the only Great Lake not to border the state of Michigan.',
        'camera': {
          center: [-77.92353164015204, 43.68261986853817],
          bearing: 28.4,
          zoom: 6
        }
      },
      {
        'title': 'The Great Lakes',
        'description':
            'The Great Lakes, also called the Great Lakes of North America, are a series of large interconnected freshwater lakes in the upper mid-east region of North America that connect to the Atlantic Ocean via the Saint Lawrence River. They are lakes Superior, Michigan, Huron, Erie, and Ontario and are in general on or near the Canada–United States border. Hydrologically, there are four lakes, because lakes Michigan and Huron join at the Straits of Mackinac.',
        'camera': {
          center: [-84.0735768959837, 44.47279664463965],
          zoom: 3,
          bearing: 0,
          pitch: 0
        }
      }
    ];

    function highlightBorough(code) {
      // Only show the polygon feature that cooresponds to `borocode` in the data
      map.setFilter('highlight', ['==', 'id', code]);
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
        }, 5000); // After callback, show the location for 3 seconds.
      });
    }

    // Display the last title/description first
    title.textContent = locations[locations.length - 1].title;
    description.textContent = locations[locations.length - 1].description;

    map.on('load', function () {
      // Start the playback animation for each lake
      playback(0);
    });

  }
}
</script>

<style scoped>
.map-overlay-container {
  position: absolute;
  width: 25%;
  top: 20%;
  left: 0;
  padding: 10px;
  z-index: 1;
}

.map-overlay {
  font: 18px/22px Georgia, Times, Times New Roman, serif;
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