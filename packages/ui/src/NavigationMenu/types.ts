export type NavItemType = {
  className?: string;
  disabled?: boolean;
  display?: boolean;
  icon?: string;
  label: string | React.ReactNode;
} & ({ route: string } | { onClick: () => void });

export type NavGroupType = {
  label: string | React.ReactNode;
  icon?: string;
  submenu: NavItemType[];
};

export type NavMenuItemType = {
  label?: string;
  id?: string;
  className?: string;
  menu: Array<NavItemType | NavGroupType>;
};

export type NavMenuType = NavMenuItemType | Array<NavMenuItemType>;

export type NavGroupDisplayMode =
  | "collapsible"
  | "collapsible-reverse"
  | "expanded";

export type UserMenuModeType = NavGroupDisplayMode | "horizontal" | "popup";
