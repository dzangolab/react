import { useMediaQuery } from "@dzangolab/react-ui";
import { useState } from "react";

import { Navigation } from "./Navigation";
import { NavItem } from "./NavItem";
import { NavGroupType } from "../../types";

export type NavGroupProperties = {
  displayIcon?: boolean;
  horizontal?: boolean;
  navGroup: NavGroupType;
};

export const NavGroup = ({
  displayIcon = true,
  horizontal,
  navGroup,
}: NavGroupProperties) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:576px)");

  const renderSubmenu = () => {
    return (
      <ul className="submenu">
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
  };

  const navGroupProperties =
    isSmallScreen || !horizontal
      ? { className: "nav-group", "aria-expanded": showSubmenu }
      : { className: "nav-group" };

  return (
    <div {...navGroupProperties}>
      <NavItem
        navItem={{
          label: navGroup.label,
          icon: navGroup.icon,
          onClick: () => setShowSubmenu(!showSubmenu),
        }}
        displayIcon={displayIcon}
        isGroupHeader
      ></NavItem>
      {renderSubmenu()}
    </div>
  );
};
