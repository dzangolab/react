import {
  AppPicker,
  DateInput,
  DatePicker,
  Email,
  RolePicker,
  useFormContext,
  useWatch,
} from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { LoadingIcon } from "@dzangolab/react-ui";
import { Button } from "primereact/button";
import React, { useEffect, useMemo, useState } from "react";

import {
  InvitationAppOption,
  InvitationExpiryDateField,
  InvitationRoleOption,
  RenderAdditionalInvitationFields,
} from "@/types";

interface IProperties {
  renderAdditionalFields?: RenderAdditionalInvitationFields;
  apps?: InvitationAppOption[];
  expiryDateField?: InvitationExpiryDateField;
  loading?: boolean;
  onCancel?: () => void;
  roles?: InvitationRoleOption[];
}
export const InvitationFormFields: React.FC<IProperties> = ({
  renderAdditionalFields,
  apps,
  expiryDateField,
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

  const renderExpiryDateField = () => (
    <>
      {expiryDateField?.mode === "calendar" ? (
        <DatePicker
          key="calender"
          label={t("invitation.form.expiresAt.label")}
          minDate={new Date()}
          name="expiresAt"
          placeholder={t("invitation.form.expiresAt.placeholder")}
        />
      ) : (
        <DateInput
          getFieldState={getFieldState}
          label={t("invitation.form.expiresAfter.label")}
          name="expiresAt"
          placeholder={t("invitation.form.expiresAfter.placeholder")}
          register={register}
        />
      )}
    </>
  );

  const updatedApps = useMemo(() => {
    let modifiedApps = apps || [];
    const currentOrigin = window.location.origin;

    const appToMove = modifiedApps.find((app) => app.origin === currentOrigin);

    if (appToMove) {
      modifiedApps = modifiedApps.filter((app) => app.origin !== currentOrigin);
      modifiedApps = [
        { ...appToMove, name: t("app:thisApp") },
        ...modifiedApps,
      ];
    }

    return modifiedApps;
  }, [apps]);

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
          options={updatedApps}
        />
      ) : null}

      {apps?.length || roles?.length ? (
        <RolePicker
          name="role"
          label={t("invitation.form.role.label")}
          placeholder={t("invitation.form.role.placeholder")}
          options={filteredRoles}
        />
      ) : null}

      {renderAdditionalFields ? renderAdditionalFields(useFormContext) : null}

      {expiryDateField ? renderExpiryDateField() : null}

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
