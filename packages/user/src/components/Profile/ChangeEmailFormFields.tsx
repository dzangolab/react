import { Email, useFormContext, FormActions } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";

interface Properties {
  submitting?: boolean;
}

export const ChangeEmailFormFields = ({ submitting }: Properties) => {
  const {
    formState: { errors, isDirty }, // eslint-disable-line @typescript-eslint/no-unused-vars
  } = useFormContext();

  const { t } = useTranslation("user");
  return (
    <>
      <Email
        label={t("profile.form.email.label")}
        name="email"
        placeholder={t("profile.form.email.placeholder")}
      />

      <FormActions
        actions={[
          {
            id: "cancel",
            label: t("profile.button.cancel"),
            type: "button",
            disabled: !isDirty,
          },
          {
            id: "submit",
            label: t("profile.button.update"),
            disabled: !isDirty,
          },
        ]}
        loading={submitting}
        alignment="fill"
      />
    </>
  );
};
