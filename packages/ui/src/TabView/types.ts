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
  active: number;
  position?: TPosition;
  visibleTabs?: {
    key: string;
  }[];
  tabs?: Tab[];
  onClose?: (index: string) => void;
  onTabChange?: (index: string) => void;
  setActive: (index: number) => void;
};

export type { TKeymap, TOrientation, TPosition, Properties, StorageType };
