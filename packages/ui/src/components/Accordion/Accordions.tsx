import React, { ReactElement, ReactNode, useState } from "react";

import AccordionTitle from "./AccordionTitle";
import "./accordion.css";

type Properties = {
  icon?: ReactNode;
  children: ReactElement[];
};

const Accordions: React.FC<Properties> = ({ icon, children }) => {
  const [selected, setSelected] = useState(0);

  return (
    <ul className="accordion-list">
      {children.map((item, index) => (
        <li key={index}>
          <div className="accordion">
            <AccordionTitle
              title={item.props.title}
              eventKey={index}
              selected={selected}
              setSelected={setSelected}
              icon={icon}
            />
            {selected === index ? children[selected] : null}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Accordions;
