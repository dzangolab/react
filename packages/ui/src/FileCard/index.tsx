import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ReactNode, useMemo } from "react";

import { formatDate } from "..";
import { IFile } from "../FilesTable";

export type FileMessages = {
  archiveAction?: string;
  downloadAction?: string;
  editDescriptionAction?: string;
  renameAction?: string;
  deleteAction?: string;
  filenameHeader?: string;
  descriptionHeader?: string;
  downloadCountHeader?: string;
  lastDownloadedAtHeader?: string;
  uploadedByHeader?: string;
  uploadedAtHeader?: string;
  actionsHeader?: string;
  shareAction?: string;
  viewAction?: string;
};

export type VisibleFileDetails =
  | "filename"
  | "filesize"
  | "description"
  | "uploadedBy"
  | "uploadedAt"
  | "downloadCount"
  | "lastDownloadedAt"
  | "actions";

type FileCardType = {
  file: IFile;
  messages?: FileMessages;
  onArchive?: (arguments_: IFile) => void;
  onDelete?: (arguments_: IFile) => void;
  onDownload?: (arguments_: IFile) => void;
  onEditDescription?: (arguments_: IFile) => void;
  onShare?: (arguments_: IFile) => void;
  onView?: (arguments_: IFile) => void;
  renderThumbnail?: (arguments_: IFile) => ReactNode;
  showThumbnail?: boolean;
  visibleFileDetails?: VisibleFileDetails[];
};

export const FileCard = ({
  file,
  messages,
  onArchive,
  onDelete,
  onDownload,
  onShare,
  onView,
  onEditDescription,
  renderThumbnail: pRenderThumbnail,
  showThumbnail = true,
  visibleFileDetails = [
    "filename",
    "filesize",
    "description",
    "uploadedBy",
    "uploadedAt",
    "downloadCount",
    "lastDownloadedAt",
    "actions",
  ],
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

  const visibleFileDetailsObject = useMemo(() => {
    const visibleDetails = {} as Record<VisibleFileDetails, boolean>;
    for (const name of visibleFileDetails) {
      visibleDetails[name] = true;
    }

    return visibleDetails;
  }, [visibleFileDetails]);

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
              {visibleFileDetailsObject.filesize ? (
                <span className="file-name">{file.filename}</span>
              ) : null}
              <span className="file-size">
                {file.size &&
                  visibleFileDetailsObject.filesize &&
                  `(${file?.size})`}
              </span>
            </div>

            {file.description && visibleFileDetailsObject.description && (
              <>
                <div className="file-description-details">
                  <span>{file.description}</span>
                  {onEditDescription && (
                    <Button icon="pi pi-pencil" text size="small" />
                  )}
                </div>
              </>
            )}
          </div>

          {visibleFileDetailsObject.uploadedAt ||
          visibleFileDetailsObject.uploadedBy ||
          visibleFileDetailsObject.lastDownloadedAt ||
          visibleFileDetailsObject.downloadCount ? (
            <div className="file-upload-download-details-wrapper">
              {visibleFileDetailsObject.uploadedAt ||
              visibleFileDetailsObject.uploadedBy ? (
                <div className="file-upload-details">
                  {visibleFileDetailsObject.uploadedBy ? (
                    <div className="uploaded-by">
                      <span>{messages?.uploadedByHeader || "Uploaded by"}</span>
                      <span>{checkUploadedByData(file)}</span>
                    </div>
                  ) : null}

                  {visibleFileDetailsObject.uploadedAt ? (
                    <div className="uploaded-at">
                      <span>{messages?.uploadedAtHeader || "Uploaded at"}</span>
                      <span>{formatDate(file?.uploadedAt)}</span>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {visibleFileDetailsObject.downloadCount ||
              visibleFileDetailsObject.lastDownloadedAt ? (
                <div className="file-download-details">
                  {visibleFileDetailsObject.downloadCount ? (
                    <div className="download-count">
                      {(file?.downloadCount || file?.downloadCount === 0) && (
                        <>
                          <span>
                            {messages?.downloadCountHeader || "Downloads:"}
                          </span>
                          <span>{file?.downloadCount}</span>
                        </>
                      )}
                    </div>
                  ) : null}

                  {visibleFileDetailsObject.lastDownloadedAt ? (
                    <div className="last-downloaded-at">
                      {file.lastDownloadedAt && (
                        <>
                          <span>
                            {messages?.lastDownloadedAtHeader ||
                              "Last download:"}
                          </span>
                          <span>{formatDate(file.lastDownloadedAt)}</span>
                        </>
                      )}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}

          {visibleFileDetailsObject.actions ? renderActions() : null}
        </div>
      </div>
    </Card>
  );
};
