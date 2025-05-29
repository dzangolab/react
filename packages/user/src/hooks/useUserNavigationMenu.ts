import { useTranslation } from "@dzangolab/react-i18n";
import { toast } from "react-toastify";

import { DEFAULT_PATHS } from "@/constants";

import { logout } from "..";
import { useConfig } from "./useConfig";
import { useUser } from "./useUser";

import type {
  NavGroupType,
  NavItemType,
  NavMenuItemType,
} from "@dzangolab/react-ui";

interface Properties {
  authNavigationMenu?: NavMenuItemType;
  layout: string;
  userNavigationMenu?: NavMenuItemType;
  onLogout?: () => Promise<void>;
}

export const useUserNavigationMenu = ({
  authNavigationMenu,
  layout,
  userNavigationMenu,
  onLogout,
}: Properties) => {
  const { t } = useTranslation("user");
  const { user, setUser } = useUser();
  const config = useConfig();

  const changePasswordPath =
    config.customPaths?.changePassword || DEFAULT_PATHS.CHANGE_PASSWORD;

  const isSocialLogin = !!user?.thirdParty;

  if (!user && layout === "UserEnabledSidebarOnlyLayout") {
    return authNavigationMenu
      ? {
          ...authNavigationMenu,
          className:
            `dz-auth-menu ${authNavigationMenu.className || ""}`.trim(),
        }
      : undefined;
  }

  if (!user && layout === "UserEnabledHeaderLayout") {
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
    return {
      menu: [signoutRoute],
      className: layout === "UserEnabledHeaderLayout" ? "" : "dz-user-menu",
    };
  }

  const _userNavigationMenu = userNavigationMenu.menu.filter(
    (item: NavItemType | NavGroupType) =>
      !(isSocialLogin && "route" in item && item.route === changePasswordPath),
  );

  return {
    ...userNavigationMenu,
    menu: [..._userNavigationMenu, signoutRoute],
    className:
      layout === "UserEnabledHeaderLayout"
        ? ""
        : `dz-user-menu ${userNavigationMenu.className || ""}`.trim(),
  };
};
