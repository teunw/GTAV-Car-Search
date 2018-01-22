"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Car = /** @class */ (function () {
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
//# sourceMappingURL=Car.js.map