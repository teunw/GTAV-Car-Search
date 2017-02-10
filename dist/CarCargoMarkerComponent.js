"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ReactDOM = require("react-dom");
var CarCargoMakerState = (function () {
    function CarCargoMakerState() {
        this.cars = [];
    }
    return CarCargoMakerState;
}());
exports.CarCargoMakerState = CarCargoMakerState;
var CarCargoMakerComponent = (function (_super) {
    __extends(CarCargoMakerComponent, _super);
    function CarCargoMakerComponent(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = new CarCargoMakerState();
        return _this;
    }
    CarCargoMakerComponent.prototype.render = function () {
        var _this = this;
        if (this.state.cars.length == 0) {
            CarRetriever
                .GetCars()
                .done(function (retrievedCars) {
                _this.setState({ cars: retrievedCars });
            });
        }
        console.log(this.state.cars);
        var mapper = this.state.cars.map(function (car) { return React.createElement(CarCard, { key: car.createKey(), car: car }); });
        var rows = mapper.length / 3;
        var elements = [];
        for (var i = 0; i < rows; i++) {
            var row = React.createElement("div", { className: "row" },
                mapper[i],
                mapper[i + 1],
                mapper[i + 2]);
            elements.push(row);
        }
        return (React.createElement("div", { id: "list" }, elements));
    };
    return CarCargoMakerComponent;
}(React.Component));
exports.CarCargoMakerComponent = CarCargoMakerComponent;
ReactDOM.render(React.createElement(CarCargoMakerComponent, null), document.getElementById("content"));
//# sourceMappingURL=CarCargoMarkerComponent.js.map