import FileSaver from "file-saver";
import { useCallback, useState } from "react";

type UseExporterOptions = {
  filename?: string;
  sheetName?: string;
  onExportStart?: () => void;
  onExportEnd?: () => void;
};

type ExportAsyncType = (data: any) => Promise<void>;

const exportXLSX = async (sheetName: string, filename: string, data: any) => {
  const XLSX = await import("node-xlsx");

  const buffer = XLSX.build([{ name: sheetName, data, options: {} }]);

  FileSaver.saveAs(
    new Blob([buffer], {
      type: "application/vnd.ms-excel",
    }),
    `${filename}.xlsx`
  );
};

export const useExporter = ({
  filename = `export_${Date.now()}.xlsx`,
  sheetName = "Sheet 1",
  onExportStart,
  onExportEnd,
}: UseExporterOptions): [boolean, ExportAsyncType] => {
  const [exporting, setExporting] = useState(false);

  const exportAsync = useCallback(
    async (data: any) => {
      setExporting(true);
      if (onExportStart) {
        onExportStart();
      }

      await exportXLSX(sheetName, filename, data);

      setExporting(false);
      if (onExportEnd) {
        onExportEnd();
      }
    },
    [filename, sheetName, onExportStart, onExportEnd]
  );

  return [exporting, exportAsync];
};
