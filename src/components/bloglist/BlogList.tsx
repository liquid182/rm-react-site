import * as React from "react";
import * as _ from "lodash";
import * as Parser from "rss-parser";
import { IFeed, IFeedItem } from "./IRssFeed";
import {Icon,ChevronRight, ChevronLeft, Plus, Dash } from '@githubprimer/octicons-react';
import { Log } from "../../logging/Log";
import { BlogCard } from "./BlogCard";
import "./BlogList.scss";

export enum SORT_BY {
  pubDate="pubDate",
  title="title",
  creator="creator"
}

export enum SORT_ORDER {
  asc="asc",
  desc="desc"
}

export interface IBlogList {
  feedUrl: string[],
  loadingIndicator?: JSX.Element,
  sortBy?: SORT_BY,
  sortOrder?: SORT_ORDER,
  singleColumn:boolean
}

export interface IBlogListState {
  loadingText?:string,
  selectedItem?:string,
  feeds?: IFeed[],
  sortBy?:SORT_BY
}

export class BlogList extends React.Component<IBlogList, IBlogListState> {
  private static CORS_PROXY: string = "https://cors-anywhere.herokuapp.com/";

  public static defaultProps = {
    feedUrl: [],
    singleColumn:false,
    sortOrder:SORT_ORDER.desc
  };
  constructor(props: IBlogList) {
    super(props);
    this.state = {
      feeds: []
    };
  }
  private log: Log = new Log(BlogList.name);
  private getRSSFeeds = () => {
    if (this.props.feedUrl) {
      _.map(this.props.feedUrl, (url: string) => {
        this.setState({loadingText:"Parsing Feed URL:" + url});
        //this.log.debug("Parsing Feed URL:" + url);
        new Parser()
          .parseURL(BlogList.CORS_PROXY + url)
          .then(this.populateFeed);
      });
    }
  };

  private getLoadingIndicator = ():JSX.Element => {
    let loadingIndicator:JSX.Element =
      <div key={0}>
        <div className="loading animated" />
        <span>{this.state.loadingText}</span>
      </div>
    return this.props.loadingIndicator ? this.props.loadingIndicator:loadingIndicator;
  };

  private isTwoColumnDisplay = ():boolean =>{
    return this.props.singleColumn===false && this.state.selectedItem !== undefined;
  }

  private populateFeed = (feed: IFeed) => {
    let feeds = this.state.feeds || [];
    if (!_.includes(feeds, feed)) {
      feed.loaded = true;
      feeds.push(feed);
      this.setState({ feeds });
    }
  };


  public mapFeedItem = (feedItem: IFeedItem, expanded:boolean = false):JSX.Element => {
    let expandedIcon:Icon|undefined = this.isTwoColumnDisplay() ? ChevronLeft:undefined;
    let collapsedIcon:Icon|undefined;
    if( this.isTwoColumnDisplay()){
      //showing in a two col template...
      collapsedIcon = ChevronRight;
      expandedIcon = ChevronLeft;
    }else if(this.props.singleColumn !== true){
      //set to two column, showing one column.
      collapsedIcon = Plus;
      expandedIcon = Dash;
    }
    return <BlogCard key={feedItem.guid} showExternalLink={false} expanded={expanded} expandIconExpanded={expandedIcon} expandIconCollapsed={collapsedIcon} item={feedItem} expandCallback={this.selectItem}/>;
  }

  public componentDidMount() {
    this.getRSSFeeds();
  }

  public selectItem = (event:React.MouseEvent,id:string):void=>{
    event.preventDefault();
    this.log.debug("Clicked:"+id+"\nSelected:"+this.state.selectedItem);
    if( this.state.selectedItem && this.state.selectedItem === id ){
      //item already selected, close
      this.setState({selectedItem:undefined});
    }else{
      this.setState({
        selectedItem:id
      })
    }
  };

  public getCombinedFeedItems = ():[IFeedItem[],IFeedItem|undefined] => {
    this.log.debug("Getting feed Items..."+this.state.selectedItem);
    let { feeds } = this.state;
    let feedItems:IFeedItem[] = [];
    let selectedItem:IFeedItem|undefined;
    if (feeds) {
      for (let i = 0; i < feeds.length; i++) {
        _.forEach(feeds[i].items,(item:IFeedItem)=>{
          feedItems.push(item);
          if(item.guid === this.state.selectedItem){
            selectedItem = item;
          }
        });
        //feedItems.push.apply(feedItems, feeds[i].items);
      }
      if( this.props.sortBy ){
        if( this.props.sortBy === SORT_BY.pubDate){
          feedItems = _.orderBy(feedItems,(item:IFeedItem)=>{
            return new Date(_.toString(item.pubDate))
          },"desc");
        }else{
          feedItems = _.orderBy(feedItems,this.props.sortBy,"desc");
        }
      }
    }
    return [feedItems,selectedItem];
  };

  public render() {
    let feedElements: JSX.Element[] = [];
    let selectedFeedElement: JSX.Element|undefined;
    if (this.state.feeds && this.state.feeds.length > 0) {
      let feedItems: [IFeedItem[],IFeedItem|undefined] = this.getCombinedFeedItems();
      if(feedItems[1] && this.props.singleColumn !== true){
        selectedFeedElement = this.mapFeedItem(feedItems[1],true);
      }
      _.forEach(
        feedItems[0],
        (feed: IFeedItem): void => {
          feedElements.push(this.mapFeedItem(feed));
        }
      );
    } else {
      feedElements = [this.getLoadingIndicator()];
    }
    return (<div className="bloglist">
              {selectedFeedElement &&
              <div className="selected">
                {selectedFeedElement}
              </div>
              }
              <div className="list">
                {feedElements}
              </div>
            </div>
          );
  }
}
