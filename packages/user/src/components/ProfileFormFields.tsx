import { Email, Input, useFormContext } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { Button } from "@dzangolab/react-ui";

export const ProfileFormFields = ({
  handleCancel,
}: {
  handleCancel: () => void;
}) => {
  const {
    register,
    getFieldState,
    formState: { errors, submitCount },
  } = useFormContext();

  const { t } = useTranslation("user");
  return (
    <>
      <Email
        label={t("profile.form.email.label")}
        name="email"
        placeholder={t("profile.form.email.placeholder")}
        register={register}
        getFieldState={getFieldState}
        readOnly={true}
      />
      <Input
        label={t("profile.form.firstName.label")}
        name="givenName"
        type="string"
        placeholder={t("profile.form.firstName.placeHolder")}
        register={register}
        getFieldState={getFieldState}
      />
      <Input
        label={t("profile.form.lastName.label")}
        name="surname"
        type="string"
        placeholder={t("profile.form.lastName.placeHolder")}
        register={register}
        getFieldState={getFieldState}
      />
      <div className="profile-buttons-wrapper">
        <Button
          label={t("profile.button.cancel")}
          severity="secondary"
          variant="outlined"
          size="small"
          onClick={handleCancel}
        />
        <Button label={t("profile.button.update")} size="small" />
      </div>
    </>
  );
};
