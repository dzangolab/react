import { useTranslation } from "@dzangolab/react-i18n";
import { SidebarOnlyLayout } from "@dzangolab/react-layout";
import { toast } from "react-toastify";

import { removeUserData } from "@/helpers";
import { useUser } from "@/hooks";
import logout from "@/supertokens/logout";

import type { NavigationMenu } from "@dzangolab/react-layout";

interface Properties {
  authNavigationMenu?: NavigationMenu;
  userNavigation?: React.ReactNode;
  userNavigationMenu?: NavigationMenu;
  children: React.ReactNode;
  displayNavIcons?: boolean;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  navigation?: React.ReactNode;
  navigationMenu: NavigationMenu;
  onLogout?: () => Promise<any>;
}

export const UserEnabledSidebarOnlyLayout: React.FC<Properties> = ({
  authNavigationMenu,
  userNavigation,
  userNavigationMenu,
  children,
  displayNavIcons,
  footer,
  header,
  navigation,
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
      header={header}
      footer={footer}
      navigationMenu={navigationMenu}
      children={children}
      navigation={navigation}
      displayNavIcons={displayNavIcons}
      bottomNavigation={userNavigation}
      bottomNavigationMenu={getBottomNavigationMenu()}
    />
  );
};
