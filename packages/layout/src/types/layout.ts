export type NavigationMenuItem = {
  label: string;
  route: string;
  icon?: string;
};

export type NavigationMenuGroup = {
  label: string;
  icon: string;
  submenu: NavigationMenuItem[];
};

export type NavigationMenu = Array<NavigationMenuItem | NavigationMenuGroup>;
