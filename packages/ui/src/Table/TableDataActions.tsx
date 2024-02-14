import { ButtonProps } from "primereact/button";
import { MenuItem } from "primereact/menuitem";
import React, { useState } from "react";

import { Button } from "..";
import { ConfirmationModal, IModalProperties } from "../ConfirmationModal";
import { Menu } from "../Menu";

export interface DataActionsMenuItem
  extends Omit<MenuItem, "command" | "disabled"> {
  requireConfirmationModal?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (arguments_: any) => void;
  confirmationOptions?: IModalProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  disabled?: boolean | ((data: any) => boolean);
}

export interface DataActionsMenuProperties {
  actions?: DataActionsMenuItem[];
  buttonOptions?: Omit<ButtonProps, "onClick">;
  data?: object;
  displayActionMenu?: boolean;
}

export const DataActionsMenu = ({
  actions,
  buttonOptions: pButtonOptions,
  data,
  displayActionMenu = false,
}: DataActionsMenuProperties) => {
  const [confirmation, setConfirmation] = useState<IModalProperties | null>();

  const buttonOptions = {
    icon: "pi pi-cog",
    ...pButtonOptions,
  };

  const items: MenuItem[] = actions
    ? actions.map((action) => ({
        ...action,
        disabled:
          typeof action.disabled === "function"
            ? action.disabled(data)
            : action.disabled,
        command: () => {
          if (action.requireConfirmationModal) {
            setConfirmation({
              ...action.confirmationOptions,
              onHide: () => setConfirmation(null),
              accept: () => {
                action.onClick && action.onClick(data);
                setConfirmation(null);
              },
            });
          } else {
            action.onClick && action.onClick(data);
          }
        },
      }))
    : [];

  const renderActions = () => {
    const { icon, label, ...rest } = items[0];

    if (items.length == 1 && icon && !displayActionMenu) {
      return (
        <Button
          variant="textOnly"
          iconLeft={icon}
          data-pr-tooltip={label}
          {...rest}
        />
      );
    }

    return <Menu model={items} buttonOptions={buttonOptions} />;
  };

  return (
    <>
      {renderActions()}
      {!!confirmation && (
        <ConfirmationModal {...confirmation} visible={!!confirmation} />
      )}
    </>
  );
};
