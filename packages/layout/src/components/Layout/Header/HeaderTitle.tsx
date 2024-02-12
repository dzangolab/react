interface HeaderTitleProperties {
  children?: React.ReactNode;
  title?: string | React.ReactNode;
}

export const HeaderTitle = ({ children, title }: HeaderTitleProperties) => {
  const renderContent = () => {
    return <span>{title}</span>;
  };

  return <div className="header-title">{children || renderContent()}</div>;
};
