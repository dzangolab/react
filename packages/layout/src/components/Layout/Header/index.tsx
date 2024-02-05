import { LocaleSwitcher } from "@dzangolab/react-i18n";
import React from "react";

import { Logo, NavigationMenu, ToggleMenuMobile } from "../common";
import { NavigationMenuType } from "../types";

interface HeaderProperties {
  children?: React.ReactNode;
  navigationMenu?: NavigationMenuType;
  userMenu?: React.ReactNode; // TODO update to NavigationMenuItem[] when we have UserMenu component in layout package
}

export const Header = ({
  children,
  navigationMenu,
  userMenu,
}: HeaderProperties) => {
  const renderContent = () => {
    return (
      <>
        <Logo />
        {navigationMenu && (
          <NavigationMenu navigationMenu={navigationMenu} horizontal />
        )}
        {userMenu}
        <LocaleSwitcher />
        <ToggleMenuMobile />
      </>
    );
  };
  return <header>{children || renderContent()}</header>;
};
