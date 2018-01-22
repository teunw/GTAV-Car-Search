"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vue = require("vue");
function getCardCardComponent() {
    return Vue.component("CarCardComponent", {
        template: "\n        <div class=\"col s8 m6\">\n            <div class=\"card darken-4\" v-bind:class=\"[car.IsCollected() ? 'green' : 'red']\">\n                <div class=\"card-content white-text\">\n                    <span class=\"card-title\">{{car.getNameCapitalized()}}</span>\n                    <p class=\"card-text\">Plate: {{car.getPlateCapitalized()}}</p>\n                </div>\n                <div class=\"card-action darken-3\">\n                        <a href=\"javascript:void(0)\" class=\"white-text\" v-on:click=\"ToggleCollected()\">{{car.IsCollected() ? \"Put back\" : \"Mark collected\"}}</a>\n                    </div>\n            </div>\n        </div>\n        ",
        methods: {
            ToggleCollected: function (e) {
                this.car.ToggleCollected();
                this.$forceUpdate();
                this.$emit("update");
            }
        },
        props: ["car"]
        // We need to explicitly annotate the exported options object
        // with the CarCardComponent type
    });
}
exports.getCardCardComponent = getCardCardComponent;
//# sourceMappingURL=CarCardComponent.js.map