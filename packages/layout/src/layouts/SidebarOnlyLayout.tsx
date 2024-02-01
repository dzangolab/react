import { Button } from "@dzangolab/react-ui";
import React, { useCallback, useState } from "react";

import useConfig from "@/hooks/useConfig";
import { Logo } from "..";
import { SidebarHeader } from "@/components/Sidebar/Header";
import { SidebarToggle } from "@/components/Sidebar/Toggle";
import {
  NavigationMenu,
  SidebarNavigation,
} from "@/components/Sidebar/Navigation";
import { SidebarFooter } from "@/components/Sidebar/Footer";

type SidebarOnlyLayoutProps = {
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

export const SidebarOnlyLayout: React.FC<SidebarOnlyLayoutProps> = ({
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
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="layout sidebar-only" aria-expanded={expanded}>
      <aside>
        {header || <SidebarHeader />}
        {toggle || (
          <SidebarToggle
            icon={
              expanded ? "pi pi-angle-double-left" : "pi pi-angle-double-right"
            }
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
