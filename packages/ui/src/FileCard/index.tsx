import { Button } from "primereact/button";
import { Card } from "primereact/card";

import { IFile } from "../FilesTable";

export type Message = {
  uploadedbyHeader?: string;
  uploadedAtHeader?: string;
  downloadCountHeader?: string;
  lastDownloadedAtHeader?: string;
  downloadButtonLabel?: string;
  viewButtonLabel?: string;
};

type FileCardType = {
  file: IFile;
  handleDownload?: (arguments_: any) => void;
  handleView?: (arguments_: any) => void;
  showDescription?: boolean;
  translationMessage?: Message;
};

export const FileCard = ({
  file,
  handleDownload,
  handleView,
  showDescription = true,
  translationMessage,
}: FileCardType) => {
  const checkUploadedByData = (data: any) => {
    if (!data.uploadedBy) {
      return <code>&#8212;</code>;
    }

    if (data.uploadedBy.givenName || data.uploadedBy.lastName) {
      return `${data.uploadedBy.givenName || ""} ${
        data.uploadedBy.lastName || ""
      }`;
    }

    return data.uploadedBy.email;
  };

  return (
    <Card className="file-card">
      <div className="file-card-wrapper">
        <div className="file-icon">
          <i className="pi pi-file-pdf" style={{ fontSize: "5rem" }}></i>
        </div>
        <div className="file-details-wrapper">
          <div className="file-details">
            <span>
              <span className="file-name">document.pdf</span>
              <span className="file-size">(4KB)</span>
            </span>
            <span className="file-description-detail">
              <span className="file-description">
                This is my file description
              </span>
              <Button icon="pi pi-pencil" text size="small" />
            </span>
          </div>
          <div className="file-upload-download-details">
            <div className="file-upload-details">
              <div className="uploaded-by">
                <span>
                  {translationMessage?.uploadedbyHeader || "Uploaded by"}
                </span>
                <span>{checkUploadedByData(file)}</span>
              </div>
              <div className="uploaded-at">
                <span>
                  {translationMessage?.uploadedAtHeader || "Uploaded at"}
                </span>
                <span>{file?.uploadedAt}</span>
              </div>
            </div>
            <div className="file-download-details">
              <div className="download-count">
                <span>{`${file?.downloadCount} times downloaded`}</span>
              </div>
              <div className="last-downloaded-at">
                <span>
                  {translationMessage?.lastDownloadedAtHeader ||
                    "Last downloaded at"}
                </span>
                {file.lastDownloadedAt && <span>{file?.lastDownloadedAt}</span>}
              </div>
            </div>
          </div>
          <div className="file-actions">
            {/* <Button icon="pi pi-check" rounded outlined aria-label="Filter" />
            <Button
              icon="pi pi-bookmark"
              rounded
              outlined
              severity="secondary"
              aria-label="Bookmark"
            />
            <Button
              icon="pi pi-search"
              rounded
              outlined
              severity="success"
              aria-label="Search"
            /> */}
            <Button
              icon="pi pi-view"
              rounded
              outlined
              severity="info"
              aria-label="User"
            />
            <Button
              icon="pi pi-download"
              rounded
              outlined
              severity="warning"
              aria-label="Notification"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
