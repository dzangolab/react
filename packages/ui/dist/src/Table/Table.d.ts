import React from "react";
import type { TDataTableProperties } from "./types";
declare const DataTable: <TData extends {
    id: string | number;
}>({ border, className, columns, columnActionBtnLabel: columnActionButtonLabel, customFormatters, data, dataActionsMenu, emptyTableMessage, enableRowSelection, id, isLoading, initialFilters, inputDebounceTime, fetchData, renderToolbarItems, renderTableFooterContent, renderCustomPagination, renderSortIcons, title, paginated, rowPerPage, rowPerPageOptions, visibleColumns, onRowSelectChange, totalRecords, paginationOptions, stripe, showColumnsAction, ...tableOptions }: TDataTableProperties<TData>) => React.JSX.Element;
export { DataTable };
//# sourceMappingURL=Table.d.ts.map