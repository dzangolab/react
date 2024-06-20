import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  BaseSyntheticEvent,
  useRef,
} from "react";

interface MenuItem {
  label?: string;
  onClick?: () => void;
}

export interface MenuProperties {
  className?: string;
  keyExtractor?: (value: MenuItem) => string;
  menuItems: MenuItem[];
  popupAlignment?: "right" | "left";
  renderOption?: (value: MenuItem) => JSX.Element;
}

export interface MenuReference {
  expanded: boolean;
  toggleMenu: (event: BaseSyntheticEvent) => void;
}

/* eslint-disable unicorn/prevent-abbreviations */
const Menu: React.ForwardRefRenderFunction<MenuReference, MenuProperties> = (
  {
    className = "",
    keyExtractor,
    menuItems,
    popupAlignment = "left",
    renderOption,
  },
  ref,
) => {
  const [position, setPosition] = useState<{
    left?: number;
    top: number;
    right?: number;
  }>();
  const [expanded, setExpanded] = useState(false);

  const menuReference = useRef<HTMLUListElement>(null);

  const getPosition = (
    target: HTMLElement,
  ): { left?: number; top: number; right?: number } => {
    const rect = target.getBoundingClientRect();
    const top = rect.top + rect.height;

    switch (popupAlignment) {
      case "right":
        return {
          right: window.innerWidth - rect.right,
          top,
        };
      case "left":
      default:
        return {
          left: rect.left,
          top,
        };
    }
  };

  const toggleMenu = (event: BaseSyntheticEvent) => {
    event.stopPropagation();

    const target = event.target;
    const popupPosition = getPosition(target);

    setPosition(popupPosition);
    setExpanded((previous) => !previous);
  };

  // Expose toggleMenu function via ref
  useImperativeHandle(ref, () => ({
    expanded,
    toggleMenu,
  }));

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (menuReference.current?.ariaExpanded) {
        setExpanded(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <ul
      ref={menuReference}
      className={`dz-menu popup ${className}`.trimEnd()}
      aria-expanded={expanded}
      style={position}
    >
      {menuItems.map(({ onClick, ...item }, index) => (
        <li
          key={keyExtractor ? keyExtractor(item) : `menu-item-${index}`}
          onClick={onClick}
        >
          {renderOption ? renderOption(item) : item.label}
        </li>
      ))}
    </ul>
  );
};

export default forwardRef(Menu);
