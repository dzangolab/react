import { DropdownMenuV2 as DropdownMenu } from "@dzangolab/react-ui";
import { useNavigate } from "react-router-dom";

import { NavMenuItemType, UserMenuModeType } from "../../types";

interface IProperties {
  menu: NavMenuItemType;
  userMenuMode?: UserMenuModeType;
}

export const UserMenu = ({ menu, userMenuMode }: IProperties) => {
  const navigate = useNavigate();
  const { id, label: userMenuLabel, menu: userMenu } = menu;

  const refinedMenu = userMenu.map((_menu) => {
    return {
      label: _menu.label as string,
      icon: _menu.icon,
      command: () => {
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
    if (userMenuMode === "horizontal" || refinedMenu.length === 1) {
      return refinedMenu.map((_menu) => (
        <span
          key={_menu.label}
          onClick={() => {
            _menu.command();
          }}
        >
          {_menu.icon && (
            <i className={_menu.icon} style={{ fontSize: "12px" }}></i>
          )}
          {_menu.label}
        </span>
      ));
    }

    return <DropdownMenu menu={refinedMenu || []} menuLabel={userMenuLabel} />;
  };

  return userMenu.length ? (
    <span className="user-menu" data-nav-menu-id={id}>
      {renderContent()}
    </span>
  ) : null;
};
