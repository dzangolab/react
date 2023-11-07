import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
  PaginationState,
  TableOptions,
  Updater,
} from "@tanstack/react-table";
import { Paginator } from "primereact/paginator";
import React, {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_PER_OPTIONS,
  DEFAULT_PAGE_SIZE,
} from "./constants";
import {
  Table,
  TableBody,
  TableCell,
  ColumnHeader,
  TableHeader,
  TableRow,
  TableToolbar,
  TableCaption,
  TableFooter,
} from "./TableElements";
import { TCustomColumnFilter, TRequestJSON, TSortIcons } from "./types";
import { getRequestJSON } from "./utils";

import type { Table as TableType } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line unicorn/prevent-abbreviations
  interface ColumnDefBase<TData, TValue> {
    align?: "left" | "center" | "right";
  }
}

interface DataTableProperties<TData>
  extends Omit<TableOptions<TData>, "getCoreRowModel"> {
  className?: string;
  globalFilterPlaceholder?: string;
  fetchData?: (data: TRequestJSON) => void;
  renderToolbarItems?: (table: TableType<TData>) => React.ReactNode;
  renderTableFooterContent?: (table: TableType<TData>) => React.ReactNode;
  tableCaption?: React.ReactNode;
}

// export interface DataTableProperties<TData> {
//   columns: ColumnDef<TData>[];
//   data: TData[];
//   //   fetcher: (requestJSON: TRequestJSON) => void;
//   //   filterMenuToggleIcon?: string;
//   //   enableMultiSort?: boolean;
//   //   inputDebounceTime?: number;
//   //   fixedHeader?: boolean;
//   //   filterIcons?: {
//   //     expanded: string;
//   //     notExpanded: string;
//   //   };
//   //   hideScrollBar?: boolean;
//   //   isLoading?: boolean;
//   //   paginated?: boolean;
//   //   paginationIcons?: {
//   //     start: string;
//   //     previous: string;
//   //     next: string;
//   //     end: string;
//   //   };
//   //   rowsPerPageOptions?: number[];
//   //   showPageControl?: boolean;
//   //   showTotalNumber?: boolean;
//   //   sortable?: boolean;
//   //   sortIcons?: TSortIcons;
//   //   tableClassName?: string;
//   //   title?: string;
//   //   totalItems: number;
// }

const DataTable = <TData extends { id: string | number }>({
  columns = [],
  data,
  fetchData,
  renderToolbarItems,
  renderTableFooterContent,
  tableCaption,
  ...tableOptions
}: DataTableProperties<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<TCustomColumnFilter[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const handleColumnFilterChange = (event_: Updater<ColumnFiltersState>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setColumnFilters(event_ as any);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: handleColumnFilterChange,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      columnVisibility,
      pagination,
      rowSelection,
      sorting,
    },
    manualFiltering: !!fetchData,
    manualSorting: !!fetchData,
    manualPagination: !!fetchData,
    ...tableOptions,
  });

  //   const mappedSelectedRows = table
  //     .getFilteredSelectedRowModel()
  //     .rows.map((row) => ({ id: row.original.id }));

  //   const handleGlobalSearch = useCallback(
  //     (event: ChangeEvent<HTMLInputElement>) => {
  //       table.getColumn("firstName")?.setFilterValue(event.target.value);
  //     },
  //     [table]
  //   );

  useEffect(() => {
    const requestJSON = getRequestJSON(sorting, columnFilters, {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
    });

    fetchData && fetchData(requestJSON);
  }, [columnFilters, pagination.pageIndex, pagination.pageSize, sorting]);

  const handleSort = useCallback(
    (event: SyntheticEvent, sortHandler?: (event: SyntheticEvent) => void) => {
      event.stopPropagation();
      if (sortHandler) {
        sortHandler(event);
      }
    },
    [],
  );

  return (
    <div className="table-container">
      {renderToolbarItems ? (
        <TableToolbar children={renderToolbarItems(table)} />
      ) : null}
      <Table>
        <TableCaption children={tableCaption} />
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="header-row">
              {headerGroup.headers.map(
                ({ column, getContext, id, isPlaceholder, colSpan }) => {
                  const {
                    columnDef,
                    getCanSort,
                    getIsSorted,
                    getToggleSortingHandler,
                  } = column;

                  const activeColumnClass = `${
                    getIsSorted() === "asc" || getIsSorted() === "desc"
                      ? "highlight"
                      : ""
                  }`;

                  const renderSortIcons = () => {
                    switch (getIsSorted()) {
                      case "asc":
                        return <i className="pi pi-arrow-up"></i>;
                      case "desc":
                        return <i className="pi pi-arrow-down"></i>;
                      default:
                        return <i className="pi pi-arrows-v"></i>;
                    }
                  };

                  return (
                    <ColumnHeader
                      key={id}
                      colSpan={colSpan}
                      className={`column-${id} ${activeColumnClass}`}
                      data-align={columnDef.align || "left"}
                      onClick={(event) => {
                        if (getCanSort()) {
                          handleSort(event, getToggleSortingHandler());
                        }
                      }}
                    >
                      <>
                        {isPlaceholder
                          ? null
                          : flexRender(columnDef.header, getContext())}
                        <>
                          {getCanSort() ? (
                            <span className="sort-state">
                              {renderSortIcons()}
                            </span>
                          ) : null}
                        </>
                      </>
                    </ColumnHeader>
                  );
                },
              )}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                data-id={row.original.id ?? row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    data-label={cell.column.id}
                    data-align={cell.column.columnDef.align || "left"}
                    className={cell.column.id ? `column-${cell.column.id}` : ``}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>No results.</TableCell>
            </TableRow>
          )}
        </TableBody>
        {renderTableFooterContent ? (
          <TableFooter children={renderTableFooterContent(table)} />
        ) : null}
      </Table>

      <div className="p-paginator-bottom p-paginator p-component">
        <Paginator
          first={pagination.pageIndex * pagination.pageSize}
          rows={pagination.pageSize}
          totalRecords={table.getFilteredRowModel().rows?.length}
          rowsPerPageOptions={DEFAULT_PAGE_PER_OPTIONS}
          onPageChange={(event) => {
            const currentPageIndex = Math.ceil(event.first / event.rows);
            setPagination({
              pageIndex: currentPageIndex,
              pageSize: event.rows,
            });
          }}
        />
      </div>
    </div>
  );
};

export { DataTable };
