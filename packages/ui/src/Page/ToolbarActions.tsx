import React, { useState } from "react";

import { Button, DropdownMenu, IButtonProperties, MenuItem } from "..";
import { ConfirmationModal, IModalProperties } from "../ConfirmationModal";

export interface ActionsMenuItem
  extends Omit<MenuItem, "onClick">,
    Partial<IButtonProperties> {
  requireConfirmationModal?: boolean;
  onClick?: (event?: React.MouseEvent | React.KeyboardEvent) => void;
}

export interface ToolbarActionsMenuProperties {
  actions?: ActionsMenuItem[];
}

export const ToolbarActions = ({ actions }: ToolbarActionsMenuProperties) => {
  const [confirmation, setConfirmation] = useState<IModalProperties | null>();

  const renderActions = () => {
    if (!actions || !actions.length) {
      return null;
    }

    const { icon, label, onClick, disabled, ...rest } = actions[0];

    if (actions.length == 1 && icon) {
      return (
        <Button
          variant="textOnly"
          iconLeft={icon}
          data-pr-tooltip={label}
          onClick={onClick}
          rounded
          {...rest}
        />
      );
    }

    return (
      <DropdownMenu
        label={<Button iconLeft="pi pi-cog" size="medium" variant="outlined" />}
        menu={actions}
        hideDropdownIcon
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
