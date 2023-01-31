import React, { useId, useState } from "react";

import AccordionTitle from "./AccordionTitle";
import "./accordion.css";

import type { ReactElement } from "react";

type Properties = {
  children: ReactElement[];
  defaultActiveKey?: number;
  direction?: "horizontal" | "vertical";
  activeIcon?: string;
  inactiveIcon?: string;
};

const Accordion: React.FC<Properties> = ({
  children,
  defaultActiveKey,
  direction,
  activeIcon,
  inactiveIcon,
}) => {
  const id = useId();
  const [active, setActive] = useState(defaultActiveKey);
  const childNodes = Array.isArray(children) ? children : [children];

  const handleClick = (index: number) => {
    if (active !== index) setActive(index);
    else setActive(undefined);
  };

  if (!children) {
    throw new Error("Accordion needs at least one children");
  }

  return (
    <ul className={`accordion-list ${direction}`} data-testid="accordion-list">
      {childNodes.map((item, index) => (
        <li className={active === index ? "active" : ""} key={`${id}-${index}`}>
          <AccordionTitle
            handleClick={() => handleClick(index)}
            icon={item.props.icon}
            index={index}
            isActive={active === index}
            title={item.props.title}
            activeIcon={activeIcon}
            inactiveIcon={inactiveIcon}
          />
          {active === index ? childNodes[active] : null}
        </li>
      ))}
    </ul>
  );
};

Accordion.defaultProps = {
  direction: "vertical",
};

export default Accordion;
