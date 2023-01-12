import "./accordion.css";

import React, { useContext } from "react";

import Collapse from "../Collapse";
import { ToggleContentContext } from "../ToggleContent/ToggleContentProvider";

import type { ReactNode } from "react";

interface Properties {
  children: ReactNode;
  eventKey: string;
  label: string;
}

const AccordionItem = ({ children, eventKey, label }: Properties) => {
  const appContext = useContext(ToggleContentContext);
  if (!appContext) return null;

  const { active, handleClick } = appContext;
  const open = eventKey === active;

  return (
    <div className="accordion">
      <button
        onClick={() => handleClick(eventKey)}
        type="button"
        aria-expanded={open}
        className="accordion-trigger"
        aria-controls={`${eventKey}-body`}
        id={eventKey}
      >
        <span className="accordion-title">
          {label}
          <span className="accordion-icon"></span>
        </span>
      </button>

      <div
        id={`${eventKey}-body`}
        role="region"
        aria-labelledby={eventKey}
        className={`accordion-panel ${!open ? "hidden" : ""}`}
      >
        <Collapse isOpen={open}>{children}</Collapse>
      </div>
    </div>
  );
};

export default AccordionItem;
