import { useTranslation } from "@dzangolab/react-i18n";
import {
  CollapsibleSidebarHeaderLayout,
  NavMenuType,
  NavMenuItemType,
} from "@dzangolab/react-layout";
import { toast } from "react-toastify";

import { removeUserData } from "@/helpers";
import { useUser } from "@/hooks";
import logout from "@/supertokens/logout";

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

export const UserEnabledCollapsibleSidebarHeaderLayout: React.FC<
  Properties
> = ({
  authNavigationMenu,
  children,
  className,
  customSidebar,
  collapsible,
  displayNavIcons,
  navigationMenu,
  userNavigationMenu,
  onLogout,
}) => {
  const { t } = useTranslation("user");

  const { user, setUser } = useUser();

  const getUserMenu = () => {
    if (!user) {
      return authNavigationMenu;
    }

    const signout = async () => {
      if (await logout()) {
        await removeUserData();
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
    <CollapsibleSidebarHeaderLayout
      children={children}
      className={className}
      collapsible={collapsible}
      displayNavIcons={displayNavIcons}
      navigationMenu={navigationMenu}
      userMenu={getUserMenu()}
      customSidebar={customSidebar}
    />
  );
};
