import { FC, ReactNode } from "react";

import "./index.css";

interface DataProperties {
  label: ReactNode;
  value?: ReactNode | object;
  dataKey?: string;
  className?: string;
}

export const Data: FC<DataProperties> = ({
  className = "",
  dataKey,
  label,
  value,
}) => {
  const displayValue =
    dataKey && value && typeof value === "object" && dataKey in value
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (value as Record<string, any>)[dataKey]
      : value;

  return (
    <div className={`dz-data ${className}`.trim()}>
      <span className="dz-data-label">{label}</span>
      <span className="dz-data-value">{displayValue}</span>
    </div>
  );
};
