import { FormFileInput } from "@dzangolab/react-form";
import { Provider } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import React from "react";

export const FormWithFileInputButton: React.FC = () => {
  const { t } = useTranslation("files");

  const onSubmit = (values: any) => {
    const formData = new FormData();

    formData.set("file", values);

    console.log("values", formData.get("file"));
    // Implement your own form submission logic here.
  };

  return (
    <Provider onSubmit={onSubmit}>
      <FormFileInput
        selectedFileDisplay="popup"
        inputMethod="button"
        emptySelectionMessage={t("fileInput.emptySelectionMessage")}
        inputButtonLabel={t("fileInput.buttons.label.inputButtonLabel")}
        inputButtonLabelSelected={t(
          "fileInput.buttons.label.inputButtonLabelSelected",
        )}
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
        selectButtonProps={{
          icon: "pi pi-file",
        }}
      />
      <div className="mb-4">
        <button className="w-full bg-primary">
          {t("fileInput.actions.upload")}
        </button>
      </div>
    </Provider>
  );
};
