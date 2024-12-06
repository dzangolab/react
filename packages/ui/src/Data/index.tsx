import { FC, ReactNode } from "react";

import "./index.css";

type DataValueType =
  | {
      value: ReactNode;
    }
  | {
      value: object;
      dataKey: string;
    };

type DataProperties = {
  label: ReactNode;
  className?: string;
} & DataValueType;

export const Data: FC<DataProperties> = ({
  className = "",
  label,
  value,
  ...others
}) => {
  const displayValue =
    "dataKey" in others &&
    value &&
    typeof value === "object" &&
    others.dataKey in value
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (value[others.dataKey as keyof typeof value] as any)
      : value;

  return (
    <div className={`dz-data ${className}`.trim()}>
      <span className="dz-data-label">{label}</span>
      <span className="dz-data-value">{displayValue}</span>
    </div>
  );
};
