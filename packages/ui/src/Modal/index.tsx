import React from "react";

import { Button } from "../Buttons";

interface ModalProperties {
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Modal: React.FC<ModalProperties> = ({
  children,
  className = "",
  footer,
  header,
  isOpen = false,
  onClose,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div role="dialog" className="dz-modal-overlay">
      <div className={`dz-modal ${className}`.trim()}>
        <div className="dz-modal-header">
          {header || <span role="heading">{title}</span>}
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
