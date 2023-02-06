import React from "react";

type Properties = {
  title: string;
  icon: string;
  index: number;
  isActive: boolean;
  activeIcon?: string;
  inactiveIcon?: string;
  handleClick: (eventKey: number) => void;
};

const AccordionTitle: React.FC<Properties> = ({
  title,
  index,
  icon,
  isActive,
  handleClick,
  activeIcon,
  inactiveIcon,
}) => {
  return (
    <button onClick={() => handleClick(index)} type="button">
      {icon ? <img src={icon} alt={title} /> : null}
      <span>{title}</span>
      {activeIcon && inactiveIcon ? (
        <img src={isActive ? activeIcon : inactiveIcon} />
      ) : null}
    </button>
  );
};

export default AccordionTitle;
