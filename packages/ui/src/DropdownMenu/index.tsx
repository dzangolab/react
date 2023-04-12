import React, { useEffect, useRef, useState } from "react";

import "./index.css";

interface Value {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  [key: string]: any;
  children?: string;
  onClick?: () => void;
  key?: string;
  className?: string;
}

interface DropdownMenu {
  values: Value[];
  keyExtractor?: (value: Value) => string;
  renderOption?: (value: Value) => JSX.Element;
}

export interface DropdownMenuProperties {
  className?: string;
  collapseIcon?: React.ReactNode;
  dropdownMenu: DropdownMenu;
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
        {label ? (
          typeof label === "string" ? (
            <span className="label">{label}</span>
          ) : (
            label
          )
        ) : (
          "Unknown"
        )}
        <span className="icon">{expanded ? collapseIcon : expandIcon}</span>
      </div>
      {expanded && (
        <ul className="dropdown-menu">
          {
            /* eslint-disable  @typescript-eslint/no-unused-vars */
            dropdownMenu.values.map(
              ({ onClick, key, className, style, ...item }, index) => {
                return (
                  <li
                    onClick={onClick}
                    key={
                      dropdownMenu.keyExtractor
                        ? dropdownMenu.keyExtractor(item)
                        : key || `menu-item-${index}`
                    }
                    className={"option" + (className ? className : "")}
                    {...item}
                  >
                    {dropdownMenu.renderOption
                      ? dropdownMenu.renderOption(item)
                      : item.children}
                  </li>
                );
              }
            )
          }
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
