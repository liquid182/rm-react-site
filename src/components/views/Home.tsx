import * as React from "react";
import {MouseEvent} from "react";
import {Log} from "../../logging/Log"


export class Home extends React.Component {
  private log:Log = new Log(Home.name);

  constructor(props:any,state:any) {
    super(props,state);
    // this.state.files = null;
  }

  public render() {
    return (<div className="tab__home">
                <h1>Home</h1>
                <p> This is Ryan McCullough's first React site, built using Webpack, Typescript, SCSS.</p>
                <button onClick={this.clickMe}> Get List! </button>
            </div>);
  }


  private clickMe = (e:MouseEvent<HTMLButtonElement>) => {
    this.log.debug("clicked button"+e);
  }

}
