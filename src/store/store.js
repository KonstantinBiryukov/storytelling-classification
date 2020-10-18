import {createStore} from 'vuex'
import {createApp} from 'vue'

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
const token = 'pk.eyJ1Ijoia29uc3RhbnRpbmJpcml1a292IiwiYSI6ImNrMWsxYjc1bjBrdjQzZHBiNTlhbjBqdmwifQ.vAlGhe7KTCajh5VvGfMJow';
// const style = "mapbox://styles/mapbox/dark-v10";
const style = "mapbox://styles/mapbox/streets-v11"
const store = createStore({
    state: {
        mapboxgl: mapboxgl,
        map: "",
        classes: [
            {
                id: 1,
                name: "On-Scroll",
                slug: "on-scroll",
                image: "on-scroll.png",
                description: "test",
                component: "OnScrollClass"
            },
            {
                id: 2,
                name: "Interactive dynamic maps",
                slug: "video",
                image: "logo.png",
                description: "test2",
                component: "OnScrollClass"
            },
            {
                id: 3,
                name: "Path visualization ",
                slug: "path-viz",
                image: "logo.png",
                description: "test3",
                component: "OnScrollClass"
            },
            {
                id: 4,
                name: "Complex stories",
                slug: "complex",
                image: "complex.png",
                description: "test4",
                component: "OnScrollClass"
            }
        ],
        mapboxData: {
            accessToken: "",
            style: "mapbox://styles/mapbox/streets-v11"
        }
    },
    getters: { // = computed properties
        createMap: (state) => (container) => {
            mapboxgl.accessToken = token;
            state.map = new state.mapboxgl.Map({
                container: container,
                style: style,
                // center: [-0.15591514, 51.51830379],
                // zoom: 15.5,
                bearing: 27,
                pitch: 45
            });
            return state.map;
        },
    }
});

export default store;
import App from '../App.vue'

const app = createApp({App})
app.use(store)
