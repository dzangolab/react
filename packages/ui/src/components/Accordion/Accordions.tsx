import React, { useId, useState } from "react";

import Collapse from "../Collapse";
import AccordionTitle from "./AccordionTitle";
import "./accordion.css";

import type { ReactElement, ReactNode } from "react";

type Properties = {
  icon?: ReactNode;
  defaultActiveKey?: number;
  children: ReactElement[];
};

const Accordions: React.FC<Properties> = ({
  icon,
  defaultActiveKey,
  children,
}) => {
  const id = useId();
  const [selected, setSelected] = useState(defaultActiveKey || 0);

  return (
    <ul className="accordion-list" data-testid="accordions">
      {children.map((item, index) => (
        <li key={`${id}-${index}`}>
          <div className={`accordion ${selected === index ? "active" : ""}`}>
            <AccordionTitle
              title={item.props.title}
              eventKey={index}
              selected={selected}
              setSelected={setSelected}
              icon={icon}
            />
            <Collapse isOpen={selected === index}>{children[index]}</Collapse>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Accordions;
