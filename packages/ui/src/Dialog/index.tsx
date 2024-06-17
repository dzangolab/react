import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface IDialogProperties {
  visible?: boolean;
  content?: () => ReactNode | ReactNode;
}
export const Dialog = ({ visible, content }: IDialogProperties) => {
  const renderContent = () => {
    if (!content) {
      return (
        <dialog className="dz-dialog">
          Hello how are you and i am fine thank you
        </dialog>
      );
    }

    if (typeof content === "function") {
      return content();
    }

    return content;
  };

  return (
    <>
      {visible ? (
        createPortal(
          <div className="dz-dialog-wrapper">{renderContent()}</div>,
          document.body,
        )
      ) : (
        <></>
      )}
    </>
  );
};
