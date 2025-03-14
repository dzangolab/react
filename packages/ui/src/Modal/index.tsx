import React from "react";

import { Button } from "../Buttons";

interface ModalProperties {
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  header?: string | JSX.Element;
  visible: boolean;
  onHide: () => void;
}

const Modal: React.FC<ModalProperties> = ({
  children,
  className = "",
  footer,
  header,
  visible = false,
  onHide,
}) => {
  if (!visible) return null;

  return (
    <div role="dialog" className="dz-modal-overlay">
      <div className={`dz-modal ${className}`.trim()}>
        <div className="dz-modal-header">
          {typeof header === "string" ? (
            <span role="heading">{header}</span>
          ) : (
            header
          )}
          <Button
            className="dz-close-button"
            onClick={onHide}
            rounded
            severity="secondary"
            variant="textOnly"
          >
            <i className="pi pi-times"></i>
          </Button>
        </div>

        <div className="dz-modal-content">{children}</div>
        {footer && <div className="dz-modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
