import { configContext } from "@dzangolab/react-config";
import { AppHeader, BasicLayout } from "@dzangolab/react-layout";
import { useContext } from "react";

import useUser from "@/hooks/useUser";

import UserMenu from "../components/UserMenu";

interface Properties {
  children: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
}

const UserEnabledBasicLayout: React.FC<Properties> = (properties) => {
  const appConfig = useContext(configContext);
  const { user } = useUser();

  const route = user
    ? appConfig?.user?.routes?.home?.private
    : appConfig?.user?.routes?.home?.public;

  const {
    children,
    header = <AppHeader userMenu={<UserMenu />} route={route} />,
    footer,
  } = properties;

  return <BasicLayout header={header} footer={footer} children={children} />;
};

export default UserEnabledBasicLayout;
