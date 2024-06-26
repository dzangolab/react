import {
  Layout,
  NavMenuType,
  Header,
  NavMenuItemType,
  UserMenuModeType,
} from "@/components/Layout";

interface HeaderLayoutProperties {
  className?: string;
  children?: React.ReactNode;
  customHeader?: React.ReactNode;
  displayNavIcons?: boolean;
  fixed?: boolean;
  headerAddon?: React.ReactNode;
  navigationMenu?: NavMenuType;
  menu?: NavMenuItemType;
  noLocaleSwitcher?: boolean;
  noLogo?: boolean;
  noToggle?: boolean;
  title?: string | React.ReactNode;
  userMenuMode?: UserMenuModeType;
}

export const HeaderLayout: React.FC<HeaderLayoutProperties> = ({
  className,
  children,
  customHeader,
  displayNavIcons,
  fixed = true,
  headerAddon,
  navigationMenu,
  menu,
  noLogo,
  noLocaleSwitcher,
  noToggle,
  title,
  userMenuMode,
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
          menu={menu}
          noLogo={noLogo}
          noLocaleSwitcher={noLocaleSwitcher}
          noToggle={noToggle}
          userMenuMode={userMenuMode}
        ></Header>
      )}
      <main>{children}</main>
    </Layout>
  );
};
