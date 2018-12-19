import * as React from "react";
import { IFeedItem } from "./IRssFeed";
import "./enlighterjs.min.js";
import * as _ from "lodash";
import Octicon, {LinkExternal,TriangleDown, TriangleUp} from '@githubprimer/octicons-react';
import * as ReactDOM from "react-dom";
import SVGLink from "../elements/SVGLink"

interface IBlogCard {
  item: IFeedItem,
  showPubDate:boolean,
  expandToFullContent:boolean,
  showExternalLink:boolean
}

interface IBlogCardState {
  expanded:boolean
}

export class BlogCard extends React.Component<IBlogCard, IBlogCardState> {
  private static INITIALIZED_ATTR:string = "data-initialized";
  private static THEME_SELECTOR: string = "data-enlighter-theme";

  public static defaultProps = {
    showPubDate:true,
    expandToFullContent:true,
    showExternalLink:true
  };

  constructor(props: IBlogCard) {
    super(props);
    this.state = {expanded:false};
  }

  private toggleExpand = ():void => {
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
          <span className="card-heading">{this.props.item.title}</span>
          { this.props.showExternalLink &&
            <SVGLink classes={["ml-auto"]} onClick={()=>{window.open(this.props.item.link,"_blank");}}>
              <Octicon width={50} height={25} icon={LinkExternal} />
            </SVGLink>
          }
        </div>
        <div className={"card-body "+(this.state.expanded ? "expanded":"")}>
          <p className="card-text" dangerouslySetInnerHTML={{__html: this.state.expanded ? this.props.item["content:encoded"]:this.props.item.content}}></p>
        </div>
        { (this.props.expandToFullContent || this.props.showPubDate) &&
        <div className="card-footer text-muted">
          {this.props.showPubDate &&
            <span>Published:{this.props.item.pubDate}</span>
          }
          { this.props.expandToFullContent &&
            <SVGLink classes={["ml-auto"]} onClick={this.toggleExpand} dark={true}>
              <Octicon width={50} height={25} icon={this.state.expanded ? TriangleUp:TriangleDown} />
            </SVGLink>
        }
        </div>
      }
      </div>
    );
  }
}
