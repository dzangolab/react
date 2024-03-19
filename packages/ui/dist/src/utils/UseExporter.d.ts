import { WorkSheetOptions } from "node-xlsx";
type UseExporterOptions = {
    filename?: string;
    sheetName?: string;
    sheetOptions?: WorkSheetOptions;
    onExportStart?: () => void;
    onExportEnd?: () => void;
};
type TriggerExportType = (data: any) => void;
export declare const useExporter: ({ filename, sheetName, sheetOptions, onExportStart, onExportEnd, }: UseExporterOptions) => [boolean, TriggerExportType];
export {};
//# sourceMappingURL=UseExporter.d.ts.map