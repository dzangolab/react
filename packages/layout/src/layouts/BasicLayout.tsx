import React from "react";

import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";

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
    <div className="layout basic">
      {header}

      <main>{children}</main>

      {footer}
    </div>
  );
};

export default BasicLayout;
