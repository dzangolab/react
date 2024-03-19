import type { InputHTMLAttributes } from "react";
export interface DebouncedInputProperties extends InputHTMLAttributes<HTMLInputElement> {
    onInputChange: (value: string | number | readonly string[]) => void;
    debounceTime?: number;
}
export declare const DebouncedInput: React.FC<DebouncedInputProperties>;
//# sourceMappingURL=index.d.ts.map