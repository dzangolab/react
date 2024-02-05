export type NavigationMenuItem = {
  label: string;
  icon?: string;
} & ({ route: string } | { onClick: () => void });

export type NavigationMenuGroup = {
  label: string;
  icon: string;
  submenu: NavigationMenuItem[];
};

export type NavigationMenuType = Array<
  NavigationMenuItem | NavigationMenuGroup
>;
