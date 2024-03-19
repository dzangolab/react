import { ButtonHTMLAttributes, FC, ReactNode } from "react";
export interface IButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: string | ReactNode;
    iconLeft?: string | ReactNode;
    iconRight?: string | ReactNode;
    label?: string;
    loading?: boolean;
    severity?: "primary" | "secondary" | "alternate" | "success" | "danger" | "warning";
    size?: "small" | "medium" | "large";
    to?: string;
    variant?: "outlined" | "filled" | "textOnly";
}
export declare const Button: FC<IButtonProperties>;
//# sourceMappingURL=index.d.ts.map