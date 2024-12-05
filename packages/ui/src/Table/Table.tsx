import {
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
import React, { useEffect, useMemo, useState } from "react";

import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_PER_OPTIONS,
  DEFAULT_PAGE_SIZE,
} from "./constants";
import { TableBody } from "./TableBody";
import { DataActionsMenu } from "./TableDataActions";
import { Table, TableFooter } from "./TableElements";
import { TableHeader } from "./TableHeader";
import { TableToolbar } from "./TableToolbar";
import { getRequestJSON, getParsedColumns } from "./utils";
import { Checkbox } from "../FormWidgets";
import LoadingIcon from "../LoadingIcon";
import { Pagination } from "../Pagination";

import type { TDataTableProperties } from "./types";
import type { ColumnDef } from "@tanstack/react-table";

const DataTable = <TData extends { id: string | number }>({
  className = "",
  columns = [],
  columnActionBtnLabel: columnActionButtonLabel = "Columns",
  customFormatters,
  data,
  dataActionsMenu,
  emptyTableMessage,
  enableRowSelection = false,
  id,
  isLoading = false,
  initialFilters = [],
  initialSorting = [],
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
  showColumnsAction = false,
  ...tableOptions
}: TDataTableProperties<TData>) => {
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
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

  const parsedColumns = useMemo(() => {
    let parsedColumns: ColumnDef<TData, unknown>[] = getParsedColumns({
      visibleColumns,
      columns,
    });

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

    if (
      (dataActionsMenu && visibleColumns.length === 0) ||
      (dataActionsMenu && visibleColumns.includes("actions"))
    ) {
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
  const totalItems = fetchData
    ? totalRecords
    : table.getFilteredRowModel().rows?.length;

  useEffect(() => {
    // client side rendering
    if (!fetchData && !paginated) {
      setPagination((previous) => ({
        ...previous,
        pageSize: data.length,
      }));
    }
  }, [fetchData, data, paginated]);

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

  useEffect(() => {
    if (visibleColumns.length !== 0) {
      table.setColumnOrder(["select", ...visibleColumns]);
    }
  }, [visibleColumns, parsedColumns]);

  useEffect(() => {
    if (!id) {
      return;
    }

    try {
      const savedState = localStorage.getItem(id);

      if (savedState) {
        const {
          columnFilters,
          columnVisibility,
          pagination,
          rowSelection,
          sorting,
        } = JSON.parse(savedState);

        // Note: order matters here
        if (columnFilters?.length) {
          setColumnFilters(columnFilters);
        }

        if (Object.entries(columnVisibility).length) {
          setColumnVisibility(columnVisibility);
        }

        if (Object.entries(rowSelection).length) {
          setRowSelection(rowSelection);
        }

        if (sorting?.length) {
          setSorting(sorting);
        }

        if (Object.entries(pagination).length) {
          setPagination(pagination);
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("Sorry, something went wrong", error);
    }
  }, [id]);

  useEffect(() => {
    return () => {
      if (id) {
        localStorage.setItem(
          id,
          JSON.stringify({
            columnFilters,
            columnVisibility,
            pagination,
            rowSelection,
            sorting,
          }),
        );
      }
    };
  }, [id, columnFilters, columnVisibility, pagination, rowSelection, sorting]);

  return (
    <div id={id} className={("dz-table-container " + className).trimEnd()}>
      {title ? (
        <span children={title.text} data-align={title.align || "center"} />
      ) : null}

      {showColumnsAction || renderToolbarItems ? (
        <TableToolbar
          table={table}
          showColumnsAction={showColumnsAction}
          columnActionButtonLabel={columnActionButtonLabel}
          dataActionsMenu={dataActionsMenu}
          renderToolbarItems={renderToolbarItems}
          enableRowSelection={enableRowSelection}
        />
      ) : null}

      <Table>
        <TableHeader
          table={table}
          renderSortIcons={renderSortIcons}
          inputDebounceTime={inputDebounceTime}
        />

        <TableBody
          table={table}
          parsedColumnsLength={parsedColumns.length}
          emptyTableMessage={emptyTableMessage}
          enableRowSelection={enableRowSelection}
          customFormatters={customFormatters}
        />

        {renderTableFooterContent ? (
          <TableFooter children={renderTableFooterContent(table)} />
        ) : null}
      </Table>

      {(!!fetchData || paginated) && totalItems > 0 ? (
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
