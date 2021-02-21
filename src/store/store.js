import {createStore} from 'vuex'
import {createApp} from 'vue'

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import * as d3 from "d3";

const token = 'pk.eyJ1Ijoia29uc3RhbnRpbmJpcml1a292IiwiYSI6ImNrMWsxYjc1bjBrdjQzZHBiNTlhbjBqdmwifQ.vAlGhe7KTCajh5VvGfMJow';
const store = createStore({
    state: {
        token: token,
        mapboxgl: mapboxgl,
        map: "",
        d3: d3,
        helpMode: "on",
        classes: [
            {
                id: 1,
                name: "On-Scroll",
                image: "on-scroll.png",
                description: "test",
                component: "OnScrollClass",
                routePath: "/class/onScroll"
            },
            {
                id: 2,
                name: "Interactive dynamic maps",
                image: "interactive-maps.png",
                description: "test2",
                component: "OnScrollClass",
                routePath: "/class/interactiveMap",
                subclasses: [
                    {
                        id: 2.1,
                        name: "Fly to a Location",
                        image: "fly-to.png",
                        description: "https://docs.mapbox.com/mapbox-gl-js/example/flyto/",
                        component: "FlyToLocation",
                        routePath: "/class/interactiveMap/flyToLocation"
                    },
                    {
                        id: 2.2,
                        name: "Changes over time",
                        image: "time-changes.png",
                        description: "https://docs.mapbox.com/mapbox-gl-js/example/adjust-layer-opacity/",
                        component: "ChangesOverTime",
                        routePath: "/class/interactiveMap/changesOverTime"
                    },
                    {
                        id: 2.3,
                        name: "Control by sound",
                        image: "sound-control.png",
                        description: "https://docs.mapbox.com/mapbox-gl-js/example/dancing-buildings/",
                        component: "ControlBySound",
                        routePath: "/class/interactiveMap/controlBySound"
                    },
                    {
                        id: 2.4,
                        name: "Video",
                        image: "video.png",
                        description: "https://docs.mapbox.com/mapbox-gl-js/example/video-on-a-map/",
                        component: "VideoClass",
                        routePath: "/class/interactiveMap/video"
                    },
                    {
                        id: 2.5,
                        name: "Animation",
                        image: "animation.png",
                        description: "https://docs.mapbox.com/mapbox-gl-js/example/free-camera-point/",
                        component: "Animation",
                        routePath: "/class/interactiveMap/animation"
                    },
                    {
                        id: 2.6,
                        name: "Slideshow",
                        image: "slideshow.png",
                        description: "https://docs.mapbox.com/mapbox-gl-js/example/playback-locations/",
                        component: "Slideshow",
                        routePath: "/class/interactiveMap/slideshow"
                    },
                    {
                        id: 2.7,
                        name: "3D Polygons",
                        image: "3d-polygons.png",
                        description: "https://docs.mapbox.com/mapbox-gl-js/example/3d-extrusion-floorplan/ " +
                            "https://studio.mapbox.com/datasets/ " +
                            "https://gist.github.com/ryanbaumann/a7d970386ce59d11c16278b90dde094d",
                        component: "3dPolygons",
                        routePath: "/class/interactiveMap/3dPolygons"
                    },
                    {
                        id: 2.8,
                        name: "Markers & Popups",
                        image: "markers-and-popups.png",
                        description: "https://docs.mapbox.com/mapbox-gl-js/example/3d-buildings/",
                        component: "VisualPopups",
                        routePath: "/class/interactiveMap/visualPopups"
                    }
                ],
            },
            {
                id: 3,
                name: "Path visualization",
                image: "path-visualization.png",
                description: "test3",
                component: "OnScrollClass",
                routePath: "/class/pathVisualization",
                subclasses: [
                    {
                        id: 3.1,
                        name: "Path following",
                        image: "path-follow.png",
                        description: "https://docs.mapbox.com/mapbox-gl-js/example/free-camera-path/",
                        component: "PathFollow",
                        routePath: "/class/pathVisualization/pathFollow"
                    },
                    {
                        id: 3.2,
                        name: "Real-time route render",
                        image: "path-render.png",
                        description: "https://docs.mapbox.com/mapbox-gl-js/example/live-update-feature/",
                        component: "RealTimeRouteRender",
                        routePath: "/class/pathVisualization/realTimeRouteRender"
                    },
                    {
                        id: 3.3,
                        name: "The object path along the route",
                        image: "object-path.png",
                        description: "https://docs.mapbox.com/mapbox-gl-js/example/animate-point-along-route/",
                        component: "ObjectPathAlongRoute",
                        routePath: "/class/pathVisualization/pathAlongRoute"
                    }
                ]
            },
            {
                id: 4,
                name: "Complex stories",
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
        // reload page if previous page was loaded 10 seconds later; for optimization purposes
        pageReload: () => () => {
            // The last "domLoading" Time
            let currentDocumentTimestamp =
                new Date(performance.timing.domLoading).getTime();
            // Current Time
            let now = Date.now();
            // Ten Seconds
            let tenSec = 10 * 1000;
            // Plus Ten Seconds
            let plusTenSec = currentDocumentTimestamp + tenSec;
            if (now > plusTenSec) {
                location.reload();
            }
        }
    },
    watch: {
        '$store.state.helpMode': function () {
            console.log(this.$store.state.helpMode)
        }
    }
});

export default store;
import App from '../App.vue'

const app = createApp({App})
app.use(store)
