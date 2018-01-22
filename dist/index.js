"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vue = require("vue");
var VueRouter = require("vue-router");
var CollectionMarkerComponent_1 = require("./components/CollectionMarkerComponent");
var CollectionComponent_1 = require("./components/CollectionComponent");
var CarCardComponent_1 = require("./components/CarCardComponent");
var CarMarkerComponent_1 = require("./components/CarMarkerComponent");
var SearchComponent_1 = require("./components/SearchComponent");
Vue.use(VueRouter);
var CollectionComponent = CollectionComponent_1.getCollectedComponent();
var CarComponent = CarCardComponent_1.getCardCardComponent();
var CollectionMarker = CollectionMarkerComponent_1.CollectionMarkerComponent();
var CarsComponent = CarMarkerComponent_1.CarMarkerComponent();
var SearchComponent = SearchComponent_1.getSearchComponent();
var router = new VueRouter({
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
//# sourceMappingURL=index.js.map