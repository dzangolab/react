import { HTMLAttributes } from "react";

interface IProperties extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  formElement: React.ReactNode;
  links?: React.ReactNode;
}

export const AuthFormWrapper = ({
  className,
  formElement,
  links,
  ...otherProperties
}: IProperties) => {
  let wrapperClassName = "dz-auth-form-wrapper";

  if (className) {
    wrapperClassName += " " + className;
  }

  return (
    <div className={wrapperClassName} {...otherProperties}>
      {formElement}
      {links ? <div className="links">{links}</div> : null}
    </div>
  );
};
