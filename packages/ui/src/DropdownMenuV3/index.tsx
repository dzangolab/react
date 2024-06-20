import { Button, ButtonProps } from "primereact/button";
import React, { BaseSyntheticEvent, useRef } from "react";

import MenuV2, { MenuProperties, MenuReference } from "../MenuV2";

export type DropdownMenuProperties = MenuProperties & {
  toggler?: JSX.Element;
  buttonOptions?: Omit<ButtonProps, "onClick">;
};

const DropdownMenu: React.FC<DropdownMenuProperties> = ({
  buttonOptions,
  toggler,
  ...rest
}) => {
  const menu = useRef<MenuReference>(null);

  const buttonProperties = {
    icon: "pi pi-ellipsis-h",
    text: true,
    "aria-label": "Actions",
    style: { height: "1.5rem", width: "1.5rem", padding: "0" },
    ...buttonOptions,
  };

  return (
    <>
      <MenuV2 ref={menu} {...rest} />
      {React.cloneElement(toggler || <Button {...buttonProperties} />, {
        onClick: (event: BaseSyntheticEvent) =>
          menu?.current?.toggleMenu(event),
      })}
    </>
  );
};

export default DropdownMenu;
