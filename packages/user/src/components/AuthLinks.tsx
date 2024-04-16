import { Link } from "react-router-dom";

import { LinkType } from "@/types/types";

interface ILinkProperties {
  links: Array<LinkType>;
}

export const AuthLinks = ({ links }: ILinkProperties) => {
  return (
    <div className="auth-links">
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
