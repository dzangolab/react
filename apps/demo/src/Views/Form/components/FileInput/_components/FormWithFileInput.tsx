import {
  Provider,
  FileDropzone,
  useFormContext,
  Email,
} from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { Button } from "@dzangolab/react-ui";
import React from "react";

export const FormWithFileInput: React.FC = () => {
  const { t } = useTranslation("files");

  const onSubmit = (values: any) => {
    const formData = new FormData();

    for (let name in values) {
      formData.set(name, values[name]);
    }

    // Implement your own form submission logic here.
  };

  return (
    <Provider onSubmit={onSubmit}>
      <UploadBy />
      <FileDropzone
        name="images"
        mode="append"
        multiple={true}
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
        <Button label={t("fileInput.actions.upload")} />
      </div>
    </Provider>
  );
};

export const UploadBy = () => {
  const { t } = useTranslation("files");
  const {
    register,
    getFieldState,
    formState: { submitCount },
  } = useFormContext();

  return (
    <>
      <Email
        label={t("fileUpload.fields.uploadedBy.label")}
        name="uploadedBy"
        placeholder={t("fileUpload.fields.uploadedBy.placeholder")}
        submitcount={submitCount}
      />
    </>
  );
};
