import { Email, useFormContext, FormActions } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";

interface Properties {
  loading?: boolean;
  setModalVisible: (visible: boolean) => void;
}

export const UpdateEmailFormFields = ({
  loading,
  setModalVisible,
}: Properties) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors, isDirty },
  } = useFormContext();

  const { t } = useTranslation("user");
  return (
    <>
      <Email label={t("profile.accountInfo.newEmail")} name="email" />

      <FormActions
        actions={[
          {
            id: "cancel",
            label: t("profile.button.cancel"),
            type: "button",
            disabled: !isDirty,
            onClick: () => setModalVisible(false),
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
