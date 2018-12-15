import * as React from "react";
import {Parser} from "xml2js";
import {Log} from "../../logging/Log";
export interface IBlogList {
  feedUrl:string
}

export interface IBlogListState {

}

export class BlogList extends React.Component<IBlogList,IBlogListState> {
  private static CORS_PROXY:string = "https://cors-anywhere.herokuapp.com/";

  constructor (props:IBlogList){
    super(props);
    this.getRSSFeeds();
  }
  private log:Log = new Log(BlogList.name);
  private getRSSFeeds = () => {
    if( this.props.feedUrl != null ){

      window.fetch(BlogList.CORS_PROXY+this.props.feedUrl).then(this.initializeParser)
      .then(this.convertXMLtoJson);
    }
  }

  private initializeParser = (response:Response):Promise<string> => {
    if( response.status === 200 || response.status === 0){//no-cors status is 0
      return response.text();
    }else{
      return Promise.reject("RSS Feed configured returned a ["+response.status+"] response.  Nothing to display.");
    }
  }

  private convertXMLtoJson = (xml:string):void => {
    debugger;
    let feedParser:Parser = new Parser();
    feedParser.parseString(xml,this.parseRSSObject);
    //this.log.error("Got object:"+xml+"JSON:"+JSON.stringify(object));
  }

  private parseRSSObject  = (err:any,result:any):void => {
    debugger;
    this.log.error("Got object:"+result+"JSON:"+JSON.stringify(result));
  }



  public render(){
    return(
    <p>Hi there!</p>
    );
  }
}
