import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Email, Password } from "..";
import { emailSchema, passwordSchema } from "../schemas";

const schema = z.object({
  email: emailSchema(),
  password: passwordSchema(),
});

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors, isDirty, isValid, touchedFields }, // eslint-disable no-unused-vars
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form
      className="form login-form"
      onSubmit={handleSubmit((data) => console.log(data))}
      noValidate // disable default html5 validations; don't worry, form validation is still there with zod schema
    >
      <Email register={register} getFieldState={getFieldState} />
      <Password register={register} getFieldState={getFieldState} />
      <input type="submit" value="Log in" />
    </form>
  );
};
