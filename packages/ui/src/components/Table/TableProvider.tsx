import React, { createContext, useCallback, useRef, useState } from "react";

import BaseTable from "./BaseTable";

import type {
  TableContextProperties,
  TableProviderProperties,
  TRequestJSON,
} from "./types";

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
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string>();
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
        setError(message);
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
  filterDebounceTime: 300,
  fixedHeader: true,
  hideScrollBar: true,
  paginated: true,
  rowsPerPageOptions: [10, 20, 30],
  showLoading: true,
  showPageControl: true,
  showTotalNumber: true,
  sortable: true,
};

export default TableProvider;
