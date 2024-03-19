import type { FormatDateType, FormatNumberType, TRequestJSON } from "./types";
import type { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
export declare const getRequestJSON: (sortingState?: SortingState, filterState?: ColumnFiltersState, paginationState?: PaginationState) => TRequestJSON;
export declare const getParsedColumns: ({ columns, visibleColumns, childColumns, }: {
    columns: Array<any>;
    childColumns?: any[] | undefined;
    visibleColumns: string[];
}) => any[];
export declare const formatNumber: ({ value, locale, formatOptions, }: FormatNumberType) => string | number;
export declare const formatDate: ({ date, locale, formatOptions, }: FormatDateType) => string | number | Date | null;
//# sourceMappingURL=utils.d.ts.map