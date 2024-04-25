import { Menu as PMenu } from "primereact/menu";
import { useRef } from "react";

import { NavMenuItemType } from "../../types";

interface IProperties {
  menu: NavMenuItemType;
}

export const UserMenu = ({ menu }: IProperties) => {
  const menuReference = useRef<PMenu>(null);

  const refinedMenu = menu.menu.map((_menu) => {
    return {
      label: _menu.label,
      icon: _menu.icon,
      command: _menu,
    };
  });

  return (
    <span className="locale-switcher">
      <PMenu model={[]} popup ref={menuReference} />
      <span onClick={(event) => menuReference?.current?.toggle(event)}>
        {menu.label}
        <i className="pi pi-angle-down" style={{ fontSize: "12px" }}></i>
      </span>
    </span>
  );
};
