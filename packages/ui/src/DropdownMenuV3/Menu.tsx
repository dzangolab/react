import React, { memo } from "react";

interface MenuItem {
  label?: string;
  onClick?: () => void;
}

export interface MenuProperties {
  closePopup?: () => void;
  keyExtractor?: (value: MenuItem) => string;
  menuItems: MenuItem[];
  renderOption?: (value: MenuItem) => JSX.Element;
}

const Menu: React.FC<MenuProperties> = ({
  closePopup = () => null,
  keyExtractor,
  menuItems,
  renderOption,
}) => {
  return (
    <ul className="dz-menu">
      {menuItems.map(({ onClick, ...item }, index) => (
        <li
          key={keyExtractor ? keyExtractor(item) : `menu-item-${index}`}
          onClick={async () => {
            await onClick?.();
            closePopup();
          }}
        >
          {renderOption ? renderOption(item) : item.label}
        </li>
      ))}
    </ul>
  );
};

export default memo(Menu);
