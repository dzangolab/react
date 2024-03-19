/// <reference types="react" />
import { UserMenuItemType } from "../types";
interface Properties {
    anonymousUserMenu?: React.ReactNode;
    authenticatedUserMenu?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    mainMenuRoutes?: {
        name: string;
        route: string;
        icon?: React.ReactNode;
    }[];
    onLogout?: () => void;
    customSidebar?: React.ReactNode;
    displaySidebarMenuIcon?: boolean;
    userMenu?: UserMenuItemType[];
    userMenuCollapsedIcon?: React.ReactNode;
    userMenuExpandIcon?: React.ReactNode;
    userMenuLabel?: React.ReactNode;
    header?: React.ReactNode;
    localSwitcher?: React.ReactNode;
    menuToggle?: React.ReactNode;
    mainMenuOrientation?: "horizontal" | "vertical";
    mainMenu?: React.ReactNode;
    logoRoute?: string;
    showUserMenuIcon?: boolean;
    fixed?: boolean;
}
export declare const UserEnabledSidebarLayout: React.FC<Properties>;
export {};
//# sourceMappingURL=UserEnabledSidebarLayout.d.ts.map