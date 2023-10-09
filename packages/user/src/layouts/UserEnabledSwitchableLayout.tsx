import {
  AppHeader,
  Logo,
  MainMenu,
  Sidebar,
  SwitchableLayout,
} from "@dzangolab/react-layout";
import { ResponsiveMenu, useMediaQuery } from "@dzangolab/react-ui";
import React, { FC, useCallback } from "react";

import { getHomeRoute } from "@/helpers";
import { useConfig } from "@/hooks";
import { UserMenuItemType } from "@/types";

import { DropdownUserMenu, UserMenu, useUser } from "..";

interface Properties {
  anonymousUserMenu?: React.ReactNode;
  authenticatedUserMenu?: React.ReactNode;
  children: React.ReactNode;
  displaySidebarMenuIcon?: boolean;
  footer?: React.ReactNode;
  layoutType?: "basic" | "sidebar";
  localSwitcher?: React.ReactNode;
  menuToggle?: React.ReactNode;
  mainMenuRoutes: {
    name: string;
    route: string;
  }[];
  mainMenuOrientation?: "horizontal" | "vertical";
  onLogout?: () => void;
  customSidebar?: React.ReactNode;
  userMenu?: UserMenuItemType[];
  userMenuCollapsedIcon?: React.ReactNode;
  userMenuExpandIcon?: React.ReactNode;
  userMenuLabel?: React.ReactNode;
}

export const UserEnabledSwitchableLayout: FC<Properties> = (properties) => {
  const { layout: layoutConfig, user: userConfig } = useConfig();

  const { user } = useUser();

  const isSmallScreen = useMediaQuery("(max-width: 576px)");

  const home = getHomeRoute(user, layoutConfig, userConfig);

  const {
    anonymousUserMenu,
    authenticatedUserMenu,
    children,
    displaySidebarMenuIcon,
    footer,
    layoutType = "basic",
    localSwitcher,
    mainMenuRoutes,
    mainMenuOrientation,
    menuToggle,
    onLogout,
    customSidebar,
    userMenu,
    userMenuCollapsedIcon,
    userMenuExpandIcon,
    userMenuLabel,
  } = properties;

  const renderSidebar = useCallback(() => {
    if (user && !isSmallScreen && layoutType === "sidebar") {
      if (customSidebar) {
        return customSidebar;
      }

      return (
        <Sidebar>
          <ResponsiveMenu
            routes={mainMenuRoutes}
            orientation="vertical"
            displayIcon={displaySidebarMenuIcon}
          />
        </Sidebar>
      );
    }

    return null;
  }, [
    customSidebar,
    user,
    isSmallScreen,
    layoutType,
    mainMenuRoutes,
    displaySidebarMenuIcon,
  ]);

  const renderHeader = useCallback(() => {
    const renderMainMenu = () => {
      if ((isSmallScreen && user) || (user && layoutType === "basic")) {
        return (
          <MainMenu routes={mainMenuRoutes} orientation={mainMenuOrientation} />
        );
      }

      return null;
    };

    return (
      <>
        <AppHeader
          localeSwitcher={localSwitcher}
          toggle={menuToggle}
          mainMenu={renderMainMenu()}
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
          logo={<Logo source={layoutConfig?.logo} route={home} />}
        />
      </>
    );
  }, []);

  return (
    <SwitchableLayout
      children={children}
      footer={footer}
      layoutType={layoutType}
      header={renderHeader()}
      sidebar={renderSidebar()}
    />
  );
};
