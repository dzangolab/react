import React from "react";

interface Properties {
  touched?: boolean;
  error?: string;
}

const ErrorMessage = ({ touched, error }: Properties) => {
  return error && touched ? <p role="alert">{error}</p> : null;
};

export default ErrorMessage;
