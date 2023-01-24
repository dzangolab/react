import React from "react";

import { useSidebar } from "@/hooks/useSidebar";

interface Properties {
  label?: string;
  children?: React.ReactNode;
}

const Menu: React.FC<Properties> = ({ label, children }) => {
  const { open } = useSidebar();

  return (
    <div className="menu">
      {open && label ? <p>{label}</p> : null}
      {children}
    </div>
  );
};

export default Menu;
