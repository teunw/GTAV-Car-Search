import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as $ from 'jquery';
import {CarRetriever, Collection, RefreshListener} from './Classes';
import {CollectionComponent} from './CollectionComponent';
import {SearchComponent} from "./SearchComponent";
import ChangeEvent = React.ChangeEvent;

export class CarCargoMakerState {
    public collections: Collection[] = [];
    public search: string = "";
    public hideUncollected : boolean = false;
    public hideCollected : boolean = false;
}

export class CargoMarker extends React.Component<{}, CarCargoMakerState> implements RefreshListener {

    constructor(props: {}, context: any) {
        super(props, context);
        this.state = new CarCargoMakerState();
        CarRetriever.AddRefreshListener(this);

        this.handleSearch = this.handleSearch.bind(this);
        this.handleHideUncollected = this.handleHideUncollected.bind(this);
        this.handleHideCollected = this.handleHideCollected.bind(this);
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

    public handleHideUncollected(e:boolean) {
        this.setState({
            hideUncollected: e
        });
    }

    public handleHideCollected(e:boolean) {
        this.setState({
            hideCollected: e
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

        const notCollectedCars = this.state.collections.filter((collection) => collection.Search(this.state.search));

        const notCollected = notCollectedCars.map((nc) => <CollectionComponent key={"list" + nc.name}
                                                                               hideCollected={this.state.hideCollected}
                                                                               hideUncollected={this.state.hideUncollected}
                                                                               collection={nc}/>);

        return (
            <div id="list">
                <SearchComponent
                    handleSearch={this.handleSearch}
                    handleHideCollected={this.handleHideCollected}
                    handleHideUncollected={this.handleHideUncollected} />
                <div className="card">
                    <h3 className="card-header">Cars</h3>
                    <div className="card-block">{notCollected}</div>
                </div>
            </div>);
    }

}

ReactDOM.render(
    <CargoMarker />,
    document.getElementById("content")
);