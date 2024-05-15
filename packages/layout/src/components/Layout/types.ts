export type NavItemType = {
  label: string | React.ReactNode;
  icon?: string;
  display?: boolean;
} & ({ route: string } | { onClick: () => void });

export type NavGroupType = {
  label: string | React.ReactNode;
  icon?: string;
  submenu: NavItemType[];
};

export type NavMenuItemType = {
  label?: string;
  id?: string;
  menu: Array<NavItemType | NavGroupType>;
  menuOverlay?: boolean;
};

export type NavMenuType = NavMenuItemType | Array<NavMenuItemType>;

export type UserMenuModeType = "horizontal" | "dropdown";
