import { useTranslation } from "@dzangolab/react-i18n";
import { DropdownNavMenu } from "@dzangolab/react-ui";
import { useId } from "react";
import { toast } from "react-toastify";

import DropdownUserMenuItem from "./DropdownUserMenuItem";
import { removeUserData } from "../helpers";
import { useUser } from "../hooks";
import logout from "../supertokens/logout";
import { UserMenuItemType } from "../types";

interface Properties {
  onLogout?: () => void;
  userMenu?: UserMenuItemType[];
}

const DropdownUserMenu: React.FC<Properties> = ({ onLogout, userMenu }) => {
  const id = useId();
  const { user, setUser } = useUser();
  const { t } = useTranslation("user");

  const signout = async () => {
    if (await logout()) {
      await removeUserData();
      setUser(undefined);
      onLogout && (await onLogout());
      toast.success(t("logout.message"));
    }
  };

  const signoutRoute = {
    name: "userMenu.logout",
    onClick: signout,
    route: undefined,
  };
  const profileRoute = {
    name: "userMenu.profile",
    route: "/profile",
    onClick: undefined,
  };

  const fallbackItems = [profileRoute, signoutRoute];
  const menuItems = userMenu ? [...userMenu, ...fallbackItems] : fallbackItems;

  const dropdownUserMenu = menuItems.map(({ name, onClick, route }) => (
    <DropdownUserMenuItem
      onClick={onClick}
      route={route}
      key={`${id}__${name}`}
    >
      {t(name)}
    </DropdownUserMenuItem>
  ));

  return (
    <nav className="user-menu">
      <DropdownNavMenu
        label={user?.email || "Guest"}
        dropdownMenu={dropdownUserMenu}
      />
    </nav>
  );
};

export default DropdownUserMenu;
