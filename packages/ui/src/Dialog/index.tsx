import { DialogHTMLAttributes, ReactNode } from "react";
import { createPortal } from "react-dom";

import { Button } from "..";

interface IDialogProperties
  extends Omit<DialogHTMLAttributes<HTMLDialogElement>, "content"> {
  closable?: boolean;
  visible?: boolean;
  content?: () => ReactNode | ReactNode;
  onHide?: () => void;
}
export const Dialog = ({
  className = "",
  closable = true,
  visible,
  content,
  onHide,
}: IDialogProperties) => {
  const renderContent = () => {
    if (!content) {
      return null;
    }

    if (typeof content === "function") {
      return content();
    }

    return content;
  };

  return (
    <>
      {createPortal(
        <dialog
          className={`dz-dialog ${className}`.trimEnd()}
          open={visible}
          onClose={onHide}
        >
          {closable ? (
            <Button size="small" iconLeft="pi pi-times" onClick={onHide} />
          ) : null}
          {renderContent()}
        </dialog>,
        document.body,
      )}
    </>
  );
};
