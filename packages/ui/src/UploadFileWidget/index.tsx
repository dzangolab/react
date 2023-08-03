import React, { useState } from "react";
import { FileUpload, ItemTemplateOptions } from "primereact/fileupload";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export const UploadFile = () => {
  const [customFileNames, setCustomFileNames] = useState<string[]>([]);
  const [renameFile, setRenameFile] = useState<boolean>(false);
  const [totalSize, setTotalSize] = useState(0);

  const onTemplateRemove = (file: File, callback: any) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const handleRenameDone = (index: number) => {
    const updatedNames = [...customFileNames];
    setCustomFileNames(updatedNames);
    setRenameFile(false);
  };

  const itemTemplate = (inFile: object, properties: ItemTemplateOptions) => {
    const file = inFile as File;
    const index = properties.index;
    const customFileName = file.name || customFileNames[index];
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
          {renameFile ? (
            <div className="flex" style={{ display: "flex" }}>
              <InputText
                type="text"
                value={customFileName ? customFileName : ""}
                onChange={(event) => {
                  const updatedNames = [...customFileNames];
                  updatedNames[index] = event.target.value;
                  setCustomFileNames(updatedNames);
                }}
                placeholder="Enter custom file name"
              />

              <div>
                <Button
                  type="button"
                  icon="pi pi-check"
                  className="p-button-outlined p-button-rounded p-button-success ml-auto flex align-items-center"
                  onClick={() => handleRenameDone(index)}
                />
                <Button
                  type="button"
                  icon="pi pi-times"
                  className="p-button-outlined p-button-rounded p-button-danger ml-auto flex align-items-center"
                  onClick={() => {
                    setRenameFile(false);
                    setCustomFileNames(customFileNames);
                  }}
                />
              </div>
            </div>
          ) : (
            <>
              <span className="flex flex-column text-left ml-3">
                {customFileName ? customFileName : file.name}
              </span>
              <Button label="Rename" onClick={() => setRenameFile(true)} />
            </>
          )}
        </div>

        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto flex align-items-center"
          onClick={() => onTemplateRemove(file, properties.onRemove)}
        />
      </div>
    );
  };

  return (
    <div className="card">
      <FileUpload
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
