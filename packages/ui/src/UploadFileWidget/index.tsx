import { Button } from "primereact/button";
import {
  FileUpload,
  FileUploadProps,
  FileUploadSelectEvent,
  ItemTemplateOptions,
} from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import React, { LegacyRef, useRef, useState } from "react";

interface IUploadFile extends FileUploadProps {
  allowRename?: boolean;
  allowDescription?: boolean;
}

export const UploadFile = ({
  allowRename = false,
  allowDescription = false,
  multiple = false,
  accept,
  name,
  uploadHandler,
  emptyTemplate,
  ...uploadFileOptions
}: IUploadFile) => {
  const [renamingStatus, setRenamingStatus] = useState<number>(-1);
  const [customFileName, setCustomFileName] = useState<string | null>(null);
  const [customFileDescription, setCustomFileDescription] =
    useState<string>("");
  const [descriptionStatus, setDescriptionStatus] = useState<number>(-1);
  const [customFile, setCustomFile] = useState<
    Array<{ name: string; description: string | null; file: File }>
  >([]);
  const [totalSize, setTotalSize] = useState(0);

  const fileReference = useRef<FileUpload>();

  const onTemplateRemove = (file: File, callback: any) => {
    handleRenameChangeStatus();
    setTotalSize(totalSize - file.size);
    callback();
  };

  const handleRenameChangeStatus = () => {
    setRenamingStatus(-1);
    setCustomFileName(null);
  };

  const handleApplyName = (index: number) => {
    console.log(fileReference);
    const files = fileReference.current?.getFiles();
    if (files) {
      const updatedFiles = files.map((file, i) => {
        if (index === i && customFileName !== "") {
          return new File([file], customFileName || file.name, {
            type: file.type,
            lastModified: file.lastModified,
          });
        }
        return file;
      });
      fileReference.current?.setFiles(updatedFiles as File[]);
      handleRenameChangeStatus();
    }
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomFileName(event.target.value);
  };

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCustomFileDescription(event.target.value);
  };

  const handleDescriptionApply = (index: number) => {
    const files = fileReference.current?.getFiles();
    if (files) {
      const updatedFiles = files.map((file, i) => {
        if (index === i && customFileName !== "") {
          return new File([file], customFileName || file.name, {
            type: file.type,
            lastModified: file.lastModified,
          });
        }
        return file;
      });
    }
  };

  const handleDescriptionStatus = (index: number) => {
    if (descriptionStatus === index) {
      setDescriptionStatus(-1);
    } else {
      setDescriptionStatus(index);
    }
  };

  const handleOnSelect = (event: FileUploadSelectEvent) => {
    const files = event.files;
    for (const file of files) {
      setCustomFile((previous) => [
        ...previous,
        { name: file.name, description: null, file: file },
      ]);
    }
  };

  const itemTemplate = (inFile: object, properties: ItemTemplateOptions) => {
    const file = inFile as File;
    const index = properties.index;
    return (
      <div className="file-wrapper">
        <div>
          <i className="pi pi-file"></i>
          {renamingStatus === index ? (
            <div className="input-button-wrapper">
              <InputText
                type="text"
                value={customFileName !== null ? customFileName : file.name}
                onChange={(event) => handleChangeName(event)}
                placeholder="Select custom file name"
              />
              <div>
                <Button
                  type="button"
                  icon="pi pi-check"
                  className="p-button-outlined p-button-rounded p-button-success"
                  onClick={() => handleApplyName(index)}
                />
                <Button
                  type="button"
                  icon="pi pi-times"
                  className="p-button-outlined p-button-rounded p-button-danger"
                  onClick={() => {
                    handleRenameChangeStatus();
                  }}
                />
              </div>
            </div>
          ) : (
            <>
              <span
                onClick={() => {
                  if (allowRename) {
                    setCustomFileName(null);
                    setRenamingStatus(index);
                  }
                }}
              >
                {/* {customFileName !== null && renamingStatus === index
                  ? customFileName
                  : file.name} */}
                {file.name}
              </span>
            </>
          )}
        </div>
        <div>
          <div>
            {descriptionStatus === index && (
              <InputText
                type="text"
                onChange={(event) => handleChangeDescription(event)}
                placeholder="Add file description"
              />
            )}
          </div>
          <div>
            <Button
              type="button"
              icon="pi pi-file-edit"
              className=" p-button-warning"
              onClick={() => handleDescriptionStatus(index)}
            />
            <Button
              type="button"
              icon="pi pi-trash"
              className=" p-button-danger"
              onClick={() => onTemplateRemove(file, properties.onRemove)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <FileUpload
        ref={fileReference as LegacyRef<FileUpload> | undefined}
        style={{ width: "100%" }}
        customUpload
        uploadHandler={uploadHandler}
        multiple={multiple}
        accept={accept}
        name={name}
        emptyTemplate={emptyTemplate}
        itemTemplate={itemTemplate}
        onSelect={handleOnSelect}
        {...uploadFileOptions}
      />
    </div>
  );
};
