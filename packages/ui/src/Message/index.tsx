import { ReactNode, useState } from "react";

type MessageProperties = {
  enableClose?: boolean;
  message: string;
  onClose?: () => void;
  icon?: string | ReactNode;
};

const Message = ({
  onClose,
  enableClose = false,
  message,
  icon,
}: MessageProperties) => {
  const [showMessage, setShowMessage] = useState(true);

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
        {typeof icon === "string" ? <i className={icon} /> : icon}
      </span>
    );
  };

  return (
    <div className="message">
      {icon && renderIcon()}
      <span className="message-content">{message}</span>
      {enableClose && (
        <span className="close-message" onClick={handleClose}>
          <i className="pi pi-times"></i>
        </span>
      )}
    </div>
  );
};

export default Message;
