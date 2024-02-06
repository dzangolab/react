import { SidebarFooter } from "./Footer";
import { SidebarHeader } from "./Header";
import { NavigationMenu } from "../common";
import { NavigationType } from "../types";

type SidebarProperties = {
  children?: React.ReactNode;
  displayNavIcons?: boolean;
  navigation?: NavigationType;
  noHeader?: boolean;
  noFooter?: boolean;
  noLocaleSwitcher?: boolean;
};

export const Sidebar = ({
  children,
  displayNavIcons = false,
  navigation,
  noHeader = false,
  noFooter = false,
  noLocaleSwitcher = false,
}: SidebarProperties) => {
  const renderNavigationMenu = () => {
    if (!navigation) return null;

    if (Array.isArray(navigation)) {
      return navigation.map(({ primary, menu }, index) => (
        <NavigationMenu
          key={index}
          displayIcons={displayNavIcons}
          navigationMenu={menu}
          primaryNavigation={primary}
        />
      ));
    }

    return (
      <NavigationMenu
        displayIcons={displayNavIcons}
        navigationMenu={navigation.menu}
        primaryNavigation={navigation.primary}
      />
    );
  };

  const renderContent = () => {
    return (
      <>
        {!noHeader && <SidebarHeader />}
        {renderNavigationMenu()}
        {!noFooter && <SidebarFooter noLocaleSwitcher={noLocaleSwitcher} />}
      </>
    );
  };

  return <aside>{children || renderContent()}</aside>;
};
