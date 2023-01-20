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
}

const BasicLayout: React.FC<Properties> = (properties) => {
  const {
    children,
    footer = <AppFooter />,
    header = <AppHeader navStyle="left-slider" />,
  } = properties;
  const [open, setOpen] = useState(true);
  return (
    <div className="basic-layout">
      <div className="sidebar">
        <Sidebar
          customStyle={{
            position: "relative",
          }}
          open={open}
        >
          <SidebarHeader toggle={() => setOpen(!open)} />
          <Menu>
            <MenuItem>sdada da das</MenuItem>
          </Menu>
        </Sidebar>
      </div>

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

export default BasicLayout;
