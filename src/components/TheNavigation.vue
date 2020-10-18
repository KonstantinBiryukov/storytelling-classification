<template>
  <nav id="nav">
    <!--    <Class/>-->
    <h2 class="classification-title">
      <router-link to="/">
        Story-telling maps Classification
      </router-link>
    </h2>
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
        <router-link v-else :to="{name:'ClassDetails', params: {slug: classMap.slug}}">
          {{ classMap.id + ". " + classMap.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
// import Class from './Class.vue'
import store from '@/store/store';

export default {
  name: 'MainPage',
  // components: {
  //   Class
  // },
  data() {
    return {
      classes: store.state.classes
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

/*#nav a.router-link-exact-active {*/
#nav a.vue-school-active-class {
  color: purple;
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
  /*width:20%;*/
  /*margin:5% auto;*/
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


