import { DialogHTMLAttributes, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { Button, IButtonProperties } from "..";

interface IDialogProperties
  extends Omit<DialogHTMLAttributes<HTMLDialogElement>, "content"> {
  closeIcon?: string | ReactNode;
  closeButtonProperties?: IButtonProperties;
  content?: ReactNode;
  header?: string | React.ReactNode;
  visible: boolean;
  onHide?: () => void;
}
export const Dialog = ({
  children,
  className = "",
  closeIcon = "pi pi-times",
  closeButtonProperties,
  content,
  header,
  visible,
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
    return (
      <div className="dz-dialog-header">
        {header && (typeof header === "string" ? <div>{header}</div> : header)}
        {
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
        }
      </div>
    );
  };

  return (
    <>
      {createPortal(
        <dialog
          ref={dialogReference}
          className={`dz-dialog ${className}`.trimEnd()}
          {...others}
        >
          {renderHeader()}
          {content}
          {children}
        </dialog>,
        document.body,
      )}
    </>
  );
};
