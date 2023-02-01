import React, { ReactElement, useId, useState } from "react";

import Tab from "./Tab";

import "./tabs.css";

type Properties = {
  children: ReactElement | ReactElement[];
  position?: "top" | "left" | "bottom" | "right";
};

const TabbedPanel: React.FC<Properties> = ({ children, position = "top" }) => {
  const id = useId();
  const [active, setActive] = useState(0);
  const childNodes = Array.isArray(children) ? children : [children];

  if (!children) {
    throw new Error("TabbedPanel needs at least one children");
  }

  return (
    <div className={`tabbed-panel ${position}`}>
      <ul>
        {childNodes.map((item, index) => (
          <Tab
            key={`${id}-${index}`}
            title={item.props.title}
            icon={item.props.icon}
            index={index}
            isActive={active === index}
            handleClick={setActive}
          />
        ))}
      </ul>
      {childNodes[active]}
    </div>
  );
};

export default TabbedPanel;
