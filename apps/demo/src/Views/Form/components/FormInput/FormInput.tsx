import { Provider, emailSchema, passwordSchema } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { useState } from "react";
import * as zod from "zod";

import { FormInputFields } from "./FormInputFields";

export const FormInputDemo = () => {
  const [t] = useTranslation("form");
  const [filledInput, setFilledInput] = useState(false);

  const FormSchema = zod.object({
    email: emailSchema({
      invalid: t("formInput.message.invalid"),
      required: t("formInput.message.required"),
    }),
    name: zod.string().nonempty({
      message: t("formInput.message.required"),
    }),
    password: passwordSchema(
      {
        required: t("formInput.message.required"),
        weak: "",
      },
      {
        minLength: 0,
      },
    ),
    surname: zod.string().nonempty({
      message: t("formInput.message.required"),
    }),
    number: zod
      .number({
        required_error: t("formInput.message.required"),
      })
      .nullable()
      .refine((data) => data !== null, {
        message: t("formInput.message.required"),
      }),
    selectCountry: zod
      .string()
      .array()
      .nonempty({ message: t("formInput.message.required") }),
  });

  const handleSubmit = (formData: any) => {
    console.log(formData);
  };

  const checkFilledState = (filled: boolean) => {
    setFilledInput(filled);
  };

  return (
    <Provider
      validationSchema={FormSchema}
      onSubmit={handleSubmit}
      className={filledInput ? "filled" : ""}
      defaultValues={{ filled: false, valid: false, invalid: false }}
    >
      <FormInputFields checkFilledState={checkFilledState} />
    </Provider>
  );
};
