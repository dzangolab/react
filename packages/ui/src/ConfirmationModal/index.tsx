import { DialogHTMLAttributes, ReactNode, useEffect, useRef } from "react";

import { Button, IButtonProperties } from "..";

export interface IModalProperties
  extends DialogHTMLAttributes<HTMLDialogElement> {
  acceptButtonOptions?: IButtonProperties;
  cancelButtonOptions?: IButtonProperties;
  closable?: boolean;
  closeIcon?: string | ReactNode;
  footer?: ReactNode;
  header?: ReactNode | string;
  message?: string;
  title?: string;
  visible?: boolean;
  accept?: () => void;
  onHide?: () => void;
  reject?: () => void;
}

export const ConfirmationModal = ({
  accept,
  acceptButtonOptions,
  reject,
  cancelButtonOptions,
  closable = true,
  closeIcon = "pi pi-times",
  className,
  title,
  message,
  header,
  visible,
  onHide,
  footer,
  children,
  ...dialogOptions
}: IModalProperties) => {
  const dialogReference = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (visible) {
      dialogReference.current?.showModal();
    } else {
      dialogReference.current?.close();
    }
  }, [visible]);

  const renderHeader = () => {
    if (header) return header;

    if (!title && !closable) {
      return null;
    }

    return (
      <div className="dz-dialog-header">
        {title && <span className="title">{title}</span>}
        {closable && (
          <Button
            variant="textOnly"
            size="small"
            severity="secondary"
            iconLeft={
              typeof closeIcon === "string" ? (
                <i className={closeIcon} />
              ) : (
                closeIcon
              )
            }
            onClick={onHide}
          />
        )}
      </div>
    );
  };

  const renderFooter = () => {
    if (footer) return footer;

    return (
      <div className="dz-dialog-footer">
        <Button
          label="No"
          variant="outlined"
          severity="secondary"
          onClick={reject || onHide}
          {...cancelButtonOptions}
        />
        <Button
          label="Yes"
          onClick={accept || onHide}
          {...acceptButtonOptions}
        />
      </div>
    );
  };

  return (
    visible && (
      <dialog
        ref={dialogReference}
        className={`dz-dialog ${className}`.trimEnd()}
        onClose={onHide}
        {...dialogOptions}
      >
        {renderHeader()}
        {children}
        {renderFooter()}
      </dialog>
    )
  );
};
