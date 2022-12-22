import React from "react";

import "./page.css";

interface Properties {
  children?: React.ReactNode;
  subtitle?: string;
  title?: string;
  toolbar?: React.ReactNode;
}

const Page: React.FC<Properties> = ({
  children,
  subtitle,
  title,
  toolbar,
}: Properties) => {
  return (
    <div className="page">
      {title && (
        <h1>
          {title}
          {subtitle && <small>{subtitle}</small>}
        </h1>
      )}
      {toolbar && <div className="toolbar">{toolbar}</div>}
      <div data-testid="page-content" className="content">
        {children}
      </div>
    </div>
  );
};

export default Page;
