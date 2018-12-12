import * as React from "react";
//import {Log} from "../../logging/Log";

interface IAboutState {
    slides: string[],
}

export class About extends React.Component<{},IAboutState> {

    //private log:Log = new Log(About.name);

    constructor(props:any) {
        super(props);
    }


    public render() {
        return (<div className="tab__about">
            <h1>About</h1>
            <p> For the bio and stuffs.</p>

            <p> another terst</p>
        </div>);
    }
}
