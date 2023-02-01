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
      <div>
        <div>
          {icon ? <img src={icon} alt={title} /> : null}
          <span>{title}</span>
        </div>
        {activeIcon && inactiveIcon ? (
          <img src={isActive ? activeIcon : inactiveIcon} />
        ) : null}
      </div>
    </button>
  );
};

export default AccordionTitle;
