import React from "react";

type Properties = {
  title: string;
  index: number;
  isActive: boolean;
  handleClick: (index: number) => void;
};

const Tab: React.FC<Properties> = ({ title, index, isActive, handleClick }) => {
  return (
    <li
      className={`tab ${isActive ? "selected" : ""}`}
      onClick={() => handleClick(index)}
    >
      {title}
    </li>
  );
};

export default Tab;
