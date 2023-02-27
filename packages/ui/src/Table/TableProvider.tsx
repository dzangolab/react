import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { createContext, useEffect, useMemo, useState } from "react";

import BaseTable from "./BaseTable";
import { getRequestJSON } from "./utils";
import adjustmentsIcon from "../assets/images/adjustments.svg";
import arrowDownIcon from "../assets/images/arrow-down.svg";
import arrowUpDownIcon from "../assets/images/arrow-up-down.svg";
import arrowUpIcon from "../assets/images/arrow-up.svg";
import chevronLeft from "../assets/images/chevron-left.svg";
import chevronRight from "../assets/images/chevron-right.svg";
import doubleChevronLeft from "../assets/images/double-chevron-left.svg";
import doubleChevronRight from "../assets/images/double-chevron-right.svg";
import filterIcon from "../assets/images/filter.svg";

import type { TableContextProperties, TableProviderProperties } from "./types";
import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableContext = createContext<TableContextProperties<any>>({
  columns: [],
  data: [],
  isLoading: false,
  totalItems: 0,
  fetcher: () => {
    return;
  },
});

function TableProvider<T>(properties: TableProviderProperties<T>) {
  const {
    children,
    columns,
    data,
    enableMultiSort,
    fetcher,
    rowsPerPageOptions,
    totalItems,
    ...rest
  } = properties;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [paginationState, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: rowsPerPageOptions ? rowsPerPageOptions[0] : 10,
  });

  const { pageIndex, pageSize } = paginationState;

  useEffect(() => {
    const requestJSON = getRequestJSON(sorting, columnFilters, {
      pageIndex,
      pageSize,
    });
    fetcher(requestJSON);
  }, [columnFilters, pageIndex, pageSize, sorting]);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      sorting,
      pagination,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    isMultiSortEvent: () => enableMultiSort || false,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    pageCount: Math.ceil(totalItems / pageSize),
    debugTable: false,
  });

  return (
    <TableContext.Provider
      value={{ table, paginationState, rowsPerPageOptions, ...rest }}
    >
      {children ? children : <BaseTable />}
    </TableContext.Provider>
  );
}

TableProvider.defaultProps = {
  enableMultiSort: false,
  filterIcons: {
    expanded: filterIcon,
    notExpanded: filterIcon,
  },
  filterMenuToggleIcon: adjustmentsIcon,
  fixedHeader: true,
  hideScrollBar: true,
  inputDebounceTime: 300,
  paginated: true,
  paginationIcons: {
    start: doubleChevronLeft,
    previous: chevronLeft,
    next: chevronRight,
    end: doubleChevronRight,
  },
  rowsPerPageOptions: [10, 20, 30],
  showLoading: true,
  showPageControl: true,
  showTotalNumber: true,
  sortable: true,
  sortIcons: {
    asc: arrowUpIcon,
    desc: arrowDownIcon,
    default: arrowUpDownIcon,
  },
};

export default TableProvider;
