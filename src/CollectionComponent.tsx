import * as React from "react";
import {Collection, Car} from "./Classes";
import {CarCard} from "./CarCardComponent";

export interface CollectionComponentProps {
    collection: Collection;
    hideCollected?: boolean;
    hideUncollected?: boolean;
}

export class CollectionComponent extends React.Component<CollectionComponentProps, {}> {

    private readonly RowLength = 3;


    constructor(props: CollectionComponentProps, context: any) {
        super(props, context);
        this.onCarStateChanged = this.onCarStateChanged.bind(this);
    }

    private onCarStateChanged(car:Car) {
        this.setState({});
    }

    render() {
        const collection = this.props.collection;

        let cars = this.props.collection.cars;
        if (this.props.hideCollected) {
            cars = cars.filter((c) => !c.IsCollected());
        }
        if (this.props.hideUncollected) {
            cars = cars.filter((c) => c.IsCollected());
        }

        const carCards = cars.map((c) => <CarCard key={c.createKey()} car={c} onStateChanged={this.onCarStateChanged} />);
        const rows = [];
        for (let i = 0; i < carCards.length; i += this.RowLength) {
            const element = <div key={collection.name + i}
                                 className="row">{carCards[i]}{carCards[i + 1]}{carCards[i + 2]}</div>;
            rows.push(element);
        }

        return (<div id={collection.name} className="">
            <h3>{collection.name}</h3>
            {rows}
            <br/>
            <h5>{collection.GetAmountCollected()} / {collection.GetTotalCars()} collected</h5>
            <h5>${collection.GetBonusText()} bonus</h5>
            <hr/>
        </div>);
    }

}