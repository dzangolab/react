import { LocaleSwitcher } from "@dzangolab/react-i18n";

import { UserMenu } from "../common/UserMenu";
import { NavMenuItemType } from "../types";

interface HeaderProperties {
  children?: React.ReactNode;
  menu?: NavMenuItemType;
  localeSwitcher?: React.ReactNode;
  noLocaleSwitcher?: boolean;
}

export const HeaderMenu = ({
  children,
  menu,
  localeSwitcher,
  noLocaleSwitcher,
}: HeaderProperties) => {
  const renderContent = () => {
    return (
      <>
        {menu && <UserMenu menu={menu} />}
        {!noLocaleSwitcher && (localeSwitcher || <LocaleSwitcher />)}
      </>
    );
  };

  return <div className="header-menu">{children || renderContent()}</div>;
};
