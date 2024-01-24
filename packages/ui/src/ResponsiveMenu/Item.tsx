import { useId, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { MenuItemLink } from "./ItemLink";
import { DropdownMenu, useMediaQuery } from "..";
import { Submenu } from "../Submenu";

import { NestedMenuRouteType, MenuRouteType } from ".";

interface IProperties {
  route: NestedMenuRouteType | MenuRouteType;
  displayIcon?: boolean;
  isActive?: boolean;
}

export const MenuItem: React.FC<IProperties> = ({ route, displayIcon }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 576px)");
  const id = useId();
  const hasSubmenu = "submenu" in route;

  const renderOption = (item: any) => {
    return (
      <Link to={item.route}>
        {route.icon && (
          <span role="icon" title={route.name}>
            {route.icon}
          </span>
        )}
        <span role="label">{route.name}</span>
      </Link>
    );
  };

  const renderMenuItem = () => {
    if (isSmallScreen && hasSubmenu && route.submenu.length) {
      return (
        <DropdownMenu
          className="sub-menu"
          dropdownMenu={{
            menuItems: route.submenu,
            renderOption: renderOption,
            keyExtractor: ({ name }) => {
              return `${id}__${name}`;
            },
          }}
          label={<NavLink to={route.route || ""}>{route.name}</NavLink>}
        />
      );
    }

    return (
      <li key={route.name} aria-expanded={showSubmenu}>
        <MenuItemLink route={route} setShowSubmenu={setShowSubmenu}>
          {displayIcon ? (
            <span role="icon" title={route.name}>
              {route.icon}
            </span>
          ) : null}
          <span role="label">{route.name}</span>
          {hasSubmenu && !!route.submenu.length && (
            <span aria-label="toggle-expand">
              <i className="pi pi-angle-down" />
            </span>
          )}
        </MenuItemLink>
        {hasSubmenu && <Submenu submenu={route.submenu} key={route.name} />}
      </li>
    );
  };

  return renderMenuItem();
};
