import { Button, IButtonProperties } from "@dzangolab/react-ui";
import React, { useMemo } from "react";

interface FormActionsProperties {
  actions?: IButtonProperties[];
  alignment?: "center" | "left" | "right" | "fill";
  flowDirection?: "horizontal" | "vertical";
  className?: string;
  loading?: boolean;
}

export const FormActions = ({
  actions,
  alignment = "fill",
  className,
  flowDirection = "horizontal",
  loading,
}: FormActionsProperties) => {
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
    <div
      className={`dz-form-actions ${className || ""}`.trimEnd()}
      data-alignment={alignment}
      data-direction={flowDirection}
    >
      {parsedActions.map((action) => {
        return <Button key={action.id || action.label} {...action} />;
      })}
    </div>
  );
};
