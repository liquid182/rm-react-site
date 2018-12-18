import * as React from "react";
import { IFeedItem } from "./IRssFeed";
//import Octicon, {TriangleDown, TriangleUp} from '@githubprimer/octicons-react';
interface IBlogCard {
  item: IFeedItem;
}

interface IBlogCardState {
}

export class BlogCard extends React.Component<IBlogCard, IBlogCardState> {
  constructor(props: IBlogCard) {
    super(props);
  }

  render() {
    return (
      <div className="card bg-light mb-3">
        <div className="card-header text-white bg-dark">
          {this.props.item.title}
        </div>
        <div className="card-body">
          <p className="card-text">{this.props.item["content:encoded"]}</p>
        </div>
        <div className="card-footer text-muted">
          <span className="mr-auto">Published:{this.props.item.pubDate}</span>
          { this.props.item.link &&
          <span className="ml-auto">
            <button className="ml-auto" onClick={this.openSource}>
              Original
            </button>
          </span>
          }

        </div>
      </div>
    );
  }
/*
<span className="ml-auto" onClick={this.toggleExpand}>
  <Octicon icon={this.state.expanded ? TriangleUp:TriangleDown} />
</span>
*/

  private openSource = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.open(this.props.item.link,"_blank");
  }
}
