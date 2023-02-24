import { useContext, useId } from "react";

import { TableContext } from "./TableProvider";

import type { PaginationProperties } from "./types";

const Pagination = (properties: PaginationProperties) => {
  const id = useId();
  const { isLoading } = useContext(TableContext);

  return (
    <div>
      {properties.config.map(({ icon, isDisabled, onClick }, index) => (
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
