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
    <li className={isActive ? "active" : ""}>
      <button onClick={() => handleClick(index)}>
        {icon ? <img src={icon} alt={title} /> : null}
        <span>{title}</span>
      </button>
    </li>
  );
};

export default Tab;
