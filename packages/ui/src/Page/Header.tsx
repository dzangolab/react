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
    <div className="page-header">
      {breadcrumb ? <div className="breadcrumb">{breadcrumb}</div> : null}
      {title && (
        <h1>
          {title}
          {typeof subtitle === "string" ? <small>{subtitle}</small> : subtitle}
        </h1>
      )}
      {toolbar && <div className="toolbar">{toolbar}</div>}
    </div>
  );
};
