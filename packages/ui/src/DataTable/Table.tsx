import { Column } from "primereact/column";
import {
  DataTableStateEvent,
  DataTable as PDataTable,
} from "primereact/datatable";
import { Tooltip } from "primereact/tooltip";
import React, { useState, useEffect, useMemo } from "react";

import { TABLE_DEFAULT } from "./constants";
import { ITableProperties, LazyTableState } from "./types";

export const DataTable = ({
  columns,
  currentPageReportTemplate = TABLE_DEFAULT.CURRENT_PAGE_REPORT_TEMPLATE,
  data,
  dataKey = TABLE_DEFAULT.DATA_KEY,
  defaultRowsPerPage = TABLE_DEFAULT.ROWS_PER_PAGE,
  filterDisplay = TABLE_DEFAULT.FILTER_DISPLAY,
  initialFilters,
  loading = false,
  paginator = TABLE_DEFAULT.PAGINATOR,
  paginatorTemplate = TABLE_DEFAULT.PAGINATOR_TEMPLATE,
  rowsPerPageOptions = TABLE_DEFAULT.ROWS_PER_PAGE_OPTIONS,
  stripedRows = TABLE_DEFAULT.STRIPED_ROWS,
  totalRecords = TABLE_DEFAULT.TOTAL_RECORDS,
  fetchData,
  rowClassName,
  ...tableOptions // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: ITableProperties<any>) => {
  const [lazyState, setlazyState] = useState<LazyTableState>({
    first: 0,
    rows: defaultRowsPerPage,
    page: 1,
    sortField: "",
    sortOrder: undefined,
    filters: initialFilters,
  });

  useEffect(() => {
    if (fetchData) {
      fetchData(lazyState);
    }
  }, [lazyState, fetchData]);

  const onPage = (event: LazyTableState & DataTableStateEvent) => {
    setlazyState(event);
  };

  const onSort = (event: LazyTableState & DataTableStateEvent) => {
    setlazyState(event);
  };

  const onFilter = (event: LazyTableState & DataTableStateEvent) => {
    event["first"] = 0;
    setlazyState(event);
  };

  const displayFilter = useMemo(() => {
    const filterableColumn = columns.find((column) => {
      return column.filter && !column.hidden;
    });

    return !!filterableColumn;
  }, [columns]);

  return (
    <PDataTable
      cellClassName={(_, { field }) => `cell-${field}`}
      currentPageReportTemplate={currentPageReportTemplate}
      dataKey={dataKey}
      filterDisplay={displayFilter ? filterDisplay : undefined}
      loading={loading}
      paginator={paginator}
      paginatorTemplate={paginatorTemplate}
      rowClassName={rowClassName}
      rows={lazyState.rows}
      rowsPerPageOptions={rowsPerPageOptions}
      stripedRows={stripedRows}
      totalRecords={totalRecords}
      value={data}
      {...(fetchData && {
        filters: lazyState.filters,
        first: lazyState.first,
        lazy: !!fetchData,
        onFilter,
        onPage,
        onSort,
        sortField: lazyState.sortField,
        sortOrder: lazyState.sortOrder,
      })}
      {...tableOptions}
    >
      {columns.map((column) => (
        <Column
          key={column.field}
          headerClassName={`column-${column.field}`}
          {...column}
          body={(data, columnsOptions) => {
            const renderBody = () => {
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
                    position="top"
                    {...column?.bodyTooltipOptions}
                  />
                  <div className={wrapperClassName}>{renderBody()}</div>
                </>
              );
            }

            return renderBody();
          }}
        />
      ))}
    </PDataTable>
  );
};
