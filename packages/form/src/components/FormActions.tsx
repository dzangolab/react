import { Button, IButtonProperties } from "@dzangolab/react-ui";
import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";

interface FormActionsProperties {
  actions?: IButtonProperties[];
  loading?: boolean;
  alignment?: "center" | "left" | "right";
}

export const FormActions = ({
  loading,
  alignment = "left",
  actions,
}: FormActionsProperties) => {
  const {
    formState: { errors },
  } = useFormContext();

  const defaultActions: IButtonProperties[] = [
    {
      id: "cancel",
      label: "Cancel",
      severity: "secondary",
      variant: "outlined",
    },
    {
      id: "submit",
      type: "submit",
      label: "Submit",
      disabled: !!Object.values(errors).length,
      loading: loading,
    },
  ];

  const parsedActions: IButtonProperties[] = useMemo(() => {
    if (!actions) {
      return defaultActions;
    }

    const mappedActions = new Map<string, IButtonProperties>();

    for (const action of actions) {
      mappedActions.set(action.id || action.label || "", action);
    }

    for (const defaultAction of defaultActions) {
      if (mappedActions.get(defaultAction.id || defaultAction.label || "")) {
        const previousAction = mappedActions.get(
          defaultAction.id || defaultAction.label || "",
        );

        mappedActions.set(defaultAction.id || defaultAction.label || "", {
          ...defaultAction,
          ...previousAction,
        });
      }
    }

    return Array.from(mappedActions.values());
  }, [actions]);

  return (
    <div className="dz-form-actions" data-alignment={alignment}>
      {parsedActions.map((action) => {
        return <Button {...action} />;
      })}
    </div>
  );
};
