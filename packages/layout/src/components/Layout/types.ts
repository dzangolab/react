export type NavigationMenuItem = {
  label: string;
  icon?: string;
  display?: boolean;
} & ({ route: string } | { onClick: () => void });

export type NavigationMenuGroup = {
  label: string;
  icon: string;
  submenu: NavigationMenuItem[];
};

export type NavigationMenuType = Array<
  NavigationMenuItem | NavigationMenuGroup
>;

export type NavigationType =
  | { primary?: boolean; menu: NavigationMenuType }
  | Array<{ primary?: boolean; menu: NavigationMenuType }>;
