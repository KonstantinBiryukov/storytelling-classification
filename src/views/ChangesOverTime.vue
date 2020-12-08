<!--<template>-->
<!--  &lt;!&ndash;  <div class="swipe-maps">&ndash;&gt;-->
<!--  &lt;!&ndash;    <script type="application/javascript" src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-compare/v0.4.0/mapbox-gl-compare.js"></script>&ndash;&gt;-->
<!--  &lt;!&ndash;    <link&ndash;&gt;-->
<!--  &lt;!&ndash;        rel="stylesheet"&ndash;&gt;-->
<!--  &lt;!&ndash;        href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-compare/v0.4.0/mapbox-gl-compare.css"&ndash;&gt;-->
<!--  &lt;!&ndash;        type="text/css"&ndash;&gt;-->
<!--  &lt;!&ndash;    />&ndash;&gt;-->
<!--  <div id="comparison-container">-->
<!--    <div id="before" class="map"></div>-->
<!--    <div id="after" class="map"></div>-->
<!--  </div>-->
<!--  &lt;!&ndash;  </div>&ndash;&gt;-->
<!--</template>-->

<!--<script>-->
<!--import store from "@/store/store";-->

<!--export default {-->
<!--  name: "ChangesOverTime",-->
<!--  computed: {-->
<!--    beforeMap() {-->
<!--      return store.getters.createMap("before", 0, 0);-->
<!--    },-->
<!--    afterMap() {-->
<!--      return store.getters.createMap("after", 0, 0);-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    const center = [0, 0];-->
<!--    const zoom = 0;-->
<!--    this.beforeMap.center = center;-->
<!--    this.beforeMap.zoom = zoom;-->
<!--    this.afterMap.center = center;-->
<!--    this.afterMap.zoom = zoom;-->

<!--    let container = '#comparison-container';-->

<!--    new store.state.mapboxgl.Compare(this.beforeMap, this.afterMap, container, {-->
<!--// Set this to enable comparing two maps by mouse movement:-->
<!--//       mousemove: true-->
<!--    });-->


<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--body {-->
<!--  overflow: hidden;-->
<!--}-->

<!--body * {-->
<!--  -webkit-touch-callout: none;-->
<!--  -webkit-user-select: none;-->
<!--  -moz-user-select: none;-->
<!--  -ms-user-select: none;-->
<!--  user-select: none;-->
<!--}-->

<!--.map {-->
<!--  position: absolute;-->
<!--  top: 0;-->
<!--  bottom: 0;-->
<!--  width: 100%;-->
<!--}-->

<!--</style>-->