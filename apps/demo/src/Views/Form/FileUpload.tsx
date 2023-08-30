import { FileUpload } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";

export const FileUploadDemo = () => {
  const { t } = useTranslation("files");

  return (
    <FileUpload
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
      onUpload={(files) => console.log(files)}
      cancelButtonLabel={t("fileUpload.actions.cancel")}
      cancelButtonIcon="pi pi-times"
      uploadButtonIcon="pi pi-plus"
      uploadButtonLabel={t("fileUpload.actions.upload")}
    />
  );
};
