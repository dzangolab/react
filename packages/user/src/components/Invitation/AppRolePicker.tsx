import { useTranslation } from "@dzangolab/react-i18n";
import {
  AppPicker,
  RolePicker,
  useFormContext,
  useWatch,
} from "@dzangolab/react-form";
import { useMemo } from "react";

import type { App, Role } from "@dzangolab/react-form";

interface IProperties {
  apps: App[] | undefined;
  filterRoles?: (apps: App, role: Role[]) => Role[];
  roles: Role[];
  showAppFiled?: boolean;
}

const AppRolePicker = ({
  apps,
  filterRoles,
  roles,
  showAppFiled,
}: IProperties) => {
  const { t } = useTranslation("user");

  const { control } = useFormContext();

  const app: App = useWatch({
    control,
    name: "app",
  });

  const filteredRoles = useMemo(() => {
    if (app?.supportedRoles) {
      return app.supportedRoles;
    } else if (filterRoles && roles && app) {
      return filterRoles(app, roles);
    }

    return roles || [];
  }, [app, filterRoles]);

  return (
    <>
      {showAppFiled ? (
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
        options={filteredRoles}
        filterRoles={filterRoles}
      />
    </>
  );
};

export { AppRolePicker };
