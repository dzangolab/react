import type { TKeymap, TOrientation, TPosition } from "./types";
import type { KeyboardEvent } from "react";

const getOrientation = (position: TPosition) => {
  let orientation: TOrientation;

  switch (position) {
    case "top":
    case "bottom":
      orientation = "horizontal";
      break;

    case "left":
    case "right":
      orientation = "vertical";
      break;

    default:
      orientation = "horizontal";
      break;
  }

  return orientation;
};

const onTabDown = (
  active: number,
  event: KeyboardEvent<HTMLButtonElement>,
  count: number,
  handleIndex: (value: number) => void,
  orientation: TOrientation
) => {
  const nextTab = () => handleIndex((active + 1) % count);
  const previousTab = () => handleIndex((active - 1 + count) % count);
  const firstTab = () => handleIndex(0);
  const lastTab = () => handleIndex(count - 1);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const doNothing = () => {};

  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
  const keyMap: TKeymap = {
    ArrowRight: orientation === "horizontal" ? nextTab : doNothing,
    ArrowDown: orientation === "vertical" ? nextTab : doNothing,
    ArrowLeft: orientation === "horizontal" ? previousTab : doNothing,
    ArrowUp: orientation === "vertical" ? previousTab : doNothing,
    Home: firstTab,
    End: lastTab,
  };

  const action = keyMap[event.key];
  if (action) {
    event.preventDefault();
    action();
  }
};

export { getOrientation, onTabDown };
