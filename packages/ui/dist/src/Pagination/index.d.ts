import React from "react";
export interface PaginationProperties {
    currentPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange?: (itemsPerPage: number) => void;
    itemsPerPageOptions?: number[];
    itemsPerPageControlLabel?: string;
    inputDebounceTime?: number;
    defaultItemsPerPage?: number;
    showFirstLastButtons?: boolean;
    showPreviousNextButtons?: boolean;
    showPageButtons?: boolean;
    className?: string;
    pageInputLabel?: string;
    showItemsPerPageControl?: boolean;
    showPageInput?: boolean;
}
export declare const Pagination: React.FC<PaginationProperties>;
//# sourceMappingURL=index.d.ts.map