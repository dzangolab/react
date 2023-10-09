import {
  AppHeader,
  Logo,
  MainMenu,
  Sidebar,
  SwitchableLayout,
} from "@dzangolab/react-layout";
import { ResponsiveMenu, useMediaQuery } from "@dzangolab/react-ui";
import React, { FC } from "react";

import { getHomeRoute } from "@/helpers";
import { useConfig } from "@/hooks";
import { UserMenuItemType } from "@/types";

import { DropdownUserMenu, UserMenu, useUser } from "..";

interface Properties {
  anonymousUserMenu?: React.ReactNode;
  authenticatedUserMenu?: React.ReactNode;
  children: React.ReactNode;
  displaySideBarMenuIcon?: boolean;
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
    displaySideBarMenuIcon,
    footer,
    layoutType = "basic",
    localSwitcher,
    mainMenuRoutes,
    mainMenuOrientation,
    menuToggle,
    onLogout,
    customSidebar = (
      <Sidebar>
        <ResponsiveMenu
          routes={mainMenuRoutes}
          orientation="vertical"
          displayIcon={displaySideBarMenuIcon}
        />
      </Sidebar>
    ),
    userMenu,
    userMenuCollapsedIcon,
    userMenuExpandIcon,
    userMenuLabel,
  } = properties;

  return (
    <SwitchableLayout
      children={children}
      footer={footer}
      layoutType={layoutType}
      header={
        <AppHeader
          localeSwitcher={localSwitcher}
          toggle={menuToggle}
          mainMenu={
            (isSmallScreen && user) || (user && layoutType === "basic") ? (
              <MainMenu
                routes={mainMenuRoutes}
                orientation={mainMenuOrientation}
              />
            ) : null
          }
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
      }
      sidebar={
        user && !isSmallScreen && layoutType === "sidebar"
          ? customSidebar
          : null
      }
    />
  );
};
