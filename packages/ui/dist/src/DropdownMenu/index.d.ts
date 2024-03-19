import React, { HTMLAttributes } from "react";
interface Item {
    [key: string]: any;
    label?: string;
    onClick?: () => void;
    key?: string;
    className?: string;
    selected?: boolean;
}
interface DropdownMenu {
    menuItems: Item[];
    keyExtractor?: (value: Item) => string;
    renderOption?: (value: Item) => JSX.Element;
}
export interface DropdownMenuProperties extends Pick<HTMLAttributes<HTMLDivElement>, "lang"> {
    className?: string;
    collapseIcon?: React.ReactNode;
    dropdownMenu: DropdownMenu;
    expandIcon?: React.ReactNode;
    label: React.ReactNode;
}
declare const DropdownMenu: React.FC<DropdownMenuProperties>;
export default DropdownMenu;
//# sourceMappingURL=index.d.ts.map