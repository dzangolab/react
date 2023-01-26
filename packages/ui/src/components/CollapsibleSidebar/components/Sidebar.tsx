import React from "react";

import { useSidebar } from "@/hooks/useSidebar";
import "../index.css";

interface Properties {
  children?: React.ReactNode;
  customStyle?: React.CSSProperties;
}

const Sidebar: React.FC<Properties> = ({ children, customStyle }) => {
  const { open } = useSidebar();
  let classNames = "sidebarMenu";

  if (customStyle?.position === "fixed") {
    classNames += " sidebarMenuFixed";
    customStyle = { ...customStyle, position: open ? "fixed" : "relative" };
  }

  if (open) {
    classNames += " openSidebarMenu";
  }

  return (
    <div className="sidebar">
      <div className={classNames} style={customStyle}>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
