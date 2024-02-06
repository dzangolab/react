import { useTranslation } from "@dzangolab/react-i18n";
import { SidebarOnlyLayout } from "@dzangolab/react-layout";
import { toast } from "react-toastify";

import { removeUserData } from "@/helpers";
import { useUser } from "@/hooks";
import logout from "@/supertokens/logout";

import type {
  NavigationMenuType,
  NavigationType,
} from "@dzangolab/react-layout";

interface Properties {
  authNavigationMenu?: NavigationMenuType;
  userNavigationMenu?: NavigationMenuType;
  children: React.ReactNode;
  displayNavIcons?: boolean;
  navigation?: NavigationType;
  onLogout?: () => Promise<any>;
}

export const UserEnabledSidebarOnlyLayout: React.FC<Properties> = ({
  authNavigationMenu,
  userNavigationMenu,
  children,
  displayNavIcons,
  navigation,
  onLogout,
}) => {
  const { t } = useTranslation("user");

  const { user, setUser } = useUser();

  const getBottomNavigationMenu = () => {
    if (!user) {
      return { primary: true, menu: authNavigationMenu || [] };
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

    return {
      primary: false,
      menu: userNavigationMenu
        ? [...userNavigationMenu, signoutRoute]
        : [signoutRoute],
    };
  };

  const getNavigation = () => {
    let navigationMenu: NavigationType = [getBottomNavigationMenu()];

    if (navigation) {
      if (Array.isArray(navigation)) {
        navigationMenu = [...navigation, ...navigationMenu];
      } else {
        navigationMenu.unshift(navigation);
      }
    }

    return navigationMenu;
  };

  return (
    <SidebarOnlyLayout
      children={children}
      displayNavIcons={displayNavIcons}
      navigation={getNavigation()}
    />
  );
};
