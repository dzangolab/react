import { useLayoutContext } from "../../Context";

export const ToggleMenuMobile = () => {
  const { menuMobileOpen, setMenuMobileOpen } = useLayoutContext();

  return (
    <span
      className="toggle-menu"
      onClick={() => setMenuMobileOpen(!menuMobileOpen)}
    >
      <i className={menuMobileOpen ? "pi pi-times" : "pi pi-bars"}></i>
    </span>
  );
};
