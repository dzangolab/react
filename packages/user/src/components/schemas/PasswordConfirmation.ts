import * as Yup from "yup";

interface PasswordConfirmationSchema {
  passwordValidationMessage: string;
  passwordRequiredMessage: string;
  confirmPasswordValidationMessage: string;
  confirmPasswordRequiredMessage: string;
}

const schema = ({
  passwordValidationMessage,
  passwordRequiredMessage,
  confirmPasswordValidationMessage,
  confirmPasswordRequiredMessage,
}: PasswordConfirmationSchema) => {
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
