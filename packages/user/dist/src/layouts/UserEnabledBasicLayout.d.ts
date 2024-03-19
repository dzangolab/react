/// <reference types="react" />
import { UserMenuItemType } from "../types";
interface Properties {
    anonymousUserMenu?: React.ReactNode;
    authenticatedUserMenu?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    onLogout?: () => void;
    userMenu?: UserMenuItemType[];
    userMenuCollapsedIcon?: React.ReactNode;
    userMenuExpandIcon?: React.ReactNode;
    userMenuLabel?: React.ReactNode;
    header?: React.ReactNode;
    localSwitcher?: React.ReactNode;
    menuToggle?: React.ReactNode;
    mainMenuRoutes?: {
        name: string;
        route: string;
    }[];
    mainMenuOrientation?: "horizontal" | "vertical";
    mainMenu?: React.ReactNode;
    logoRoute?: string;
    showUserMenuIcon?: boolean;
    fixed?: boolean;
}
export declare const UserEnabledBasicLayout: React.FC<Properties>;
export {};
//# sourceMappingURL=UserEnabledBasicLayout.d.ts.map