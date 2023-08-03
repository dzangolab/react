import {
  AppPicker,
  Email,
  RolePicker,
  useFormContext,
} from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { LoadingIcon } from "@dzangolab/react-ui";
import { Button } from "primereact/button";
import React from "react";

import { useConfig } from "@/hooks";

import type { App, Role } from "@dzangolab/react-form";

interface IProperties {
  onCancel?: () => void;
  loading?: boolean;
  roles: Role[];
  apps: App[] | undefined;
  filterRoles?: (apps: App, role: Role[]) => Role[];
  invitationPayloadField?: React.ReactNode[];
}

export const InvitationFormFields: React.FC<IProperties> = ({
  onCancel,
  loading,
  roles,
  apps,
  filterRoles,
  invitationPayloadField,
}) => {
  const { t } = useTranslation("user");
  const {
    user: { invitations },
  } = useConfig();
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
      {invitations?.modal.displayAppField ? (
        <AppPicker
          name="app"
          label={t("invitation.form.app.label")}
          placeholder={t("invitation.form.app.placeholder")}
          options={apps || []}
        />
      ) : null}

      <RolePicker
        name="role"
        label={t("invitation.form.role.label")}
        placeholder={t("invitation.form.role.placeholder")}
        options={roles || []}
        filterRoles={filterRoles}
      />

      {invitationPayloadField ? invitationPayloadField : null}

      <div className="actions">
        {onCancel && (
          <Button
            onClick={(event) => {
              event.preventDefault();
              onCancel();
            }}
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
