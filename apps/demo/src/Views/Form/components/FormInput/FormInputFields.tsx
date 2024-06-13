import {
  Email,
  FormActions,
  TextInput,
  Password,
  Input,
  useFormContext,
  NumberInput,
  Select,
  Typeahead,
} from "@dzangolab/react-form";
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
    formState: { errors, submitCount },
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
      .catch((err) => console.log("err", err));
  };

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
      <Typeahead
        placeholder={t("formInput.placeHolder.typeahead")}
        label={t("formInput.label.typeahead")}
        name="typeahead"
        data={options}
        suggestionLabel="title"
        suggestionValue="title"
        loading={isLoading}
        onSearch={handleDataFetch}
        debounceTime={500}
        submitCount={submitCount}
        showValidState={valid}
        showInvalidState={invalid}
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
