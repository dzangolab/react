import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ReactNode } from "react";

import { IFile } from "../FilesTable";

export type Messages = {
  downloadCountLabel?: string;
  downloadButtonLabel?: string;
  lastDownloadedAtHeader?: string;
  uploadedbyHeader?: string;
  uploadedAtHeader?: string;
  viewButtonLabel?: string;
};

type FileCardType = {
  file: IFile;
  messages?: Messages;
  onArchive?: (arguments_: IFile) => void;
  onDelete?: (arguments_: IFile) => void;
  onDownload?: (arguments_: IFile) => void;
  onShare?: (arguments_: IFile) => void;
  onView?: (arguments_: IFile) => void;
  renderThumbnail?: (arguments_: IFile) => ReactNode;
  showThumbnail?: boolean;
  showDescription?: boolean;
};

export const FileCard = ({
  file,
  onArchive,
  onDelete,
  onDownload,
  onShare,
  onView,
  messages,
  renderThumbnail,
  showThumbnail = true,
  showDescription = true,
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

  const renderIconThumbnail = () => {
    if (showThumbnail) {
      if (!renderThumbnail) {
        return (
          <div className="file-icon">
            <i className="pi pi-file-pdf"></i>;
          </div>
        );
      }
      return <div className="file-icon">{renderThumbnail?.(file)}</div>;
    }
    return null;
  };

  return (
    <Card className="file-card">
      <div className="file-card-wrapper">
        {renderIconThumbnail()}
        <div className="file-details-wrapper">
          <div className="file-details">
            <span>
              <span className="file-name">{file.filename}</span>
              <span className="file-size">
                {file.size && `(${file?.size})`}
              </span>
            </span>
            {showDescription && (
              <>
                <span className="file-description-details">
                  <span className="file-description">
                    {file.description || "This is my file desription"}
                  </span>
                  <Button icon="pi pi-pencil" text size="small" />
                </span>
              </>
            )}
          </div>
          <div className="file-upload-download-details">
            <div className="file-upload-details">
              <div className="uploaded-by">
                <span>{messages?.uploadedbyHeader || "Uploaded by"}</span>
                <span>{checkUploadedByData(file)}</span>
              </div>
              <div className="uploaded-at">
                <span>{messages?.uploadedAtHeader || "Uploaded at"}</span>
                <span>{file?.uploadedAt}</span>
              </div>
            </div>
            <div className="file-download-details">
              <div className="download-count">
                {file.downloadCount && (
                  <>
                    <span>{messages?.downloadCountLabel || "Downloads"}</span>
                    <span>{file?.downloadCount}</span>
                  </>
                )}
              </div>
              <div className="last-downloaded-at">
                {file.lastDownloadedAt && (
                  <>
                    <span>
                      {messages?.lastDownloadedAtHeader || "Last download"}
                    </span>
                    <span>{file?.lastDownloadedAt}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="file-actions">
            <Button icon="pi pi-book" onClick={() => onArchive?.(file)} />
            <Button icon="pi pi-share-alt" onClick={() => onShare?.(file)} />
            <Button icon="pi pi-trash" onClick={() => onDelete?.(file)} />
            <Button icon="pi pi-eye" onClick={() => onView?.(file)} />
            <Button icon="pi pi-download" onClick={() => onDownload?.(file)} />
          </div>
        </div>
      </div>
    </Card>
  );
};
