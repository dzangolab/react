import { FC, ReactNode } from "react";

import "./index.css";

type DataProperties = {
  caption: ReactNode;
  className?: string;
  value: ReactNode;
};

export const Data: FC<DataProperties> = ({
  className = "",
  caption,
  value,
}) => {
  return (
    <div className={`dz-data ${className}`.trim()}>
      <div className="dz-data-label">{caption}</div>
      <div className="dz-data-value">{value}</div>
    </div>
  );
};
