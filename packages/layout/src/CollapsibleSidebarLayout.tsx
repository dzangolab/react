import React, { useState } from "react";

import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";

import "@dzangolab/react-ui/dist/DzangolabReactUI.css";
import "./css/collapsibleSidebarLayout.css";
import { Sidebar, SidebarHeader, Menu } from "@dzangolab/react-ui";
import { MenuItem } from "@dzangolab/react-ui";

interface Properties {
  children: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
}

const BasicLayout: React.FC<Properties> = (properties) => {
  const {
    sidebar,
    children,
    footer = <AppFooter />,
    header = <AppHeader navStyle="left-slider" />,
  } = properties;
  return (
    <div className="collapsible-layout">
      <div className="sidebar">{sidebar}</div>

      <main>
        {/* {header}*/}
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

export default BasicLayout;
