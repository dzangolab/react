import { useTranslation } from "@dzangolab/react-i18n";
import {
  SidebarHeaderLayout,
  SidebarHeaderLayoutProperties,
} from "@dzangolab/react-layout";
import { toast } from "react-toastify";

import { DEFAULT_PATHS } from "@/constants";
import { useConfig, useUser } from "@/hooks";
import { logout } from "@/supertokens";

import type {
  NavMenuItemType,
  NavGroupType,
  NavItemType,
} from "@dzangolab/react-ui";

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

  const config = useConfig();

  const changePasswordPath =
    config.customPaths?.changePassword || DEFAULT_PATHS.CHANGE_PASSWORD;

  const isSocialLogin = !!user?.thirdParty;

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

    const _userNavigationMenu = userNavigationMenu.menu.filter(
      (item: NavItemType | NavGroupType) =>
        !(
          isSocialLogin &&
          "route" in item &&
          item.route === changePasswordPath
        ),
    );

    return {
      ...userNavigationMenu,
      menu: [..._userNavigationMenu, signoutRoute],
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
