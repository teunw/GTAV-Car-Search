import { SearchQuery } from './../data/SearchQuery';
import Vue = require("vue");
import VueRouter = require("vue-router");
import ComponentOptions = Vue.ComponentOptions;
import {Collection} from "../data/Collection";
import {CarService} from "../data/Car.service";

interface ICollectionMarkerProps extends Vue {
    collections: Collection[];
    fetchData: Function;
    getCollections(): Collection[];
    updateSearch() : Function; 
    searchQuery: SearchQuery;
}
export function CollectionMarkerComponent() {
    return Vue.component("CollectionMarkerComponent", {
        template: `
        <div>
        <SearchComponent @search="updateSearch"></SearchComponent>
        <ul id="collectionMarkerComponent" class="collection">
            <CollectionComponent @update="updateSearch" v-bind:collection="collection" v-for="collection in this.getCollections()"></CollectionComponent>
        </ul>
        </div>`,
        data: function () {
            return {
                collections: [],
                searchQuery: new SearchQuery(),
                hideCollected: false,
                hideUncollected: false
            }
        },
        methods: {
            updateSearch: function (searchQuery:SearchQuery) {
                this.$forceUpdate();
                if (searchQuery == undefined) return;
                this.searchQuery = searchQuery;
            },
            getCollections: function () {                
                let collections : Collection[] = this.collections.filter(c => c.Search(this.searchQuery.query));
                if (this.searchQuery.hideCollected) {
                    collections = collections.filter(c => !c.IsCompletelyCollected());
                }
                if (this.searchQuery.hideUncollected) {
                    collections = collections.filter(c => !c.IsUncollected());
                }
                return collections;
            }
        },
        mounted: function () {
            const comp = this;
            CarService.getCollections(function (c: Collection[]) {
                comp.collections = c;
            });
        }
// We need to explicitly annotate the exported options object
// with the CarCardComponent type
    } as ComponentOptions<ICollectionMarkerProps>);
}
