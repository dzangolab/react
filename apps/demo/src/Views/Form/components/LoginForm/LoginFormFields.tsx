import { Email, Password, useFormContext } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";

export const LoginFormFields = () => {
  const [t] = useTranslation("form");
  const {
    register,
    getFieldState,
    formState: { errors, submitCount },
  } = useFormContext();

  return (
    <>
      <Email
        name="email"
        label={t("loginForm.label.email")}
        submitcount={submitCount}
      />
      <Password
        name="password"
        label={t("loginForm.label.password")}
        register={register}
        getFieldState={getFieldState}
        submitcount={submitCount}
      />
      <input type="submit" value={t("loginForm.label.login")} />
    </>
  );
};
