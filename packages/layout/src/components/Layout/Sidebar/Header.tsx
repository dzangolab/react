import { Logo } from "../common";
import { ToggleMenuMobile } from "../common/Toggle";

type SidebarHeaderProperties = {
  children?: React.ReactNode;
};

export const SidebarHeader = ({ children }: SidebarHeaderProperties) => {
  const renderContent = () => {
    return (
      <>
        <Logo />
        <ToggleMenuMobile />
      </>
    );
  };

  return <div className="dz-sidebar-header">{children || renderContent()}</div>;
};
