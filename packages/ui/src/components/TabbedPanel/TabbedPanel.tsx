import React, { ReactElement, useId, useState } from "react";

import Tab from "./Tab";

import "./tabs.css";

type Properties = {
  children: ReactElement | ReactElement[];
};

const TabbedPanel: React.FC<Properties> = ({ children }) => {
  const id = useId();
  const [active, setActive] = useState(0);
  const childNodes = Array.isArray(children) ? children : [children];

  return (
    <div className="tabbed-panel">
      <ul className="tab-list">
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
