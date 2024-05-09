import {
  Email,
  FormActions,
  TextInput,
  Password,
  Input,
  useFormContext,
  NumberInput,
  Select,
} from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { useEffect } from "react";

import { FormInputModes } from "./FormInputModes";

type Properties = {
  checkFilledState: (data: boolean) => void;
};

export const FormInputFields = ({ checkFilledState }: Properties) => {
  const [t] = useTranslation("form");

  const {
    register,
    getFieldState,
    formState: { errors, submitCount },
    watch,
  } = useFormContext();

  const [filled, valid, invalid] = watch(["filled", "valid", "invalid"]);

  useEffect(() => {
    checkFilledState(filled);
  }, [filled]);

  return (
    <>
      <Email
        label={t("formInput.label.email")}
        name="email"
        placeholder={t("formInput.placeHolder.email")}
        submitCount={submitCount}
        showValidState={valid}
        showInvalidState={invalid}
      />
      <TextInput
        label={t("formInput.label.text")}
        name="name"
        placeholder={t("formInput.placeHolder.text")}
        submitCount={submitCount}
        showValidState={valid}
        showInvalidState={invalid}
      />
      <Password
        getFieldState={getFieldState}
        label={t("formInput.label.password")}
        name="password"
        register={register}
        submitCount={submitCount}
        showValidState={valid}
        showInvalidState={invalid}
      />
      <Input
        getFieldState={getFieldState}
        label={t("formInput.label.input")}
        name="surname"
        placeholder={t("formInput.placeHolder.input")}
        register={register}
        submitCount={submitCount}
        showValidState={valid}
        showInvalidState={invalid}
        type="text"
      />
      <NumberInput
        name="number"
        label={t("formInput.label.number")}
        placeholder={t("formInput.placeHolder.number")}
        submitCount={submitCount}
        showValidState={valid}
        showInvalidState={invalid}
      />
      <Select
        label={t("formInput.label.select")}
        name="select"
        options={[
          { value: "FR", label: "FR" },
          { value: "DE", label: "DE" },
          { value: "BE", label: "BE" },
          { value: "FE", label: "FE" },
          { value: "RE", label: "RE" },
        ]}
        multiple={true}
        placeholder={t("formInput.placeHolder.select")}
        submitCount={submitCount}
        showValidState={valid}
        showInvalidState={invalid}
      />
      <Email
        label={t("formInput.label.disabled")}
        name="disabled"
        disabled={true}
        defaultValue="monorepo@gmail.com"
      />
      <Email
        label={t("formInput.label.readOnly")}
        name="readOnly"
        readOnly={true}
        defaultValue="monorepo@gmail.com"
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
        ]}
        alignment="left"
      />
      <FormInputModes filled={filled} />
    </>
  );
};
