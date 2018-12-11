import * as React from "react";
import {NavLink} from "react-router-dom";
import {INavItem} from "./IHamburgerNav";

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
        return (
            <li key={this.navItem.key} className={this.navItemClass}>
                <NavLink
                    className="nav-link" to={this.navItem.url}>{this.navItem.label}
                </NavLink>
            </li>
        );
    }

}