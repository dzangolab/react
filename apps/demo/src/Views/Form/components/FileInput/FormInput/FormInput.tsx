import { Provider, emailSchema } from "@dzangolab/react-form";
import * as zod from "zod";

import { FormInputFields } from "./FormInputFields";

export const FormInputDemo = () => {
  const FormSchema = zod.object({
    email: emailSchema({
      invalid: "invalid email eteyyt",
      required: "field is required",
    }),
    name: zod
      .string()
      .max(50, { message: "should not exceed 50 character" })
      .nonempty({
        message: "field is required",
      }),
  });

  const handleSubmit = () => {
    console.log("form submitted");
  };

  return (
    <Provider
      validationSchema={FormSchema}
      onSubmit={handleSubmit}
      defaultValues={{ email: "", name: "" }}
    >
      <FormInputFields />
    </Provider>
  );
};
