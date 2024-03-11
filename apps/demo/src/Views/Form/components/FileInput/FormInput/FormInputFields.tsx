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

import { FormInputModes } from "./FormInputModes";

export const FormInputFields = ({ filledInput, setFilledInput }: any) => {
  const [t] = useTranslation("form");

  const [validState, setValidState] = useState(false);
  const [invalidState, setInvalidState] = useState(false);
  const [isValid, setIsValid] = useState(false);

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
        submitcount={validState ? 1 : submitCount}
        showValidState={validState}
        showInvalidState={invalidState}
      />
      <TextInput
        label={t("formInput.label.text")}
        name="name"
        placeholder={t("formInput.placeHolder.text")}
        submitcount={validState ? 1 : submitCount}
        showValidState={validState}
        showInvalidState={invalidState}
      />
      <Password
        getFieldState={getFieldState}
        label={t("formInput.label.password")}
        name="password"
        register={register}
        submitcount={validState ? 1 : submitCount}
        showValidState={validState}
        showInvalidState={invalidState}
      />
      <Input
        getFieldState={getFieldState}
        label={t("formInput.label.input")}
        name="surname"
        placeholder={t("formInput.placeHolder.input")}
        register={register}
        submitcount={validState ? 1 : submitCount}
        showValidState={validState}
        showInvalidState={invalidState}
        type="text"
      />
      <NumberInput
        name="number"
        label={t("formInput.label.number")}
        placeholder={t("formInput.placeHolder.number")}
        submitcount={validState ? 1 : submitCount}
        showValidState={validState}
        showInvalidState={invalidState}
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
            onClick: () => {
              setValidState(true);
              setInvalidState(true);
            },
          },
        ]}
        alignment="left"
      />
      <FormInputModes
        filledInput={filledInput}
        setFilledInput={setFilledInput}
        setValidState={setValidState}
        setInvalidState={setInvalidState}
        isValid={isValid}
        setIsValid={setIsValid}
      />
    </>
  );
};
