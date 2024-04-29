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
  return (
    <div className={`dz-card ${className}`}>
      <div className="card-header">
        {renderHeader ? (
          renderHeader()
        ) : (
          <>
            {title && <h1>{title}</h1>}
            {subTitle && <span>{subTitle}</span>}
          </>
        )}
      </div>
  
      <div className="card-content">
        {renderContent ? renderContent() : children}
      </div>
      
      {renderFooter && (
        <div className="card-footer">
          {renderFooter()}
        </div>
      )}
    </div>
  );
};
