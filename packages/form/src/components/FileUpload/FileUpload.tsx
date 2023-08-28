import { Button } from "primereact/button";
import { useState } from "react";

import { FileDropzoneBasic } from "../FileInput";

import type { FileExtended } from "../FileInput";
import type { FC } from "react";
import type { DropzoneOptions } from "react-dropzone";

interface IFileUploadProperties {
  addDescriptionLabel?: string;
  cancelButtonIcon?: string;
  cancelButtonLabel?: string;
  defaultValue?: FileExtended[];
  descriptionPlaceholder?: string;
  dropzoneMessage?: string;
  dropzoneOptions?: DropzoneOptions;
  enableDescription?: boolean;
  label?: string;
  mode?: "append" | "update";
  name: string;
  onCancel?: () => void;
  onFileSelect?: (files: FileExtended[]) => FileExtended[];
  onUpload: (files: FileExtended[]) => void;
  uploadButtonIcon?: string;
  uploadButtonLabel?: string;
}

export const FileUpload: FC<IFileUploadProperties> = ({
  addDescriptionLabel,
  cancelButtonIcon,
  cancelButtonLabel = "Cancel",
  defaultValue,
  descriptionPlaceholder,
  dropzoneMessage,
  dropzoneOptions,
  enableDescription = false,
  label,
  mode = "append",
  name,
  onCancel,
  onFileSelect,
  onUpload,
  uploadButtonIcon,
  uploadButtonLabel = "Upload",
}) => {
  const [selectedFiles, setSelectedFiles] = useState<FileExtended[]>(
    defaultValue || [],
  );

  return (
    <div className="file-upload">
      <FileDropzoneBasic
        name={name}
        value={selectedFiles}
        label={label}
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
      <div className="actions">
        <Button
          disabled={!selectedFiles.length}
          label={uploadButtonLabel}
          icon={uploadButtonIcon}
          onClick={() => onUpload(selectedFiles)}
        />
        <Button
          disabled={!selectedFiles.length}
          label={cancelButtonLabel}
          icon={cancelButtonIcon}
          onClick={() => {
            onCancel && onCancel();
            setSelectedFiles([]);
          }}
        />
      </div>
    </div>
  );
};
