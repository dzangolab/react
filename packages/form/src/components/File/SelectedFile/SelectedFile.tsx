import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { Ref, useEffect, useRef, useState } from "react";

import { FileExtended } from "../types";

type SelectedFileProperties = {
  file: FileExtended;
  enableDescription?: boolean;
  addDescriptionLabel?: string;
  descriptionPlaceholder?: string;
  onRemove?: () => void;
  onDescriptionChange?: (description?: string) => void;
};

export const SelectedFile: React.FC<SelectedFileProperties> = ({
  file,
  enableDescription = false,
  addDescriptionLabel,
  descriptionPlaceholder,
  onRemove,
  onDescriptionChange,
}) => {
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [description, setDescription] = useState(file.description || "");

  const inputDescriptionReference = useRef<HTMLInputElement>();

  useEffect(() => {
    if (enableDescription && onDescriptionChange) {
      onDescriptionChange(description);
    }
  }, [enableDescription, description]);

  return (
    <li key={file.name}>
      <div className="file-info">
        <div className="file-preview"></div>
        <div className="file-details">
          <span>{file.name}</span>
          {enableDescription && (
            <div className="file-description">
              {!showDescriptionInput ? (
                <span
                  className="description"
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setShowDescriptionInput(true);
                  }}
                >
                  {description || addDescriptionLabel}{" "}
                  <i className="pi pi-pencil"></i>
                </span>
              ) : (
                <>
                  <div className="p-inputgroup">
                    <InputText
                      ref={inputDescriptionReference as Ref<HTMLInputElement>}
                      autoFocus
                      value={description}
                      placeholder={descriptionPlaceholder}
                      onChange={(event) => setDescription(event.target.value)}
                      onKeyDown={(keyEvent) => {
                        if (keyEvent.key === "Enter") {
                          setShowDescriptionInput(false);
                        }
                      }}
                      onBlur={() => {
                        setShowDescriptionInput(false);
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {!!onRemove && (
        <Button
          onClick={onRemove}
          icon="pi pi-times"
          severity="danger"
          size="small"
          outlined
        ></Button>
      )}
    </li>
  );
};
