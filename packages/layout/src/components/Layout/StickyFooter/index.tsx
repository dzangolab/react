import React from "react";

import { Copyright, Version } from "../common";

interface FooterProperties {
  children?: React.ReactNode;
}

export const StickyFooter = ({ children }: FooterProperties) => {
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
      <div className="sticky-footer-container">
        <div className="sticky-footer-trigger"></div>
        <footer className="sticky-footer">{children || renderContent()}</footer>
      </div>
    </>
  );
};
