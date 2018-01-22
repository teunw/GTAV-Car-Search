"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vue = require("vue");
var Car_service_1 = require("../data/Car.service");
function getCollectedComponent() {
    return Vue.component("CollectionComponent", {
        template: "<li id=\"collectionComponent\" class=\"collection-item\">\n                <span class=\"title\"><h4>{{ collection.name }}</h4></span>\n                <p>\n                    <div class=\"row\" v-for=\"row in getCarRows(collection)\">\n                        <CarCardComponent @update=\"update\" v-for=\"car in row\" v-bind:car=\"car\"></CarCardComponent>\n                    </div>                \n                    <h6>{{collection.GetAmountCollected()}} / {{collection.GetTotalCars()}} collected</h6>\n                    <h6>{{collection.GetBonusText()}} bonus</h6>\n                </p>\n            </li>\n    ",
        props: ["collection"],
        methods: {
            update: function () {
                this.$emit("update");
            },
            getCarRows: function (collection, rowLength) {
                if (rowLength === void 0) { rowLength = 4; }
                return Car_service_1.CarService.getCarRows(collection.cars, rowLength);
            }
        }
    });
}
exports.getCollectedComponent = getCollectedComponent;
//# sourceMappingURL=CollectionComponent.js.map