import React from "react";

interface Properties {
  children?: React.ReactNode;
}

export const StickyCollapsibleFooter = ({ children }: Properties) => {
  return (
    <>
      <div className="footer-wrapper">
        <footer className="footer-content">{children}</footer>
      </div>
    </>
  );
};
