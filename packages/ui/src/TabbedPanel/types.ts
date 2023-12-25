import type { ReactElement } from "react";

type TKeymap = {
  [key: string]: () => void;
};

type TOrientation = "horizontal" | "vertical";

type TPosition = "top" | "left" | "bottom" | "right";

type Properties = {
  children: ReactElement | ReactElement[];
  position?: TPosition;
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
};

export type { TKeymap, TOrientation, TPosition, Properties };
