import * as React from "react";
import FormEvent = React.FormEvent;
import ChangeEvent = React.ChangeEvent;

export interface SearchProps {
    handleSearch(e: ChangeEvent<HTMLInputElement>): void;
    handleHideCollected(checked:boolean):void;
    handleHideUncollected(checked:boolean):void;
}

export class SearchState {
    hideCollected : boolean = false;
    hideUncollected : boolean = false;
}

export class SearchComponent extends React.Component<SearchProps, SearchState> {


    constructor(props: SearchProps, context: any) {
        super(props, context);
        this.state = new SearchState();

        this.handleCollectedCheckbox = this.handleCollectedCheckbox.bind(this);
        this.handleUncollectedCheckbox = this.handleUncollectedCheckbox.bind(this);
    }

    public handleUncollectedCheckbox(e:ChangeEvent<HTMLInputElement>) {
        e.persist();
        this.setState((prev) => ({hideUncollected: e.target.checked}));
        this.props.handleHideUncollected(!this.state.hideUncollected);
        console.log(this.state.hideUncollected);
    }

    public handleCollectedCheckbox(e:ChangeEvent<HTMLInputElement>) {
        e.persist();
        this.setState((prev) => ({hideCollected: e.target.checked}));
        this.props.handleHideCollected(!this.state.hideCollected);
        console.log(this.state.hideCollected);
    }

    render() {
        return (
            <div className="card">
                <div className="card-block">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search"
                           onChange={this.props.handleSearch}/>
                    <label className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" checked={this.state.hideCollected} onChange={this.handleCollectedCheckbox} />
                        <span className="custom-control-indicator" />
                        <span className="custom-control-description">Hide collected cars</span>
                    </label>
                    <label className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" checked={this.state.hideUncollected} onChange={this.handleUncollectedCheckbox} />
                        <span className="custom-control-indicator" />
                        <span className="custom-control-description">Hide uncollected cars</span>
                    </label>
                </div>
            </div>
        );
    }

}