import React from "react";
import { Link } from "react-router-dom";

interface Properties {
  children: React.ReactNode;
  route?: string;
}

const DropdownUserMenuItem = ({ children, route }: Properties) => {
  if (route) {
    return <Link to={route}>{children}</Link>;
  }

  return <>{children}</>;
};

export default DropdownUserMenuItem;
