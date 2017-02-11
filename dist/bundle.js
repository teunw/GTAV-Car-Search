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
	var CarListComponent_1 = __webpack_require__(4);
	var CarCargoMakerState = (function () {
	    function CarCargoMakerState() {
	        this.cars = [];
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
	        return _this;
	    }
	    CargoMarker.prototype.handleSearch = function (e) {
	        this.setState({
	            search: e.target.value
	        });
	    };
	    CargoMarker.prototype.render = function () {
	        var _this = this;
	        if (this.state.cars.length == 0) {
	            Classes_1.CarRetriever
	                .GetCars()
	                .done(function (retrievedCars) {
	                _this.setState({ cars: retrievedCars });
	            });
	        }
	        if (this.state.collections.length == 0) {
	            Classes_1.CarRetriever
	                .GetCollections()
	                .done(function (collections) {
	                _this.setState({ collections: collections });
	            });
	        }
	        var notCollectedCars = this.state.cars.filter(function (car) { return !car.IsCollected() && car.Search(_this.state.search); });
	        var collectedCars = this.state.cars.filter(function (car) { return car.IsCollected() && car.Search(_this.state.search); });
	        var notCollected = React.createElement(CarListComponent_1.CarListComponent, { key: "notCollected", cars: notCollectedCars, collections: this.state.collections, cargoMarker: this });
	        var collected = React.createElement(CarListComponent_1.CarListComponent, { key: "collected", cars: collectedCars, collections: this.state.collections, cargoMarker: this });
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
	    Car.prototype.findCollection = function (collection) {
	        var _this = this;
	        var foundCollection = null;
	        collection.forEach(function (collection) {
	            var index = collection.cars.indexOf(_this.name.toUpperCase());
	            if (index != -1) {
	                foundCollection = collection;
	                console.log(foundCollection);
	            }
	        });
	        return foundCollection;
	    };
	    return Car;
	}());
	exports.Car = Car;
	var Collection = (function () {
	    function Collection(name, cars, color) {
	        this.name = name;
	        this.cars = cars;
	        this.color = color;
	    }
	    return Collection;
	}());
	exports.Collection = Collection;
	var CarRetriever = (function () {
	    function CarRetriever() {
	    }
	    CarRetriever.GetCars = function () {
	        var result = $.Deferred();
	        var cars = $.get("./cars.json");
	        cars.then(function (data) {
	            var parsed = [];
	            data.cars.forEach(function (car) {
	                parsed.push(new Car(car.name, car.plate));
	            });
	            result.resolve(parsed);
	        });
	        cars.fail(function () { return result.reject([]); });
	        return result.promise();
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
	var CarListProps = (function () {
	    function CarListProps() {
	    }
	    return CarListProps;
	}());
	exports.CarListProps = CarListProps;
	var CarListComponent = (function (_super) {
	    __extends(CarListComponent, _super);
	    function CarListComponent() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    CarListComponent.prototype.refreshInfo = function () {
	        this.props.cargoMarker.forceUpdate();
	    };
	    CarListComponent.prototype.render = function () {
	        var _this = this;
	        var mapper = this.props.cars.map(function (car) { return React.createElement(CarCardComponent_1.CarCard, { key: car.createKey(), car: car, list: _this }); });
	        var elements = [];
	        for (var i = 0; i <= mapper.length; i += 3) {
	            var row = React.createElement("div", { className: "row", key: i },
	                mapper[i],
	                mapper[i + 1],
	                mapper[i + 2]);
	            elements.push(row);
	            elements.push(React.createElement("hr", null));
	        }
	        return React.createElement("div", { id: "list" }, elements);
	    };
	    return CarListComponent;
	}(React.Component));
	exports.CarListComponent = CarListComponent;


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
	        _this.Mark = _this.Mark.bind(_this);
	        return _this;
	    }
	    CarCard.prototype.Mark = function (car) {
	        Classes_1.CarRetriever.SetCarStorage(car, !car.IsCollected());
	        this.props.list.refreshInfo();
	    };
	    CarCard.prototype.GetBackgroundColor = function () {
	        var car = this.props.car;
	        var collections = this.props.list.props.collections;
	        var carCollection = car.findCollection(collections);
	        return carCollection == null ? "#FFF" : carCollection.color;
	    };
	    CarCard.prototype.render = function () {
	        var _this = this;
	        var divStyle = {
	            "backgroundColor": this.GetBackgroundColor(),
	            "color": "#EEE"
	        };
	        return React.createElement("div", { className: "col-sm-4" },
	            React.createElement("div", { className: "card", style: divStyle },
	                React.createElement("div", { className: "card-block" },
	                    React.createElement("h3", { className: "card-title" }, this.props.car.getNameCapitalized()),
	                    React.createElement("p", { className: "card-text" },
	                        "Plate: ",
	                        this.props.car.getPlateCapitalized()),
	                    React.createElement("button", { className: "btn btn-primary", onClick: function () { return _this.Mark(_this.props.car); } }, this.props.car.IsCollected() ? "Put back" : "Mark collected"))));
	    };
	    return CarCard;
	}(React.Component));
	exports.CarCard = CarCard;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map