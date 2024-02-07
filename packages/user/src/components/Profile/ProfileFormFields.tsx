import { Email, Input, useFormContext } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { Button, SubmitButton } from "@dzangolab/react-ui";

import { RenderAdditionalInvitationFields } from "@/types";

interface Properties {
  submitting?: boolean;
  renderAdditionalFields?: RenderAdditionalInvitationFields;
}

export const ProfileFormFields = ({
  submitting,
  renderAdditionalFields,
}: Properties) => {
  const {
    register,
    getFieldState,
    reset,
    formState: { errors, submitCount, isDirty },
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
        type="text"
        placeholder={t("profile.form.firstName.placeholder")}
        register={register}
        submitcount={submitCount}
        getFieldState={getFieldState}
      />
      <Input
        label={t("profile.form.lastName.label")}
        name="surname"
        type="text"
        placeholder={t("profile.form.lastName.placeholder")}
        register={register}
        submitcount={submitCount}
        getFieldState={getFieldState}
      />

      {renderAdditionalFields ? renderAdditionalFields(useFormContext) : null}

      <div className="profile-form-actions">
        <Button
          label={t("profile.button.cancel")}
          severity="secondary"
          variant="outlined"
          type="button"
          disabled={!isDirty}
          onClick={() => reset()}
        />
        <SubmitButton
          disabled={!isDirty}
          label={t("profile.button.update")}
          loading={submitting}
        />
      </div>
    </>
  );
};
