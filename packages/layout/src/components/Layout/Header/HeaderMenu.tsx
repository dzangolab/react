import { LocaleSwitcher } from "@dzangolab/react-i18n";

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
      </>
    );
  };

  return <div className="header-menu">{children || renderContent()}</div>;
};
