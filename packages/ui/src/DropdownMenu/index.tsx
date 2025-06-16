import React, { useMemo } from "react";

import Menu, { MenuProperties } from "./Menu";
import { Popup, PopupProperties } from "../Popup";

export interface DropdownMenuProperties
  extends MenuProperties,
    Partial<Omit<PopupProperties, "content">> {
  label?: React.ReactNode;
  hideDropdownIcon?: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProperties> = ({
  label,
  isControlled,
  toggle,
  close,
  isOpen,
  trigger,
  position = "bottom-start",
  offset,
  hideDropdownIcon = false,
  ...menuOptions
}) => {
  const defaultTrigger = useMemo(() => {
    return (
      <span className="dz-dropdown-menu-trigger">
        {label ? <span>{label}</span> : <i className="pi pi-ellipsis-h"></i>}
        {!hideDropdownIcon && (
          <i className="dz-dropdown-icon pi pi-angle-down"></i>
        )}
      </span>
    );
  }, [label]);

  return (
    <Popup
      className={`dropdown-menu ${menuOptions.className || ""}`.trimEnd()}
      trigger={trigger || defaultTrigger}
      content={<Menu {...menuOptions} />}
      position={position}
      isControlled={isControlled}
      toggle={toggle}
      close={close}
      isOpen={isOpen}
      offset={offset}
    />
  );
};

export default DropdownMenu;
