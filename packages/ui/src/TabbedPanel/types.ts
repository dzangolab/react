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
  icon?: string;
  closable?: boolean;
};

type Properties = {
  children?: ReactElement | ReactElement[];
  defaultActiveIndex?: number;
  id?: string;
  onTabChange?: (index: number) => void;
  position?: TPosition;
  persistState?: boolean;
  persistStateStorage?: StorageType;
  tabs?: Tab[];
};

export type { TKeymap, TOrientation, TPosition, Properties, StorageType, Tab };
