import { NavItem } from "./NavItem";
import { NavGroupType } from "../../types";

export const MenuOverlay = ({
  navGroup,
  displayIcon,
}: {
  navGroup: NavGroupType;
  displayIcon?: boolean;
}) => {
  return (
    <div className="menu-overlay">
      <ul>
        {navGroup.submenu &&
          navGroup.submenu.map((nav, _index) => {
            return (
              <li key={_index}>
                <NavItem navItem={nav} displayIcon={displayIcon} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};
