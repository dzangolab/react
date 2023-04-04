import React, { useEffect, useRef, useState } from "react";

import "./index.css";

interface IProperties {
  label: string;
  dropdownMenu: React.ReactNode;
}

const DropdownNavMenu: React.FC<IProperties> = ({ label, dropdownMenu }) => {
  const [expanded, setExpanded] = useState(false);
  const navBarReference = useRef<HTMLElement | null>(null);

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
    <nav
      ref={navBarReference}
      className={`dropdown-nav-menu ${expanded ? "expanded" : ""}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="label">
        {label}
        <span className={"truncated"}>
          {expanded ? <>&#9652;</> : <>&#9662;</>}
        </span>
      </div>

      {expanded && <ul className="dropdown">{dropdownMenu}</ul>}
    </nav>
  );
};
export default DropdownNavMenu;
