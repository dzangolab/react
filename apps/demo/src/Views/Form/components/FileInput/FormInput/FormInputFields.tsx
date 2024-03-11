import {
  Email,
  FormActions,
  TextInput,
  Password,
  Input,
  useFormContext,
  NumberInput,
} from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { useState } from "react";

export const FormInputFields = () => {
  const [t] = useTranslation("form");
  const [valid, setValid] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const {
    register,
    getFieldState,
    formState: { errors, submitCount },
  } = useFormContext();
  return (
    <>
      <Email
        label={t("formInput.label.email")}
        name="email"
        placeholder={t("formInput.placeHolder.email")}
        submitcount={valid || invalid ? 1 : submitCount}
        showValidState={valid}
        showInvalidState={invalid}
      />
      <TextInput
        label={t("formInput.label.text")}
        name="name"
        placeholder={t("formInput.placeHolder.text")}
        submitcount={valid || invalid ? 1 : submitCount}
        showValidState={valid}
        showInvalidState={invalid}
      />
      <Password
        getFieldState={getFieldState}
        label={t("formInput.label.password")}
        name="password"
        register={register}
        submitcount={valid || invalid ? 1 : submitCount}
        showValidState={valid}
        showInvalidState={invalid}
      />
      <Input
        getFieldState={getFieldState}
        label={t("formInput.label.input")}
        name="surname"
        placeholder={t("formInput.placeHolder.input")}
        register={register}
        submitcount={valid || invalid ? 1 : submitCount}
        type="text"
        showValidState={valid}
        showInvalidState={invalid}
      />
      <NumberInput
        name="number"
        label={t("formInput.label.number")}
        placeholder={t("formInput.placeHolder.number")}
        submitcount={valid || invalid ? 1 : submitCount}
        showInvalidState={invalid}
        showValidState={valid}
      />
      <FormActions
        actions={[
          {
            id: "cancel",
            label: t("formInput.action.cancel"),
            onClick: (event) => {
              event.preventDefault();
            },
          },
          {
            id: "submit",
            label: t("formInput.action.submit"),
          },
          {
            id: "valid",
            label: "valid state",
            onClick: (event) => {
              event.preventDefault();
              setValid(true);
              setInvalid(false);
            },
          },
          {
            id: "Invalid",
            label: "Invalid state",
            onClick: () => {
              setInvalid(true);
              setValid(false);
            },
          },
        ]}
        alignment="left"
      />
    </>
  );
};
