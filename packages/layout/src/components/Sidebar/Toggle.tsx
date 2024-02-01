import { Button } from "@dzangolab/react-ui";

type SidebarToggleProperties = {
  icon?: string;
  onToggle: () => void;
};

export const SidebarToggle = ({
  icon = "pi pi-angle-double-left",
  onToggle,
}: SidebarToggleProperties) => {
  return (
    <div className="toggle">
      <Button
        iconLeft={icon}
        onClick={onToggle}
        severity="secondary"
        size="small"
      />
    </div>
  );
};
