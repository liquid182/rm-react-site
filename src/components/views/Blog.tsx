import * as React from "react";
import {BlogList, SORT_BY,SORT_ORDER} from "../bloglist/BlogList";

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
            <BlogList key={0} sortBy={SORT_BY.pubDate} sortOrder={SORT_ORDER.desc} feedUrl={["https://blogs.perficientdigital.com/author/rmccullough/feed/","https://blogs.perficient.com/author/rmccullough/feed/"]}/>
        </div>);
    }
}
