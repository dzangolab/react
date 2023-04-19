import * as z from "zod";

import { Email, Form, Password } from "..";
import { emailSchema, passwordSchema } from "../schemas";

const schema = z.object({
  email: emailSchema(),
  password: passwordSchema(),
});

export const LoginForm = () => {
  return (
    <Form
      className="form login-form"
      onSubmit={(data) => console.log(data)}
      validationSchema={schema}
    >
      <Email name="email" />
      <Password name="password" />
      <input type="submit" value="Log in 2" />
    </Form>
  );
};
