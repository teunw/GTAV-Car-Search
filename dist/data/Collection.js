"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Car_1 = require("./Car");
var Collection = /** @class */ (function () {
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
//# sourceMappingURL=Collection.js.map