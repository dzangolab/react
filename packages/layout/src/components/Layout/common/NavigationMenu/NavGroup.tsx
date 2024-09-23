import { useCallback, useState } from "react";

import { Navigation } from "./Navigation";
import { NavItem } from "./NavItem";
import { NavGroupDisplayMode, NavGroupType } from "../../types";

export type NavGroupProperties = {
  initialVisible?: boolean;
  displayIcon?: boolean;
  horizontal?: boolean;
  navGroup: NavGroupType;
  className?: string;
  displayMode?: NavGroupDisplayMode;
};

export const NavGroup = ({
  displayMode = "collapsible",
  initialVisible = false,
  displayIcon = true,
  horizontal,
  navGroup,
  className = "",
}: NavGroupProperties) => {
  const [showSubmenu, setShowSubmenu] = useState(
    initialVisible || displayMode === "expanded",
  );

  const renderSubmenu = useCallback(() => {
    return (
      <ul className="dz-group-submenu">
        {navGroup.submenu &&
          navGroup.submenu.map((nav, _index) => {
            return (
              <li key={_index}>
                {
                  <Navigation
                    nav={nav}
                    horizontal={horizontal}
                    displayIcon={displayIcon}
                  />
                }
              </li>
            );
          })}
      </ul>
    );
  }, [displayIcon, horizontal, navGroup]);

  return (
    <div
      className={`dz-nav-group ${displayMode} ${className}`.trim()}
      aria-expanded={showSubmenu}
    >
      <NavItem
        navItem={{
          label: navGroup.label,
          icon: navGroup.icon,
          onClick: () =>
            displayMode !== "expanded" && setShowSubmenu(!showSubmenu),
        }}
        displayIcon={displayIcon}
        isGroupHeader
      ></NavItem>
      {renderSubmenu()}
    </div>
  );
};
