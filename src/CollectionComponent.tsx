import * as React from "react";
import {Collection} from "./Classes";
import {CarCard} from "./CarCardComponent";

export interface CollectionComponentProps {
    collection: Collection;
    showCollected?: boolean;
}

export class CollectionComponent extends React.Component<CollectionComponentProps, {}> {

    private readonly RowLength = 3;
    private readonly NotCollectedColor = "#FFEBEE";
    private readonly CollectedColor = "#E8F5E9";

    render() {
        const collection = this.props.collection;
        const carCards = collection.cars
            .filter(c => c.IsCollected() == this.props.showCollected)
            .map((c) => <CarCard key={c.createKey()} car={c}
                                 backgroundColor={c.IsCollected() ? this.CollectedColor : this.NotCollectedColor}/>);
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
            <hr/>
        </div>);
    }

}