import { SearchQuery } from './../data/SearchQuery';
import Vue = require("vue");
import VueRouter = require("vue-router");
import ComponentOptions = Vue.ComponentOptions;
import {Car} from "../data/Car";

interface ISearchComponent extends Vue {
    car: Car;
    searchQuery : SearchQuery;
}
export function getSearchComponent() {
    return Vue.component("SearchComponent", {
        template: `
        <div class="col s8 m6">
            <div class="card card-small darken-4">
                <div class="card-content white-text">
                    <div class="input-field col s6">
                        <input class="black-text" id="search" type="text" v-on:input="updateSearch(null)" v-model="searchQuery.query">
                        <label for="search">Search</label>
                    </div>
                    <div class="input-field col s6">
                        <input id="hidecollected" type="checkbox" class="validate" v-on:change="updateSearch(true)" v-model="searchQuery.hideCollected">
                        <label for="hidecollected">Hide collected</label>
                    </div>
                    <div class="input-field col s6">
                        <input id="hideuncollected" type="checkbox" class="validate" v-on:change="updateSearch(false)" v-model="searchQuery.hideUncollected">
                        <label for="hideuncollected">Hide not collected</label>
                    </div>
                </div>
            </div>
        </div>
        `,
        methods: {
            updateSearch: function (collected?:boolean) {
                if (this.searchQuery.hideCollected && this.searchQuery.hideUncollected && collected != null) {
                    this.searchQuery.hideCollected = collected == true;
                    this.searchQuery.hideUncollected = collected ==false;
                    
                }
                this.$emit('search', this.searchQuery);
            }
        },
        data: function () {
            return {
                searchQuery: new SearchQuery(),
                hideCollected: false,
                hideUncollected: false
            }
        }
// We need to explicitly annotate the exported options object
// with the CarCardComponent type
    } as ComponentOptions<ISearchComponent>);
}
