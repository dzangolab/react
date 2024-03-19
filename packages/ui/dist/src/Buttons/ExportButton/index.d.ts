import { WorkSheetOptions } from "node-xlsx";
import React, { ComponentProps } from "react";
import { Button } from "../ButtonBasic";
export interface ExportButtonProperties extends ComponentProps<typeof Button> {
    filename?: string;
    sheetName?: string;
    sheetOptions?: WorkSheetOptions;
    onExportStart?: () => void;
    onExportEnd?: () => void;
    getData: () => Array<Array<any>>;
}
export declare const ExportButton: React.FC<ExportButtonProperties>;
//# sourceMappingURL=index.d.ts.map