import * as React from "react";
import {GOOGLE_API_KEY, GOOGLE_FOLDER_ID} from "../../constants/AppConstants.json";
import {Log} from "../../logging/Log";
import {GDrive, IGDrive} from "../../utility/GDrive";

interface IAboutState {
    slides: string[],
}

export class About extends React.Component<{},IAboutState> {

    private log:Log = new Log(About.name);

    constructor(props:any) {
        super(props);
        this.state = {
            slides: []
        };
        this.log.debug("Mounted About.");
        GDrive.getFileList(GOOGLE_API_KEY, GOOGLE_FOLDER_ID)
            .then((response: IGDrive) => {
                    this.log.debug("Got Slides: "+response.files.length);
                    this.setState({
                        slides: response.files.map( GDrive.mapGDriveFileToURLStringArray)});
                }
            );

    }


    public render() {
        return (<div className="tab__about">
            <h1>About</h1>
            <p> For the bio and stuffs.</p>

            <p> another terst</p>
        </div>);
    }
}
