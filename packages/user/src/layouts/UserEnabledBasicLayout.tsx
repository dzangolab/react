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
  isLayoutFixed?: boolean;
}

const UserEnabledBasicLayout: React.FC<Properties> = (properties) => {
  const { layout: layoutConfig, user: userConfig } = useConfig();
  const { user } = useUser();

  const home = getHomeRoute(user, layoutConfig, userConfig);

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
    isLayoutFixed,
  } = properties;

  return (
    <BasicLayout
      children={children}
      footer={footer}
      mainMenuRoutes={mainMenuRoutes}
      mainMenu={mainMenu}
      mainMenuOrientation={mainMenuOrientation}
      header={header}
      logoRoute={logoRoute || home}
      menuToggle={menuToggle}
      localSwitcher={localSwitcher}
      isLayoutFixed={isLayoutFixed}
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

export default UserEnabledBasicLayout;
