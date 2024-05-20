import { NavGroup } from "./NavGroup";
import { NavItem } from "./NavItem";
import { NavGroupType, NavItemType } from "../../types";

interface IProperties {
  displayIcon?: boolean;
  horizontal?: boolean;
  nav: NavItemType | NavGroupType;
}

export const Navigation = ({ displayIcon, horizontal, nav }: IProperties) => {
  return "submenu" in nav ? (
    <NavGroup
      navGroup={nav}
      displayIcon={displayIcon}
      horizontal={horizontal}
    />
  ) : (
    <NavItem navItem={nav} displayIcon={displayIcon} />
  );
};
