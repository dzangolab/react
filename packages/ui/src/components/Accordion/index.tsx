import React, { useState } from "react";

import Collapse from "../Collapse";

import type { ReactNode } from "react";
import "./accordion.css";

interface Properties {
  accordionIcon?: ReactNode;
  children: ReactNode;
  id: string;
  label: string;
  isOpen?: boolean;
}

const Accordion = ({
  accordionIcon,
  children,
  id,
  isOpen,
  label,
}: Properties) => {
  const [open, setOpen] = useState(isOpen || false);
  const toggle = () => setOpen(!open);

  return (
    <div className="accordion">
      <button
        onClick={toggle}
        type="button"
        aria-expanded={open}
        className="accordion-trigger"
        aria-controls={`${id}-body`}
        id={id}
      >
        <span className="accordion-title">
          {label}
          {accordionIcon || <span className="accordion-icon"></span>}
        </span>
      </button>

      <div
        id={`${id}-body`}
        role="region"
        aria-labelledby={id}
        className={`accordion-panel ${!open ? "hidden" : ""}`}
      >
        <Collapse isOpen={open}>{children}</Collapse>
      </div>
    </div>
  );
};

export default Accordion;
