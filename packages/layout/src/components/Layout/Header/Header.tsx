import { LocaleSwitcher } from "@dzangolab/react-i18n";
import React from "react";

import { HeaderMenu } from "./HeaderMenu";
import { HeaderTitle } from "./HeaderTitle";
import { Logo, NavigationMenu, ToggleMenuMobile } from "../common";
import { NavMenuType } from "../types";

interface HeaderProperties {
  children?: React.ReactNode;
  displayNavIcons?: boolean;
  navigationMenu?: NavMenuType;
  title?: string | React.ReactNode;
  menu?: React.ReactNode; // TODO update to NavigationMenuItem[] when we have UserMenu component in layout package
  noLocaleSwitcher?: boolean;
  noLogo?: boolean;
  noToggle?: boolean;
}

export const Header = ({
  children,
  displayNavIcons,
  title,
  navigationMenu,
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
          <HeaderMenu menu={menu} noLocaleSwitcher={noLocaleSwitcher} />
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
