import React, { useState } from "react";

import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";

import "@dzangolab/react-ui/dist/DzangolabReactUI.css";
import "./css/collapsibleSidebarLayout.css";
import { Sidebar } from "@dzangolab/react-ui";

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

  const [open, setOpen] = useState(false);
  return (
    <div className="basic-layout">
      <div onClick={() => setOpen(!open)}>{header}</div>

      <main>
        <div style={{ display: "flex", flex: 1 }}>
          <Sidebar
            open={open}
            customStyle={{
              position: "relative",
            }}
          />
          <div
            style={{
              flex: 1,
              padding: "0 1rem",
            }}
          >
            {children}
          </div>
        </div>
      </main>

      {footer}
    </div>
  );
};

export default BasicLayout;
