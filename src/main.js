import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router'
import store from "@/store/store";
import * as turf from "@turf/turf";
import * as compare from "mapbox-gl-compare";
import 'mapbox-gl/dist/mapbox-gl.css';
// import 'mapbox-gl/dist/mapbox-gl.js.map';
import 'mapbox-gl-compare/dist/mapbox-gl-compare.css';
// import 'mapbox-gl-compare/dist/mapbox-gl-compare;
import * as d3 from 'd3';

createApp(App).use(router, store, turf, compare, d3).mount('#app')