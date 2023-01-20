import React from "react";

type Properties = {
  title: string;
  icon: string;
  index: number;
  handleClick: (eventKey: number) => void;
};

const TabTitle: React.FC<Properties> = ({
  title,
  index,
  icon,
  handleClick,
}) => {
  return (
    <div>
      <button
        onClick={() => handleClick(index)}
        type="button"
        className="accordion-trigger"
      >
        <span className="accordion-title">
          {title}
          <img src={icon} className="accordion-icon" alt={title} />
        </span>
      </button>
    </div>
  );
};

export default TabTitle;
