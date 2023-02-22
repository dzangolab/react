import React, { useContext, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import OutsideClickHandler from "react-outside-click-handler";

import { TableContext } from "./TableProvider";

import type { FilterProperties } from "./types";

function Filter({
  columnFilterValue,
  columnType,
  handleChange,
}: FilterProperties) {
  const { inputDebounceTime, filterIcons } = useContext(TableContext);

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    expanded ? setExpanded(false) : setExpanded(true);
  };

  if (columnType === "number") return null;

  return (
    <div
      className="filter-wrapper"
      onClick={(event_) => event_.stopPropagation()}
    >
      {
        <button onClick={toggleExpand}>
          {expanded ? (
            <img src={filterIcons?.expanded} />
          ) : (
            <img src={filterIcons?.notExpanded} />
          )}
        </button>
      }
      {expanded ? (
        <OutsideClickHandler
          onOutsideClick={() => {
            setExpanded(false);
          }}
        >
          <div role="dialog" className="filter-form-wrapper">
            <DebounceInput
              type="text"
              value={(columnFilterValue ?? "") as string}
              debounceTimeout={inputDebounceTime}
              onChange={(event_) => {
                handleChange(event_.target.value);
              }}
              placeholder={`Search...`}
              className=""
              size={10}
            />
          </div>
        </OutsideClickHandler>
      ) : null}
    </div>
  );
}

export default Filter;
