import { FC, MouseEvent, ReactNode } from "react";
export interface IStepEvent extends MouseEvent<HTMLElement> {
    label?: string;
    index?: number;
}
export type AlignType = "start" | "center" | "end";
export type LineStyleType = "solid" | "dashed";
interface IStepProperties {
    isCompleted: boolean;
    isActive: boolean;
    completedStepIcon?: string | ReactNode;
    onClick: (event: IStepEvent) => void;
    index: number;
    label?: string;
    lineStyle?: LineStyleType;
    align?: AlignType;
    step?: number | string | ReactNode;
}
export declare const Step: FC<IStepProperties>;
export {};
//# sourceMappingURL=Step.d.ts.map