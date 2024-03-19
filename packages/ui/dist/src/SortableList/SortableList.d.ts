import type { FC, ReactNode } from "react";
export interface SortableListProperties {
    items: {
        id: number;
        data: any;
        render?: (data: any) => ReactNode;
    }[];
    onSort?: (sortedItems: {
        id: number;
        data: any;
    }[]) => void;
    itemClassName?: string;
    className?: string;
    grabHandleIcon?: ReactNode;
}
export declare const SortableList: FC<SortableListProperties>;
//# sourceMappingURL=SortableList.d.ts.map