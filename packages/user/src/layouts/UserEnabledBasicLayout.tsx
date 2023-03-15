import { AppHeader, BasicLayout, Logo } from "@dzangolab/react-layout";

import UserMenu from "../components/UserMenu";
import { getHomeRoute } from "../helpers";
import { useConfig, useUser } from "../hooks";

interface Properties {
  children: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
}

const UserEnabledBasicLayout: React.FC<Properties> = (properties) => {
  const { layout: layoutConfig, user: userConfig } = useConfig();
  const { user } = useUser();

  const home = getHomeRoute(user, layoutConfig, userConfig);

  const {
    children,
    header = (
      <AppHeader
        userMenu={<UserMenu />}
        logo={<Logo source={layoutConfig?.logo} route={home} />}
      />
    ),
    footer,
  } = properties;

  return <BasicLayout header={header} footer={footer} children={children} />;
};

export default UserEnabledBasicLayout;
