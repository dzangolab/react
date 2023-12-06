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
import { Button } from "primereact/button";
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
  TooltipWrapper,
} from "./TableElements";
import { getRequestJSON, getParsedColumns } from "./utils";
import { Checkbox, DebouncedInput, Popup, SortableList } from "../../";
import LoadingIcon from "../../LoadingIcon";
import { Pagination } from "../../Pagination";

import type { TCustomColumnFilter, TDataTableProperties } from "./types";
import type { Cell, Column, ColumnDef } from "@tanstack/react-table";

const DataTable = <TData extends { id: string | number }>({
  border = "grid",
  className = "",
  columns = [],
  columnActionBtnLabel: columnActionButtonLabel = "Columns",
  data,
  emptyTableMessage = "No results.",
  enableRowSelection = false,
  id,
  isLoading = false,
  initialFilters = [],
  inputDebounceTime,
  fetchData,
  renderToolbarItems,
  renderTableFooterContent,
  renderCustomPagination,
  renderSortIcons,
  title,
  paginated = true,
  rowPerPage,
  rowPerPageOptions = DEFAULT_PAGE_PER_OPTIONS,
  visibleColumns = [],
  onRowSelectChange,
  totalRecords = 0,
  paginationOptions,
  stripe = "none",
  showColumnsAction = false,
  ...tableOptions
}: TDataTableProperties<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<TCustomColumnFilter[]>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialFilters as any,
  );
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

  useEffect(() => {
    if (visibleColumns.length !== 0) {
      table.setColumnOrder(["select", ...visibleColumns]);
    }
  }, [visibleColumns, columnsWithRowSelection]);

  const renderTooltipContent = (
    cell: Cell<TData, unknown>,
  ): React.ReactNode => {
    if (typeof cell.column.columnDef.tooltip === "string") {
      return cell.column.columnDef.tooltip;
    } else if (typeof cell.column.columnDef.tooltip === "function") {
      return cell.column.columnDef.tooltip(cell);
    }

    return cell.getValue() as string;
  };

  const totalItems = fetchData
    ? totalRecords
    : table.getFilteredRowModel().rows?.length;

  return (
    <div
      id={id}
      data-border={border}
      className={"table-container " + className}
    >
      {title ? (
        <h6
          className="title"
          children={title.text}
          data-align={title.align || "center"}
        />
      ) : null}

      {showColumnsAction || renderToolbarItems ? (
        <TableToolbar
          children={
            <>
              {showColumnsAction ? (
                <Popup
                  trigger={<Button label={columnActionButtonLabel} />}
                  content={
                    <SortableList
                      items={table
                        .getAllLeafColumns()
                        .filter((column) => column.id !== "select")
                        .map((column, index) => ({
                          id: index,
                          data: column,
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          render: (data: any) => {
                            let header = data.columnDef.header;

                            if (typeof data.columnDef.header === "function") {
                              header = data.columnDef.header();
                            }

                            return (
                              <>
                                <Checkbox
                                  checked={data.getIsVisible()}
                                  onClick={() => data.toggleVisibility()}
                                  label={header}
                                ></Checkbox>
                              </>
                            );
                          },
                        }))}
                      onSort={(sorted) => {
                        table.setColumnOrder([
                          ...(enableRowSelection ? ["select"] : []),
                          ...sorted.map((item) => item.data.id),
                        ]);
                      }}
                    />
                  }
                />
              ) : null}

              {renderToolbarItems ? renderToolbarItems(table) : null}
            </>
          }
        />
      ) : null}

      <Table data-stripe={stripe}>
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

                  if (!isFilterRowVisible && column.getCanFilter()) {
                    setIsFilterRowVisible(true);
                  }

                  const getSortIcon = () => {
                    if (renderSortIcons) {
                      return renderSortIcons(getIsSorted());
                    }

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
                        {isPlaceholder ? null : (
                          <>
                            {flexRender(columnDef.header, getContext())}

                            {getCanSort() ? (
                              <span className="sort-state">
                                {getSortIcon()}
                              </span>
                            ) : null}
                          </>
                        )}
                      </>
                    </ColumnHeader>
                  );
                },
              )}
            </TableRow>
          ))}

          {isFilterRowVisible ? (
            <TableRow key={"filters"} className={`header-row filters`}>
              {table.getVisibleLeafColumns().map((column) => {
                if (!column.getCanFilter()) {
                  return <TableCell key={"filter" + column.id}></TableCell>;
                }

                const activeColumnClass = `${
                  column.getIsFiltered() ? "highlight" : ""
                }`;

                return (
                  <ColumnHeader
                    key={"filter" + column.id}
                    data-label={column.id}
                    data-align={column.columnDef.align || "left"}
                    className={
                      (column.id ? `column-${column.id} ` : ``) +
                      activeColumnClass
                    }
                  >
                    <DebouncedInput
                      defaultValue={column.getFilterValue() as string}
                      onInputChange={(value) => {
                        column.setFilterValue(value);
                      }}
                      placeholder={column.columnDef.filterPlaceholder || ""}
                      debounceTime={inputDebounceTime}
                    ></DebouncedInput>
                  </ColumnHeader>
                );
              })}
            </TableRow>
          ) : null}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                data-id={row.original.id ?? row.id}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      data-label={cell.column.id}
                      data-align={cell.column.columnDef.align || "left"}
                      className={
                        cell.column.id ? `column-${cell.column.id}` : ``
                      }
                    >
                      {cell.column.columnDef.tooltip ? (
                        <TooltipWrapper
                          tooltipOptions={{
                            children: renderTooltipContent(cell),
                            ...cell.column.columnDef?.tooltipOptions,
                          }}
                          cellContent={flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        ></TooltipWrapper>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columnsWithRowSelection.length}>
                {emptyTableMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        {renderTableFooterContent ? (
          <TableFooter children={renderTableFooterContent(table)} />
        ) : null}
      </Table>

      {paginated && totalItems > 0 ? (
        <>
          {renderCustomPagination ? (
            renderCustomPagination(table)
          ) : (
            <Pagination
              currentPage={pagination.pageIndex}
              defaultItemsPerPage={pagination.pageSize}
              onPageChange={(currentPage) => {
                table.setPageIndex(currentPage);
              }}
              itemsPerPageOptions={rowPerPageOptions}
              onItemsPerPageChange={(itemsPerPage) => {
                table.setPageSize(itemsPerPage);
              }}
              totalItems={totalItems}
              {...paginationOptions}
            ></Pagination>
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
