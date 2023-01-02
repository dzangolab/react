import { flexRender, SortDirection } from "@tanstack/react-table";
import React from "react";

import Filter from "./Filter";

import type { TableHeaderProperties } from "./types";

function TableHeader<T>({ sortable, table }: TableHeaderProperties<T>) {
  const renderSortButton = (
    direction: SortDirection | false,
    canSort: boolean
  ) => {
    switch (direction) {
      case "asc":
        return "🔼";
      case "desc":
        return "🔽";
      default:
        if (canSort) return "↕️";
        return "";
    }
  };

  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup, index) => (
        <tr key={headerGroup.id} className={`table-header-${index + 1}`}>
          {headerGroup.headers.map((header) => {
            const sortFunction = (event: any) => {
              event.stopPropagation();
              const sortHandler = header.column.getToggleSortingHandler();
              if (sortHandler) {
                sortHandler(event);
              }
            };

            return (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : (
                  <div
                    {...{
                      className: !sortable
                        ? ""
                        : header.column.getCanSort()
                        ? "disable-select"
                        : "",
                    }}
                    onClick={sortFunction}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {sortable ? (
                      <button className="sort-button">
                        {renderSortButton(
                          header.column.getIsSorted(),
                          header.column.getCanSort()
                        )}
                      </button>
                    ) : null}

                    {header.column.getCanFilter() ? (
                      <Filter column={header.column} table={table} />
                    ) : null}
                  </div>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}

export default TableHeader;
