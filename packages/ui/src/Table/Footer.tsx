import React, { useContext } from "react";
import { DebounceInput } from "react-debounce-input";

import Pagination from "./Pagination";
import { TableContext } from "./TableProvider";

const Footer = () => {
  const {
    inputDebounceTime,
    paginated,
    paginationState,
    rowsPerPageOptions,
    showPageControl,
    showTotalNumber,
    table,
  } = useContext(TableContext);

  const pageIndex = table?.getState().pagination.pageIndex || 0;

  return (
    <div>
      <div>
        {showTotalNumber ? (
          <span>
            <strong>{`${pageIndex + 1} of ${table?.getPageCount()} `}</strong>
          </span>
        ) : null}

        {showPageControl ? (
          <div>
            <span> Go to page:</span>
            <DebounceInput
              type="number"
              debounceTimeout={inputDebounceTime}
              value={pageIndex + 1}
              disabled={!table?.getCanNextPage()}
              onChange={(event_) => {
                const page = event_.target.value
                  ? Number(event_.target.value) - 1
                  : 0;
                if (paginationState?.pageIndex !== page) {
                  table?.setPageIndex(page);
                }
              }}
            />

            <select
              value={table?.getState().pagination.pageSize}
              onChange={(event_) => {
                const limit = Number(event_.target.value);
                if (paginationState?.pageSize !== limit) {
                  table?.setPageSize(limit);
                }
              }}
            >
              {rowsPerPageOptions?.map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        ) : null}
      </div>
      {paginated ? <Pagination /> : null}
    </div>
  );
};

export default Footer;
