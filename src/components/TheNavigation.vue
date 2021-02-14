<template>
  <nav id="nav">
    <h2 class="classification-title">
      <router-link to="/">
        Story-telling maps Classification
      </router-link>
    </h2>
    <div id="main-nav-container">
      <ul class="nav-links">
        <li class="links">
          <router-link to="/storytelling-classification/">
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
      <HelperCheckbox></HelperCheckbox>
    </div>
  </nav>
</template>

<script>
import store from '@/store/store';
import HelperCheckbox from '@/components/HelperCheckbox'

export default {
  name: 'MainPage',
  components: {HelperCheckbox},
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
  padding: 30px;
  position: fixed;
  top: 0;
  width: 100%;
  overflow: hidden;
  background: whitesmoke;
}

#nav a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
}

.nav-links {
  display: flex;
}

.links {
  padding-right: 20px;
  list-style: none;
}

.links:hover {
  text-decoration: underline;
}

.logo {
  font-size: 20px;
  color: purple;
  font-weight: bold;
}

h2 {
  border-radius: 255px 10px 225px 15px/15px 225px 15px 255px;
  padding: 0.5em;
  line-height: 1.5em;
  background: hsla(67, 95%, 95%, 1);
  margin: 0;
}

.classification-title {
  display: block;
  border: solid 5px hsla(0, 55%, 35%, 1);
}
</style>


