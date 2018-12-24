import * as React from "react";
import { IFeedItem } from "./IRssFeed";
import "./enlighterjs.min.js";
import * as _ from "lodash";
import Octicon, {Icon,LinkExternal,TriangleDown, TriangleUp} from '@githubprimer/octicons-react';
import * as ReactDOM from "react-dom";
import SVGLink from "../elements/SVGLink"

interface IBlogCard {
  item: IFeedItem,
  showPubDate:boolean,
  expanded:boolean,
  expandToFullContent:boolean,
  expandIconCollapsed:Icon,
  expandIconExpanded:Icon,
  expandCallback?:(event: React.MouseEvent<Element>,id:string) => void,
  externalLinkIcon:Icon,
  showExternalLink:boolean,
  pubDateTextElement:string|JSX.Element
}

interface IBlogCardState {
  //expanded:boolean
}

export class BlogCard extends React.Component<IBlogCard, IBlogCardState> {
  private static INITIALIZED_ATTR:string = "data-initialized";
  private static THEME_SELECTOR: string = "data-enlighter-theme";
  private wrappedOnClick:(event: React.MouseEvent<Element>) => void;

  public static defaultProps = {
    showPubDate:true,
    expanded:false,
    expandToFullContent:true,
    expandIconCollapsed:TriangleDown,
    expandIconExpanded:TriangleUp,
    externalLinkIcon:LinkExternal,
    showExternalLink:true,
    pubDateTextElement:"Published: "
  };

  constructor(props: IBlogCard) {
    super(props);
      this.wrappedOnClick = (e:React.MouseEvent<Element>):void => {
        e.preventDefault();
        if( props.expandCallback !== undefined ){
          props.expandCallback(e,_.toString(this.props.item.guid));
        }
    };
  }

  public componentDidMount(){
    this.componentDidUpdate();
  }

  public componentDidUpdate(){
    let domComponent:Element|Text|null = ReactDOM.findDOMNode(this);
    if( domComponent instanceof Element && this.props.expanded){
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

  private getExpandIcon = ():Icon=>{
    let expandIcon:Icon;
    if( this.props.expanded ){
      expandIcon = this.props.expandIconExpanded;
    }else{
      expandIcon = this.props.expandIconCollapsed;
    }
    return expandIcon;
  };

  render() {
    return (
      <div data-guid={this.props.item.guid} className={"card bg-light mb-3 "+(this.props.expanded ? "expanded":"")}>
        <div className="card-header text-white bg-dark">
          <span className="card-heading">{this.props.item.title}</span>
          { this.props.showExternalLink &&
            <SVGLink classes={["ml-auto"]} onClick={()=>{window.open(this.props.item.link,"_blank");}}>
              <Octicon width={50} height={25} icon={this.props.externalLinkIcon} />
            </SVGLink>
          }
        </div>
        <div className={"card-body"}>
          <p className="card-text" dangerouslySetInnerHTML={{__html: this.props.expanded ? this.props.item["content:encoded"]:this.props.item.content}}></p>
        </div>
        { (this.props.expandToFullContent || this.props.showPubDate) &&
        <div className="card-footer text-muted">
          {this.props.showPubDate &&
            <span>{this.props.pubDateTextElement}{this.props.item.pubDate}</span>
          }
          { this.props.expandToFullContent &&
            <SVGLink button={true} classes={["ml-auto"]} onClick={this.wrappedOnClick} dark={true}>
              <Octicon width={50} height={25} icon={this.getExpandIcon()} />
            </SVGLink>
        }
        </div>
      }
      </div>
    );
  }
}
