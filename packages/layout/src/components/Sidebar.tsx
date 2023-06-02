import React, { useState } from "react";

interface Properties {
  children?: React.ReactNode;
  expandIcon?: React.ReactNode;
  collapseIcon?: React.ReactNode;
}

const Sidebar: React.FC<Properties> = ({
  children,
  expandIcon = <i className="pi pi-angle-right"></i>,
  collapseIcon = <i className="pi pi-angle-left"></i>,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="sidebar" aria-expanded={open}>
      <div className="toggle-button">
        <button onClick={() => setOpen(!open)}>
          {open ? collapseIcon : expandIcon}
        </button>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
