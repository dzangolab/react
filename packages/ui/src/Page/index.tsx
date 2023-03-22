import React from "react";

import LoadingPage, { LoadingPageProperties } from "../LoadingPage";

import "./page.css";

interface Properties {
  children?: React.ReactNode;
  cssClass?: string;
  errorMessage?: string;
  loading?: boolean;
  loadingComponent?: React.ReactElement;
  loadingPageStyle?: LoadingPageProperties;
  subtitle?: string;
  title?: string;
  toolbar?: React.ReactNode;
}

const Page: React.FC<Properties> = ({
  children,
  cssClass,
  errorMessage,
  loading = false,
  loadingComponent,
  loadingPageStyle,
  subtitle,
  title,
  toolbar,
}: Properties) => {
  let child = null;
  let classNames = "page";

  if (loading) {
    child = loadingComponent ? (
      loadingComponent
    ) : (
      <LoadingPage {...loadingPageStyle} />
    );
  } else if (errorMessage) {
    child = (
      <div className="error" role="alert">
        <span>{errorMessage}</span>
      </div>
    );
  }

  if (cssClass) {
    classNames += " " + cssClass;
  }

  return (
    <div className={classNames}>
      {title && (
        <h1>
          {title}
          {subtitle && <small>{subtitle}</small>}
        </h1>
      )}
      {toolbar && <div className="toolbar">{toolbar}</div>}
      <div data-testid="page-content" className="content">
        {child ? child : children}
      </div>
    </div>
  );
};

export default Page;
