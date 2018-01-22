"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Car_service_1 = require("./../data/Car.service");
var SearchQuery_1 = require("./../data/SearchQuery");
var Vue = require("vue");
function CarMarkerComponent() {
    return Vue.component("CollectionMarkerComponent", {
        template: "\n        <ul id=\"collectionMarkerComponent\" class=\"collection\">\n            <SearchComponent @search=\"updateSearch\"></SearchComponent>\n            <ul class=\"row collection\" v-for=\"row in getRows()\">\n                <li class=\"collection-item\">\n                <CarCardComponent v-for=\"car in row\" v-bind:car=\"car\"></CarCardComponent>\n                </li>\n            </ul>       \n        </ul>\n        ",
        data: function () {
            return {
                cars: [],
                searchQuery: new SearchQuery_1.SearchQuery()
            };
        },
        methods: {
            updateSearch: function (searchQuery) {
                this.$forceUpdate();
                if (searchQuery == undefined)
                    return;
                this.searchQuery = searchQuery;
            },
            getRows: function () {
                var _this = this;
                var viewCars = this.cars.filter(function (c) { return c.Search(_this.searchQuery.query); });
                if (this.searchQuery.hideCollected) {
                    viewCars = viewCars.filter(function (c) { return !c.IsCollected(); });
                }
                if (this.searchQuery.hideUncollected) {
                    viewCars = viewCars.filter(function (c) { return c.IsCollected(); });
                }
                return Car_service_1.CarService.getCarRows(viewCars);
            }
        },
        mounted: function () {
            var comp = this;
            Car_service_1.CarService.getCars(function (c) {
                comp.cars = c;
            });
        }
        // We need to explicitly annotate the exported options object
        // with the CarCardComponent type
    });
}
exports.CarMarkerComponent = CarMarkerComponent;
//# sourceMappingURL=CarMarkerComponent.js.map