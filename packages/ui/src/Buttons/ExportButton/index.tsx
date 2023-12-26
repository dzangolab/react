import { WorkSheetOptions } from "node-xlsx";
import React, { ComponentProps, useCallback } from "react";

import LoadingIcon from "../../LoadingIcon";
import { useExporterAsync } from "../../utils";
import { Button } from "../ButtonBasic";

export interface ExportButtonProperties extends ComponentProps<typeof Button> {
  filename?: string;
  sheetName?: string;
  sheetOptions?: WorkSheetOptions;
  onExportStart?: () => void;
  onExportEnd?: () => void;
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
  const [exporting, triggerExport] = useExporterAsync({
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
      disabled={exporting}
      iconRight={exporting && <LoadingIcon />}
      onClick={onExportButtonClick}
      {...buttonOptions}
    />
  );
};
