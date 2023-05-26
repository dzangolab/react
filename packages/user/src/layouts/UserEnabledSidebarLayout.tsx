import {
  AppHeader,
  CollapsibleSidebarLayout,
  Logo,
  MainMenu,
  Sidebar,
} from "@dzangolab/react-layout";
import { ResponsiveMenu, useMediaQuery } from "@dzangolab/react-ui";

import DropdownUserMenu from "../components/DropdownUserMenu";
import UserMenu from "../components/UserMenu";
import { getHomeRoute } from "../helpers";
import { useConfig, useUser } from "../hooks";
import { UserMenuItemType } from "../types";

interface Properties {
  children: React.ReactNode;
  footer?: React.ReactNode;
  mainMenuRoutes: {
    name: string;
    route: string;
  }[];
  onLogout?: () => void;
  customSidebar?: React.ReactNode;
  userMenu?: UserMenuItemType[];
  userMenuCollapsedIcon?: React.ReactNode;
  userMenuExpandIcon?: React.ReactNode;
  userMenuLabel?: React.ReactNode;
}

const UserEnabledSidebarLayout: React.FC<Properties> = (properties) => {
  const { layout: layoutConfig, user: userConfig } = useConfig();
  const { user } = useUser();
  const isSmallScreen = useMediaQuery("(max-width: 576px)");

  const home = getHomeRoute(user, layoutConfig, userConfig);

  const {
    children,
    footer,
    mainMenuRoutes,
    onLogout,
    customSidebar = (
      <Sidebar>
        <ResponsiveMenu routes={mainMenuRoutes} orientation="vertical" />
      </Sidebar>
    ),
    userMenu,
    userMenuCollapsedIcon,
    userMenuExpandIcon,
    userMenuLabel,
  } = properties;

  return (
    <CollapsibleSidebarLayout
      children={children}
      footer={footer}
      header={
        <AppHeader
          mainMenu={
            isSmallScreen && user ? <MainMenu routes={mainMenuRoutes} /> : null
          }
          userMenu={
            <UserMenu
              authenticatedUserMenu={
                <DropdownUserMenu
                  collapseIcon={userMenuCollapsedIcon}
                  expandIcon={userMenuExpandIcon}
                  label={userMenuLabel}
                  onLogout={onLogout}
                  userMenu={userMenu}
                />
              }
            />
          }
          logo={<Logo source={layoutConfig?.logo} route={home} />}
        />
      }
      sidebar={user && !isSmallScreen ? customSidebar : null}
    />
  );
};

export default UserEnabledSidebarLayout;
