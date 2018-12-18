import * as React from "react";
import { IFeedItem } from "./IRssFeed";
import Octicon, {ArrowDown, ArrowUp} from '@githubprimer/octicons-react';
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
        <div className="card-header text-white bg-dark">
          {this.props.item.title}
        </div>
        <div className="card-body">
          <p className="card-text">{this.state.expanded? this.props.item.content:this.props.item.contentSnippet}</p>
        </div>
        <div className="card-footer text-muted">
          Published:{this.props.item.pubDate}
          <span className="ml-auto" onClick={this.toggleExpand}>
            <Octicon icon={this.state.expanded ? ArrowUp:ArrowDown} />
          </span>
        </div>
      </div>
    );
  }

  private toggleExpand = () => {
    this.setState({expanded:!this.state.expanded})
  }
}
