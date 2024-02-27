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
import { DataActionsMenu } from "./TableDataActions";
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
import {
  getRequestJSON,
  getParsedColumns,
  formatNumber,
  formatDate,
} from "./utils";
import { Checkbox, DebouncedInput, Popup, SortableList } from "..";
import { Button } from "../Buttons/ButtonBasic";
import LoadingIcon from "../LoadingIcon";
import { Pagination } from "../Pagination";

import type {
  CellAlignmentType,
  CellDataType,
  TDataTableProperties,
} from "./types";
import type { Cell, ColumnDef, NoInfer } from "@tanstack/react-table";

const DataTable = <TData extends { id: string | number }>({
  border = "grid",
  className = "",
  columns = [],
  columnActionBtnLabel: columnActionButtonLabel = "Columns",
  customFormatters = {},
  data,
  dataActionsMenu,
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
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialFilters,
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: rowPerPage || DEFAULT_PAGE_SIZE,
  });
  const [isFilterRowVisible, setIsFilterRowVisible] = useState(false);

  const handleColumnFilterChange = (event_: Updater<ColumnFiltersState>) => {
    const updatedColumnFilter =
      typeof event_ === "function" ? event_(columnFilters) : event_;

    if (!Array.isArray(updatedColumnFilter)) {
      return [];
    }

    const updatedFilters = updatedColumnFilter.map((filter) => {
      const column = table.getColumn(filter.id);

      return {
        ...filter,
        filterFn: column?.columnDef.meta?.serverFilterFn,
      };
    });

    setColumnFilters(updatedFilters);
    table.setPageIndex(0);
  };

  const getAlignValue = ({
    align,
    dataType,
  }: {
    align?: CellAlignmentType;
    dataType?: CellDataType;
    header?: boolean;
  }) => {
    if (align) {
      return align;
    }

    if (dataType == "other") {
      return "center";
    } else if (dataType == "number" || dataType == "currency") {
      return "right";
    } else {
      return "left";
    }
  };

  const parsedColumns = useMemo(() => {
    let parsedColumns: ColumnDef<TData, unknown>[] = getParsedColumns({
      visibleColumns,
      columns,
    });

    const defaultActionColumn: ColumnDef<TData, unknown> = {
      id: "actions",
      header: () => <i className="pi pi-cog"></i>,
      align: "center",
      cell: ({ row: { original } }) => {
        return (
          <DataActionsMenu
            {...(typeof dataActionsMenu === "function"
              ? dataActionsMenu(original)
              : dataActionsMenu)}
            data={original}
          />
        );
      },
    };

    if (enableRowSelection) {
      parsedColumns = [
        {
          id: "select",
          header: ({ table }) => (
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              onChange={() =>
                table.toggleAllPageRowsSelected(
                  !table.getIsAllPageRowsSelected(),
                )
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
    }

    if (dataActionsMenu) {
      parsedColumns = [...parsedColumns, defaultActionColumn];
    }

    return parsedColumns;
  }, [visibleColumns, columns]);

  const table = useReactTable({
    data,
    columns: parsedColumns,
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
  }, [
    columnFilters,
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
    fetchData,
  ]);

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
      table.setColumnOrder(["select", ...visibleColumns, "actions"]);
    }
  }, [visibleColumns, parsedColumns]);

  const renderTooltipContent = (
    cell: Cell<TData, unknown>,
  ): React.ReactNode => {
    const tooltip = cell.column.columnDef.tooltip;

    if (typeof tooltip === "string") {
      return tooltip;
    } else if (typeof tooltip === "function") {
      return tooltip(cell);
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
      className={("dz-table-container " + className).trimEnd()}
    >
      {title ? (
        <span children={title.text} data-align={title.align || "center"} />
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
                        .filter(
                          (column) =>
                            column.id !== "select" && column.id !== "actions",
                        )
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
                          ...(dataActionsMenu ? ["actions"] : []),
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
                      className={`column-${id} ${
                        columnDef.className || ""
                      } ${activeColumnClass} ${
                        columnDef.enableSorting ? "sortable" : ""
                      }`
                        .replace(/\s\s/, " ")
                        .trimEnd()}
                      data-align={getAlignValue({
                        align: columnDef.align,
                        dataType: columnDef.dataType,
                      })}
                      style={{
                        width: columnDef.width,
                        maxWidth: columnDef.maxWidth,
                        minWidth: columnDef.minWidth,
                      }}
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
                  return (
                    <ColumnHeader key={"filter" + column.id}></ColumnHeader>
                  );
                }

                const activeColumnClass = `${
                  column.getIsFiltered() ? "highlight" : ""
                }`;

                return (
                  <ColumnHeader
                    key={"filter" + column.id}
                    data-label={column.id}
                    data-align={getAlignValue({
                      align: column.columnDef.align,
                      dataType: column.columnDef.dataType,
                    })}
                    style={{
                      width: column.columnDef.width,
                      maxWidth: column.columnDef.maxWidth,
                      minWidth: column.columnDef.minWidth,
                    }}
                    className={`${
                      column.id ? `column-${column.id}` : ``
                    } ${activeColumnClass} ${column.columnDef.className || ""}`
                      .replace(/\s\s/, " ")
                      .trimEnd()}
                  >
                    {column.columnDef.customFilterComponent ? (
                      column.columnDef.customFilterComponent(column)
                    ) : (
                      <DebouncedInput
                        defaultValue={column.getFilterValue() as string}
                        onInputChange={(value) => {
                          column.setFilterValue(value);
                        }}
                        placeholder={column.columnDef.filterPlaceholder || ""}
                        debounceTime={inputDebounceTime}
                      ></DebouncedInput>
                    )}
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
                {...(enableRowSelection && {
                  "data-selected": row.getIsSelected(),
                })}
                data-id={row.original.id ?? row.id}
              >
                {row.getVisibleCells().map((cell) => {
                  const getFormatedValueContext: typeof cell.getContext =
                    () => {
                      const cellContext = cell.getContext();
                      const renderValue = cellContext.getValue;
                      const dateOptions = cell.column.columnDef.dateOptions;
                      const numberOptions = cell.column.columnDef.numberOptions;

                      const getFormattedValue = (): NoInfer<never> => {
                        const defaultCustomFormatters: Record<
                          string,
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (value: any) => NoInfer<never>
                        > = {
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          number: (value: any) =>
                            formatNumber({
                              value: Number(value),
                              locale: numberOptions?.locale,
                              formatOptions: numberOptions?.formatOptions,
                            }) as NoInfer<never>,
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          date: (value: any) =>
                            formatDate({
                              date: value as Date,
                              locale: dateOptions?.locale,
                              formatOptions: dateOptions?.formatOptions,
                            }) as NoInfer<never>,
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          currency: (value: any) =>
                            formatNumber({
                              value: Number(value),
                              locale: numberOptions?.locale,
                              formatOptions: {
                                style: "currency",
                                currency: "USD",
                                ...(numberOptions?.formatOptions &&
                                  numberOptions.formatOptions),
                              },
                            }) as NoInfer<never>,
                          ...customFormatters,
                        };

                        const dataType: string =
                          cell.column.columnDef.dataType || "text";

                        return (
                          defaultCustomFormatters?.[dataType]?.(
                            renderValue(),
                          ) || renderValue()
                        );
                      };

                      return {
                        ...cellContext,
                        renderValue: () => getFormattedValue(),
                        getValue: () => getFormattedValue(),
                      };
                    };

                  return (
                    <TableCell
                      key={cell.id}
                      data-label={cell.column.id}
                      data-align={getAlignValue({
                        align: cell.column.columnDef.align,
                        dataType: cell.column.columnDef.dataType,
                      })}
                      className={`${
                        cell.column.id ? `cell-${cell.column.id}` : ``
                      } ${cell.column.columnDef.className || ""}`
                        .replace(/\s\s/, " ")
                        .trimEnd()}
                      style={{
                        width: cell.column.columnDef.width,
                        maxWidth: cell.column.columnDef.maxWidth,
                        minWidth: cell.column.columnDef.minWidth,
                      }}
                    >
                      {cell.column.columnDef.tooltip ? (
                        <TooltipWrapper
                          tooltipOptions={{
                            children: renderTooltipContent(cell),
                            ...cell.column.columnDef?.tooltipOptions,
                          }}
                          cellContent={flexRender(
                            cell.column.columnDef.cell,
                            getFormatedValueContext(),
                          )}
                        ></TooltipWrapper>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          getFormatedValueContext(),
                        )
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={parsedColumns.length}>
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
