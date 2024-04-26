import { Menu as PMenu } from "primereact/menu";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { NavMenuItemType } from "../../types";

interface IProperties {
  menu: NavMenuItemType;
}

export const UserMenu = ({ menu }: IProperties) => {
  const menuReference = useRef<PMenu>(null);
  const navigate = useNavigate();
  const { menu: userMenu } = menu;

  const refinedMenu = userMenu.map((_menu) => {
    return {
      label: _menu.label as string,
      icon: _menu.icon,
      command: () => {
        if ("onClick" in _menu) {
          _menu.onClick();
        }
        if ("route" in _menu) {
          navigate(_menu.route);
        }
      },
    };
  });

  const renderContent = () => {
    if (userMenu.length === 1) {
      return (
        <span
          onClick={() => {
            if ("route" in userMenu[0]) {
              navigate(userMenu[0].route);
            }
          }}
        >
          {userMenu[0].label}
        </span>
      );
    }

    return (
      <>
        <PMenu model={refinedMenu} popup ref={menuReference} />
        <span onClick={(event) => menuReference?.current?.toggle(event)}>
          My account
          <i className="pi pi-angle-down" style={{ fontSize: "12px" }}></i>
        </span>
      </>
    );
  };

  return userMenu.length ? (
    <span className="user-menu">{renderContent()}</span>
  ) : null;
};
