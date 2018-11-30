import * as React from "react";

export interface IHamburgerNavProps {  }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class HamburgerNav extends React.Component<IHamburgerNavProps, {}> {
    constructor(props:IHamburgerNavProps){
        super(props);
    }

    public render() {
        return <nav className="navbar navbar-inverse navbar-static-top custom-navbar" role="navigation">
            <div className="container">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"/>
                    <span className="icon-bar"/>
                    <span className="icon-bar"/>
                </button>
                <div className="navbar-header">
                    <a className="navbar-brand" rel="home" href="#" title="Help">
                        Brand
                    </a>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <a href="#" className="fa fa-cog"/>
                    </li>
                    <li>
                        <a href="#" className="fa fa-home"/>
                    </li>
                </ul>
                <div className="collapse navbar-collapse navbar-left" id="navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li className="active"><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>;
    }
}

