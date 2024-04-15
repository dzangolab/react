import { LoadingPageProperties } from "@/LoadingPage";

import { LoadingPage } from "..";

interface IProperties {
  title?: string;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  loadingPageStyle?: LoadingPageProperties;
  errorMessage?: string;
  form: React.ReactNode;
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

    return <h1>{title}</h1>;
  };

  const renderLinks = () => {
    if (!links) {
      return null;
    }

    return <div className="links">{links}</div>;
  };

  return (
    <div className={pageClassName}>
      {renderTitle()}
      {child ? (
        child
      ) : (
        <div className="dz-auth-page-content">
          {form}
          {renderLinks()}
          {children}
        </div>
      )}
    </div>
  );
};
