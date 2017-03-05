import {ICollection, Collection} from "./Collection";
import {Car, ICar} from "./Car";
export interface IDataReturn<T> {
    OnDataReturned(data:T):void;
}
export class CarService {

    public static getCollections(arr:Function) {
        this.getData(function (d:any) {
            const collections = Collection.constructCollections(d.collections as ICollection[]);
            arr(collections);
        });
    }

    private static getData(f:Function) {
        let xmlhttp = new XMLHttpRequest();
        let url = "./cars.json";

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const obj = JSON.parse(this.responseText);
                f(obj);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    public static getCars(f:Function) {
        this.getData(function (d:any) {
            const cars = d.cars.map((ic:ICar) => Collection.constructCar(ic));
            f(cars);
        });
    }

    public static getCarRows(cars:Car[], rowLength : number = 8):Car[][] {
        let newArr : Car[][] = [];
        let tempArr : Car[] = [];
        cars.forEach(c => {
            if (tempArr.length >= rowLength) {
                newArr.push(tempArr);
                tempArr = [];
            }
            tempArr.push(c);
        });
        newArr.push(tempArr);
        return newArr;
    }
}