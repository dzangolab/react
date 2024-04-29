import React from "react";

interface ICardProperties {
  className?: string;
  renderContent?: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  renderHeader?: () => React.ReactNode;
}

export const Card = ({ 
  className, 
  renderContent, 
  renderFooter,
  renderHeader, 
}: ICardProperties) => {
  return (
    <div className={`dz-card ${className}`}>
      {renderHeader ? <div className="card-header">
        {renderHeader()}
      </div> : null}
      {renderContent ? <div className="card-content">
        {renderContent()}
      </div> : null}
      {renderFooter ? <div className="card-footer">
        {renderFooter()}
      </div> : null}
    </div>
  );
};
