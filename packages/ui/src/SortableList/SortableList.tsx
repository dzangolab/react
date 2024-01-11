import { useState } from "react";

import type { FC, ReactNode } from "react";

export interface SortableListProperties {
  items: {
    id: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render?: (data: any) => ReactNode;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSort?: (sortedItems: { id: number; data: any }[]) => void;
  itemClassName?: string;
  className?: string;
  grabHandleIcon?: ReactNode;
}

export const SortableList: FC<SortableListProperties> = ({
  items,
  onSort,
  itemClassName = "",
  className = "",
  grabHandleIcon,
}) => {
  const [sortedItems, setSortedItems] = useState(items);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [droppedOver, setDroppedOver] = useState<number>(-1);

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (droppedOver: number) => {
    setDroppedOver(droppedOver);
  };

  const handleDragEnd = () => {
    if (draggedItem !== null && draggedItem !== droppedOver) {
      const updatedItems = [...sortedItems];

      const [movedItem] = updatedItems.splice(draggedItem, 1);

      updatedItems.splice(droppedOver, 0, movedItem);

      setSortedItems(updatedItems);
      onSort && onSort(updatedItems);
      setDraggedItem(droppedOver);
    }

    setDraggedItem(null);
    setDroppedOver(-1);
  };

  const getItemClassName = (index: number) => {
    let itemClass = `sortable-item ${itemClassName}`
      .replace(/\s\s/, " ")
      .trimEnd();

    if (index === draggedItem) {
      if (droppedOver !== null) {
        const isDraggingUp = droppedOver > draggedItem;
        itemClass += isDraggingUp ? " dragged-down" : " dragged-up";
      }
    }

    return itemClass;
  };

  return (
    <ul className={`sortable-list ${className}`.trimEnd()}>
      {sortedItems.map((item, index) => (
        <li
          className={getItemClassName(index)}
          key={item.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={() => handleDragOver(index)}
          onDragEnd={handleDragEnd}
        >
          {grabHandleIcon ? (
            grabHandleIcon
          ) : (
            <span className="grab-icon">
              <i className="pi pi-ellipsis-v" />
              <i className="pi pi-ellipsis-v" />
            </span>
          )}
          <div className="item">
            {item.render ? item.render(item.data) : item.data}
          </div>
        </li>
      ))}
    </ul>
  );
};
