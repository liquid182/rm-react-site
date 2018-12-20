import * as React from "react";
import * as _ from "lodash";
import * as Parser from "rss-parser";
import { IFeed, IFeedItem } from "./IRssFeed";
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
  loadingIndicator: JSX.Element,
  sortBy?: SORT_BY,
  sortOrder?: SORT_ORDER
}

export interface IBlogListState {
  feeds?: IFeed[],
  sortBy?:SORT_BY
}

export class BlogList extends React.Component<IBlogList, IBlogListState> {
  private static CORS_PROXY: string = "https://cors-anywhere.herokuapp.com/";

  public static defaultProps = {
    loadingIndicator: (
      <div key={0}>
        <div className="loading animated" />
        <span id="loadingText" />
      </div>
    ),
    feedUrl: [],
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
        this.log.debug("Parsing Feed URL:" + url);
        new Parser()
          .parseURL(BlogList.CORS_PROXY + url)
          .then(this.populateFeed);
      });
    }
  };

  private populateFeed = (feed: IFeed) => {
    this.log.debug("Successfully got feed item.");
    let feeds = this.state.feeds || [];
    if (!_.includes(feeds, feed)) {
      feed.loaded = true;
      feeds.push(feed);
      this.setState({ feeds });
    }
  };

  public mapFeedItem(feedItem: IFeedItem, index: number) {
    return <BlogCard key={index} item={feedItem} />;
  }

  public componentDidMount() {
    this.getRSSFeeds();
  }

  public getCombinedFeedItems = (): IFeedItem[] => {
    let { feeds } = this.state;
    let feedItems:IFeedItem[] = [];

    if (feeds) {
      for (let i = 0; i < feeds.length; i++) {
        feedItems.push.apply(feedItems, feeds[i].items);
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
    return feedItems;
  };

  public render() {
    let feedElements: JSX.Element[] = [];
    if (this.state.feeds && this.state.feeds.length > 0) {
      let feedItems: IFeedItem[] = this.getCombinedFeedItems();

      _.forEach(
        feedItems,
        (feed: IFeedItem, index: number): void => {
          feedElements.push(this.mapFeedItem(feed, index));
        }
      );
    } else {
      feedElements = [this.props.loadingIndicator];
    }
    return feedElements;
  }
}
