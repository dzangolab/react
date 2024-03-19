import type { FileExtended, FileMode } from "./types";
export declare const useOnDropFile: ({ mode, multiple, name, onChange, value, }: {
    name: string;
    multiple: boolean;
    mode: FileMode;
    value: FileExtended[];
    onChange: (file: FileExtended[]) => void;
}) => (droppedFiles: FileExtended[]) => void;
export declare const useOnRemoveFile: ({ value, onChange, }: {
    value: FileExtended[];
    onChange: (file: FileExtended[]) => void;
}) => (index: number) => void;
//# sourceMappingURL=hooks.d.ts.map