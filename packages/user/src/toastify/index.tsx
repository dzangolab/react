import { ToastContainer, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserToastContainer = ({
  position = "bottom-right",
  ...rest
}: ToastContainerProps) => {
  return <ToastContainer position={position} {...rest} />;
};
