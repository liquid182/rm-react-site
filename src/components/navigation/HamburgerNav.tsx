import * as _ from "lodash";
import * as React from "react";
import { INavItem, NavItem } from "./NavItem";
import { Log } from "../../logging/Log";
import "./HamburgerNav.scss"

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
  private styleStringLight: string = " navbar-light";
  private styleStringDark: string = " navbar-dark";
  private expandDesktopStyle: string = " navbar-expand-lg";
  private expandTabletStyle: string = " navbar-expand-md";
  private expandMobileStyle: string = " navbar-expand-sm";
  private showMenuStyle: string = " show";

  private logoElement: JSX.Element | null = null;
  private leftNavLinks: JSX.Element[] | null;
  private rightNavLinks: JSX.Element[] | null;

  constructor(props: IHamburgerNav) {
    super(props);

    this.navProps = props;
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
          <nav className={this.getNavStyles()}>
              {this.logoElement}
              <a className="navbar-brand" href="#">{this.navProps.title}</a>
              <button className={this.getHamburgerStyles()} onClick={this.toggleNav} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent1"
                  aria-expanded="false" aria-label="Toggle navigation">
                  <span className="icon-bar top-bar"></span>
                  <span className="icon-bar middle-bar"></span>
                  <span className="icon-bar bottom-bar"></span>
                  <span className="sr-only">Toggle navigation</span>
                  <span className="sr-only">Toggle navigation</span>
              </button>
              <div className={this.getCollapsedStyles()} id="navbarSupportedContent">
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
    this.log.debug("Closing nav.Menu Open:"+this.state.menuOpen);
    if( this.state.menuOpen === true ){
      this.setState({menuOpen:false});
    }
  };

  private toggleNav = () => {
    this.log.debug("Toggling Nav to:"+!this.state.menuOpen);
    this.setState({menuOpen:!this.state.menuOpen});
  }

  private setLogo(){
    if( this.navProps.logoSrc ){
      this.logoElement = <img src={this.navProps.logoSrc} alt={this.navProps.logoLabel} className="navbar-app-logo"/>;
    }
  }

  private getCollapsedStyles = ():string => {
    let styleString = "collapse navbar-collapse";
    if( this.state && this.state.menuOpen === true ){
      styleString += this.showMenuStyle;
    }
    return styleString;
  };

  private getHamburgerStyles = ():string => {
    let styleString = "navbar-toggler";
    if(this.state && this.state.menuOpen !== true){
      styleString += " collapsed";
    }
    return styleString;
  };
  private getNavStyles = ():string => {
    let styleString:string = "navbar";
    if( this.navProps.dark ){
      styleString += this.styleStringDark;
    }else{
      styleString += this.styleStringLight;
    }
    styleString += this.navProps.expandDesktop ? this.expandDesktopStyle:'';
    styleString += this.navProps.expandMobile ? this.expandMobileStyle: '' ;
    styleString += this.navProps.expandTablet ? this.expandTabletStyle: '';
    return styleString;
  }
}
