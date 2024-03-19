import React from "react";
import { NavMenuType } from "../types";
interface HeaderProperties {
    children?: React.ReactNode;
    displayNavIcons?: boolean;
    navigationMenu?: NavMenuType;
    title?: string | React.ReactNode;
    menu?: React.ReactNode;
    noLocaleSwitcher?: boolean;
    noLogo?: boolean;
    noToggle?: boolean;
}
export declare const Header: ({ children, displayNavIcons, title, navigationMenu, menu, noLocaleSwitcher, noLogo, noToggle, }: HeaderProperties) => React.JSX.Element;
export {};
//# sourceMappingURL=Header.d.ts.map