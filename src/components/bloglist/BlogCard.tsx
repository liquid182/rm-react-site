import * as React from "react";
import { IFeedItem } from "./IRssFeed";
import "enlighterjs";
import * as _ from "lodash";
import Octicon, {TriangleDown, TriangleUp} from '@githubprimer/octicons-react';
import * as ReactDOM from "react-dom";

interface IBlogCard {
  item: IFeedItem;
}

interface IBlogCardState {
  expanded:boolean
}

export class BlogCard extends React.Component<IBlogCard, IBlogCardState> {
  private static INITIALIZED_ATTR:string = "data-initialized";
  private static THEME_SELECTOR: string = "data-enlighter-theme";
  constructor(props: IBlogCard) {
    super(props);
    this.state = {expanded:false};
  }

  private toggleExpand = (event:React.MouseEvent):void => {
    this.setState({expanded:!this.state.expanded})
  };

  public componentDidUpdate(){
    let domComponent:Element|Text|null = ReactDOM.findDOMNode(this);
    if( domComponent instanceof Element ){
      let eslighterItems:NodeListOf<Element> = domComponent.querySelectorAll("["+BlogCard.THEME_SELECTOR+"]");
      _.map(eslighterItems, this.translateEnlighterTheme);
    }
  }

    private translateEnlighterTheme = (ele:Element) => {
      let curAtt = ele.getAttribute(BlogCard.THEME_SELECTOR);
      let isInitialized = ele.getAttribute(BlogCard.INITIALIZED_ATTR);
      if( !isInitialized && curAtt === "twilight" ){
          ele.setAttribute(BlogCard.THEME_SELECTOR, "dracula");
      }
      if( !isInitialized ){
        ele.setAttribute(BlogCard.INITIALIZED_ATTR, "true");
        window["EnlighterJS"].enlight(ele, {
          language: 'java',
          theme: 'darcula',
          indent: 2
        })
      }
  }

  render() {
    return (
      <div className="card bg-light mb-3">
        <div className="card-header text-white bg-dark">
          {this.props.item.title}
        </div>
        <div className={"card-body "+(this.state.expanded ? "expanded":"")}>
          <p className="card-text" dangerouslySetInnerHTML={{__html: this.state.expanded ? this.props.item["content:encoded"]:this.props.item.content}}></p>
        </div>
        <div className="card-footer text-muted">
          <span>Published:{this.props.item.pubDate}</span>
          <span className="ml-auto" onClick={this.toggleExpand}>
            <Octicon width={100} height={25} icon={this.state.expanded ? TriangleUp:TriangleDown} />
          </span>
        </div>
      </div>
    );
  }
}
