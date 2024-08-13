import { DropdownMenu } from "@dzangolab/react-ui";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { NavMenuItemType, UserMenuModeType } from "../../types";
import { NavGroup } from "../NavigationMenu/NavGroup";

interface IProperties {
  menu: NavMenuItemType;
  userMenuMode?: UserMenuModeType;
  trigger?: React.ReactNode;
}

export const UserMenu = ({ menu, userMenuMode, trigger }: IProperties) => {
  const navigate = useNavigate();
  const { label: userMenuLabel, menu: userMenu = [] } = menu;

  const refinedMenu = useMemo(
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
    [userMenu]
  );

  const renderContent = () => {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
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
        <ul className="dz-user-menu" aria-orientation={userMenuMode}>
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

    return userMenuMode === "expandable" ? (
      <NavGroup
        className="dz-user-menu"
        displayIcon
        navGroup={{
          label: userMenuLabel,
          submenu: refinedMenu,
        }}
      />
    ) : (
      <DropdownMenu
        className="dz-user-menu"
        renderOption={template}
        menu={refinedMenu || []}
        label={userMenuLabel}
        trigger={trigger}
      />
    );
  };

  return userMenu.length ? renderContent() : null;
};
