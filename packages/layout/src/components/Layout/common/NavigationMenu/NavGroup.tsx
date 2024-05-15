import { useMediaQuery } from "@dzangolab/react-ui";
import { useState } from "react";

import { NavItem } from "./NavItem";
import { NavGroupType, NavItemType } from "../../types";

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

  const renderNavGroup = (navGroup: NavGroupType) => {
    return (
      <NavGroup
        navGroup={navGroup}
        displayIcon={displayIcon}
        horizontal={horizontal}
      />
    );
  };

  const renderNavigation = (nav: NavItemType | NavGroupType) => {
    if ("submenu" in nav) {
      return renderNavGroup(nav);
    }

    return <NavItem navItem={nav} displayIcon={displayIcon} />;
  };

  const renderSubmenu = () => {
    return (
      <ul className="submenu">
        {navGroup.submenu &&
          navGroup.submenu.map((nav, _index) => {
            return <li key={_index}>{renderNavigation(nav)}</li>;
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
      {/* <div className="overlay-menu">{renderSubmenu()}</div> */}
    </div>
  );
};
