import React, { ReactElement, useId, useState } from "react";

import TabTitle from "./TabTitle";

import "./tabs.css";

type Properties = {
  children: ReactElement[];
};

const Tabs: React.FC<Properties> = ({ children }) => {
  const id = useId();
  const [selected, setSelected] = useState(0);

  return (
    <div className="tabs">
      <ul className="tab-list">
        {children.map((item, index) => (
          <TabTitle
            key={`${id}-${index}`}
            title={item.props.title}
            eventKey={index}
            selected={selected}
            setSelectedTab={setSelected}
          />
        ))}
      </ul>
      {children[selected]}
    </div>
  );
};

export default Tabs;
