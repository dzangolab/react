import type { ReactElement } from "react";

type TKeymap = {
  [key: string]: () => void;
};

type TOrientation = "horizontal" | "vertical";

type TPosition = "top" | "left" | "bottom" | "right";

type StorageType = "localStorage" | "sessionStorage";

type Properties = {
  children: ReactElement | ReactElement[];
  defaultActiveIndex?: number;
  id?: string;
  onTabChange?: (index: number) => void;
  position?: TPosition;
  disablePersistState?: boolean;
  persistStateStorage?: StorageType;
};

export type { TKeymap, TOrientation, TPosition, Properties, StorageType };
