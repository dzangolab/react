import React, { memo } from "react";

export interface MenuItem {
  className?: string;
  disabled?: boolean;
  display?: boolean;
  key?: string;
  label?: string;
  onClick?: () => void;
}

export interface MenuProperties {
  className?: string;
  menu: MenuItem[];
  renderOption?: (value: MenuItem) => JSX.Element;
}

const Menu: React.FC<MenuProperties> = ({
  className,
  menu = [],
  renderOption,
}) => {
  return (
    <ul className={`dz-dropdown-menu ${className || ""}`.trimEnd()}>
      {menu.map(
        ({ className, disabled, onClick, display = true, ...item }, index) =>
          display ? (
            <li
              key={item.key || `menu-item-${index}`}
              onClick={disabled ? undefined : onClick}
              className={className}
              aria-disabled={disabled}
            >
              {renderOption ? (
                renderOption(item)
              ) : (
                <span className="dz-menu-item">{item.label}</span>
              )}
            </li>
          ) : null,
      )}
    </ul>
  );
};

export default memo(Menu);
