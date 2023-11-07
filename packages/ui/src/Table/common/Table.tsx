import {
  type ColumnDef,
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
} from "@tanstack/react-table";
import { Paginator } from "primereact/paginator";
import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
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
} from "./TableElements";
import { TRequestJSON, TSortIcons } from "./types";

export type SizeType = "small" | "normal" | "large";

// interface DataTableProps<TData> {
//   className?: string;
//   columns?: ColumnDef<TData>[];
//   data: TData[];
//   globalFilterPlaceholder?: string;
//   size?: SizeType;
// }
export interface DataTableProperties<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  //   fetcher: (requestJSON: TRequestJSON) => void;
  //   filterMenuToggleIcon?: string;
  //   enableMultiSort?: boolean;
  //   inputDebounceTime?: number;
  //   fixedHeader?: boolean;
  //   filterIcons?: {
  //     expanded: string;
  //     notExpanded: string;
  //   };
  //   hideScrollBar?: boolean;
  //   isLoading?: boolean;
  //   paginated?: boolean;
  //   paginationIcons?: {
  //     start: string;
  //     previous: string;
  //     next: string;
  //     end: string;
  //   };
  //   rowsPerPageOptions?: number[];
  //   showPageControl?: boolean;
  //   showTotalNumber?: boolean;
  //   sortable?: boolean;
  //   sortIcons?: TSortIcons;
  //   tableClassName?: string;
  //   title?: string;
  //   totalItems: number;
}

const DataTable = <TData extends { id: string | number }>({
  columns = [],
  data,
}: DataTableProperties<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
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
      <TableToolbar children={<>toolbar</>} />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(
                ({ column, getContext, id, isPlaceholder }) => {
                  const {
                    columnDef,
                    getCanSort,
                    getIsSorted,
                    getToggleSortingHandler,
                  } = column;

                  const ColumnHeaderClasses = `
                      ${getCanSort() ? "p-sortable-column" : ""} ${
                        getIsSorted() === "asc" || getIsSorted() === "desc"
                          ? "p-highlight"
                          : ""
                      },
                    `;

                  return (
                    <ColumnHeader
                      key={id}
                      className={ColumnHeaderClasses}
                      onClick={(event) => {
                        if (getCanSort()) {
                          handleSort(event, getToggleSortingHandler());
                        }
                      }}
                    >
                      {isPlaceholder
                        ? null
                        : flexRender(columnDef.header, getContext())}
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
