import { AppHeader, BasicLayout, Logo } from "@dzangolab/react-layout";

import DropdownUserMenu from "../components/DropdownUserMenu";
import UserMenu from "../components/UserMenu";
import { getHomeRoute } from "../helpers";
import { useConfig, useUser } from "../hooks";
import { UserMenuItemType } from "../types";

interface Properties {
  children: React.ReactNode;
  footer?: React.ReactNode;
  userMenu?: UserMenuItemType[];
}

const UserEnabledBasicLayout: React.FC<Properties> = (properties) => {
  const { layout: layoutConfig, user: userConfig } = useConfig();
  const { user } = useUser();

  const home = getHomeRoute(user, layoutConfig, userConfig);

  const { children, footer, userMenu } = properties;

  return (
    <BasicLayout
      children={children}
      footer={footer}
      header={
        <AppHeader
          userMenu={
            <UserMenu
              authenticatedUserMenu={<DropdownUserMenu userMenu={userMenu} />}
            />
          }
          logo={<Logo source={layoutConfig?.logo} route={home} />}
        />
      }
    />
  );
};

export default UserEnabledBasicLayout;
