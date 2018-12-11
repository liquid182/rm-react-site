import * as _ from "lodash";
import "bootstrap";
import * as React from "react";
import { IHamburgerNav } from "./IHamburgerNav";
import { NavItem } from "./NavItem";
//import "../../images/background/blue-waves.svg";

export class HamburgerNav extends React.Component<IHamburgerNav, {}> {

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
    this.leftNavLinks = _.map(this.navProps.leftLinks, NavItem.navItemMapper);
    this.rightNavLinks = _.map(this.navProps.rightLinks, NavItem.navItemMapper);
  }

    public render() {
        return (
            <nav className={this.styleString}>
                {this.logoElement}
                <a className="navbar-brand" href="#">{this.navProps.title}</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent1"
                    aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {(this.leftNavLinks && this.leftNavLinks.length > 0) &&
                        <ul className="nav-left navbar-nav mr-auto align-items-end">
                            {this.leftNavLinks}
                        </ul>
                    }
                    {(this.rightNavLinks && this.rightNavLinks.length > 0) && (
                        <ul className="nav-right nav navbar-nav ml-auto navbar-right align-items-end">
                            {this.rightNavLinks}
                        </ul>)
                    }
                </div>
            </nav>
        );
    }

   private setLogo(){
       if( this.navProps.logoSrc ){
           if( this.navProps.logoLabel == null ){
               this.navProps.logoLabel = "Brand Logo";
           }
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
