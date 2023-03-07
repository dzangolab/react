import React, { useContext, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import OutsideClickHandler from "react-outside-click-handler";

import { TableContext } from "./TableContext";

import type { FilterProperties } from "./types";

const renderImage = (source?: string) => {
  return <img src={source} />;
};

function Filter({
  columnFilterValue,
  columnType,
  handleChange,
}: FilterProperties) {
  const { inputDebounceTime, filterIcons } = useContext(TableContext);
  if (typeof columnType === "number") return null;

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    expanded ? setExpanded(false) : setExpanded(true);
  };

  return (
    <div onClick={(event_) => event_.stopPropagation()}>
      {
        <button onClick={toggleExpand}>
          {expanded
            ? renderImage(filterIcons?.expanded)
            : renderImage(filterIcons?.notExpanded)}
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
