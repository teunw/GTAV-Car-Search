"use strict";
var Car = (function () {
    function Car(name, plate, collected) {
        this.collected = false;
        this.name = name;
        this.plate = plate;
        this.collected = collected;
    }
    Car.prototype.getNameCapitalized = function () {
        return this.name.slice(0, 1).toUpperCase() + this.name.slice(1).toLowerCase();
    };
    Car.prototype.getPlateCapitalized = function () {
        return this.plate.slice(0, 1).toUpperCase() + this.plate.slice(1).toLowerCase();
    };
    Car.prototype.createKey = function () {
        return this.name + this.plate;
    };
    return Car;
}());
exports.Car = Car;
var CarRetriever = (function () {
    function CarRetriever() {
    }
    CarRetriever.GetCars = function () {
        var result = jQuery.Deferred();
        var cars = jQuery.get("/cars.json");
        cars.then(function (data) {
            var parsed = [];
            data.cars.forEach(function (car) {
                parsed.push(new Car(car.name, car.plate, false));
            });
            result.resolve(parsed);
        });
        cars.fail(function () { return result.reject([]); });
        return result.promise();
    };
    return CarRetriever;
}());
exports.CarRetriever = CarRetriever;
//# sourceMappingURL=Classes.js.map