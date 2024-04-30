import { LocaleSwitcher } from "@dzangolab/react-i18n";

import { UserMenu } from "../common/UserMenu";
import { NavMenuItemType } from "../types";

interface HeaderProperties {
  children?: React.ReactNode;
  menu?: NavMenuItemType;
  noLocaleSwitcher?: boolean;
}

export const HeaderMenu = ({
  children,
  menu,
  noLocaleSwitcher,
}: HeaderProperties) => {
  const renderContent = () => {
    return (
      <>
        {menu && <UserMenu menu={menu} />}
        {!noLocaleSwitcher && <LocaleSwitcher />}
      </>
    );
  };

  return <div className="header-menu">{children || renderContent()}</div>;
};
