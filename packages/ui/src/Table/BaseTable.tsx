import { useContext } from "react";

import Footer from "./Footer";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import { TableContext } from "./TableProvider";

function BaseTable() {
  const { fixedHeader, hideScrollBar, title } = useContext(TableContext);

  const getTableWrapperStyle = () => {
    if (fixedHeader && hideScrollBar) return "sticky-header hide-scrollbar";
    if (fixedHeader && !hideScrollBar) return "sticky-header";
    if (!fixedHeader && hideScrollBar) return "hide-scrollbar";
    return "";
  };

  return (
    <div className={`table-wrapper ${getTableWrapperStyle()}`}>
      <div>
        <table>
          {title ? <caption>{title}</caption> : null}
          <TableHeader />
          <TableBody />
        </table>
      </div>

      <Footer />
    </div>
  );
}

export default BaseTable;
