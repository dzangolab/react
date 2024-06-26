import { Button, Tooltip, Input } from "@dzangolab/react-ui";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

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
  const nameReference = useRef<HTMLDivElement>(null);
  const descriptionReference = useRef<HTMLDivElement>(null);

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
          <Tooltip position="top" elementRef={nameReference}>
            {file.name}
          </Tooltip>
          <span className={`name name-${index}`} ref={nameReference}>
            {file.name}
          </span>
          {enableDescription && (
            <div className="description-wrapper">
              {!showDescriptionInput ? (
                <>
                  <Tooltip position="top" elementRef={descriptionReference}>
                    {file.description}
                  </Tooltip>
                  <div
                    ref={descriptionReference}
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
                    <Input
                      autoFocus
                      value={description}
                      placeholder={descriptionPlaceholder}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setDescription(event.target.value)
                      }
                      onKeyDown={(
                        keyEvent: KeyboardEvent<HTMLInputElement>,
                      ) => {
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
