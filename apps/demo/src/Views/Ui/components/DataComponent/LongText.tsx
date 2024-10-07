import { FC, ReactNode, useMemo } from "react";
import "./long-text.css";
import { Data } from ".";

interface TruncatedTextProperties {
  label?: ReactNode;
  value?: string;
  maxLength?: number;
  multipleLines?: boolean;
  truncate?: boolean;
  className?: string;
}

export const LongText: FC<TruncatedTextProperties> = ({
  className = "",
  label = "long text",
  value = "asdas ass d asd as d asas das d a d asd sa  as das das d asd as dsa d asd as das fas d asd asd as das d asd as da sd asd as f saf as das dsa das d",
  maxLength = 100,
  multipleLines = false,
  truncate = false,
}) => {
  const _value = useMemo(() => {
    if (truncate && multipleLines) {
      return `${value.substring(0, maxLength)}${
        value.length > maxLength ? "..." : ""
      }`;
    }

    return value;
  }, [value, maxLength, truncate]);

  return (
    <Data
      className={`dz-long-text ${
        multipleLines ? "multiple" : "single"
      } ${className}`.trim()}
      label={label}
      value={_value}
    ></Data>
  );
};
