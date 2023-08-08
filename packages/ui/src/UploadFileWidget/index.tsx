import { Button } from "primereact/button";
import { FileUpload, ItemTemplateOptions } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import React, { LegacyRef, useRef, useState } from "react";

export const UploadFile = () => {
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

  const handleChangeFileName = (file: File, index: number) => {
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomFileName(event.target.value);
  };

  const itemTemplate = (inFile: object, properties: ItemTemplateOptions) => {
    const file = inFile as File;
    const index = properties.index;
    return (
      <div
        className="flex align-items-center flex-wrap"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          className="flex align-items-center"
          style={{ width: "60%", display: "flex", alignItems: "center" }}
        >
          <i
            className="pi pi-file"
            style={{ fontSize: "2rem", marginRight: "1rem" }}
          ></i>
          {renamingStatus === index ? (
            <div className="flex" style={{ display: "flex" }}>
              <InputText
                type="text"
                value={customFileName !== null ? customFileName : file.name}
                onChange={(event) => handleChange(event)}
                placeholder="Enter custom file name"
              />

              <div>
                <Button
                  type="button"
                  icon="pi pi-check"
                  className="p-button-outlined p-button-rounded p-button-success ml-3"
                  onClick={() => handleChangeFileName(file, index)}
                />
                <Button
                  type="button"
                  icon="pi pi-times"
                  className="p-button-outlined p-button-rounded p-button-danger ml-3"
                  onClick={() => {
                    handleRenameChangeStatus();
                  }}
                />
              </div>
            </div>
          ) : (
            <>
              <span className="flex flex-column text-left ml-3">
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
            icon="pi pi-file-edit"
            className=" p-button-warning ml-auto mr-2"
            onClick={() => {
              setCustomFileName(null);
              setRenamingStatus(index);
            }}
          />

          <Button
            type="button"
            icon="pi pi-trash"
            className=" p-button-danger ml-auto ml-3"
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
        name="demo[]"
        url={"/api/upload"}
        multiple
        accept="image/*"
        emptyTemplate={
          <p className="m-0">Drag and drop files to here to upload.</p>
        }
        itemTemplate={itemTemplate}
      />
    </div>
  );
};
