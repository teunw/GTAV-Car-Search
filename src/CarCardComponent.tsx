import * as React from "react";
import {Car, CarRetriever} from './Classes';
export interface CarCardProps {
    car: Car;
    onStateChanged(car:Car):void;
}
export class CarCardState {
    collected: boolean;
}

export class CarCard extends React.Component<CarCardProps, CarCardState> {

    private readonly NotCollectedColor = "#FFEBEE";
    private readonly CollectedColor = "#E8F5E9";

    constructor(props: CarCardProps, context: any) {
        super(props, context);
        this.state = new CarCardState();

        this.onButtonClicked = this.onButtonClicked.bind(this);
    }

    componentDidMount() {
        this.setState({collected: this.props.car.IsCollected()});
    }

    private onButtonClicked() {
        const car = this.props.car;
        car.SetCollected(!car.IsCollected());
        this.setState({
            collected: car.IsCollected()
        });
        this.props.onStateChanged(car);
    }

    render() {
        const style = {
            "backgroundColor": this.state.collected ? this.CollectedColor : this.NotCollectedColor
        };
        return <div className="col-sm-4">
            <div className="card" style={style}>
                <div className="card-block">
                    <h3 className="card-title">{this.props.car.getNameCapitalized()}</h3>
                    <p className="card-text">Plate: {this.props.car.getPlateCapitalized()}</p>
                    <button className="btn btn-primary"
                            onClick={() => this.onButtonClicked()}>{this.props.car.IsCollected() ? "Put back" : "Mark collected"}</button>
                </div>
            </div>
        </div>;
    }
}