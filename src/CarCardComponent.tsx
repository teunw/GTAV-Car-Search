import * as React from "react";
import {Car, CarRetriever} from "./Classes";
import {CarListComponent} from "./CarListComponent";
export class CarCardProps {
    public car: Car;
    public list : CarListComponent;
}

export class CarCard extends React.Component<CarCardProps, {}> {

    constructor(props: CarCardProps, context: any) {
        super(props, context);
        this.Mark = this.Mark.bind(this);
    }

    public Mark(car:Car) {
        CarRetriever.SetCarStorage(car, !car.IsCollected());
        this.props.list.refreshInfo();
        console.log("info");
    }

    render() {
        return <div className="col-sm-4">
            <div className="card">
                <div className="card-block">
                    <h3 className="card-title">{this.props.car.getNameCapitalized()}</h3>
                    <p className="card-text">Plate: {this.props.car.getPlateCapitalized()}</p>
                    <button className="btn btn-primary" onClick={() => this.Mark(this.props.car)}>{this.props.car.IsCollected() ? "Put back" : "Mark collected"}</button>
                </div>
            </div>
        </div>;
    }
}