import Vue = require("vue");
import VueRouter = require("vue-router");
import ComponentOptions = Vue.ComponentOptions;
import {Collection} from "../data/Collection";
import {Car} from "../data/Car";
import {CarService} from "../data/Car.service";

interface ICollectionComponentProps extends Vue {
    collection: Collection;
    getCarRows(rowLength:number) : Car[][];
}
export function getCollectedComponent() {
    return Vue.component("CollectionComponent", {
        template: `<li id="collectionComponent" class="collection-item">
                <span class="title"><h4>{{ collection.name }}</h4></span>
                <p>
                    <div class="row" v-for="row in getCarRows(collection)">
                        <CarCardComponent @update="update" v-for="car in row" v-bind:car="car"></CarCardComponent>
                    </div>                
                    <h6>{{collection.GetAmountCollected()}} / {{collection.GetTotalCars()}} collected</h6>
                    <h6>{{collection.GetBonusText()}} bonus</h6>
                </p>
            </li>
    `,
        props: ["collection"],
        methods: {
            update: function () {
                this.$emit("update");
            },
            getCarRows(collection:Collection, rowLength : number = 4):Car[][] {
                return CarService.getCarRows(collection.cars, rowLength);
            }
        }
    } as ComponentOptions<ICollectionComponentProps>);
}