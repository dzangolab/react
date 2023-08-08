import { saveAs } from "file-saver";
import { build, WorkSheetOptions } from "node-xlsx";
import { useCallback, useState } from "react";

type UseExporterOptions = {
  filename?: string;
  sheetName?: string;
  sheetOptions?: WorkSheetOptions;
  onExportStart?: () => void;
  onExportEnd?: () => void;
};

type TriggerExportType = (data: any) => void;

const exportXLSX = ({
  sheetName,
  filename,
  data,
  sheetOptions,
}: {
  sheetName: string;
  filename: string;
  data: any;
  sheetOptions: WorkSheetOptions;
}) => {
  const buffer = build([{ name: sheetName, data, options: sheetOptions }]);

  saveAs(
    new Blob([buffer], {
      type: "application/vnd.ms-excel",
    }),
    `${filename}.xlsx`
  );
};

export const useExporter = ({
  filename = `export_${Date.now()}.xlsx`,
  sheetName = "Sheet 1",
  sheetOptions = {},
  onExportStart,
  onExportEnd,
}: UseExporterOptions): [boolean, TriggerExportType] => {
  const [exporting, setExporting] = useState(false);

  const triggerExport = useCallback(
    (data: any) => {
      setExporting(true);
      if (onExportStart) {
        onExportStart();
      }

      exportXLSX({ sheetName, filename, data, sheetOptions });

      setExporting(false);
      if (onExportEnd) {
        onExportEnd();
      }
    },
    [filename, sheetName, onExportStart, onExportEnd]
  );

  return [exporting, triggerExport];
};
