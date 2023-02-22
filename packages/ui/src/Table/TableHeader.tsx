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
            const { column, colSpan, getSize, id, isPlaceholder, getContext } =
              header;

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
              <th
                key={header.id}
                colSpan={header.colSpan}
                style={{ width: header.getSize() }}
              >
                {header.isPlaceholder ? null : (
                  <div className={getColumnTitleClass()} onClick={sortFunction}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
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
                        columnType={
                          typeof table
                            .getPreFilteredRowModel()
                            .flatRows[0]?.getValue(column.id)
                        }
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
