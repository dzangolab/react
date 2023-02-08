import React from "react";

import { LoadingPage } from "../Loading";

import "./page.css";

interface Properties {
  children?: React.ReactNode;
  errorMessage?: string;
  loading?: boolean;
  loadingComponent?: React.ReactElement;
  subtitle?: string;
  title?: string;
  toolbar?: React.ReactNode;
}

const Page: React.FC<Properties> = ({
  children,
  errorMessage,
  loading = false,
  loadingComponent = <LoadingPage />,
  subtitle,
  title,
  toolbar,
}: Properties) => {
  let child = null;

  if (loading) {
    child = loadingComponent;
  } else if (errorMessage) {
    child = (
      <div className="error-message" role="alert">
        <span>{errorMessage}</span>
      </div>
    );
  } else {
    child = (
      <>
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
      </>
    );
  }
  return <div className="page">{child}</div>;
};

export default Page;
