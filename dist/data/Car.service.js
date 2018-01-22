"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Data_1 = require("./Data");
var Collection_1 = require("./Collection");
var CarService = /** @class */ (function () {
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
//# sourceMappingURL=Car.service.js.map