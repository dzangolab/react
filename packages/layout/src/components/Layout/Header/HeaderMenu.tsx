import { LocaleSwitcher } from "@dzangolab/react-i18n";
import { NavMenuItemType, UserMenuModeType } from "@dzangolab/react-ui";

import { UserMenu } from "../common/UserMenu";

interface HeaderProperties {
  children?: React.ReactNode;
  menu?: NavMenuItemType;
  noLocaleSwitcher?: boolean;
  userMenuMode?: UserMenuModeType;
}

export const HeaderMenu = ({
  children,
  menu,
  noLocaleSwitcher,
  userMenuMode,
}: HeaderProperties) => {
  const renderContent = () => {
    return (
      <>
        {menu && <UserMenu menu={menu} userMenuMode={userMenuMode} />}
        {!noLocaleSwitcher && <LocaleSwitcher />}
      </>
    );
  };

  return <div className="dz-header-menu">{children || renderContent()}</div>;
};
