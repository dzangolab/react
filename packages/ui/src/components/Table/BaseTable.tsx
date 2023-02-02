import "./BaseTable.css";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useContext, useEffect, useMemo, useState } from "react";

import Pagination from "./Pagination";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import { TableContext } from "./TableProvider";
import { getRequestJSON } from "./utils";

import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

function BaseTable() {
  const {
    columns,
    data,
    enableMultiSort,
    fetchCallback,
    fixedHeader,
    hideScrollBar,
    paginated,
    paginationIcons,
    rowsPerPageOptions,
    showPageControl,
    showTotalNumber,
    totalItems,
    title,
  } = useContext(TableContext);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: rowsPerPageOptions ? rowsPerPageOptions[0] : 10,
  });

  useEffect(() => {
    const requestJSON = getRequestJSON(sorting, columnFilters);
    fetchCallback && fetchCallback(requestJSON);
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

  const getTableWrapperStyle = () => {
    if (fixedHeader && hideScrollBar) return "sticky-header hide-scrollbar";
    if (fixedHeader && !hideScrollBar) return "sticky-header";
    if (!fixedHeader && hideScrollBar) return "hide-scrollbar";
    return "";
  };

  return (
    <div className={getTableWrapperStyle()}>
      <div className="table-wrapper">
        <table>
          {title ? <caption>{title}</caption> : null}
          <TableHeader table={table} />
          <TableBody rowModel={() => table.getRowModel()} />
        </table>
      </div>

      <div className="table-info-container">
        <div className="page-details">
          {showTotalNumber ? (
            <span className="current-page-info">
              <strong>
                {`${
                  table.getState().pagination.pageIndex + 1
                } of ${table.getPageCount()} `}
              </strong>
              |
            </span>
          ) : null}

          {showPageControl ? (
            <div className="page-controller">
              <span> Go to page:</span>
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                disabled={!table.getCanNextPage()}
                onChange={(event_) => {
                  const page = event_.target.value
                    ? Number(event_.target.value) - 1
                    : 0;
                  table.setPageIndex(page);
                }}
                size={1}
              />

              <select
                value={table.getState().pagination.pageSize}
                onChange={(event_) => {
                  table.setPageSize(Number(event_.target.value));
                }}
              >
                {rowsPerPageOptions?.map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </div>

        {paginated ? (
          <Pagination
            config={[
              {
                icon: paginationIcons?.start,
                isDisabled: !table.getCanPreviousPage(),
                onClick: () => table.setPageIndex(0),
              },
              {
                icon: paginationIcons?.previous,
                isDisabled: !table.getCanPreviousPage(),
                onClick: () => table.previousPage(),
              },
              {
                icon: paginationIcons?.next,
                isDisabled: !table.getCanNextPage(),
                onClick: () => table.nextPage(),
              },
              {
                icon: paginationIcons?.end,
                isDisabled: !table.getCanNextPage(),
                onClick: () => table.setPageIndex(table.getPageCount() - 1),
              },
            ]}
          />
        ) : null}
      </div>
    </div>
  );
}

BaseTable.defaultProps = {
  rowsPerPageOptions: [10, 20, 30, 40, 50],
};

export default BaseTable;
