import React from "react";
import { Link } from "react-router-dom";

interface Properties {
  children: React.ReactNode;
  onClick?: () => void;
  route?: string;
}

const DropdownUserMenuItem = ({ children, onClick, route }: Properties) => {
  if (route) {
    return (
      <li className="option">
        <Link to={route} onClick={onClick}>
          {children}
        </Link>
      </li>
    );
  }

  return (
    <li className="option" onClick={onClick}>
      {children}
    </li>
  );
};

export default DropdownUserMenuItem;
