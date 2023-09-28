import { DataView } from "primereact/dataview";
import { ComponentProps } from "react";

export interface IDataListProperties<D>
  extends ComponentProps<typeof DataView> {
  data: D[];
  defaultRowsPerPage?: number;
  fetchData?: (lazySate: LazyListState) => void;
}

export interface LazyListState {
  first: number;
  rows: number;
  page: number;
  sortField?: string;
  sortOrder?: 0 | 1 | -1 | null;
}
