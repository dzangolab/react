import { SidebarFooter } from "./Footer";
import { SidebarHeader } from "./Header";
import { NavigationMenu } from "../common";
import { useLayoutContext } from "../Context";
import { NavMenuType } from "../types";

type SidebarProperties = {
  children?: React.ReactNode;
  displayNavIcons?: boolean;
  navigationMenu?: NavMenuType;
  noHeader?: boolean;
  noFooter?: boolean;
  noLocaleSwitcher?: boolean;
};

export const Sidebar = ({
  children,
  displayNavIcons = false,
  navigationMenu,
  noHeader = false,
  noFooter = false,
  noLocaleSwitcher = false,
}: SidebarProperties) => {
  const renderContent = () => {
    return (
      <>
        {!noHeader && <SidebarHeader />}
        <NavigationMenu
          displayIcons={displayNavIcons}
          navigationMenu={navigationMenu || []}
        />
        {!noFooter && <SidebarFooter noLocaleSwitcher={noLocaleSwitcher} />}
      </>
    );
  };

  return <aside>{children || renderContent()}</aside>;
};
