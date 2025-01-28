import type { ReactElement } from "react";

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
  activeTab: string;
  position?: TPosition;
  visibleTabs?: {
    key: string;
  }[];
  tabs?: Tab[];
  onTabClose?: (index: string) => void;
  setActiveTab: (index: string) => void;
};

export type { TKeymap, TOrientation, TPosition, Properties, StorageType, Tab };
