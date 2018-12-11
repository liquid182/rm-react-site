export interface INavItem {
    label:string ,
    url:string,
    key?:string,
}

export interface IHamburgerNav {
    title:string ,
    dark?:boolean,
    expandDesktop?:boolean,
    expandTablet?:boolean,
    expandMobile?:boolean,
    logoSrc?:string,
    logoLabel?:string,
    leftLinks?:INavItem[]|undefined,
    rightLinks:INavItem[]|undefined
}