<template>
  <!--  <div id="app">-->
  <div id="app-container">
    <TheNavigation/>
    <!--    <router-view :key="$route.path"/>-->
    <!--    <router-view v-slot="{Component}">-->
    <!--      <transition name="fade" mode="out-in">-->
    <!--        <component :is="Component"></component>-->
    <!--      </transition>-->
    <!--    </router-view>-->
    <router-view/>
  </div>
  <!--  </div>-->
</template>

<script>
import TheNavigation from '@/components/TheNavigation.vue'

export default {
  name: 'App',
  components: {
    TheNavigation,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
}

#map {
  position: fixed;
  width: 100%;
  top: 15%;
  bottom: 0;
}

.mapboxgl-popup-content {
  border: orange 5px ridge;
}

.popup-helper {
  font-size: 12px;
  font-family: Consolas, monaco, monospace;
  font-weight: bold;
  margin: 5px;
}

/*.fade-enter-from,*/
/*.fade-leave-to {*/
/*  opacity: 0;*/
/*}*/

/*.fade-enter-active,*/
/*.fade-leave-active{*/
/*  transition: opacity 0.5s ease-out;*/
/*}*/
</style>
