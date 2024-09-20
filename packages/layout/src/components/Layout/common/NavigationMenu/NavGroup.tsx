import { useCallback, useState } from "react";

import { Navigation } from "./Navigation";
import { NavItem } from "./NavItem";
import { NavGroupType } from "../../types";

export type NavGroupProperties = {
  initialVisible?: boolean;
  collapsible?: boolean;
  displayIcon?: boolean;
  horizontal?: boolean;
  navGroup: NavGroupType;
  className?: string;
};

export const NavGroup = ({
  collapsible = true,
  initialVisible = false,
  displayIcon = true,
  horizontal,
  navGroup,
  className = "",
}: NavGroupProperties) => {
  const [showSubmenu, setShowSubmenu] = useState(initialVisible);

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
      className={`dz-nav-group ${className}`.trim()}
      aria-expanded={showSubmenu}
    >
      <NavItem
        navItem={{
          label: navGroup.label,
          icon: navGroup.icon,
          onClick: () => collapsible && setShowSubmenu(!showSubmenu),
        }}
        displayIcon={displayIcon}
        isGroupHeader
        collapsible={collapsible}
      ></NavItem>
      {renderSubmenu()}
    </div>
  );
};
