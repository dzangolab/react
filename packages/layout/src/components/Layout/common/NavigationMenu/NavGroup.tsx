import { useMediaQuery } from "@dzangolab/react-ui";
import { useState } from "react";

import { NavItem } from "./NavItem";
import { NavGroupType } from "../../types";

export type NavGroupProperties = {
  displayIcon?: boolean;
  navGroup: NavGroupType;
};

export const NavGroup = ({
  navGroup,
  displayIcon = true,
}: NavGroupProperties) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:576px)");

  const renderSubmenu = () => {
    return (
      <ul className={`submenu ${!showSubmenu ? `overlay` : ""}`.trimEnd()}>
        {navGroup.submenu &&
          navGroup.submenu.map((nav, _index) => {
            return (
              <li key={_index}>
                <NavItem navItem={nav} displayIcon={displayIcon} />
              </li>
            );
          })}
      </ul>
    );
  };

  return (
    <div className="nav-group" aria-expanded={showSubmenu}>
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
