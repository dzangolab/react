import React, { createContext, useCallback, useRef, useState } from "react";

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
  const [data, setData] = useState<T[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState<number>(0);
  const fetchIdReference = useRef(0);

  const fetchCallback = useCallback(
    async (requestJSON: TRequestJSON) => {
      const fetchId = ++fetchIdReference.current;
      try {
        if (fetchId === fetchIdReference.current) {
          setLoading(true);
          const data = await fetcher(requestJSON);
          setTotalItems(data.totalItems);
          setData(data.data);
        }
      } catch (error) {
        let message = "Unknown Error";
        if (error instanceof Error) message = error.message;
        setErrorMessage(message);
      } finally {
        setLoading(false);
      }
    },
    [fetcher]
  );

  return (
    <TableContext.Provider
      value={{ loading, data, totalItems, fetchCallback, ...rest }}
    >
      {children ? children : <BaseTable />}
    </TableContext.Provider>
  );
}

TableProvider.defaultProps = {
  enableMultiSort: false,
  filterIcons: {
    expanded: "🙉",
    notExpanded: "🙈",
  },
  fixedHeader: true,
  hideScrollBar: true,
  inputDebounceTime: 300,
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
