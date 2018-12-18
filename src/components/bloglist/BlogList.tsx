import * as React from "react";
import * as _ from "lodash";
import * as Parser from "rss-parser";
import { IFeed, IFeedItem } from "./IRssFeed";
import { Log } from "../../logging/Log";
import { BlogCard } from "./BlogCard";
import "./BlogList.scss";


export interface IBlogList {
  feedUrl: string;
  loadingIndicator: JSX.Element;
}

export interface IBlogListState {
  feed?: IFeed;
  loaded: boolean;
}

export class BlogList extends React.Component<IBlogList, IBlogListState> {
  private enlighterJS = require('enlighterjs');
  private static CORS_PROXY: string = "https://cors-anywhere.herokuapp.com/";
  public static defaultProps = {
    loadingIndicator: <div key={0} className="loading animated">Loading...</div>
  };
  constructor(props: IBlogList) {
    super(props);
    this.getRSSFeeds();
    this.state = {
      loaded: false
    };
  }
  private log: Log = new Log(BlogList.name);
  private getRSSFeeds = () => {
    if (this.props.feedUrl != null) {
      new Parser()
        .parseURL(BlogList.CORS_PROXY + this.props.feedUrl)
        .then(this.populateFeed);
    }
  };

  private populateFeed = (feed: IFeed) => {
    this.log.debug("Successfully got feed item.");
    this.setState({ feed });
  };

  public mapFeedItems(feedItem: IFeedItem, index: number) {
    return <BlogCard key={index} item={feedItem} />;
  }

  public componentDidUpdate(){
    this.enlighterJS.init('pre','code', {
      language:"javascript",
      theme:"bootstrap4",
      indent:"2"
    });
    /*        EnlighterJS.init('pre', 'code', {
                language : 'javascript',
                theme: 'enlighter',
                indent : 2
        });*/
  }

  public render() {
    const { feed } = this.state;
    let feedItems: JSX.Element[] = [];
    if (feed && feed.items) {
      feedItems = _.map(feed.items, this.mapFeedItems);
    } else {
      feedItems = [this.props.loadingIndicator];
    }
    return feedItems;
  }
}
