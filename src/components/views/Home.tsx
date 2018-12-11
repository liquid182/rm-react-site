import * as React from "react";
import {MouseEvent} from "react";
import {GOOGLE_API_KEY, GOOGLE_FOLDER_ID} from "../../constants/AppConstants.json";
import {Log} from "../../logging/Log"
import {GDrive, IGDrive, IGDriveFile} from "../../utility/GDrive";


export class Home extends React.Component {
    private files:IGDriveFile[];
    private log:Log = new Log(Home.name);

    constructor(props:any,state:any) {
        super(props,state);
        // this.state.files = null;
    }

    public componentDidMount(){
        this.log.debug("Mounted Home.");
        const _this = this;
        if( !_this.files || _this.files.length <= 0  ) {
            GDrive.getFileList(GOOGLE_API_KEY, GOOGLE_FOLDER_ID).then((response: IGDrive) => {
                _this.files = response.files;
            });
        }
    }

    public render() {
        return (<div className="tab__home">
                    <h1>Home</h1>
                    <p> This is Ryan McCullough's first React site, built using Webpack, Typescript, SCSS.</p>
                    <button onClick={this.clickMe}> Get List! </button>
                </div>);
    }


    private clickMe = (e:MouseEvent<HTMLButtonElement>) => {
        this.log.debug("clicked button"+e);
        if( this.files ) {
            this.log.debug("Got files?:" + this.files);
        }
    }

}

