import React from "react";
import { UseFormProps } from "react-hook-form";
import { ZodEffects, ZodObject } from "zod";
interface IForm extends UseFormProps {
    className?: string;
    children: React.ReactNode;
    validationSchema?: ZodObject<any> | ZodEffects<any>;
    html5Validation?: boolean;
    onSubmit: (data: any) => any;
}
export declare const Provider: React.FC<IForm>;
export {};
//# sourceMappingURL=FormProvider.d.ts.map