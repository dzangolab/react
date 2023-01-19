import React from "react";

import "./index.css";

interface Properties {
  children?: React.ReactNode;
  open?: boolean;
  customStyle?: React.CSSProperties;
}

const Sidebar: React.FC<Properties> = ({ children, open, customStyle }) => {
  return (
    <div
      className={open ? "sidebarMenu openSidebarMenu" : "sidebarMenu"}
      style={customStyle}
    >
      {open ? children : null}
    </div>
  );
};

export default Sidebar;
