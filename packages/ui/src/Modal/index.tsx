import React from "react";

import { Button } from "../Buttons";

interface ModalProperties {
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  header?: string | JSX.Element;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProperties> = ({
  children,
  className = "",
  footer,
  header,
  isOpen = false,
  onClose,
}) => {
  if (!isOpen) return null;

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
            onClick={onClose}
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
