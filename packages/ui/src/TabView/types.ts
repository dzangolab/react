type TKeymap = {
  [key: string]: () => void;
};

type TOrientation = "horizontal" | "vertical";

type TPosition = "top" | "left" | "bottom" | "right";

type StorageType = "localStorage" | "sessionStorage";

type Tab = {
  children: React.ReactNode;
  closable?: boolean;
  icon?: string;
  key: string;
  label: string;
};

type Properties = {
  activeKey: string;
  id?: string;
  persistState?: boolean;
  persistStateStorage?: StorageType;
  position?: TPosition;
  tabs: Tab[];
  visibleTabs: string[];
  onActiveTabChange?: (activeTab: string) => void;
  onVisibleTabsChange?: (visibleTabs: string[]) => void;
};

export type { TKeymap, TOrientation, TPosition, Properties, StorageType, Tab };
