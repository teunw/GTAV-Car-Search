export class Car implements ICar {
    public name: string;
    public plate: string;

    constructor(name: string, plate: string) {
        this.name = name;
        this.plate = plate;
    }

    public IsCollected() {
        return localStorage.getItem(this.createKey()) == "true";
    }

    public SetCollected(collected: boolean) {
        localStorage.setItem(this.createKey(), String(collected));
    }

    public ToggleCollected():void{
        this.SetCollected(!this.IsCollected());
        console.log(this.IsCollected());
    }

    public getNameCapitalized() {
        return this.name.slice(0, 1).toUpperCase() + this.name.slice(1).toLowerCase();
    }

    public getPlateCapitalized() {
        return this.plate.slice(0, 1).toUpperCase() + this.plate.slice(1).toLowerCase();
    }

    public Search(query: string): boolean {
        if (query.trim() == "") return true;

        let removel33tspelling = query
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
        let l33tSearch = this.plate.toLowerCase().indexOf(removel33tspelling) != -1;
        let nameSearch = this.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
        let plateSearch = this.plate.toLowerCase().indexOf(query.toLowerCase()) != -1;

        return l33tSearch || nameSearch || plateSearch;
    }

    public createKey() {
        return this.name + this.plate;
    }
}
export interface ICar {
    name : string;
    plate : string;
}
