import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ReactNode } from "react";

import { formatDate } from "..";
import { IFile } from "../FilesTable";

export type Messages = {
  downloadCountHeader?: string;
  lastDownloadedAtHeader?: string;
  uploadedbyHeader?: string;
  uploadedAtHeader?: string;
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
  showDescription?: boolean;
  showEditDescription?: boolean;
  showSize?: boolean;
  showThumbnail?: boolean;
};

export const FileCard = ({
  file,
  messages,
  onArchive,
  onDelete,
  onDownload,
  onShare,
  onView,
  renderThumbnail: pRenderThumbnail,
  showDescription = true,
  showEditDescription = true,
  showSize = true,
  showThumbnail = true,
}: FileCardType) => {
  const renderThumbnail = () => {
    if (!showThumbnail) {
      return null;
    }

    return (
      <div className="file-thumbnail">
        {pRenderThumbnail ? (
          pRenderThumbnail(file)
        ) : (
          <i className="pi pi-file-pdf"></i>
        )}
      </div>
    );
  };

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

  const renderActions = () => {
    return (
      <div className="file-actions">
        {!!onArchive && (
          <Button icon="pi pi-book" onClick={() => onArchive?.(file)} />
        )}
        {!!onDelete && (
          <Button icon="pi pi-trash" onClick={() => onDelete?.(file)} />
        )}
        {!!onDownload && (
          <Button icon="pi pi-download" onClick={() => onDownload?.(file)} />
        )}
        {!!onShare && (
          <Button icon="pi pi-share-alt" onClick={() => onShare?.(file)} />
        )}
        {!!onView && <Button icon="pi pi-eye" onClick={() => onView?.(file)} />}
      </div>
    );
  };

  return (
    <Card className="file-card">
      <div className="file-thumbnail-details-wrapper">
        {renderThumbnail()}
        <div className="file-details-wrapper">
          <div className="file-name-description-details-wrapper">
            <div>
              <span className="file-name">{file.filename}</span>
              <span className="file-size">
                {file.size && showSize && `(${file?.size})`}
              </span>
            </div>
            {showDescription && file.description && (
              <>
                <div className="file-description-details">
                  <span>{file.description}</span>
                  {showEditDescription && (
                    <Button icon="pi pi-pencil" text size="small" />
                  )}
                </div>
              </>
            )}
          </div>
          <div className="file-upload-download-details-wrapper">
            <div className="file-upload-details">
              <div className="uploaded-by">
                <span>{messages?.uploadedbyHeader || "Uploaded by"}</span>
                <span>{checkUploadedByData(file)}</span>
              </div>
              <div className="uploaded-at">
                <span>{messages?.uploadedAtHeader || "Uploaded at"}</span>
                <span>{formatDate(file?.uploadedAt)}</span>
              </div>
            </div>
            <div className="file-download-details">
              <div className="download-count">
                {(file?.downloadCount || file?.downloadCount === 0) && (
                  <>
                    <span>{messages?.downloadCountHeader || "Downloads:"}</span>
                    <span>{file?.downloadCount}</span>
                  </>
                )}
              </div>
              <div className="last-downloaded-at">
                {file.lastDownloadedAt && (
                  <>
                    <span>
                      {messages?.lastDownloadedAtHeader || "Last download:"}
                    </span>
                    <span>{formatDate(file.lastDownloadedAt)}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          {renderActions()}
        </div>
      </div>
    </Card>
  );
};
