import { DataView } from "primereact/dataview";
import React, { useState, useEffect, FC } from "react";
import { LIST_DEFAULT } from "./constants";
import { IDataListProperties, LazyListState } from "./types";

export const DataList: FC<IDataListProperties<any>> = ({
  currentPageReportTemplate = LIST_DEFAULT.CURRENT_PAGE_REPORT_TEMPLATE,
  data,
  dataKey = LIST_DEFAULT.DATA_KEY,
  defaultRowsPerPage = LIST_DEFAULT.ROWS_PER_PAGE,
  itemTemplate,
  loading = false,
  paginator = LIST_DEFAULT.PAGINATOR,
  paginatorTemplate = LIST_DEFAULT.PAGINATOR_TEMPLATE,
  rowsPerPageOptions = LIST_DEFAULT.ROWS_PER_PAGE_OPTIONS,
  totalRecords = LIST_DEFAULT.TOTAL_RECORDS,
  fetchData,
  ...dataViewOptions
}) => {
  const [lazyState, setlazyState] = useState<LazyListState>({
    first: 0,
    rows: defaultRowsPerPage,
    page: 1,
    sortField: undefined,
    sortOrder: undefined,
  });

  useEffect(() => {
    if (fetchData) {
      fetchData(lazyState);
    }
  }, [lazyState, fetchData]);

  const onPage = (event: any) => {
    setlazyState(event);
  };

  return (
    <DataView
      itemTemplate={itemTemplate}
      paginator={paginator}
      value={data}
      currentPageReportTemplate={currentPageReportTemplate}
      dataKey={dataKey}
      rowsPerPageOptions={rowsPerPageOptions}
      paginatorTemplate={paginatorTemplate}
      {...(fetchData && {
        first: lazyState.first,
        lazy: !!fetchData,
        onPage,
        sortField: lazyState.sortField,
        sortOrder: lazyState.sortOrder,
      })}
      loading={loading}
      totalRecords={totalRecords}
      {...dataViewOptions}
    ></DataView>
  );
};
