import {
  Email,
  Provider,
  Password,
  emailSchema,
  passwordSchema,
} from "@dzangolab/react-form";
import * as z from "zod";

const schema = z.object({
  email: emailSchema(),
  password: passwordSchema(),
});

export const LoginForm = () => {
  return (
    <Provider
      className="form login-form"
      // eslint-disable-next-line no-console
      onSubmit={(data) => console.log(data)}
      validationSchema={schema}
    >
      <Email name="email" label="Email" />
      <Password name="password" label="Password" />
      <input type="submit" value="Log in" />
    </Provider>
  );
};
