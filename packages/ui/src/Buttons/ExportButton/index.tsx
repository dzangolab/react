import { Button, ButtonProps } from "primereact/button";
import React, { useCallback } from "react";

import { useExporter } from "../../utils";

export interface ExportButtonProperties extends ButtonProps {
  filename?: string;
  sheetName?: string;
  onExportStart?: () => void;
  onExportEnd?: () => void;
  sheetOptions?: object;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getData: () => Array<Array<any>>;
}

export const ExportButton: React.FC<ExportButtonProperties> = ({
  label = "Export XLSX",
  filename,
  sheetName,
  sheetOptions,
  getData,
  onExportStart,
  onExportEnd,
  ...buttonOptions
}) => {
  const [exporting, triggerExport] = useExporter({
    filename,
    sheetName,
    sheetOptions,
    onExportStart,
    onExportEnd,
  });

  const onExportButtonClick = useCallback(() => {
    const data = getData();
    triggerExport(data);
  }, [triggerExport, getData]);

  return (
    <Button
      label={label}
      loading={exporting}
      onClick={onExportButtonClick}
      {...buttonOptions}
    />
  );
};
