import type {
  Column,
  ColumnDef,
  Table as ReactTable,
} from "@tanstack/react-table";
import type { ReactNode } from "react";

export type TSortDirection = "ASC" | "DESC" | "";

type TSingleFilter = {
  key: string;
  operator: string;
  value: string;
};

type TMultiFilter = {
  AND: TSingleFilter[];
};

type TFilterRequest = TSingleFilter | TMultiFilter | null;

type TSingleSort = {
  key: string;
  direction: TSortDirection;
};

type TMultiSort = TSingleSort[];
type TSortRequest = TSingleSort | TMultiSort | null;

export type TRequestJSON = {
  filter: TFilterRequest;
  sort: TSortRequest;
};

export type TFetchDataOptions = {
  currentPage?: string;
  filters?: string;
  size?: string;
  sorts?: string;
};

export interface TableProviderProperties<T> {
  children?: ReactNode;
  columns: ColumnDef<T>[];
  fetcher: (
    requestJSON: TRequestJSON
  ) => Promise<{ data: T[]; totalItems: number }>;
  filterDebounceTime?: number;
  fixedHeader?: boolean;
  hideScrollBar?: boolean;
  paginated?: boolean;
  rowsPerPageOptions?: number[];
  showLoading?: boolean;
  showPageControl?: boolean;
  showTotalNumber?: boolean;
  sortable?: boolean;
  title?: string;
}

export interface TableContextProperties<T>
  extends Pick<
    TableProviderProperties<T>,
    Exclude<keyof TableProviderProperties<T>, "fetcher">
  > {
  data: T[];
  fetchCallback: (requestJSON: TRequestJSON) => void;
  loading: boolean;
  totalItems: number;
}

export interface FilterProperties {
  column: Column<any, any>;
  table: ReactTable<any>;
}

export interface PaginationProperties {
  config: {
    icon?: ReactNode;
    isDisabled: boolean;
    onClick: () => void;
  }[];
}

export interface TableBodyProperties<T> {
  rowModel: ReactTable<T>["getRowModel"];
}

export interface TableHeaderProperties<T> {
  sortable?: boolean;
  table: ReactTable<T>;
}
