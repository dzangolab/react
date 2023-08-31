import { FileInput } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import React from "react";

export const FileInputButton: React.FC = () => {
  const { t } = useTranslation("files");

  const onChange = (values: any) => {
    console.log("values", values);
    // Implement your own form submission logic here.
  };

  return (
    <>
      <FileInput
        displaySelectedFileList="popup-list"
        inputMode="button"
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
        onChange={onChange}
      />
    </>
  );
};
