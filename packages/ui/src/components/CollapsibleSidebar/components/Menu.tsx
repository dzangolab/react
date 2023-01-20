import React from "react";

interface Properties {
  label?: string;
  children?: React.ReactNode;
}

const Menu: React.FC<Properties> = ({ label, children }) => {
  return (
    <div className="menu">
      {label ? <h1>{label}</h1> : null}
      {children}
    </div>
  );
};

export default Menu;
