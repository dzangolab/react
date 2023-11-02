import React from "react";
import { Link } from "react-router-dom";

interface Properties {
  children: React.ReactNode;
  route?: string;
  icon?: string;
}

const DropdownUserMenuItem = ({ children, route, icon }: Properties) => {
  if (route) {
    return (
      <Link to={route}>
        {icon && <i className={icon}></i>}
        {children}
      </Link>
    );
  }

  return (
    <>
      {icon && <i className={icon}></i>}
      {children}
    </>
  );
};

export default DropdownUserMenuItem;
