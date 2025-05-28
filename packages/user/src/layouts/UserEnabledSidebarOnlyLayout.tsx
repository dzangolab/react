import { useTranslation } from "@dzangolab/react-i18n";
import { SidebarOnlyLayout } from "@dzangolab/react-layout";
import { toast } from "react-toastify";

import { DEFAULT_PATHS } from "@/constants";
import { useConfig, useUser } from "@/hooks";
import { logout } from "@/supertokens";

import type { SidebarOnlyLayoutProperties } from "@dzangolab/react-layout";
import type {
  NavMenuItemType,
  NavGroupType,
  NavItemType,
} from "@dzangolab/react-ui";

interface Properties extends Omit<SidebarOnlyLayoutProperties, "userMenu"> {
  authNavigationMenu?: NavMenuItemType;
  userNavigationMenu?: NavMenuItemType;
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
  userMenuMode,
  onLogout,
}) => {
  const { t } = useTranslation("user");

  const { user, setUser } = useUser();

  const config = useConfig();

  const changePasswordPath =
    config.customPaths?.changePassword || DEFAULT_PATHS.CHANGE_PASSWORD;

  const isSocialLogin = !!user?.thirdParty;

  const getUserNavigationMenu = () => {
    if (!user) {
      return authNavigationMenu
        ? {
            ...authNavigationMenu,
            className: `dz-auth-menu ${
              authNavigationMenu?.className || ""
            }`.trim(),
          }
        : undefined;
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
        className: "dz-user-menu",
      };
    }

    const userNavigationMenuWithOutChangePassword =
      userNavigationMenu.menu.filter(
        (item: NavItemType | NavGroupType) =>
          !(
            isSocialLogin &&
            "route" in item &&
            item.route === changePasswordPath
          ),
      );

    return {
      ...userNavigationMenu,
      menu: [...userNavigationMenuWithOutChangePassword, signoutRoute],
      className: `dz-user-menu ${userNavigationMenu?.className || ""}`.trim(),
    };
  };

  return (
    <SidebarOnlyLayout
      children={children}
      className={className}
      collapsible={collapsible}
      displayNavIcons={displayNavIcons}
      navigationMenu={user ? navigationMenu : authNavigationMenu}
      customSidebar={customSidebar}
      noSidebarHeader={noSidebarHeader}
      noSidebarFooter={noSidebarFooter}
      noLocaleSwitcher={noLocaleSwitcher}
      userMenu={user ? getUserNavigationMenu() : undefined}
      userMenuMode={userMenuMode}
    />
  );
};
