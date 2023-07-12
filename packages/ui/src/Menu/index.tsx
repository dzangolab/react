//import { useRouter } from 'next/router';
import { Button, ButtonProps } from "primereact/button";
import { Menu as PMenu, MenuProps as PMenuProperties } from "primereact/menu";
import React, { useRef } from "react";

export interface MenuProperties extends PMenuProperties {
  buttonOptions?: Omit<ButtonProps, "onClick">;
}

export const Menu = ({
  buttonOptions: pButtonOptions,
  model,
  ...menuOptions
}: MenuProperties) => {
  const menu = useRef<PMenu>(null);

  const buttonProperties = {
    // defaults
    icon: "pi pi-ellipsis-h",
    text: true,
    "aria-label": "Actions",
    style: { height: "1.5rem", width: "1.5rem", padding: "0" },

    // overrides
    ...pButtonOptions,
  };

  return (
    <>
      <PMenu model={model} popup ref={menu} {...menuOptions} />
      <Button
        onClick={(event) => menu?.current?.toggle(event)}
        {...buttonProperties}
      />
    </>
  );
};
