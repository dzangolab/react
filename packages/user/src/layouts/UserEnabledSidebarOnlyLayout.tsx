import { useTranslation } from "@dzangolab/react-i18n";
import { SidebarOnlyLayout } from "@dzangolab/react-layout";
import { toast } from "react-toastify";

import { useUser } from "@/hooks";
import logout from "@/supertokens/logout";

import type { NavMenuItemType, NavMenuType } from "@dzangolab/react-layout";

interface Properties {
  authNavigationMenu?: NavMenuItemType;
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  customSidebar?: React.ReactNode;
  displayNavIcons?: boolean;
  navigationMenu?: NavMenuType;
  userNavigationMenu?: NavMenuItemType;
  noSidebarHeader?: boolean;
  noSidebarFooter?: boolean;
  noLocaleSwitcher?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLogout?: () => Promise<any>;
}

export const UserEnabledSidebarOnlyLayout: React.FC<Properties> = ({
  authNavigationMenu,
  children,
  className,
  customSidebar,
  collapsible,
  displayNavIcons,
  navigationMenu,
  noSidebarHeader,
  noSidebarFooter,
  noLocaleSwitcher,
  userNavigationMenu,
  onLogout,
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

    if (!navigationMenu) {
      return userNavigationMenu;
    }

    if (Array.isArray(navigationMenu)) {
      return [...navigationMenu, userNavigationMenu];
    }

    return [navigationMenu, userNavigationMenu];
  };

  return (
    <SidebarOnlyLayout
      children={children}
      className={className}
      collapsible={collapsible}
      displayNavIcons={displayNavIcons}
      navigationMenu={getNavigationMenu()}
      customSidebar={customSidebar}
      noSidebarHeader={noSidebarHeader}
      noSidebarFooter={noSidebarFooter}
      noLocaleSwitcher={noLocaleSwitcher}
    />
  );
};
