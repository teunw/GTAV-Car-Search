/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Data_1 = __webpack_require__(13);
var Collection_1 = __webpack_require__(11);
var CarService = (function () {
    function CarService() {
    }
    CarService.getCollections = function (arr) {
        this.getData(function (d) {
            var collections = Collection_1.Collection.constructCollections(d.collections);
            arr(collections);
        });
    };
    CarService.getData = function (f) {
        var obj = Data_1.cars;
        f(obj);
    };
    CarService.getCars = function (f) {
        this.getData(function (d) {
            var cars = d.cars.map(function (ic) { return Collection_1.Collection.constructCar(ic); });
            f(cars);
        });
    };
    CarService.getCarRows = function (cars, rowLength) {
        if (rowLength === void 0) { rowLength = 8; }
        var newArr = [];
        var tempArr = [];
        cars.forEach(function (c) {
            if (tempArr.length >= rowLength) {
                newArr.push(tempArr);
                tempArr = [];
            }
            tempArr.push(c);
        });
        newArr.push(tempArr);
        return newArr;
    };
    return CarService;
}());
exports.CarService = CarService;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SearchQuery = (function () {
    function SearchQuery() {
        this.query = "";
        this.hideCollected = false;
        this.hideUncollected = false;
    }
    return SearchQuery;
}());
exports.SearchQuery = SearchQuery;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vue = __webpack_require__(0);
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Car_service_1 = __webpack_require__(1);
var SearchQuery_1 = __webpack_require__(2);
var Vue = __webpack_require__(0);
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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vue = __webpack_require__(0);
var Car_service_1 = __webpack_require__(1);
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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SearchQuery_1 = __webpack_require__(2);
var Vue = __webpack_require__(0);
var Car_service_1 = __webpack_require__(1);
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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SearchQuery_1 = __webpack_require__(2);
var Vue = __webpack_require__(0);
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


/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

module.exports = VueRouter;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Car = (function () {
    function Car(name, plate) {
        this.name = name;
        this.plate = plate;
    }
    Car.prototype.IsCollected = function () {
        return localStorage.getItem(this.createKey()) == "true";
    };
    Car.prototype.SetCollected = function (collected) {
        localStorage.setItem(this.createKey(), String(collected));
    };
    Car.prototype.ToggleCollected = function () {
        this.SetCollected(!this.IsCollected());
        console.log(this.IsCollected());
    };
    Car.prototype.getNameCapitalized = function () {
        return this.name.slice(0, 1).toUpperCase() + this.name.slice(1).toLowerCase();
    };
    Car.prototype.getPlateCapitalized = function () {
        return this.plate.slice(0, 1).toUpperCase() + this.plate.slice(1).toLowerCase();
    };
    Car.prototype.Search = function (query) {
        if (query.trim() == "")
            return true;
        var removel33tspelling = query
            .replace("4", "a")
            .replace("3", "e")
            .replace("6", "g")
            .replace("9", "j")
            .replace("1", "l")
            .replace("0", "o")
            .replace("0", "q")
            .replace("5", "s")
            .replace("7", "t")
            .replace("2", "z");
        var l33tSearch = this.plate.toLowerCase().indexOf(removel33tspelling) != -1;
        var nameSearch = this.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
        var plateSearch = this.plate.toLowerCase().indexOf(query.toLowerCase()) != -1;
        return l33tSearch || nameSearch || plateSearch;
    };
    Car.prototype.createKey = function () {
        return this.name + this.plate;
    };
    return Car;
}());
exports.Car = Car;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Car_1 = __webpack_require__(10);
var Collection = (function () {
    function Collection(name, cars) {
        this.name = name;
        this.cars = cars.map(Collection.constructCar);
    }
    Collection.prototype.IsCompletelyCollected = function () {
        return this.cars.every(function (car) { return car.IsCollected(); });
    };
    Collection.prototype.IsPartlyCollected = function () {
        return this.GetAmountCollected() > 0;
    };
    Collection.prototype.IsUncollected = function () {
        return this.GetAmountCollected() != this.cars.length;
    };
    Collection.prototype.GetAmountCollected = function () {
        return this.cars.filter(function (c) { return c.IsCollected(); }).length;
    };
    Collection.prototype.GetTotalCars = function () {
        return this.cars.length;
    };
    Collection.prototype.GetBonus = function () {
        return 20000 + (15000 * (this.GetTotalCars() - 2));
    };
    Collection.prototype.GetBonusText = function () {
        var bonus = this.GetBonus().toString();
        return bonus.slice(0, 2) + "." + bonus.slice(2, 9999);
    };
    Collection.prototype.Search = function (query) {
        if (query == undefined)
            return true;
        query = query.toLowerCase();
        var carSearch = this.cars.filter(function (c) { return c.Search(query); }).length > 0;
        var collectionSearch = this.name.toLowerCase().indexOf(query) != -1;
        return carSearch || collectionSearch;
    };
    Collection.constructCar = function (car) {
        return new Car_1.Car(car.name, car.plate);
    };
    Collection.constructCollections = function (icollections) {
        var collections = [];
        icollections.forEach(function (icoll) {
            collections.push(new Collection(icoll.name, icoll.cars));
        });
        return collections;
    };
    return Collection;
}());
exports.Collection = Collection;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vue = __webpack_require__(0);
var VueRouter = __webpack_require__(9);
var CollectionMarkerComponent_1 = __webpack_require__(6);
var CollectionComponent_1 = __webpack_require__(5);
var CarCardComponent_1 = __webpack_require__(3);
var CarMarkerComponent_1 = __webpack_require__(4);
var SearchComponent_1 = __webpack_require__(7);
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


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.cars = {
    "collections": [
        {
            "name": "Uninsurable Collector: Jay Norris",
            "cars": [
                {
                    "name": "X80 PROTO",
                    "plate": "MAKEBANK"
                },
                {
                    "name": "T20",
                    "plate": "DEVIL"
                },
                {
                    "name": "OSIRIS",
                    "plate": "SLEEK"
                }
            ]
        },
        {
            "name": "Birds of paradise collector: Curtis Cray Esq",
            "cars": [
                {
                    "name": "CHEETAH",
                    "plate": "BUZZED"
                },
                {
                    "name": "TYRUS",
                    "plate": "CITRUS"
                },
                {
                    "name": "FMJ",
                    "plate": "CATCHME"
                },
                {
                    "name": "ENTITY XF",
                    "plate": "OVERFLOD"
                }
            ]
        },
        {
            "name": "Fading Power Collector: Keith Collins MD",
            "cars": [
                {
                    "name": "COQUETTE BLACKFIN",
                    "plate": "VINTAGE"
                },
                {
                    "name": "NIGHTSHADE",
                    "plate": "TH370S"
                }
            ]
        },
        {
            "name": "No Direct Sunlight Collector: DJ Playlist",
            "cars": [
                {
                    "name": "FELTZER",
                    "plate": "POWERFUL"
                },
                {
                    "name": "811",
                    "plate": "SLICK"
                },
                {
                    "name": "BESTIA GTS",
                    "plate": "BEASTY"
                }
            ]
        },
        {
            "name": "Stay Declasse Collector: MS. M Schultz",
            "cars": [
                {
                    "name": "SABRE TURBO CUSTOM",
                    "plate": "BOUNCE"
                },
                {
                    "name": "TAMPA",
                    "plate": "CHARGED"
                },
                {
                    "name": "MAMBA",
                    "plate": "BLACKMAMBA"
                }
            ]
        },
        {
            "name": "Molten Metal Collector: Ronnie Bonelli",
            "cars": [
                {
                    "name": "ALPHA",
                    "plate": "VISIONARY"
                },
                {
                    "name": "REAPER",
                    "plate": "DEATH4U"
                },
                {
                    "name": "MASSACRO",
                    "plate": "BOSS"
                },
                {
                    "name": "ZENTORNO",
                    "plate": "WINNING"
                }
            ]
        },
        {
            "name": "Pastel Perfection Collector: Cloe Parker",
            "cars": [
                {
                    "name": "COQUETTE CLASSIC",
                    "plate": "TOPLESS"
                },
                {
                    "name": "VERLIERER",
                    "plate": "PRECIOUS"
                },
                {
                    "name": "ETR1",
                    "plate": "PRETTY"
                }
            ]
        },
        {
            "name": "Hip to be Square Collector: Tao Cheng",
            "cars": [
                {
                    "name": "OMNIS",
                    "plate": "WIDEBOD"
                },
                {
                    "name": "TROPOS RALLYE",
                    "plate": "1985"
                },
                {
                    "name": "JESTER",
                    "plate": "NOFOOL"
                },
                {
                    "name": "SULTAN RS",
                    "plate": "SNOWFLKE"
                }
            ]
        },
        {
            "name": "Cris Formage",
            "cars": [
                {
                    "name": "BANSHEE 900R",
                    "plate": "DRIFTER"
                },
                {
                    "name": "STIRLING GT",
                    "plate": "RALLY"
                },
                {
                    "name": "SEVEN-70",
                    "plate": "ALLOY5"
                },
                {
                    "name": "TURISMO R",
                    "plate": "TPD4WG"
                }
            ]
        },
        {
            "name": "End of the Empires Collector: The Sultan of Amir",
            "cars": [
                {
                    "name": "Z-TYPE",
                    "plate": "BIG MONEY"
                },
                {
                    "name": "ROOSEVELT VALOR",
                    "plate": "OLD TIMER"
                }
            ]
        }
    ],
    "cars": [
        {
            "name": "Sabre Turbo Custom",
            "plate": "0R1G1N4L",
            "range": ""
        },
        {
            "name": "Tropos Rallye",
            "plate": "1MSORAD",
            "range": "Mid"
        },
        {
            "name": "Reaper",
            "plate": "2FA5T4U",
            "range": "Top"
        },
        {
            "name": "Tropos Rallye",
            "plate": "31GHT135",
            "range": "Mid"
        },
        {
            "name": "Sultan RS",
            "plate": "5H0W0FF",
            "range": "Mid"
        },
        {
            "name": "Bestia GTS",
            "plate": "5MOOTH",
            "range": "Standard"
        },
        {
            "name": "Bestia GTS",
            "plate": "5T34LTH",
            "range": "Standard"
        },
        {
            "name": "ETR1",
            "plate": "B1GBOY",
            "range": "Top"
        },
        {
            "name": "Cheetah",
            "plate": "B1GC4T",
            "range": "Mid"
        },
        {
            "name": "Tyrus",
            "plate": "B35TL4P",
            "range": "Top"
        },
        {
            "name": "Massacro",
            "plate": "B4N4N4",
            "range": "Mid"
        },
        {
            "name": "Cheetah",
            "plate": "BIGC47",
            "range": "Mid"
        },
        {
            "name": "T20",
            "plate": "CAR4M3L",
            "range": "Top"
        },
        {
            "name": "Z-Type",
            "plate": "CEO",
            "range": "Top"
        },
        {
            "name": "Coquette Classic",
            "plate": "CL455Y",
            "range": "Mid"
        },
        {
            "name": "Tampa",
            "plate": "CRU151N",
            "range": "Standard"
        },
        {
            "name": "Verlierer",
            "plate": "CURV35",
            "range": "Mid"
        },
        {
            "name": "Banshee 900R",
            "plate": "D0M1N0",
            "range": "Standard"
        },
        {
            "name": "Omnis",
            "plate": "D1RTY",
            "range": "Mid"
        },
        {
            "name": "Nightshade",
            "plate": "DE4DLY",
            "range": "Standard"
        },
        {
            "name": "Nightshade",
            "plate": "E4TME",
            "range": "Standard"
        },
        {
            "name": "Sultan RS",
            "plate": "F1D3L1TY",
            "range": "Mid"
        },
        {
            "name": "Seven-70",
            "plate": "FRU1TY",
            "range": "Mid"
        },
        {
            "name": "X80 Proto",
            "plate": "FUTUR3",
            "range": "Top"
        },
        {
            "name": "Reaper",
            "plate": "GRIM",
            "range": "Top"
        },
        {
            "name": "Sabre Turbo Custom",
            "plate": "GUNZOUT",
            "range": "Standard"
        },
        {
            "name": "Zentorno",
            "plate": "H3RO",
            "range": "Mid"
        },
        {
            "name": "FMJ",
            "plate": "HOT4U",
            "range": "Top"
        },
        {
            "name": "Jester",
            "plate": "HOTP1NK",
            "range": "Standard"
        },
        {
            "name": "Banshee 900R",
            "plate": "HOWL3R",
            "range": "Standard"
        },
        {
            "name": "Entity XF",
            "plate": "IML4T3",
            "range": "Mid"
        },
        {
            "name": "Turismo R",
            "plate": "IN4H4ZE",
            "range": "Standard"
        },
        {
            "name": "FMJ",
            "plate": "JOK3R",
            "range": "Top"
        },
        {
            "name": "Z-Type",
            "plate": "K1NGP1N",
            "range": "Top"
        },
        {
            "name": "Feltzer",
            "plate": "K3YL1M3",
            "range": "Standard"
        },
        {
            "name": "Roosevelt Valor",
            "plate": "L4WL355",
            "range": "Top"
        },
        {
            "name": "Alpha",
            "plate": "LONG80Y",
            "range": "Standard"
        },
        {
            "name": "811_",
            "plate": "M1DLIFE",
            "range": "Top"
        },
        {
            "name": "Cheetah",
            "plate": "M1DN1GHT",
            "range": "Mid"
        },
        {
            "name": "Turismo R",
            "plate": "M1LKYW4Y",
            "range": "Standard"
        },
        {
            "name": "ETR1",
            "plate": "MON4RCH",
            "range": "Top"
        },
        {
            "name": "Tampa",
            "plate": "MU5CL3",
            "range": "Standard"
        },
        {
            "name": "Omnis",
            "plate": "OBEYM3",
            "range": "Mid"
        },
        {
            "name": "Osiris",
            "plate": "OH3LLO",
            "range": "Top"
        },
        {
            "name": "Mamba",
            "plate": "OLDBLU3",
            "range": "Top"
        },
        {
            "name": "Zentorno",
            "plate": "OLDN3W5",
            "range": "Mid"
        },
        {
            "name": "Verlierer",
            "plate": "OUTFRONT",
            "range": "Mid"
        },
        {
            "name": "Omnis",
            "plate": "PH4R4OH",
            "range": "Top"
        },
        {
            "name": "Alpha",
            "plate": "R31GN",
            "range": ""
        },
        {
            "name": "811_",
            "plate": "R3G4L",
            "range": "Top"
        },
        {
            "name": "Feltzer",
            "plate": "R4C3R",
            "range": "Standard"
        },
        {
            "name": "Seven-70",
            "plate": "SP33DY",
            "range": "Mid"
        },
        {
            "name": "Coquette Classic",
            "plate": "T0FF33",
            "range": "Mid"
        },
        {
            "name": "Jester",
            "plate": "TOPCLOWN",
            "range": "Standard"
        },
        {
            "name": "T20",
            "plate": "TOPSP33D",
            "range": ""
        },
        {
            "name": "Stirling GT",
            "plate": "TOUR3R",
            "range": "Top"
        },
        {
            "name": "Tyrus",
            "plate": "TR3X",
            "range": "Top"
        },
        {
            "name": "Massacro",
            "plate": "TROP1CAL",
            "range": "Standard"
        },
        {
            "name": "X80 Proto",
            "plate": "TURBO",
            "range": "Top"
        },
        {
            "name": "Mamba",
            "plate": "V1P",
            "range": "Top"
        },
        {
            "name": "Roosevelt Valor",
            "plate": "V4LOR",
            "range": "Top"
        },
        {
            "name": "Omnis",
            "plate": "W1D3B0D",
            "range": "Top"
        },
        {
            "name": "Coquette BlackFin",
            "plate": "W1P3OUT",
            "range": "Mid"
        }
    ]
};


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map