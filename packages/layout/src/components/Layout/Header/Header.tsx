import React from "react";

import { HeaderMenu } from "./HeaderMenu";
import { HeaderTitle } from "./HeaderTitle";
import { Logo, NavigationMenu, ToggleMenuMobile } from "../common";
import { NavMenuItemType, NavMenuType } from "../types";

interface HeaderProperties {
  children?: React.ReactNode;
  displayNavIcons?: boolean;
  navigationMenu?: NavMenuType;
  title?: string | React.ReactNode;
  localeSwitcher?: React.ReactNode;
  menu?: NavMenuItemType;
  noLocaleSwitcher?: boolean;
  noLogo?: boolean;
  noToggle?: boolean;
}

export const Header = ({
  children,
  displayNavIcons,
  title,
  navigationMenu,
  localeSwitcher,
  menu,
  noLocaleSwitcher,
  noLogo,
  noToggle,
}: HeaderProperties) => {
  const renderContent = () => {
    return (
      <>
        {!noLogo && <Logo />}
        {title && <HeaderTitle title={title} />}
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
            localeSwitcher={localeSwitcher}
            noLocaleSwitcher={noLocaleSwitcher}
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
