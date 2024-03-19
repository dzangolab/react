import type { TOrientation, TPosition } from "./types";
import type { KeyboardEvent } from "react";
declare const getOrientation: (position: TPosition) => TOrientation;
declare const onTabDown: (active: number, event: KeyboardEvent<HTMLButtonElement>, count: number, handleFocus: (value: number) => void, orientation: TOrientation) => void;
export { getOrientation, onTabDown };
//# sourceMappingURL=helper.d.ts.map