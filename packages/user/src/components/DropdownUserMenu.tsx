import { useTranslation } from "@dzangolab/react-i18n";
import { DropdownMenu, DropdownMenuProperties } from "@dzangolab/react-ui";
import { toast } from "react-toastify";

import DropdownUserMenuItem from "./DropdownUserMenuItem";
import { useUser } from "../hooks";
import logout from "../supertokens/logout";
import { UserMenuItemType } from "../types";

export interface DropdownUserMenuProperties
  extends Partial<DropdownMenuProperties> {
  onLogout?: () => void;
  showUserMenuIcon?: boolean;
  userMenu?: UserMenuItemType[];
}

const DropdownUserMenu: React.FC<DropdownUserMenuProperties> = ({
  label,
  onLogout,
  showUserMenuIcon,
  userMenu,
}) => {
  const { user, setUser } = useUser();
  const { t } = useTranslation("user");

  const signout = async () => {
    if (await logout()) {
      await setUser(null);
      onLogout && (await onLogout());

      toast.success(t("logout.message"));
    }
  };

  const signoutRoute = {
    icon: "pi pi-power-off",
    name: "userMenu.logout",
    onClick: signout,
    route: undefined,
  };

  const menuItems = userMenu ? [...userMenu, signoutRoute] : [signoutRoute];

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const dropdownUserMenu = (item: any) => (
    <DropdownUserMenuItem route={item.route}>
      {showUserMenuIcon && <i className={item.icon}></i>}
      {t(item.name)}
    </DropdownUserMenuItem>
  );

  return (
    <DropdownMenu
      className="user-menu"
      menu={menuItems}
      renderOption={dropdownUserMenu}
      label={label || user?.givenName || user?.email}
    />
  );
};

export default DropdownUserMenu;
