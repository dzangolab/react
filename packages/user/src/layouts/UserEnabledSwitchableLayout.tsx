import { SwitchableLayout } from "@dzangolab/react-layout";
import { useMediaQuery } from "@dzangolab/react-ui";
import React from "react";

import { getHomeRoute } from "@/helpers";
import { useConfig } from "@/hooks";

import { DropdownUserMenu, UserMenu, useUser } from "..";

import type { UserMenuItemType } from "@/types";
import type { FC } from "react";

interface Properties {
  anonymousUserMenu?: React.ReactNode;
  authenticatedUserMenu?: React.ReactNode;
  children: React.ReactNode;
  displaySidebarMenuIcon?: boolean;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  layoutType?: "basic" | "sidebar";
  localSwitcher?: React.ReactNode;
  menuToggle?: React.ReactNode;
  mainMenuRoutes?: {
    label: string;
    route: string;
    icon?: React.ReactNode;
  }[];
  mainMenu?: React.ReactNode;
  mainMenuOrientation?: "horizontal" | "vertical";
  onLogout?: () => void;
  customSidebar?: React.ReactNode;
  userMenu?: UserMenuItemType[];
  userMenuCollapsedIcon?: React.ReactNode;
  userMenuExpandIcon?: React.ReactNode;
  userMenuLabel?: React.ReactNode;
  logoRoute?: string;
  showUserMenuIcon?: boolean;
}

export const UserEnabledSwitchableLayout: FC<Properties> = (properties) => {
  const { layout: layoutConfig, user: userConfig } = useConfig();

  const { user } = useUser();

  const isSmallScreen = useMediaQuery("(max-width: 576px)");

  const homeRoute = getHomeRoute(user, layoutConfig, userConfig);

  const {
    anonymousUserMenu,
    authenticatedUserMenu,
    children,
    displaySidebarMenuIcon = true,
    footer,
    header,
    layoutType = "basic",
    localSwitcher,
    logoRoute,
    mainMenuRoutes,
    mainMenuOrientation,
    menuToggle,
    mainMenu,
    onLogout,
    customSidebar,
    userMenu,
    userMenuCollapsedIcon,
    userMenuExpandIcon,
    userMenuLabel,
    showUserMenuIcon,
  } = properties;

  const renderMainMenu = () => {
    if (!isSmallScreen && layoutType === "sidebar") {
      return <></>;
    }

    return mainMenu;
  };

  return (
    <SwitchableLayout
      layoutType={layoutType}
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
      sidebar={customSidebar}
      displaySidebar={!!(user && !isSmallScreen)}
    />
  );
};
