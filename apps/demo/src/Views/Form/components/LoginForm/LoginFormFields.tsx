import { Email, Password, useFormContext } from "@dzangolab/react-form";

export const LoginFormFields = () => {
  const {
    register,
    getFieldState,
    formState: { errors, submitCount },
  } = useFormContext();

  return (
    <>
      <Email name="email" label="Email" submitcount={submitCount} />
      <Password
        name="password"
        label="Password"
        register={register}
        getFieldState={getFieldState}
        submitcount={submitCount}
      />
      <input type="submit" value="Log in" />
    </>
  );
};
