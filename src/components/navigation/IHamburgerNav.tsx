export interface INavItem {
    label:string ,
    url:string,
    isSelected?:boolean
}

export interface IHamburgerNav {
    title:string ,
    dark?:boolean,
    expandDesktop?:boolean,
    expandTablet?:boolean,
    expandMobile?:boolean,
    logoSrc?:string,
    logoLabel?:string,
    leftLinks?:INavItem[],
    rightLinks:INavItem[]
}