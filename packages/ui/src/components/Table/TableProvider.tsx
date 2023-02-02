import React, { createContext, useCallback, useRef } from "react";

import BaseTable from "./BaseTable";

import type {
  TableContextProperties,
  TableProviderProperties,
  TRequestJSON,
} from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableContext = createContext<TableContextProperties<any>>({
  columns: [],
  data: [],
  loading: false,
  totalItems: 0,
  fetchCallback: () => {
    return;
  },
});

function TableProvider<T>({
  fetcher,
  children,
  ...rest
}: TableProviderProperties<T>) {
  const fetchIdReference = useRef(0);

  const fetchCallback = useCallback(
    async (requestJSON: TRequestJSON) => {
      const fetchId = ++fetchIdReference.current;
      if (fetchId === fetchIdReference.current) {
        fetcher(requestJSON);
      }
    },
    [fetcher]
  );

  return (
    <TableContext.Provider value={{ fetchCallback, ...rest }}>
      {children ? children : <BaseTable />}
    </TableContext.Provider>
  );
}

TableProvider.defaultProps = {
  enableMultiSort: false,
  filterDebounceTime: 300,
  filterIcons: {
    expanded: "🙉",
    notExpanded: "🙈",
  },
  fixedHeader: true,
  hideScrollBar: true,
  paginated: true,
  paginationIcons: {
    start: "<<",
    previous: "<",
    next: ">",
    end: ">>",
  },
  rowsPerPageOptions: [10, 20, 30],
  showLoading: true,
  showPageControl: true,
  showTotalNumber: true,
  sortable: true,
  sortIcons: {
    asc: "🔼",
    desc: "🔽",
    default: "↕️",
  },
};

export default TableProvider;
