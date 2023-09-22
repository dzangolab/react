import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ReactNode } from "react";

import { useVisibleOrFilterField } from "@/utils";

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
  onArchive?: (arguments_: any) => void;
  onDelete?: (arguments_: any) => void;
  onDownload?: (arguments_: any) => void;
  onEditDescription?: (arguments_: any) => void;
  onShare?: (arguments_: any) => void;
  onView?: (arguments_: any) => void;
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

  const visibleFileDetailsMap =
    useVisibleOrFilterField<VisibleFileDetails>(visibleFileDetails);

  const renderActions = () => {
    return (
      <div className="file-actions">
        {!!onArchive && (
          <Button
            icon="pi pi-book"
            onClick={(event) => onArchive?.({ ...event, data: { file } })}
          />
        )}
        {!!onDelete && (
          <Button
            icon="pi pi-trash"
            onClick={(event) => onDelete?.({ ...event, data: { file } })}
          />
        )}
        {!!onDownload && (
          <Button
            icon="pi pi-download"
            onClick={(event) => onDownload?.({ ...event, data: { file } })}
          />
        )}
        {!!onShare && (
          <Button
            icon="pi pi-share-alt"
            onClick={(event) => onShare?.({ ...event, data: { file } })}
          />
        )}
        {!!onView && (
          <Button
            icon="pi pi-eye"
            onClick={(event) => onView?.({ ...event, data: { file } })}
          />
        )}
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
              {visibleFileDetailsMap.filename ? (
                <span className="file-name">{file.filename}</span>
              ) : null}
              {file.size && visibleFileDetailsMap.filesize && (
                <span className="file-size">{`(${file?.size})`}</span>
              )}
            </div>

            {file.description && visibleFileDetailsMap.description && (
              <>
                <div className="file-description-details">
                  <span>{file.description}</span>
                  {!!onEditDescription && (
                    <Button
                      icon="pi pi-pencil"
                      text
                      size="small"
                      onClick={(event) =>
                        onEditDescription?.({ ...event, data: { file } })
                      }
                    />
                  )}
                </div>
              </>
            )}
          </div>

          {visibleFileDetailsMap.uploadedAt ||
          visibleFileDetailsMap.uploadedBy ||
          visibleFileDetailsMap.lastDownloadedAt ||
          visibleFileDetailsMap.downloadCount ? (
            <div className="file-upload-download-details-wrapper">
              {visibleFileDetailsMap.uploadedAt ||
              visibleFileDetailsMap.uploadedBy ? (
                <div className="file-upload-details">
                  {visibleFileDetailsMap.uploadedBy ? (
                    <div className="uploaded-by">
                      <span>{messages?.uploadedByHeader || "Uploaded by"}</span>
                      <span>{checkUploadedByData(file)}</span>
                    </div>
                  ) : null}

                  {visibleFileDetailsMap.uploadedAt ? (
                    <div className="uploaded-at">
                      <span>{messages?.uploadedAtHeader || "Uploaded at"}</span>
                      <span>{formatDate(file?.uploadedAt)}</span>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {visibleFileDetailsMap.downloadCount ||
              visibleFileDetailsMap.lastDownloadedAt ? (
                <div className="file-download-details">
                  {visibleFileDetailsMap.downloadCount ? (
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

                  {visibleFileDetailsMap.lastDownloadedAt ? (
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

          {visibleFileDetailsMap.actions ? renderActions() : null}
        </div>
      </div>
    </Card>
  );
};
