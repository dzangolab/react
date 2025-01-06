import type {
  NavMenuType,
  NavMenuItemType,
  UserMenuModeType,
} from "@dzangolab/react-ui";

import { Layout, Header, Footer } from "@/components/Layout";

interface HeaderLayoutProperties {
  className?: string;
  children?: React.ReactNode;
  customFooter?: React.ReactNode;
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
  customFooter,
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
      className={`dz-header-layout ${className || ""}`.trimEnd()}
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
      {customFooter || <Footer></Footer>}
    </Layout>
  );
};
