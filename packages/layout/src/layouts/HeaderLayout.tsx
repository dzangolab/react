import {
  Layout,
  NavMenuType,
  Header,
  NavMenuItemType,
} from "@/components/Layout";

interface HeaderLayoutProperties {
  className?: string;
  children?: React.ReactNode;
  displayNavIcons?: boolean;
  headerAddon?: React.ReactNode;
  navigationMenu?: NavMenuType;
  title?: string | React.ReactNode;
  userMenu?: NavMenuItemType;
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
  headerAddon,
  navigationMenu,
  title,
  userMenu,
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
          headerAddon={headerAddon}
          navigationMenu={navigationMenu}
          title={title}
          menu={userMenu}
          noLogo={noLogo}
          noLocaleSwitcher={noLocaleSwitcher}
          noToggle={noToggle}
        ></Header>
      )}
      <main>{children}</main>
    </Layout>
  );
};
