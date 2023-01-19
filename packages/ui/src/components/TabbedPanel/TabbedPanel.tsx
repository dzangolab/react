import React, { ReactElement, useId, useState } from "react";

import Tab from "./Tab";

import "./tabs.css";

type Properties = {
  children: ReactElement[];
};

const TabbedPanel: React.FC<Properties> = ({ children }) => {
  const id = useId();
  const [selected, setSelected] = useState(0);

  return (
    <div className="tabbed-panel">
      <ul className="tab-list">
        {children.map((item, index) => (
          <Tab
            key={`${id}-${index}`}
            title={item.props.title}
            index={index}
            isActive={selected === index}
            handleClick={setSelected}
          />
        ))}
      </ul>
      {children[selected]}
    </div>
  );
};

export default TabbedPanel;
