import { createContext } from "react";

import {
  DEFAULT_COLUMNS_DATA,
  DEFAULT_TABLE_DATA,
  DEFAULT_TOTAL_ITEMS,
} from "./constants";

import type { TableContextProperties } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableContext = createContext<TableContextProperties<any>>({
  columns: DEFAULT_COLUMNS_DATA,
  data: DEFAULT_TABLE_DATA,
  isLoading: false,
  totalItems: DEFAULT_TOTAL_ITEMS,
  fetcher: () => {
    return;
  },
});
