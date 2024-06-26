import { DropdownMenu } from "@dzangolab/react-ui";
import React from "react";
import { useNavigate } from "react-router-dom";

import { NavMenuItemType, UserMenuModeType } from "../../types";

interface IProperties {
  menu: NavMenuItemType;
  userMenuMode?: UserMenuModeType;
}

export const UserMenu = ({ menu, userMenuMode }: IProperties) => {
  const navigate = useNavigate();
  const { id, label: userMenuLabel, menu: userMenu = [] } = menu;

  const refinedMenu = React.useMemo(
    () =>
      userMenu.map((_menu) => {
        return {
          label: _menu.label as string,
          icon: _menu.icon,
          onClick: () => {
            if ("onClick" in _menu) {
              _menu.onClick();
            }
            if ("route" in _menu) {
              navigate(_menu.route);
            }
          },
        };
      }),
    [userMenu],
  );

  const renderContent = () => {
    const template = (_menuItem: any) => {
      return (
        <span className="dz-user-menu-item">
          {_menuItem.icon && <i className={_menuItem.icon}></i>}
          {_menuItem.label}
        </span>
      );
    };

    if (refinedMenu.length === 1) {
      const _menuItem = refinedMenu[0];

      return (
        <span className="dz-user-menu-item" onClick={_menuItem.onClick}>
          {_menuItem.icon && <i className={_menuItem.icon}></i>}
          {_menuItem.label}
        </span>
      );
    }

    if (userMenuMode === "horizontal") {
      return (
        <ul className="user-menu" aria-orientation={userMenuMode}>
          {refinedMenu.map(({ onClick, ..._menuItem }) => {
            return (
              <li key={_menuItem.label} onClick={onClick}>
                {template(_menuItem)}
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      <DropdownMenu
        className="user-menu"
        renderOption={template}
        menu={refinedMenu || []}
        label={userMenuLabel}
      />
    );
  };

  return userMenu.length ? renderContent() : null;
};
