import React from "react";

import "./index.css";

interface IProperties {
  orientation?: "horizontal" | "vertical";
}

const Divider: React.FC<IProperties> = ({ orientation = "horizontal" }) => {
  return (
    <div
      role="separator"
      className="divider"
      data-aria-orientation={orientation}
    />
  );
};

export default Divider;
