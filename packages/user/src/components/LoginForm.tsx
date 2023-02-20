import { useTranslation } from "@dzangolab/react-i18n";
import { LoadingButton } from "@dzangolab/react-ui";
import { Field, Formik } from "formik";
import * as Yup from "yup";

import { LoginCredentials } from "@/types/types";

import "../assets/css/loginForm.css";
import ErrorMessage from "./ErrorMessage";

interface Properties {
  handleSubmit: (credentials: LoginCredentials) => void;
  loading?: boolean;
}

const LoginForm = ({ handleSubmit, loading }: Properties) => {
  const { t } = useTranslation("user");

  const LoginFormSchema = Yup.object({
    email: Yup.string()
      .email("validation.messages.validEmail")
      .required("validation.messages.email"),
    password: Yup.string().required("login.messages.validation.password"),
  });

  const initialValue = {
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={LoginFormSchema}
      onSubmit={(values, action) => {
        handleSubmit(values);
        action.resetForm();
      }}
    >
      {({ errors, handleSubmit, touched }) => (
        <form className="form" onSubmit={handleSubmit}>
          <div className="field email">
            <label htmlFor="email">{t("login.form.email.label")}</label>
            <Field
              id="email"
              type="email"
              name="email"
              placeholder={t("login.form.email.placeholder")}
            />
            <ErrorMessage
              touched={touched.email}
              error={errors.email ? t(errors.email) : undefined}
            />
          </div>

          <div className="field password">
            <label htmlFor="password">{t("login.form.password.label")}</label>
            <Field id="password" type="password" name="password" />
            <ErrorMessage
              touched={touched.password}
              error={errors.password ? t(errors.password) : undefined}
            />
          </div>

          <div className="actions">
            <LoadingButton
              label={`${t("login.form.actions.submit")}`}
              loading={loading}
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
