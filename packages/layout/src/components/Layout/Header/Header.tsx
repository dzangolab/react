import { NavigationMenu } from "@dzangolab/react-ui";
import React from "react";

import { HeaderMenu } from "./HeaderMenu";
import { HeaderTitle } from "./HeaderTitle";
import { Logo, ToggleMenuMobile } from "../common";

import type {
  NavMenuItemType,
  NavMenuType,
  UserMenuModeType,
} from "@dzangolab/react-ui";

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
  userMenuMode = "popup",
}: HeaderProperties) => {
  const renderContent = () => {
    return (
      <>
        {!noToggle && <ToggleMenuMobile />}
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
      </>
    );
  };

  return (
    <header data-nav={!!navigationMenu}>
      <div className="dz-header-container">{children || renderContent()}</div>
    </header>
  );
};
