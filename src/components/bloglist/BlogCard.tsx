import * as React from "react";
import {IFeedItem} from "./IRssFeed";

interface IBlogCard {
  item:IFeedItem
}

export class BlogCard extends React.Component<IBlogCard,{}> {

  render(){
    return (
      <div className="card bg-light mb-3">
        <div className="card-header">{this.props.item.title}</div>
        <div className="card-body">
          <p className="card-text">{this.props.item.contentSnippet}</p>
        </div>
        <div className="card-footer text-muted">Published:{this.props.item.pubDate}</div>
      </div>
    );
  }
}
