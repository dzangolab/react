interface IHeaderProperties {
  breadcrumb?: React.ReactNode;
  headingSubtitle?: string | React.ReactNode;
  subtitle?: React.ReactNode | string;
  toolbar?: React.ReactNode;
  title?: string;
}

export const PageHeader = ({
  breadcrumb,
  headingSubtitle,
  subtitle,
  toolbar,
  title,
}: IHeaderProperties) => {
  return (
    <>
      {breadcrumb ? (
        <div className="breadcrumb" data-testid="page-breadcrumb">
          {breadcrumb}
        </div>
      ) : null}
      {title && (
        <h1>
          {title}
          {headingSubtitle && <span>{headingSubtitle}</span>}
        </h1>
      )}
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
