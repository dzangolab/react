import React from "react";

interface Properties {
  children: React.ReactNode;
  fixed?: boolean;
}

export const StickyCollapsibleFooter = ({
  children,
  fixed = true,
}: Properties) => {
  return (
    <footer className={`sticky-collapsible ${fixed ? "fixed" : ""}`.trimEnd()}>
      <div className="content">{children}</div>
    </footer>
  );
};
