import * as React from "react";
import {NavLink} from "react-router-dom";

export interface INavItem {
    clickEvent?:()=>void,
    label:string ,
    url:string,
    key?:string,
}

export class NavItem extends React.Component<INavItem, {}> {

    public static navItemMapper(navItemProp:INavItem, index:number){
        navItemProp.key = String(index);
        return new NavItem(navItemProp).render();
    }

    private navItem:INavItem;
    private navItemClass:string = "nav-item";

    constructor(navItem:INavItem){
        super(navItem);
        this.navItem = navItem;
        if( navItem.key == null ) {
            navItem.key = navItem.url;
        }

    }

    public render(){
      let exact:boolean = false;
      if( this.navItem.url === "/" ){
        exact=true;
      }
      return (
        <li key={this.navItem.key} className={this.navItemClass}>
            <NavLink
                className="nav-link" onClick={this.navItem.clickEvent} to={this.navItem.url} exact={exact}>{this.navItem.label}
            </NavLink>
        </li>
      );
    }

}
