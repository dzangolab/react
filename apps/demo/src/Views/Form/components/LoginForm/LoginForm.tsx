import { Provider, emailSchema, passwordSchema } from "@dzangolab/react-form";
import * as z from "zod";

import { LoginFormFields } from "./LoginFormFields";

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
      <LoginFormFields />
    </Provider>
  );
};
