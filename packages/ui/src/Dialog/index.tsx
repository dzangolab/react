import { DialogHTMLAttributes, ReactNode } from "react";
import { createPortal } from "react-dom";

import { Button } from "..";

interface IDialogProperties
  extends Omit<DialogHTMLAttributes<HTMLDialogElement>, "content"> {
  header?: string;
  visible: boolean;
  onHide?: () => void;
}
export const Dialog = ({
  children,
  className = "",
  header,
  visible,
  onHide,
  ...others
}: IDialogProperties) => {
  const renderHeader = () => {
    return (
      <div className="dz-dialog-header">
        {header && <div>{header}</div>}
        {
          <Button
            variant="textOnly"
            size="small"
            severity="secondary"
            iconLeft="pi pi-times"
            onClick={onHide}
          />
        }
      </div>
    );
  };

  return (
    <>
      {createPortal(
        <dialog
          className={`dz-dialog ${className}`.trimEnd()}
          open={visible}
          {...others}
        >
          {renderHeader()}
          {children}
        </dialog>,
        document.body,
      )}
    </>
  );
};
