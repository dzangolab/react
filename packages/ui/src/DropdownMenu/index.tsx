import React, { useEffect, useRef, useState } from "react";

import "./index.css";

interface IProperties {
  collapseIcon?: React.ReactNode;
  dropdownMenu: React.ReactNode;
  expandIcon?: React.ReactNode;
  label: React.ReactNode;
}

const DropdownMenu: React.FC<IProperties> = ({
  collapseIcon = <>&#9652;</>,
  dropdownMenu,
  expandIcon = <>&#9662;</>,
  label,
}) => {
  const [expanded, setExpanded] = useState(false);
  const navBarReference = useRef<HTMLDivElement | null>(null);

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

  return (
    <div
      ref={navBarReference}
      className={`dropdown-container ${expanded ? "expanded" : ""}`}
      onClick={() => setExpanded(!expanded)}
    >
      {typeof label === "string" ? (
        <span className="label">{label}</span>
      ) : (
        label
      )}
      <span className="icon">{expanded ? collapseIcon : expandIcon}</span>
      {expanded && <ul className="dropdown">{dropdownMenu}</ul>}
    </div>
  );
};
export default DropdownMenu;
