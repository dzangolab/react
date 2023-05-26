import React, { HTMLAttributes, useEffect, useRef, useState } from "react";

interface Item {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  [key: string]: any;
  label?: string;
  onClick?: () => void;
  key?: string;
  className?: string;
  selected?: boolean;
}

interface DropdownMenu {
  menuItems: Item[];
  keyExtractor?: (value: Item) => string;
  renderOption?: (value: Item) => JSX.Element;
}

export interface DropdownMenuProperties
  extends Pick<HTMLAttributes<HTMLDivElement>, "lang"> {
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
  lang,
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
      lang={lang}
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

      <ul className="dropdown-menu" data-aria-hidden={!expanded}>
        {
          /* eslint-disable  @typescript-eslint/no-unused-vars */
          dropdownMenu.menuItems.map(
            ({ onClick, key, className, selected, style, ...item }, index) => {
              return (
                <li
                  onClick={onClick}
                  key={
                    dropdownMenu.keyExtractor
                      ? dropdownMenu.keyExtractor(item)
                      : key || `menu-item-${index}`
                  }
                  className={"option" + (className ? className : "")}
                  {...(selected !== undefined
                    ? { "data-aria-selected": selected }
                    : undefined)}
                  {...item}
                >
                  {dropdownMenu.renderOption
                    ? dropdownMenu.renderOption(item)
                    : item.label}
                </li>
              );
            }
          )
        }
      </ul>
    </div>
  );
};

export default DropdownMenu;
