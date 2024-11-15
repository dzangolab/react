import { MenuItem, MenuItemCommandEvent } from "primereact/menuitem";
import React, { useState } from "react";

import { Button, DropdownMenu } from "..";
import { ConfirmationModal, IModalProperties } from "../ConfirmationModal";

export interface DataActionsMenuItem
  extends Omit<MenuItem, "command" | "disabled"> {
  requireConfirmationModal?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (arguments_: any) => void | Promise<void>;
  confirmationOptions?: IModalProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  disabled?: boolean | ((data: any) => boolean);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  display?: boolean | ((data: any) => boolean);
}

export interface DataActionsMenuProperties<TData> {
  actions?: DataActionsMenuItem[];
  data?: object;
  displayActionMenu?: boolean;
  displayActions?: boolean | ((data: TData) => boolean);
}

export const DataActionsMenu = ({
  actions,
  data,
  displayActionMenu = false,
  displayActions = true, // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: DataActionsMenuProperties<any>) => {
  const [confirmation, setConfirmation] = useState<IModalProperties | null>();

  const isVisibleActions =
    typeof displayActions === "function"
      ? displayActions(data)
      : displayActions;

  if (!isVisibleActions) {
    return null;
  }

  const items: MenuItem[] = actions
    ? actions
        .filter((action) => {
          if (typeof action.display === "function") {
            return action.display(data);
          } else if (typeof action.display === "boolean") {
            return action.display;
          } else {
            return true;
          }
        })
        .map((action) => ({
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
                accept: async () => {
                  await action.onClick?.(data);

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
    const { icon, label, command, ...rest } = items[0];

    if (!items.length) {
      return null;
    }

    if (items.length == 1 && icon && !displayActionMenu) {
      return (
        <Button
          variant="textOnly"
          iconLeft={icon}
          data-pr-tooltip={label}
          {...rest}
          onClick={(event) =>
            command && command(event as unknown as MenuItemCommandEvent)
          }
          rounded
        />
      );
    }

    return (
      <DropdownMenu
        disableAngleIcon={true}
        label={<i className="dz-icon pi  pi-cog"></i>}
        menu={items}
      />
    );
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
