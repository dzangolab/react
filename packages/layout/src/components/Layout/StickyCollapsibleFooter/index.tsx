import React from "react";

interface Properties {
  children?: React.ReactNode;
}

export const StickyCollapsibleFooter = ({ children }: Properties) => {
  return (
    <footer className="sticky-collapsible">
      <div className="content">{children}</div>
    </footer>
  );
};
