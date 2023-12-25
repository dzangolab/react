import type { ReactElement } from "react";

type TKeymap = {
  [key: string]: () => void;
};

type TOrientation = "horizontal" | "vertical";

type TPosition = "top" | "left" | "bottom" | "right";

type Properties = {
  children: ReactElement | ReactElement[];
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  position?: TPosition;
};

export type { TKeymap, TOrientation, TPosition, Properties };
