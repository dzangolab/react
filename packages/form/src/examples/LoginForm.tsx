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
      // eslint-disable-next-line no-console
      onSubmit={(data) => console.log(data)}
      validationSchema={schema}
    >
      <Email name="email" label="Email" />
      <Password name="password" label="Password" />
      <input type="submit" value="Log in 2" />
    </Form>
  );
};
