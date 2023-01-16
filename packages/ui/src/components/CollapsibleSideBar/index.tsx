import React from "react";

import "./index.css";

interface Properties {
  children?: React.ReactNode;
  open?: boolean;
}

const Sidebar: React.FC<Properties> = ({ children, open }) => {
  return (
    <div className={open ? "sidebarMenu openSidebarMenu" : "sidebarMenu"}>
      {children}
    </div>
  );
};

export default Sidebar;
