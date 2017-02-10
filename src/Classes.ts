export class Car {
    public name: string;
    public plate: string;

    constructor(name: string, plate: string) {
        this.name = name;
        this.plate = plate;
    }

    public IsCollected() {
        return CarRetriever.GetCarStorage(this);
    }

    public SetCollected(collected:boolean) {
        CarRetriever.SetCarStorage(this, collected);
    }

    public getNameCapitalized() {
        return this.name.slice(0, 1).toUpperCase() + this.name.slice(1).toLowerCase();
    }

    public getPlateCapitalized() {
        return this.plate.slice(0, 1).toUpperCase() + this.plate.slice(1).toLowerCase();
    }

    public Search(query:string) : boolean {
        if (query.trim() == "") return true;
        return this.name.toLowerCase().indexOf(query.toLowerCase()) != -1 || this.plate.toLowerCase().indexOf(query.toLowerCase()) != -1;
    }

    public createKey() {
        return this.name + this.plate;
    }
}
export class CarRetriever {

    static GetCars(): JQueryPromise<Car[]> {
        const result = jQuery.Deferred<Car[]>();
        const cars = jQuery.get("./cars.json");
        cars.then((data: any) => {
            const parsed: Car[] = [];
            data.cars.forEach((car: any) => {
                parsed.push(new Car(car.name, car.plate));
            });
            result.resolve(parsed);
        });
        cars.fail(() => result.reject([]));

        return result.promise();
    }

    static GetCarStorage(cars:Car) : boolean {
        return localStorage.getItem(cars.createKey()) == "true";
    }

    static SetCarStorage(car:Car, bool:boolean) {
        localStorage.setItem(car.createKey(), String(bool));
    }
}