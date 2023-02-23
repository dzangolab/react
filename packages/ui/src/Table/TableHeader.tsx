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

  const lastHeaderGroup = [...table.getHeaderGroups()].pop();

  return (
    <>
      {lastHeaderGroup?.headers.map(({ getSize, id }) => (
        <col key={id} width={getSize() ? getSize() : ""} />
      ))}
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
                if (!sortable) return;
                event.stopPropagation();
                const sortHandler = header.column.getToggleSortingHandler();
                if (sortHandler) {
                  sortHandler(event);
                }
              };

              const getColumnTitleClass = () => {
                let className = "";
                if (!sortable) className = " disable-sort";
                return "column-title" + className;
              };

              return (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={getColumnTitleClass()}
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
    </>
  );
}

export default TableHeader;
