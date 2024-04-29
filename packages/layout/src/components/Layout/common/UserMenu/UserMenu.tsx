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
  const { id, label: userMenuLabel, menu: userMenu } = menu;

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
    if (refinedMenu.length === 1) {
      const [singleMenu] = refinedMenu;

      return (
        <span
          onClick={() => {
            singleMenu.command();
          }}
        >
          {singleMenu.icon && (
            <i className={singleMenu.icon} style={{ fontSize: "12px" }}></i>
          )}
          {singleMenu.label}
        </span>
      );
    }

    return (
      <>
        <PMenu model={refinedMenu} popup ref={menuReference} />
        <span onClick={(event) => menuReference?.current?.toggle(event)}>
          {userMenuLabel}
          <i className="pi pi-angle-down" style={{ fontSize: "12px" }}></i>
        </span>
      </>
    );
  };

  return userMenu.length ? (
    <span className="user-menu" data-nav-menu-id={id}>
      {renderContent()}
    </span>
  ) : null;
};
