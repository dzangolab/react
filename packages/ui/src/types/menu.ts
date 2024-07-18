type MenuRouteType = {
  name: string;
  route: string;
  icon?: React.ReactNode;
};

type NestedMenuRouteType = Omit<MenuRouteType, "route"> & {
  route?: string;
  submenu: Array<MenuRouteType>;
};

type CombinedMenuRouteType = Array<MenuRouteType | NestedMenuRouteType>;

export type { MenuRouteType, NestedMenuRouteType, CombinedMenuRouteType };
