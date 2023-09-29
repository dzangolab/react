import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ComponentProps, ReactNode, useState } from "react";

import ConfirmationFileActions from "./ConfirmationFileActions";
import { ConfirmationModal, formatDate } from "..";
import { IFile } from "../FilesTable";
import { useColumnsMap } from "../utils";

export type FileMessages = {
  archiveAction?: string;
  archiveConfirmationHeader?: string;
  archiveConfirmationMessage?: string;
  downloadAction?: string;
  editDescriptionAction?: string;
  renameAction?: string;
  deleteAction?: string;
  deleteConfirmationHeader?: string;
  deleteConfirmationMessage?: string;
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
  archiveButtonProps?: ComponentProps<typeof Button>;
  archiveConfirmationProps?: ComponentProps<typeof ConfirmationModal>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete?: (arguments_: IFile) => void;
  deleteButtonProps?: ComponentProps<typeof Button>;
  deleteConfirmationProps?: ComponentProps<typeof ConfirmationModal>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDownload?: (arguments_: IFile) => void;
  downloadButtonProps?: ComponentProps<typeof Button>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEditDescription?: (arguments_: IFile) => void;
  editDescriptionButtonProps?: ComponentProps<typeof Button>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onShare?: (arguments_: IFile) => void;
  shareButtonProps?: ComponentProps<typeof Button>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onView?: (arguments_: IFile) => void;
  viewButtonProps?: ComponentProps<typeof Button>;
  renderThumbnail?: (arguments_: IFile) => ReactNode;
  showThumbnail?: boolean;
  visibleFileDetails?: VisibleFileDetails[];
};

export const FileCard = ({
  file,
  messages,
  onArchive,
  archiveButtonProps,
  archiveConfirmationProps,
  onDelete,
  deleteButtonProps,
  deleteConfirmationProps,
  onDownload,
  downloadButtonProps,
  onShare,
  shareButtonProps,
  onView,
  viewButtonProps,
  onEditDescription,
  editDescriptionButtonProps,
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
  const [visibleArchiveConfirmation, setVisibleArchiveConfirmation] =
    useState(false);
  const [visibleDeleteConfirmation, setVisibleDeleteConfirmation] =
    useState(false);

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const visibleFileDetailsMap = useColumnsMap(visibleFileDetails);

  const renderActions = () => {
    return (
      <div className="file-actions">
        {!!onArchive && (
          <>
            <Button
              size="small"
              icon="pi pi-book"
              label="Archive"
              onClick={() => setVisibleArchiveConfirmation(true)}
              {...archiveButtonProps}
            />
          </>
        )}
        {!!onDelete && (
          <>
            <Button
              size="small"
              icon="pi pi-trash"
              label="Delete"
              severity="danger"
              onClick={() => setVisibleDeleteConfirmation(true)}
              {...deleteButtonProps}
            />
          </>
        )}
        {!!onDownload && (
          <Button
            size="small"
            icon="pi pi-download"
            label="Download"
            onClick={() => onDownload?.(file)}
            {...downloadButtonProps}
          />
        )}
        {!!onShare && (
          <Button
            size="small"
            icon="pi pi-share-alt"
            label="Share"
            onClick={() => onShare?.(file)}
            {...shareButtonProps}
          />
        )}
        {!!onView && (
          <Button
            size="small"
            icon="pi pi-eye"
            label="View"
            severity="secondary"
            onClick={() => onView?.(file)}
            {...viewButtonProps}
          />
        )}

        <ConfirmationFileActions
          file={file}
          setVisibleArchiveConfirmation={(isVisible) =>
            setVisibleArchiveConfirmation(isVisible)
          }
          setVisibleDeleteConfirmation={(isVisible) =>
            setVisibleDeleteConfirmation(isVisible)
          }
          visibleArchiveConfirmation={visibleArchiveConfirmation}
          visibleDeleteConfirmation={visibleDeleteConfirmation}
          archiveConfirmationProps={archiveConfirmationProps}
          deleteConfirmationProps={deleteConfirmationProps}
          archiveConfirmationHeader={messages?.archiveConfirmationHeader}
          archiveConfirmationMessage={messages?.archiveConfirmationMessage}
          deleteConfirmationHeader={messages?.deleteConfirmationHeader}
          deleteConfirmationMessage={messages?.deleteConfirmationMessage}
          onArchive={onArchive}
          onDelete={onDelete}
        />
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
                      onClick={() => onEditDescription?.(file)}
                      {...editDescriptionButtonProps}
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
        </div>
      </div>
      {visibleFileDetailsMap.actions ? renderActions() : null}
    </Card>
  );
};
