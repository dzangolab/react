import { Dispatch, SetStateAction, useId, useState } from "react";
import { NavLink, useInRouterContext, useNavigate } from "react-router-dom";

import { DropdownMenu, useMediaQuery } from "..";
import { Submenu } from "../Submenu";

import { NestedMenuRouteType, MenuRouteType } from ".";

interface IProperties {
  route: NestedMenuRouteType | MenuRouteType;
  displayIcon?: boolean;
  isActive?: boolean;
}

interface IItemLinkProperties {
  children: React.ReactNode;
  route: NestedMenuRouteType | MenuRouteType;
  setShowSubmenu: Dispatch<SetStateAction<boolean>>;
}

export const MenuItem: React.FC<IProperties> = ({ route, displayIcon }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 576px)");
  const navigate = useNavigate();
  const id = useId();

  const improvedSubmenu = () => {
    console.log("Hello");
    if ("submenu" in route) {
      return route.submenu.map((element) => ({
        label: element.name,
        onClick: () => {
          navigate(element.route);
        },
      }));
    }

    return [];
  };

  return !isSmallScreen ? (
    <li key={route.name} aria-expanded={showSubmenu}>
      <MenuItemLink route={route} setShowSubmenu={setShowSubmenu}>
        {displayIcon ? (
          <span role="icon" title={route.name}>
            {route.icon}
          </span>
        ) : null}
        <span role="label">{route.name}</span>
        {"submenu" in route && !!route.submenu.length && (
          <span aria-label="toggle-expand">
            <i className="pi pi-angle-down" />
          </span>
        )}
      </MenuItemLink>
      {"submenu" in route && (
        <Submenu submenu={route.submenu} key={route.name} />
      )}
    </li>
  ) : (
    "submenu" in route && (
      <DropdownMenu
        className="sub-menu"
        dropdownMenu={{
          menuItems: improvedSubmenu(),
          keyExtractor: ({ name }) => {
            return `${id}__${name}`;
          },
        }}
        label={route.name}
        expandIcon={route.submenu.length ? <>&#9662;</> : <></>}
        collapseIcon={route.submenu.length ? <>&#9652;</> : <></>}
      />
    )
  );
};

const MenuItemLink = ({
  children,
  route,
  setShowSubmenu,
}: IItemLinkProperties) => {
  const hasRouterContext = useInRouterContext();

  if (hasRouterContext) {
    return (
      <NavLink
        to={route.route || ""}
        end={route.route === "/"}
        onClick={() =>
          "submenu" in route && setShowSubmenu((previous) => !previous)
        }
      >
        {children}
      </NavLink>
    );
  }

  const isActive = isNavLinkActive(route.route || "");

  return (
    <a
      href={route.route}
      className={isActive ? "active" : undefined}
      aria-current={isActive ? "page" : undefined}
      onClick={() =>
        "submenu" in route && setShowSubmenu((previous) => !previous)
      }
    >
      {children}
    </a>
  );
};

const isNavLinkActive = (link: string) => {
  {
    const pathnameArray = window.location.pathname.split("/");
    const isActive =
      window.location.pathname.startsWith(link) ||
      (pathnameArray.length && pathnameArray.includes(link));

    return isActive;
  }
};
