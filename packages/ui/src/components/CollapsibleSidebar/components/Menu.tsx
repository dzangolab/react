import React from "react";

interface Properties {
  label?: string;
  children?: React.ReactNode;
}

const Menu: React.FC<Properties> = ({ label, children }) => {
  return (
    <div className="menu">
      {label ? <p>{label}</p> : null}
      {children}
    </div>
  );
};

export default Menu;
