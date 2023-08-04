import { Email, useFormContext } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { LoadingIcon } from "@dzangolab/react-ui";
import { Button } from "primereact/button";
import React from "react";

import { AppRolePicker } from "./AppRolePicker";
import { useConfig } from "@/hooks";

import type { App, Role } from "@dzangolab/react-form";

interface IProperties {
  onCancel?: () => void;
  loading?: boolean;
  roles: Role[];
  apps: App[] | undefined;
  filterRoles?: (apps: App, role: Role[]) => Role[];
  additionalFields?: React.ComponentType<{
    useFormContext: typeof useFormContext;
  }>;
}
export const InvitationFormFields: React.FC<IProperties> = ({
  onCancel,
  loading,
  roles,
  apps,
  filterRoles,
  additionalFields: AdditionalFields,
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
      <AppRolePicker
        apps={apps}
        roles={roles}
        showAppFiled={invitations?.modal.displayAppField}
        filterRoles={filterRoles}
      />

      {AdditionalFields ? (
        <AdditionalFields useFormContext={useFormContext} />
      ) : null}

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
