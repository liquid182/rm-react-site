import * as React from "react";
import {GOOGLE_API_KEY, GOOGLE_FOLDER_ID} from "../../constants/AppConstants.json";
import {Log} from "../../logging/Log";
import {GDrive, IGDrive} from "../../utility/GDrive";
import BSCarousel from "../slideshow/BSCarousel";

interface IAboutState {
    slides: string[],
}

export class Photos extends React.Component<{},IAboutState> {

    private log:Log = new Log(Photos.name);

    constructor(props:any) {
        super(props);
        this.state = {
            slides: []
        };
        this.initSlides();
        this.log.debug("Mounted About.");
    }

    public shouldComponentUpdate(nextProps:{},nextState:IAboutState){
      if( this.state.slides === nextState.slides){
        return false;
      }
      return true;
    }

    private initSlides =() => {
      GDrive.getFileList(GOOGLE_API_KEY, GOOGLE_FOLDER_ID)
          .then((response: IGDrive) => {
                  let slides:string[] = response.files.map( GDrive.mapGDriveFileToURLStringArray);
                  this.setState({slides});
              }
          );
    }

    getDefaultSlideImageURLs = ():string[] => {
      return [
        'data:image/svg+xml;charset=UTF-8,<svg%20width%3D"800"%20height%3D"400"%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20viewBox%3D"0%200%20800%20400"%20preserveAspectRatio%3D"none"><defs><style%20type%3D"text%2Fcss">%23holder_167519716c2%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20<%2Fstyle><%2Fdefs><g%20id%3D"holder_167519716c2"><rect%20width%3D"800"%20height%3D"400"%20fill%3D"%23777"><%2Frect><g><text%20x%3D"285.921875"%20y%3D"218.3">First%20slide<%2Ftext><%2Fg><%2Fg><%2Fsvg>',
        'data:image/svg+xml;charset=UTF-8,<svg%20width%3D"800"%20height%3D"400"%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20viewBox%3D"0%200%20800%20400"%20preserveAspectRatio%3D"none"><defs><style%20type%3D"text%2Fcss">%23holder_167519716c3%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20<%2Fstyle><%2Fdefs><g%20id%3D"holder_167519716c3"><rect%20width%3D"800"%20height%3D"400"%20fill%3D"%23666"><%2Frect><g><text%20x%3D"247.3203125"%20y%3D"218.3">Second%20slide<%2Ftext><%2Fg><%2Fg><%2Fsvg>',
        'data:image/svg+xml;charset=UTF-8,<svg%20width%3D"800"%20height%3D"400"%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20viewBox%3D"0%200%20800%20400"%20preserveAspectRatio%3D"none"><defs><style%20type%3D"text%2Fcss">%23holder_167519716c4%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20<%2Fstyle><%2Fdefs><g%20id%3D"holder_167519716c4"><rect%20width%3D"800"%20height%3D"400"%20fill%3D"%23555"><%2Frect><g><text%20x%3D"277"%20y%3D"218.3">Third%20slide<%2Ftext><%2Fg><%2Fg><%2Fsvg>'

      ]
    }


    public render() {
        return (<div className="tab__about">
            <h1>Elphin Lake Hike/Hut</h1>
            <p> Here is some photos from my google albums!</p>
            <div className="photostream">
                <BSCarousel id="exampleCarousel"
                          autoplay={true}
                          autoplayInterval={5000}
                          height="75vh"
                          preserveAspectRatio={true}
                          showArrows={true}
                          showIndicators={false}
                          slideImageURLs={this.state.slides}
                          effect={BSCarousel.EFFECTS.FADE} />
            </div>
        </div>);
    }
}
