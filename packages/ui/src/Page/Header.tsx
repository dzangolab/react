interface IHeaderProperties {
  breadcrumb?: React.ReactNode;
  titleTag?: string | React.ReactNode;
  subtitle?: React.ReactNode | string;
  toolbar?: React.ReactNode;
  title?: string | React.ReactNode;
}

export const PageHeader = ({
  breadcrumb,
  titleTag,
  subtitle,
  toolbar,
  title,
}: IHeaderProperties) => {
  const renderTitle = () => {
    if (!title) return null;

    if (typeof title === "string") {
      return (
        <h1>
          {title}
          {titleTag && <span>{titleTag}</span>}
        </h1>
      );
    }

    return title;
  };

  return (
    <div className="dz-page-header">
      {breadcrumb ? (
        <div className="dz-page-breadcrumb" data-testid="page-breadcrumb">
          {breadcrumb}
        </div>
      ) : null}
      <div className="dz-page-title-wrapper">
        {renderTitle()}
        {subtitle && (
          <div data-testid="page-subtitle" className="dz-page-subtitle">
            {subtitle}
          </div>
        )}
      </div>
      {toolbar && (
        <div data-testid="page-toolbar" className="dz-page-toolbar">
          {toolbar}
        </div>
      )}
    </div>
  );
};
