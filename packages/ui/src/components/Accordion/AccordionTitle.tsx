import React from "react";

type Properties = {
  title: string;
  icon: string;
  index: number;
  handleClick: (eventKey: number) => void;
};

const AccordionTitle: React.FC<Properties> = ({
  title,
  index,
  icon,
  handleClick,
}) => {
  return (
    <button onClick={() => handleClick(index)} type="button">
      <div>
        <span>{title}</span>
        {icon ? <img src={icon} alt={title} /> : null}
      </div>
    </button>
  );
};

export default AccordionTitle;
