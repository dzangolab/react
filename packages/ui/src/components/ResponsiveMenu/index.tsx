import React from "react";
import "./responsive-menu.css";

interface Properties {
  cssClass: string;
  displayColumn?: boolean;
  routes: {
    name: string;
    route: string;
  }[];
}

const ResponsiveMenu = ({
  routes,
  cssClass = "",
  displayColumn = false,
}: Properties) => {
  return (
    <nav className={`menu ${displayColumn ? "column" : ""} ${cssClass}`}>
      <ul>
        {routes.map((route, index) => (
          <li key={index}>
            <a href={route.route}>{route.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

ResponsiveMenu.defaultProps = {
  cssClass: undefined,
};

export default ResponsiveMenu;
