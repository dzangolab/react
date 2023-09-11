// components/FormComponents/FileAttachBasic.tsx
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import React, { FC, LegacyRef, useCallback, useMemo, useRef } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

import { SelectedFile } from "../FileInput/SelectedFile";

import type { FileExtended } from "../FileInput/types";
import type { ComponentProps } from "react";

interface IFileAttachBasicProperties {
  name: string;
  inputMode?: "dropzone" | "button";
  displaySelectedFileList?: "list" | "popup-list" | "none";
  multiple?: boolean;
  label?: string;
  inputButtonLabel?: string;
  inputButtonLabelSelected?: string;
  emptySelectionMessage?: string;
  mode?: "append" | "update";
  value: FileExtended[];
  enableDescription?: boolean;
  addDescriptionLabel?: string;
  descriptionPlaceholder?: string;
  dropzoneMessage?: string;
  dropzoneOptions?: DropzoneOptions;
  onChange: (files: FileExtended[]) => void;
  selectButtonProps?: ComponentProps<typeof Button>;
}

export const FileAttachBasic: FC<IFileAttachBasicProperties> = ({
  name,
  inputMode = "button",
  displaySelectedFileList = "popup-list",
  inputButtonLabel = "Select",
  inputButtonLabelSelected = "Selected",
  label,
  mode = "append",
  multiple = true,
  value,
  dropzoneOptions,
  enableDescription = false,
  emptySelectionMessage = "No file selected.",
  addDescriptionLabel,
  descriptionPlaceholder,
  dropzoneMessage,
  onChange,
  selectButtonProps,
}) => {
  const overlayReference = useRef<OverlayPanel>();

  const onDrop = useCallback(
    (droppedFiles: FileExtended[]) => {
      /*
         This is where the magic is happening.
         Depending upon the mode we are replacing old files with new one,
         or appending new files into the old ones, and also filtering out the duplicate files. 
      */
      let newFiles =
        mode === "update" ? droppedFiles : [...(value || []), ...droppedFiles];

      if (mode === "append") {
        newFiles = newFiles.reduce((previous: FileExtended[], file) => {
          const fo = Object.entries(file);

          if (
            previous.find((pFile: FileExtended) => {
              const eo = Object.entries(pFile);
              return eo.every(
                ([key, value], index) =>
                  key === fo[index][0] && value === fo[index][1],
              );
            })
          ) {
            return previous;
          } else {
            return [...previous, file];
          }
        }, []);
      }

      // End Magic.
      onChange(newFiles);
    },
    [name, mode, value, onChange],
  );

  const onRemove = useCallback(
    (index: number) => {
      const newFiles = value.filter((_, index_) => index_ !== index); // improve this

      onChange(newFiles);
    },
    [value, onChange],
  );

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      noDrag: inputMode == "button",
      onDrop,
      multiple,
      ...dropzoneOptions,
    });

  const className = useMemo(
    () =>
      `dropzone ${isFocused ? "focused" : ""} ${
        isDragAccept ? "accepted" : ""
      } ${isDragReject ? "rejected" : ""}`,
    [isFocused, isDragAccept, isDragReject],
  );

  const renderInputUi = () => {
    const { onClick } = getRootProps();

    if (inputMode == "button")
      return (
        <div className="input-button-wrapper">
          <Button
            label={
              value?.length
                ? inputButtonLabelSelected + ` (${value?.length})`
                : inputButtonLabel
            }
            onMouseEnter={(event) =>
              displaySelectedFileList === "popup-list" &&
              overlayReference.current?.show(event, null)
            }
            onClick={(event) => {
              event.preventDefault();
              onClick?.(event);
            }}
            {...selectButtonProps}
          />
          <input id={name} name={name} {...getInputProps()} />
        </div>
      );

    return (
      <div {...getRootProps({ className })}>
        <input id={name} name={name} {...getInputProps()} />
        {dropzoneMessage && <p>{dropzoneMessage}</p>}
      </div>
    );
  };

  const renderSelectedFiles = () => (
    <ul className="selected-files">
      {!!value?.length &&
        value.map((file, index) => {
          return (
            <SelectedFile
              key={file.name}
              file={file}
              enableDescription={enableDescription}
              addDescriptionLabel={addDescriptionLabel}
              descriptionPlaceholder={descriptionPlaceholder}
              onRemove={() => onRemove(index)}
              onDescriptionChange={(description) => {
                file.description = description;
              }}
            />
          );
        })}
    </ul>
  );

  return (
    <div className="file-input">
      {label && <label htmlFor={name}>{label}</label>}
      {renderInputUi()}

      {inputMode === "button" && displaySelectedFileList === "popup-list" ? (
        <OverlayPanel
          ref={overlayReference as LegacyRef<OverlayPanel>}
          showCloseIcon
        >
          {value?.length ? renderSelectedFiles() : emptySelectionMessage}
        </OverlayPanel>
      ) : (
        renderSelectedFiles()
      )}
    </div>
  );
};
