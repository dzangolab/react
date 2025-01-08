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
      <div className="footer-wrapper">
        <div className="footer-placeholder"></div>
        <div className="footer-content">{children || renderContent()}</div>
      </div>
    </>
  );
};
