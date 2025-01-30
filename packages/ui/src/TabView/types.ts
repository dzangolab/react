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
  defaultActiveIndex?: string;
  id?: string;
  persistState?: boolean;
  position?: TPosition;
  visibleTabs: {
    key: string;
  }[];
  tabs?: Tab[];
  onTabClose: (key: string) => void;
  persistStateStorage?: StorageType;
};

export type { TKeymap, TOrientation, TPosition, Properties, StorageType, Tab };
