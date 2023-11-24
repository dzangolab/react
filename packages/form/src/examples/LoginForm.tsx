import { toast } from "react-toastify";
import * as z from "zod";

import { Email, Form, Password } from "..";
import { emailSchema, passwordSchema } from "../schemas";

const schema = z.object({
  email: emailSchema(),
  password: passwordSchema(),
});

const handleSubmit = () => {
  toast.success("Login is sucessfull");
};

export const LoginForm = () => {
  return (
    <Form
      className="form login-form"
      // eslint-disable-next-line no-console
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Email name="email" label="Email" />
      <Password name="password" label="Password" />
      <input type="submit" value="Log in 2" />
    </Form>
  );
};
