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
    <li className={`tab ${isActive ? "active" : ""}`}>
      <button onClick={() => handleClick(index)}>
        {icon ? <img src={icon} className="tab-icon" alt={title} /> : null}
        <span>{title}</span>
      </button>
    </li>
  );
};

export default Tab;
