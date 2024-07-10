import { CollapsibleSidebarLayout } from "@dzangolab/react-layout";
import { useMediaQuery } from "@dzangolab/react-ui";

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
  dropdownUserMenu?: DropdownUserMenuProperties;
  footer?: React.ReactNode;
  mainMenuRoutes?: {
    name: string;
    route: string;
    icon?: React.ReactNode;
  }[];
  customSidebar?: React.ReactNode;
  displaySidebarMenuIcon?: boolean;
  header?: React.ReactNode;
  localSwitcher?: React.ReactNode;
  menuToggle?: React.ReactNode;
  mainMenuOrientation?: "horizontal" | "vertical";
  mainMenu?: React.ReactNode;
  logoRoute?: string;
  fixed?: boolean;
}

/**
 * @deprecated This layout is deprecated and might be removed in future versions.
 *             Use UserEnabledSidebarHeaderLayout or UserEnabledSidebarOnlyLayout for compatibility with latest standards.
 */
export const UserEnabledSidebarLayout: React.FC<Properties> = (properties) => {
  const { layout: layoutConfig, user: userConfig } = useConfig();
  const { user } = useUser();
  const isSmallScreen = useMediaQuery("(max-width: 576px)");

  const homeRoute = getHomeRoute(user, layoutConfig, userConfig);

  const {
    anonymousUserMenu,
    authenticatedUserMenu,
    children,
    dropdownUserMenu,
    displaySidebarMenuIcon = true,
    footer,
    mainMenuRoutes,
    customSidebar,
    header,
    localSwitcher,
    logoRoute,
    mainMenu,
    mainMenuOrientation,
    menuToggle,
    fixed,
  } = properties;

  const renderMainMenu = () => {
    if (!isSmallScreen) {
      return <></>;
    }

    return mainMenu;
  };

  return (
    <CollapsibleSidebarLayout
      children={children}
      footer={footer}
      mainMenuRoutes={mainMenuRoutes}
      logoRoute={logoRoute || homeRoute}
      header={header}
      displaySidebarMenuIcon={displaySidebarMenuIcon}
      localSwitcher={localSwitcher}
      mainMenu={renderMainMenu()}
      mainMenuOrientation={mainMenuOrientation}
      menuToggle={menuToggle}
      userMenu={
        <UserMenu
          authenticatedUserMenu={
            authenticatedUserMenu || <DropdownUserMenu {...dropdownUserMenu} />
          }
          anonymousUserMenu={anonymousUserMenu}
        />
      }
      sidebar={customSidebar}
      displaySidebar={!!(user && !isSmallScreen)}
      fixed={fixed}
    />
  );
};
