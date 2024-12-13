import { StorageType } from "..";

import type { ReactElement } from "react";

type TKeymap = {
  [key: string]: () => void;
};

type TOrientation = "horizontal" | "vertical";

type TPosition = "top" | "left" | "bottom" | "right";

type Properties = {
  children: ReactElement | ReactElement[];
  defaultActiveIndex?: number;
  id?: string;
  onTabChange?: (index: number) => void;
  position?: TPosition;
  persistState?: boolean;
  persistentStateStorage?: StorageType;
};

export type { TKeymap, TOrientation, TPosition, Properties };
