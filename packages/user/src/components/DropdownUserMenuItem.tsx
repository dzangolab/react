import React from "react";
import { Link } from "react-router-dom";

interface Properties {
  children: React.ReactNode;
  icon?: string;
  route?: string;
  showIcon?: boolean;
}

const DropdownUserMenuItem = ({
  children,
  route,
  icon,
  showIcon,
}: Properties) => {
  if (route) {
    return (
      <Link to={route}>
        {showIcon && <i className={icon}></i>}
        {children}
      </Link>
    );
  }

  return (
    <>
      {showIcon && <i className={icon}></i>}
      {children}
    </>
  );
};

export default DropdownUserMenuItem;
