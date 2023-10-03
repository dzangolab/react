import { ColumnProps } from "primereact/column";
import { DataTableFilterMeta, DataTableProps } from "primereact/datatable";

export interface ITableProperties<D extends object>
  extends DataTableProps<Array<D>> {
  loading?: boolean;
  totalRecords?: number;
  data: Array<D>;
  columns: Array<ColumnProps>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchData?: (arguments_?: any) => void;

  // filtering
  initialFilters?: DataTableFilterMeta;

  //pagination
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
