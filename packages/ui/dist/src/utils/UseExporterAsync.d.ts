import { WorkSheetOptions } from "node-xlsx";
type UseExporterOptions = {
    filename?: string;
    sheetName?: string;
    sheetOptions?: WorkSheetOptions;
    onExportStart?: () => void;
    onExportEnd?: () => void;
};
type TriggerExportAsyncType = (data: any) => Promise<void>;
export declare const useExporterAsync: ({ filename, sheetName, sheetOptions, onExportStart, onExportEnd, }: UseExporterOptions) => [boolean, TriggerExportAsyncType];
export {};
//# sourceMappingURL=UseExporterAsync.d.ts.map