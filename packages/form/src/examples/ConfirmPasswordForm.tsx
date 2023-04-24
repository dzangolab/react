import * as z from "zod";

import { Form } from "..";
import InputField from "../components/InputField";
import { passwordSchema } from "../schemas";

const schema = z
  .object({
    password: passwordSchema(),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export const ConfirmPasswordForm = () => {
  return (
    <Form
      className="form login-form"
      onSubmit={(data) => console.log(data)}
      validationSchema={schema}
    >
      <InputField type="password" name="password" label="Password" />
      <InputField
        type="password"
        name="confirmPassword"
        label="Confirm Password"
      />
      <input type="submit" value="Log in" />
    </Form>
  );
};
