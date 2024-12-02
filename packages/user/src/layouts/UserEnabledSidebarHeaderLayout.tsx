import { useTranslation } from "@dzangolab/react-i18n";
import {
  NavMenuItemType,
  SidebarHeaderLayout,
  SidebarHeaderLayoutProperties,
} from "@dzangolab/react-layout";
import { toast } from "react-toastify";

import { useUser } from "@/hooks";
import { logout } from "@/supertokens";

interface Properties extends SidebarHeaderLayoutProperties {
  authNavigationMenu?: NavMenuItemType;
  userNavigationMenu?: NavMenuItemType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLogout?: () => Promise<any>;
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
      return {
        menu: [signoutRoute],
        className: "dz-user-menu",
      };
    }

    return {
      ...userNavigationMenu,
      menu: [...userNavigationMenu.menu, signoutRoute],
      className: `dz-user-menu ${userNavigationMenu?.className || ""}`.trim(),
    };
  };

  return (
    <SidebarHeaderLayout
      children={children}
      className={className}
      collapsible={collapsible}
      navigationMenu={user ? navigationMenu : authNavigationMenu}
      userMenu={user ? getUserNavigationMenu() : undefined}
      userMenuLocation={userMenuLocation}
      {...otherProperties}
    />
  );
};
