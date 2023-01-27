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
      <div style={{ display: "flex", flex: 1 }}>
        {sidebar}
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            paddingLeft: "0 2rem",
          }}
        >
          <main>{children}</main>
          {footer}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSidebarLayout;
