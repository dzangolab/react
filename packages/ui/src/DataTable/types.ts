import { ColumnProps } from "primereact/column";
import { DataTableFilterMeta, DataTableProps } from "primereact/datatable";
import { TooltipOptions } from "primereact/tooltip/tooltipoptions";

/**
 *
 * @deprecated will be removed in coming future.
 *
 */
export interface IColumnProperties extends ColumnProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bodyTooltip?: boolean | string | ((data: any) => string);
  bodyTooltipOptions?: TooltipOptions;
}

/**
 *
 * @deprecated will be removed in coming future.
 *
 */
export interface ITableProperties<D extends object>
  extends DataTableProps<Array<D>> {
  loading?: boolean;
  totalRecords?: number;
  data: Array<D>;
  columns: Array<IColumnProperties>;
  fetchData?: (arguments_: LazyTableState) => void;

  // filtering
  initialFilters?: DataTableFilterMeta;

  //pagination
  defaultRowsPerPage?: number;
}

/**
 *
 * @deprecated will be removed in coming future.
 *
 */
export interface LazyTableState {
  first: number;
  rows: number;
  page: number;
  sortField?: string;
  sortOrder?: 0 | 1 | -1 | null;
  filters?: DataTableFilterMeta;
}
