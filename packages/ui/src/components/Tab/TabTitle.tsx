import React from "react";

type Properties = {
  title: string;
  index: number;
  selected: number;
  setSelectedTab: (index: number) => void;
};

const TabTitle: React.FC<Properties> = ({
  title,
  selected,
  setSelectedTab,
  index,
}) => {
  return (
    <li>
      <button
        className={`tab-title ${selected === index ? "active" : ""}`}
        onClick={() => setSelectedTab(index)}
      >
        {title}
      </button>
    </li>
  );
};

export default TabTitle;
