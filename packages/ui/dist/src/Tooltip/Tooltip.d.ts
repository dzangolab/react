import React, { RefObject, FC } from "react";
type TooltipProperties = {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    elementRef: RefObject<HTMLElement>;
    mouseTrack?: boolean;
    offset?: number;
    position?: "top" | "bottom" | "right" | "left";
};
export declare const Tooltip: FC<TooltipProperties>;
export {};
//# sourceMappingURL=Tooltip.d.ts.map