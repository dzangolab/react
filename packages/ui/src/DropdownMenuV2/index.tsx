import { Menu as PMenu, MenuProps as PMenuProperties } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import React, { useRef } from "react";

export interface MenuProperties extends PMenuProperties {
  icon?: string | React.ReactNode;
  menu: MenuItem[];
  menuLabel?: string | React.ReactNode;
}

export const DropdownMenuV2 = ({
  icon = <i className="pi pi-angle-down" style={{ fontSize: "12px" }} />,
  menuLabel,
  menu,
  ...menuOptions
}: MenuProperties) => {
  const menuReference = useRef<PMenu>(null);

  const renderIcon = () => {
    if (typeof icon === "string") {
      return <i className={icon} />;
    }

    return icon;
  };

  return (
    <>
      <PMenu model={menu} popup ref={menuReference} {...menuOptions} />
      <span onClick={(event) => menuReference?.current?.toggle(event)}>
        {menuLabel}
        {renderIcon()}
      </span>
    </>
  );
};
