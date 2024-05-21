import {
  HeaderLayout,
  NavMenuItemType,
  NavMenuType,
} from "@dzangolab/react-layout";

interface IProperties {
  className?: string;
  children?: React.ReactNode;
  customHeader?: React.ReactNode;
  displayNavIcons?: boolean;
  fixed?: boolean;
  headerAddon?: React.ReactNode;
  userNavigationmenu?: NavMenuItemType;
  navigationMenu?: NavMenuType;
  noLocaleSwitcher?: boolean;
  noLogo?: boolean;
  noToggle?: boolean;
  title?: string | React.ReactNode;
}

export const UserEnabledHeaderLayout = ({
  children,
  className,
  customHeader,
  displayNavIcons,
  fixed,
  headerAddon,
  userNavigationmenu,
  navigationMenu,
  noLocaleSwitcher,
  noLogo,
  noToggle,
  title,
}: IProperties) => {
  return (
    <HeaderLayout
      {...{
        className,
        children,
        displayNavIcons,
        headerAddon,
        navigationMenu,
        title,
        userMenu: userNavigationmenu,
        noLogo,
        noLocaleSwitcher,
        noToggle,
        customHeader,
        fixed,
      }}
    />
  );
};
