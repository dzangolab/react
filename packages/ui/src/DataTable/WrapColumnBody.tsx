import { Tooltip } from "primereact/tooltip";

import type { IColumnProperties } from "./types";
import type { ColumnBodyOptions } from "primereact/column";

export const wrapColumnBody: ({
  data,
  columnsOptions,
  column,
  dataKey,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  columnsOptions: ColumnBodyOptions;
  column: IColumnProperties;
  dataKey: string;
}) => React.ReactNode = ({ data, columnsOptions, column, dataKey }) => {
  const renderBody = () => {
    if (!column.body) {
      return data[column?.field || ""];
    }

    if (typeof column.body === "function") {
      return column.body(data, columnsOptions);
    } else {
      return column.body;
    }
  };

  if (column.bodyTooltip) {
    const wrapperClassName =
      `${data?.[dataKey]?.replace(/ /g, "-")}` + `-${column.field}`;

    let tooltipContent = "";

    if (typeof column?.bodyTooltip === "function") {
      tooltipContent = column.bodyTooltip(data);
    } else if (typeof column?.bodyTooltip === "string") {
      tooltipContent = column.bodyTooltip;
    } else {
      tooltipContent = data?.[column?.field || ""];
    }

    return (
      <>
        <Tooltip
          target={`.${wrapperClassName}`}
          content={tooltipContent}
          className="table-tooltip"
          position="top"
          {...column?.bodyTooltipOptions}
        />
        <div
          className={wrapperClassName}
          style={{
            width: "inherit",
            maxWidth: "inherit",
            minWidth: "inherit",
            height: "inherit",
            maxHeight: "inherit",
            minHeight: "inherit",
            overflow: "hidden",
          }}
        >
          {renderBody()}
        </div>
      </>
    );
  }

  return renderBody();
};
