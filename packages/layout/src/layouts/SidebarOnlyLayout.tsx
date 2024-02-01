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
  navigationMenu,
  bottomNavigationMenu,
  displayNavIcons,
}) => {
  return (
    <div className="layout sidebar-only">
      <aside>
        {header || <SidebarHeader />}
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
