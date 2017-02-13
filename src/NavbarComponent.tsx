import * as React from "react";
import FormEvent = React.FormEvent;
import ChangeEvent = React.ChangeEvent;

export interface NavbarProps {
    handleSearch(e:ChangeEvent<HTMLInputElement>) : void;
}

export class NavbarComponent extends React.Component<NavbarProps, {}> {

    render() {
        return <input className="form-control mr-sm-2" type="text" placeholder="Search" onChange={this.props.handleSearch} />;
    }

}