import React from "react";

type Properties = {
  title: string;
  eventKey: number;
  selected: number;
  setSelectedTab: (index: number) => void;
};

const TabTitle: React.FC<Properties> = ({
  title,
  selected,
  setSelectedTab,
  eventKey,
}) => {
  return (
    <li>
      <button
        className={`tab-title ${selected === eventKey ? "active" : ""}`}
        onClick={() => setSelectedTab(eventKey)}
      >
        {title}
      </button>
    </li>
  );
};

export default TabTitle;
