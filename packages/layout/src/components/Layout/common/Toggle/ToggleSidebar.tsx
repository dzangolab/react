import { useLayoutContext } from "../../../../context/LayoutProvider";

export const ToggleSidebar = () => {
  const { menuDesktopOpen, setMenuDesktopOpen } = useLayoutContext();

  return (
    <span
      className="dz-toggle-sidebar"
      onClick={() => setMenuDesktopOpen(!menuDesktopOpen)}
    >
      <i className={menuDesktopOpen ? "pi pi-times" : "pi pi-bars"}></i>
    </span>
  );
};
