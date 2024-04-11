import { HTMLAttributes } from "react";

interface IProperties extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  form: React.ReactNode;
  links?: React.ReactNode;
}

export const AuthFormWrapper = ({
  className,
  form,
  links,
  ...otherProperties
}: IProperties) => {
  let wrapperClassName = "dz-auth-form-wrapper";

  if (className) {
    wrapperClassName += " " + className;
  }

  return (
    <div className={wrapperClassName} {...otherProperties}>
      {form}
      {links ? <div className="links">{links}</div> : null}
    </div>
  );
};
