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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Car = (function () {
    function Car(name, plate) {
        this.name = name;
        this.plate = plate;
    }
    Car.prototype.IsCollected = function () {
        return CarRetriever.GetCarStorage(this);
    };
    Car.prototype.SetCollected = function (collected) {
        CarRetriever.SetCarStorage(this, collected);
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
var Collection = (function () {
    function Collection(name, cars, color) {
        this.name = name;
        this.color = color;
        this.cars = cars.map(Collection.constructCar);
    }
    Collection.prototype.IsCompletelyCollected = function () {
        return this.cars.every(function (car) { return car.IsCollected(); });
    };
    Collection.prototype.IsPartlyCollected = function () {
        return this.GetAmountCollected() > 0;
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
        query = query.toLowerCase();
        var carSearch = this.cars.filter(function (c) { return c.Search(query); }).length > 0;
        var collectionSearch = this.name.toLowerCase().indexOf(query) != -1;
        return carSearch || collectionSearch;
    };
    Collection.constructCar = function (car) {
        return new Car(car.name, car.plate);
    };
    return Collection;
}());
exports.Collection = Collection;
var CarRetriever = (function () {
    function CarRetriever() {
    }
    CarRetriever.AddRefreshListener = function (refreshListener) {
        this.RefreshListeners.push(refreshListener);
    };
    CarRetriever.RemoveRefreshListener = function (refreshListener) {
        var index = this.RefreshListeners.indexOf(refreshListener);
        this.RefreshListeners = this.RefreshListeners.splice(index, 1);
    };
    CarRetriever.TriggerRefresh = function () {
        var _this = this;
        this.GetCollections().then(function (c) {
            _this.RefreshListeners.forEach(function (r) { return r.onRefresh(c); });
        });
    };
    CarRetriever.GetCollections = function () {
        var result = $.Deferred();
        var cars = $.get("./cars.json");
        cars.then(function (data) {
            var parsed = [];
            data.collections.forEach(function (collection) {
                parsed.push(new Collection(collection.name, collection.cars, collection.color));
            });
            result.resolve(parsed);
        });
        cars.fail(function () { return result.reject([]); });
        return result.promise();
    };
    CarRetriever.GetCarStorage = function (cars) {
        return localStorage.getItem(cars.createKey()) == "true";
    };
    CarRetriever.SetCarStorage = function (car, bool) {
        localStorage.setItem(car.createKey(), String(bool));
    };
    return CarRetriever;
}());
CarRetriever.RefreshListeners = [];
exports.CarRetriever = CarRetriever;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = __webpack_require__(0);
var CarCardComponent_1 = __webpack_require__(5);
var CollectionComponent = (function (_super) {
    __extends(CollectionComponent, _super);
    function CollectionComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.RowLength = 3;
        _this.NotCollectedColor = "#FFEBEE";
        _this.CollectedColor = "#E8F5E9";
        return _this;
    }
    CollectionComponent.prototype.render = function () {
        var _this = this;
        var collection = this.props.collection;
        var cars = this.props.collection.cars;
        if (this.props.hideCollected) {
            cars = cars.filter(function (c) { return !c.IsCollected(); });
        }
        if (this.props.hideUncollected) {
            cars = cars.filter(function (c) { return c.IsCollected(); });
        }
        var carCards = cars.map(function (c) { return React.createElement(CarCardComponent_1.CarCard, { key: c.createKey(), car: c, backgroundColor: c.IsCollected() ? _this.CollectedColor : _this.NotCollectedColor }); });
        var rows = [];
        for (var i = 0; i < carCards.length; i += this.RowLength) {
            var element = React.createElement("div", { key: collection.name + i, className: "row" },
                carCards[i],
                carCards[i + 1],
                carCards[i + 2]);
            rows.push(element);
        }
        return (React.createElement("div", { id: collection.name, className: "" },
            React.createElement("h3", null, collection.name),
            rows,
            React.createElement("br", null),
            React.createElement("h5", null,
                collection.GetAmountCollected(),
                " / ",
                collection.GetTotalCars(),
                " collected"),
            React.createElement("h5", null,
                "$",
                collection.GetBonusText(),
                " bonus"),
            React.createElement("hr", null)));
    };
    return CollectionComponent;
}(React.Component));
exports.CollectionComponent = CollectionComponent;


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = __webpack_require__(0);
var Classes_1 = __webpack_require__(1);
var CarCardProps = (function () {
    function CarCardProps() {
    }
    return CarCardProps;
}());
exports.CarCardProps = CarCardProps;
var CarCard = (function (_super) {
    __extends(CarCard, _super);
    function CarCard(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.onButtonClicked = _this.onButtonClicked.bind(_this);
        return _this;
    }
    CarCard.prototype.onButtonClicked = function () {
        var car = this.props.car;
        car.SetCollected(!car.IsCollected());
        Classes_1.CarRetriever.TriggerRefresh();
    };
    CarCard.prototype.render = function () {
        var _this = this;
        var style = {
            "backgroundColor": this.props.backgroundColor
        };
        return React.createElement("div", { className: "col-sm-4" },
            React.createElement("div", { className: "card", style: style },
                React.createElement("div", { className: "card-block" },
                    React.createElement("h3", { className: "card-title" }, this.props.car.getNameCapitalized()),
                    React.createElement("p", { className: "card-text" },
                        "Plate: ",
                        this.props.car.getPlateCapitalized()),
                    React.createElement("button", { className: "btn btn-primary", onClick: function () { return _this.onButtonClicked(); } }, this.props.car.IsCollected() ? "Put back" : "Mark collected"))));
    };
    return CarCard;
}(React.Component));
exports.CarCard = CarCard;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(4);
var Classes_1 = __webpack_require__(1);
var CollectionComponent_1 = __webpack_require__(2);
var SearchComponent_1 = __webpack_require__(7);
var CarCargoMakerState = (function () {
    function CarCargoMakerState() {
        this.collections = [];
        this.search = "";
        this.hideUncollected = false;
        this.hideCollected = false;
    }
    return CarCargoMakerState;
}());
exports.CarCargoMakerState = CarCargoMakerState;
var CargoMarker = (function (_super) {
    __extends(CargoMarker, _super);
    function CargoMarker(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = new CarCargoMakerState();
        Classes_1.CarRetriever.AddRefreshListener(_this);
        _this.handleSearch = _this.handleSearch.bind(_this);
        _this.handleHideUncollected = _this.handleHideUncollected.bind(_this);
        _this.handleHideCollected = _this.handleHideCollected.bind(_this);
        return _this;
    }
    CargoMarker.prototype.onRefresh = function (collections) {
        this.setState({
            collections: collections
        });
    };
    CargoMarker.prototype.handleSearch = function (e) {
        this.setState({
            search: e.target.value
        });
    };
    CargoMarker.prototype.handleHideUncollected = function (e) {
        this.setState({
            hideUncollected: e
        });
    };
    CargoMarker.prototype.handleHideCollected = function (e) {
        this.setState({
            hideCollected: e
        });
    };
    CargoMarker.prototype.render = function () {
        var _this = this;
        if (this.state.collections.length == 0) {
            Classes_1.CarRetriever
                .GetCollections()
                .done(function (collections) {
                _this.setState({ collections: collections });
            });
        }
        var notCollectedCars = this.state.collections.filter(function (collection) { return collection.Search(_this.state.search); });
        var notCollected = notCollectedCars.map(function (nc) { return React.createElement(CollectionComponent_1.CollectionComponent, { key: "list" + nc.name, hideCollected: _this.state.hideCollected, hideUncollected: _this.state.hideUncollected, collection: nc }); });
        return (React.createElement("div", { id: "list" },
            React.createElement(SearchComponent_1.SearchComponent, { handleSearch: this.handleSearch, handleHideCollected: this.handleHideCollected, handleHideUncollected: this.handleHideUncollected }),
            React.createElement("div", { className: "card" },
                React.createElement("h3", { className: "card-header text-danger" }, "Not Collected"),
                React.createElement("div", { className: "card-block" }, notCollected))));
    };
    return CargoMarker;
}(React.Component));
exports.CargoMarker = CargoMarker;
ReactDOM.render(React.createElement(CargoMarker, null), document.getElementById("content"));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = __webpack_require__(0);
var SearchState = (function () {
    function SearchState() {
        this.hideCollected = false;
        this.hideUncollected = false;
    }
    return SearchState;
}());
exports.SearchState = SearchState;
var SearchComponent = (function (_super) {
    __extends(SearchComponent, _super);
    function SearchComponent(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = new SearchState();
        _this.handleCollectedCheckbox = _this.handleCollectedCheckbox.bind(_this);
        _this.handleUncollectedCheckbox = _this.handleUncollectedCheckbox.bind(_this);
        return _this;
    }
    SearchComponent.prototype.handleUncollectedCheckbox = function (e) {
        e.persist();
        this.setState(function (prev) { return ({ hideUncollected: e.target.checked }); });
        this.props.handleHideUncollected(!this.state.hideUncollected);
        console.log(this.state.hideUncollected);
    };
    SearchComponent.prototype.handleCollectedCheckbox = function (e) {
        e.persist();
        this.setState(function (prev) { return ({ hideCollected: e.target.checked }); });
        this.props.handleHideCollected(!this.state.hideCollected);
        console.log(this.state.hideCollected);
    };
    SearchComponent.prototype.render = function () {
        return (React.createElement("div", { className: "card" },
            React.createElement("div", { className: "card-block" },
                React.createElement("input", { className: "form-control mr-sm-2", type: "text", placeholder: "Search", onChange: this.props.handleSearch }),
                React.createElement("label", { className: "custom-control custom-checkbox" },
                    React.createElement("input", { type: "checkbox", className: "custom-control-input", checked: this.state.hideCollected, onChange: this.handleCollectedCheckbox }),
                    React.createElement("span", { className: "custom-control-indicator" }),
                    React.createElement("span", { className: "custom-control-description" }, "Hide collected cars")),
                React.createElement("label", { className: "custom-control custom-checkbox" },
                    React.createElement("input", { type: "checkbox", className: "custom-control-input", checked: this.state.hideUncollected, onChange: this.handleUncollectedCheckbox }),
                    React.createElement("span", { className: "custom-control-indicator" }),
                    React.createElement("span", { className: "custom-control-description" }, "Hide uncollected cars")))));
    };
    return SearchComponent;
}(React.Component));
exports.SearchComponent = SearchComponent;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map