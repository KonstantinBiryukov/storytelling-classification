import { createApp } from 'vue'
import App from './App.vue' // root-component, starting point
import router from '@/router/router'
import store from "@/store/store";
import * as turf from "@turf/turf";
import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl-compare/dist/mapbox-gl-compare.css';
import * as d3 from 'd3';

// in const app: App that is full of libraries is returned,
// since most of the methods exposed by the app instance return the same instance, but modified instance.
const app = createApp(App).use(router, store, turf, d3);
app.mount('#app'); // returns a component instance (vm)