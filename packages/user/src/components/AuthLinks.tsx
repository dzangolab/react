import { Link } from "react-router-dom";

interface ILinkProperties {
  links: Array<{
    display?: boolean;
    to: string;
    className?: string;
    label: string;
  }>;
}

export const AuthLinks = ({ links }: ILinkProperties) => {
  return (
    <div className="links">
      {links.map((link) => {
        return (
          <>
            {link.display ? (
              <Link to={link.to} className={link.className}>
                {link.label}
              </Link>
            ) : null}
          </>
        );
      })}
    </div>
  );
};
