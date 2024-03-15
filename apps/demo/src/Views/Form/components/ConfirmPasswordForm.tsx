import { Form, Input, passwordSchema } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import * as z from "zod";

export const ConfirmPasswordForm = () => {
  const [t] = useTranslation("form");

  const schema = z
    .object({
      password: passwordSchema(),
      confirmPassword: z
        .string()
        .nonempty({ message: t("confirmPasswordForm.validation.required") }),
    })
    .refine(
      (data) => {
        return data.password === data.confirmPassword;
      },
      {
        message: t("confirmPasswordForm.validation.invalid"),
        path: ["confirmPassword"],
      },
    );

  return (
    <Form
      className="form login-form"
      // eslint-disable-next-line no-console
      onSubmit={(data) => console.log(data)}
      validationSchema={schema}
    >
      <Input
        type="password"
        name="password"
        label={t("confirmPasswordForm.label.password")}
      />
      <Input
        type="password"
        name="confirmPassword"
        label={t("confirmPasswordForm.label.confirmPassword")}
      />
      <input type="submit" value={t("confirmPasswordForm.label.login")} />
    </Form>
  );
};
