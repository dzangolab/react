import React from "react";
export interface BaseButtonProperties {
    alignCenter?: boolean;
    alternativeText?: string;
    borderRadiusType?: "pill" | "rectangular";
    className?: string;
    handleClick?: () => void;
    imageSource: string;
    title?: string;
    variant?: "light" | "dark";
}
declare const BaseButton: React.FC<BaseButtonProperties>;
export default BaseButton;
//# sourceMappingURL=index.d.ts.map