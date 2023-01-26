import { flexRender, SortDirection } from "@tanstack/react-table";
import React, { useContext } from "react";

import Filter from "./Filter";
import { TableContext } from "./TableProvider";

import type { TableHeaderProperties } from "./types";
import type { SyntheticEvent } from "react";

function TableHeader<T>({ table }: TableHeaderProperties<T>) {
  const { sortable, sortIcons } = useContext(TableContext);

  const renderSortButton = (
    direction: SortDirection | false,
    canSort: boolean
  ) => {
    switch (direction) {
      case "asc":
        return sortIcons?.asc;
      case "desc":
        return sortIcons?.desc;
      default:
        return canSort ? sortIcons?.default : "";
    }
  };

  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup, index) => (
        <tr key={headerGroup.id} className={`table-header-${index + 1}`}>
          {headerGroup.headers.map((header) => {
            const sortFunction = (event: SyntheticEvent) => {
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
