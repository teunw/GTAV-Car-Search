import * as React from "react";
import {Car, CarRetriever} from "./Classes";
export class  CarCardProps {
    car: Car;
    color : string = "#222";
    textColor? : string = "#EEE";
}

export class CarCard extends React.Component<CarCardProps, {}> {

    constructor(props: CarCardProps, context: any) {
        super(props, context);
        this.onButtonClicked = this.onButtonClicked.bind(this);
    }

    private onButtonClicked() {
        const car = this.props.car;
        car.SetCollected(!car.IsCollected());
        CarRetriever.TriggerRefresh();
    }

    render() {
        const divStyle = {
            backgroundColor: this.props.color,
            color: "#EEE"
        };
        return <div className="col-sm-4">
            <div className="card" style={divStyle}>
                <div className="card-block">
                    <h3 className="card-title">{this.props.car.getNameCapitalized()}</h3>
                    <p className="card-text">Plate: {this.props.car.getPlateCapitalized()}</p>
                    <button className="btn btn-primary" onClick={() => this.onButtonClicked()}>{this.props.car.IsCollected() ? "Put back" : "Mark collected"}</button>
                </div>
            </div>
        </div>;
    }
}