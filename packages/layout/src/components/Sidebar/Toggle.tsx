import { Button } from "@dzangolab/react-ui";

type SidebarToggleProps = {
  icon?: string;
  onToggle: () => void;
};

export const SidebarToggle = ({
  icon = "pi pi-angle-double-left",
  onToggle,
}: SidebarToggleProps) => {
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
