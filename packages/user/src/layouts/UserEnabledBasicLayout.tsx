import { AppHeader, BasicLayout } from "@dzangolab/react-layout";

import UserMenu from "../components/UserMenu";

interface Properties {
  children: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
}

const UserEnabledBasicLayout: React.FC<Properties> = (properties) => {
  const {
    children,
    header = <AppHeader userMenu={<UserMenu />} />,
    footer,
  } = properties;

  return <BasicLayout header={header} footer={footer} children={children} />;
};

export default UserEnabledBasicLayout;
