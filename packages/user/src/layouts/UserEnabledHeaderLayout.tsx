import {
  HeaderLayout,
  NavMenuItemType,
  NavMenuType,
} from "@dzangolab/react-layout";

interface IProperties {
  className?: string;
  children?: React.ReactNode;
  displayNavIcons?: boolean;
  headerAddon?: React.ReactNode;
  navigationMenu?: NavMenuType;
  title?: string | React.ReactNode;
  menu?: NavMenuItemType;
  noLocaleSwitcher?: boolean;
  noLogo?: boolean;
  noToggle?: boolean;
  customHeader?: React.ReactNode;
  fixed?: boolean;
}
export const UserEnabledHeaderLayout = ({
  className,
  children,
  displayNavIcons,
  headerAddon,
  navigationMenu,
  title,
  menu,
  noLogo,
  noLocaleSwitcher,
  noToggle,
  customHeader,
  fixed,
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
        menu,
        noLogo,
        noLocaleSwitcher,
        noToggle,
        customHeader,
        fixed,
      }}
    />
  );
};
