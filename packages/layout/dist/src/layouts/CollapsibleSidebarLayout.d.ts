import React from "react";
interface Properties {
    children: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    localSwitcher?: React.ReactNode;
    menuToggle?: React.ReactNode;
    mainMenuRoutes?: {
        name: string;
        route: string;
        icon?: React.ReactNode;
    }[];
    mainMenuOrientation?: "horizontal" | "vertical";
    userMenu?: React.ReactNode;
    mainMenu?: React.ReactNode;
    logoRoute?: string;
    sidebar?: React.ReactNode;
    displaySidebarMenuIcon?: boolean;
    displaySidebar?: boolean;
    fixed?: boolean;
}
export declare const CollapsibleSidebarLayout: React.FC<Properties>;
export {};
//# sourceMappingURL=CollapsibleSidebarLayout.d.ts.map