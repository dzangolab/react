import { IButtonProperties } from "@dzangolab/react-ui";
import React from "react";
interface FormActionsProperties {
    actions?: IButtonProperties[];
    alignment?: "center" | "left" | "right" | "fill";
    flowDirection?: "horizontal" | "vertical";
    className?: string;
    loading?: boolean;
}
export declare const FormActions: ({ actions, alignment, className, flowDirection, loading, }: FormActionsProperties) => React.JSX.Element;
export {};
//# sourceMappingURL=FormActions.d.ts.map