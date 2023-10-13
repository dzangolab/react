import { CollapsibleSidebarLayout } from "@dzangolab/react-layout";
import { useMediaQuery } from "@dzangolab/react-ui";

import DropdownUserMenu from "../components/DropdownUserMenu";
import UserMenu from "../components/UserMenu";
import { getHomeRoute } from "../helpers";
import { useConfig, useUser } from "../hooks";
import { UserMenuItemType } from "../types";

interface Properties {
  anonymousUserMenu?: React.ReactNode;
  authenticatedUserMenu?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  mainMenuRoutes: {
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
}

const UserEnabledSidebarLayout: React.FC<Properties> = (properties) => {
  const { layout: layoutConfig, user: userConfig } = useConfig();
  const { user } = useUser();
  const isSmallScreen = useMediaQuery("(max-width: 576px)");

  const home = getHomeRoute(user, layoutConfig, userConfig);

  const {
    anonymousUserMenu,
    authenticatedUserMenu,
    children,
    displaySidebarMenuIcon = true,
    footer,
    mainMenuRoutes,
    onLogout,
    customSidebar,
    userMenu,
    userMenuCollapsedIcon,
    userMenuExpandIcon,
    userMenuLabel,
    header,
    localSwitcher,
    logoRoute,
    mainMenu,
    mainMenuOrientation,
    menuToggle,
  } = properties;

  return (
    <CollapsibleSidebarLayout
      children={children}
      footer={footer}
      mainMenuRoutes={mainMenuRoutes}
      logoRoute={logoRoute || home}
      header={header}
      displaySidebarMenuIcon={displaySidebarMenuIcon}
      localSwitcher={localSwitcher}
      mainMenu={mainMenu || <></>}
      mainMenuOrientation={mainMenuOrientation}
      menuToggle={menuToggle}
      userMenu={
        <UserMenu
          authenticatedUserMenu={
            authenticatedUserMenu || (
              <DropdownUserMenu
                collapseIcon={userMenuCollapsedIcon}
                expandIcon={userMenuExpandIcon}
                label={userMenuLabel}
                onLogout={onLogout}
                userMenu={userMenu}
              />
            )
          }
          anonymousUserMenu={anonymousUserMenu}
        />
      }
      sidebar={customSidebar}
      displaySidebar={!!(user && !isSmallScreen)}
    />
  );
};

export default UserEnabledSidebarLayout;
