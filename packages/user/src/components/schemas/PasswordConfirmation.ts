import * as Yup from "yup";

const schema = (
  passwordValidationMessage: string,
  passwordRequiredMessage: string,
  confirmPasswordValidationMessage: string,
  confirmPasswordRequiredMessage: string
) => {
  return {
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
        passwordValidationMessage
      )
      .required(passwordRequiredMessage),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], confirmPasswordValidationMessage)
      .required(confirmPasswordRequiredMessage),
  };
};

export default schema;
