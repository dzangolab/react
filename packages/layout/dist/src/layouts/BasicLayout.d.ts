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
    fixed?: boolean;
}
export declare const BasicLayout: React.FC<Properties>;
export {};
//# sourceMappingURL=BasicLayout.d.ts.map