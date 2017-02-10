import * as React from "react";
import * as ReactDOM from "react-dom";
import * as $ from "jquery";
import {Car, CarRetriever} from "./Classes";
import {CarListComponent} from "./CarListComponent";
import FormEvent = React.FormEvent;

export class CarCargoMakerState {
    public cars: Car[] = [];
    public search : string = "";
}

export class CargoMarker extends React.Component<{}, CarCargoMakerState> {

    constructor(props: {}, context: any) {
        super(props, context);
        this.state = new CarCargoMakerState();
        this.handleSearch = this.handleSearch.bind(this);
    }

    public handleSearch(e:any) {
        this.setState({
            search: e.target.value
        });
    }

    render() {
        if (this.state.cars.length == 0) {
            CarRetriever
                .GetCars()
                .done((retrievedCars: Car[]) => {
                    this.setState({cars: retrievedCars});
                });
        }

        let notCollectedCars = this.state.cars.filter((car: Car) => !car.IsCollected() && car.Search(this.state.search));
        let collectedCars = this.state.cars.filter((car: Car) => car.IsCollected() && car.Search(this.state.search));

        let notCollected = <CarListComponent key="notCollected" cars={notCollectedCars} cargoMarker={this} />;
        let collected = <CarListComponent key="collected" cars={collectedCars} cargoMarker={this} />;

        return (
            <div id="list">

                <input type="text" className="form-control" placeholder="Search" value={this.state.search} onChange={this.handleSearch}/>
                <h2>Not collected cars</h2>
                {notCollected}
                <hr/>
                <h2>Collected</h2>
                {collected}
            </div>);
    }

}

ReactDOM.render(
    <CargoMarker />,
    document.getElementById("content")
);