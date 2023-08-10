import { Button } from "primereact/button";
import {
  FileUpload,
  FileUploadProps,
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
  multiple = true,
  accept,
  name,
  uploadHandler,
  emptyTemplate,
  ...uploadFileOptions
}: IUploadFile) => {
  const [renamingStatus, setRenamingStatus] = useState<number>(-1);
  const [customFileName, setCustomFileName] = useState<string | null>(null);
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

  const handleChangeFileName = (index: number) => {
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
      fileReference.current?.upload();
      console.log(fileReference.current?.getFiles());
      handleRenameChangeStatus();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomFileName(event.target.value);
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
                onChange={(event) => handleChange(event)}
                placeholder="Select custom file name"
              />
              <div>
                <Button
                  type="button"
                  icon="pi pi-check"
                  className="p-button-outlined p-button-rounded p-button-success"
                  onClick={() => handleChangeFileName(index)}
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
                {customFileName !== null && renamingStatus === index
                  ? customFileName
                  : file.name}
              </span>
            </>
          )}
        </div>
        <div>
          <Button
            type="button"
            icon="pi pi-trash"
            className=" p-button-danger"
            onClick={() => onTemplateRemove(file, properties.onRemove)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <FileUpload
        ref={fileReference as LegacyRef<FileUpload> | undefined}
        style={{ width: "100%" }}
        // customUpload
        // uploadHandler={uploadHandler}
        // url="api/images"
        multiple={multiple}
        accept={accept}
        name={name}
        emptyTemplate={emptyTemplate}
        itemTemplate={itemTemplate}
        {...uploadFileOptions}
      />
    </div>
  );
};
