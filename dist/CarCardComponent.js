"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CarCardProps = (function () {
    function CarCardProps() {
    }
    return CarCardProps;
}());
exports.CarCardProps = CarCardProps;
var CarCard = (function (_super) {
    __extends(CarCard, _super);
    function CarCard(props, context) {
        return _super.call(this, props, context) || this;
    }
    CarCard.prototype.render = function () {
        return React.createElement("div", { className: "col-sm-4" },
            React.createElement("div", { className: "card" },
                React.createElement("div", { className: "card-block" },
                    React.createElement("h3", { className: "card-title" }, this.props.car.getNameCapitalized()),
                    React.createElement("p", { className: "card-text" },
                        "Plate: ",
                        this.props.car.getPlateCapitalized()),
                    React.createElement("a", { href: "#", className: "btn btn-primary" }, "Mark collected"))));
    };
    return CarCard;
}(React.Component));
exports.CarCard = CarCard;
//# sourceMappingURL=CarCardComponent.js.map