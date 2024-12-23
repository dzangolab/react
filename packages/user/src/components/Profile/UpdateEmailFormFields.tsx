import { Email, useFormContext, FormActions } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";

interface Properties {
  loading?: boolean;
}

export const UpdateEmailFormFields = ({ loading }: Properties) => {
  const {
    formState: { errors, isDirty }, // eslint-disable-line @typescript-eslint/no-unused-vars
  } = useFormContext();
  console.log("test");

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
        loading={loading}
        alignment="fill"
      />
    </>
  );
};
