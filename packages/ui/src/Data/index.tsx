import { FC, ReactNode } from "react";

type DataProperties = {
  caption: ReactNode;
  className?: string;
  value: ReactNode;
  mode?: "attr" | "stat";
};

export const Data: FC<DataProperties> = ({
  className = "",
  caption,
  value,
  mode = "attr",
}) => {
  return (
    <div
      className={`data ${mode === "stat" ? "data-stat" : ""} ${className}`.trim()}
    >
      <div className="label">{caption}</div>
      <div className="value">{value}</div>
    </div>
  );
};
