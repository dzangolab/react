import { flexRender, Table } from "@tanstack/react-table";
import React, { SyntheticEvent, useCallback, useState } from "react";

import { DebouncedInput } from "@/FormWidgets";

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

export const TableHeader = <TData extends { id: string | number }>({
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
                    return <i className="pi pi-arrow-down"></i>;
                  case "desc":
                    return <i className="pi pi-arrow-up"></i>;
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
    </TTableHeader>
  );
};
