import { ButtonProps } from "primereact/button";
import { MenuItem } from "primereact/menuitem";
import React from "react";
import { IModalProperties } from "../ConfirmationModal";
export interface DataActionsMenuItem extends Omit<MenuItem, "command" | "disabled"> {
    requireConfirmationModal?: boolean;
    onClick?: (arguments_: any) => void;
    confirmationOptions?: IModalProperties;
    disabled?: boolean | ((data: any) => boolean);
    display?: boolean | ((data: any) => boolean);
}
export interface DataActionsMenuProperties<TData> {
    actions?: DataActionsMenuItem[];
    buttonOptions?: Omit<ButtonProps, "onClick">;
    data?: object;
    displayActionMenu?: boolean;
    displayActions?: boolean | ((data: TData) => boolean);
}
export declare const DataActionsMenu: ({ actions, buttonOptions: pButtonOptions, data, displayActionMenu, displayActions, }: DataActionsMenuProperties<any>) => React.JSX.Element | null;
//# sourceMappingURL=TableDataActions.d.ts.map