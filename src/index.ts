import Vue = require('vue');
import VueRouter = require('vue-router');
import $ = require("jquery");
import Route = VueRouter.Route;
import RouteConfig = VueRouter.RouteConfig;

import { CollectionMarkerComponent } from "./components/CollectionMarkerComponent";
import { getCollectedComponent } from "./components/CollectionComponent";
import { getCardCardComponent } from "./components/CarCardComponent";
import { CarMarkerComponent } from "./components/CarMarkerComponent";
import { getSearchComponent } from "./components/SearchComponent";

Vue.use(VueRouter);

const CollectionComponent = getCollectedComponent();
const CarComponent = getCardCardComponent();
const CollectionMarker = CollectionMarkerComponent();
const CarsComponent = CarMarkerComponent();
const SearchComponent = getSearchComponent();

const router = new VueRouter({
    mode: "history",
    routes: [
        { path: '/', name: "CollectionMarker", component: CollectionMarker },
        { path: '/cars', name: "CarMarker", component: CarsComponent },
        { path: "*", redirect: { name: "CollectionMarker" } }
    ]
});

var v = new Vue({
    router: router
}).$mount("#app");