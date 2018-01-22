"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SearchQuery_1 = require("./../data/SearchQuery");
var Vue = require("vue");
var Car_service_1 = require("../data/Car.service");
function CollectionMarkerComponent() {
    return Vue.component("CollectionMarkerComponent", {
        template: "\n        <div>\n        <SearchComponent @search=\"updateSearch\"></SearchComponent>\n        <ul id=\"collectionMarkerComponent\" class=\"collection\">\n            <CollectionComponent @update=\"updateSearch\" v-bind:collection=\"collection\" v-for=\"collection in this.getCollections()\"></CollectionComponent>\n        </ul>\n        </div>",
        data: function () {
            return {
                collections: [],
                searchQuery: new SearchQuery_1.SearchQuery(),
                hideCollected: false,
                hideUncollected: false
            };
        },
        methods: {
            updateSearch: function (searchQuery) {
                this.$forceUpdate();
                if (searchQuery == undefined)
                    return;
                this.searchQuery = searchQuery;
            },
            getCollections: function () {
                var _this = this;
                var collections = this.collections.filter(function (c) { return c.Search(_this.searchQuery.query); });
                if (this.searchQuery.hideCollected) {
                    collections = collections.filter(function (c) { return !c.IsCompletelyCollected(); });
                }
                if (this.searchQuery.hideUncollected) {
                    collections = collections.filter(function (c) { return !c.IsUncollected(); });
                }
                return collections;
            }
        },
        mounted: function () {
            var comp = this;
            Car_service_1.CarService.getCollections(function (c) {
                comp.collections = c;
            });
        }
        // We need to explicitly annotate the exported options object
        // with the CarCardComponent type
    });
}
exports.CollectionMarkerComponent = CollectionMarkerComponent;
//# sourceMappingURL=CollectionMarkerComponent.js.map