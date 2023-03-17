import {
  AppHeader,
  CollapsibleSidebarLayout,
  Logo,
} from "@dzangolab/react-layout";

import UserMenu from "../components/UserMenu";
import DropdownUserMenu from "../components/DropdownUserMenu";
import { getHomeRoute } from "../helpers";
import { useConfig, useUser } from "../hooks";
import { UserMenuType } from "../types";

interface Properties {
  children: React.ReactNode;
  footer?: React.ReactNode;
  sidebar?: React.ReactNode;
  userMenuList?: UserMenuType[];
}

const UserEnabledSidebarLayout: React.FC<Properties> = (properties) => {
  const { layout: layoutConfig, user: userConfig } = useConfig();
  const { user } = useUser();

  const home = getHomeRoute(user, layoutConfig, userConfig);

  const { children, footer, sidebar, userMenuList } = properties;

  return (
    <CollapsibleSidebarLayout
      children={children}
      footer={footer}
      header={
        <AppHeader
          mainMenu={null}
          userMenu={
            <UserMenu
              authenticatedUserMenu={
                <DropdownUserMenu userMenuList={userMenuList} />
              }
            />
          }
          logo={<Logo source={layoutConfig?.logo} route={home} />}
        />
      }
      sidebar={user ? sidebar : null}
    />
  );
};

export default UserEnabledSidebarLayout;
