import React, { useState, useEffect, useCallback } from "react";

import { DebouncedInput } from "..";

export interface PaginationProperties {
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
  itemsPerPageControlLabel?: string;
  defaultItemsPerPage?: number;
  showFirstLastButtons?: boolean;
  showPreviousNextButtons?: boolean;
  showPageButtons?: boolean;
  className?: string;
  pageInputLabel?: string;
  showItemsPerPageControl?: boolean;
  showPageInput?: boolean;
}

export const Pagination: React.FC<PaginationProperties> = ({
  currentPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 20, 30],
  itemsPerPageControlLabel = "Items per page",
  pageInputLabel = "Go to page:",
  defaultItemsPerPage = itemsPerPageOptions[0],
  showFirstLastButtons = true,
  showPageButtons = false,
  showPreviousNextButtons = true,
  className,
  showItemsPerPageControl = true,
  showPageInput = true,
}) => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(defaultItemsPerPage);

  useEffect(() => {
    setItemsPerPage(defaultItemsPerPage);
    onPageChange(0);
  }, [defaultItemsPerPage]);

  const lastPage = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: lastPage }, (_, index) => index + 1);

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    onItemsPerPageChange && onItemsPerPageChange(newItemsPerPage);
  };

  const handlePageInputChange = useCallback(
    (value: string | number | readonly string[]) => {
      const newPage = parseInt(value.toString(), 10) - 1;

      if (!isNaN(newPage) && newPage >= 0 && newPage < lastPage) {
        onPageChange(newPage);
      }
    },
    [lastPage, onPageChange],
  );

  const pageStatics = <span> {`${currentPage + 1} / ${lastPage}`}</span>;

  return (
    <div className={`pagination ${className || ""}`}>
      {showItemsPerPageControl && (
        <div className="items-per-page-control">
          <span>{itemsPerPageControlLabel}</span>
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {lastPage > 1 && showPageInput && (
        <div className="page-input-control">
          <span>{pageInputLabel}</span>
          <DebouncedInput type="number" onInputChange={handlePageInputChange} />
        </div>
      )}
      {lastPage > 1 ? (
        <div className="buttons-wrapper">
          {showFirstLastButtons || showPreviousNextButtons ? (
            <div>
              {showFirstLastButtons && (
                <button
                  className="first-page"
                  onClick={() => onPageChange(0)}
                  disabled={!(currentPage > 0)}
                >
                  <i className="pi pi-angle-double-left" />
                </button>
              )}

              {showPreviousNextButtons && (
                <button
                  className="previous-page"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={!(currentPage > 0)}
                >
                  <i className="pi pi-angle-left" />
                </button>
              )}
            </div>
          ) : null}

          <div>
            {showPageButtons
              ? pages.map((page) => (
                  <button
                    key={page}
                    className={`page-button ${
                      page === currentPage + 1 ? "active" : ""
                    }`}
                    onClick={() => onPageChange(page - 1)}
                  >
                    {page}
                  </button>
                ))
              : pageStatics}
          </div>

          {showFirstLastButtons || showPreviousNextButtons ? (
            <div>
              {showPreviousNextButtons && (
                <button
                  className="next-page"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={!(currentPage < lastPage - 1)}
                >
                  <i className="pi pi-angle-right" />
                </button>
              )}

              {showFirstLastButtons && (
                <button
                  className="last-page"
                  onClick={() => onPageChange(lastPage - 1)}
                  disabled={!(currentPage < lastPage - 1)}
                >
                  <i className="pi pi-angle-double-right" />
                </button>
              )}
            </div>
          ) : null}
        </div>
      ) : (
        pageStatics
      )}
    </div>
  );
};
