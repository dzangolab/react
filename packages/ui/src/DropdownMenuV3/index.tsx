import React from "react";

import Menu, { MenuProperties } from "./Menu";
import { Popup, PopupProperties } from "../Popup";

export interface DropdownMenuProperties
  extends MenuProperties,
    Partial<Omit<PopupProperties, "content">> {
  label?: string;
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
  ...menuOptions
}) => {
  const defaultTrigger = React.useMemo(() => {
    return (
      <span className="dz-trigger">
        {label || <i className="pi pi-ellipsis-h"></i>}
        <i className="dz-icon pi  pi-angle-down"></i>
      </span>
    );
  }, [label]);

  return (
    <Popup
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
