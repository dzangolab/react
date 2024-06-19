import { DialogHTMLAttributes, ReactNode, useEffect, useRef } from "react";

import { Button, IButtonProperties } from "..";

interface IDialogProperties
  extends Omit<DialogHTMLAttributes<HTMLDialogElement>, "content"> {
  closable?: boolean;
  closeIcon?: string | ReactNode;
  closeButtonProperties?: IButtonProperties;
  content?: ReactNode;
  footer?: ReactNode;
  title?: string;
  visible?: boolean;
  onHide: () => void;
}
export const Dialog = ({
  children = null,
  className = "",
  closable = true,
  closeIcon = "pi pi-times",
  closeButtonProperties,
  content = null,
  footer,
  title,
  visible = false,
  onHide,
  ...others
}: IDialogProperties) => {
  const dialogReference = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (visible) {
      dialogReference.current?.showModal();
    } else {
      dialogReference.current?.close();
    }
  }, [visible]);

  const renderHeader = () => {
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
            {...closeButtonProperties}
          />
        )}
      </div>
    );
  };

  const renderFooter = () => {
    if (!footer) {
      return null;
    }

    return <div className="dz-dialog-footer">{footer}</div>;
  };

  return (
    <dialog
      ref={dialogReference}
      className={`dz-dialog ${className}`.trimEnd()}
      onClose={onHide}
      {...others}
    >
      {renderHeader()}
      {content}
      {children}
      {renderFooter()}
    </dialog>
  );
};
