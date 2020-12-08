import {createStore} from 'vuex'
import {createApp} from 'vue'

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
const token = 'pk.eyJ1Ijoia29uc3RhbnRpbmJpcml1a292IiwiYSI6ImNrMWsxYjc1bjBrdjQzZHBiNTlhbjBqdmwifQ.vAlGhe7KTCajh5VvGfMJow';
const store = createStore({
    state: {
        token: token,
        mapboxgl: mapboxgl,
        map: "",
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
                        component: "OnScrollClass",
                        routePath: "asd"
                    },
                    {
                        id: 2.3,
                        name: "Control by sound",
                        slug: "sound-control",
                        image: "logo.png",
                        description: "test2",
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
                        description: "test2",
                        component: "OnScrollClass",
                        routePath: "asd"
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
        createMap: (state) => (container, bearing, pitch, zoom, center, style, minZoom) => {
            mapboxgl.accessToken = token;
            state.map = new state.mapboxgl.Map({
                container: container,
                style: style,
                zoom: zoom,
                bearing: bearing,
                center: center,
                pitch: pitch,
                minZoom: minZoom
            });
            return state.map;
        }
    }
});

export default store;
import App from '../App.vue'

const app = createApp({App})
app.use(store)
