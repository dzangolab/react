import React, { useEffect, useRef, useState } from "react";

import "./index.css";

export interface DropdownMenuProperties {
  className?: string;
  collapseIcon?: React.ReactNode;
  dropdownMenu: React.ReactNode;
  expandIcon?: React.ReactNode;
  label: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProperties> = ({
  className = "",
  collapseIcon = <>&#9652;</>,
  dropdownMenu,
  expandIcon = <>&#9662;</>,
  label,
}) => {
  const [expanded, setExpanded] = useState(false);
  const navBarReference = useRef<HTMLDivElement | null>(null);

  let _className = "dropdown-container";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        navBarReference.current &&
        !navBarReference.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (className) {
    _className = className + " " + _className;
  }

  return (
    <div
      ref={navBarReference}
      className={_className}
      data-aria-expanded={expanded}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="label-container">
        {typeof label === "string" ? (
          <span className="label">{label}</span>
        ) : (
          label
        )}
        <span className="icon">{expanded ? collapseIcon : expandIcon}</span>
      </div>
      {expanded && <ul className="dropdown-menu">{dropdownMenu}</ul>}
    </div>
  );
};

export default DropdownMenu;
