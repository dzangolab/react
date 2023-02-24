import type {
  Column,
  ColumnDef,
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

export type TFetchDataOptions = {
  currentPage?: string;
  filters?: string;
  size?: string;
  sorts?: string;
};

export type TSortIcons = {
  asc: string;
  desc: string;
  default: string;
};

export interface TableProviderProperties<T> {
  children?: ReactNode;
  columns: ColumnDef<T>[];
  data?: T[];
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
  showLoading?: boolean;
  showPageControl?: boolean;
  showTotalNumber?: boolean;
  sortable?: boolean;
  sortIcons?: TSortIcons;
  title?: string;
  totalItems: number;
}

export type TableContextProperties<T> = TableProviderProperties<T>;

export interface FilterProperties<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<T, any>;
  table: ReactTable<T>;
}

export interface PaginationProperties {
  config: {
    icon?: string;
    isDisabled: boolean;
    onClick: () => void;
  }[];
}

export interface TableBodyProperties<T> {
  rowModel: ReactTable<T>["getRowModel"];
}

export interface TableHeaderProperties<T> {
  table: ReactTable<T>;
}
