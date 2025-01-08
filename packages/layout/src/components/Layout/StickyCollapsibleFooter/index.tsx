import React from "react";

interface Properties {
  children?: React.ReactNode;
}

export const StickyCollapsibleFooter = ({ children }: Properties) => {
  return (
    <>
      <div className="sticky-collapsible-footer-container">
        <div className="sticky-collapsible-footer-placeholder"></div>
        <div className="footer">{children}</div>
      </div>
    </>
  );
};
