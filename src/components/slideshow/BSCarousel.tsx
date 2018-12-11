import * as React from "react";
import * as _ from "lodash";
import { Log } from "../../logging/Log";
import "./BSCarousel.scss";

export interface IBSCarousel {
  autoplay: boolean,
  autoplayInterval: number,
  children?:JSX.Element[],
  effect: string,
  enableKeyboard: boolean,
  height?:string,
  id: string,
  initialSlide:number,
  lazyLoad: boolean,
  loadingElement: JSX.Element,
  preserveAspectRatio: boolean,
  showArrows: boolean,
  showIndicators: boolean,
  slideImageURLs: string[],
  wrap: boolean
}

export interface IBSCarouselState {
  autoplay: boolean,
  autoplayTimer?: any,//NodeJS.Timeout
  direction?: string,
  effect: string,
  currentSlide: number,
  slides:JSX.Element[];
}

export default class BSCarousel extends React.Component<IBSCarousel,IBSCarouselState> {
    public static CLASSES = {
      LEFT: "carousel-item-left",
      NEXT: "carousel-item-next",
      PREV: "carousel-item-prev",
      RIGHT: "carousel-item-right",
      FADE: "carousel-fade"
    };
    public static LOADING_ELEMENT_DEFAULT:JSX.Element = <div className="loading animated">Loading...</div>;

    public static DIRECTION = {
      LEFT:"left",
      RIGHT:"right"
    }

    public static EFFECTS = {
      // BOTTOM: "bottom",
      // BOUNCE_LEFT: "bounce-left",
      // BOUNCE_RIGHT: "bounce-right",
      FADE: "fade",
      SLIDE: "slide"
      // LEFT: "left",
      // RIGHT: "right",
      // TOP: "top"
    };

  public static defaultProps = {
    autoplay: false,
    autoplayInterval: 2000,
    effect: BSCarousel.EFFECTS.SLIDE,
    enableKeyboard: true,
    id: "exampleCarousel",
    initialSlide: 0,
    lazyLoad: true,
    loadingElement: BSCarousel.LOADING_ELEMENT_DEFAULT,
    preserveAspectRatio: false,
    showArrows: true,
    showIndicators: false,
    slideImageURLs: [],
    wrap: true
  };

  private log: Log = new Log(BSCarousel.name);

  constructor(props: IBSCarousel) {
    super(props);
    this.state = {
      autoplay: props.autoplay,
      currentSlide: props.initialSlide,
      effect: this.getListDefault("effect",props.effect,BSCarousel.EFFECTS),
      slides: this.initSlides()
    };
  }


  public componentDidMount() {
    if (this.state.autoplay) {
      this.startAutoplay(false);
    }

    if (this.props.enableKeyboard) {
      document.addEventListener("keydown", this.handleKeyboard);
    }
  }

  public componentWillUpdate(prevProps:IBSCarousel){
    if( prevProps.children !== this.props.children || prevProps.slideImageURLs !== this.props.slideImageURLs){
      return false;
    }
    else return true;
  }

  public componentDidUpdate(prevProps:IBSCarousel){

    if( prevProps.children !== this.props.children || prevProps.slideImageURLs !== this.props.slideImageURLs){
        this.setState({slides:this.initSlides()});
    }
  }

  public componentWillUnmount() {
    if( this.state.autoplay ){
      clearInterval(this.state.autoplayTimer)
    }
    document.removeEventListener("keydown", this.handleKeyboard);
  }

  public render(): any {
    const hasSlides:boolean = this.state.slides && this.state.slides.length > 0;
    return(
      <div id={this.props.id} className={"carousel slide "+ (this.state.effect === BSCarousel.EFFECTS.FADE ? BSCarousel.CLASSES.FADE:"")} data-ride={this.props.autoplay ? "carousel":false}>
      {hasSlides && this.props.showIndicators && this.renderIndicators()}
        <div className="carousel-inner">
          {hasSlides && this.renderSlides()}
          {!hasSlides && this.renderLoading() }
        </div>
        {hasSlides && this.props.showArrows && this.renderArrows()}
      </div>
    );
  }
/* Private Methods / Internals */

  private decreaseCount = (): void => {
    let nextSlide = this.state.currentSlide - 1;

    if ( nextSlide < 0 ){
      nextSlide = this.state.slides.length - 1;
    }
    if( this.state.autoplay ){
      this.startAutoplay(true);
    }
    this.setState({
      currentSlide: nextSlide,
      direction:BSCarousel.DIRECTION.LEFT
    });
  };

  private getListDefault = (propLabel:string, propVal:string|undefined, source:any ):string => {
    let retVal = propVal || "";
    if (!_.includes(source, propVal)) {
      this.log.warn(
        "Warning: "+propLabel+ " ["+propVal+"] is not supported. Using " +
          BSCarousel.defaultProps[propLabel] + " instead.\n" +
          "The following values are supported: " +
          Object.keys(source)
            .map((key: string) => {
              return source[key];
            })
            .join(",")
      );
      retVal = BSCarousel.defaultProps[propLabel];
    }
    return retVal;
  };

  private getSlideClass = (index:number):string => {
    const slideClass:string[] = ["carousel-item"];

    if( index > this.state.currentSlide ){
      slideClass.push(BSCarousel.CLASSES.RIGHT);
      slideClass.push(BSCarousel.CLASSES.NEXT);
    }else if ( index < this.state.currentSlide ){
      slideClass.push(BSCarousel.CLASSES.LEFT);
      slideClass.push(BSCarousel.CLASSES.PREV);
    }else if( this.state.currentSlide === index ){
      slideClass.push("active");
    }

    return slideClass.join(" ");
  }

  private handleKeyboard = (e: KeyboardEvent): void => {
    if (e.key === "ArrowLeft") {
      this.decreaseCount();
    } else if (e.key === "ArrowRight") {
      this.increaseCount();
    }
  };

  private increaseCount = (): void => {
    let nextSlide = this.state.currentSlide + 1;
    if( nextSlide === this.state.slides.length ){
      nextSlide = 0;
    }
    if( this.state.autoplay ){
      this.startAutoplay(true);
    }
    this.setState({
      currentSlide: nextSlide,
      direction:BSCarousel.DIRECTION.RIGHT
    });
  };

  private initSlides = () => {
    let slides:JSX.Element[];
    let slideClass:string = "d-block w-100";
    if( this.props.preserveAspectRatio ){
      slideClass += " preserve-aspect-ratio"
    }
    if( this.props.slideImageURLs !== undefined && this.props.slideImageURLs.length > 0 ){
      slides = this.props.slideImageURLs.map( (url:string,index:number):JSX.Element => {
          return <img key={index} className={slideClass} src={url} alt={"Slide "+index}/>
        });
    }else{
      slides = React.Children.map(this.props.children,(child: JSX.Element)=> {
        return child;
      });
    }
    return slides;
  }

  private jumpToSlide = (index:number):void => {
      if( index >= 0 && index <= this.state.slides.length && index !== this.state.currentSlide){
        this.setState({currentSlide: index});
      }
      if( this.state.autoplay ){
        this.startAutoplay(true);
      }
  }

  private renderArrows = ():JSX.Element[] => {
    let elementArray:JSX.Element[] = [
      <a key="0" className="carousel-control-prev" onClick={this.decreaseCount} href={"#"+this.props.id} role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"/>
        <span className="sr-only">Previous</span>
      </a>,
      <a key="1" className="carousel-control-next" onClick={this.increaseCount} href={"#"+this.props.id} role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"/>
        <span className="sr-only">Next</span>
      </a>
    ];
    if( this.props.autoplay ){
      let className = "carousel-control"
      if( this.state.autoplay ){
        className += "-stop";
      }else{
        className += "-play"
      }
      elementArray.push(
          <a key="2" className={className} onClick={this.toggleAutoplay} href={"#"+this.props.id} role="button">
            <span className={className+"-icon"} aria-hidden="true"/>
            <span className="sr-only">Pause</span>
          </a>
      );
    }
    return elementArray;
  }

  private renderIndicators = ():JSX.Element => {
    const indicatorElements:JSX.Element[] = [];
    for( let i=0; i < this.state.slides.length; i++ ){
      indicatorElements.push(<li key={i} data-target={"#"+this.props.id} data-slide-to={i}
        className={this.state.currentSlide === i ? 'active':''} onClick={()=> {this.jumpToSlide(i)}}/>);
    }
    return (
      <ol className="carousel-indicators">
        {indicatorElements}
      </ol>
    );
  };

  private renderLoading = ():JSX.Element => {
    return this.wrapSlide(this.props.loadingElement,0);
  };

private renderSlides = ():JSX.Element[] => {
  return this.state.slides.map(this.wrapSlide);
}

private wrapSlide = (slide:JSX.Element,index:number):JSX.Element => {
  let styleString:any;
  if( this.props.height ){
    styleString = {height: this.props.height};
  }
  return (
          <div key={index} className={this.getSlideClass(index)} style={styleString}>
            {slide}
          </div>
  )};



  private startAutoplay = (restart:boolean=false): void => {
    if( restart && this.state.autoplayTimer ){
       clearInterval(this.state.autoplayTimer);
    }
    const autoplayTimer:any = setInterval(
       this.increaseCount,
       this.props.autoplayInterval
     );
     this.setState({
       autoplay: true,
       autoplayTimer})
    this.log.debug("Running slideshow.");
    // this.setState({ intervalId });
  };

  private stopAutoplay = ():void => {
    let autoplayTimer = clearInterval(this.state.autoplayTimer);
    this.setState({
      autoplay:false,
      autoplayTimer})
  }

  private toggleAutoplay = () => {
    if( this.state.autoplay && this.state.autoplayTimer ){
      this.stopAutoplay();
    }else if (!this.state.autoplay){
      this.startAutoplay();
    }
  };
}
