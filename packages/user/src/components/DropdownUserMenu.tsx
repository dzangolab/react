import { useTranslation } from "@dzangolab/react-i18n";
import { useContext, useId, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { toast } from "react-toastify";
import Session from "supertokens-web-js/recipe/session";

import { UserContextType } from "@/types/types";

import { userContext } from "../context/UserProvider";
import DropdownUserMenuItem from "./DropdownUserMenuItem";

import "../assets/css/dropdownUserMenu.css";

interface Properties {
  userMenuList?: {
    name: string;
    onClick?: () => void;
    route?: string;
  }[];
}

const DropdownUserMenu: React.FC<Properties> = ({ userMenuList }) => {
  const id = useId();
  const { user, setUser } = useContext(userContext) as UserContextType;
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation("user");

  const signout = async () => {
    try {
      await Session.signOut();
      setUser(undefined);
      toast.success(`${t("logout.message")}`);
    } catch (err) {
      let errorMessage = "Oops! Something went wrong.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      toast.error(errorMessage);
    }
  };

  const collapseItems = () => {
    setExpanded(!expanded);
  };

  const fallbackItems = [
    {
      name: "userMenu.profile",
      route: "/profile",
    },
    {
      name: "userMenu.logout",
      onClick: signout,
    },
  ];

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
