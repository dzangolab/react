import { SidebarOnlyLayout } from "@dzangolab/react-layout";

import { useUser } from "@/hooks";

import { useUserNavigationMenu } from "..";

import type { SidebarOnlyLayoutProperties } from "@dzangolab/react-layout";
import type { NavMenuItemType } from "@dzangolab/react-ui";

interface Properties extends Omit<SidebarOnlyLayoutProperties, "userMenu"> {
  authNavigationMenu?: NavMenuItemType;
  userNavigationMenu?: NavMenuItemType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLogout?: () => Promise<any>;
}

export const UserEnabledSidebarOnlyLayout: React.FC<Properties> = ({
  authNavigationMenu,
  children,
  className,
  customSidebar,
  collapsible,
  displayNavIcons,
  navigationMenu,
  noSidebarHeader,
  noSidebarFooter,
  noLocaleSwitcher,
  userNavigationMenu,
  userMenuMode,
  onLogout,
}) => {
  const { user } = useUser();

  const userMenu = useUserNavigationMenu({
    authNavigationMenu,
    layout: "UserEnabledSidebarOnlyLayout",
    userNavigationMenu,
    onLogout,
  });

  return (
    <SidebarOnlyLayout
      children={children}
      className={className}
      collapsible={collapsible}
      displayNavIcons={displayNavIcons}
      navigationMenu={user ? navigationMenu : authNavigationMenu} //use userMenu instead of authNavigation
      customSidebar={customSidebar}
      noSidebarHeader={noSidebarHeader}
      noSidebarFooter={noSidebarFooter}
      noLocaleSwitcher={noLocaleSwitcher}
      userMenu={user ? userMenu : undefined}
      userMenuMode={userMenuMode}
    />
  );
};
