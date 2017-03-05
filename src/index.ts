import Vue = require('vue');
import VueRouter = require('vue-router');
import Route = VueRouter.Route;
import RouteConfig = VueRouter.RouteConfig;

import {CollectionMarkerComponent} from "./components/CollectionMarkerComponent";
import {getCollectedComponent} from "./components/CollectionComponent";
import {getCardCardComponent} from "./components/CarCardComponent";
import {CarMarkerComponent} from "./components/CarMarkerComponent";
import {getSearchComponent} from "./components/SearchComponent";

Vue.use(VueRouter);

const CollectionComponent = getCollectedComponent();
const CarComponent = getCardCardComponent();
const CollectionMarker : Vue.Component = CollectionMarkerComponent();
const CarsComponent : Vue.Component = CarMarkerComponent();
const SearchComponent = getSearchComponent();

const router = new VueRouter({
    mode: "history",
    routes: [
        { path: '/', component: CollectionMarker },
        { path: '/cars', component: CarsComponent }
    ]
});

new Vue({
  router
}).$mount('#app');

