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
      await setUser(undefined);
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
    <DropdownUserMenuItem route={item.route} icon={item.icon} showIcon={true}>
      {t(item.name)}
    </DropdownUserMenuItem>
  );

  return (
    <DropdownMenu
      className="user-menu"
      collapseIcon={collapseIcon}
      dropdownMenu={{
        menuItems: menuItems,
        renderOption: dropdownUserMenu,
        keyExtractor: ({ name }) => {
          return `${id}__${name}`;
        },
      }}
      expandIcon={expandIcon}
      label={label || user?.givenName || user?.email}
    />
  );
};

export default DropdownUserMenu;
