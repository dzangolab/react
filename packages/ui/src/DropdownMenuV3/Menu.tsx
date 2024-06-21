import React, { memo } from "react";

export interface MenuItem {
  className?: string;
  disabled?: boolean;
  display?: boolean;
  key?: string;
  label: string;
  onClick?: () => void;
}

export interface MenuProperties {
  closePopup?: () => void;
  menuItems: MenuItem[];
  renderOption?: (value: MenuItem) => JSX.Element;
}

const Menu: React.FC<MenuProperties> = ({
  closePopup = () => null,
  menuItems,
  renderOption,
}) => {
  return (
    <ul className="dz-menu">
      {menuItems.map(
        ({ className, disabled, onClick, display = true, ...item }, index) =>
          display ? (
            <li
              key={item.key || `menu-item-${index}`}
              onClick={
                disabled
                  ? undefined
                  : async () => {
                      await onClick?.();
                      closePopup();
                    }
              }
              className={className}
              aria-disabled={disabled}
            >
              {renderOption ? renderOption(item) : item.label}
            </li>
          ) : null,
      )}
    </ul>
  );
};

export default memo(Menu);
