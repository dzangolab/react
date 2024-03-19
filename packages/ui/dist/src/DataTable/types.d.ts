import { ColumnProps } from "primereact/column";
import { DataTableFilterMeta, DataTableProps } from "primereact/datatable";
import { TooltipOptions } from "primereact/tooltip/tooltipoptions";
export interface IColumnProperties extends ColumnProps {
    bodyTooltip?: boolean | string | ((data: any) => string);
    bodyTooltipOptions?: TooltipOptions;
}
export interface ITableProperties<D extends object> extends DataTableProps<Array<D>> {
    loading?: boolean;
    totalRecords?: number;
    data: Array<D>;
    columns: Array<IColumnProperties>;
    fetchData?: (arguments_: LazyTableState) => void;
    initialFilters?: DataTableFilterMeta;
    defaultRowsPerPage?: number;
}
export interface LazyTableState {
    first: number;
    rows: number;
    page: number;
    sortField?: string;
    sortOrder?: 0 | 1 | -1 | null;
    filters?: DataTableFilterMeta;
}
//# sourceMappingURL=types.d.ts.map