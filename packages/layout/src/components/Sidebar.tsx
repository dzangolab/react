import React, { useState } from "react";

import "../assets/css/components/sidebar.css";

interface Properties {
  children?: React.ReactNode;
  customStyle?: React.CSSProperties;
}

const Sidebar: React.FC<Properties> = ({ children, customStyle }) => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`sidebar-menu ${open ? "open" : "close"}`}
      style={customStyle}
    >
      <div className="toggle-button">
        <button onClick={() => setOpen(!open)}>&gt;</button>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
