import React, { useState } from "react";

import "../css/components/sidebar.css";

interface Properties {
  children?: React.ReactNode;
  customStyle?: React.CSSProperties;
}

const Sidebar: React.FC<Properties> = ({ children, customStyle }) => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={open ? "sidebar-menu open" : "sidebar-menu"}
      style={customStyle}
    >
      <div className="toggle-button">
        <span onClick={() => setOpen(!open)}>&gt;</span>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
