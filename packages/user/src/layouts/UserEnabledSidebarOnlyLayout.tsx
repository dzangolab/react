import { useTranslation } from "@dzangolab/react-i18n";
import { SidebarOnlyLayout } from "@dzangolab/react-layout";
import { toast } from "react-toastify";

import type { SidebarOnlyLayoutProperties } from "@dzangolab/react-layout";
import type { NavMenuItemType } from "@dzangolab/react-ui";

import { useUser } from "@/hooks";
import { logout } from "@/supertokens";

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

    return {
      ...userNavigationMenu,
      menu: [...userNavigationMenu.menu, signoutRoute],
      className: `dz-user-menu ${userNavigationMenu?.className || ""}`.trim(),
    };
  };

  console.log("############################################### heleleo");

  return (
    <>
      {" "}
      hellosdfgdsgsdfgdfg
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
    </>
  );
};
