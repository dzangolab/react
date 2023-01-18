import React from "react";

import AccordionIcon from "./AccordionIcon";

import type { ReactNode } from "react";

type Properties = {
  title: string;
  eventKey: number;
  selected: number;
  icon?: ReactNode;
  setSelected: (eventKey: number) => void;
};

const TabTitle: React.FC<Properties> = ({
  title,
  selected,
  setSelected,
  eventKey,
  icon,
}) => {
  return (
    <button
      onClick={() => setSelected(eventKey)}
      type="button"
      className={`accordion-trigger ${selected === eventKey ? "expanded" : ""}`}
    >
      <span className="accordion-title">
        {title}
        {icon || <AccordionIcon />}
      </span>
    </button>
  );
};

export default TabTitle;
