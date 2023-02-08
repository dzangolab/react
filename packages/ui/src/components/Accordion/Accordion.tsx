import React, { useState } from "react";

import "./accordion.css";

import type { ReactElement } from "react";

type Properties = {
  children: ReactElement | ReactElement[];
  defaultActiveKey?: number;
  direction?: "horizontal" | "vertical";
  activeIcon?: string;
  allowMultipleExpanded?: boolean;
  id: string;
  inactiveIcon?: string;
};

const Accordion: React.FC<Properties> = ({
  children,
  defaultActiveKey,
  direction,
  activeIcon,
  allowMultipleExpanded,
  id,
  inactiveIcon,
}) => {
  const [active, setActive] = useState(defaultActiveKey);
  const childNodes = Array.isArray(children) ? children : [children];

  const handleClick = (index: number) => {
    if (!allowMultipleExpanded || active !== index) setActive(index);
    else setActive(undefined);
  };

  if (!children) {
    throw new Error("Accordion needs at least one children");
  }

  return (
    <ul className={`accordion ${direction}`} aria-orientation={direction}>
      {childNodes.map((item, index) => {
        const isActive = active === index;
        const key = `${id}-${index}`;
        const bodyId = `pane-body-${key}`;
        const title = item.props.title;
        const icon = item.props.icon;

        return (
          <li className={isActive ? "active" : ""} key={key}>
            <button
              aria-controls={bodyId}
              aria-label={title}
              onClick={() => handleClick(index)}
              type="button"
              aria-disabled={!allowMultipleExpanded && isActive}
              aria-expanded={isActive}
            >
              {icon ? (
                <img src={icon} alt="title icon" aria-hidden="true" />
              ) : null}
              <span>{title}</span>
              {activeIcon && inactiveIcon ? (
                <img
                  src={isActive ? activeIcon : inactiveIcon}
                  alt="toggle icon"
                  aria-hidden="true"
                />
              ) : null}
            </button>

            <div role="region" id={bodyId} hidden={!isActive}>
              {isActive ? childNodes[active] : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

Accordion.defaultProps = {
  direction: "vertical",
  allowMultipleExpanded: false,
};

export default Accordion;
