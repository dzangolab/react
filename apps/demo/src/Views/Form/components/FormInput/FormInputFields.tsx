import {
  Email,
  FormActions,
  TextInput,
  Password,
  RadioInput,
  Input,
  useFormContext,
  NumberInput,
  Select,
  Typeahead,
  DateInput,
  CheckboxInput,
} from "@dzangolab/react-form";
import { Textarea } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { useEffect, useState } from "react";

import { FormInputModes } from "./FormInputModes";

type Properties = {
  checkFilledState: (data: boolean) => void;
};

export const FormInputFields = ({ checkFilledState }: Properties) => {
  const [t] = useTranslation("form");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<any>([]);
  const {
    register,
    getFieldState,
    formState: { errors, submitCount }, // eslint-disable-line @typescript-eslint/no-unused-vars
    watch,
  } = useFormContext();

  const [filled, valid, invalid] = watch(["filled", "valid", "invalid"]);

  const handleDataFetch = (value: any) => {
    setIsLoading(true);
    fetch(`https://api.escuelajs.co/api/v1/products/?title=${value}`)
      .then(async (response) => {
        const data = await response.json();

        setOptions(data.map((item: any) => item));
        setIsLoading(false);
      })
      .catch((err) => console.log("err", err)); // eslint-disable-line no-console
  };

  useEffect(() => {
    checkFilledState(filled);
  }, [filled, checkFilledState]);

  return (
    <>
      <FormInputModes filled={filled} />
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
        maxSelection={3}
        minSelection={2}
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
    </>
  );
};
