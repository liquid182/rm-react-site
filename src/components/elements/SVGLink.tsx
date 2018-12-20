import * as React from "react";
import * as _ from "lodash";

export interface ISVGButton {
  classes:string[],
  onClick?:((event:React.MouseEvent)=>void),
  url:string,
  dark:boolean,
  button:boolean
}

export default class SVGButton extends React.Component<ISVGButton> {
  //tslint:disable-next-line
  //private enlighterJS = require('enlighterjs');
  public static BUTTON_CLASS: string = "svglink";
  public static BUTTON_CLASS_DARK:string = "dark";
  private buttonClasses:string = SVGButton.BUTTON_CLASS;
  private elementTag:string = "a";

  public static defaultProps = {
    classes:[],
    url:"#",
    dark:false,
    button:false
  };

constructor(props:ISVGButton){
  super(props);
  props.classes.push(SVGButton.BUTTON_CLASS);
  if( this.props.dark ){
    props.classes.push(SVGButton.BUTTON_CLASS_DARK);
  }
  this.buttonClasses += " " + _.join(props.classes," ");
  if( props.onClick ){
    props.onClick.bind(this);
  }

  if(props.button){
    this.elementTag = "button";
  }
}

  public render() {
    let ElementTag = this.elementTag;
    return(
        <ElementTag className={this.buttonClasses} href={this.props.url} onClick={this.props.onClick}>
          {this.props.children}
        </ElementTag>
    );
  }
}
