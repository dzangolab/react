import React, { useState, useEffect } from "react";

export interface PaginationProperties {
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
  defaultItemsPerPage?: number;
  showFirstLastButtons?: boolean;
  showPrevNextButtons?: boolean;
  className?: string;
  showItemsPerPageControl?: boolean;
  showPageInput?: boolean;
}

export const Pagination: React.FC<PaginationProperties> = ({
  currentPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 20],
  defaultItemsPerPage = itemsPerPageOptions[0],
  showFirstLastButtons = true,
  showPrevNextButtons: showPreviousNextButtons = true,
  className,
  showItemsPerPageControl = true,
  showPageInput = true,
}) => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(defaultItemsPerPage);
  const [customPage, setCustomPage] = useState<string>("");

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

  const handlePageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCustomPage(event.target.value);
  };

  const handlePageInputBlur = () => {
    const newPage = parseInt(customPage, 10) - 1;
    if (!isNaN(newPage) && newPage >= 0 && newPage < lastPage) {
      onPageChange(newPage);
    }
  };

  return (
    <div className={`pagination ${className || ""}`}>
      {showFirstLastButtons && currentPage > 0 && (
        <button className="first-page" onClick={() => onPageChange(0)}>
          <i className="pi pi-angle-double-left" />
        </button>
      )}

      {showPreviousNextButtons && currentPage > 0 && (
        <button
          className="previous-page"
          onClick={() => onPageChange(currentPage - 1)}
        >
          <i className="pi pi-angle-left" />
        </button>
      )}

      {pages.map((page) => (
        <button
          key={page}
          className={`page-button ${page === currentPage + 1 ? "active" : ""}`}
          onClick={() => onPageChange(page - 1)}
        >
          {page}
        </button>
      ))}

      {showPreviousNextButtons && currentPage < lastPage - 1 && (
        <button
          className="next-page"
          onClick={() => onPageChange(currentPage + 1)}
        >
          <i className="pi pi-angle-right" />
        </button>
      )}

      {showFirstLastButtons && currentPage < lastPage - 1 && (
        <button className="last-page" onClick={() => onPageChange(lastPage)}>
          <i className="pi pi-angle-double-right" />
        </button>
      )}

      {showItemsPerPageControl && (
        <div className="items-per-page-control">
          <span>Items per page:</span>
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {showPageInput && (
        <div className="page-input-control">
          <span>Go to page:</span>
          <input
            type="number"
            value={customPage}
            onChange={handlePageInputChange}
            onBlur={handlePageInputBlur}
          />
        </div>
      )}
    </div>
  );
};
