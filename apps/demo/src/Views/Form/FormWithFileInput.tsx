import { Provider, FileDropzone } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import React from "react";

export const FormWithFileInput: React.FC = () => {
  const { t } = useTranslation("files");

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
        dropzoneMessage={t("fileInput.dropzoneMessage")}
        addDescriptionLabel={t("fileInput.description.label")}
        descriptionPlaceholder={t("fileInput.description.placeholder")}
      />
      <div className="mb-4">
        <button className="w-full bg-primary">
          {t("fileInput.actions.upload")}
        </button>
      </div>
    </Provider>
  );
};
