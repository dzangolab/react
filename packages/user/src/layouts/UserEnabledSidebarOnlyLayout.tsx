import { useTranslation } from "@dzangolab/react-i18n";
import { SidebarOnlyLayout } from "@dzangolab/react-layout";
import { toast } from "react-toastify";

import { removeUserData } from "@/helpers";
import { useUser } from "@/hooks";
import logout from "@/supertokens/logout";

import type { NavigationMenu } from "@dzangolab/react-layout";

interface Properties {
  authNavigationMenu?: NavigationMenu;
  userNavigationMenu?: NavigationMenu;
  children: React.ReactNode;
  displayNavIcons?: boolean;
  navigationMenu: NavigationMenu;
  onLogout?: () => Promise<any>;
}

export const UserEnabledSidebarOnlyLayout: React.FC<Properties> = ({
  authNavigationMenu,
  userNavigationMenu,
  children,
  displayNavIcons,
  navigationMenu,
  onLogout,
}) => {
  const { t } = useTranslation("user");

  const { user, setUser } = useUser();

  const getBottomNavigationMenu = () => {
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

    return userNavigationMenu
      ? [...userNavigationMenu, signoutRoute]
      : [signoutRoute];
  };

  return (
    <SidebarOnlyLayout
      bottomNavigationMenu={getBottomNavigationMenu()}
      children={children}
      displayNavIcons={displayNavIcons}
      navigationMenu={navigationMenu}
    />
  );
};
