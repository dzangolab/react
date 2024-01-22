import { Button } from "@dzangolab/react-ui";
import React, { useState } from "react";

interface Properties {
  children?: React.ReactNode;
  expandIcon?: React.ReactNode;
  collapseIcon?: React.ReactNode;
}

const Sidebar: React.FC<Properties> = ({
  children,
  expandIcon = <i className="pi pi-angle-double-right"></i>,
  collapseIcon = <i className="pi pi-angle-double-left"></i>,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="sidebar" aria-expanded={open}>
      <div className="toggle-button">
        <Button
          onClick={() => setOpen(!open)}
          iconLeft={open ? collapseIcon : expandIcon}
          variant="textOnly"
          severity="secondary"
          size="small"
        />
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
