import React from "react";
interface Properties {
    localeSwitcher?: React.ReactNode;
    logo?: React.ReactNode;
    logoRoute?: string;
    mainMenu?: React.ReactNode;
    mainMenuRoutes?: {
        name: string;
        route: string;
    }[];
    mainMenuOrientation?: "horizontal" | "vertical";
    navStyle?: "dropdown" | "left-slider";
    toggle?: React.ReactNode;
    userMenu?: React.ReactNode;
}
declare const AppHeader: React.FC<Properties>;
export default AppHeader;
//# sourceMappingURL=AppHeader.d.ts.map