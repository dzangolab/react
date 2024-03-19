import React from "react";
import { UseFormProps } from "react-hook-form";
import { ZodEffects, ZodObject } from "zod";
interface IForm extends UseFormProps {
    className?: string;
    children: any;
    validationSchema?: ZodObject<any> | ZodEffects<any>;
    html5Validation?: boolean;
    onSubmit: (data: any) => void;
}
export declare const Form: React.FC<IForm>;
export {};
//# sourceMappingURL=Form.d.ts.map