import React, { createContext, useCallback, useRef } from "react";

import adjustmentsIcon from "../../assets/images/adjustments.svg";
import arrowDownIcon from "../../assets/images/arrow-down.svg";
import arrowUpDownIcon from "../../assets/images/arrow-up-down.svg";
import arrowUpIcon from "../../assets/images/arrow-up.svg";
import chevronLeft from "../../assets/images/chevron-left.svg";
import chevronRight from "../../assets/images/chevron-right.svg";
import doubleChevronLeft from "../../assets/images/double-chevron-left.svg";
import doubleChevronRight from "../../assets/images/double-chevron-right.svg";
import filterIcon from "../../assets/images/filter.svg";
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
  isLoading: false,
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
  filterIcons: {
    expanded: filterIcon,
    notExpanded: filterIcon,
  },
  filterMenuToggleIcon: adjustmentsIcon,
  fixedHeader: true,
  hideScrollBar: true,
  inputDebounceTime: 300,
  paginated: true,
  paginationIcons: {
    start: doubleChevronLeft,
    previous: chevronLeft,
    next: chevronRight,
    end: doubleChevronRight,
  },
  rowsPerPageOptions: [10, 20, 30],
  showLoading: true,
  showPageControl: true,
  showTotalNumber: true,
  sortable: true,
  sortIcons: {
    asc: arrowUpIcon,
    desc: arrowDownIcon,
    default: arrowUpDownIcon,
  },
};

export default TableProvider;
