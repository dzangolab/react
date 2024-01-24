import * as React from "react";
import { useRef } from "react";

import { Tooltip } from "../../Tooltip";

const TableToolbar = ({ children }: { children?: React.ReactNode }) => {
  return <div className="toolbar">{children}</div>;
};

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...properties }, reference) => (
  <div className="table-wrapper">
    <table className={className || ""} ref={reference} {...properties} />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...properties }, reference) => (
  <thead className={className || ""} ref={reference} {...properties} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...properties }, reference) => (
  <tbody className={className || ""} ref={reference} {...properties} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...properties }, reference) => (
  <tfoot className={className || ""} ref={reference} {...properties} />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...properties }, reference) => (
  <tr className={className || ""} ref={reference} {...properties} />
));
TableRow.displayName = "TableRow";

const ColumnHeader = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, children, ...properties }, reference) => (
  <th
    className={className || ""}
    ref={reference}
    children={<div className="content"> {children}</div>}
    {...properties}
  />
));
ColumnHeader.displayName = "ColumnHeader";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, children, ...properties }, reference) => (
  <td
    className={className || ""}
    ref={reference}
    {...properties}
    children={<div className="content"> {children}</div>}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...properties }, reference) => (
  <caption
    className={`tcaption ${className || ""}`}
    ref={reference}
    {...properties}
  />
));
TableCaption.displayName = "TableCaption";

const TooltipWrapper = ({
  tooltipOptions,
  cellContent,
}: {
  tooltipOptions: Omit<React.ComponentProps<typeof Tooltip>, "elementRef">;
  cellContent: React.ReactNode | JSX.Element;
}) => {
  const reference = useRef<HTMLDivElement>(null);

  return (
    <>
      <Tooltip elementRef={reference} {...tooltipOptions} />
      <div ref={reference}>{cellContent}</div>
    </>
  );
};

export {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableToolbar,
  TooltipWrapper,
  ColumnHeader,
  TableRow,
  TableCell,
  TableCaption,
};
