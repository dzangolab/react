import React, { CSSProperties } from "react";

interface IProperties
  extends Pick<
    CSSProperties,
    "color" | "width" | "height" | "borderStyle" | "margin"
  > {
  orientation?: "horizontal" | "vertical";
}

const Divider: React.FC<IProperties> = ({
  color = "black",
  width,
  height,
  borderStyle = "solid",
  margin,
  orientation = "horizontal",
}) => {
  const horizontalStyle = {
    width: width,
    border: `${height} ${borderStyle} ${color}`,
    margin: margin ? margin : "1rem 0",
  };
  const verticalStyle = {
    border: `${width} ${borderStyle} ${color}`,
    height: height ? height : "100%",
    margin: margin ? margin : "0 1rem",
    width: 0,
  };
  const style = orientation === "horizontal" ? horizontalStyle : verticalStyle;

  return <hr style={style} />;
};

export default Divider;
