import React from "react";
import "./responsive-menu.css";

interface Properties {
  cssClass: string;
  horizontal?: boolean;
  routes: {
    name: string;
    route: string;
  }[];
}

const ResponsiveMenu = ({
  routes,
  cssClass = "",
  horizontal = false,
}: Properties) => {
  let classNames = "menu";

  if (horizontal) {
    classNames += " column";
  }

  if (cssClass) {
    classNames += " " + cssClass;
  }

  return (
    <nav className={classNames}>
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
