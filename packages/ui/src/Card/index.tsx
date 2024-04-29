import React from "react";

interface ICardProperties {
  children?: React.ReactNode;
  className?: string;
  subTitle?: string;
  title?: string;
  renderContent?: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  renderHeader?: () => React.ReactNode;
}

export const Card = ({
  children,
  className = '',
  title,
  subTitle,
  renderContent,
  renderFooter,
  renderHeader,
}: ICardProperties) => {
  const content = renderContent && renderContent() || children
  const header = renderHeader && renderHeader() || title || subTitle

  return (
    <div className={`dz-card ${className}`}>
    {header && <div className="card-header">
        {renderHeader ? (
          renderHeader()
        ) : (
          <>
            {title && <h1>{title}</h1>}
            {subTitle && <span>{subTitle}</span>}
          </>
        )}
      </div>}
      
      {content && <div className="card-content">
        {content}
      </div>}

      {renderFooter && (
        <div className="card-footer">
          {renderFooter()}
        </div>
      )}
    </div>
  );
};
