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

  return (
    <TTableHeader>
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
      ))}

      {isFilterRowVisible ? (
        <TableRow key={"filters"} className={`header-row filters`}>
          {table.getVisibleLeafColumns().map((column) => {
            if (!column.getCanFilter()) {
              return <ColumnHeader key={"filter" + column.id}></ColumnHeader>;
            }

            const activeColumnClass = `${
              column.getIsFiltered() ? "highlight" : ""
            }`;

            const filterColumnClass = `${column.getCanFilter() ? `filter ${column.columnDef.meta?.filterVariant}` : ""}`;

            const columnFilterValue = column.getFilterValue();

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
                {column.columnDef.customFilterComponent ? (
                  column.columnDef.customFilterComponent(column)
                ) : column.columnDef.meta?.filterVariant === "multiselect" ? (
                  <Select
                    name="multiselect"
                    placeholder={column.columnDef.filterPlaceholder || ""}
                    options={column.columnDef.meta?.filterOptions || []}
                    value={(columnFilterValue as string[]) || []}
                    onChange={(value) => {
                      column.setFilterValue(value);
                    }}
                    multiple={true}
                  />
                ) : column.columnDef.meta?.filterVariant === "dateRange" ? (
                  <DatePicker
                    inputRef={null}
                    name="date-range"
                    onChange={(date) => {
                      if (Array.isArray(date)) {
                        const normalizedRange = date.map((d) => {
                          if (!d) return null;

                          const year = d.getFullYear();
                          const month = String(d.getMonth() + 1).padStart(
                            2,
                            "0",
                          );
                          const day = String(d.getDate()).padStart(2, "0");

                          return `${year}-${month}-${day}`;
                        });
                        column.setFilterValue(normalizedRange);
                      } else {
                        column.setFilterValue(date);
                      }
                    }}
                    value={
                      Array.isArray(column.getFilterValue())
                        ? (column.getFilterValue() as string[])
                            .filter((d): d is string => Boolean(d))
                            .map((d) => new Date(d))
                        : (column.getFilterValue() as Date | null)
                    }
                    selectionMode="range"
                  />
                ) : (
                  <DebouncedInput
                    defaultValue={columnFilterValue as string}
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
    </TTableHeader>
  );
};
