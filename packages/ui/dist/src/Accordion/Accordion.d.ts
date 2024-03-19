import React from "react";
import type { ReactElement } from "react";
type Properties = {
    children: ReactElement | ReactElement[];
    defaultActiveIndex?: number;
    direction?: "horizontal" | "vertical";
    activeIcon?: string;
    canSelfCollapse?: boolean;
    inactiveIcon?: string;
};
declare const Accordion: React.FC<Properties>;
export default Accordion;
//# sourceMappingURL=Accordion.d.ts.map