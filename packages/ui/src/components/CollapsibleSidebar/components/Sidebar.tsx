import React from "react";

import { useSidebar } from "@/hooks/useSidebar";
import "../index.css";

interface Properties {
  children?: React.ReactNode;
  customStyle?: React.CSSProperties;
}

const Sidebar: React.FC<Properties> = ({ children, customStyle }) => {
  const { open } = useSidebar();

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
