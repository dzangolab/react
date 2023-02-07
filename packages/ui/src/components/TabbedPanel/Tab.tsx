import React from "react";

type Properties = {
  title: string;
  icon: string;
  index: number;
  tabIndex: number;
  isActive: boolean;
  handleClick: (index: number) => void;
};

const Tab: React.FC<Properties> = ({
  title,
  icon,
  index,
  tabIndex,
  isActive,
  handleClick,
}) => {
  return (
    <button
      role="tab"
      tabIndex={tabIndex}
      className={isActive ? "active" : ""}
      onClick={() => handleClick(index)}
    >
      {icon ? <img src={icon} alt="title icon" /> : null}
      <span>{title}</span>
    </button>
  );
};

export default Tab;
