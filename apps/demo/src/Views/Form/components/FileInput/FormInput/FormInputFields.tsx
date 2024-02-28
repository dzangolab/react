import {
  Email,
  FormActions,
  TextInput,
  Password,
  Input,
  useFormContext,
} from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";

export const FormInputFields = () => {
  const [t] = useTranslation("form");

  const {
    register,
    getFieldState,
    formState: { errors, submitCount },
  } = useFormContext();

  return (
    <>
      <Email
        name="email"
        label={t("formInput.label.email")}
        placeholder={t("formInput.placeHolder.email")}
        submitcount={submitCount}
      />
      <TextInput
        name="name"
        label={t("formInput.label.text")}
        placeholder={t("formInput.placeHolder.text")}
        submitcount={submitCount}
      />
      <Password
        label={t("formInput.label.password")}
        name="password"
        submitcount={submitCount}
        register={register}
        getFieldState={getFieldState}
        showValidState={false}
      />
      <FormActions
        actions={[
          {
            id: "submit",
            label: "submit",
          },
        ]}
        alignment="left"
      />
    </>
  );
};
