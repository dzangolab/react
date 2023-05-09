import React from "react";
import { useFormContext } from "react-hook-form";

interface IFormAction {
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
}

export const FormAction: React.FC<IFormAction> = ({
  submitLabel,
  cancelLabel,
  onCancel,
}) => {
  const methods = useFormContext();

  return (
    <div className="form-buttons">
      <button
        type="submit"
        className="btn btn-primary"
        disabled={
          Object.keys(methods.formState.errors).length === 0 ? false : true
        }
      >
        {submitLabel || "Submit"}
      </button>
      <button
        className="btn btn-danger"
        onClick={() => {
          methods.reset();
          if (onCancel) {
            onCancel();
          }
        }}
      >
        {cancelLabel || "Cancel"}
      </button>
    </div>
  );
};
