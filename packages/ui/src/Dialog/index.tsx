import { DialogHTMLAttributes, ReactNode } from "react";
import { createPortal } from "react-dom";

import { Button } from "..";

interface IDialogProperties
  extends Omit<DialogHTMLAttributes<HTMLDialogElement>, "content"> {
  visible?: boolean;
  content?: () => ReactNode | ReactNode;
  onHide?: () => void;
}
export const Dialog = ({ visible, content, onHide }: IDialogProperties) => {
  const renderContent = () => {
    if (!content) {
      return (
        <dialog className="dz-dialog" open={visible}>
          <Button iconLeft="pi pi-times" onClick={onHide} />
          Hello how are you and i am fine thank you
        </dialog>
      );
    }

    if (typeof content === "function") {
      return content();
    }

    return content;
  };

  return <>{createPortal(renderContent(), document.body)}</>;
};
