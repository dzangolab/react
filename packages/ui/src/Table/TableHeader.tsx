import { flexRender, SortDirection } from "@tanstack/react-table";
import React, { useContext, useState } from "react";

import Filter from "./Filter";
import { TableContext } from "./TableProvider";

import type { TableHeaderProperties } from "./types";
import type { SyntheticEvent } from "react";

function TableHeader<T>({ table }: TableHeaderProperties<T>) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { sortable, sortIcons, filterMenuToggleIcon } =
    useContext(TableContext);

  const renderSortButton = (
    direction: SortDirection | false,
    canSort: boolean
  ) => {
    switch (direction) {
      case "asc":
        return <img src={sortIcons?.asc} />;
      case "desc":
        return <img src={sortIcons?.desc} />;
      default:
        return canSort ? <img src={sortIcons?.default} /> : "";
    }
  };

  return (
    <thead className={`${isCollapsed ? "active" : ""}`}>
      <tr>
        <th>
          <button onClick={() => setIsCollapsed(!isCollapsed)}>
            <img src={filterMenuToggleIcon} />
          </button>
        </th>
      </tr>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const sortFunction = (event: SyntheticEvent) => {
              event.stopPropagation();
              const sortHandler = header.column.getToggleSortingHandler();
              if (sortHandler) {
                sortHandler(event);
              }
            };

            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                style={{ width: header.getSize() }}
              >
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
