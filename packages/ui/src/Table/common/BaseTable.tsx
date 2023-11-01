import { useContext } from "react";

import TableBody from "./TableBody";
import { TableContext } from "./TableContext";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";

import type { TBaseTable } from "./types";

function BaseTable({ header, body, footer }: TBaseTable) {
  const { fixedHeader, hideScrollBar, title, actionsHeader } =
    useContext(TableContext);

  const getTableWrapperStyle = () => {
    if (fixedHeader && hideScrollBar) return "sticky-header hide-scrollbar";
    if (fixedHeader && !hideScrollBar) return "sticky-header";
    if (!fixedHeader && hideScrollBar) return "hide-scrollbar";
    return "";
  };

  return (
    <div className={`table-wrapper ${getTableWrapperStyle()}`}>
      <div>
        <div className="actions-header">{actionsHeader}</div>
        <table>
          {title ? <caption>{title}</caption> : null}
          {header}
          {body}
        </table>
      </div>
      {footer}
    </div>
  );
}

BaseTable.defaultProps = {
  header: <TableHeader />,
  body: <TableBody />,
  footer: <TableFooter />,
};

export default BaseTable;
