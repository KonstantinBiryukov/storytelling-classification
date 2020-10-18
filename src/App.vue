<template>
  <div id="app">
    <TheNavigation/>
    <router-view :key="$route.path"/>
  </div>
</template>

<script>
import TheNavigation from '@/components/TheNavigation.vue'

export default {
  name: 'App',
  components: {
    TheNavigation
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

/*body {*/
/*  margin: 0;*/
/*  padding: 0;*/
/*}*/

/*#map {*/
/*  position: absolute;*/
/*  top: 0;*/
/*  bottom: 0;*/
/*  width: 100%;*/
/*}*/
</style>
