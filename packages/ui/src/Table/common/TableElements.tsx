import * as React from "react";

import type { SizeType } from "./Table";

const TableToolbar = ({
  // handleGlobalSearch,
  // globalFilterPlaceholder,
  // mappedSelectedRows,
  // size,
  children,
}: {
  // handleGlobalSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // globalFilterPlaceholder?: string;
  // mappedSelectedRows?: { id: string | number }[];
  // size?: SizeType;
  // value?: string;
  children?: React.ReactNode;
}) => {
  return <div className="toolbar">{children}</div>;
};

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...properties }, reference) => (
  <div className="table-wrapper">
    <table className={className} ref={reference} {...properties} />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...properties }, reference) => (
  <thead className={className} ref={reference} {...properties} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...properties }, reference) => (
  <tbody className={className} ref={reference} {...properties} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...properties }, reference) => (
  <tfoot className={className} ref={reference} {...properties} />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...properties }, reference) => (
  <tr className={className} ref={reference} {...properties} />
));
TableRow.displayName = "TableRow";

const ColumnHeader = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...properties }, reference) => (
  <th className={className} ref={reference} {...properties} />
));
ColumnHeader.displayName = "ColumnHeader";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...properties }, reference) => (
  <td className={className} ref={reference} {...properties} />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...properties }, reference) => (
  <caption className={className} ref={reference} {...properties} />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableToolbar,
  ColumnHeader,
  TableRow,
  TableCell,
  TableCaption,
};
