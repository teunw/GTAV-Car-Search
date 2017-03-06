import {Car, ICar} from "./Car";
export class Collection {

    public name: string;
    public cars: Car[];

    constructor(name: string, cars: ICar[]) {
        this.name = name;
        this.cars = cars.map(Collection.constructCar);
    }

    public IsCompletelyCollected(): boolean {
        return this.cars.every((car) => car.IsCollected());
    }

    public IsPartlyCollected(): boolean {
        return this.GetAmountCollected() > 0;
    }

    public IsUncollected() {
        return this.GetAmountCollected() != this.cars.length;
    }

    public GetAmountCollected() {
        return this.cars.filter((c) => c.IsCollected()).length
    }

    public GetTotalCars() {
        return this.cars.length;
    }

    public GetBonus() {
        return 20000 + (15000 * (this.GetTotalCars() - 2));
    }

    public GetBonusText() {
        const bonus = this.GetBonus().toString();
        return `${bonus.slice(0, 2)}.${bonus.slice(2, 9999)}`;
    }

    public Search(query: string): boolean {
        if (query == undefined) return true;
        query = query.toLowerCase();
        let carSearch = this.cars.filter((c) => c.Search(query)).length > 0;
        let collectionSearch = this.name.toLowerCase().indexOf(query) != -1;

        return carSearch || collectionSearch;
    }

    public static constructCar(car: ICar): Car {
        return new Car(car.name, car.plate);
    }

    public static constructCollections(icollections: ICollection[]): Collection[] {
        let collections: Collection[] = [];
        icollections.forEach((icoll:ICollection)=> {
            collections.push(new Collection(icoll.name, icoll.cars));
        });
        return collections;
    }
}
export interface ICollection {
    name: string;
    cars: ICar[];
}