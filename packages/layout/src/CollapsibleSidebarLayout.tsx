import React from "react";

import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";

import "./css/collapsibleSidebarLayout.css";

interface Properties {
  children: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
}

const AdminLayout: React.FC<Properties> = (properties) => {
  const {
    sidebar,
    children,
    footer = <AppFooter />,
    header = <AppHeader navStyle="left-slider" />,
  } = properties;
  return (
    <div className="collapsible-layout">
      {sidebar}
      <main>
        {header}
        <div
          style={{
            flex: 1,
          }}
        >
          {children}
        </div>
        {footer}
      </main>
    </div>
  );
};

export default AdminLayout;
