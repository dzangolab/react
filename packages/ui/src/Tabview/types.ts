import type { ReactElement } from "react";

type TKeymap = {
  [key: string]: () => void;
};

type TOrientation = "horizontal" | "vertical";

type TPosition = "top" | "left" | "bottom" | "right";

type StorageType = "localStorage" | "sessionStorage";

type Tab = {
  label: string;
  children: React.ReactNode;
  key: string;
  closable?: boolean;
  icon?: string;
};

type Properties = {
  activeTabIndex?: number;
  onClose?: (index: string) => void;
  position?: TPosition;
  visibleTabs?: {
    key: string;
  }[];
  tabs?: Tab[];
};

export type { TKeymap, TOrientation, TPosition, Properties, StorageType };
