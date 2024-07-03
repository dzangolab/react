import { useTranslation } from "@dzangolab/react-i18n";
import {
  HeaderLayout,
  NavMenuItemType,
  NavMenuType,
} from "@dzangolab/react-layout";
import { toast } from "react-toastify";

import { logout, useUser } from "..";

interface IProperties {
  authNavigationMenu?: NavMenuItemType;
  className?: string;
  children?: React.ReactNode;
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
  const { t } = useTranslation("user");

  const { user, setUser } = useUser();

  const getUserNavigationMenu = () => {
    if (!user) {
      return authNavigationMenu;
    }

    const signout = async () => {
      if (await logout()) {
        await setUser(null);

        onLogout && (await onLogout());

        toast.success(t("logout.message"));
      }
    };

    const signoutRoute = {
      icon: "pi pi-power-off",
      label: t("userMenu.logout"),
      onClick: signout,
    };

    if (!userNavigationMenu) {
      return { menu: [signoutRoute] };
    }

    return {
      ...userNavigationMenu,
      menu: [...userNavigationMenu.menu, signoutRoute],
    };
  };

  return (
    <HeaderLayout
      {...{
        className,
        children,
        customHeader,
        displayNavIcons,
        fixed,
        headerAddon,
        navigationMenu,
        title,
        menu: getUserNavigationMenu(),
        noLogo,
        noLocaleSwitcher,
        noToggle,
      }}
      userMenuMode={user ? "vertical" : "horizontal"}
    />
  );
};
