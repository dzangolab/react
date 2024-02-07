import { LocaleSwitcher } from "@dzangolab/react-i18n";
import React from "react";

import { Logo, NavigationMenu, ToggleMenuMobile } from "../common";
import { NavMenuType } from "../types";

interface HeaderProperties {
  children?: React.ReactNode;
  displayNavIcons?: boolean;
  navigationMenu?: NavMenuType;
  userMenu?: React.ReactNode; // TODO update to NavigationMenuItem[] when we have UserMenu component in layout package
}

export const Header = ({
  children,
  displayNavIcons,
  navigationMenu,
  userMenu,
}: HeaderProperties) => {
  const renderContent = () => {
    return (
      <>
        <Logo />
        <NavigationMenu
          navigationMenu={navigationMenu || []}
          displayIcons={displayNavIcons}
          horizontal
        />
        {userMenu}
        <LocaleSwitcher />
        <ToggleMenuMobile />
      </>
    );
  };
  return <header>{children || renderContent()}</header>;
};
