// components/FormComponents/FileAttachBasic.tsx
import { Button } from "@dzangolab/react-ui";
import { OverlayPanel } from "primereact/overlaypanel";
import React, { useRef } from "react";
import { useDropzone } from "react-dropzone";

import { useOnDropFile, useOnRemoveFile } from "../hooks";
import { SelectedFile } from "../SelectedFile";

import type { IFileAttachBasicProperties } from "../types";
import type { FC, LegacyRef } from "react";

export const FileAttachBasic: FC<IFileAttachBasicProperties> = ({
  name,
  selectedFileDisplay = "none",
  mode = "append",
  multiple = true,
  value = [],
  dropzoneOptions,
  enableDescription = false,
  emptySelectionMessage = "No file selected.",
  addDescriptionLabel,
  descriptionPlaceholder,
  onChange,
  selectButtonProps,
}) => {
  const overlayReference = useRef<OverlayPanel>();

  const onDrop = useOnDropFile({ mode, name, onChange, value, multiple });
  const onRemove = useOnRemoveFile({ value, onChange });

  const { getRootProps, getInputProps } = useDropzone({
    noDrag: true,
    onDrop,
    multiple,
    ...dropzoneOptions,
  });

  const renderInputUi = () => {
    const { onClick } = getRootProps();

    return (
      <div className="input-button-wrapper">
        <Button
          onMouseEnter={(event) =>
            selectedFileDisplay === "popup" &&
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
  };

  const renderSelectedFiles = () => (
    <ul className="selected">
      {!!value?.length &&
        value.map((file, index) => {
          return (
            <SelectedFile
              key={file.name}
              file={file}
              index={index}
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
    <div className="file-input attach">
      {renderInputUi()}

      {selectedFileDisplay === "popup" ? (
        <OverlayPanel
          ref={overlayReference as LegacyRef<OverlayPanel>}
          showCloseIcon
        >
          {value?.length ? renderSelectedFiles() : emptySelectionMessage}
        </OverlayPanel>
      ) : null}
    </div>
  );
};
