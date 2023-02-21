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
            const { column, colSpan, getSize, id, isPlaceholder, getContext } =
              header;

            const sortFunction = (event: SyntheticEvent) => {
              event.stopPropagation();
              const sortHandler = header.column.getToggleSortingHandler();
              if (sortHandler) {
                sortHandler(event);
              }
            };

            return (
              <th key={id} colSpan={colSpan} style={{ width: getSize() }}>
                {isPlaceholder ? null : (
                  <div
                    {...{
                      className: !sortable
                        ? ""
                        : column.getCanSort()
                        ? "disable-select"
                        : "",
                    }}
                    onClick={sortFunction}
                  >
                    {flexRender(column.columnDef.header, getContext())}
                    {sortable ? (
                      <button className="sort-button">
                        {renderSortButton(
                          column.getIsSorted(),
                          column.getCanSort()
                        )}
                      </button>
                    ) : null}

                    {column.getCanFilter() ? (
                      <Filter
                        columnFilterValue={column.getFilterValue() as string}
                        columnType={table
                          .getPreFilteredRowModel()
                          .flatRows[0]?.getValue(column.id)}
                        handleChange={(value) => {
                          column.setFilterValue(value);
                        }}
                      />
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
