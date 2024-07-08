import { BasicLayout } from "@dzangolab/react-layout";

import DropdownUserMenu, {
  DropdownUserMenuProperties,
} from "../components/DropdownUserMenu";
import UserMenu from "../components/UserMenu";
import { getHomeRoute } from "../helpers";
import { useConfig, useUser } from "../hooks";

interface Properties {
  anonymousUserMenu?: React.ReactNode;
  authenticatedUserMenu?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  dropdownUserMenu?: DropdownUserMenuProperties;
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
  fixed?: boolean;
}

/**
 * @deprecated Use user enabled header layout instead
 */
export const UserEnabledBasicLayout: React.FC<Properties> = (properties) => {
  const { layout: layoutConfig, user: userConfig } = useConfig();
  const { user } = useUser();

  const homeRoute = getHomeRoute(user, layoutConfig, userConfig);

  const {
    anonymousUserMenu,
    authenticatedUserMenu,
    children,
    footer,
    dropdownUserMenu,
    mainMenuRoutes,
    mainMenu,
    mainMenuOrientation,
    header,
    localSwitcher,
    logoRoute,
    menuToggle,
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
            authenticatedUserMenu || <DropdownUserMenu {...dropdownUserMenu} />
          }
          anonymousUserMenu={anonymousUserMenu}
        />
      }
    />
  );
};
