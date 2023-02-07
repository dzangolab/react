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
      <div aria-label="tabs" role="tablist">
        {childNodes.map((item, index) => (
          <Tab
            key={`${id}-${index}`}
            title={item.props.title}
            icon={item.props.icon}
            index={index}
            tabIndex={index === active ? 0 : -1}
            isActive={active === index}
            handleClick={setActive}
          />
        ))}
      </div>
      <section role="tabpanel">{childNodes[active]}</section>
    </div>
  );
};

export default TabbedPanel;
