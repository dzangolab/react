import React from "react";

import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import Sidebar from "../components/Sidebar";

interface Properties {
  children: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
}

const CollapsibleSidebarLayout: React.FC<Properties> = (properties) => {
  const {
    sidebar = <Sidebar />,
    children,
    footer = <AppFooter />,
    header = <AppHeader navStyle="left-slider" />,
  } = properties;

  return (
    <div className="layout collapsible">
      {header}
      {sidebar}
      <main>{children}</main>
      {footer}
    </div>
  );
};

export default CollapsibleSidebarLayout;
