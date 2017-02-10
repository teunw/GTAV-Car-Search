import * as React from "react";
import {Car} from "./Classes";
import {CarCard} from "./CarCardComponent";
import {CargoMarker} from "./CargoMarker";
export class CarListProps {
    cars : Car[];
    cargoMarker : CargoMarker;
}
export class CarListComponent extends React.Component<CarListProps, {}> {

    public refreshInfo() {
        this.props.cargoMarker.forceUpdate();
    }

    render() {
        let mapper = this.props.cars.map((car: Car) => <CarCard key={car.createKey()} car={car} list={this} />);
        let elements = [];
        for (let i = 0; i <= mapper.length; i += 3) {
            const row = <div className="row" key={i}>{mapper[i]}{mapper[i + 1]}{mapper[i + 2]}</div>;
            elements.push(row);
        }
        return <div id="list">{elements}</div>
    }
}