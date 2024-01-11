import { Button } from "@dzangolab/react-ui";
import { useState } from "react";

import { FileDropzoneBasic } from "../FileDropzone";

import type { FileExtended, IFileUploadProperties } from "../types";
import type { FC } from "react";

export const FileUpload: FC<IFileUploadProperties> = ({
  addDescriptionLabel,
  actionsAlignment = "right",
  cancelButtonLabel = "Cancel",
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
  uploadButtonLabel = "Upload",
  uploadButtonOptions,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<FileExtended[]>(
    value || [],
  );

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
      <div
        className={`actions ${
          actionsAlignment === "right" ? "align-right" : ""
        }`}
      >
        <Button
          severity="secondary"
          variant="outlined"
          label={cancelButtonLabel}
          onClick={() => {
            onCancel && onCancel();
            setSelectedFiles([]);
          }}
          {...cancelButtonOptions}
        />
        <Button
          disabled={!selectedFiles.length}
          label={uploadButtonLabel}
          onClick={() => onUpload(selectedFiles)}
          {...uploadButtonOptions}
        />
      </div>
    </div>
  );
};
