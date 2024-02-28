import {
  Email,
  FormActions,
  TextInput,
  useFormContext,
} from "@dzangolab/react-form";

export const FormInputFields = () => {
  const {
    register,
    getFieldState,
    formState: { errors, submitCount },
  } = useFormContext();

  return (
    <>
      <Email
        name="email"
        label="Email"
        placeholder="Enter email"
        submitcount={submitCount}
      />
      <TextInput
        name="name"
        label="TextInput"
        placeholder="Enter text"
        submitcount={submitCount}
      />
      <FormActions
        actions={[
          {
            id: "submit",
            label: "submit",
          },
        ]}
        alignment="left"
      />
    </>
  );
};
