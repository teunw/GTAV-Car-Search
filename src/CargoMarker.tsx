import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as $ from 'jquery';
import {CarRetriever, Collection, RefreshListener} from './Classes';
import {CollectionComponent} from './CollectionComponent';
import {NavbarComponent} from "./NavbarComponent";
import ChangeEvent = React.ChangeEvent;

export class CarCargoMakerState {
    public collections: Collection[] = [];
    public search: string = "";
}

export class CargoMarker extends React.Component<{}, CarCargoMakerState> implements RefreshListener {

    constructor(props: {}, context: any) {
        super(props, context);
        this.state = new CarCargoMakerState();
        this.handleSearch = this.handleSearch.bind(this);
        CarRetriever.AddRefreshListener(this);
    }

    onRefresh(collections: Collection[]): void {
        this.setState({
            collections: collections
        });
    }

    public handleSearch(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            search: e.target.value
        });
    }

    render() {
        if (this.state.collections.length == 0) {
            CarRetriever
                .GetCollections()
                .done((collections) => {
                    this.setState({collections: collections});
                });
        }

        const notCollectedCars = this.state.collections.filter((collection) => !collection.IsCompletelyCollected() && collection.Search(this.state.search));
        const collectedCars = this.state.collections.filter((collection) => collection.IsPartlyCollected() && collection.Search(this.state.search));

        const notCollected = notCollectedCars.map((nc) => <CollectionComponent key={"list" + nc.name}
                                                                               showCollected={false}
                                                                               collection={nc}/>);
        const collected = collectedCars.map((c) => <CollectionComponent key={"list" + c.name} showCollected={true}
                                                                        collection={c}/>);

        return (
            <div id="list">
                <NavbarComponent handleSearch={this.handleSearch} />
                <div className="card">
                    <h3 className="card-header text-danger">Not Collected</h3>
                    <div className="card-block">{notCollected}</div>
                </div>
                <br/>
                <div className="card">
                    <h3 className="card-header">Collected</h3>
                    <div className="card-block">{collected}</div>
                </div>
            </div>);
    }

}

ReactDOM.render(
    <CargoMarker />,
    document.getElementById("content")
);