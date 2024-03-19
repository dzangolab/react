import React, { ReactNode } from "react";
export interface PopupProperties {
    trigger: ReactNode;
    content: ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    offset?: number;
    margin?: number;
}
export declare const Popup: React.FC<PopupProperties>;
//# sourceMappingURL=Popup.d.ts.map