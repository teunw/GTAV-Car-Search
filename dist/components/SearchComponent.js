"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SearchQuery_1 = require("./../data/SearchQuery");
var Vue = require("vue");
function getSearchComponent() {
    return Vue.component("SearchComponent", {
        template: "\n        <div class=\"col s8 m6\">\n            <div class=\"card card-small darken-4\">\n                <div class=\"card-content white-text\">\n                    <div class=\"input-field col s6\">\n                        <input class=\"black-text\" id=\"search\" type=\"text\" v-on:input=\"updateSearch(null)\" v-model=\"searchQuery.query\">\n                        <label for=\"search\">Search</label>\n                    </div>\n                    <div class=\"input-field col s6\">\n                        <input id=\"hidecollected\" type=\"checkbox\" class=\"validate\" v-on:change=\"updateSearch(true)\" v-model=\"searchQuery.hideCollected\">\n                        <label for=\"hidecollected\">Hide collected</label>\n                    </div>\n                    <div class=\"input-field col s6\">\n                        <input id=\"hideuncollected\" type=\"checkbox\" class=\"validate\" v-on:change=\"updateSearch(false)\" v-model=\"searchQuery.hideUncollected\">\n                        <label for=\"hideuncollected\">Hide not collected</label>\n                    </div>\n                </div>\n            </div>\n        </div>\n        ",
        methods: {
            updateSearch: function (collected) {
                if (this.searchQuery.hideCollected && this.searchQuery.hideUncollected && collected != null) {
                    this.searchQuery.hideCollected = collected == true;
                    this.searchQuery.hideUncollected = collected == false;
                }
                this.$emit('search', this.searchQuery);
            }
        },
        data: function () {
            return {
                searchQuery: new SearchQuery_1.SearchQuery(),
                hideCollected: false,
                hideUncollected: false
            };
        }
        // We need to explicitly annotate the exported options object
        // with the CarCardComponent type
    });
}
exports.getSearchComponent = getSearchComponent;
//# sourceMappingURL=SearchComponent.js.map