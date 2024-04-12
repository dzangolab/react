interface IProperties {
  title?: string;
  form: React.ReactNode;
  links?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const AuthPage = ({
  title,
  form,
  links,
  children,
  className,
}: IProperties) => {
  let pageClassName = "dz-auth-page";

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
      <div className="dz-auth-page-content">
        {form}
        {renderLinks()}
        {children}
      </div>
    </div>
  );
};
