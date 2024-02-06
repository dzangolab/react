import { LocaleSwitcher } from "@dzangolab/react-i18n";

import { Copyright, Version } from "../common";

type SidebarFooterProperties = {
  children?: React.ReactNode;
  noLocaleSwitcher?: boolean;
};

export const SidebarFooter = ({
  children,
  noLocaleSwitcher,
}: SidebarFooterProperties) => {
  const renderContent = () => {
    return (
      <>
        {!noLocaleSwitcher && <LocaleSwitcher />}
        <Copyright />
        <Version />
      </>
    );
  };

  return <div className="sidebar-footer">{children || renderContent()}</div>;
};
