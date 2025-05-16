import { flexRender, RowData, Table } from "@tanstack/react-table";
import React, { SyntheticEvent, useCallback, useState } from "react";

import { DatePicker, DebouncedInput, Select } from "@/FormWidgets";

import {
  ColumnHeader,
  TableHeader as TTableHeader,
  TableRow,
} from "./TableElements";
import { getAlignValue } from "./utils";

import type { TDataTableProperties } from "./types";

interface THeaderProperty<T>
  extends Pick<
    TDataTableProperties<T>,
    "renderSortIcons" | "inputDebounceTime"
  > {
  table: Table<T>;
}

export const TableHeader = <TData extends RowData>({
  inputDebounceTime,
  renderSortIcons,
  table,
}: THeaderProperty<TData>) => {
  const [isFilterRowVisible, setIsFilterRowVisible] = useState(false);

  const handleSort = useCallback(
    (event: SyntheticEvent, sortHandler?: (event: SyntheticEvent) => void) => {
      event.stopPropagation();
      if (sortHandler) {
        sortHandler(event);
      }
    },
    [],
  );

  const getFormattedDate = (date: Date | null) => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const convertFilterValueToDate = (filterValue: string[] | null) => {
    if (Array.isArray(filterValue)) {
      return filterValue.filter(Boolean).map((value) => new Date(value));
    }

    return null;
  };
  const renderHeaderRow = () =>
    table.getHeaderGroups().map((headerGroup) => (
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
                  return <i className="pi pi-sort-up-fill"></i>;
                case "desc":
                  return <i className="pi pi-sort-down-fill"></i>;
                default:
                  return <i className="pi pi-sort"></i>;
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
                        <span className="sort-state">{getSortIcon()}</span>
                      ) : null}
                    </>
                  )}
                </>
              </ColumnHeader>
            );
          },
        )}
      </TableRow>
    ));

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderColumnFilter = (column: any) => {
    if (column.columnDef.customFilterComponent) {
      return column.columnDef.customFilterComponent(column);
    }

    const columnFilterValue = column.getFilterValue();
    const variant = column.columnDef.meta?.filterVariant;

    if (variant === "multiselect") {
      return (
        <Select
          name="multiselect"
          placeholder={column.columnDef.filterPlaceholder || ""}
          options={column.columnDef.meta?.filterOptions || []}
          value={(columnFilterValue as string[]) || []}
          onChange={(value) => column.setFilterValue(value)}
          multiple
        />
      );
    }

    if (variant === "dateRange") {
      return (
        <DatePicker
          inputRef={null}
          name="date-range"
          onChange={(date) => {
            if (date) {
              const _date = (date as Date[])
                .map(getFormattedDate)
                .filter((d) => d !== null);
              column.setFilterValue(_date);
            } else {
              column.setFilterValue(null);
            }
          }}
          value={convertFilterValueToDate(column.getFilterValue() as string[])}
          selectionMode="range"
        />
      );
    }

    return (
      <DebouncedInput
        defaultValue={columnFilterValue as string}
        onInputChange={(value) => column.setFilterValue(value)}
        placeholder={column.columnDef.filterPlaceholder || ""}
        debounceTime={inputDebounceTime}
      />
    );
  };

  const renderFilterRow = () => {
    if (!isFilterRowVisible) return null;

    return (
      <TableRow key="filters" className="header-row filters">
        {table.getVisibleLeafColumns().map((column) => {
          if (!column.getCanFilter()) {
            return <ColumnHeader key={"filter" + column.id}></ColumnHeader>;
          }
          const activeColumnClass = `${
            column.getIsFiltered() ? "highlight" : ""
          }`;

          const filterColumnClass = `${column.getCanFilter() ? `filter ${column.columnDef.meta?.filterVariant}` : ""}`;

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
              } ${activeColumnClass} ${column.columnDef.className || ""} ${filterColumnClass}`
                .replace(/\s\s/, " ")
                .trimEnd()}
            >
              {renderColumnFilter(column)}
            </ColumnHeader>
          );
        })}
      </TableRow>
    );
  };

  return (
    <TTableHeader>
      {renderHeaderRow()}
      {renderFilterRow()}
    </TTableHeader>
  );
};
