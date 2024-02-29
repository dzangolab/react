import { Provider, passwordSchema } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import * as zod from "zod";

import { FormInputFields } from "./FormInputFields";

export const FormInputDemo = () => {
  const [t] = useTranslation("form");

  const FormSchema = zod.object({
    email: zod.string({
      required_error: t("formInput.message.required"),
    }),
    name: zod.string({
      required_error: t("formInput.message.required"),
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
  });

  const handleSubmit = (formData: any) => {
    console.log(formData);
  };

  return (
    <Provider
      validationSchema={FormSchema}
      onSubmit={handleSubmit}
      className="input-form-field"
    >
      <FormInputFields />
    </Provider>
  );
};
