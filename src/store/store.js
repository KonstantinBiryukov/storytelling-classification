import {createStore} from 'vuex'
import {createApp} from 'vue'

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
// import * as d3 from 'd3/dist/d3.min';
// const d3 = require('d3');
import * as d3 from "d3";

const token = 'pk.eyJ1Ijoia29uc3RhbnRpbmJpcml1a292IiwiYSI6ImNrMWsxYjc1bjBrdjQzZHBiNTlhbjBqdmwifQ.vAlGhe7KTCajh5VvGfMJow';
const store = createStore({
    state: {
        token: token,
        mapboxgl: mapboxgl,
        map: "",
        d3: d3,
        classes: [
            {
                id: 1,
                name: "On-Scroll",
                slug: "on-scroll",
                image: "on-scroll.png",
                description: "test",
                component: "OnScrollClass",
                routePath: "/class/onScroll"
            },
            {
                id: 2,
                name: "Interactive dynamic maps",
                slug: "video",
                image: "logo.png",
                description: "test2",
                component: "OnScrollClass",
                routePath: "/class/interactiveMap",
                subclasses: [
                    {
                        id: 2.1,
                        name: "Slideshow",
                        slug: "slideshow",
                        image: "logo.png",
                        description: "test2",
                        component: "OnScrollClass",
                        routePath: "asd"
                    },
                    {
                        id: 2.2,
                        name: "Changes over time",
                        slug: "changes",
                        image: "logo.png",
                        description: "test2",
                        component: "ChangesOverTime",
                        routePath: "/class/interactiveMap/changesOverTime"
                    },
                    {
                        id: 2.3,
                        name: "Control by sound",
                        slug: "sound-control",
                        image: "logo.png",
                        description: "https://docs.mapbox.com/mapbox-gl-js/example/dancing-buildings/",
                        component: "ControlBySound",
                        routePath: "/class/interactiveMap/controlBySound"
                    },
                    {
                        id: 2.4,
                        name: "Video",
                        slug: "video",
                        image: "logo.png",
                        description: "test2",
                        component: "VideoClass",
                        routePath: "/class/interactiveMap/video"
                    },
                    {
                        id: 2.5,
                        name: "Animation",
                        slug: "animation",
                        image: "logo.png",
                        description: "https://docs.mapbox.com/mapbox-gl-js/example/free-camera-point/",
                        component: "Animation",
                        routePath: "/class/interactiveMap/animation"
                    },
                    {
                        id: 2.6,
                        name: "Path following",
                        slug: "PathFollowing",
                        image: "logo.png",
                        description: "https://docs.mapbox.com/mapbox-gl-js/example/free-camera-path/",
                        component: "PathFollow",
                        routePath: "/class/interactiveMap/pathFollow"
                    },
                    {
                        id: 2.7,
                        name: "Swipe between maps",
                        slug: "MapsSwipe",
                        image: "logo.png",
                        description: "https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-compare/",
                        component: "MapsSwipe",
                        routePath: "/class/interactiveMap/mapsSwipe"
                    },
                    {
                        id: 2.8,
                        name: "Real-time route render",
                        slug: "RouteRender",
                        image: "logo.png",
                        description: "https://docs.mapbox.com/mapbox-gl-js/example/live-update-feature/",
                        component: "RealTimeRouteRender",
                        routePath: "/class/interactiveMap/realTimeRouteRender"
                    },
                    {
                        id: 2.9,
                        name: "3D Polygons",
                        slug: "3dPolygons",
                        image: "logo.png",
                        description: "https://docs.mapbox.com/mapbox-gl-js/example/3d-extrusion-floorplan/",
                        component: "3dPolygons",
                        routePath: "/class/interactiveMap/3dPolygons"
                    }
                ],
            },
            {
                id: 3,
                name: "Path visualization",
                slug: "path-viz",
                image: "logo.png",
                description: "test3",
                component: "OnScrollClass",
                routePath: "/class/interactiveMap"
            },
            {
                id: 4,
                name: "Complex stories",
                slug: "complex",
                image: "complex.png",
                description: "test4",
                component: "OnScrollClass",
                routePath: "/class/interactiveMap"
            }
        ],
        mapboxData: {
            accessToken: "",
            style: "mapbox://styles/mapbox/streets-v11"
        }
    },
    getters: { // = computed properties
        createMap: (state) => (container, bearing, pitch, zoom, center, style, minZoom, interactive) => {
            mapboxgl.accessToken = token;
            state.map = new state.mapboxgl.Map({
                container: container,
                style: style,
                zoom: zoom,
                bearing: bearing,
                center: center,
                pitch: pitch,
                minZoom: minZoom,
                interactive: interactive
            });
            return state.map;
        },
        d3Map: () => () => {
            return store.getters.createMap("map", 0, 55, 15,
                [-122.019807, 45.632433], "mapbox://styles/mapbox/satellite-v9", 12);
        },
    }
});

export default store;
import App from '../App.vue'

const app = createApp({App})
app.use(store)
