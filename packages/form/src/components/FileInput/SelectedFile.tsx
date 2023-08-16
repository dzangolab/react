import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";

import { FileExtended } from "./types";

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
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (enableDescription && onDescriptionChange) {
      onDescriptionChange(description);
    }
  }, [enableDescription, description]);

  return (
    <li key={file.name}>
      <div className="file-info">
        <div className="file-preview"></div>
        <span>{file.name}</span>
      </div>

      {enableDescription && (
        <div className="file-description">
          {!showDescriptionInput ? (
            <Button
              onClick={() => setShowDescriptionInput(true)}
              text
              severity="secondary"
              label={addDescriptionLabel}
              size="small"
            ></Button>
          ) : (
            <>
              <div className="p-inputgroup">
                <InputText
                  value={description}
                  placeholder={descriptionPlaceholder}
                  onChange={(event) => setDescription(event.target.value)}
                />
                <Button
                  onClick={() => {
                    setDescription("");
                    setShowDescriptionInput(false);
                  }}
                  icon="pi pi-times"
                  severity="secondary"
                />
              </div>
            </>
          )}
        </div>
      )}

      {!!onRemove && (
        <Button
          onClick={onRemove}
          icon="pi pi-times"
          severity="danger"
          size="small"
          text
        ></Button>
      )}
    </li>
  );
};
