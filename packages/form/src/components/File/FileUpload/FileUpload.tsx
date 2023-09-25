import { Button } from "primereact/button";
import { useState } from "react";

import { FileDropzoneBasic } from "../FileDropzone";

import type { FileExtended, IFileUploadProperties } from "../types";
import type { FC } from "react";

export const FileUpload: FC<IFileUploadProperties> = ({
  addDescriptionLabel,
  actionsAlignment = "right",
  cancelButtonIcon,
  cancelButtonLabel = "Cancel",
  cancelButtonProps,
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
  uploadButtonIcon,
  uploadButtonLabel = "Upload",
  uploadButtonProps,
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
          disabled={!selectedFiles.length}
          label={uploadButtonLabel}
          icon={uploadButtonIcon}
          onClick={() => onUpload(selectedFiles)}
          {...uploadButtonProps}
        />
        <Button
          disabled={!selectedFiles.length}
          severity="secondary"
          label={cancelButtonLabel}
          icon={cancelButtonIcon}
          onClick={() => {
            onCancel && onCancel();
            setSelectedFiles([]);
          }}
          {...cancelButtonProps}
        />
      </div>
    </div>
  );
};
