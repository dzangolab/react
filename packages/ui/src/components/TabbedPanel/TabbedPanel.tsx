import React, { ReactElement, useId, useState } from "react";

import Tab from "./Tab";

import "./tabs.css";

type Properties = {
  children: ReactElement[];
  position?: "top" | "left" | "bottom" | "right";
};

const TabbedPanel: React.FC<Properties> = ({ children, position = "top" }) => {
  const id = useId();
  const [active, setActive] = useState(0);

  return (
    <div className={`tabbed-panel ${position}`}>
      <ul className="tab-list">
        {children.map((item, index) => (
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
      {children[active]}
    </div>
  );
};

export default TabbedPanel;
