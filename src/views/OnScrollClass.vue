<template>
  <div id="onscroll-class">
    <div id="map"></div>
    <div id="features">
      <section id="st-cloud" class="active">
        <h3>Saint Cloud Historic Districts, Minnesota</h3>
        <p>
          Local historic districts are a concentration of older buildings,
          structures, sites, and spaces that tell a story about the history,
          culture, and community of the city. The City of St. Cloud currently
          has 4 local historic districts that have been officially designated by
          the City Council as significant.
        </p>
      </section>
      <section id="barden">
        <h3>Barden Park Historic District</h3>
        <p>
          The Barden Park Historic District contains St. Cloud’s oldest city park, as well as residential properties in
          one of the city’s oldest neighborhoods. It is located entirely in St. Cloud’s historic Lower Town, an area
          devoted to residential development.
          The Barden Park Historic District is significant in St. Cloud because it contains a visual inventory of the
          residential architectural styles constructed in the city from the 1880s through 1945. The district contains
          examples of styles that are rare or well preserved and not found in other areas of the city. Both upper and
          middle class residences are represented in the district bordering the city’s oldest park.
        </p>
        <img class="section-image" src="../assets/onscroll-photos/barden-park.png" alt="barden-park">
      </section>
      <section id="pantown">
        <h3>Pantown Neighborhood Historic District</h3>
        <p>
          The Pantown Neighborhood Historic District encompasses the heart of one of St. Cloud’s most unique historic
          residential neighborhoods. In 1917, Samuel Pandolfo established this neighborhood to house employees of the
          Pan Motor Company, which was located on 33rd Avenue North and 8th Street North.
          Within the local district there are 48 buildings, which include 26 single family residences, and is
          irregularly bounded by 8th Street North, 33rd Avenue North, 9th Street North, and 29th Avenue North. The
          district encompasses the most intact and well-preserved company housing units constructed for employees of the
          ill-fated Pan Motor Company. This type of company-built housing is a rarity in Minnesota.
        </p>
        <img class="section-image" src="../assets/onscroll-photos/pantown.png" alt="pantown">
      </section>
      <section id="southside">
        <h3>Southside Neighborhood Historic District</h3>
        <p>
          The Southside Neighborhood Historic District is one of St. Cloud’s oldest residential neighborhoods, Middle
          Town which was platted in 1854 by John L. Wilson. Streets in Middle Town were aligned parallel to the
          Mississippi River and extended south to the historic ravine that once ran all the way from Lake George to the
          river. South of the ravine, the community of Lower Town was platted on a grid oriented to the points of the
          compass rather than the river.
          Within the district are nine blocks of primarily residential development, with over 65 buildings. Although
          predominantly single-family residential in land use, there are several apartment buildings, two churches, and
          a number of buildings used as housing by St. Cloud State University students.
        </p>
        <img class="section-image" src="../assets/onscroll-photos/southside.png" alt="southside">
      </section>
      <section id="commercial">
        <h3>St. Cloud Commercial Historic District</h3>
        <p>
          The St. Cloud Commercial Historic District was listed on the National Register of Historic Places in 1998 and
          was locally designated in 2002. The Commercial Historic District has a total of 64 properties.
          St. Cloud began as three communities in the early 1850s. Upper Town, named Acadia, was founded by Tennessee
          General Sylvanus B. Lowry, and was settled primarily by southerners escaping the summer heat of their home
          states. Middle Town, named St. Cloud, was founded by John L. Wilson and settled by German immigrants mostly
          from Indiana. Lower Town, named St. Cloud City, was platted as a town site by George Fuller Brott, a developer
          from New York, and settled by Yankee businessmen. By March 1856, the three towns incorporated into the single
          town of St. Cloud.
        </p>
        <img class="section-image" src="../assets/onscroll-photos/commercial.png" alt="commercial">
        <div>
          <small id="citation">
            Information about St.Cloud was taken from
            <a href="https://ci.stcloud.mn.us/628/Local-Historic-Districts">St.Cloud official website</a>
          </small>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import store from "../store/store"

export default {
  name: "OnScrollClass",
  data: function () {
    return {
      style: "mapbox://styles/mapbox/streets-v11"
    }
  },
  computed: {
    map() {
      return store.getters.createMap("map", 27, 45, 0, [-94.1666716, 45.5558578], this.style);
    }
  },
  mounted() {
    // set up bounds and center
    const center = [-94.1666716, 45.5558578];
    const zoom = 12;
    let map = this.map;

    this.map.flyTo({
      'center': center,
      'zoom': zoom
    });

    var chapters = {
      'st-cloud': {
        bearing: 27,
        center: [-94.1666716, 45.5558578],
        zoom: 11,
        pitch: 20
      },
      'barden': {
        duration: 2000,
        center: [-94.1545184, 45.5522795],
        bearing: 150,
        zoom: 16,
        pitch: 0
      },
      'pantown': {
        bearing: 5,
        center: [-94.1966964, 45.5658073],
        zoom: 16,
        speed: 0.6,
        pitch: 5
      },
      'southside': {
        bearing: 10,
        center: [-94.1522915, 45.5582938],
        zoom: 14.5
      },
      'commercial': {
        bearing: 320,
        center: [-94.1631141, 45.5598963],
        zoom: 15,
        pitch: 10,
        speed: 0.5
      }
    };

// On every scroll event, check which element is on screen
    window.onscroll = function () {
      var chapterNames = Object.keys(chapters);
      for (var i = 0; i < chapterNames.length; i++) {
        var chapterName = chapterNames[i];
        if (isElementOnScreen(chapterName)) {
          setActiveChapter(chapterName);
          break;
        }
      }
    };

    var activeChapterName = 'st-cloud';

    function setActiveChapter(chapterName) {
      if (chapterName === activeChapterName) return;

      map.flyTo(chapters[chapterName]);

      document.getElementById(chapterName).setAttribute('class', 'active');
      document.getElementById(activeChapterName).setAttribute('class', '');

      activeChapterName = chapterName;
    }

    function isElementOnScreen(id) {
      var element = document.getElementById(id);
      if (element !== null) {
        var bounds = element.getBoundingClientRect();
        return bounds.top < window.innerHeight && bounds.bottom > 300;
      }
    }

    document.getElementById("onscroll-class").style.overflow = 'hidden'
    // store.dispatch('fetchMarkers');
  },

}


</script>

<style scoped>
/*#map {*/
/*  position: absolute;*/
/*  top: 15vh;*/
/*  bottom: 0;*/
/*  width: 100%;*/
/*}*/
.section-image {
  width: 75%;
}

#map {
  position: fixed;
  width: 50%;
  top: 20%;
  bottom: 0;
}

#features {
  width: 50%;
  margin-left: 50%;
  font-family: sans-serif;
  /*overflow-y: scroll;*/
  overflow: auto;
  background-color: #fafafa;
}

section:first-child {
  padding: 150px 50px;
}

section {
  padding: 25px 50px;
  line-height: 25px;
  border-bottom: 1px solid #ddd;
  opacity: 0.25;
  font-size: 15px;
}

section.active {
  opacity: 1;
}

section:last-child {
  border-bottom: none;
  margin-bottom: 200px;
}
</style>