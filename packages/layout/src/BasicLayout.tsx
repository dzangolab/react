import React from "react";

import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";

import "@dzangolab/react-ui/dist/DzangolabReactUI.css";
import "./css/basic-layout.css";

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

  return (
    <div className="basic-layout">
      {header}

      <main>{children}</main>

      {footer}
    </div>
  );
};

export default BasicLayout;
