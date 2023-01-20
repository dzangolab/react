import React from "react";

import "../index.css";

interface Properties {
  children?: React.ReactNode;
  customStyle?: React.CSSProperties;
  open: boolean;
}

const Sidebar: React.FC<Properties> = ({ children, customStyle, open }) => {
  return (
    <div
      className={open ? "sidebarMenu openSidebarMenu" : "sidebarMenu"}
      style={customStyle}
    >
      {children}
    </div>
  );
};

export default Sidebar;
