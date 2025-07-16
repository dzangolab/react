import { NavigationMenu } from "@dzangolab/react-ui";

import { SidebarFooter } from "./Footer";
import { SidebarHeader } from "./Header";
import { UserMenu } from "../common/UserMenu";

import type {
  NavGroupDisplayMode,
  NavMenuItemType,
  NavMenuType,
} from "@dzangolab/react-ui";

type SidebarProperties = {
  children?: React.ReactNode;
  collapsible?: boolean;
  displayNavIcons?: boolean;
  navigationMenu?: NavMenuType;
  noFooter?: boolean;
  noHeader?: boolean;
  noLocaleSwitcher?: boolean;
  userMenu?: NavMenuItemType;
  userMenuMode?: NavGroupDisplayMode;
  trigger?: React.ReactNode;
};

export const Sidebar = ({
  children,
  collapsible = true,
  displayNavIcons = false,
  navigationMenu,
  noFooter = false,
  noHeader = false,
  noLocaleSwitcher = false,
  userMenu,
  userMenuMode,
  trigger,
}: SidebarProperties) => {
  const renderContent = () => {
    return (
      <>
        {!noHeader && <SidebarHeader />}
        <NavigationMenu
          displayIcons={displayNavIcons}
          navigationMenu={navigationMenu || []}
        />
        {userMenu && (
          <UserMenu
            menu={userMenu}
            trigger={trigger}
            userMenuMode={userMenuMode}
          />
        )}
        {!noFooter && <SidebarFooter noLocaleSwitcher={noLocaleSwitcher} />}
      </>
    );
  };

  return (
    <div
      className={`dz-sidebar ${!collapsible ? "fixed" : ""}`.trim()}
      data-header={!noHeader}
    >
      {children || renderContent()}
    </div>
  );
};
