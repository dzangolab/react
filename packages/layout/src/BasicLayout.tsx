import React from "react";

import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";

import type { AppConfig } from "@dzangolab/react-config";

import "@dzangolab/react-ui/dist/DzangolabReactUI.css";
import "./css/basic-layout.css";

interface Properties {
  children: React.ReactNode;
  config: AppConfig;
  footer?: React.ReactNode;
  header?: React.ReactNode;
}

const BasicLayout: React.FC<Properties> = (properties: Properties) => {
  const { config } = properties;

  const {
    children,
    footer = <AppFooter config={config} />,
    header = <AppHeader config={config} navStyle="left-slider" />,
  } = properties;

  return (
    <div className="basic-layout">
      {header}

      <main>{children}</main>

      {footer}
    </div>
  );
};

export default BasicLayout;
