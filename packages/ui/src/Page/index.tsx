import React from "react";

import LoadingPage, { LoadingPageProperties } from "../LoadingPage";

interface Properties
  extends Pick<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    "aria-orientation"
  > {
  children?: React.ReactNode;
  className?: string;
  errorMessage?: string;
  loading?: boolean;
  loadingComponent?: React.ReactElement;
  loadingPageStyle?: LoadingPageProperties;
  subtitle?: React.ReactNode;
  title?: string;
  toolbar?: React.ReactNode;
}

const Page: React.FC<Properties> = ({
  children,
  className,
  errorMessage,
  loading = false,
  loadingComponent,
  loadingPageStyle,
  subtitle,
  title,
  toolbar,
  ...others
}: Properties) => {
  let child = null;
  let _className = "page";
  console.log(typeof subtitle);
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

  if (className) {
    _className += ` ${className}`;
  }

  return (
    <div className={_className}>
      {title && (
        <h1>
          {title}
          {typeof subtitle === "string" ? (
            <small>{subtitle}</small>
          ) : (
            <span>{subtitle}</span>
          )}
        </h1>
      )}
      {toolbar && <div className="toolbar">{toolbar}</div>}
      <div data-testid="page-content" className="content" {...others}>
        {child ? child : children}
      </div>
    </div>
  );
};

export default Page;
