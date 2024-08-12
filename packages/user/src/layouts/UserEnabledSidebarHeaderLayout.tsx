import { useTranslation } from "@dzangolab/react-i18n";
import {
  SidebarHeaderLayout,
  NavMenuType,
  NavMenuItemType,
} from "@dzangolab/react-layout";
import { toast } from "react-toastify";

import { useUser } from "@/hooks";
import logout from "@/supertokens/logout";

interface Properties {
  authNavigationMenu?: NavMenuItemType;
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  customHeader?: React.ReactNode;
  customSidebar?: React.ReactNode;
  displayNavIcons?: boolean;
  headerAddon?: React.ReactNode;
  navigationMenu?: NavMenuType;
  noLocaleSwitcher?: boolean;
  noLogo?: boolean;
  noSidebarHeader?: boolean;
  noSidebarFooter?: boolean;
  noToggle?: boolean;
  title?: string | React.ReactNode;
  userNavigationMenu?: NavMenuItemType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLogout?: () => Promise<any>;
  userMenuLocation?: "sidebar" | "header";
  userMenuTrigger?: React.ReactNode;
}

export const UserEnabledSidebarHeaderLayout: React.FC<Properties> = ({
  authNavigationMenu,
  children,
  className,
  collapsible,
  navigationMenu,
  userNavigationMenu,
  onLogout,
  userMenuLocation = "header",
  ...otherProperties
}) => {
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

  const getNavigationMenu = () => {
    const userNavigationMenu = getUserNavigationMenu();

    if (!userNavigationMenu) {
      return navigationMenu;
    }

    if (!navigationMenu) {
      return userNavigationMenu;
    }

    if (Array.isArray(navigationMenu)) {
      return [...navigationMenu, userNavigationMenu];
    }

    return [navigationMenu, userNavigationMenu];
  };

  return (
    <SidebarHeaderLayout
      children={children}
      className={className}
      collapsible={collapsible}
      navigationMenu={getNavigationMenu()}
      userMenu={user ? getUserNavigationMenu() : undefined}
      userMenuMode={user ? "vertical" : "horizontal"}
      userMenuLocation={userMenuLocation}
      {...otherProperties}
    />
  );
};
