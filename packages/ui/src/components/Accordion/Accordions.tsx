import React, { useId, useState } from "react";

import AccordionTitle from "./AccordionTitle";

import type { ReactElement, ReactNode } from "react";

import "./accordion.css";
import Collapse from "../Collapse";

type Properties = {
  icon?: ReactNode;
  children: ReactElement[];
};

const Accordions: React.FC<Properties> = ({ icon, children }) => {
  const id = useId();
  const [selected, setSelected] = useState(0);

  return (
    <ul className="accordion-list">
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
            <Collapse isOpen={selected === index}>
              {children[selected]}
            </Collapse>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Accordions;
