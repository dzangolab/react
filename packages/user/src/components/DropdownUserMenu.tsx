import { useTranslation } from "@dzangolab/react-i18n";
import { DropdownMenu, DropdownMenuProperties } from "@dzangolab/react-ui";
import { useId } from "react";
import { toast } from "react-toastify";

import DropdownUserMenuItem from "./DropdownUserMenuItem";
import { removeUserData } from "../helpers";
import { useUser } from "../hooks";
import logout from "../supertokens/logout";
import { UserMenuItemType } from "../types";

interface Properties
  extends Partial<Omit<DropdownMenuProperties, "dropdownMenu">> {
  onLogout?: () => void;
  userMenu?: UserMenuItemType[];
}

const DropdownUserMenu: React.FC<Properties> = ({
  collapseIcon,
  expandIcon,
  label,
  onLogout,
  userMenu,
}) => {
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

  const menuItems = userMenu ? [...userMenu, signoutRoute] : [signoutRoute];

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
    <DropdownMenu
      className="user-menu"
      collapseIcon={collapseIcon}
      dropdownMenu={dropdownUserMenu}
      expandIcon={expandIcon}
      label={label || user?.profile?.givenName || user?.email}
    />
  );
};

export default DropdownUserMenu;
