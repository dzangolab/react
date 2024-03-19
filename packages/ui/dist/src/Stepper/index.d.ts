import { ReactNode } from "react";
import { IStepEvent, LineStyleType, AlignType } from "./Step";
type StepItem = {
    activeStepIcon?: string | ReactNode;
    label?: string;
    step?: number | string | ReactNode;
};
interface IProperties {
    activeIndex?: number;
    onChange?: (event: IStepEvent) => void;
    readOnly?: boolean;
    lineStyle?: LineStyleType;
    steps: StepItem[];
    align?: AlignType;
}
export declare const Stepper: React.FC<IProperties>;
export {};
//# sourceMappingURL=index.d.ts.map