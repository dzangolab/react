import { FC, ReactNode } from "react";

import "./index.css";

interface DataProperties {
  label?: ReactNode;
  value?: ReactNode;
  className?: string;
}

export const Data: FC<DataProperties> = ({ className = "", label, value }) => {
  return (
    <div className={`dz-data ${className}`.trim()}>
      <span className="dz-data-label">{label}:</span>
      <span className="dz-data-value">{value}</span>
    </div>
  );
};
