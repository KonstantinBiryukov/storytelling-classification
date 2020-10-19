import Home from "../views/Home.vue";
import {createWebHistory, createRouter} from "vue-router";

const routes = [
    {
        path: "/", // url, the base url in this case
        name: "Home", // the name of the root
        component: Home // A component the name refers to. We reported it above.
     },
    {
        path: "/class/:slug",
        name: "ClassDetails",
        component: () => import(/* webpackChunkName: "DestinationDetails" */ "../views/ClassDetails.vue"),
        props: true
    },
    {
        path: "/interactiveMap", // url, the base url in this case
        name: "InteractiveMapClassHome", // the name of the root
        component: () => import(/* webpackChunkName: "DestinationDetails" */ "../views/InteractiveMapClassHome.vue"),
    },
    {
        path: "/interactiveMap/:slug",
        name: "InteractiveMapDetails",
        component: () => import(/* webpackChunkName: "DestinationDetails" */ "../views/InteractiveMapDetails.vue"),
        props: true
    },
]

const router = createRouter({
    // 0) The default mode for vue-router is hash mode, it uses the URL hash to simulate a full URL, so that he page won't be
    // reloaded when the URL changes. To get rid of a hash (#) in URL, we can use the router's history mode, which uses the
    // history.pushState API to achieve URL navigation without a page reload. In our router.js file we just need to add mode:"history"
    // and URL will look normal.
    // mode: "history",
    history: createWebHistory(),
    // 1) we are able to change the default class names that are defined by Vue logic
    // for example 'router-link-exact-active' for an active(chosen) link.
    // 2) in router.js add the name of the class you would like to use to the linkExactActiveClass property.
    // then, in a file where we use it, we can change its styles with this new assigned name.
    // In the DevTools we can see that 'router-link-exact-active' is replaced by 'vue-school-active-class'.
    // Now these styles should be in the Navigation component.
    linkExactActiveClass: "vue-school-active-class",
    routes
});

export default router;
