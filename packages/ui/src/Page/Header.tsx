interface IHeaderProperties {
  title?: string;
  subtitle?: React.ReactNode | string;
  toolbar?: React.ReactNode;
  breadcrumb?: React.ReactNode;
}

export const PageHeader = ({
  title,
  subtitle,
  toolbar,
  breadcrumb,
}: IHeaderProperties) => {
  return (
    <>
      {breadcrumb ? (
        <div className="breadcrumb" data-testid="page-breadcrumb">
          {breadcrumb}
        </div>
      ) : null}
      {title && <h1>{title}</h1>}
      {subtitle && (
        <div data-testid="page-subtitle" className="subtitle">
          {subtitle}
        </div>
      )}
      {toolbar && (
        <div data-testid="page-toolbar" className="toolbar">
          {toolbar}
        </div>
      )}
    </>
  );
};
