import React from "react";

import { LoadingPage } from "../Loading";

import "./page.css";

interface Properties {
  children?: React.ReactNode;
  loading?: boolean;
  loadingComponent?: React.ReactElement;
  subtitle?: string;
  title?: string;
  toolbar?: React.ReactNode;
}

const Page: React.FC<Properties> = ({
  children,
  loading = false,
  loadingComponent = <LoadingPage />,
  subtitle,
  title,
  toolbar,
}: Properties) => {
  return loading ? (
    loadingComponent
  ) : (
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
