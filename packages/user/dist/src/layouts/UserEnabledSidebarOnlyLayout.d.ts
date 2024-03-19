/// <reference types="react" />
import type { NavMenuItemType, NavMenuType } from "@dzangolab/react-layout";
interface Properties {
    authNavigationMenu?: NavMenuItemType;
    children: React.ReactNode;
    customSidebar?: React.ReactNode;
    displayNavIcons?: boolean;
    navigationMenu?: NavMenuType;
    userNavigationMenu?: NavMenuItemType;
    noSidebarHeader?: boolean;
    noSidebarFooter?: boolean;
    onLogout?: () => Promise<any>;
}
export declare const UserEnabledSidebarOnlyLayout: React.FC<Properties>;
export {};
//# sourceMappingURL=UserEnabledSidebarOnlyLayout.d.ts.map