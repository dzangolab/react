import { ToolbarActions } from "./ToolbarActions";

import type { ToolbarActionsMenuProperties } from "./ToolbarActions";

interface IHeaderProperties {
  breadcrumb?: React.ReactNode;
  subtitle?: React.ReactNode | string;
  title?: string | React.ReactNode;
  titleTag?: string | React.ReactNode;
  toolbar?: React.ReactNode;
  toolbarActionMenu?: ToolbarActionsMenuProperties;
}

export const PageHeader = ({
  breadcrumb,
  titleTag,
  subtitle,
  toolbar,
  title,
  toolbarActionMenu,
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
      <div className="dz-page-title-wrapper">
        {renderTitle()}
        {subtitle && (
          <div data-testid="page-subtitle" className="dz-page-subtitle">
            {subtitle}
          </div>
        )}
      </div>
      {(breadcrumb || toolbar) && (
        <div
          data-testid="page-toolbar"
          className="dz-page-toolbar"
          data-breadcrumb={!!breadcrumb}
        >
          {breadcrumb}
          {toolbar}
        </div>
      )}
      {toolbarActionMenu && (
        <div className="dz-page-header-action-menu">
          <ToolbarActions {...toolbarActionMenu} />
        </div>
      )}
    </div>
  );
};
