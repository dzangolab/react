import { ButtonProps } from "primereact/button";
import { MenuProps as PMenuProperties } from "primereact/menu";
import React from "react";
export interface MenuProperties extends PMenuProperties {
    buttonOptions?: Omit<ButtonProps, "onClick">;
}
export declare const Menu: ({ buttonOptions: pButtonOptions, model, ...menuOptions }: MenuProperties) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map