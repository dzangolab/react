import type {
  Column,
  ColumnDef,
  PaginationState,
  Table as ReactTable,
} from "@tanstack/react-table";
import type { ReactNode } from "react";

export type { ColumnDef as TableColumnDefinition } from "@tanstack/react-table";

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

type TLimit = number | null;

type TOffset = number | null;

type TSortRequest = TSingleSort[] | null;

export type TRequestJSON = {
  filter: TFilterRequest;
  sort: TSortRequest;
  offset: TOffset;
  limit: TLimit;
};

export type TSortIcons = {
  asc: string;
  desc: string;
  default: string;
};

export interface TableProviderProperties<T> {
  children?: ReactNode;
  columns: ColumnDef<T>[];
  data: T[];
  fetcher: (requestJSON: TRequestJSON) => void;
  filterMenuToggleIcon?: string;
  enableMultiSort?: boolean;
  inputDebounceTime?: number;
  fixedHeader?: boolean;
  filterIcons?: {
    expanded: string;
    notExpanded: string;
  };
  hideScrollBar?: boolean;
  isLoading?: boolean;
  paginated?: boolean;
  paginationIcons?: {
    start: string;
    previous: string;
    next: string;
    end: string;
  };
  rowsPerPageOptions?: number[];
  showPageControl?: boolean;
  showTotalNumber?: boolean;
  sortable?: boolean;
  sortIcons?: TSortIcons;
  title?: string;
  totalItems: number;
}

export interface TableContextProperties<T>
  extends Partial<TableProviderProperties<T>> {
  table?: ReactTable<T>;
  paginationState?: PaginationState;
}

export interface TBaseTable {
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
}

export interface FilterProperties<T> {
  column: Column<T>;
  table: ReactTable<T>;
}

export interface TFooterProperties {
  paginationComponent?: ReactNode;
  detailComponent?: ReactNode;
}

export interface TTableDetail {
  detail: string;
  showPrefix: string;
}
