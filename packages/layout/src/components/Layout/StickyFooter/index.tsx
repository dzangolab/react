import React from "react";

import { Copyright, Version } from "../common";

interface Properties {
  children?: React.ReactNode;
}

export const StickyFooter = ({ children }: Properties) => {
  const renderContent = () => {
    return (
      <>
        <Copyright />
        <Version />
      </>
    );
  };

  return (
    <>
      <div className="footer-container">
        <div className="footer-trigger"></div>
        <div className="footer">{children || renderContent()}</div>
      </div>
    </>
  );
};
