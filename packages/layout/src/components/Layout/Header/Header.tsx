import React from "react";

import { HeaderMenu } from "./HeaderMenu";
import { HeaderTitle } from "./HeaderTitle";
import { Logo, NavigationMenu, ToggleMenuMobile } from "../common";
import { NavMenuItemType, NavMenuType, UserMenuModeType } from "../types";

interface HeaderProperties {
  children?: React.ReactNode;
  displayNavIcons?: boolean;
  headerAddon?: React.ReactNode;
  navigationMenu?: NavMenuType;
  title?: string | React.ReactNode;
  menu?: NavMenuItemType;
  noLocaleSwitcher?: boolean;
  noLogo?: boolean;
  noToggle?: boolean;
  userMenuMode?: UserMenuModeType;
}

export const Header = ({
  children,
  displayNavIcons,
  headerAddon,
  title,
  navigationMenu,
  menu,
  noLocaleSwitcher,
  noLogo,
  noToggle,
  userMenuMode,
}: HeaderProperties) => {
  const renderContent = () => {
    return (
      <>
        {!noLogo && <Logo />}
        {title && <HeaderTitle title={title} />}
        {headerAddon && headerAddon}
        {navigationMenu && (
          <NavigationMenu
            navigationMenu={navigationMenu}
            displayIcons={displayNavIcons}
            horizontal
          />
        )}
        {(menu || !noLocaleSwitcher) && (
          <HeaderMenu
            menu={menu}
            noLocaleSwitcher={noLocaleSwitcher}
            userMenuMode={userMenuMode}
          />
        )}
        {!noToggle && <ToggleMenuMobile />}
      </>
    );
  };

  return (
    <header data-nav={!!navigationMenu}>
      <div className="header-container">{children || renderContent()}</div>
    </header>
  );
};
