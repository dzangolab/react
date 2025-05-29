import { HeaderLayout } from "@dzangolab/react-layout";

import { useUser, useUserNavigationMenu } from "..";

import type { NavMenuItemType, NavMenuType } from "@dzangolab/react-ui";

interface IProperties {
  authNavigationMenu?: NavMenuItemType;
  className?: string;
  children?: React.ReactNode;
  customFooter?: React.ReactNode;
  customHeader?: React.ReactNode;
  displayNavIcons?: boolean;
  fixed?: boolean;
  headerAddon?: React.ReactNode;
  userNavigationMenu?: NavMenuItemType;
  navigationMenu?: NavMenuType;
  noLocaleSwitcher?: boolean;
  noLogo?: boolean;
  noToggle?: boolean;
  title?: string | React.ReactNode;
  onLogout?: () => Promise<void>;
}

export const UserEnabledHeaderLayout = ({
  authNavigationMenu,
  children,
  className,
  customFooter,
  customHeader,
  displayNavIcons,
  fixed,
  headerAddon,
  userNavigationMenu,
  navigationMenu,
  noLocaleSwitcher,
  noLogo,
  noToggle,
  title,
  onLogout,
}: IProperties) => {
  const { user } = useUser();

  const _userNavigationMenu = useUserNavigationMenu({
    userNavigationMenu,
    layout: "UserEnabledHeaderLayout",
    authNavigationMenu,
    onLogout,
  });

  return (
    <HeaderLayout
      {...{
        className,
        children,
        customFooter,
        customHeader,
        displayNavIcons,
        fixed,
        headerAddon,
        navigationMenu,
        title,
        menu: _userNavigationMenu,
        noLogo,
        noLocaleSwitcher,
        noToggle,
      }}
      userMenuMode={user ? "popup" : "horizontal"}
    />
  );
};
