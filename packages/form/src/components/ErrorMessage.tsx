import { FC } from "react";

interface IErrorMessage {
  message: string;
}

export const ErrorMessage: FC<IErrorMessage> = ({ message }) => {
  return <span role="alert">{message}</span>;
};
