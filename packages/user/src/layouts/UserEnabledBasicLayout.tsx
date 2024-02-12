import { BasicLayout } from "@dzangolab/react-layout";

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

export const UserEnabledBasicLayout: React.FC<Properties> = (properties) => {
  const { layout: layoutConfig, user: userConfig } = useConfig();
  const { user } = useUser();

  const homeRoute = getHomeRoute(user, layoutConfig, userConfig);

  const {
    anonymousUserMenu,
    authenticatedUserMenu,
    children,
    footer,
    onLogout,
    userMenu,
    userMenuCollapsedIcon,
    userMenuExpandIcon,
    userMenuLabel,
    mainMenuRoutes,
    mainMenu,
    mainMenuOrientation,
    header,
    localSwitcher,
    logoRoute,
    menuToggle,
    showUserMenuIcon,
    fixed,
  } = properties;

  return (
    <BasicLayout
      children={children}
      footer={footer}
      mainMenuRoutes={mainMenuRoutes}
      mainMenu={mainMenu}
      mainMenuOrientation={mainMenuOrientation}
      header={header}
      logoRoute={logoRoute || homeRoute}
      menuToggle={menuToggle}
      localSwitcher={localSwitcher}
      fixed={fixed}
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
                showUserMenuIcon={showUserMenuIcon}
              />
            )
          }
          anonymousUserMenu={anonymousUserMenu}
        />
      }
    />
  );
};
