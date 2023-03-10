import * as Yup from "yup";

const schema = {
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
      "signup.messages.validation.validationMessage"
    )
    .required("signup.messages.validation.password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "signup.messages.validation.mustMatch")
    .required("signup.messages.validation.confirmPassword"),
};

export default schema;
