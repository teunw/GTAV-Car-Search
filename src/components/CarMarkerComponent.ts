import { CarService } from './../data/Car.service';
import { SearchQuery } from './../data/SearchQuery';
import Vue = require("vue");
import VueRouter = require("vue-router");
import ComponentOptions = Vue.ComponentOptions;
import {Collection} from "../data/Collection";
import {Car} from "../data/Car";

interface ICarMarkerProps extends Vue {
    cars: Car[];
    fetchData: Function;
    searchQuery : SearchQuery;
}
export function CarMarkerComponent() {
    return Vue.component("CollectionMarkerComponent", {
        template: `
        <ul id="collectionMarkerComponent" class="collection">
            <SearchComponent @search="updateSearch"></SearchComponent>
            <ul class="row collection" v-for="row in getRows()">
                <li class="collection-item">
                <CarCardComponent v-for="car in row" v-bind:car="car"></CarCardComponent>
                </li>
            </ul>       
        </ul>
        `,
        data: function () {
            return {
                cars: [],
                searchQuery: new SearchQuery()
            }
        },
        methods: {
            updateSearch: function (searchQuery:SearchQuery) {
                this.$forceUpdate();
                if (searchQuery == undefined) return;
                this.searchQuery = searchQuery;
            },
            getRows: function() {
                let viewCars = this.cars.filter(c => c.Search(this.searchQuery.query));
                if (this.searchQuery.hideCollected) {
                    viewCars = viewCars.filter(c => !c.IsCollected());
                }
                if (this.searchQuery.hideUncollected){
                    viewCars = viewCars.filter(c => c.IsCollected());
                }
                return CarService.getCarRows(viewCars);
            }
        },
        mounted: function () {
            const comp = this;
            CarService.getCars(function (c: Car[]) {
                comp.cars = c;
            });
        }
// We need to explicitly annotate the exported options object
// with the CarCardComponent type
    } as ComponentOptions<ICarMarkerProps>);
}
