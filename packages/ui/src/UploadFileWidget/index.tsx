import React, { useState } from "react";
import { FileUpload, ItemTemplateOptions } from "primereact/fileupload";
import { Button } from "primereact/button";

export const UploadFile = () => {
  const [customFileName, setCustomFileName] = useState("");
  const [totalSize, setTotalSize] = useState(0);

  const onTemplateRemove = (file: File, callback: any) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const itemTemplate = (inFile: object, properties: ItemTemplateOptions) => {
    const file = inFile as File;
    return (
      <div
        className="flex p-jc-between"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="flex align-items-center" style={{ width: "40%" }}>
          <img
            alt="/"
            role="presentation"
            src={URL.createObjectURL(file)}
            width={100}
          />
          <span className="flex flex-column text-left ml-3">
            {customFileName ? customFileName : file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>

        <input
          type="text"
          value={customFileName}
          onChange={(event) => setCustomFileName(event.target.value)}
          placeholder="Enter custom file name"
        />

        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
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
