import { LocaleSwitcher } from "@dzangolab/react-i18n";

import { Copyright, Version } from "../common";

type SidebarFooterProperties = {
  children?: React.ReactNode;
};

export const SidebarFooter = ({ children }: SidebarFooterProperties) => {
  const renderContent = () => {
    return (
      <>
        <LocaleSwitcher />
        <Copyright />
        <Version />
      </>
    );
  };

  return <div className="sidebar-footer">{children || renderContent()}</div>;
};
