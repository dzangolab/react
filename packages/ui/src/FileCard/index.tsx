import { Button } from "primereact/button";
import { Card } from "primereact/card";

import { IFile } from "../FilesTable";
import { useEffect } from "react";

export type Messages = {
  uploadedbyHeader?: string;
  uploadedAtHeader?: string;
  downloadCountLabel?: string;
  lastDownloadedAtHeader?: string;
  downloadButtonLabel?: string;
  viewButtonLabel?: string;
};

type FileCardType = {
  file: IFile;
  onArchive?: (arguments_: any) => void;
  onDelete?: (arguments_: any) => void;
  onDownload?: (arguments_: any) => void;
  onShare?: (arguments_: any) => void;
  onView?: (arguments_: any) => void;
  onRenderThumbnailType?: (arguments_: any) => void;
  messages?: Messages;
  renderThumbnail?: boolean;
  showDescription?: boolean;
};

export const FileCard = ({
  file,
  onArchive,
  onDelete,
  onDownload,
  onShare,
  onView,
  onRenderThumbnailType,
  messages,
  renderThumbnail = true,
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

  return (
    <Card className="file-card">
      <div className="file-card-wrapper">
        {renderThumbnail && (
          <div className="file-icon">
            <i className="pi pi-file-pdf"></i>
          </div>
        )}
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
                <span>{messages?.downloadCountLabel || "Downloads"}</span>
                <span>{file?.downloadCount}</span>
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
