import { HTMLAttributes } from "react";

interface IInputProperties extends HTMLAttributes<HTMLInputElement> {
  name?: string;
}

const Input = ({ name, ...others }: IInputProperties) => {
  return (
    <div className={`field ${name}`}>
      <input {...others} />
    </div>
  );
};

export default Input;
