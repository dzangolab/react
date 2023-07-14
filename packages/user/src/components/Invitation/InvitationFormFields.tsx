import { Email, RolePicker, useFormContext } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { SubmitButton } from "@dzangolab/react-ui";
import React from "react";
import { Button } from "primereact/button";
import { LoadingIcon } from "@dzangolab/react-ui";

interface IProperties {
  onCancel?: () => void;
  loading?: boolean;
}

export const InvitationFormFields: React.FC<IProperties> = ({
  onCancel,
  loading,
}) => {
  const { t } = useTranslation("user");
  const {
    register,
    getFieldState,
    formState: { errors, submitCount },
  } = useFormContext();

  return (
    <>
      <Email
        label={t("invitation.form.email.label")}
        name="email"
        placeholder={t("invitation.form.email.placeholder")}
        register={register}
        getFieldState={getFieldState}
        submitcount={submitCount}
      />
      <RolePicker
        name="role"
        label={t("invitation.form.role.label")}
        placeholder={t("invitation.form.role.placeholder")}
        options={[
          { id: 1, name: "ADMIN" },
          { id: 2, name: "USER" },
        ]}
      />

      <div className="actions">
        {onCancel && (
          <Button
            onClick={onCancel}
            label={t("invitation.form.actions.cancel")}
            severity="secondary"
            outlined
          ></Button>
        )}
        <Button
          type="submit"
          label={t("invitation.form.actions.submit")}
          disabled={!!Object.values(errors).length}
          loading={loading}
          loadingIcon={<LoadingIcon />}
        ></Button>
      </div>
    </>
  );
};
