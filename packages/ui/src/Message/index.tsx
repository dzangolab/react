import { ReactNode, useState } from "react";

type MessageProperties = {
  enableClose?: boolean;
  icon?: string | ReactNode;
  message: string | ReactNode;
  onClose?: () => void;
  severity?: "info" | "success" | "warning" | "danger";
  showIcon?: boolean;
};

const Message = ({
  onClose,
  enableClose = false,
  message,
  icon,
  severity = "info",
  showIcon = true,
}: MessageProperties) => {
  const [showMessage, setShowMessage] = useState(true);

  const defaultSeverityIcons = {
    info: "pi pi-info-circle",
    success: "pi pi-check-circle",
    warning: "pi pi-exclamation-triangle",
    danger: "pi pi-times-circle",
  };

  const handleClose = () => {
    setShowMessage(false);
    if (onClose) {
      onClose();
    }
  };

  if (!showMessage) {
    return null;
  }

  const renderIcon = () => {
    return (
      <span className="icon" data-testid="icon">
        {!icon ? (
          <i className={defaultSeverityIcons[severity]} />
        ) : typeof icon === "string" ? (
          <i className={icon} />
        ) : (
          icon
        )}
      </span>
    );
  };

  const renderMessageContent = () => {
    if (typeof message === "string") {
      return <span className="message-content">{message}</span>;
    }

    return message;
  };

  return (
    <div className={`message ${severity}`}>
      {showIcon && renderIcon()}
      {renderMessageContent()}
      {enableClose && (
        <span className="close-message" onClick={handleClose}>
          <i className="pi pi-times"></i>
        </span>
      )}
    </div>
  );
};

export default Message;
