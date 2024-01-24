import { Email, Input, useFormContext } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { Button } from "@dzangolab/react-ui";

export const ProfileFormFields = () => {
  const {
    register,
    getFieldState,
    formState: { errors, submitCount },
  } = useFormContext();

  const { t } = useTranslation("user");
  return (
    <>
      <Email
        label={t("signup.form.email.label")}
        name="email"
        placeholder={t("signup.form.email.placeholder")}
        register={register}
        getFieldState={getFieldState}
        submitcount={submitCount}
        readOnly={true}
      />
      <Input
        label={t("thing.form.fields.firstName")}
        name="givenName"
        type="string"
        placeholder={t("thing.form.placeHolder.firstName")}
        register={register}
        getFieldState={getFieldState}
      />
      <Input
        label={t("thing.form.fields.lastName")}
        name="surname"
        type="string"
        placeholder={t("thing.form.placeHolder.lastName")}
        register={register}
        getFieldState={getFieldState}
      />
      <div>
        <Button label="Update" />
        <Button label="Cancel" severity="secondary" variant="outlined" />
      </div>
    </>
  );
};
