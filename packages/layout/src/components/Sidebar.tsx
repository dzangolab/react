import React, { useState } from "react";

interface Properties {
  children?: React.ReactNode;
}

const Sidebar: React.FC<Properties> = ({ children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="sidebar" aria-expanded={open}>
      <div className="toggle-button">
        <button onClick={() => setOpen(!open)}>&gt;</button>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
