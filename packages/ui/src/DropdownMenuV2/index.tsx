import { Menu as PMenu, MenuProps as PMenuProperties } from "primereact/menu";
import React, { useRef } from "react";

export interface MenuProperties extends PMenuProperties {
  icon?: string | React.ReactNode;
  menuLabel?: string;
}

export const DropdownMenuV2 = ({
  icon = <i className="pi pi-angle-down" style={{ fontSize: "12px" }} />,
  menuLabel,
  model,
  ...menuOptions
}: MenuProperties) => {
  const menu = useRef<PMenu>(null);

  const renderIcon = () => {
    if (typeof icon === "string") {
      return <i className={icon} />;
    }

    return icon;
  };

  return (
    <>
      <PMenu model={model} popup ref={menu} {...menuOptions} />
      <span onClick={(event) => menu?.current?.toggle(event)}>
        {menuLabel}
        {renderIcon()}
      </span>
    </>
  );
};
