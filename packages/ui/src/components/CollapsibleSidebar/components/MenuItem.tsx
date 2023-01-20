import React from "react";

interface Properties {
  handelIconClick?: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  isHeader?: boolean;
}

const MenuItem: React.FC<Properties> = ({
  handelIconClick,
  icon,
  children,
  isHeader = false,
}) => {
  return (
    <div className={`menuItem ${isHeader ? "header" : ""}`}>
      <div className="toggleIcon" onClick={handelIconClick}>
        {icon}
      </div>
      <div className="toggleContent">{children}</div>
    </div>
  );
};

export default MenuItem;
