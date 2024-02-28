import { Provider, emailSchema } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import * as zod from "zod";

import { FormInputFields } from "./FormInputFields";

type FormDataType = {
  email?: string;
  name?: string;
};

export const FormInputDemo = () => {
  const [t] = useTranslation("form");

  const FormSchema = zod.object({
    email: emailSchema({
      invalid: t("formInput.message.invalid"),
      required: t("formInput.message.required"),
    }),
    name: zod.string().nonempty({
      message: t("formInput.message.required"),
    }),
  });

  const handleSubmit = (formData: FormDataType) => {
    console.log(formData);
  };

  return (
    <Provider
      validationSchema={FormSchema}
      onSubmit={handleSubmit}
      defaultValues={{ email: "", name: "" }}
      className="input-form-field"
    >
      <FormInputFields />
    </Provider>
  );
};
