import React, { useMemo } from "react";

import Menu, { MenuProperties } from "./Menu";
import { Popup, PopupProperties } from "../Popup";

export interface DropdownMenuProperties
  extends MenuProperties,
    Partial<Omit<PopupProperties, "content">> {
  label?: string | React.ReactNode;
  hideToggleIcon?: boolean;
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
  hideToggleIcon = false,
  ...menuOptions
}) => {
  const defaultTrigger = useMemo(() => {
    return (
      <span className="dz-dropdown-menu-trigger">
        {label || <i className="pi pi-ellipsis-h"></i>}
        {!hideToggleIcon && <i className="dz-icon pi  pi-angle-down"></i>}
      </span>
    );
  }, [label]);

  return (
    <Popup
      className={menuOptions.className}
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
