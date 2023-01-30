import React from "react";

import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import "./css/collapsible-sidebar-layout.css";
import Sidebar from "./components/Sidebar";

interface Properties {
  children: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
}

const CollapsibleSidebarLayout: React.FC<Properties> = (
  properties: Properties
) => {
  const {
    sidebar = <Sidebar />,
    children,
    footer = <AppFooter />,
    header = <AppHeader navStyle="left-slider" />,
  } = properties;

  return (
    <div className="basic-layout">
      {header}
      <div className="bodyContainer">
        {sidebar}
        <div className="mainContainer">
          <main>{children}</main>
          {footer}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSidebarLayout;
