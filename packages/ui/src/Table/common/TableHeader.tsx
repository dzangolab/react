import { flexRender, SortDirection } from "@tanstack/react-table";
import React, { useContext, useMemo, useState } from "react";

import { DEFAULT_COL_SIZE } from "./constants";
import Filter from "./Filter";
import { TableContext } from "./TableContext";

import type { TSortIcons } from "./types";
import type { SyntheticEvent } from "react";

const renderSortButton = (
  canSort: boolean,
  direction: SortDirection | false,
  sortIcons?: TSortIcons
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

const sortFunction = (
  event: SyntheticEvent,
  sortable?: boolean,
  sortHandler?: (event: unknown) => void
) => {
  if (!sortable) return;
  event.stopPropagation();
  if (sortHandler) {
    sortHandler(event);
  }
};

function TableHeader() {
  const { sortable, sortIcons, table, filterMenuToggleIcon } =
    useContext(TableContext);
  if (!table) return null;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const lastHeaderGroup = useMemo(() => [...table.getHeaderGroups()].pop(), []);

  return (
    <>
      <colgroup>
        {lastHeaderGroup?.headers.map(({ getSize, id }) => (
          <col
            key={id}
            width={getSize() === DEFAULT_COL_SIZE ? "" : getSize()}
          />
        ))}
      </colgroup>
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
            {headerGroup.headers.map(
              ({ id, colSpan, isPlaceholder, column, getContext }) => {
                const getColumnTitleClass = () => {
                  let className = "";
                  if (!sortable) className = " disable-sort";
                  return className;
                };

                return (
                  <th key={id} colSpan={colSpan}>
                    {isPlaceholder ? null : (
                      <div
                        className={getColumnTitleClass()}
                        onClick={(event_) =>
                          sortFunction(
                            event_,
                            sortable,
                            column.getToggleSortingHandler()
                          )
                        }
                      >
                        {flexRender(column.columnDef.header, getContext())}
                        {sortable ? (
                          <button>
                            {renderSortButton(
                              column.getCanSort(),
                              column.getIsSorted(),
                              sortIcons
                            )}
                          </button>
                        ) : null}

                        {column.getCanFilter() ? (
                          <Filter column={column} table={table} />
                        ) : null}
                      </div>
                    )}
                  </th>
                );
              }
            )}
          </tr>
        ))}
      </thead>
    </>
  );
}

export default TableHeader;
