import {
  AppPicker,
  Email,
  RolePicker,
  useFormContext,
  useWatch,
} from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { LoadingIcon } from "@dzangolab/react-ui";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";

import { InvitationAppOption, InvitationRoleOption } from "@/types";
import { RenderAdditionalInvitationFields } from "@/types/invitation";

interface IProperties {
  additionalFields?: RenderAdditionalInvitationFields;
  apps?: InvitationAppOption[];
  loading?: boolean;
  onCancel?: () => void;
  roles?: InvitationRoleOption[];
}
export const InvitationFormFields: React.FC<IProperties> = ({
  additionalFields,
  apps,
  roles,
  loading,
  onCancel,
}) => {
  const { t } = useTranslation("user");

  const {
    register,
    getFieldState,
    setValue,
    formState: { errors, submitCount },
  } = useFormContext();

  const [filteredRoles, setFilteredRoles] = useState(roles || []);

  const selectedApp: InvitationAppOption = useWatch({
    name: "app",
  });

  useEffect(() => {
    if (selectedApp) {
      setValue("role", undefined); // reset role value when app changes

      setFilteredRoles(selectedApp.supportedRoles || []);
    }
  }, [selectedApp]);

  useEffect(() => {
    // if there's only one role, select it by default
    if (filteredRoles?.length === 1) {
      setValue("role", filteredRoles[0]);
    }
  }, [filteredRoles]);

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

      {apps?.length ? (
        <AppPicker
          name="app"
          label={t("invitation.form.app.label")}
          placeholder={t("invitation.form.app.placeholder")}
          options={apps}
        />
      ) : null}

      {filteredRoles?.length ? (
        <RolePicker
          name="role"
          label={t("invitation.form.role.label")}
          placeholder={t("invitation.form.role.placeholder")}
          options={filteredRoles}
        />
      ) : null}

      {additionalFields ? additionalFields(useFormContext) : null}

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
