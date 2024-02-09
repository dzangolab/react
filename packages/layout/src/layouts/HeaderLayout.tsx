import { Layout, NavMenuType, Header } from "@/components/Layout";

interface HeaderLayoutProperties {
  className?: string;
  children?: React.ReactNode;
  displayNavIcons?: boolean;
  navigationMenu?: NavMenuType;
  title?: string | React.ReactNode;
  menu?: React.ReactNode;
  noLocaleSwitcher?: boolean;
  noLogo?: boolean;
  noToggle?: boolean;
  customHeader?: React.ReactNode;
  fixed?: boolean;
}

export const HeaderLayout: React.FC<HeaderLayoutProperties> = ({
  className,
  children,
  displayNavIcons,
  navigationMenu,
  title,
  menu,
  noLogo,
  noLocaleSwitcher,
  noToggle,
  customHeader,
  fixed = true,
}) => {
  return (
    <Layout
      className={`header-only ${className || ""}`.trimEnd()}
      fixed={fixed}
    >
      {customHeader || (
        <Header
          displayNavIcons={displayNavIcons}
          navigationMenu={navigationMenu}
          title={title}
          menu={menu}
          noLogo={noLogo}
          noLocaleSwitcher={noLocaleSwitcher}
          noToggle={noToggle}
        ></Header>
      )}
      <main>{children}</main>
    </Layout>
  );
};
