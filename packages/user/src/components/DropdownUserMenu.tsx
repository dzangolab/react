import { useTranslation } from "@dzangolab/react-i18n";
import { useId, useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

import DropdownUserMenuItem from "./DropdownUserMenuItem";
import { removeUserData } from "../helpers";
import { useUser } from "../hooks";
import logout from "../supertokens/logout";
import { UserMenuItemType } from "../types";

import "../assets/css/dropdownUserMenu.css";

interface Properties {
  userMenu?: UserMenuItemType[];
}

const DropdownUserMenu: React.FC<Properties> = ({ userMenu }) => {
  const id = useId();
  const { user, setUser } = useUser();
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation("user");
  const navBarReference = useRef<HTMLElement | null>(null);

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
  const menuItems = userMenu ? [...userMenu, ...fallbackItems] : fallbackItems;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        navBarReference.current &&
        !navBarReference.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav
      ref={navBarReference}
      className={`user-menu ${expanded ? "expanded" : ""}`}
    >
      <div className="email" onClick={() => setExpanded(!expanded)}>
        {user?.email}
        <span className={"toggle"}>&#9662;</span>
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
  );
};

export default DropdownUserMenu;
