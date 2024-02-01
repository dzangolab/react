import { useState } from "react";

import { SidebarFooter } from "@/components/Sidebar/Footer";
import { SidebarHeader } from "@/components/Sidebar/Header";
import {
  NavigationMenu,
  SidebarNavigation,
} from "@/components/Sidebar/Navigation";

type SidebarOnlyLayoutProperties = {
  header?: React.ReactNode;
  navigation?: React.ReactNode;
  bottomNavigation?: React.ReactNode;
  footer?: React.ReactNode;
  toggle?: React.ReactNode;
  children: React.ReactNode;
  navigationMenu: NavigationMenu;
  bottomNavigationMenu?: NavigationMenu;
  displayNavIcons?: boolean;
};

export const SidebarOnlyLayout: React.FC<SidebarOnlyLayoutProperties> = ({
  children,
  header,
  footer,
  navigation,
  bottomNavigation,
  toggle,
  navigationMenu,
  bottomNavigationMenu,
  displayNavIcons,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="layout sidebar-only" aria-expanded={expanded}>
      <aside>
        {header || (
          <SidebarHeader
            toggle={toggle}
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
          />
        )}
        {navigation || (
          <nav className="top-navigation">
            <SidebarNavigation
              navigationMenu={navigationMenu}
              displayIcons={displayNavIcons}
            />
          </nav>
        )}
        {bottomNavigation ||
          (bottomNavigationMenu && (
            <div className="bottom-navigation">
              <SidebarNavigation
                navigationMenu={navigationMenu}
                displayIcons={displayNavIcons}
              />
            </div>
          ))}
        {footer || <SidebarFooter />}
      </aside>
      <main>{children}</main>
    </div>
  );
};
