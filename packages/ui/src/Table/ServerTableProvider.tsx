import { Updater, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";

import BaseTable from "./common/BaseTable";
import {
  DEFAULT_INPUT_DEBOUNCE_TIME,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_PER_OPTIONS,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TABLE_DATA,
} from "./common/constants";
import { TableContext } from "./common/TableContext";
import { getRequestJSON } from "./common/utils";
import adjustmentsIcon from "../assets/images/adjustments.svg";
import arrowDownIcon from "../assets/images/arrow-down.svg";
import arrowUpDownIcon from "../assets/images/arrow-up-down.svg";
import arrowUpIcon from "../assets/images/arrow-up.svg";
import chevronLeft from "../assets/images/chevron-left.svg";
import chevronRight from "../assets/images/chevron-right.svg";
import doubleChevronLeft from "../assets/images/double-chevron-left.svg";
import doubleChevronRight from "../assets/images/double-chevron-right.svg";
import filterIcon from "../assets/images/filter.svg";

import type {
  TCustomColumnFilter,
  TableProviderProperties,
} from "./common/types";
import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

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
  const [columnFilters, setColumnFilters] = useState<TCustomColumnFilter[]>([]);

  const handleColumnFilterChange = (event_: Updater<ColumnFiltersState>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setColumnFilters(event_ as any);
  };

  const [paginationState, setPagination] = useState<PaginationState>({
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: rowsPerPageOptions ? rowsPerPageOptions[0] : DEFAULT_PAGE_SIZE,
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
    data: data || DEFAULT_TABLE_DATA,
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
    onColumnFiltersChange: handleColumnFilterChange,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    pageCount: Math.ceil(totalItems / pageSize),
    debugTable: false,
  });

  return (
    <TableContext.Provider
      value={{
        table,
        paginationState,
        rowsPerPageOptions,
        totalItems,
        ...rest,
      }}
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
  inputDebounceTime: DEFAULT_INPUT_DEBOUNCE_TIME,
  paginated: true,
  paginationIcons: {
    start: doubleChevronLeft,
    previous: chevronLeft,
    next: chevronRight,
    end: doubleChevronRight,
  },
  rowsPerPageOptions: DEFAULT_PAGE_PER_OPTIONS,
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
