import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

interface Properties {
  handelIconClick?: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  isHeader?: boolean;
}

const MenuItem: React.FC<Properties> = ({
  handelIconClick,
  icon = <GiHamburgerMenu style={{ height: "1.5rem", width: "1.5rem" }} />,
  children,
  isHeader = false,
}) => {
  return (
    <div className={`menuItem ${isHeader ? "header" : ""}`} title="description">
      <div className="toggleIcon" onClick={handelIconClick}>
        {icon}
      </div>
      <div className="toggleContent">{children}</div>
    </div>
  );
};

export default MenuItem;
