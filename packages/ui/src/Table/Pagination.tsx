import { useContext, useId } from "react";

import { TableContext } from "./TableProvider";

const Pagination = () => {
  const id = useId();
  const { isLoading, paginationIcons, table } = useContext(TableContext);

  const config = [
    {
      icon: paginationIcons?.start,
      isDisabled: !table?.getCanPreviousPage(),
      onClick: () => table?.setPageIndex(0),
    },
    {
      icon: paginationIcons?.previous,
      isDisabled: !table?.getCanPreviousPage(),
      onClick: () => table?.previousPage(),
    },
    {
      icon: paginationIcons?.next,
      isDisabled: !table?.getCanNextPage(),
      onClick: () => table?.nextPage(),
    },
    {
      icon: paginationIcons?.end,
      isDisabled: !table?.getCanNextPage(),
      onClick: () => table?.setPageIndex(table.getPageCount() - 1),
    },
  ];

  return (
    <div>
      {config.map(({ icon, isDisabled, onClick }, index) => (
        <button
          key={id + index}
          onClick={onClick}
          disabled={isDisabled || isLoading}
        >
          <img src={icon} />
        </button>
      ))}
    </div>
  );
};

export default Pagination;
