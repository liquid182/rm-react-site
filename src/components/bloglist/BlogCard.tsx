import * as React from "react";
import { IFeedItem } from "./IRssFeed";

interface IBlogCard {
  item: IFeedItem;
}

interface IBlogCardState {
  expanded: boolean;
}

export class BlogCard extends React.Component<IBlogCard, IBlogCardState> {
  constructor(props: IBlogCard) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  render() {
    return (
      <div className="card bg-light mb-3">
        <div className="card-header bg-dark">
          {this.props.item.title}
          <span onClick={this.toggleExpand} className="ml-auto glyphicon glyphicon-plus" />
        </div>
        <div className="card-body">
          <p className="card-text">{this.state.expanded? this.props.item.content:this.props.item.contentSnippet}</p>
        </div>
        <div className="card-footer text-muted">
          Published:{this.props.item.pubDate}
        </div>
      </div>
    );
  }

  private toggleExpand = () => {
    this.setState({expanded:!this.state.expanded})
  }
}
