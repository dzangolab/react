import React, { ReactNode, useState } from "react";

export interface SortableContainerProperties {
  items: { id: number; data: any; render?: (data: any) => ReactNode }[];
  onSort: (sortedItems: { id: number; data: any }[]) => void;
  itemClassName?: string;
  className?: string;
}

export const SortableContainer: React.FC<SortableContainerProperties> = ({
  items,
  onSort,
  itemClassName,
  className,
}) => {
  const [sortedItems, setSortedItems] = useState(items);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [droppedOver, setDroppedOver] = useState<number>(0);

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
      onSort(updatedItems);
      setDraggedItem(droppedOver);
    }
    setDraggedItem(null);
  };

  return (
    <div className={`sortable-container ${className}`}>
      {sortedItems.map((item, index) => (
        <div
          className={`sortable-item ${itemClassName}`}
          key={item.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={() => handleDragOver(index)}
          onDragEnd={handleDragEnd}
        >
          {item.render ? item.render(item.data) : item.data}
        </div>
      ))}
    </div>
  );
};
