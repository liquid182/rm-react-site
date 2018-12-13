import * as _ from "lodash";
import "bootstrap";
import * as React from "react";
import { INavItem, NavItem } from "./NavItem";
import { Log } from "../../logging/Log";

//import "../../images/background/blue-waves.svg";
export interface IHamburgerNav {
    title:string ,
    closeOnClick:boolean ,
    dark:boolean,
    expandDesktop:boolean,
    expandTablet:boolean,
    expandMobile:boolean,
    logoSrc?:string,
    logoLabel:string,
    leftLinks:INavItem[],
    rightLinks:INavItem[]
}

export interface IHambergerNavState {
    menuOpen:boolean
}

export class HamburgerNav extends React.Component<IHamburgerNav, IHambergerNavState> {

  public static defaultProps = {
    closeOnClick: true,
    dark: false,
    expandDesktop: true,
    expandTablet: true,
    expandMobile: false,
    leftLinks: [],
    logoLabel: "Brand Logo",
    rightLinks: []
  }
  private log: Log = new Log(HamburgerNav.name);

  private navProps: IHamburgerNav;
  private styleString: string = "navbar";
  private styleStringLight: string = " navbar-light";
  private styleStringDark: string = " navbar-dark";
  private expandDesktopStyle: string = " navbar-expand-lg";
  private expandTabletStyle: string = " navbar-expand-md";
  private expandMobileStyle: string = " navbar-expand-sm";

  private logoElement: JSX.Element | null = null;
  private leftNavLinks: JSX.Element[] | null;
  private rightNavLinks: JSX.Element[] | null;

  constructor(props: IHamburgerNav) {
    super(props);

    this.navProps = props;
    this.setStyleString();
    this.setLogo();
    this.leftNavLinks = _.map(this.navProps.leftLinks, this.generateNavLinks);
    this.rightNavLinks = _.map(this.navProps.rightLinks, this.generateNavLinks);
    this.log.debug("Construction success: "+HamburgerNav.name);
  }

  public componentDidMount() {
    if( this.props.closeOnClick ){
      this.setState({menuOpen:false});
    }
  }

  public render() {
      return (
          <nav className={this.styleString}>
              {this.logoElement}
              <a className="navbar-brand" href="#">{this.navProps.title}</a>
              <button className="navbar-toggler" onClick={this.toggleNav} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent1"
                  aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"/>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  { this.leftNavLinks  &&
                      <ul className="nav-left navbar-nav mr-auto align-items-end">
                          {this.leftNavLinks}
                      </ul>
                  }
                  { this.rightNavLinks  && (
                      <ul className="nav-right nav navbar-nav ml-auto navbar-right align-items-end">
                          {this.rightNavLinks}
                      </ul>)
                  }
              </div>
          </nav>
      );
  }

  private generateNavLinks = (item:INavItem,index:number) => {
    item.clickEvent = this.closeNav;
    return NavItem.navItemMapper(item,index);
  }

  private closeNav = () => {
    if( this.state.menuOpen === true ){
      this.setState({menuOpen:false});
    }
  };

  private toggleNav = () => {
      this.setState({menuOpen:!this.state.menuOpen});
  }

   private setLogo(){
       if( this.navProps.logoSrc ){
           this.logoElement = <img src={this.navProps.logoSrc} alt={this.navProps.logoLabel} className="navbar-app-logo"/>;
       }
   }

   private setStyleString(){
       if( this.navProps.dark ){
           this.styleString += this.styleStringDark;
       }else{
           this.styleString += this.styleStringLight;
       }
       this.styleString += this.navProps.expandDesktop ? this.expandDesktopStyle:'';
       this.styleString += this.navProps.expandMobile ? this.expandMobileStyle: '' ;
       this.styleString += this.navProps.expandTablet ? this.expandTabletStyle: '';

   }
}
