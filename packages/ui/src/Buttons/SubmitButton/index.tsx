import React from "react";

import LoadingIcon from "../../LoadingIcon";

interface SubmitButtonProperties {
  disabled?: boolean;
  label: string;
  loading?: boolean;
}

export const SubmitButton = ({
  disabled,
  label,
  loading,
}: SubmitButtonProperties) => {
  return (
    <button
      type="submit"
      className="button-submit"
      disabled={disabled || loading}
    >
      {label}

      {loading ? <LoadingIcon /> : ""}
    </button>
  );
};
