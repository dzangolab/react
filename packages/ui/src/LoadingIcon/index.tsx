import React from "react";

const LoadingIcon = ({
  fontSize,
  color,
}: Pick<React.CSSProperties, "fontSize" | "color">) => {
  return (
    <div
      data-testid="loading"
      className="loading"
      style={{ fontSize, color }}
    />
  );
};

export default LoadingIcon;
