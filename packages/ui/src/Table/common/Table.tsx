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
  Updater,
} from "@tanstack/react-table";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import React, {
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
  TableFooter,
} from "./TableElements";
import { getRequestJSON, getParsedColumns } from "./utils";
import LoadingIcon from "../../LoadingIcon";

import type { TCustomColumnFilter, TDataTableProperties } from "./types";
import type { ColumnDef } from "@tanstack/react-table";

const DataTable = <TData extends { id: string | number }>({
  columns = [],
  data,
  emptyTableMessage = "No results.",
  enableRowSelection = false,
  isLoading = false,
  fetchData,
  renderToolbarItems,
  renderTableFooterContent,
  renderCustomPagination,
  title,
  paginated = true,
  rowPerPage,
  rowPerPageOptions,
  visibleColumns = [],
  onRowSelectChange,
  totalRecords = 0,
  stripe = "none",
  ...tableOptions
}: TDataTableProperties<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<TCustomColumnFilter[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: rowPerPage || DEFAULT_PAGE_SIZE,
  });
  const [isFilterRowVisible, setIsFilterRowVisible] = useState(false);

  const handleColumnFilterChange = (event_: Updater<ColumnFiltersState>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setColumnFilters(event_ as any);
  };

  const parsedColumns = useMemo(
    () => getParsedColumns({ visibleColumns, columns }),
    [visibleColumns, columns],
  );

  const columnsWithRowSelection = useMemo(() => {
    if (!enableRowSelection) {
      return parsedColumns;
    }

    const columns: ColumnDef<TData>[] = [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onChange={() =>
              table.toggleAllPageRowsSelected(!table.getIsAllPageRowsSelected())
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onChange={() => row.toggleSelected(!row.getIsSelected())}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        align: "center",
      },
      ...parsedColumns,
    ];

    return columns;
  }, [parsedColumns]);

  const table = useReactTable({
    data,
    columns: columnsWithRowSelection,
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
    ...(!!fetchData && {
      pageCount: Math.ceil(totalRecords / pagination.pageSize),
    }),
    ...tableOptions,
  });

  const mappedSelectedRows = table.getFilteredSelectedRowModel();

  useEffect(() => {
    onRowSelectChange && onRowSelectChange(table);
  }, [mappedSelectedRows]);

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
      {title ? (
        <h6
          className="title"
          children={title.text}
          data-align={title.align || "center"}
        />
      ) : null}

      {renderToolbarItems ? (
        <TableToolbar children={renderToolbarItems(table)} />
      ) : null}

      <Table data-stripe={stripe}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="header-row">
              {headerGroup.headers.map(
                ({
                  column,
                  getContext,
                  id,
                  isPlaceholder,
                  colSpan,
                  rowSpan,
                }) => {
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

                  if (!isFilterRowVisible && column.getCanFilter()) {
                    setIsFilterRowVisible(true);
                  }

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
                      rowSpan={rowSpan}
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
          {isFilterRowVisible ? (
            <TableRow key={"filters"} className="filters">
              {table.getAllLeafColumns().map((column) => {
                if (!column.getCanFilter()) {
                  return <TableCell key={"filter" + column.id}></TableCell>;
                }

                const activeColumnClass = `${
                  column.getIsFiltered() ? "highlight" : ""
                }`;

                return (
                  <TableCell
                    key={"filter" + column.id}
                    data-label={column.id}
                    data-align={column.columnDef.align || "left"}
                    className={
                      (column.id ? `column-${column.id} ` : ``) +
                      activeColumnClass
                    }
                  >
                    <InputText
                      value={(column.getFilterValue() ?? "") as string}
                      onChange={(event) => {
                        column.setFilterValue(event.target.value);
                      }}
                    ></InputText>
                  </TableCell>
                );
              })}
            </TableRow>
          ) : null}

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
              <TableCell colSpan={columns.length}>
                {emptyTableMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        {renderTableFooterContent ? (
          <TableFooter children={renderTableFooterContent(table)} />
        ) : null}
      </Table>

      {paginated ? (
        <>
          {renderCustomPagination ? (
            renderCustomPagination(table)
          ) : (
            <div className="p-paginator-bottom p-paginator p-component">
              <Paginator
                first={pagination.pageIndex * pagination.pageSize}
                rows={pagination.pageSize}
                totalRecords={
                  fetchData
                    ? totalRecords
                    : table.getFilteredRowModel().rows?.length
                }
                rowsPerPageOptions={
                  rowPerPageOptions || DEFAULT_PAGE_PER_OPTIONS
                }
                onPageChange={(event) => {
                  const currentPageIndex = Math.ceil(event.first / event.rows);
                  setPagination({
                    pageIndex: currentPageIndex,
                    pageSize: event.rows,
                  });
                }}
              />
            </div>
          )}
        </>
      ) : null}

      {isLoading ? (
        <div className="loading-overlay">
          <LoadingIcon color="#55575f" fontSize={"0.5rem"}></LoadingIcon>
        </div>
      ) : null}
    </div>
  );
};

export { DataTable };
