// components/Forms/FormWithFileInput.tsx
import { Provider, FileInput, TextInput } from "@dzangolab/react-form";
import React from "react";

export const FormWithFileInput: React.FC = () => {
  const onSubmit = (values: any) => {
    console.log("values", values);
    // Implement your own form submission logic here.
  };

  return (
    <Provider onSubmit={onSubmit}>
      <FileInput
        accept="image/png, image/jpg, image/jpeg, image/gif"
        multiple
        name="images"
        dropzoneOptions={{
          multiple: true,
        }}
      />
      <div className="mb-4">
        <button className="w-full bg-primary">Upload</button>
      </div>
    </Provider>
  );
};
