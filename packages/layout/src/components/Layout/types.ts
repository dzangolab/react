export type NavItemType = {
  label: string;
  icon?: string;
  display?: boolean;
} & ({ route: string } | { onClick: () => void });

export type NavGroupType = {
  label: string;
  icon: string;
  submenu: NavItemType[];
};

export type NavMenuItemType = {
  label?: boolean;
  menu: Array<NavItemType | NavGroupType>;
};

export type NavMenuType = NavMenuItemType | Array<NavMenuItemType>;
