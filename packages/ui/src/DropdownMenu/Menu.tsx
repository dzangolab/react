import React, { memo } from "react";

export interface MenuItem {
  className?: string;
  disabled?: boolean;
  display?: boolean;
  key?: string;
  label?: string;
  icon?: React.ReactNode;
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
      {menu.map((item, index) => {
        const {
          className,
          disabled,
          icon,
          onClick,
          display = true,
          key,
          label,
        } = item;

        return display ? (
          <li
            key={key || `menu-item-${index}`}
            onClick={disabled ? undefined : onClick}
            className={className}
            aria-disabled={disabled}
          >
            {renderOption ? (
              renderOption(item)
            ) : (
              <span className="dz-menu-item">
                {icon ? (
                  typeof icon === "string" ? (
                    <i className={icon}></i>
                  ) : (
                    icon
                  )
                ) : null}
                {label}
              </span>
            )}
          </li>
        ) : null;
      })}
    </ul>
  );
};

export default memo(Menu);
