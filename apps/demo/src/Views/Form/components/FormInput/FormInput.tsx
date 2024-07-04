import { Provider, emailSchema, passwordSchema } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { useState } from "react";
import * as zod from "zod";

import { FormInputFields } from "./FormInputFields";
import { CodeBlock, Section } from "../../../../components/Demo";

export const FormInputDemo = () => {
  const [t] = useTranslation("form");
  const [formData, setFormData] = useState("");
  const [filledInput, setFilledInput] = useState(false);

  const FormSchema = zod.object({
    email: emailSchema({
      invalid: t("formInput.message.invalid"),
      required: t("formInput.message.required"),
    }),
    name: zod.string().min(1, t("formInput.message.required")),
    password: passwordSchema(
      {
        required: t("formInput.message.required"),
        weak: "",
      },
      {
        minLength: 0,
      },
    ),
    surname: zod.string().min(1, t("formInput.message.required")),
    number: zod
      .number({
        required_error: t("formInput.message.required"),
      })
      .nullable()
      .refine((data) => data !== null, {
        message: t("formInput.message.required"),
      }),
    text: zod.string().min(1, t("formInput.message.required")),
    select: zod
      .string()
      .array()
      .nonempty({ message: t("formInput.message.required") }),
    typeahead: zod.string().min(1, t("formInput.message.required")),
  });

  const handleSubmit = (_formData: any) => {
    setFormData(JSON.stringify(_formData, null, 4));
  };

  const checkFilledState = (filled: boolean) => {
    setFilledInput(filled);
  };

  return (
    <Section>
      <Provider
        validationSchema={FormSchema}
        onSubmit={handleSubmit}
        className={filledInput ? "filled" : ""}
        defaultValues={{
          filled: false,
          valid: false,
          invalid: false,
          typeahead: "string",
        }}
      >
        <FormInputFields checkFilledState={checkFilledState} />
      </Provider>
      {formData && (
        <CodeBlock
          autoFocus
          title={t("formInput.submittedValue")}
          exampleCode={formData}
        />
      )}
    </Section>
  );
};
