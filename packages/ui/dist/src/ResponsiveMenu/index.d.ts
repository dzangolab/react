import React from "react";
export type MenuRouteType = {
    name: string;
    route: string;
    icon?: React.ReactNode;
};
export type NestedMenuRouteType = Omit<MenuRouteType, "route"> & {
    route?: string;
    submenu: Array<MenuRouteType>;
};
export type CombinedMenuRouteType = Array<MenuRouteType | NestedMenuRouteType>;
interface Properties {
    className: string;
    orientation?: "horizontal" | "vertical";
    routes: CombinedMenuRouteType;
    displayIcon?: boolean;
}
declare const ResponsiveMenu: {
    ({ className, displayIcon, orientation, routes, }: Properties): React.JSX.Element;
    defaultProps: {
        className: undefined;
    };
};
export default ResponsiveMenu;
//# sourceMappingURL=index.d.ts.map