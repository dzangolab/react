import { Column } from "primereact/column";
import { DataTable as PDataTable } from "primereact/datatable";
import React, { useState, useEffect } from "react";

import { TABLE_DEFAULT } from "./constants";
import { ITableProperties, LazyTableState } from "./types";

export const DataTable = ({
  columns,
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
  ...tableOptions
}: ITableProperties<any>) => {
  const [lazyState, setlazyState] = useState<LazyTableState>({
    first: 0,
    rows: defaultRowsPerPage,
    page: 1,
    sortField: undefined,
    sortOrder: undefined,
    filters: initialFilters,
  });

  useEffect(() => {
    if (fetchData) {
      fetchData(lazyState);
    }
  }, [lazyState, fetchData]);

  const onPage = (event: any) => {
    setlazyState(event);
  };

  const onSort = (event: any) => {
    setlazyState(event);
  };

  const onFilter = (event: any) => {
    event["first"] = 0;
    setlazyState(event);
  };

  return (
    <PDataTable
      cellClassName={(_, { field }) => `cell-${field}`}
      dataKey={dataKey}
      filterDisplay={filterDisplay}
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
        />
      ))}
    </PDataTable>
  );
};
