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

import type { App, Role } from "@dzangolab/react-form";

interface IProperties {
  onCancel?: () => void;
  loading?: boolean;
  roles: Role[];
  apps: App[] | undefined;
  filterApps?: (apps: App[], role: Role) => App[];
}

export const InvitationFormFields: React.FC<IProperties> = ({
  onCancel,
  loading,
  roles,
  apps,
  filterApps,
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
        options={roles || []}
      />
      <AppPicker
        name="app"
        label={t("invitation.form.app.label")}
        placeholder={t("invitation.form.app.placeholder")}
        options={apps || []}
        filterApps={filterApps}
      />

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
