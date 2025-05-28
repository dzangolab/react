import { useTranslation } from "@dzangolab/react-i18n";
import { HeaderLayout } from "@dzangolab/react-layout";
import { toast } from "react-toastify";

import { DEFAULT_PATHS } from "@/constants";

import { logout, useConfig, useUser } from "..";

import type {
  NavMenuItemType,
  NavMenuType,
  NavGroupType,
  NavItemType,
} from "@dzangolab/react-ui";

interface IProperties {
  authNavigationMenu?: NavMenuItemType;
  className?: string;
  children?: React.ReactNode;
  customFooter?: React.ReactNode;
  customHeader?: React.ReactNode;
  displayNavIcons?: boolean;
  fixed?: boolean;
  headerAddon?: React.ReactNode;
  userNavigationMenu?: NavMenuItemType;
  navigationMenu?: NavMenuType;
  noLocaleSwitcher?: boolean;
  noLogo?: boolean;
  noToggle?: boolean;
  title?: string | React.ReactNode;
  onLogout?: () => Promise<void>;
}

export const UserEnabledHeaderLayout = ({
  authNavigationMenu,
  children,
  className,
  customFooter,
  customHeader,
  displayNavIcons,
  fixed,
  headerAddon,
  userNavigationMenu,
  navigationMenu,
  noLocaleSwitcher,
  noLogo,
  noToggle,
  title,
  onLogout,
}: IProperties) => {
  const { t } = useTranslation("user");

  const { user, setUser } = useUser();

  const config = useConfig();

  const changePasswordPath =
    config.customPaths?.changePassword || DEFAULT_PATHS.CHANGE_PASSWORD;

  const isSocialLogin = !!user?.thirdParty;

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
    };
  };

  return (
    <HeaderLayout
      {...{
        className,
        children,
        customFooter,
        customHeader,
        displayNavIcons,
        fixed,
        headerAddon,
        navigationMenu,
        title,
        menu: getUserNavigationMenu(),
        noLogo,
        noLocaleSwitcher,
        noToggle,
      }}
      userMenuMode={user ? "popup" : "horizontal"}
    />
  );
};
