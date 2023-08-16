import { Provider, FileDropzone } from "@dzangolab/react-form";
import React from "react";

export const FormWithFileInput: React.FC = () => {
  const onSubmit = (values: any) => {
    console.log("values", values);
    // Implement your own form submission logic here.
  };

  return (
    <Provider onSubmit={onSubmit}>
      <FileDropzone
        name="images"
        dropzoneOptions={{
          accept: {
            "image/*": [".jpeg", ".png"],
          },
        }}
        enableDescription
        dropzoneMessage="Drag and drop"
        addDescriptionLabel="+ Add description"
        descriptionPlaceholder="Description"
      />
      <div className="mb-4">
        <button className="w-full bg-primary">Upload</button>
      </div>
    </Provider>
  );
};
