import { useEffect, useState } from "react";

import { FormActions } from "@/components/FormActions";

import { FileDropzoneBasic } from "../FileDropzone";

import type { FileExtended, IFileUploadProperties } from "../types";
import type { FC } from "react";

export const FileUpload: FC<IFileUploadProperties> = ({
  addDescriptionLabel,
  actionsAlignment = "right",
  cancelButtonOptions,
  value,
  descriptionPlaceholder,
  dropzoneMessage,
  dropzoneOptions,
  enableDescription = false,
  label,
  mode = "append",
  multiple,
  name,
  onCancel,
  onFileSelect,
  onUpload,
  uploadButtonOptions,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<FileExtended[]>(
    value || [],
  );

  useEffect(() => {
    if (value) {
      setSelectedFiles(value);
    }
  }, [value]);

  return (
    <div className="file-upload">
      <FileDropzoneBasic
        name={name}
        value={selectedFiles}
        label={label}
        multiple={multiple}
        mode={mode}
        dropzoneOptions={dropzoneOptions}
        enableDescription={enableDescription}
        addDescriptionLabel={addDescriptionLabel}
        descriptionPlaceholder={descriptionPlaceholder}
        dropzoneMessage={dropzoneMessage}
        onChange={(files) => {
          let modifiedFiles: FileExtended[] = files;

          if (onFileSelect) {
            modifiedFiles = onFileSelect(files);
          }

          setSelectedFiles(modifiedFiles);
        }}
      />

      <FormActions
        actions={[
          {
            id: "cancel",
            label: "Cancel",
            onClick: () => {
              onCancel && onCancel();
              setSelectedFiles([]);
            },
            ...cancelButtonOptions,
          },
          {
            id: "upload",
            type: "button",
            disabled: !selectedFiles.length,
            label: "Upload",
            onClick: () => onUpload(selectedFiles),
            ...uploadButtonOptions,
          },
        ]}
        alignment={actionsAlignment}
      />
    </div>
  );
};
