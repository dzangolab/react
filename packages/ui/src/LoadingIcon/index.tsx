import React from "react";

const LoadingIcon = (
  style: Pick<React.CSSProperties, "fontSize" | "color">,
) => {
  return <div data-testid="loading" className="loading" style={style} />;
};

export default LoadingIcon;
