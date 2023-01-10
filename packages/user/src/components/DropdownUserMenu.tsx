import { useTranslation } from "@dzangolab/react-i18n";
import { useId, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { toast } from "react-toastify";
import Session from "supertokens-web-js/recipe/session";

import DropdownUserMenuItem from "./DropdownUserMenuItem";

import "../assets/css/dropdownUserMenu.css";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "@/redux/reducer/AuthSlice";

interface Properties {
  userMenuList?: {
    name: string;
    onClick?: () => void;
    route?: string;
  }[];
}

const DropdownUserMenu: React.FC = ({ userMenuList }: Properties) => {
  const id = useId();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation("user");

  const signout = async () => {
    try {
      await Session.signOut();
      dispatch(logout() as any);
      toast.success(`${t("logout.message")}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const collapseItems = () => {
    setExpanded(!expanded);
  };

  const fallbackItems = [
    {
      name: t("userMenu.profile"),
      route: "/profile",
    },
    {
      name: t("userMenu.logout"),
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
        </div>

        <span className="toggle" onClick={() => setExpanded(!expanded)}>
          ▾
        </span>

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
                {name}
              </DropdownUserMenuItem>
            ))}
          </ul>
        )}
      </nav>
    </OutsideClickHandler>
  );
};

export default DropdownUserMenu;
