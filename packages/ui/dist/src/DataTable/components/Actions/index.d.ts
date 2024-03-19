import { ButtonProps } from "primereact/button";
import { MenuItem } from "primereact/menuitem";
import React from "react";
export interface ActionsMenuProperties {
    actions?: MenuItem[];
    buttonOptions?: Omit<ButtonProps, "onClick">;
    data?: object;
    deleteIcon?: string;
    deleteLabel?: string;
    editIcon?: string;
    editLabel?: string;
    deleteConfirmationHeader?: string;
    deleteConfirmationMessage?: string;
    viewIcon?: string;
    viewLabel?: string;
    requireConfirmationOnDelete?: boolean;
    onDelete?: (arguments_: any) => void;
    onEdit?: (arguments_: any) => void;
    onView?: (arguments_: any) => void;
}
export declare const ActionsMenu: ({ actions, buttonOptions: pButtonOptions, data, deleteIcon, deleteLabel, editIcon, editLabel, deleteConfirmationHeader, deleteConfirmationMessage, viewIcon, viewLabel, onDelete, onEdit, onView, requireConfirmationOnDelete, }: ActionsMenuProperties) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map