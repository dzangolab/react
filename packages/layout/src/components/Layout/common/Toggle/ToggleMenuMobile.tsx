import { useMediaQuery } from "@dzangolab/react-ui";

import { useLayoutContext } from "../../Context";

export const ToggleMenuMobile = () => {
  const {
    menuDesktopOpen,
    menuMobileOpen,
    setMenuDesktopOpen,
    setMenuMobileOpen,
  } = useLayoutContext();
  const isLargeScreen = useMediaQuery("(min-width: 576px)");

  const handleClick = () => {
    if (!isLargeScreen) {
      setMenuMobileOpen(!menuMobileOpen);
    } else {
      setMenuDesktopOpen(!menuDesktopOpen);
    }
  };

  const renderIcon = () => {
    if (!isLargeScreen) {
      return <i className={menuMobileOpen ? "pi pi-times" : "pi pi-bars"}></i>;
    }

    return (
      <i
        className={
          menuDesktopOpen ? "pi pi-chevron-left" : "pi pi-chevron-right"
        }
      ></i>
    );
  };

  return (
    <span className="toggle-menu" onClick={() => handleClick()}>
      {renderIcon()}
    </span>
  );
};
