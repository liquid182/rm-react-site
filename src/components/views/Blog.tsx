import * as React from "react";
import {BlogList} from "../bloglist/BlogList";
//import {Log} from "../../logging/Log";

interface IBlogState {
    slides: string[],
}

export class Blog extends React.Component<{},IBlogState> {

    //private log:Log = new Log(About.name);
    //private tempFeed:string = "https://blogs.perficientdigital.com/author/rmccullough/feed/";
    //private tempFeed2:string = "https://blogs.perficient.com/author/rmccullough/feed/"
    constructor(props:any) {
        super(props);
    }


    public render() {
        return (<div className="tab tab__blog">
            <h1>Blogs</h1>
            <p>Here's a list of stuff I've written:</p>
            <BlogList feedUrl="https://blogs.perficientdigital.com/author/rmccullough/feed/"/>
            <BlogList feedUrl="https://blogs.perficient.com/author/rmccullough/feed/"/>

            <p> another terst</p>
        </div>);
    }
}
