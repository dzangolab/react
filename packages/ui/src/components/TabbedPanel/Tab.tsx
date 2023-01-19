import React from "react";

type Properties = {
  title: string;
  icon: string;
  index: number;
  isActive: boolean;
  handleClick: (index: number) => void;
};

const Tab: React.FC<Properties> = ({
  title,
  icon,
  index,
  isActive,
  handleClick,
}) => {
  return (
    <li
      className={`tab ${isActive ? "active" : ""}`}
      onClick={() => handleClick(index)}
    >
      <img src={icon} className="tab-icon" alt={title} />
      {title}
    </li>
  );
};

export default Tab;
