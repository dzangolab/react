import { ReactNode } from "react";

interface Properties {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
}

export const Section: React.FC<Properties> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <section className="demo-section">
      {title && <h3>{title}</h3>}
      {subtitle && <small>{subtitle}</small>}
      <div className="demo-section-content">{children}</div>
    </section>
  );
};
