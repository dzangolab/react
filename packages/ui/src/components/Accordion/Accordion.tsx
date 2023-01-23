import React, { useId, useState } from "react";

import Collapse from "../Collapse";
import AccordionTitle from "./AccordionTitle";
import "./accordion.css";

import type { ReactElement } from "react";

type Properties = {
  defaultActiveKey?: number;
  children: ReactElement[];
};

const Accordion: React.FC<Properties> = ({ defaultActiveKey, children }) => {
  const id = useId();
  const [active, setActive] = useState(defaultActiveKey);
  const childNodes = Array.isArray(children) ? children : [children];

  if (!children) {
    throw new Error("Accordion needs at least one children");
  }

  return (
    <ul className="accordion-list" data-testid="accordion-list">
      {childNodes.map((item, index) => (
        <li
          className={`accordion ${active === index ? "active" : ""}`}
          key={`${id}-${index}`}
        >
          <AccordionTitle
            handleClick={setActive}
            icon={item.props.icon}
            index={index}
            title={item.props.title}
          />
          <Collapse isOpen={active === index}>{item}</Collapse>
        </li>
      ))}
    </ul>
  );
};

export default Accordion;
