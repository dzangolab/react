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
      {breadcrumb ? <div className="breadcrumb">{breadcrumb}</div> : null}
      {title && <h1>{title}</h1>}
      {subtitle && (
        <div title="subtitle" className="subtitle">
          {subtitle}
        </div>
      )}
      {toolbar && <div className="toolbar">{toolbar}</div>}
    </>
  );
};
