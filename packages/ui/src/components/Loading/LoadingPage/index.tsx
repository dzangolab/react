import React from "react";

import LoadingIcon from "../LoadingIcon";

import "./index.css";

const LoadingPage = ({
  fontSize = "0.6em",
  color = "black",
}: Pick<React.CSSProperties, "fontSize" | "color">) => {
  return (
    <div className="loading-container">
      <LoadingIcon fontSize={fontSize} color={color} />
    </div>
  );
};

export default LoadingPage;
