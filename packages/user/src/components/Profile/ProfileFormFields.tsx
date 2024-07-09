import {
  Email,
  Input,
  useFormContext,
  AdditionalFormFields,
  FormActions,
} from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";

interface Properties {
  submitting?: boolean;
  additionalProfileFields?: AdditionalFormFields;
}

export const ProfileFormFields = ({
  submitting,
  additionalProfileFields,
}: Properties) => {
  const {
    register,
    getFieldState,
    reset,
    formState: { errors, submitCount, isDirty }, // eslint-disable-line @typescript-eslint/no-unused-vars
  } = useFormContext();

  const { t } = useTranslation("user");
  return (
    <>
      <Email
        label={t("profile.form.email.label")}
        name="email"
        placeholder={t("profile.form.email.placeholder")}
        readOnly={true}
      />
      <Input
        label={t("profile.form.firstName.label")}
        name="givenName"
        type="text"
        placeholder={t("profile.form.firstName.placeholder")}
        register={register}
        submitCount={submitCount}
        getFieldState={getFieldState}
      />
      <Input
        label={t("profile.form.lastName.label")}
        name="surname"
        type="text"
        placeholder={t("profile.form.lastName.placeholder")}
        register={register}
        submitCount={submitCount}
        getFieldState={getFieldState}
      />

      {additionalProfileFields
        ? additionalProfileFields.renderFields(useFormContext)
        : null}

      <FormActions
        actions={[
          {
            id: "cancel",
            label: t("profile.button.cancel"),
            type: "button",
            disabled: !isDirty,
            onClick: () => reset(),
          },
          {
            id: "submit",
            label: t("profile.button.update"),
            disabled: !isDirty,
          },
        ]}
        loading={submitting}
        alignment="fill"
      />
    </>
  );
};
