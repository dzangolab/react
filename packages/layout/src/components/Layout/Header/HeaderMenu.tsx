import { LocaleSwitcher } from "@dzangolab/react-i18n";
import { ThemeSwitcher } from "@dzangolab/react-ui";

interface HeaderProperties {
  children?: React.ReactNode;
  menu?: React.ReactNode;
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
        {menu}
        {!noLocaleSwitcher && <LocaleSwitcher />}
        {<ThemeSwitcher />}
      </>
    );
  };

  return <div className="header-menu">{children || renderContent()}</div>;
};
