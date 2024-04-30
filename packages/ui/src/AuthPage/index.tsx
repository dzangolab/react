import { LoadingPageProperties } from "@/LoadingPage";

import { LoadingPage } from "..";

interface IProperties {
  centered?: boolean;
  children?: React.ReactNode;
  className?: string;
  errorMessage?: string;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  loadingPageStyle?: LoadingPageProperties;
  title?: string;
}

export const AuthPage = ({
  centered = true,
  children,
  className,
  errorMessage,
  loading,
  loadingComponent,
  loadingPageStyle,
  title,
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

  return (
    <div className={pageClassName} data-centered={centered}>
      {renderTitle()}
      {child ? child : <div className="dz-auth-page-content">{children}</div>}
    </div>
  );
};
