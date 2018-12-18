import * as React from "react";
import * as _ from "lodash";
import * as Parser from "rss-parser";
import {IFeed, IFeedItem} from "./IRssFeed";
import {Log} from "../../logging/Log";
import {BlogCard} from "./BlogCard";


export interface IBlogList {
  feedUrl:string
}

export interface IBlogListState {
  feed?:IFeed,
  loaded:boolean
}

export class BlogList extends React.Component<IBlogList,IBlogListState> {
  private static CORS_PROXY:string = "https://cors-anywhere.herokuapp.com/";

  constructor (props:IBlogList){
    super(props);
    this.getRSSFeeds();
    this.state = {
      loaded:false
    }
  }
  private log:Log = new Log(BlogList.name);
  private getRSSFeeds = () => {
    if( this.props.feedUrl != null ){
      new Parser().parseURL(BlogList.CORS_PROXY+this.props.feedUrl).then(this.populateFeed);
    }
  }

  private populateFeed = (feed:IFeed)=> {
    this.log.debug("Successfully got feed item.");
    this.setState({feed});
  };

  public mapFeedItems(feedItem:IFeedItem, index:number){
    return <BlogCard key={index} item={feedItem}/>
  }

  public render(){
    const {feed}  = this.state;
    let feedItems:JSX.Element[] = [];
    if( feed && feed.items ){
      feedItems = _.map(feed.items,this.mapFeedItems);
    }
    return (feedItems);
  }
}
