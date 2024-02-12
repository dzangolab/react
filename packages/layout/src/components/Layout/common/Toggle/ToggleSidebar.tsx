import { useLayoutContext } from "../../Context";

export const ToggleSidebar = () => {
  const { menuDesktopOpen, setMenuDesktopOpen } = useLayoutContext();

  return (
    <span
      className="toggle-sidebar"
      onClick={() => setMenuDesktopOpen(!menuDesktopOpen)}
    >
      <i className={menuDesktopOpen ? "pi pi-times" : "pi pi-bars"}></i>
    </span>
  );
};
