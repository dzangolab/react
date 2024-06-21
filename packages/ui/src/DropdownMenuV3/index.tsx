import { Button, ButtonProps } from "primereact/button";
import React from "react";

import Menu, { MenuProperties } from "./Menu";
import { Popup, PopupProperties } from "../Popup";

export interface DropdownMenuProperties extends MenuProperties {
  popupOptions?: Partial<Omit<PopupProperties, "content">>;
  buttonOptions?: Omit<ButtonProps, "onClick">;
}

const DropdownMenu: React.FC<DropdownMenuProperties> = ({
  buttonOptions,
  popupOptions,
  ...rest
}) => {
  const buttonProperties = {
    icon: "pi pi-ellipsis-h",
    text: true,
    "aria-label": "Actions",
    style: { height: "1.5rem", width: "1.5rem", padding: "0" },
    ...buttonOptions,
  };

  return (
    <Popup
      trigger={<Button {...buttonProperties} />}
      content={<Menu {...rest} />}
      position="bottom-start"
      {...popupOptions}
    />
  );
};

export default DropdownMenu;
