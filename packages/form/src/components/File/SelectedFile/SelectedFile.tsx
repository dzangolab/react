import { Button } from "@dzangolab/react-ui";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import React, { Ref, useEffect, useRef, useState } from "react";

import { FileExtended } from "../types";

type SelectedFileProperties = {
  file: FileExtended;
  enableDescription?: boolean;
  addDescriptionLabel?: string;
  descriptionPlaceholder?: string;
  index: number;
  onRemove?: () => void;
  onDescriptionChange?: (description?: string) => void;
};

export const SelectedFile: React.FC<SelectedFileProperties> = ({
  file,
  enableDescription = false,
  addDescriptionLabel,
  descriptionPlaceholder,
  index,
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
      <div className="info">
        <div className="preview"></div>
        <div className="details">
          <Tooltip
            position="top"
            target={`.name.name-${index}`}
            content={file.name}
          />
          <span className={`name name-${index}`}>{file.name}</span>
          {enableDescription && (
            <div className="description-wrapper">
              {!showDescriptionInput ? (
                <>
                  <Tooltip
                    position="top"
                    target={`.description.description-${index}`}
                    content={file.description}
                  />
                  <div
                    className={`description description-${index}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setShowDescriptionInput(true);
                    }}
                  >
                    <span>{description || addDescriptionLabel}</span>
                  </div>
                  <i className="pi pi-pencil"></i>
                </>
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
          iconLeft="pi pi-times"
          severity="danger"
          size="small"
          variant="outlined"
        ></Button>
      )}
    </li>
  );
};
