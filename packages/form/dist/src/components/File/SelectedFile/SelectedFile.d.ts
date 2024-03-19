import React from "react";
import { FileExtended } from "../types";
type SelectedFileProperties = {
    file: FileExtended;
    enableDescription?: boolean;
    addDescriptionLabel?: string;
    descriptionPlaceholder?: string;
    index: number;
    onRemove?: () => void;
    onDescriptionChange?: (description?: string) => void;
};
export declare const SelectedFile: React.FC<SelectedFileProperties>;
export {};
//# sourceMappingURL=SelectedFile.d.ts.map