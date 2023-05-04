import React, { useContext } from "react";
import { DebounceInput } from "react-debounce-input";

import { DEFAULT_PAGE_SIZE } from "./constants";
import { TableContext } from "./TableContext";

import type { TTableDetail } from "./types";

const TableDetail = ({ detail, showPrefix }: TTableDetail) => {
  const {
    inputDebounceTime,
    paginationState,
    rowsPerPageOptions,
    showPageControl,
    showTotalNumber,
    table,
    totalItems,
  } = useContext(TableContext);

  const pageIndex = table?.getState().pagination.pageIndex || 0;

  return (
    <div>
      {showTotalNumber ? (
        <span>
          <strong>{`${pageIndex + 1} of ${table?.getPageCount()} `}</strong>
        </span>
      ) : null}

      {showPageControl ? (
        <div>
          <span>{detail}</span>
          <DebounceInput
            type="number"
            debounceTimeout={inputDebounceTime}
            value={pageIndex + 1}
            max={table?.getPageCount()}
            min={1}
            onChange={(event_) => {
              const page = event_.target.value
                ? Number(event_.target.value) - 1
                : 0;
              if (paginationState?.pageIndex !== page) {
                table?.setPageIndex(page);
              }
            }}
            disabled={table?.getPageCount() === 1}
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
              <option
                key={pageSize}
                value={pageSize}
                disabled={
                  !(totalItems
                    ? totalItems > pageSize - DEFAULT_PAGE_SIZE
                    : false)
                }
              >
                {showPrefix} {pageSize}
              </option>
            ))}
          </select>
        </div>
      ) : null}
    </div>
  );
};

export default TableDetail;
