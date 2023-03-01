import React from "react";

import LoadingIcon from "../LoadingIcon";

import "./index.css";

export interface LoadingPageProperties
  extends Pick<React.CSSProperties, "fontSize" | "color"> {
  pageType?: "container" | "overlay";
}

const LoadingPage = ({
  color,
  fontSize = "0.6em",
  pageType = "container",
}: LoadingPageProperties) => {
  return (
    <div className={`loading-${pageType}`}>
      <LoadingIcon fontSize={fontSize} color={color} />
    </div>
  );
};

export default LoadingPage;
