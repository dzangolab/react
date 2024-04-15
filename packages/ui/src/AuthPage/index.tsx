import { LoadingPageProperties } from "@/LoadingPage";

import { LoadingPage } from "..";

interface IProperties {
  title?: string;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  loadingPageStyle?: LoadingPageProperties;
  errorMessage?: string;
  form?: React.ReactNode;
  links?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  centered?: boolean;
}

export const AuthPage = ({
  title,
  loading,
  loadingComponent,
  loadingPageStyle,
  errorMessage,
  form,
  links,
  children,
  className,
  centered = true,
}: IProperties) => {
  let child = null;
  let pageClassName = "dz-auth-page";

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
    pageClassName += " " + className;
  }

  const renderTitle = () => {
    if (!title) {
      return null;
    }

    return <h1 className="dz-auth-page-header">{title}</h1>;
  };

  const renderForm = () => {
    if (!form) {
      return null;
    }

    return form;
  };

  const renderLinks = () => {
    if (!links) {
      return null;
    }

    return <div className="links">{links}</div>;
  };

  return (
    <div className={pageClassName} data-centered={centered}>
      {renderTitle()}
      {child ? (
        child
      ) : (
        <div className="dz-auth-page-content">
          {renderForm()}
          {renderLinks()}
          {children}
        </div>
      )}
    </div>
  );
};
