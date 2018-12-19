import * as React from "react";
import * as _ from "lodash";

export interface ISVGButton {
  classes:string[],
  onClick?:((event:React.MouseEvent)=>void),
  url:string,
  dark:boolean
}

export default class SVGButton extends React.Component<ISVGButton> {
  //tslint:disable-next-line
  //private enlighterJS = require('enlighterjs');
  public static BUTTON_CLASS: string = "svglink";
  public static BUTTON_CLASS_DARK:string = "dark";
  private buttonClasses:string = SVGButton.BUTTON_CLASS;
  public static defaultOnClick = (event:React.MouseEvent):void => {
    alert("You have not configured a click event for your SVG Button."+event.target);
  };

  public static defaultProps = {
    classes:[],
    onClick: SVGButton.defaultOnClick,
    url:"#",
    dark:false
  };

constructor(props:ISVGButton){
  super(props);
  this.props.classes.push(SVGButton.BUTTON_CLASS);
  if( this.props.dark ){
    this.props.classes.push(SVGButton.BUTTON_CLASS_DARK);
  }
  this.buttonClasses += " " + _.join(this.props.classes," ");
  if( this.props.onClick ){
    this.props.onClick.bind(this);
  }
}

  public render() {
    return(
    <a className={this.buttonClasses} href={this.props.url} onClick={this.props.onClick}>
      {this.props.children}
    </a>
    );
  }
}
