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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var Classes_1 = __webpack_require__(3);
	var CollectionComponent_1 = __webpack_require__(4);
	var CarCargoMakerState = (function () {
	    function CarCargoMakerState() {
	        this.collections = [];
	        this.search = "";
	    }
	    return CarCargoMakerState;
	}());
	exports.CarCargoMakerState = CarCargoMakerState;
	var CargoMarker = (function (_super) {
	    __extends(CargoMarker, _super);
	    function CargoMarker(props, context) {
	        var _this = _super.call(this, props, context) || this;
	        _this.state = new CarCargoMakerState();
	        _this.handleSearch = _this.handleSearch.bind(_this);
	        Classes_1.CarRetriever.AddRefreshListener(_this);
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
	    CargoMarker.prototype.render = function () {
	        var _this = this;
	        if (this.state.collections.length == 0) {
	            Classes_1.CarRetriever
	                .GetCollections()
	                .done(function (collections) {
	                _this.setState({ collections: collections });
	            });
	        }
	        var notCollectedCars = this.state.collections.filter(function (collection) { return !collection.IsCompletelyCollected() && collection.Search(_this.state.search); });
	        var collectedCars = this.state.collections.filter(function (collection) { return collection.IsPartlyCollected() && collection.Search(_this.state.search); });
	        var notCollected = notCollectedCars.map(function (nc) { return React.createElement(CollectionComponent_1.CollectionComponent, { key: "list_nc_" + nc.name, showCollected: false, collection: nc }); });
	        var collected = collectedCars.map(function (c) { return React.createElement(CollectionComponent_1.CollectionComponent, { key: "list_c_" + c.name, showCollected: true, collection: c }); });
	        return (React.createElement("div", { id: "list" },
	            React.createElement("input", { type: "text", className: "form-control", placeholder: "Search", value: this.state.search, onChange: this.handleSearch }),
	            React.createElement("h2", null, "Not collected cars"),
	            notCollected,
	            React.createElement("hr", null),
	            React.createElement("h2", null, "Collected"),
	            collected));
	    };
	    return CargoMarker;
	}(React.Component));
	exports.CargoMarker = CargoMarker;
	ReactDOM.render(React.createElement(CargoMarker, null), document.getElementById("content"));


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports) {

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
	        return this.name.toLowerCase().indexOf(query.toLowerCase()) != -1 || this.plate.toLowerCase().indexOf(query.toLowerCase()) != -1;
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
	        this.cars = cars.map(this.constructCar);
	    }
	    Collection.prototype.IsCompletelyCollected = function () {
	        return this.cars.every(function (car) { return car.IsCollected(); });
	    };
	    Collection.prototype.IsPartlyCollected = function () {
	        return this.cars.filter(function (c) { return c.IsCollected(); }).length > 0;
	    };
	    Collection.prototype.Search = function (query) {
	        query = query.toLowerCase();
	        var carSearch = this.cars.filter(function (c) { return c.Search(query); }).length > 0;
	        var collectionSearch = this.name.toLowerCase().indexOf(query) != -1;
	        return carSearch || collectionSearch;
	    };
	    Collection.prototype.constructCar = function (car) {
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var CarCardComponent_1 = __webpack_require__(5);
	var CollectionComponent = (function (_super) {
	    __extends(CollectionComponent, _super);
	    function CollectionComponent() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.RowLength = 3;
	        return _this;
	    }
	    CollectionComponent.prototype.render = function () {
	        var _this = this;
	        var collection = this.props.collection;
	        var carCards = collection.cars.filter(function (c) { return c.IsCollected() == _this.props.showCollected; }).map(function (c) { return React.createElement(CarCardComponent_1.CarCard, { key: c.createKey(), car: c }); });
	        var rows = [];
	        for (var i = 0; i < carCards.length; i += this.RowLength) {
	            var element = React.createElement("div", { key: collection.name + i, className: "row" },
	                carCards[i],
	                carCards[i + 1],
	                carCards[i + 2]);
	            rows.push(element);
	        }
	        return (React.createElement("div", { id: collection.name },
	            React.createElement("h3", null, collection.name),
	            rows,
	            React.createElement("hr", null)));
	    };
	    return CollectionComponent;
	}(React.Component));
	exports.CollectionComponent = CollectionComponent;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var Classes_1 = __webpack_require__(3);
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
	        return React.createElement("div", { className: "col-sm-4" },
	            React.createElement("div", { className: "card" },
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map