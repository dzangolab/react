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
  
  return (
    <article className={`dz-card ${className}`}>
      <header>
        {renderHeader ? (
          renderHeader()
        ) : (
          <>
            {title && <strong className="card-title">{title}</strong>}
            {subTitle && <span className="card-subtitle">{subTitle}</span>}
          </>
        )}
      </header>

      {content && <section className="card-content">
        {content}
      </section>}

      {renderFooter && (
        <footer>
          {renderFooter()}
        </footer>
      )}
    </article>
  );
};
