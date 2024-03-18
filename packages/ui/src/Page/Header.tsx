interface IHeaderProperties {
  breadcrumb?: React.ReactNode;
  titleTag?: string | React.ReactNode;
  subtitle?: React.ReactNode | string;
  toolbar?: React.ReactNode;
  title?: string;
}

export const PageHeader = ({
  breadcrumb,
  titleTag,
  subtitle,
  toolbar,
  title,
}: IHeaderProperties) => {
  return (
    <div className="dz-page-header">
      {breadcrumb ? (
        <div className="dz-page-breadcrumb" data-testid="page-breadcrumb">
          {breadcrumb}
        </div>
      ) : null}
      <div className="dz-page-title-wrapper">
        {title && (
          <h1>
            {titleTag && <span>{titleTag}</span>}
            {title}
          </h1>
        )}
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
