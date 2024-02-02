import { useState } from "react";

import { SidebarFooter } from "@/components/Sidebar/Footer";
import { SidebarHeader } from "@/components/Sidebar/Header";
import {
  NavigationMenu,
  SidebarNavigation,
} from "@/components/Sidebar/Navigation";

type SidebarOnlyLayoutProperties = {
  bottomNavigation?: React.ReactNode;
  bottomNavigationMenu?: NavigationMenu;
  children: React.ReactNode;
  displayNavIcons?: boolean;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  navigation?: React.ReactNode;
  navigationMenu: NavigationMenu;
};

export const SidebarOnlyLayout: React.FC<SidebarOnlyLayoutProperties> = ({
  bottomNavigation,
  bottomNavigationMenu,
  children,
  displayNavIcons,
  footer,
  header,
  navigation,
  navigationMenu,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="layout sidebar-only" aria-expanded={expanded}>
      <aside>
        <SidebarHeader
          header={header}
          expanded={expanded}
          onToggle={() => setExpanded(!expanded)}
        />
        {navigation || (
          <SidebarNavigation
            displayIcons={displayNavIcons}
            navigationMenu={navigationMenu}
            primaryNavigation={true}
          />
        )}
        {bottomNavigation ||
          (bottomNavigationMenu && (
            <SidebarNavigation
              displayIcons={displayNavIcons}
              navigationMenu={navigationMenu}
            />
          ))}
        {footer || <SidebarFooter />}
      </aside>
      <main>{children}</main>
    </div>
  );
};
