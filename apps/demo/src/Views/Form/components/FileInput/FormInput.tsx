import { Provider, Email, TextInput, FormActions } from "@dzangolab/react-form";
import * as zod from "zod";

interface Properties {
  //comming soon
}

export const FormInputDemo = ({}: Properties) => {
  const FormSchema = zod.object({
    //comming soon
  });

  const handleSubmit = () => {
    console.log("form submitted");
  };

  return (
    <Provider validationSchema={FormSchema} onSubmit={handleSubmit}>
      <Email name="email" label="Email" placeholder="Enter email" />
      <TextInput name="text" label="TextInput" placeholder="Enter text" />
      <FormActions
        actions={[
          {
            id: "submit",
            label: "submit",
          },
        ]}
        alignment="left"
      />
    </Provider>
  );
};
