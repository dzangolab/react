import { Email, useFormContext, FormActions } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";

export const UpdateEmailFormFields = () => {
  const {
    formState: { errors, isDirty, isSubmitting }, // eslint-disable-line @typescript-eslint/no-unused-vars
  } = useFormContext();

  const { t } = useTranslation("user");
  return (
    <>
      <Email label={t("profile.accountInfo.label")} name="email" />

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
        loading={isSubmitting}
        alignment="fill"
      />
    </>
  );
};
