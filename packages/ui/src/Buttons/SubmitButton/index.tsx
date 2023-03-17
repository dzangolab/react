import React from "react";

import LoadingIcon from "../../LoadingIcon";

import "./submitButton.css";

interface Properties {
  disabled?: boolean;
  label: string;
  loading?: boolean;
}

const SubmitButton = ({ disabled, label, loading }: Properties) => {
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

export default SubmitButton;
