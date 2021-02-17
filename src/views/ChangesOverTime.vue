<template>
  <div class="change-over-time-container">
    <div id="map"></div>

    <div class="map-overlay top">
      <div class="map-overlay-inner">
        <h2>Significant earthquakes in 2021</h2>
        <label id="month"></label>
        <input id="slider" type="range" min="0" max="11" step="1" value="0"/>
      </div>
      <div class="map-overlay-inner">
        <div id="legend" class="legend">
          <div class="bar"></div>
          <div>Magnitude (m).
            <div class="magnitude-description">Minimal magnitude is 6. [Richter magnitude scale]</div>
            <div class="magnitude-description">Data source: <a href="https://earthquake.usgs.gov/" target="_blank">https://earthquake.usgs.gov/</a>
            </div>
          </div>
        </div>
      </div>
      <div class="map-overlay-inner">
        Top 5 earthquakes by magnitude in <span id="year-2020">2020</span>:
        <table class="top-earthquakes-table">
          <tr>
            <th>Rank</th>
            <th>Magnitude</th>
            <th>Death toll</th>
            <th>Location</th>
            <th>Date</th>
          </tr>
          <tr>
            <td>1</td>
            <td>7.8</td>
            <td>0</td>
            <td>United States, Alaska offshore</td>
            <td>July 22</td>
          </tr>
          <tr>
            <td>2</td>
            <td>7.7</td>
            <td>0</td>
            <td>Jamaica, Hanover offshore</td>
            <td>January 28</td>
          </tr>
          <tr>
            <td>3</td>
            <td>7.6</td>
            <td>0</td>
            <td>United States, Alaska offshore</td>
            <td>October 19</td>
          </tr>
          <tr>
            <td>4</td>
            <td>7.5</td>
            <td>0</td>
            <td>Russia, Kuril Islands offshore</td>
            <td>March 25</td>
          </tr>
          <tr>
            <td>5</td>
            <td>7.4</td>
            <td>10</td>
            <td>Mexico, Oaxaca</td>
            <td>June 23</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import * as d3 from 'd3';
import store from "@/store/store";

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
      return store.getters.createMap("map", 0, 0, 0.5,
          [31.4606, 20.7927], this.style, 0.5, true
      );
    }
  },
  mounted() {
    let map = this.map;
    let mapboxgl = store.state.mapboxgl;
    map.addControl(new mapboxgl.NavigationControl());
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    function filterBy(month) {
      let filters = ['==', 'month', month];
      map.setFilter('earthquake-circles', filters);
      map.setFilter('earthquake-labels', filters);

      // Set the label to the month
      document.getElementById('month').textContent = months[month];
    }

    map.on('load', function () {
      // Data: http://earthquake.usgs.gov/
      // Query for significant earthquakes in 2020 : (geojson with start- and end-time, and minmagnitude)
      // http://earthquake.usgs.gov/fdsnws/event/1/query
      //    ?format=geojson
      //    &starttime=2020-01-01
      //    &endtime=2020-12-31
      //    &minmagnitude=6'

      // d3.js library is used to help making the ajax request
      d3.json(
          'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-12-31&minmagnitude=6',
          function (err, data) {
            if (err) throw err;

            // Create a month property value based on time used for filter.
            data.features = data.features.map(function (d) {
              d.properties.month = new Date(d.properties.time).getMonth();
              return d;
            });

            map.addSource('earthquakes', {
              'type': 'geojson',
              data: data
            });

            map.addLayer({
              'id': 'earthquake-circles',
              'type': 'circle',
              'source': 'earthquakes',
              'paint': {
                'circle-color': [
                  'interpolate',
                  ['linear'],
                  ['get', 'mag'],
                  6,
                  '#FCA107',
                  8,
                  '#7F3121'
                ],
                'circle-opacity': 0.75,
                'circle-radius': [
                  'interpolate',
                  ['linear'],
                  ['get', 'mag'],
                  6,
                  20,
                  8,
                  40
                ]
              }
            });

            map.addLayer({
              'id': 'earthquake-labels',
              'type': 'symbol',
              'source': 'earthquakes',
              'layout': {
                'text-field': [
                  'concat',
                  ['to-string', ['get', 'mag']],
                  'm'
                ],
                'text-font': [
                  'Open Sans Bold',
                  'Arial Unicode MS Bold'
                ],
                'text-size': 13
              },
              'paint': {
                'text-color': 'rgba(0,0,0,0.5)'
              }
            });

            // Set filter to the first month of the year; 0 = January
            filterBy(0);

            map.on('click', 'earthquake-circles', function (e) {
              let coordinates = e.features[0].geometry.coordinates.slice();
              let link = e.features[0].properties.url;
              let description = '<a href="' + link + '" target="blank">' + e.features[0].properties.title + '</a>';

              // Ensure that if the map is zoomed out such that multiple
              // copies of the feature are visible, the popup appears over the copy being pointed to.
              while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
              }
              new mapboxgl.Popup()
                  .setLngLat(coordinates)
                  .setHTML(description)
                  .addTo(map);

            });

            document
                .getElementById('slider')
                .addEventListener('input', function (e) {
                  let month = parseInt(e.target.value, 10);
                  filterBy(month);
                });
          }
      );
      // popup helper with description
      new mapboxgl.Popup({closeOnClick: false, anchor: "center"})
          .setLngLat([-58.918112188335495, 60.19160056082046])
          .setHTML('<div id="time-changes-helper" class="popup-helper">' +
              'The map lets the user to take a look to the locations of significant earthquakes for each month of 2021 ' +
              'and how those earthquakes are spread over the world. ' +
              'Use a slider on the top right corner to choose a specific month. ' +
              'Click on the circle to find out more information about the earthquake. <br>' +
              'The map uses real-time data.' +
              '</div>')
          .addTo(map);

    });
  }
}
</script>

<style>
#time-changes-helper {
 font-size: 10px;
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
.map-overlay {
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  position: absolute;
  width: 25%;
  top: 20%;
  left: 0;
  padding: 10px;
}

.map-overlay .map-overlay-inner {
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 5px;
  border: orange 5px ridge;
}

.map-overlay h2 {
  line-height: 24px;
  display: block;
  margin: 0 0 10px;
}

.map-overlay .legend .bar {
  height: 10px;
  width: 100%;
  background: linear-gradient(to right, #fca107, #7f3121);
}

.map-overlay input {
  background-color: transparent;
  display: inline-block;
  width: 100%;
  position: relative;
  margin: 0;
  cursor: ew-resize;
}

.magnitude-description {
  font-size: 10px;
  color: darkblue;
}

.top-earthquakes-table {
  border-collapse: collapse;
  border: 1px solid black;
}

.top-earthquakes-table td {
  border-top: 1px solid black;
}

.top-earthquakes-table th {
  border-right: 1px solid black;
}

.map-overlay-bottom {
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 1px;
}

.map-overlay-bottom p {
  margin: 0;
  padding: 0;
}

#year-2020 {
  font-weight: bold;
  font-size: 13px;
  text-decoration: underline;
}

@media screen and (max-width: 1050px) {
  .map-overlay {
    width: 30%;
    font-size: 10px;
  }
}
</style>