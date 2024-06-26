import { DropdownMenu } from "@dzangolab/react-ui";
import { useNavigate } from "react-router-dom";

import { NavMenuItemType, UserMenuModeType } from "../../types";

interface IProperties {
  menu: NavMenuItemType;
  userMenuMode?: UserMenuModeType;
}

export const UserMenu = ({ menu, userMenuMode }: IProperties) => {
  const navigate = useNavigate();
  const { id, label: userMenuLabel, menu: userMenu = [] } = menu;

  const refinedMenu = userMenu.map((_menu) => {
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
  });

  const renderContent = () => {
    const template = (_menu: any) => {
      return (
        <span
          className="user-menu"
          key={_menu.label}
          onClick={() => {
            _menu.onClick();
          }}
        >
          {_menu.icon && (
            <i className={_menu.icon} style={{ fontSize: "12px" }}></i>
          )}
          {_menu.label}
        </span>
      );
    };

    if (userMenuMode === "horizontal" || refinedMenu.length === 1) {
      return refinedMenu.map(template);
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
