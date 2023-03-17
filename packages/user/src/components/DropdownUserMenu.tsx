import { useTranslation } from "@dzangolab/react-i18n";
import { useId, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { toast } from "react-toastify";

import DropdownUserMenuItem from "./DropdownUserMenuItem";
import { removeUserData } from "../helpers";
import { useUser } from "../hooks";
import logout from "../supertokens/logout";
import { UserMenuType } from "../types";

import "../assets/css/dropdownUserMenu.css";

interface Properties {
  userMenuList?: UserMenuType[];
}

const DropdownUserMenu: React.FC<Properties> = ({ userMenuList }) => {
  const id = useId();
  const { user, setUser } = useUser();
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation("user");

  const signout = async () => {
    if (await logout()) {
      await removeUserData();
      setUser(undefined);
      toast.success(t("logout.message"));
    }
  };

  const collapseItems = () => {
    setExpanded(!expanded);
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

  const menuItems = userMenuList
    ? [...userMenuList, ...fallbackItems]
    : fallbackItems;

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setExpanded(false);
      }}
    >
      <nav className={`user-menu ${expanded ? "expanded" : ""}`}>
        <div className="email" onClick={() => setExpanded(!expanded)}>
          {user?.email}
          <span className={`toggle ${expanded ? "expanded" : ""}`}>
            &#9662;
          </span>
        </div>

        {expanded && (
          <ul className="dropdown">
            {menuItems.map(({ name, onClick, route }) => (
              <DropdownUserMenuItem
                onClick={() => {
                  onClick && onClick();
                  collapseItems();
                }}
                route={route}
                key={`${id}__${name}`}
              >
                {t(name)}
              </DropdownUserMenuItem>
            ))}
          </ul>
        )}
      </nav>
    </OutsideClickHandler>
  );
};

export default DropdownUserMenu;
