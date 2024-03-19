import * as React from "react";
import { Tooltip } from "../Tooltip";
declare const TableToolbar: ({ children }: {
    children?: React.ReactNode;
}) => React.JSX.Element;
declare const Table: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableElement> & React.RefAttributes<HTMLTableElement>>;
declare const TableHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableBody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableRow: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableRowElement> & React.RefAttributes<HTMLTableRowElement>>;
declare const ColumnHeader: React.ForwardRefExoticComponent<React.ThHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
declare const TableCell: React.ForwardRefExoticComponent<React.TdHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
declare const TableCaption: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableCaptionElement> & React.RefAttributes<HTMLTableCaptionElement>>;
declare const TooltipWrapper: ({ tooltipOptions, cellContent, }: {
    tooltipOptions: Omit<React.ComponentProps<typeof Tooltip>, "elementRef">;
    cellContent: React.ReactNode | JSX.Element;
}) => React.JSX.Element;
export { Table, TableBody, TableFooter, TableHeader, TableToolbar, TooltipWrapper, ColumnHeader, TableRow, TableCell, TableCaption, };
//# sourceMappingURL=TableElements.d.ts.map