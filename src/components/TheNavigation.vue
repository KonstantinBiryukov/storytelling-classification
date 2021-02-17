<template>
  <nav id="nav">
    <h2 id="classification-title">
      <router-link to="/">
        Story-telling maps Classification
      </router-link>
    </h2>
    <div id="main-nav-container">
      <ul class="nav-links">
        <li class="links">
          <router-link to="/">
            Home
          </router-link>
        </li>
        <li v-for="classMap in classes" :key="classMap.id" class="links">
          <a v-if="classMap.id === 4" href="https://konstantinbiryukov.github.io/last-of-us-map/" target="_blank">
            {{ classMap.id + ". " + classMap.name }}
          </a>
          <router-link v-else :to="classMap.routePath">
            {{ classMap.id + ". " + classMap.name }}
          </router-link>
        </li>
      </ul>
      <!--      <HelperCheckbox></HelperCheckbox>-->
    </div>
  </nav>
</template>

<script>
import store from '@/store/store';
// import HelperCheckbox from '@/components/HelperCheckbox'
export default {
  name: 'MainPage',
  // components: {HelperCheckbox},
  data() {
    return {
      classes: store.state.classes,
      subclasses: store.state.classes[1].subclasses
    }
  }
}

</script>

<style scoped>
#nav {
  display: flex;
  justify-content: center;
  /*padding: 25px;*/
  position: fixed;
  top: 0;
  width: 100%;
  overflow: hidden;
  background: whitesmoke;
  z-index: 100;
  height: 15%;
}

#nav a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
}

.nav-links {
  display: flex;
  padding: 20px;
}

.links {
  padding: 0 0 0 25px;
  list-style: none;
}

.links:hover {
  text-decoration: underline;
}

#classification-title {
  height: 35%;
  margin: 15px 15px 15px 30px;
  display: block;
  position: relative;
  border: solid 5px hsla(0, 55%, 35%, 1);
  border-radius: 255px 10px 225px 15px/15px 225px 15px 255px;
  padding: 0.5em;
  line-height: 1.5em;
  background: hsla(67, 95%, 95%, 1);
}

#main-nav-container {
  text-align: center;
}

@media screen and (max-width: 650px) {
  #nav {
    height: 20%;
  }

  #classification-title {
    line-height: 15px !important;
  }

  .links {
    padding: 0;
  }

  .nav-links {
    display: block;
    margin: 0;
    padding: 0;
  }

  .nav-links {
    font-size: 6px;
    line-height: 15px;
  }
}

@media screen and (max-width: 1250px) {
  #nav {
    padding: 0;
  }

  #classification-title {
    font-size: 15px;
    height: 35%;
    line-height: 2em;
  }

  a {
    font-size: 14px;
  }

  .nav-links {
    margin-top: 0;
  }
}

@media screen and (min-width: 1920px) {
  #classification-title {
    height: 50%;
    margin: 15px 15px 15px 30px;
    line-height: 3.5em;
  }

  .nav-links {
    padding: 50px;
    font-size: 20px;
  }
}
</style>


