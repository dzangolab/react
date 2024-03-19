import { FC, ReactNode } from "react";
type TagProperties = {
    className?: string;
    color?: string;
    fullWidth?: boolean;
    icon?: string;
    label?: string;
    rounded?: boolean;
    style?: React.CSSProperties;
    renderContent?: () => ReactNode;
};
export declare const Tag: FC<TagProperties>;
export {};
//# sourceMappingURL=index.d.ts.map