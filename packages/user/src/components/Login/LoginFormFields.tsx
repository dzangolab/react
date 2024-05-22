import {
  Email,
  FormActions,
  Password,
  useFormContext,
} from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";

interface Properties {
  loading?: boolean;
}
export const LoginFormFields = ({ loading }: Properties) => {
  const { t } = useTranslation("user");

  const {
    register,
    getFieldState,
    formState: { errors, submitCount },
  } = useFormContext();

  return (
    <>
      <Email
        label={t("login.form.email.label")}
        name="email"
        placeholder={t("login.form.email.placeholder")}
        submitCount={submitCount}
        showValidState={false}
      />
      <Password
        autoComplete="current-password"
        label={t("login.form.password.label")}
        name="password"
        submitCount={submitCount}
        register={register}
        getFieldState={getFieldState}
        showValidState={false}
      />

      <FormActions
        actions={[
          {
            id: "submit",
            label: t("login.form.actions.submit"),
          },
        ]}
        loading={loading}
        alignment="fill"
      />
    </>
  );
};
